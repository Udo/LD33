'use strict';

const Tiles = {
  
  list : {},
  
  normalAlpha : 0.25,
  hexDims : {},
  
  currentHighlight : null,
  highlight : function(pos) {
    if(Tiles.currentHighlight) {
      Tiles.currentHighlight.alpha = Tiles.normalAlpha;
      Tiles.currentHighlight.cacheAsBitmap = true;  
    }
    Tiles.currentHighlight = Tiles.list[pos.x+':'+pos.y];
    if(Tiles.currentHighlight) {
      Tiles.currentHighlight.cacheAsBitmap = false;  
      Tiles.currentHighlight.alpha = 1.0;
    }
  },
  
  XYToHexY : function(x, y) {
    
    x = x + Tiles.hexDims.beta;
    y = y + Tiles.hexDims.alpha;
    
    let rowDiv = (y / Tiles.hexDims.rowHeight);
    let row = Math.floor(rowDiv);
    let rowFraction = (rowDiv - row);
    
    const xOffset = (row % 2) * Tiles.hexDims.beta;
    
    let colDiv = ((x - xOffset) / Tiles.hexDims.colWidth);
    let col = Math.floor(colDiv);
    let colFraction = (colDiv - col);
    
    if(rowFraction >= 0.6666) {
      let invert = (colFraction > 0.5000) ? -((row+1) % 2) : -((row+1) % 2)-1;
      let inNextHex = 0;
      if(colFraction < 0.5000)
        inNextHex = (colFraction) < ((rowFraction - 0.6666) * (Tiles.hexDims.beta/Tiles.hexDims.alpha));
      else
        inNextHex = (1-colFraction) < ((rowFraction - 0.6666) * (Tiles.hexDims.beta/Tiles.hexDims.alpha));
      if(inNextHex) {
        row += 1;
        col += invert;
      }
    }
    
    return({ x : col, y : row })
  },
  
  hexPosToXY : function(xc, yc) {
    let xOffset = (yc % 2) * Tiles.hexDims.beta;
    return({
      x : (xc*Tiles.hexDims.beta*2) + (xOffset), 
      y : (yc*Tiles.hexDims.alpha*3) + (0) 
      });
  },
  
  drawHex : function(s, color, opacity) {
    
    const alpha = Stage.gridSize/2;
    const beta = Math.sqrt(3)*alpha;
    Tiles.hexDims = { alpha : alpha, beta : beta, rowHeight : alpha*3, colWidth : beta*2 };
    
    let hexPath = [
      0, -2 * alpha,
      beta, -alpha,
      beta, alpha,
      0, 2 * alpha,
      -beta, alpha,
      -beta, -alpha
      ];
    
    s.lineStyle(2, color, opacity);
    s.beginFill(color, opacity);
    s.drawPolygon(hexPath);
    s.alpha = Tiles.normalAlpha;
    s.cacheAsBitmap = true;
    
  },
  
  makeTile : function(xc, yc) {
    
    let tile = merge(Tiles.baseHex.clone(), {
      cacheAsBitmap : true,
      alpha : Tiles.normalAlpha,
      }, Tiles.hexPosToXY(xc, yc));   

    Tiles.container.addChild(tile);
    Tiles.list[xc+':'+yc] = tile;
    return(tile); 
    
  },
  
  init : function(countX, countY) {
    
    Tiles.baseHex = new PIXI.Graphics();
    Tiles.drawHex(Tiles.baseHex, 0xffffff, 0.25);
    
    Tiles.container = new PIXI.Container();
    Stage.container.addChild(Tiles.container);
    
    for(let xc = -Math.round(countX/2); xc < Math.round(countX/2); xc++) {
      for(let yc = -Math.round(countY/2); yc < Math.round(countY/2); yc++) {
        Tiles.makeTile(xc, yc);
      }
    }
    
  },
  
}
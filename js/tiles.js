'use strict';

const Tiles = {
  
  list : {},
  
  hexDims : {},
  
  currentHighlight : null,
  highlight : function(pos) {
    if(Tiles.currentHighlight) {
      Tiles.currentHighlight.tint = 0xffffff;
      Tiles.currentHighlight.cacheAsBitmap = true;  
    }
    Tiles.currentHighlight = Tiles.list[pos.x+':'+pos.y];
    if(Tiles.currentHighlight) {
      Tiles.currentHighlight.cacheAsBitmap = false;  
      Tiles.currentHighlight.tint = 0xff0000;
    }
  },
  
  XYToHexY : function(x, y) {
    
    x = x + Tiles.hexDims.beta;
    y = y + Tiles.hexDims.alpha;
    
    let rowDiv = (y / Tiles.hexDims.rowHeight);
    let row = Math.floor(rowDiv);
    let rowFraction = (rowDiv - row)*Tiles.hexDims.rowHeight;
    
    const xOffset = (row % 2) * Tiles.hexDims.beta;
    
    let colDiv = ((x - xOffset) / Tiles.hexDims.colWidth);
    let col = Math.floor(colDiv);
    let colFraction = (colDiv - col)*Tiles.hexDims.colWidth;
    
    
    
    return({ x : col, y : row })
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
    s.cacheAsBitmap = true;
    
  },
  
  makeTile : function(xc, yc) {
    
    let xOffset = (yc % 2) * Tiles.hexDims.beta;
    
    let tile = merge(Tiles.baseHex.clone(), {
      x : (xc*Tiles.hexDims.beta*2) + (xOffset), 
      y : (yc*Tiles.hexDims.alpha*3) + (0), 
      cacheAsBitmap : true,
      });   

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
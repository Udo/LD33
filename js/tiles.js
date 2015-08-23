'use strict';

const Tiles = {
  
  list : {},
  
  hexDims : {},
  
  drawHex : function(s, color, opacity) {
    
    const alpha = Stage.gridSize/3;
    const beta = Math.sqrt(3)*alpha;
    Tiles.hexDims = { alpha : alpha, beta : beta };
    
    let hexPath = [
      0, -2 * alpha,
      beta, -alpha,
      beta, alpha,
      0, 2 * alpha,
      -beta, alpha,
      -beta, -alpha
      ];
    
    s.lineStyle(1, color, 1);
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
    return(tile); 
    
  },
  
  init : function(countX, countY) {
    
    Tiles.baseHex = new PIXI.Graphics();
    Tiles.drawHex(Tiles.baseHex, 0xff0000, 0.25);
    
    Tiles.container = new PIXI.Container();
    Stage.container.addChild(Tiles.container);
    
    for(let xc = -countX/2; xc < countX/2; xc++) {
      for(let yc = -countY/2; yc < countY/2; yc++) {
        Tiles.makeTile(xc, yc);
      }
    }
    
  },
  
}
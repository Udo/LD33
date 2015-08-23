'use strict';

const UnitHelpers = {
  
  rect : function(s, color, opacity, x, y, w, h) {
    s.lineStyle(2, color, 1);
    s.beginFill(color, opacity);
    s.drawRoundedRect(
      x*Stage.gridSize-(w*Stage.gridSize/2), 
      y*Stage.gridSize-(h*Stage.gridSize/2), 
      w*Stage.gridSize, 
      h*Stage.gridSize, 
      1);
    s.endFill();
  },
  
  circle : function(s, color, opacity, x, y, r) {
    s.lineStyle(2, color, 1);
    s.beginFill(color, opacity);
    s.drawCircle(x*Stage.gridSize, y*Stage.gridSize, r*Stage.gridSize);
    s.endFill();
  },
  
}

const UnitGraphics = {
  
  'default' : function(u) {
     UnitHelpers.rect(u, 0xff00ff, 0.25, 0, 0, 1, 1);
  },
  
  'location' : function(u, s) {
     UnitHelpers.rect(u, 0x5599ff, 0.25, 0, 0, 1, 1);
  },

  'combatant' : function(u) {
     UnitHelpers.circle(u, 0xff0000, 0.25, 0, 0, 0.75);
  },
  
}

const Unit = {
  
  list : [],
  
  updateAll : function() {
    each(Unit.list, Unit.update);
  },
  
  update : function(u) {
    merge(u, Tiles.hexPosToXY(u.gridPos.x, u.gridPos.y));
  },
  
  findByPos : function(x, y) {
    let result = null;
    each(Unit.list, function(u) {
      if(u.gridPos.x == x && u.gridPos.y == y)
        result = u;
    });
    return(result);
  },
  
  make : function(opt) {
    if(!opt.gridPos) opt.gridPos = { x : 0, y : 0 };
    let newUnit = merge(new PIXI.Graphics(), opt);    
    UnitGraphics[newUnit.type](newUnit);
    newUnit.cacheAsBitmap = true;
    Unit.add(newUnit);
  },
  
  add : function(u) {
    Stage.container.addChild(u);
    Unit.list.push(u);
  },
  
}
'use strict';

const UnitHelpers = {
  
  rect : function(s, color, opacity, x, y, w, h) {
    s.lineStyle(2, color, 1);
    s.beginFill(color, opacity);
    s.drawRoundedRect(x*Stage.gridSize, y*Stage.gridSize, w*Stage.gridSize, h*Stage.gridSize, 1);
    s.endFill();
  },
  
}

const UnitGraphics = {
  
  'default' : function(u, s) {
     UnitHelpers.rect(s, 0xff00ff, 0.25, 0, 0, 1, 1);
  },
  
  'location' : function(u, s) {
     UnitHelpers.rect(s, 0x55ff55, 0.25, 0, 0, 1, 1);
  },
  
}

const Unit = {
  
  list : [],
  
  updateAll : function() {
    each(Unit.list, Unit.update);
  },
  
  update : function(u) {
    u.sprite.x = Stage.gridSize * u.x;
    u.sprite.y = Stage.gridSize * u.y;
  },
  
  make : function(opt) {
    let newUnit = merge({
      x : 0, y : 0,
      }, opt);
    newUnit.sprite = merge(new PIXI.Graphics(), {
      
      });    
    newUnit.sprite.unit = newUnit; // don't know if we need that yet
    UnitGraphics[newUnit.type](newUnit, newUnit.sprite);
    Unit.add(newUnit);
  },
  
  add : function(u) {
    Stage.container.addChild(u.sprite);
    Unit.list.push(u);
  },
  
}
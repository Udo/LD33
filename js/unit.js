'use strict';

const UnitGraphics = {
  
  'default' : function(u, s) {
    s.lineStyle(2, 0xFF00FF, 1);
    s.beginFill(0xFF00FF, 0.25);
    s.drawRoundedRect(0, 0, Stage.gridSize, Stage.gridSize, 1);
    s.endFill();
  }
  
}

const Unit = {
  
  list : [],
  
  make : function(opt) {
    let newUnit = merge({
      
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
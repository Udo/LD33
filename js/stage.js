'use strict';

const Stage = {
  
  gridSize : 48,
  
  container : null,
  
  update : function() {
    Unit.updateAll();
  },
  
  render : function() {
    UI.renderer.render(Stage.container);
  },
  
  init : function() {
    this.container = merge(new PIXI.Container(), {
      position : { x : UI.size.x/2, y : UI.size.y/2 },
      });
  },
  
}
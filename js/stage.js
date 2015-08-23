'use strict';

const Stage = {
  
  gridSize : 48,
  
  container : null,
  
  update : function() {
    Unit.updateAll();
  },
  
  render : function() {
    const currentTimestamp = new Date().getTime();
    Stage.currentRenderInterval = ((Stage.currentRenderInterval)*0.98)+((currentTimestamp-Stage.lastRenderTimestamp)*0.02);
    Stage.fpsIndicatorElement.text(Math.round(1000/Stage.currentRenderInterval)+'fps');
    UI.renderer.render(Stage.container);
    Stage.lastRenderTimestamp = currentTimestamp;
  },
  
  currentRenderInterval : 10,
  lastRenderTimestamp : new Date().getTime(),
  init : function() {
    Stage.container = merge(new PIXI.Container(), {
      position : { x : UI.size.x/2, y : UI.size.y/2 },
      });
    Stage.fpsIndicatorElement = $('#fps_counter');
    Stage.fpsIndicatorElement.text('0');
  },
  
}
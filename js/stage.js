'use strict';

const Stage = {
  
  gridSize : 48,
  
  container : null,
  
  animationList : [],
  
  update : function() {
    
    const currentTimestamp = new Date().getTime();
    Stage.currentRenderInterval = ((Stage.currentRenderInterval)*0.98)+((currentTimestamp-Stage.lastRenderTimestamp)*0.02);
    Stage.fpsIndicatorElement.text(Math.round(1000/Stage.currentRenderInterval)+'fps');

    Unit.updateAll(currentTimestamp);
    each(Stage.animationList, function(o) {
      if(typeof o.onRender == 'function') 
        o.onRender(o, currentTimestamp);
    });

    Stage.lastRenderTimestamp = currentTimestamp;

  },
  
  render : function() {
    UI.renderer.render(Stage.container);
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
  
  makeObject : function(container, f) {
    let o = new PIXI.Graphics();
    f(o);
    container.addChild(o);
    return(o);
  },
  
}
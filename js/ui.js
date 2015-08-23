'use strict';

const UI = {
  
  dim : {
    marginTop : 40,
    marginBottom : 40,
  },
  
  stopped : false,
  
  getViewportSize : function() {
		return({
			x : $(document).width(), 
			y : $(document).height()-(this.dim.marginTop+this.dim.marginBottom), 
			});
	},
  
  init : function() {
    this.size = this.getViewportSize();
    this.renderer = PIXI.autoDetectRenderer(
			this.size.x, 
			this.size.y, 
			{backgroundColor : 0x000000});
		document.body.appendChild(this.renderer.view);
		$(this.renderer.view)
		  .css('margin-top', this.dim.marginTop+'px')
			.css('margin-bottom', this.dim.marginBottom+'px');			
		Stage.init();
		this.animationLoop();
  },
  
  animationLoop : function() {
    if(UI.stopped) return; // we'll have to restart manually
    
    Stage.update();
    Stage.render();
    
    requestAnimationFrame(UI.animationLoop);
  },
  
}
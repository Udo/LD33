'use strict';

const UI = {
  
  dim : {
    marginTop : 40,
    marginBottom : 40,
  },
  
  stopped : false,

  Events : {
    
    onMouseMove : function(e) {
      UI.dim.mouseX = e.offsetX - Stage.container.position.x;
      UI.dim.mouseY = e.offsetY - Stage.container.position.y;
      Tiles.mousePos = Tiles.XYToHexY(UI.dim.mouseX, UI.dim.mouseY);
      Tiles.highlight(Tiles.mousePos);
    },
    
  },
  
  installEventHandlers : function() {
    $(window).on('mousemove', UI.Events.onMouseMove);
  },
  
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
			{backgroundColor : 0x000000, antialias : true });
		document.body.appendChild(this.renderer.view);
		$(this.renderer.view)
		  .css('margin-top', this.dim.marginTop+'px')
			.css('margin-bottom', this.dim.marginBottom+'px');			
		Stage.init();
		this.animationLoop();
		UI.installEventHandlers();
  },
  
  animationLoop : function() {
    if(UI.stopped) return; // we'll have to restart manually
    
    Stage.update();
    Stage.render();
    
    requestAnimationFrame(UI.animationLoop);
  },
  
}
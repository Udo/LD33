'use strict';

const UI = {
  
  dim : {
    marginTop : 40,
    marginBottom : 40,
  },
  
  stopped : false,

  selectionCursor : null,
  selectionUnit : null,
  Events : {
    
    onMouseMove : function(e) {
      UI.dim.mouseX = e.offsetX - Stage.container.position.x;
      UI.dim.mouseY = e.offsetY - Stage.container.position.y;
      Tiles.mousePos = Tiles.XYToHexY(UI.dim.mouseX, UI.dim.mouseY);
      Tiles.highlight(Tiles.mousePos);
    },
    
    onClick : function(e) {
      if(Tiles.mousePos) {
        UI.selectionCursor.x = Tiles.currentHighlight.x;
        UI.selectionCursor.y = Tiles.currentHighlight.y;
        UI.selectedUnit = Unit.findByPos(Tiles.mousePos.x, Tiles.mousePos.y);
        if(UI.selectedUnit) {
          UI.selectionCursor.visible = true;
          console.log(UI.selectedUnit.type+' unit', UI.selectedUnit);
        } else {
          UI.selectionCursor.visible = false;
        }
      }
    },
    
  },
  
  installEventHandlers : function() {
    $(window).on('mousemove', UI.Events.onMouseMove);
    $(window).on('click', UI.Events.onClick);
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
		this.selectionCursor = Stage.makeObject(Stage.container, function(s) {
  		UnitHelpers.circle(s, 0xff00ff, 0.25, 0, 0, 1.2);
  		s.visible = false;
  		s.onRender = function(e, tick) {
    		e.scale.x = 1.0 + Math.sin(tick/300)*0.10;
    		e.scale.y = 1.0 + Math.sin(tick/300)*0.10;
  		}
		});
		Stage.animationList.push(this.selectionCursor);
  },
  
  animationLoop : function() {
    if(UI.stopped) return; // we'll have to restart manually
    
    Stage.update();
    Stage.render();
    
    requestAnimationFrame(UI.animationLoop);
  },
  
}
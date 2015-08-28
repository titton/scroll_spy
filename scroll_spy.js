(function($){
	
	$.fn.scrollSpy = function(options){
		var opts = $.extend( {}, $.fn.scrollSpy.defaults, options );
		var defaults = $.fn.scrollSpy.defaults;
		var elem = this;
		if(opts.addScreenPadding){
			addScreenPadding(elem);
			$(window).resize(function(){addScreenPadding(elem);});
		}
		$(window).scroll(function(){inspectElements(elem,opts,defaults);});
		return elem;
	};
	
	$.fn.scrollSpy.defaults = {
		waitingClass: "spy-waiting",
		actingClass: "spy-acting",
		restingClass: "spy-resting",
		onWaiting: function($obj){
			$obj.removeClass(this.actingClass).removeClass(this.restingClass).addClass(this.waitingClass);
		},
		onActing: function($obj){
			$obj.removeClass(this.waitingClass).removeClass(this.restingClass).addClass(this.actingClass)
				.prev().removeClass(this.actingClass).addClass(this.restingClass);
		},
		onResting: function($obj){
			$obj.removeClass(this.waitingClass).removeClass(this.actingClass).addClass(this.restingClass);
		},
		getScrollTop: function($obj){
			return $obj.scrollTop();
		},
		getPosTop: function($obj){
			return $obj.offset().top-this.getScrollTop($body);
		},
		getPosBot: function($obj){
			return this.getPosTop($obj)+$obj.height();
		},
		isWaiting: function($obj){
			if(this.getPosTop($obj)>0) return true;
			return false;
		},
		isActing: function($obj){
			if(this.getPosTop($obj)<=0 && this.getPosBot($obj)>0) return true;
			return false;
		},
		isResting: function($obj){
			if(this.getPosBot($obj)<=0) return true;
			return false;
		},
		addScreenPadding: true,
		useDefaults: true,
	};
	
	var $body= $(document);
	
	var inspectElements = function(elem,opts,defaults){
		if(!$(elem).length) return;
		elem.each(function(){				
			$obj = $(this);
			if(opts.isWaiting($obj)) {
				if(opts.useDefaults) defaults.onWaiting($obj);
				opts.onWaiting($obj);	
			};
			if(opts.isActing($obj)) {
				if(opts.useDefaults) defaults.onActing($obj);
				opts.onActing($obj);
			};
			if(opts.isResting($obj)) {
				if(opts.useDefaults) defaults.onResting($obj);
				opts.onResting($obj);
			};
		});
	};
	
	var addScreenPadding = function(elem){	
		if(!$(elem).length) return;				
		$(elem).filter(":last-child").each(function(){
			var $elem = $(this);
			$elem.css({
				paddingBottom: $(window).height()-$elem.height() 
			});
		});
	};
	
})(jQuery);

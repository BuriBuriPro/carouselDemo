;(function($){
	//Create a Class
	function Carousel(ads){
		alert(ads);
	}
	//write the prototype
	Carousel.prototype = {

	}
	//initiation
	Carousel.init = function(ads){
		var __this__ = this;
		$(ads).each(function(){
			new __this__($(this));
			});
	}
	//register the gloabl variable
	window.Carousel = Carousel;
})(jQuery);
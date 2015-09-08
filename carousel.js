;(function($){
	//Create a Class
	function Carousel(ad){
		// alert(ads);
		//save single node of ad
		this.ad = ad;
		// default parameters
		this.setting = {
			"width" : 1000,
			"height" : 270,
			"firstWidth" : 540,
			"firstHeight" : 270,
			"verticleAlign" : "middle",
			"scale" : 0.9,
			"speed" : 1000
		}		
		$.extend(this.setting, this.getCustomizedParameters());
		// console.log(this.ad);
	}
	//write the prototype
	Carousel.prototype = {
		//set parameters
		setParameters:function(){
			this.ad.css({
				width : this.setting.width,
				height : this.setting.height
			});
		},
		//get customized parameters
		getCustomizedParameters:function(){
			var setting = this.ad.attr("data-setting");
			if(setting && setting != ""){
				return $.parseJSON(setting);
			}else{
				return {};
			}
		}
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
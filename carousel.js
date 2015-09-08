;(function($){
	//Create a Class
	function Carousel(ad){
		// alert(ads);
		//save single node of ad, adList, btnPrev, btnNext
		this.ad = ad;		
		this.adList = ad.find("ul.adList")
		this.btnPrev = ad.find("div.btnPrev");
		this.btnNext = ad.find("div.btnNext");
		//save nodes of adItems
		this.adItems = ad.find("li.adItem");
		//save firstItem and lastItem
		this.firstItem = this.adItems.first();
		this.lastItem = this.adItems.last();
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
		this.setParameters();
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
			this.adList.css({
				width : this.setting.width,
				height : this.setting.height
			});
			//calculate the width of button
			var w = (this.setting.width - this.setting.firstWidth) / 2;
			this.btnPrev.css({
				width : w,
				height : this.setting.height
			});
			this.btnNext.css({
				width : w,
				height : this.setting.height
			});
			this.firstItem.css({
				width : this.setting.firstWidth,
				height : this.setting.firstHeight
			})
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
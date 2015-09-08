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
		};		
		$.extend(this.setting, this.getCustomizedPara());
		this.setPara();
		this.setItemsPos();
		// console.log(this.setItemsPos);
	}
	//write the prototype
	Carousel.prototype = {		
		//get customized parameters
		getCustomizedPara : function(){
			var setting = this.ad.attr("data-setting");
			if(setting && setting != ""){
				return $.parseJSON(setting);
			}else{
				return {};
			}
		},
		//set parameters
		setPara : function(){
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
			//calculate  max zIndex 
			var maxZ = Math.ceil(this.adItems.size() / 2);
			this.btnPrev.css({
				width : w,
				height : this.setting.height,
				zIndex : maxZ
			});
			this.btnNext.css({
				width : w,
				height : this.setting.height,
				zIndex : maxZ
			});
			this.firstItem.css({
				width : this.setting.firstWidth,
				height : this.setting.firstHeight,
				left : w,
				zIndex : maxZ - 1
			})
		},
		//set items position
		setItemsPos : function(){			
			//cache of objects
			var self = this,
				sliceItems = this.adItems.slice(1),
				sliceSize = sliceItems.size() / 2,
				rightSlice = sliceItems.slice(0, sliceSize),
				leftSlice = sliceItems.slice(sliceSize),
				level =Math.floor(this.adItems.size() / 2),
				scale = this.setting.scale,
				w = this.setting.firstWidth,
				h = this.setting.firstHeight,
				firstLeft = (this.setting.width - w) / 2,
				fixOffLeft = firstLeft + w, 
				gap = firstLeft / level;

			//set right slice
			rightSlice.each(function(i){
				level --;
				w *= scale;
				h *= scale;
				var j = 1;
				$(this).css({
					width : w,
					height : h,
					zIndex : level,
					left : fixOffLeft + (++ i) * gap - w,
					opacity : 1 / i
				});
			})
			// var lw = rightSlice.last().width();		
			var loop = leftSlice.size();	
			leftSlice.each(function(i){
				$(this).css({
					width : w,
					height : h,
					zIndex : level,
					left : (i ++) * gap,
					opacity : 1 / (loop --)
				});				
				w /= scale;
				h /= scale;
				level ++;
			})

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
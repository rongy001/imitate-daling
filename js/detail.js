
//放大镜
$(function(){
	var $goodsImg = $(".goods-img");
	var $mark = $(".mark");
	var $bigImg = $(".big-img");
	$goodsImg.hover(function(){
		$mark.show();
		$bigImg.show();
	},function(){
		$mark.hide();
		$bigImg.hide();
	});
	$goodsImg.mousemove(function(e){
		var $pageX = e.pageX;
		var $pageY = e.pageY;
		var $markWid = $mark.outerWidth();
		var $markHei = $mark.outerHeight();
		var $goodsImgL = $goodsImg.offset().left;
		var $goodsImgT = $goodsImg.offset().top;
		var times = $goodsImg.outerWidth()/$markHei;
		var $markL = $pageX - $markWid/2-$goodsImgL;
		var $markT = $pageY - $markHei/2-$goodsImgT;
		if($markL<=0){
			$markL=0;
		}else if($markL>=$goodsImg.outerWidth()-$markWid){
			$markL=$goodsImg.outerWidth()-$markWid;
		}
		if($markT<=0){
			$markT=0;
		}else if($markT>=$goodsImg.outerHeight()-$markHei){
			$markT=$goodsImg.outerHeight()-$markHei;
		}
		$mark.css({
			"top":$markT,
			"left":$markL
		});
		$(".big-img img").css({
			"top":-$markT*times,
			"left":-$markL*times
		});
	});
});
//商品数量加减
$(function(){
	var add = $(".add");
	var reduce = $('.reduce');
	var num = $(".number input");
	add.click(function(){
		var init = $(".number input").val();
		init++;
		num.val(init);
	});
	reduce.click(function(){
		var init = $(".number input").val();
		init--;
		if(init<1){
			init=1;
		}
		num.val(init);
	});
});
//tab切换
$(function(){
	var $tagList = $(".tag li");
	$tagList.click(function(){
		$(this).addClass("current").siblings().removeClass("current");
	});
})
//大家都在买
$(function(){
	var $buyList = $(".buy-list");
	var $up = $(".scrollup");
	var $down = $(".scrolldown");
	var init=0;
	$up.click(function(){
		init++;	
		if(init>2){
			init=0;
		}
		$buyList.eq(init).show().siblings().hide();
	});
	$down.click(function(){
		init--;	
		if(init<0){
			init=2;
		}
		$buyList.eq(init).show().siblings().hide();
	});
});

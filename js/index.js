
		/*****导航列表*****/
			window.onload=function() {
				var $categoryList = $(".dd dl");
				var $categoryDrop = $(".category-drop");
				var $categoryItem = $(".dd");
				var $categoryTitle = $(".category-title");
				$('.dt_title').hover(function() {
					$('.ico_down').css({
						"display": "inline-block"
					});
					$('.ico_up').hide();
				}, function() {
					$('.ico_down').hide();
					$('.ico_up').css({
						"display": "inline-block"
					});
				});	
				for(var i=0;i<$categoryList.length;i++){
					$categoryList.eq(i).hover(function(){
						var $index = $categoryList.index(this);
						$(this).css({
							"padding-left":"21px",
							"background-color":"#fff",
							"border":"1px solid #6A4084",
							"border-right":"1px solid #fff"
						}).find(".category-sort").css({"border-bottom":"none"});
						$categoryDrop.eq($index).parent().find(".category-drop").hide();
						$categoryDrop.eq($index).show();
					},function(){
						$(this).css({
							"padding-left":"",
							background:"#e8e3eb",
							border:"1px solid #e8e3eb"
							}).find(".category-sort").css({"border-bottom":"1px dotted #d9d9d9"});
						$categoryDrop.hide();
					});
				}
			}
/****轮播图****/
$(function(){
	var $btn = $(".pages li");
	var $slider = $(".slider");
	var index = 0;
	var time;
	$btn.mouseover(function(){
		index = $btn.index(this);
		changeImg(index);
	});
	$slider.hover(function(){
		if(time){
			clearInterval(time);
		}
	},function(){
		time = setInterval(function(){
			index++;
			if(index>2){
				index=0;
			}
			changeImg(index);
		},3000);
	}).trigger("mouseleave");
	function changeImg(index){
		$slider.find("li").eq(index).fadeIn(500).siblings().fadeOut(500);
		$btn.eq(index).css("opacity","1").siblings().css("opacity","");
	}
});
				/*****今日上新*****/
$(function(){
	var $change = $(".change");
	var $newT = $(".new_t");
	var $newB = $(".new_b");
	var $option = $(".option");
	var $todayNew = $(".new_cont ul li");
	var initPage = 0;
	for(var i=0;i<$todayNew.length;i++){
		$todayNew.eq(i).hover(function(){
			$(this).find($option).show();
		},function(){
			$(this).find($option).hide();
		});
	}
	$change.click(function(){
		initPage++;
		if(initPage>2){
			initPage=0;
		}
		changePage(initPage);
	});
	function changePage(initPage){
		$newT.eq(initPage).parent().find($newT).hide();
		$newT.eq(initPage).show();
		$newB.eq(initPage).parent().find($newB).hide();
		$newB.eq(initPage).show();
	}
	//ajax请求
	var $img = $('.new_cont .new_img');
	var $newPri = $('.new_cont .now_pri');
	var $oldPri = $('.new_cont .old_pri');
	var $title = $('.new_cont .dec a');
	//预加载
	var $newsTop = $(".new_cont").offset().top;
	$(window).on("scroll",function(){
		var $scrollHei = $(window).height()+$(window).scrollTop();
		if($scrollHei>$newsTop+200){
			$.getJSON("json/new-goods.json",function(data){
				for(var i=0;i<data.length;i++){
					$img.eq(i).css("background-image",data[i].src);
					$newPri.eq(i).html(data[i].newpri);
					$oldPri.eq(i).html(data[i].oldpri);
					$title.eq(i).html(data[i].title);
				}
			});
		}
	})
});
  			/****大家都说好****/
$(function(){
	var $tabList = $(".good_tab li");
	var $goodsMain = $(".good_list ul");
	for(var i=0;i<$tabList.length;i++){
		$tabList.eq(i).click(function(){
			var $index = $tabList.index(this);
			$(this).addClass("current").siblings().removeClass("current");
			$goodsMain.eq($index).show().siblings().hide();
		});
	}
	
	//引入ajax
	var $goodImg = $(".good_img");
	var $nowPri = $(".good_list .now_pri");
	var $oldPri = $(".good_list .old_pri");
	var $title = $(".good_list .dec a");
	var $conText = $(".good_list .com_text");
	var $goodsListTop = $(".good_list").offset().top;
	$(window).on("scroll",function(){
		var $scrollHei = $(window).height()+$(window).scrollTop();
		if($scrollHei>$goodsListTop+200){
			$.getJSON("json/good.json",function(data){
				for(var i=0;i<data.length;i++){
					$goodImg.eq(i).css("background-image",data[i].url);
					$nowPri.eq(i).html(data[i].nowpri);
					$oldPri.eq(i).html(data[i].oldpri);
					$title.eq(i).html(data[i].title);
					$conText.eq(i).html(data[i].context);
				}
			})
		}
	})
	
});
		/*****买了又买*****/
$(function(){
	var $buy = $('.buy_again dl');
	for(var j=0;j<$buy.length;j++){
		$buy.eq(j).mouseenter(function(){
		var $buyList =$(this).find("dd");
			for(var i=0;i<$buyList.length;i++){
				$buyList.eq(i).hover(function(){
					$(this).removeClass("ex_first").addClass("first").siblings("dd").removeClass("first").addClass("ex_first");
				},function(){
					$buyList.removeClass("ex_first");
					$buyList.eq(0).addClass("first").siblings("dd").removeClass("first").addClass("ex_first");
				});
			}
		});
	}
	//引入ajax
	var $buyImg = $(".buy_img");
	var $nowPri = $(".buy_again .now_pri");
	var $oldPri = $(".buy_again .old_pri");
	var $title = $(".buy_again .title a");
	$.getJSON("json/buy.json",function(data){
		for(var i=0;i<data.length;i++){
			$buyImg.eq(i).css("background-image",data[i].src);
			$nowPri.eq(i).html(data[i].nowpri);
			$oldPri.eq(i).html(data[i].oldpri);
			$title.eq(i).html(data[i].title);
		}
	})
});
//新品黑马
$(function(){
	var $newImg = $(".newest .good_img");
	var $nowPri = $(".newest .now_pri");
	var $oldPri = $(".newest .old_pri");
	var $title = $(".newest .dec a");
	var $conText = $(".newest .com_text .subject");
	$.getJSON("json/good.json",function(data){
		for(var i=0;i<data.length;i++){
			$newImg.eq(i).css("background-image",data[i].url);
			$nowPri.eq(i).html(data[i].nowpri);
			$oldPri.eq(i).html(data[i].oldpri);
			$title.eq(i).html(data[i].title);
			$conText.eq(i).html(data[i].context);
		}
	})
})
/*****今日特卖闪购*****/
$(function(){
	var $more = $(".more");
	var $scrollUp = $(".scrollup");
	var $scrollDown = $(".scrolldown");
	var $saleList = $(".sale_list ul li");
	var $tomList = $(".sale_tommrow .tom_list");
	var init = 0;
	//点击出现更多
	$more.click(function(){
		$saleList.show();
		$(this).hide();
	});
	//点击上下滚动
	$scrollDown.click(function(){
		init++;
		if(init>2){
			init=0;
		}
		showSaleList(init);
	});
	$scrollUp.click(function(){
		init--;
		if(init>0){
			init=2;
		}
		showSaleList(init);
	});
	function showSaleList(init){
		$tomList.eq(init).show().siblings().hide();
	}
	//倒计时
	var oDate = new Date("2016/10/16,18:00:00");
	setInterval(function(){
		var dates = new Date();
		var totalTime = oDate - dates;
		var hours = Math.floor(totalTime/(1000*60*60));
		var minutes = Math.floor((totalTime - hours*60*60*1000)/(60*1000));
		var seconds = Math.floor((totalTime - hours*60*60*1000 - minutes*60*1000)/1000);
		$(".timeout .hour").html(hours);
		$(".timeout .min").html(minutes);
		$(".timeout .sec").html(seconds);
	},1000);
});


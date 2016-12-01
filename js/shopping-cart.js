//引入公共文件
$(function(){
	$("#header_w").load("html/header.html");
	$(".footer").load("html/footer.html");
});
//将商品添加购物车
$(function(){
	$.getJSON("json/collect.json",function(res){
		for(var i=0;i<res.data.length;i++){
			$(".c-box li").eq(i).find(".cover_img").css("background-image",res.data[i].img);
			$(".c-box li").eq(i).find(".good-title").html(res.data[i].t);
			$(".c-box li").eq(i).find(".new-price").html(res.data[i].newpri);
			$(".c-box li").eq(i).find(".old-price").html(res.data[i].oldpri);
			$(".c-box li").eq(i).find(".cover_img").attr("sid",res.data[i].sid);
		}
		//加载购物车
		if($.cookie("cartgoodsid")){
			var s = $.cookie("cartgoodsid").split(",");
			var n = $.cookie("cartgoodnum").split(",");
			for(var i=0;i<s.length;i++){
				addInCart(s[i],n[i]);
			}
		}
	});
	//获取cookie值，并转化成数组
	function getGoodsCookie(){
		if($.cookie("cartgoodsid")){
			sidArray = $.cookie("cartgoodsid").split(",");
		}else{
			sidArray = [];
		}
		if($.cookie("cartgoodnum")){
			numArray = $.cookie("cartgoodnum").split(",");
		}else{
			numArray = [];
		}
	}
	//判断元素是否在数组内
	function isInArray(value,array){
		for(var i=0;i<array.length;i++){
			if(value == array[i]){
				return true;
			}
		}
		return false;
	}
	//点击加入购物车按钮，添加对应的商品。
	var sidArray = [];//存放商品id的数组
	var numArray = [];//存放商品加入购物车的次数
	$(".btn-cart").click(function(){
		getGoodsCookie();
		var s = $(this).parent().find(".cover_img").attr("sid");
		if(isInArray(s,sidArray)){
			//如果要加载的商品sid已经在数组中，该商品加1，否则就将该商品加入到购物车中，并将商品的sid加入到数组中
			$(".goods:visible").each(function(){
				if(s == $(this).find(".cover_img").attr("sid")){
					var num = $(this).find(".td-number input").val();		
					num++;
					$(this).find(".td-number input").val(num);
					numArray[sidArray.indexOf(s)] = num;
					$.cookie("cartgoodnum",numArray.toString(),{expires:7,path:'/'});
					var np = parseFloat($(this).find(".td-price .price").html()).toFixed(2);//四舍五入2位数的单价
					$(this).find(".total").html((np*num).toFixed(2));//获取一个物品的总价
					selecNum();//统计已选择商品数量	
					shopP();
				}
			});
		}else{
			sidArray.push($(this).parent().find(".cover_img").attr("sid"));
			$.cookie("cartgoodsid",sidArray.toString(),{expires:7,path:'/'});
			numArray.push(1);
			$.cookie("cartgoodnum",numArray.toString(),{expires:7,path:'/'});
			addInCart($(this).parent().find(".cover_img").attr("sid"),1);
		}	
	});
//	//将制定商品加入购物车
	function addInCart(sid,n){ //sid:当前商品的id，n:商品数量
		$.getJSON("json/collect.json",function(res){
			for(var i=0;i<res.data.length;i++) {
				if(sid == res.data[i].sid){
					var $clone = $(".goods:hidden").clone(true);					
					$clone.find(".td-number").children("input").val(n);
					//取商品的数量
					var num =parseFloat($clone.find(".td-number input").val());
					var price = parseFloat(res.data[i].newpri);//取商品单价
					//写进商品标题
					$clone.find(".goods-title").html(res.data[i].t);
					//写进图片路径和商品sid
					$clone.find(".td-goods .cover_img").attr({
						"sid": res.data[i].sid
					}).css("background-image",res.data[i].img);
					//写进商品单价
					$clone.find(".td-price .price").html(price.toFixed(2));
					//计算单个商品的总价
					$clone.find(".td-total .total").html((price*num).toFixed(2));
					$clone.css("display","block");
					$clone.insertAfter(".goods-header");//插入到goodsheader后
					checkCartStatus();//查看购物车内是否有商品
					selecNum();//统计已选择商品的数量
					shopP();
				}
			}
		});
	}

	//减少商品数量按钮
	$(".reduce").click(function(){
		var a = parseInt($(this).next().val());
		a--;
		if(a<1){
			return false;
		}
		$(this).next().val(a);
		$(this).parents(".td-number").siblings(".td-total").find(".total").html(itemP($(this)));
		shopP();
	});
	//增加商品数量
	$(".add").click(function() {
        var a = parseInt($(this).prev().val());
        a++;
        $(this).prev().val(a);
		$(this).parents(".td-number").siblings(".td-total").find(".total").html(itemP($(this)));
		shopP();
   });
	//手动输入商品数量
	$(".td-number input").change(function() {
		getGoodsCookie();
		if(!isNaN($(this).val())&&$(this).val()>0){			 			$(this).parents(".td-number").siblings(".td-total").find(".total").html(itemP($(this)));
		}else{
			$(this).val(1);
			$(this).parents(".td-number").siblings(".td-total").find(".total").html(itemP($(this)));
		}
   		shopP();
	});
	//单个商品的总价
	function itemP(obj){
		var price =  parseFloat(obj.parents(".td-number").siblings(".td-price").find(".price").html());//单价
		var num = parseFloat(obj.parent().children("input").val());
		return (price * num).toFixed(2);//返回价格
	}
	//该店铺下的商品总价格
	function shopP(){
		var sum=0;
		$(".goods:visible").each(function(){
			if($(this).find(".check").is(":checked")){
				sum += parseFloat($(this).find(".total").html());
			}
		});
		$(".all-total").html(sum.toFixed(2));
		return sum.toFixed(2);
	}
	//统计选中的商品数量，赋值给已选择商品
	function selecNum() {
	    $(".count").html($(".goods:visible input:checked").length);
	}
	//如果两个全选按钮发生改变，重新统计选中商品数量。
	$(".goods").find(".check").change(function() {
	    selecNum(); //重新统计商品总价格。	
	    shopP();
	})
//		更改全选状态
	$(".selall").change(function() {
	    if ($(this).is(":checked")) {
	        $(":checkbox").prop("checked", true);
	    } else {
	        $(":checkbox").prop("checked", false);
	    }
	    selecNum();
	    shopP();
	});
	function removeFromArray(id, array) {
    var arr = [];
    for (var i = 0; i < array.length; i++) {
        if (id != array[i]) {
            arr.push(array[i]);
        }
    }
    sidArray = arr;
    numArray.splice(array.indexOf(id),1);
    $.cookie("cartgoodsid", sidArray.toString(), { expires: 7, path: '/' });
    $.cookie("cartgoodnum", numArray.toString(), { expires: 7, path: '/' });
	}
//		//删除单个
	$(".del").click(function() {
	    getGoodsCookie()
	    removeFromArray($(this).parents(".goods").find(".cover_img").attr("sid"), sidArray);
	    $(this).parents(".goods").remove();
	    selecNum();
	    shopP();
	    checkCartStatus(); //查看购物车内是否有商品
	});
	
	//删除选中
	$(".option a:first-child").click(function() {
	    getGoodsCookie()
	    $(".goods:visible").each(function() {
	        if ($(this).find(":checkbox").is(":checked")) {
	            $(this).remove();
	            removeFromArray($(this).find(".cover_img").attr("sid"), sidArray)
	        }
	    })
	    selecNum();
	    shopP();
	    checkCartStatus() //查看购物车内是否有商品
	});

	//查看购物车内是否有商品
	function checkCartStatus() {
	    if ($.cookie("cartgoodsid")) {
	        $(".cart-empty").css("display", "none");
	        $(".goods-header").css("display", "block");
	    } else {
	         $(".cart-empty").css("display", "block");
	        $(".goods-header").css("display", "none");
	        $(".goods").css("display", "none");
	    }
	}
				//商品数量改变时修改cookie
	$(".reduce,.add").click(function() {
	    getGoodsCookie();
	    var index = sidArray.indexOf($(this).parents(".goods").find(".cover_img").attr("sid"));
	    numArray[index] = $(this).siblings("input").val();
	    console.log($(this).siblings("input").val());
	    console.log(numArray);
	    $.cookie("cartgoodnum", numArray.toString(),{ expires: 7, path: '/' });
	});
});

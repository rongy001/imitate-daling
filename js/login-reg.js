//登录注册切换
$(function(){
	var $loginTabs = $(".login_tabs a");
	var $loginForm = $(".login_main form");
	$loginTabs.click(function(){
		var $index = $loginTabs.index(this);
		$(this).addClass("active").siblings().removeClass("active");
		$loginForm.eq($index).show().siblings("form").hide();
	});
});
//登录表单
$(function(){
	var $inputList = $(".ctrl input");
	var $loginSign = $(".login_sign span");
	$inputList.focus(function(){
		var $index = $inputList.index(this);
		$inputList.css("border","1px solid #ccc");
		$(this).css("border","1px solid #94d469");
		$loginSign.css("background-position-x","");
		$loginSign.eq($index).css("background-position-x","0");
	});
});
//注册表单
$(function(){
	var $captcha = $(".captcha");
	var init=0;
	var $checkbox = $("#checkbox");
	var $submitBtn = $(".submit_btn");
	$.getJSON("json/verify.json",function(data){
		$captcha.attr("src",data[0].src);
		$captcha.click(function(){
			init++;
			if(init>5){
				init=0;
			}
			$captcha.attr("src",data[init].src);
		});
	});
	//手机号验证
	var $userReg = /^1[34578]\d{9}$/;
	var $mobile = $("#reg_mob");
	var $verify = $(".verify");
	$mobile.focusout(function(){		
		if(!($userReg.test($mobile.val()))){
			$("#mobile-error").show();
			$(this).css("background","#fdf3fd");
			return false;
		}else{
			$("#mobile-error").hide();
			$(this).css("background-color","rgb(250, 255, 189)");
		}
	});
	//密码验证
	var $psdReg = /\w{6,17}/;
	var $psd = $("#reg_psd");
	$psd.focusout(function(){
		if(!($psdReg.test($psd.val()))){
			$("#psd-error").show();
			$(this).css("background","#fdf3fd");
			return false;
		}else{
			$("#psd-error").hide();
			$(this).css("background-color","rgb(250, 255, 189)");
		}
	});
	//提交注册结果
	function isInArray(n, a) {
        for (var i = 0; i < a.length; i++) {
            if (n == a[i]) {
                return true;
            }
        }
        return false;
    }
	var arruser = [];
	var userMob = null;
	var psd = null;
	$.getJSON("json/verify.json",function(data){
		$("#register").click(function(){
			//验证码验证
			var $verifyVal = $verify.val();
			$verifyVal = $verifyVal.toLowerCase();
			if($verifyVal != data[init].cont){
				$("#verify-error").show();
				$verify.css("background","#fdf3fd");
				return false;
			}else{
				$("#verify-error").hide();
				$(this).css("background-color","rgb(250, 255, 189)");
			}			
			userMob = $mobile.val();
			psd = $psd.val();
			if($.cookie('user')==undefined){
				arruser.push(userMob);
	            arruser.push(psd);
	            $.cookie('user',arruser.toString(),{
	            	expires:7,
	            	path: '/'
	            });
	            window.location = "login-reg.html";
			}else{
				arruser = $.cookie("user").split(",");
	            if (isInArray(userMob, arruser)) {
	                alert('该手机号已被注册');
	            } else {
	                arruser.push(userMob);
	                arruser.push(psd);
	                $.cookie('user',arruser.toString(),{
	                	expires:7,
	                	path: '/'
	                });
	                window.location = "login-reg.html";
	            }
			}
		});
	});
	//登录
	var $loginMob = $("#login_mob");
	var $loginPsd = $("#login_psd");
	var login = $("#login");
	login.click(function(){
		if(!$.cookie("user")){
			alert("不存在此用户");
		}else{	
		var userInfo = $.cookie('user');
		var userInfoArr = userInfo.split(",");
		
		if(isInArray($loginMob.val(),userInfoArr)){
			var $index = $.inArray($loginMob.val(),userInfoArr);
			if($loginPsd.val()!=userInfoArr[$index+1]){
				alert("用户名与密码不匹配");
			}else{
				$.cookie('userMob',$loginMob.val(),{
					expires:7,
					path: '/'
				});
				$.cookie('userPsd',$loginPsd.val(),{
					espires:7,
					path: '/'
				});
				window.location = "index.html";
			}
		}else{
			alert("用户名与密码不匹配");
		}
		}
	});
	
});
//引入公用html
$(function(){
	$(".footer").load("html/footer.html");
});
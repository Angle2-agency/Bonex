var clock;
$(document).ready(function() {	
	setTimeout(function(){		
		$(document).scrollTop(0);
		frameStarts.init();
		scroller();
	}, 50);	
	/*
	$.scrollSpeed(200, 800);
	
	$("body").niceScroll({
		scrollspeed: 70,
    	mousescrollstep: 100,
    	hwacceleration: true,
    	smoothscroll: true
	});
	*/
	//$(".body").smoothWheel();	
	

	var startTime = (1515405600000 - new Date().getTime()) / 1000;
	// Grab the current date
	var currentDate = new Date();

	// Set some date in the past. In this case, it's always been since Jan 1
	var pastDate  = new Date(currentDate.getFullYear(), 0, 1);

	// Calculate the difference in seconds between the future and current date
	var diff = currentDate.getTime() / 1000 - pastDate.getTime() / 1000;

	// Instantiate a coutdown FlipClock
	clock = $('#timer').FlipClock(startTime, {
		clockFace: 'DailyCounter',
		language : 'ru',
		showSeconds: false,
		countdown : true,
		enabletranslate3d: true
	});
	
	$(document).scroll(function(e){		
		scroller();		
	});


	$('[data-click="registration"]').click(function(){
		var pos = $('.frame-5_form-block .form').offset().top;
		$('html, body').animate({scrollTop:pos - 40}, 500);
		return false;
	});
	$('[data-click="how-it-works"]').click(function(){
		var pos = $('.frame-3').offset().top;
		$('html, body').animate({scrollTop:pos + 40}, 500);
		if($('header').hasClass('show-nav'))$('header .nav_but').click();		
		return false;
	});
	$('[data-click="benefits"]').click(function(){
		var pos = $('.frame-4').offset().top;
		$('html, body').animate({scrollTop:pos + 30}, 500);
		if($('header').hasClass('show-nav'))$('header .nav_but').click();		
		return false;
	});
	$('header .nav_but').click(function(e){
		$('header').toggleClass('show-nav');
		if($('header').hasClass('show-nav')){
			$('body').css({
				width : '100%',
				height : '100%',
				overflow : 'hidden'
			});
		}else{
			$('body').removeAttr('style');
		}
	})

	$('#frame-5-form').submit(function(e){
		$.ajax({
		  type: "POST",
		  url: "do.php?action=register",
		  dataType : 'json',
		  data: {
		  	name : $('#frame-5-form input[name="name"]').val(),
		  	email : $('#frame-5-form input[name="email"]').val(),
		  	company : $('#frame-5-form input[name="company"]').val(),
		  	activity : $('#frame-5-form input[name="activity"]').val(),
		  	agreement : $('#frame-5-form input[name="agreement"]').is(':checked')
		  },
		  success: function(data){
		  	if(data.status == 'OK'){
		  		$('.frame-5').addClass('submit');
		  		$('.frame-5 .popup_wrapper, .frame-5 .popup').fadeIn(400);
		  		$('#frame-5-form input').val('');
		  		$('#frame-8-form .input-block').removeClass('error');
		  	}
		  	if(data.status == 'VALIDATION_FAILED'){
		  		$('#frame-5-form .input-block').removeClass('error');		  		
		  		if(data.data.errors.empty.length){
		  			for(var i in data.data.errors.empty){
		  				$('#frame-5-form input[name="'+data.data.errors.empty[i]+'"]').closest('.input-block').addClass('error');		  			
		  			}	
		  		}
		  		if(data.data.errors.invalid.length){
		  			for(var i in data.data.errors.invalid){
		  				$('#frame-5-form input[name="'+data.data.errors.invalid[i]+'"]').closest('.input-block').addClass('error');		  			
		  			}		
		  		}
		  		
		  	}		
		  	console.log(data);  	
		  }
		  	
		});		
		return false;
	});
	$('#frame-8-form').submit(function(e){
		$.ajax({
		  type: "POST",
		  url: "do.php?action=subscribe",
		  dataType : 'json',
		  data: {
		  	name : $('#frame-8-form input[name="name"]').val(),
		  	email : $('#frame-8-form input[name="email"]').val()		  	
		  },
		  success: function(data){
		  	if(data.status == 'OK'){
		  		$('.frame-8').addClass('submit');
		  		$('.frame-8 .popup_wrapper, .frame-8 .popup').fadeIn(400);
		  		$('#frame-8-form input').val('');
		  		$('#frame-8-form .input-block').removeClass('error');
		  	}
		  	if(data.status == 'VALIDATION_FAILED'){
		  		$('#frame-8-form .input-block').removeClass('error');
		  		if(data.data.errors.empty.length){
		  			for(var i in data.data.errors.empty){
		  				$('#frame-8-form input[name="'+data.data.errors.empty[i]+'"]').closest('.input-block').addClass('error');		  			
		  			}	
		  		}
		  		if(data.data.errors.invalid.length){
		  			for(var i in data.data.errors.invalid){
		  				$('#frame-8-form input[name="'+data.data.errors.invalid[i]+'"]').closest('.input-block').addClass('error');		  			
		  			}		
		  		}
		  	}
		  	console.log(data);
		  }		  	
		});				
		return false;
	});
	$('.popup_wrapper, .popup .close').click(function(){
		$('.popup_wrapper, .popup').fadeOut(400);		
		setTimeout(function(){
			$('article').removeClass('submit');	
		}, 600)
	});
});


var frameStarts = {
	points : {},	
	init : function(){
		var h = 300;
		frameStarts.points.frame1 = $('.frame-1').offset().top;
		frameStarts.points.w1 = $('.frame-2 .w1').offset().top - 500;
		frameStarts.points.ul1 = $('.frame-2 .ul-1').offset().top - 600;
		frameStarts.points.ul2 = $('.frame-2 .ul-2').offset().top -500;
		frameStarts.points.ul3 = $('.frame-2 .ul-3').offset().top -750;
		frameStarts.points.frame3 = $('.frame-3').offset().top -h;
		frameStarts.points.frame4 = $('.frame-4').offset().top - 400;		
		frameStarts.points.frame5Form = $('.frame-5 .frame-5_form-block').offset().top - 300;
		frameStarts.points.frame5macText = $('.frame-5 .frame-5_mac-block .wrapper .mac-text').offset().top - 500;
		frameStarts.points.frame5macLines = $('.frame-5 .frame-5_mac-block .frame-5_lines').offset().top - 250;
		frameStarts.points.frame8 = $('.frame-8').offset().top - 400;		
	}
		
}

function scroller(){
	var top = $(document).scrollTop();	
	if(top >= 0 && !$('.frame-1').hasClass('animate')){
		$('.frame-1').addClass('animate')
	}
	if(top >= frameStarts.points.w1 && !$('.frame-2 .w1').hasClass('animate')){
		$('.frame-2 .w1').addClass('animate');
	}
	if(top >= frameStarts.points.ul1 && !$('.frame-2 .ul-1').hasClass('animate')){
		$('.frame-2 .ul-1').addClass('animate');
	}
	if(top >= frameStarts.points.ul2 && !$('.frame-2 .ul-2').hasClass('animate')){
		$('.frame-2 .ul-2').addClass('animate');
	}
	if(top >= frameStarts.points.ul3 && !$('.frame-2 .ul-3').hasClass('animate')){
		$('.frame-2 .ul-3').addClass('animate');
	}
	if(top >= frameStarts.points.frame3 && !$('.frame-3').hasClass('animate')){
		$('.frame-3').addClass('animate');
	}
	if(top >= frameStarts.points.frame4 && !$('.frame-4').hasClass('animate')){
		$('.frame-4').addClass('animate');
	}
	if(top >= frameStarts.points.frame5Form && !$('.frame-5 .frame-5_form-block').hasClass('animate')){
		$('.frame-5 .frame-5_form-block').addClass('animate');
	}
	if(top >= frameStarts.points.frame5macText && !$('.frame-5 .frame-5_mac-block .wrapper .mac-text').hasClass('animate')){
		$('.frame-5 .frame-5_mac-block .wrapper .mac-text').addClass('animate');
	}
	if(top >= frameStarts.points.frame5macLines && !$('.frame-5 .frame-5_mac-block .frame-5_lines').hasClass('animate') && !$('.frame-5 .frame-5_mac-block .wrapper .macbook').hasClass('animate')){
		$('.frame-5 .frame-5_mac-block .frame-5_lines').addClass('animate');
		$('.frame-5 .frame-5_mac-block .wrapper .macbook').addClass('animate');
	}
	if(top >= frameStarts.points.frame8 && !$('.frame-8').hasClass('animate')){
		$('.frame-8').addClass('animate');
	}
}
$(document).ready(function() {
	$.scrollSpeed(200, 800);
	//$('.frame-5').addClass('animate');
	//$('.frame-2 ul').addClass('animate');
	frameStarts.init();
	scroller();
	$(document).scroll(function(e){
		scroller();		
	});
	console.log(frameStarts.points);
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
		frameStarts.points.frame5Form = $('.frame-5 .frame-5_form-block').offset().top -h;	}
}

function scroller(){
	var top = $(document).scrollTop();
	console.log(top >= frameStarts.points.w1);
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
}
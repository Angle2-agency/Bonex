$(document).ready(function() {
	$.scrollSpeed(100, 800);
	//$('.frame-1').addClass('animate');
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
		var h = $('body').height() / 3.5;
		frameStarts.points.frame1 = $('.frame-1').offset().top;
		frameStarts.points.w1 = $('.frame-2 .w1').offset().top - h;
		frameStarts.points.ul1 = $('.frame-2 .ul-1').offset().top - h;
		frameStarts.points.ul2 = $('.frame-2 .ul-2').offset().top -h;
		frameStarts.points.ul3 = $('.frame-2 .ul-3').offset().top -h;
	}
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
}
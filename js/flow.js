$(document).on('pageshow', '.flow', function(){
	console.log( '.flow pageshow');
    
    $('.flow_slide').bxSlider({
        slideSelector: '.flow_slide_card',
        infiniteLoop: false,
        hideControlOnEnd: true
    });
	

});

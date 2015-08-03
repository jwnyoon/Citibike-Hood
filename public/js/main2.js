$('.community').click(function() {
	// drawmap();
	callHood();
	$('.des').hide();
 	$('.des2').hide();
	$('.des1').show();
	$('.Group').show();
		$('.GroupDes').show();
	$('.community').css('background-color', 'rgba(255,85,85,0.5)');
	$('.realtime').css('background-color', 'rgba(255,255,255,0.5)');



});

$('.realtime').click(function() {

	// drawmap();
	callrealtime();
	$('.des1').hide();
	$('.des').show();
		$('.des2').show();
		$('.Group').hide();
		$('.GroupDes').hide();
	$('.community').css('background-color', 'rgba(255,255,255,0.5)');
	$('.realtime').css('background-color', 'rgba(255,85,85,0.5)');



});

// $('.factor').click(function() {

// 	$('.cuisine').css('border-color', 'rgba(255,255,255,0.5)');
// 	$('.foodtype').css('border-color', 'rgba(255,255,255,0.5)');
// 	$('.factor').css('border-color', 'rgba(72,194,244,1)');
// });


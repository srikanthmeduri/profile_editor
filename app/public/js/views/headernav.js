$(function () {
	console.log('dddddddddddddddd');
	console.log($);
	var x = $('#nav a');
	console.log(x.length);
	$('#nav li').click(function(){
		$(this).addClass('active');
	});
});
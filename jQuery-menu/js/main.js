$(document).ready(function() {
	$(".menu").click(function() {
		$(".main-menu, .close-button").addClass("make-visible");
		$(".menu").hide();
	});
		$(".close-button").click(function() {
			$(".main-menu, .close-button").addClass("make-invisible");
			$(".menu").show();
		});
});




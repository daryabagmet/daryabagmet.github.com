$(document).ready(function(){
    		$(".arrow-click").click(function(){
    			$(".white-square").css("transform", "rotate(136deg)");
    			$(".slide").toggle(); 
    });
    		$(".close-icon").click(function(){
    			$(".slide").hide();
        		$(".white-square").css("transform", "rotate(314deg)");
    });
});
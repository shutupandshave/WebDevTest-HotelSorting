// AQKA Test Javascript
// Author: James Lawrence @ 2012
// 

$(document).ready(function() {
	//writes the show/hide link using JS as the link is worthless without JS
	$('.news').after('<p class="toggleNews"><a href="#">Show / Hide news item</a></p>');
	
	$('.toggleNews a').click(function(e) {
		$('.newsItem').toggleClass('hidden');
		e.preventDefault();
	});

	// would probably write this as a plug-in if it wasn't just 2 items of validation.  Seems overkill to do so in this case.

	$('input:submit').click(function(e) {
		$('.errorMSG').remove();
		var errors = false;
		
		/* could have built up an array here and pushed error messages in then joined it at the end and alerted, but I dont like alerting for accessibility, but with such a simple form, 
		lets keep it simple for the plug-in downloaders to edit.  Also could have added Aria roles but once again, for such a simple form I think it's overkill */
		var error_name = '<p class="errorMSG">Please enter your name</p>';
		var error_email = '<p class="errorMSG">Please enter a valid email address</p>';
		var error_CTN = '<p class="errorMSG">Please enter a valid phone number of 11 numbers or less</p>';
		var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		
		if (!$('#name').val()) {
			$('#name').after(error_name);
			errors = true;
		}
		
		var email = $('#email').val()
		if (!email.length || (!email.match(regex))) {
			$('#email').after(error_email);
			errors = true;
		}
		
		var number = $('#ctn').val();
		if (number.length) {
			if (isNaN(number) || number.length > 11) {
				$('#ctn').after(error_CTN);
				errors = true;
			}
		}		
		if (errors = true) e.preventDefault();
	
	});

});
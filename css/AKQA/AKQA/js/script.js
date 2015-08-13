// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name script.min.js
// ==/ClosureCompiler==

/* Author: James Westgate (jamesw@opencomponents.com)
*/

$(document).ready(function(){
	
	//Show or hide the news item
	$('#main #toggle-news').click(function(e){
		
		var item = $('div.news-item');
		
		if (item.is(':hidden')) {
			item.css('opacity',100).show();
		}
		else {
			item.animate({opacity: 0}, {duration:400, complete: function() {
				$(this).hide();
			}});
		}
		e.preventDefault();
	})
	
	//Validate the contact form	
	$('#contact-form').submit(function(e){
		
		var message = []; //Use an array to build up a string for perf. reasons in older browsers
		
		//Validate name
		if (!$('#contact-name').val().length) message.push('Please enter your name.');
		
		//Validate email
		var email = $('#contact-email').val();
		if (email.length) {
			
			//Use a regex to validate the emails addresses
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    		if (!re.test(email)) message.push('Please enter a valid email address');
		}
		else {
			message.push('Please enter an email address');
		}
		
		//Validate number as only digits
		var number = $('#contact-phone').val();
		if (number.length) {
			if (isNaN(number) || number.length > 11) message.push('Please enter a phone number consisting of 11 or less digits only.');
		}
		
		//Show a message and cancel the form submission if there are any validation messages
		if (message.length) {
			alert(message.join('\r\n'));
			e.preventDefault();
		}
	})
})









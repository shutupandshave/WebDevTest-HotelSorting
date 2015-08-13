// AQKA Test Javascript
// Author: James Lawrence @ 2015
// 

$(document).ready(function() {
	
	function init() {
			$( '.add' ).on( 'click', function(event) {
				event.preventDefault();
  				add($(this));
			});
			$( '.subtract' ).on( 'click', function(event) {
				event.preventDefault();
  				subtract($(this));
			});
			$( '.delete' ).on( 'click', function(event) {
				event.preventDefault();
  				deleteItem($(this));
			});
			$( 'table tbody tr td:eq(2) input' ).on("keypress", function() {
			  	validate(event, $(this));
			});
			$( 'input[id*=itemID]' ).each(function(){
				$(this).on("keyup", function() {
					if ($(this).val() > 9){
						//alert('You're only allowed a maximum of 10 items');
						$(this).val('10');
					}
					total();
				});
			});
			zebra('basket_table', '#ffffff', '#dddddd');
			total();
	}
	
	function zebra(classname,firstcolor,secondcolor)
	{
	   var tableElements = $('.basket_table');
	   for(var j= 0; j < tableElements.length; j++)
	   {
		  var table = tableElements[j] ;
	
		  var rows = table.getElementsByTagName('tr') ;
		  for(var i = 0; i < rows.length; i++)
		  {
			rows[i].bgColor = (i%2==0) ? firstcolor : secondcolor ;
		  }
	   }
	}
	function add(el) {
		var qty = $(el).parent().children('input').val();
		if (qty < 10) {
			qty++;
			$(el).parent().children('input').val(qty);
			total();
		}
		
	}
	
	function subtract(el) {
		var qty = $(el).parent().children('input').val();
		if (qty > 1) {
			qty--;
			$(el).parent().children('input').val(qty);
			total();
		}
	}
	function deleteItem(el) {
		var tr = $(el).closest('tr');
        tr.remove();
		zebra('basket_table', '#ffffff', '#dddddd');
		total();
		
        return false;
	}
	
	function validate(ev, el) {
		// add code for edge case of only allowing a 10
		if ((ev.keyCode > 48 && ev.keyCode < 58) || (el.val() == 1 && ev.keyCode == 48)) {
			return;
		}
		else {
			//alert('only numbers, fool');
			ev.preventDefault();
		}
		
	}
	
	function total() {
		var sub_total = 0
		$('tbody > tr').each(function() {
   			var row = $(this);
    		var data_1 = row.find('> td:eq(1)').text();
			var data_2 =  parseFloat(row.find('> td:eq(2) input').val());
			data_1 = data_1.replace(/^.*£/, '');
			var total = parseFloat(data_1) * data_2;
			total = total.toFixed(2);
			row.find('> td:eq(3)').text('£' + total);
			
			sub_total = parseFloat(sub_total) + parseFloat(total);
			//alert(sub_total);
			
		});
		//find subtotal
		$('tfoot > tr:eq(0) td:eq(1)').text('£' + sub_total.toFixed(2));
		$('tfoot > tr:eq(1) td:eq(1)').text('£' + (sub_total * 0.2).toFixed(2));
		$('tfoot > tr:eq(2) td:eq(1)').text('£' + (sub_total * 1.2).toFixed(2));
		if (sub_total == 0) {
				$('button.buy').addClass('disabled').attr("disabled", true);

				$('button.buy').click(function(e) {
				e.preventDefault();
			});
				
		}
	}
	$("form#basket_form").submit(function(e){
	//stolen from the web, and would need modifying.  Doesn't work at the moment but I'm out of time.
	 e.preventDefault();

    var data = {}
    var Form = this;

    //Gathering the Data
    //and removing undefined keys(buttons)
    $.each(this.elements, function(i, v){
            var input = $(v);
        data[input.attr("name")] = input.val();
        delete data["undefined"];
    });

    $.ajax({
        cache: false,
        url : "basket.jsp",
        type: "POST",
        dataType : "json",
        data : JSON.stringify(data),
        context : Form,
        success : function(callback){
            //Where $(this) => context == FORM
            console.log(JSON.parse(callback));
            alert('success');
        },
        error : function(){
           	alert('failure');
        }
   	 });
	});
	init();
});
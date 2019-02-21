$("select").change(function () {
			var str = "";
			str = $(this).find(":selected").text();
			$(this).next(".out").text(str);
		}).trigger('change');
  // Select box JS Ends here
  
  
// Notification open and close Starts here  
$('#theNotif').click(function() { return false; });
	$('#notifikasi').click(function(){
		$('#theNotif, .aro').fadeIn('fast', function() {
			$(document).one('click', function(e) {
				$('#theNotif, .aro').fadeOut('fast');
			});
		});
});// Notification open and close Ends here


// Notification open and close Starts here 

$(".related_list").click(function() { return false; });
	$('#related').click(function(){
		$(".related_list").fadeIn('fast', function() {
			$(document).one('click', function(e) {
				$(".related_list").fadeOut('fast');
			});
		});
});// Notification open and close Ends here



// Close through cross buttn Starts here
$(function() {
    $('.close').click(function() {
        $('#theNotif, .aro').hide();
        return false;
    });
});// Close through cross buttn Ends here

// Refine search open and close Starts here  
$('#refine_cont').click(function() { return false; });
	$('#refine').click(function(){
		$('#refine_cont').fadeIn('fast', function() {
			$(document).one('click', function(e) {
				$('#refine_cont').fadeOut('fast');
			});
		});
});// Refine search open and close Ends here

	
		
// Notification open and close Starts here  
$('.exam_items').click(function() { return false; });
	$('.exam_dot').click(function(){
		$('.exam_items').fadeIn('fast', function() {
			$(document).one('click', function(e) {
				$('.exam_items').fadeOut('fast');
			});
		});
});// Notification open and close Ends here

	
	

$(document).ready(function(event){


	$.fn.poptext = function(){

		return this.each(function(){

			var t = $(this);

			$(window).on("click.Bst", function(event){

				var poptext = $(".pop-text" + t.data("index"));
					var posx = event.clientX;
					var posy = event.clientY - t.position().top;
				if(poptext.length > 0)	{
					poptext.remove();
				}
				if (t.has(event.target).length == 0 &&  !t.is(event.target) ){
					poptext.fadeOut("fast").remove();
				} else {
					var div = $("<div/>", { 
									class: "pop-text pop-text" + t.data("index") ,
									html: t.data("text") })
								
		            t.append(div);
		            div.fadeIn("fast");
				}
			});

		});

	};


	$(".popbox").poptext();
});

$(function() {
    $('.custum_date').on('click', function(e) {
        if (e.target.id == 'customDate' || e.target.id == 'custom_date' || e.target.id == 'custom_date_select' || e.target.id == 'start_date' || e.target.id == 'end_date' || e.target.id == 'customRange' || e.target.id == 'datepicker_previous' || e.target.id == 'datepicker_next' || e.target.id == 'widget_header' || e.target.id=='title_datepicker' ) {
           $("#custom_date").show();
			$("#custom_datec").hide();
        } else {
           $("#custom_date").hide();
		   $('#ui-datepicker-div').hide();
		   $('#customRange').val($('#start_date').val()+'-'+$('#end_date').val());
        }
    })
});
$(function() {
	$('.custum_date2').on('click', function(e) {
		 if(e.target.id == 'customDatec' || e.target.id == 'custom_datec' || e.target.id == 'custom_date_selectc' || e.target.id == 'start_datec' || e.target.id == 'end_datec' || e.target.id == 'customRangec' || e.target.id == 'datepicker_previous' || e.target.id == 'datepicker_next' || e.target.id == 'widget_header' || e.target.id=='title_datepicker'){
		 $("#custom_datec").show();
		 }else {
		 $("#custom_datec").hide();
		 //$('#ui-datepicker-div').hide();
		 $('#customRangec').val($('#start_datec').val()+'-'+$('#end_datec').val());
		 }
	})
});
$(document).ready(function(event){
	$("#custom_date").hide();
	$(document).on('click','#apply',function(){
		$("#custom_date").hide();
		$('#customRange').val($('#start_date').val()+'-'+$('#end_date').val());
	});
	$(document).on('click','#dateReset',function(){
		$('input[name="day"]').prop('checked', false);
		$('#start_date').val('');
		$('#end_date').val('');
		$('#customDate').val('');
		$('#customRange').attr('type','hidden');
		$('#customRange').val('');
		$('#customDate').attr('placeholder','Please Select Date');
	});
});

$(document).ready(function(event){
	$("#custom_datec").hide();
	$(document).on('click','#applyc',function(){
		$("#custom_datec").hide();
		$('#customRangec').val($('#start_datec').val()+'-'+$('#end_datec').val());
	});
	$(document).on('click','#dateResetc',function(){
		$('input[name="day"]').prop('checked', false);
		$('#start_datec').val('');
		$('#end_datec').val('');
		$('#customDatec').val('');
		$('#customRangec').attr('type','hidden');
		$('#customRangec').val('');
		$('#customDatec').attr('placeholder','Please Select Date');
	});
});

$(document).ready(function(event){
	$("#custom_datec").hide();
	$(document).on('click','#apply',function(){
		$("#custom_date").hide();
		$('#customRange').val($('#start_date').val()+'-'+$('#end_date').val());
	});
	//$(document.body).on('click',function(){$("#custom_date").hide();});
	$(document).on('click','#dateReset',function(){
		$('input[name="day"]').prop('checked', false);
		$('#start_date').val('');
		$('#end_date').val('');
		$('#customDate').val('');
		$('#customRange').attr('type','hidden');
		$('#customRange').val('');
		$('#customDate').attr('placeholder','Please Select Date');
	});
});
$(function() {
	$(document.body).on('click', function(e) {
		//alert(e.target.id);
		var isVisible = $('#custom_datec').is(':visible');
		var isVisible1 = $('#custom_date').is(':visible');
		 if (e.target.id == 'customDatec' || e.target.id == 'custom_datec' || e.target.id == 'custom_date_selectc' || e.target.id == 'start_datec' || e.target.id == 'end_datec' || e.target.id == 'customRangec' || (isVisible==true && ( e.target.id == 'datepicker_previous' || e.target.id == 'datepicker_next' || e.target.id == 'widget_header' || e.target.id=='title_datepicker') ) ) {
			$("#custom_datec").show();
			
		}
		else if (e.target.id == 'customDate' || e.target.id == 'custom_date' || e.target.id == 'custom_date_select' || e.target.id == 'start_date' || e.target.id == 'end_date' || e.target.id == 'customRange' || (isVisible1==true && ( e.target.id == 'datepicker_previous' || e.target.id == 'datepicker_next' || e.target.id == 'widget_header' || e.target.id=='title_datepicker') ) ) {
			$("#custom_date").show();
			
		}
		 else {
			$("#custom_date").hide();
			$("#custom_datec").hide();
		}

	})
});



$(document).ready(function(){

  $('.reply_contact').each(function() {
    var $dropdown = $(this);
	var $dropact = $(this);

    $(".more_links", $dropdown, $dropact).click(function(e) {
      e.preventDefault();
      $(".reply-box", $dropdown).toggle();
	  $(".more_links", $dropact).toggleClass("active");
      return false;
    });

});
    
  $('html').click(function(){
    $(".reply-box").hide();
	$(".more_links").removeClass("active");
  });
  
  });



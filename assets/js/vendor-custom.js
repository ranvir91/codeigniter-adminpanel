// JavaScript Document
var fooXHR;
function createFormValid() {
	if ($('#dtp_input2').val() == '') {
		$('.alert-danger').show();
		$('#dt_input').focus();
		return false;
	}

	if ($("#del_type").attr("selectedIndex") == 0) {
		$('.alert-danger').show();
		$('.selectdiv').click();
		return false;
	}
	if ($('#vendor_ref_num').val() == '') {
		$('.alert-danger').show();
		$('#vendor_ref_num').focus();
		return false;
	}
	if ($('#product_description').val() == '') {
		$('.alert-danger').show();
		$('#product_description').focus();
		return false;
	}
	if ($('#price').val() == '') {
		$('.alert-danger').show();
		$('#price').focus();
		return false;
	}
	if ($('#address').val() == '') {
		$('.alert-danger').show();
		$('#address').focus();
		return false;
	}
	if ($('#pincode').val() == '') {
		$('.alert-danger').show();
		$('#pincode').focus();
		return false;
	}
	if ($('#city').val() == '') {
		$('.alert-danger').show();
		$('#city').focus();
		return false;
	}
	if ($('#state').val() == '') {
		$('.alert-danger').show();
		$('#state').focus();
		return false;
	}

	if ($('#phone').val() == '') {
		$('.alert-danger').show();
		$('#phone').focus();
		return false;
	}
	if ($('#message').val() == '') {
		$('.alert-danger').show();
		$('#message').focus();
		return false;
	}
	if ($('#spl_instruction').val() == '') {
		$('.alert-danger').show();
		$('#spl_instruction').focus();
		return false;
	}

	$('.alert-danger').hide();



}


$('#all_craeted_orders').click(function(){
	$(this).addClass('selected');
	newurl = base_url+'vendor/all_orders';
	$( ".form_wrap" ).load( newurl );
});

$('.search_button_order_out').click(function(){

	var sarch_str = $('#search_order_out').val();
	if(sarch_str != ""){
		$('.loading').show();
		url = base_url+'vendor/header_orders_search';
		if (fooXHR) fooXHR.abort();	
				fooXHR = $.ajax({
						   type: "POST",
						   url: url,
						   data: { sarch_str:sarch_str }, // serializes the form's elements.
						   success: function(result){
							   	//console.log(result);
								$('.loading').hide();
							   	var data = $.parseJSON(result);
								$('div.custom-search-bg').show();
								$('div.rightBody_container').html(data.result);
																
						   }
						});
	}
	});

function in_orders(e,activeTab) {
	url = $(e).attr('data-href');
	$('ul.listMenu li').each(function(){
		var inactive =  $(this).find('a').attr('data-href');
		if(inactive != url){
			$(this).find('a').removeClass( "selected");
		}
	});
	$(e).addClass('selected');
	$('.loading').show();
	if (fooXHR) fooXHR.abort();	
				fooXHR = $.ajax({
						   type: "POST",
						   url: url,
						   data: { in_order:'active' }, // serializes the form's elements.
						   success: function(result){
							   	//console.log(result);
								//$('.loading').hide();
								var data = $.parseJSON(result);
								$('div.rightBody_container').hide();
								$('div.rightBody_container').html(data.result);
								$('div.custom-search-bg').show();
								$("select#lstOrderStatus-1").multiselect("deselectAll", false);
																
								if(activeTab !='all'){
									$('#lstOrderStatus-1 option[value=' + activeTab + ']').prop('selected', true);
									$('input:checkbox[value="'+activeTab+'"]').prop('checked', true);
									$('#lstOrderStatus-1').multiselect('select',"'"+activeTab+"'");
								}else{
									$("#lstOrderStatus-1").multiselect('selectAll', false);
    							}
								$("#lstOrderStatus-1").multiselect('updateButtonText');
								$('button.btn-info').click();
						   }
						});
}

function billing(e) {
	url = $(e).attr('data-href');
	$('ul.listMenu li').each(function(){
		var inactive =  $(this).find('a').attr('data-href');
		if(inactive != url){
			$(this).find('a').removeClass( "selected");
		}
	});
	$(e).addClass('selected');
	$('.loading').show();
	if (fooXHR) fooXHR.abort();	
				fooXHR = $.ajax({
						   type: "POST",
						   url: url,
						   data: { billing:'active' }, // serializes the form's elements.
						   success: function(result){
							   		$('.loading').hide();
									$('div.custom-search-bg,.out_footer').hide();
									$('div.rightBody_container').html(result);
						   }
						});
}
function vendorProductcost(e) {
	url = $(e).attr('data-href');
	$('ul.listMenu li').each(function(){
		var inactive =  $(this).find('a').attr('data-href');
		if(inactive != url){
			$(this).find('a').removeClass( "selected");
		}
	});
	$(e).addClass('selected');
	$('.loading').show();
	if (fooXHR) fooXHR.abort();
	fooXHR = $.ajax({
		type: "POST",
		url: url,
		data: { billing:'active' }, // serializes the form's elements.
		success: function(result){
			$('.loading').hide();
			$('div.custom-search-bg').hide();
			$('div.rightBody_container').html(result);
		}
	});
}



function view_order(e,param) {
    $(".out_footer").hide();
	url = $(e).attr('data-href');
	
	$('.loading').show();
	if (fooXHR) fooXHR.abort();	
				fooXHR = $.ajax({
						   type: "POST",
						   url: url,
						   data: { vieworder:'active',activetab:param }, // serializes the form's elements.
						   success: function(result){
							   		$('.loading').hide();
									$('div.custom-search-bg').hide();
									$('div.rightBody_container').html(result);
									$("select").change(function () {
										var str = "";
										str = $(this).find(":selected").text();
										$(this).next(".out").text(str);
									}).trigger('change');
							   		
						   }
						});
}

function view_order_noti(e) {
	url = $(e).attr('data-href');
    	var win = window.open(url, '_blank');
    	if (win) {
        	win.focus();
    	}
}

$(document).on('click','.sorting', function(){

   var field = $(this).attr('data-field');
    var typ = 	$(this).attr('data-type');
	 var show = typ=='ASC'?'DESC':'ASC';
	 $(this).attr('data-type',show);
	url = base_url+'vendor/search_orders_ajax/';
	$('.loading').show();
	if (fooXHR) fooXHR.abort();	
		fooXHR = $.ajax({
						   type: "POST",
						   url: url,
						   data: {order_by:field+' '+typ},
						   success: function(result){
							$('.loading').hide();
							  var data = $.parseJSON(result);
								$('.bottom_pagination').html(data.pagging);
								$("#orders_in_ajax").html(data.result);	
							}
		});
		
});

$(document).on('submit','#filter_form',function(event){
	url = base_url+'vendor/get_vendor_orders';
	$('.loading').show();
	if (fooXHR) fooXHR.abort();
	fooXHR = $.ajax({
						   type: "POST",
						   url: url,
						   data: $(this).serialize(), // serializes the form's elements.
						   success: function(result){
							   $('.loading').hide();
							   $('#vendor_invoice_orders').html(result);
						   }
				});
	event.preventDefault();
});

$(document).on('submit','#filter_formmer',function(event){
	url = base_url+'vendor/get_vendor_orders_mer';
	$('.loading').show();
	if (fooXHR) fooXHR.abort();
	fooXHR = $.ajax({
		type: "POST",
		url: url,
		data: $(this).serialize(), // serializes the form's elements.
		success: function(result){
			$('.loading').hide();
			$('#vendor_invoice_orders').html(result);
		}
	});
	event.preventDefault();
});

$(document).on('click','#generate_invoice',function(event){
	var ids_out         	= $('#orderids_out').val();
	var time_period 		= $(this).attr('data_time');
	var grand_total_out 	= $('#total_amount_out').val();
	var vendor_id   		= $('#vendor_id').val();
	var revnuetotal_out 	= $('#revnuetotal_out').val();


	var orderids_in    		= $('#orderids_in').val();
	var grand_total_in    	= $('#grand_total_in').val();

	var ids_sup    		    = $('#ids_sup').val();
	var total_amount_sup    	= $('#total_amount_sup').val();


	if((ids_out!='' && typeof ids_out!== "undefined") || (orderids_in!='' && typeof orderids_in!== "undefined")){
		//var r = confirm("Are you sure want to generate the invoice? If once created you will not be able to regenerate again.");
		bootbox.confirm({
			size: "small",
			message: "Are you sure want to generate the invoice? If once created you will not be able to regenerate again.",
			callback: function(result){ /* result is a boolean; true = OK, false = Cancel*/
			if(result == true){
				url = base_url+'vendor/generate_invoice_orders';
				$('.loading').show();
				if (fooXHR) fooXHR.abort();
				fooXHR = $.ajax({
					type: "POST",
					url: url,
					data: {ids_out:ids_out, time_period:time_period, grand_total_out: grand_total_out, vendor_id: vendor_id, revnuetotal_out: revnuetotal_out, orderids_in: orderids_in, grand_total_in: grand_total_in, ids_sup: ids_sup, total_amount_sup: total_amount_sup}, // serializes the form's elements.
					success: function(result){
						$('.loading').hide();
						if(result == "success"){
							$('#billing_summary').click();
						}
						if(result == "again"){
							bootbox.alert('Invoice already generated!');
						}
						if(result == "nonver")
						{
							bootbox.alert("Sorry!  Invoice Not genrated because all Orders are not in completed stage!")
						}
					}
				});
				event.preventDefault();
			}
			}
		})

	}
	else{
		bootbox.alert('invoice can not be generated because of no orders');
	}
});


///merchant invoice created
$(document).on('click','#generate_invoice_mer',function(event){
	var ids_out         	= $('#orderids_out').val();
	var time_period 		= $('#timeper').val();
	var grand_total_out 	= $('#total_amount_out').val();
	var merchantid 			= $('#merchantid').val();
	var vendorid 			= $('#vendorid').val();



	if(ids_out!='' && typeof ids_out!== "undefined"){
		var r = bootbox.confirm({
			size: "small",
			message: "Are you sure want to generate the invoice? If once created you will not be able to regenerate again.",
			callback: function(result){ /* result is a boolean; true = OK, false = Cancel*/
			if(result == true){
				url = base_url+'vendor/generate_invoice_orders_merchants';
				$('.loading').show();
				if (fooXHR) fooXHR.abort();
				fooXHR = $.ajax({
					type: "POST",
					url: url,
					data: {ids_out:ids_out, time_period:time_period, grand_total_out: grand_total_out, merchantid: merchantid, vendorid: vendorid}, // serializes the form's elements.
					success: function(result){
						$('.loading').hide();
						if(result == "success"){
							$('#merchantBilling').click();
						}
						if(result == "again"){
							bootbox.alert('Invoice already generated!');
						}
						if(result == "nonver")
						{
							bootbox.alert("Sorry!  Invoice Not genrated because all Orders are not in completed stage!")
						}
					}
				});
				event.preventDefault();
			}

			}
		});

	}
	else{
		bootbox.alert('invoice can not be generated because of no orders');
	}
});



$(document).on('mouseover','.ajax_pagging',function(){
	var href = $(this).attr('href');
	if(href!='javascript:void(0);')
	{
		$(this).attr('data-href',href);
		$(this).attr('href','javascript:void(0);');
	}
});

$(document).on('click','.ajax_pagging',function(){
	
var urll = $(this).attr('data-href');
	$('.loading').show();
	$.get(urll, function(result){
			$('.loading').hide();
			var data = $.parseJSON(result);
			$('.bottom_pagination').html(data.pagging);
			$("tbody#orders_in_ajax").html(data.result);		
							
			});
	
});

function changestatus(oid,activetab){
	url = base_url+'vendor/acknowledge/'+oid;
	if (fooXHR) fooXHR.abort();
	$('.loading').show();	
	fooXHR = $.ajax({
						   type: "POST",
						   url: url,
						   data: { orderid:oid }, // serializes the form's elements.
						   success: function(result){
							   $('.loading').hide();
							   if(result == 1){
							   		alert('Order #'+oid+' successfully acknowledged.');
									nurl = base_url+'vendor/in_orders/'+activetab;
								    window.location.href = nurl;
							   }
						   }
						});
}



function callrejectme(oid){
	
	var r = confirm("Are you sure want to reject the order?");
	if (r == true) {
		$("#divhide2 h3").text('Order Id: '+oid);
		$("#rejectorderid").val(oid);
		$("#divhide2").fadeIn();
		$("#backdiv2").fadeIn();
		
		}
}

$(document).on('submit','form#rejectedorder', function(event){
	url = $(this).attr("action");
	$('.loading').show();
	if (fooXHR) fooXHR.abort();	
		fooXHR = $.ajax({
						   type: "POST",
						   url: url,
						   data: $(this).serialize(),  // serializes the form's elements.
						   success: function(result){
							   $('.loading').hide();
							   if(result == 1){
							   		alert('Order successfully rejected.');
									nurl = base_url+'vendor/dashboard';
									window.location.replace(nurl);
							   }
						   }
						});
		event.preventDefault();
});

$(document).on('click','.out_delivey_action', function(){
								var oid = $(this).attr('data-href');
								url = base_url+'vendor/change_out_delivery/'+oid;
								$('.loading').show();
								if (fooXHR) fooXHR.abort();	
								fooXHR = $.ajax({
												   type: "POST",
												   url: url,
												   data: { orderid:oid }, // serializes the form's elements.
												   success: function(result){
													   $('.loading').hide();
													   getorderdetail(oid);
												   }
												});
});

$(document).on('click','.vendor_complete_action', function(){
				var oid = $(this).attr('data-href');
				$("#divhide h3").text('Order Id: '+oid);
				$("#orderid").val(oid);
				$("#divhide").fadeIn();
				$("#backdiv").fadeIn();
});

$(document).on('submit','#completeorder',function( event ) {

						var url = base_url+'vendor/vendor_complete_status/';
						$('.loading').show();
						if (fooXHR) fooXHR.abort();	
						fooXHR = $.ajax({

								   type: "POST",
								   url: url,
								   data: $(this).serialize(), // serializes the form's elements.
								   success: function(result)
								   {
									   //console.log(result);
									   $('#completeorder')[0].reset();
									   $('.loading').hide();  
									   var data = $.parseJSON(result);
									   if(data.page == '0'){
										  divtesthide();
										  getorderdetail(data.orderid);
									   }
									   if(data.page == '1'){
										  divtesthide();
										  nurl = base_url+'vendor/in_orders/'+data.activetab;
										  loadview(nurl);
										  /*location.reload(true);*/
									   }
								   }

						});
			event.preventDefault();
});

function out_of_delivery(oid,activetab){
								url = base_url+'vendor/change_out_delivery/'+oid;
								$('.loading').show();
								if (fooXHR) fooXHR.abort();	
								fooXHR = $.ajax({
												   type: "POST",
												   url: url,
												   data: { orderid:oid }, // serializes the form's elements.
												   success: function(result){
													   $('.loading').hide();
													    if(result == 1){
															alert('Order #'+oid+' successfully Out for Delivery.');
															nurl = base_url+'vendor/in_orders/'+activetab;
															//alert(nurl);
															window.location.href = nurl;
															//loadview(nurl);
															//location.reload(nurl);
														}
												   }
												});
}

function vendor_complete(oid,activetab){
				$("#divhide h3").text('Order Id: '+oid);
				$("#orderid").val(oid);
				$('form#completeorder').append('<input type="hidden" name="change_status" value="'+oid+'"/> <input type="hidden" name="active_tab" value="'+activetab+'"/>');
				$("#divhide").fadeIn();
				$("#backdiv").fadeIn();
				
}

function divtesthide() {
    $("#divhide").fadeOut();
    $("#backdiv").fadeOut();
}

function divtesthide2() {
    $("#divhide2").fadeOut();
    $("#backdiv2").fadeOut();
}


function getorderdetail(orderid){
		var order_id = orderid;
		var url = base_url+'home/get_order_detail/'+order_id;
		//if (fooXHR) fooXHR.abort();
		$('.loading').show();
		$.ajax({
						   type: "POST",
						   url: url,
						   data: {order_id:order_id},
						   success: function(result){
							   $('.loading').hide();
							   $('tr#row_'+order_id).each(function () {
									  var i =1;
									   $(this).find('td').each(function () {
										   if(i>3)
										   {
										   		$(this).closest("td").remove();
										   }
										   i++;
										});
									 });
								$('tr#row_'+order_id).append(result);	
								$('tr#row_'+order_id).removeClass('reminder_bg');	 
							}
		});
}


				
function getticket(sel) {
       var newval = sel.value;
	   if(newval == 'Price Request'){
		   $('#reason_div').show();
		   $('#price_div').show();
		   $('#commnents_div').show();
		   $('#submit_div').show();
		   $("input#price").prop('required',true);
		   $("textarea#comment").prop('required',true);
		   $("#comments").val(newval);
	   }
	   if(newval == 'Product Not Available' || newval == 'Other'){
		   $('#reason_div').hide();
		   $('#price_div').hide();
		   $("input#price").prop('required',false);
		   $("#comments").prop('required',true);
		   $('#commnents_div').show();
		   $('#submit_div').show();
		   $('#reason_type').val('Other');
		   $("#comments").val('');
	   }
	   if(newval == 'Choose Ticket Type'){
		   $('#reason_div').hide();
		   $('#price_div').hide();
		   $('#commnents_div').hide();
		   $('#submit_div').hide();
		   $("#comments").prop('required',false);
		   $('#reason_type').val('Other');
	   }
}

$(document).on('click','.btn-info',function(e){
		$('#custom_date').hide();
		url = base_url+'vendor/search_orders_ajax';
		var selectedstatus = $("#lstOrderStatus-1 option:selected");
                var messagestatus = "";
                selectedstatus.each(function () {
                    messagestatus += "'"+ $(this).val() + "',";
                });
				var statuses = messagestatus;
				var startdate = '';
				var enddate = '';
				var dates = $('#customDate').val();
				if(dates == 'Custom Date'){
					startdate = $('#start_date').val();
					enddate = $('#end_date').val();
				}
	            var merchantname  =  $('#merchantName').val();
                    var slotsval = $("#slotsval").val();
                    var slottypeval = $("#slottypeval").val();
                var deliveryBoy = $('#deliveryBoy').val();
		$('.loading').show();
						if (fooXHR) fooXHR.abort();	
						fooXHR = $.ajax({

								   type: "POST",
								   url: url,
								   data: { orderstatus : statuses,
                                           dates: dates,
                                           startdate: startdate,
                                           enddate:enddate,
                                           merchantname:merchantname,
                                           deliveryBoy:deliveryBoy,
                                           slotsval:slotsval,
                                           slottypeval:slottypeval
                                         }, // serializes the form's elements.
								   success: function(result)
								   {
									   $('.loading').hide();
									   var data = $.parseJSON(result);
									   	$('.bottom_pagination').html(data.pagging);
										$("#orders_in_ajax").html(data.result);
										$('div.rightBody_container').show();
								   }
				
		});
		e.preventDefault();
});

$(document).on('submit','#raise_ticket',function( event ) {
						var reason_type = $('#reason_type').val();
						if(reason_type == "Reason"){
								$('#reason_type').parents('div.selectdiv').addClass('yourClass');
								return false;
						}
						else{
								$('#reason_type').parents('div.selectdiv').removeClass('yourClass');
						}
						var url = base_url+'vendor/raise_ticket/';
						$('.loading').show();
						if (fooXHR) fooXHR.abort();	
						fooXHR = $.ajax({

								   type: "POST",
								   url: url,
								   data: $(this).serialize(), // serializes the form's elements.
								   success: function(result)
								   {
									   $('.loading').hide();
									   var data = $.parseJSON(result);
									   if(data.success == '1'){
                                                                                location.reload(false);
                                                                            }else{
                                                                               bootbox.alert({
                                                                                    size : 'small',
                                                                                    message : "Multiple price request cannot open. Please close previous Price request tickets.",
                                                                                    callback : function(){
                                                                                    }
                                                                                });
                                                                            }
								   }

						});
			event.preventDefault();
});

function closeticket(vid){
	var r = confirm("Are you sure want to close the ticket?");
	if (r == true) {
			var oid = vid;
			var url = base_url+'vendor/close_ticket/'+oid;
			$('.loading').show();
			if (fooXHR) fooXHR.abort();
			fooXHR = $.ajax({
						   type: "POST",
						   url: url,
						   data: {closeticket:oid},
						   success: function(result){
							   $('.loading').hide();
							   var data = $.parseJSON(result);
							   if(data.success == 1){
							   $('tr#ticket_'+oid).each(function () {
									  var i =1;
									   $(this).find('td').each(function () {
										   if(i>7)
										   {
										   		$(this).closest("td").remove();
										   }
										   i++;
										});
									 });
								$('tr#ticket_'+oid).append('<p class="marginTop-5 f10c99 paddingBottom-0">'+data.message+'</p>');
							   }
							}
					});
	}
}


//Vendor select date functions start
function custom_date(cus){
	$("#custom_date").show();
	$('#start_date').removeAttr('readonly');
	$('#end_date').removeAttr('readonly');
	$('.custum_date').val(cus);
	$('.custum_date').attr("placeholder",cus);
	$('#customRange').attr('type','text');
	$('#customRange').attr("placeholder",'25/11/2015-31/11/2015');
	$('#start_date').focus();
}
function custom_date_off(e1){
	$('#start_date').attr('readonly','true');
	$('#end_date').attr('readonly','true');
	$('#start_date').val('');
	$('#end_date').val('');
	$('.custum_date').val($(e1).val());
	$('#customRange').attr('type','hidden');
	$('.custum_date').attr("placeholder",$(e1).val());
}



$(function() {
    $( "#start_date" ).datepicker({
		onSelect: function(selectedDate) {
		         $('#end_date').datepicker( "option", "minDate", selectedDate );
				 $('#end_date').datepicker( "setDate", selectedDate );			 
    	},
		onClose: function () {
			 $('#end_date').focus();
		}
	});
	
	function initDatePickerMarkup(e) {
    $(e)
        .datepicker('widget').find('td').mouseover(function() {
            currentDate = new Date($(this).attr('data-year')+"/"+(parseInt($(this).attr('data-month'))+1)+"/"+$(this).text());
            selectedDate = $(e).datepicker('getDate');
            if (selectedDate === null) {
                selectedDate = new Date();
            }
            allTds = $(this).parents('table.ui-datepicker-calendar').find('td');
            allTds.removeClass('dp-highlight')
            found = false;
            if (currentDate < selectedDate) {
                for (i = 0; i < allTds.length; i++) {
                    if (allTds[i] == this) {
                        found = true;
                    }
                    if ($(allTds[i]).hasClass('ui-datepicker-today') || $(allTds[i]).hasClass('ui-datepicker-current-day')) {
                        break;
                    }
                    if (found) {
                        $(allTds[i]).addClass('dp-highlight');
                    }
                }
            } else if (currentDate > selectedDate) {
                for (i = 0; i < allTds.length; i++) {
                    if (found) {
                        $(allTds[i]).addClass('dp-highlight');
                    }
                    if ($(allTds[i]).hasClass('ui-datepicker-today') || $(allTds[i]).hasClass('ui-datepicker-current-day')) {
                        found = true;
                    }
                    if (allTds[i] == this) {
                        break;
                    }
                }
            }
        });
    }
 
	$.datepicker._updateDatepicker_original = $.datepicker._updateDatepicker;
    $.datepicker._updateDatepicker = function(inst) {
        $.datepicker._updateDatepicker_original(inst);
        var afterShow = this._get(inst, 'afterShow');
        if (afterShow) {
            afterShow.apply((inst.input ? inst.input[0] : null));  // trigger custom callback
        }
    }
	$( "#end_date" ).datepicker({
		
		beforeShowDay: function(date) {
				var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#start_date").val());
				var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#end_date").val());
				return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
		},
		onSelect:function(dateText, inst) {
           $("#custom_date").hide();
		   $('#ui-datepicker-div').hide();
		   $('#customRange').val($('#start_date').val()+'-'+$(this).val());

    }
	
	});
	
 });

//vendor select date functions end

//PRINT CHALLAN START
$(document).on('click','.btn-print-challan',function(){
	var sThisVal = '';
	$('input[class="orders"]:checked').each(function () {
						if($(this).prop('checked')==true){
								sThisVal += $(this).val()+'-';
						}				
    });
	if(sThisVal.length==0){
		alert('Please select order of which you want to print challan.');
		return false;
	}
	else{
		var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
		sThisVal = Base64.encode(sThisVal.slice(0,-1));
		var nurl= base_url+"vendor/vendor_receipt/multiple/"+sThisVal;
		window.open(nurl, '_blank');
	}
});
//PRINT Multiple Message
//(5-23-16(H))
$(document).on('click','.btn-print-message',function(){
	var sThisVal = '';
	$('input[class="orders"]:checked').each(function () {
		if($(this).prop('checked')==true){
			sThisVal += $(this).val()+'-';
		}
	});
	if(sThisVal.length==0){
		alert('Please select order of which you want to print message.');
		return false;
	}
	else{
		var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
		sThisVal = Base64.encode(sThisVal.slice(0,-1));
		var nurl= base_url+"vendor/vendor_message/multiple/"+sThisVal;
		window.open(nurl, '_blank');
	}
});
//PRINT Multiple Message Ends



function print_courier(oid){
	var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
	sThisVal = Base64.encode(oid);
	var nurl= base_url+"vendor/vendor_receipt/single/"+sThisVal;
	window.open(nurl, '_blank');
}
function print_courier_bakingo(oid){
	var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
	sThisVal = Base64.encode(oid);
	var nurl= base_url+"vendor/vendor_receipt/single/"+sThisVal;
	window.open(nurl, '_blank');
}

function print_message(oid){
	var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
	sThisVal = Base64.encode(oid);
	var nurl= base_url+"vendor/vendor_message/single/"+sThisVal;
	window.open(nurl, '_blank');
}


function loadview(lurl){
$('.loading').show();
	if (fooXHR) fooXHR.abort();	
				fooXHR = $.ajax({
						   type: "POST",
						   url: lurl,
						   data: { in_order:'active' }, // serializes the form's elements.
						   success: function(result){
							   	//console.log(result);
								$('.loading').hide();
								var data = $.parseJSON(result);
								$('div.custom-search-bg').show();
								$('div.rightBody_container').hide();
								$('div.rightBody_container').html(data.result);
								//CHECK SEARCH PARAMETER EXIST OR NOT
								var selectedstatus = $("#lstOrderStatus-1 option:selected");
								var messagestatus = "";
								selectedstatus.each(function () {
									messagestatus += "'"+ $(this).val() + "',";
								});
								var statuses = messagestatus;
								var customDate = $('#customDate').val();
								if(	(statuses.length > 0) || (customDate.length > 0) )
								{
										$('button.btn-info').click();
										//$('div.rightBody_container').show();
								}else{
									$('div.rightBody_container').show();
								}
								
								
								//CHECK SEARCH PARAMETER EXIST OR NOT
						   }
						});
}

//GET BELL NOTIFCATION START
jQuery(document).ready(fooNoti);
	var notiurl = base_url+"vendor/header_notifications/";
	
	function fooNoti() {
	jQuery.ajax({
            type: "GET",
			async: false,
            url: notiurl,
            success:function(response){
					var data = $.parseJSON(response);
					$('ul.listnotifi').html(data.results);
					$('li#notifications').find('span.count').html(data.total);
            }
        });
	}


$(document).on('click','input[class="orders"]',function(){
	if($(this).is( ':checked' ))
	{
	$(this).parent().parent().css('background','#ffffd5');
	}
	else
	{
		$(this).parent().parent().css('background','#fff');
	}
	});
function viewphotocake(photopath) {
    $("#previewphotoimg").modal();
    $("#photoimg_view").html("<li><p><img src='" + photopath + "'  style='max-width:100%'></p></li>");
}
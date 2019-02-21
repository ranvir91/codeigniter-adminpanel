// JavaScript Document
var fooXHR;
$('.btn-success').click(function(){
    console.log("btn-success_click");
	var sThisVal = '';
	$('input[class="orders"]:checked').each(function () {
		if($(this).prop('checked')==true){
			sThisVal += $(this).val()+',';
		}
	});
	if(sThisVal.length==0){
		alert('Please select order which you want to modify');
		return false;
	}
	else{
		$('#selected_orders').val(sThisVal);
		//$('#order_update').submit();
		$('body').append('<form id="order_form_checkbox"></form>');
		$('#selected_orders').val(sThisVal);
		var strVale = $('#selected_orders').val().slice(0,-1);
		var  order_ids;
		order_ids = 0;
		arr = strVale.split(',');
		$('.loading').show();
		var url = base_url+'home/update_orders/';
		$.each(arr, function(index, element) {
			var vendor 		= $('[name="vendor_'+element+'"]').val();
			//console.log(vendor);
			if(vendor == "")
			{
				$('[name="vendor_'+element+'"]').css('border','1px solid red').focus();
				return false;
			}
			var amount 		= $('[name="amount_'+element+'"]').val();
			//var instruction = $('[name="instruction_'+element+'"]').val();
			//console.log(instruction);

			var regex = new RegExp(/[\0\x08\x09\x1a\n\r"'\\\%]/g)
			var escaper = function escaper(char){
				var m = ['\\0', '\\x08', '\\x09', '\\x1a', '\\n', '\\r', "'", '"', "\\", '\\\\', "%"];
				var r = ['\\\\0', '\\\\b', '\\\\t', '\\\\z', '\\\\n', '\\\\r', "''", '""', '\\\\', '\\\\\\\\', '\\%'];
				return r[m.indexOf(char)];
			};

//Implementation


			$('#order_form_checkbox').append('<input name="vendor['+element+']" value="'+vendor+'"><input name="amount['+element+']" value="'+amount+'">');
		});

		$.ajax({
			type: "POST",
			url: url,
			data: $('#order_form_checkbox').serialize(), // serializes the form's elements.
			success: function(result){
				$('#order_form_checkbox').remove();
				$('.loading').hide();
				try {
					var response=jQuery.parseJSON(result);
					var result1 = response;
					var listingdata = [];
					listingdata = result1.updated_orders;

                                        modifyUI(listingdata, 'unacknowledged', 'assign');
                                        
					if ( $( ".alert" ).length ) {
						$( ".alert" ).remove();
					}
					$('<div class="alert alert-success"><a class="close" aria-label="close" data-dismiss="alert" href="#">×</a><strong>Success!</strong>'+result1.updated_msg+'</div>').insertAfter("div.search-bg");
					if(result1.errorstring != '')
					{
						$('<div class="alert alert-danger"><a class="close" aria-label="close" data-dismiss="alert" href="#">×</a><strong>ERROR!</strong>'+result1.errorstring+'</div>').insertAfter("div.search-bg");
					}
				}
				catch(e) {
					if(result == "success"){
						location.reload(true);
					}
				}
			}
		});

	}
});

//check pincodes
$('#checkpincode').click(function(){
	$('.loading').show();
	var url 		= base_url+'delhivery/checkpincode/';
	var urlblue 	= base_url+'bluedartapi/getpincode';
	var urlecom 	= base_url+'ecomapi/getpincode';

	var sThisVal 	= '';
	var pincodeval  = '';
	$('input[class="orders"]:checked').each(function () {
		if($(this).prop('checked')==true){
			sThisVal += $(this).val()+',';
			pincodeval += $(this).attr('pincode')+',';
		}
	});
	if(sThisVal.length==0){
		$('.loading').hide();
		bootbox.alert('Please select order which you want to assign Carrier');
		return false;
	}
	var deltype = $('#delivery_type').val();
    if(deltype == 1) { ///Delhivery API Call
		$.ajax({
			type: "POST",
			url: url,
			data: {oids: sThisVal},
			success: function (result) {
				$('.loading').hide();
				var response1 = jQuery.parseJSON(result);
				pincodes = response1.pincodes;
				errors = response1.errors;
				errpincode = response1.errpincode;
				validpincode = response1.validpincode;
				$.each(errors, function (index, element) { //remove checkbox
					$('.pincode_' + element).css('background', '#F5D76E');
					$('.pincode_' + element + ' input[type="checkbox"]').prop('checked', false);
					$('input[class="select_all"]').removeAttr('checked');
				});
				// if pincode is valid
				if (validpincode != '') {
					$('.btn-print-challan-del, .btn-print-challan, .btn-success-courier').hide('slow');
					$('#p2t').show();
					$('<div class="alert alert-success"><a class="close" aria-label="close" data-dismiss="alert" href="#">×</a><strong>SUCCESS!</strong>' + validpincode + ' pincode are valid ! Click Push To Partner button to process!  </div>').insertAfter("div.search-bg");
				}
				///Error if pincode not valid
				if (errpincode != '') {
					$('<div class="alert alert-danger"><a class="close" aria-label="close" data-dismiss="alert" href="#">×</a><strong>ERROR!</strong>' + errpincode + ' Not valid for Delhivery ! </div>').insertAfter("div.search-bg");
				}
			}
		});
	}
	if(deltype == 2) {
		$.ajax({
			type: "POST",
			url: urlblue,
			data: {oids: pincodeval},
			success: function (result) {
				$('.loading').hide();
				var response1 = jQuery.parseJSON(result);
				pincodes = response1.pincodes;
				errors = response1.errors;
				errpincode = response1.errpincode;
				validpincode = response1.validpincode;
				$.each(errors, function (index, element) { //remove checkbox
					$('.pincode_' + element).css('background', '#F5D76E');
					$('.pincode_' + element + ' input[type="checkbox"]').prop('checked', false);
					$('input[class="select_all"]').removeAttr('checked');
				});
				// if pincode is valid
				if (validpincode != '') {
					$('.btn-print-challan-del, .btn-print-challan, .btn-success-courier').hide('slow');
					$('#p2t').show();
					$('<div class="alert alert-success"><a class="close" aria-label="close" data-dismiss="alert" href="#">×</a><strong>SUCCESS!</strong>' + validpincode + ' pincode are valid ! Click Push To Partner button to process!  </div>').insertAfter("div.search-bg");
				}
				///Error if pincode not valid
				if (errpincode != '') {
					$('<div class="alert alert-danger"><a class="close" aria-label="close" data-dismiss="alert" href="#">×</a><strong>ERROR!</strong>' + errpincode + ' Not valid for BlueDart ! </div>').insertAfter("div.search-bg");
				}
			}
		});
	}
	if(deltype == 3){
		$.ajax({
			type: "POST",
			url: urlecom,
			data: {oids: pincodeval},
			success: function (result) {
				$('.loading').hide();
				var response1 = jQuery.parseJSON(result);
				pincodes = response1.pincodes;
				errors = response1.errors;
				errpincode = response1.errpincode;
				validpincode = response1.validpincode;
				$.each(errors, function (index, element) { //remove checkbox
					$('.pincode_' + element).css('background', '#F5D76E');
					$('.pincode_' + element + ' input[type="checkbox"]').prop('checked', false);
					$('input[class="select_all"]').removeAttr('checked');
				});
				// if pincode is valid
				if (validpincode != '') {
					$('.btn-print-challan-del, .btn-print-challan, .btn-success-courier').hide('slow');
					$('#p2t').show();
					$('<div class="alert alert-success"><a class="close" aria-label="close" data-dismiss="alert" href="#">×</a><strong>SUCCESS!</strong>' + validpincode + ' pincode are valid ! Click Push To Partner button to process!  </div>').insertAfter("div.search-bg");
				}
				///Error if pincode not valid
				if (errpincode != '') {
					$('<div class="alert alert-danger"><a class="close" aria-label="close" data-dismiss="alert" href="#">×</a><strong>ERROR!</strong>' + errpincode + ' Not valid for EcomExpress ! </div>').insertAfter("div.search-bg");
				}
			}
		});
	}
});

//Auto Assigning Vendors
$('#assign_orders').click(function(){
	$('.loading').show();
	var sThisVal = '';
	$('input[class="orders"]:checked').each(function () {
		if($(this).prop('checked')==true){
			sThisVal += $(this).val()+',';
		}
	});
	if(sThisVal.length==0){
		 $('.loading').hide();
		 bootbox.alert('Please select order which you want to assign vendor');
		 return false;
	}
	else{
		var url 		= base_url+'afs/autofillvendors/';
		$('#selected_orders').val(sThisVal);
		$('body').append('<form id="order_form_checkbox1"></form>');
		$('#selected_orders').val(sThisVal);
		var strVale 	= $('#selected_orders').val().slice(0,-1);
		order_ids 		= 0;
		arr 			= strVale.split(',');

		//call for assign vendor +costing
		$.ajax({
			type: "POST",
			url: url,
			data: { omids:arr},
			success: function(result){
				$('.loading').hide();
				var response1 =jQuery.parseJSON(result);
				vendors = '';
				prices  = '';

				vendors 		= response1.vendors;
				prices  		= response1.price;
				errmsg       	= response1.errormsg;
				errmsgemptyv    = response1.errormsgemptyv;
				errAssorder   	= response1.errAssorder;
				errorderuid   	= response1.errorderuid;
				errorderper   	= response1.errorderper;
				errordermultiqty   	= response1.errordermultiqty;
				noMsgOnCake   	= response1.noMsgOnCake;
				errors        	= response1.errors;
				successorder    = response1.successorder;


				$.each(vendors, function(index, element) { //update vendor
					var omid    = index;
					var vendor  = element;
					$('input[name="vendor_'+index+'"]').attr('value',vendor);
				});
				$.each(prices, function(index, element) { //update price
					var omid    = index;
					var price  = element;
					$('input[name="amount_'+index+'"]').attr('value',element);
					$('input[name="amount_'+index+'"]').attr("readonly", false);
				});
				$.each(errors, function(index, element) { //remove checkbox
					//alert(element);
					$('#order_'+element).css('background','#F5D76E');
					$('#order_'+element+' input[type="checkbox"]').prop('checked', false);
					$('input[class="select_all"]').removeAttr('checked');
				});

				///Error if order already assigned
				if(errAssorder != '')
				{
					$('<div class="alert alert-danger"><a class="close" aria-label="close" data-dismiss="alert" href="#">×</a><strong>ERROR!</strong>'+errAssorder+' Orders Already assigend please Declined before Assigning ! </div>').insertAfter("div.search-bg");
				}

				///Error if amount greater then 2000
				if(errmsg != '')
				{
					$('<div class="alert alert-danger"><a class="close" aria-label="close" data-dismiss="alert" href="#">×</a> <strong>GREATER THAN 2000 !</strong> '+ response1.errormsg + '&nbsp;&nbsp; <a style="color: blue;text-decoration: underline;" href="'+base_url+'home/searchorders?ordertype=fa&searchby=orderid&search_order_out='+response1.errormsg+'" target="_blank">View All</a> </div>').insertAfter("div.search-bg");
				}
				///Error if prefrence vendor not found
				if(errmsgemptyv != '')
				{
					$('<div class="alert alert-danger"><a class="close" aria-label="close" data-dismiss="alert" href="#">×</a><strong>ERROR!</strong> '+errmsgemptyv+' Orders Not Auto Assign ! Because prefrence Vendor not found ! &nbsp;&nbsp; <a style="color: blue;text-decoration: underline;" href="'+base_url+'home/searchorders?ordertype=fa&searchby=orderid&search_order_out='+errmsgemptyv+'" target="_blank">View All</a></div>').insertAfter("div.search-bg");
				}
				

				///Error if multipe product
				if(errordermultiqty != '')
				{
					$('<div class="alert alert-danger"><a class="close" aria-label="close" data-dismiss="alert" href="#">×</a><strong>MULTIPLE QTY!</strong> '+errordermultiqty+'&nbsp;&nbsp; <a style="color: blue;text-decoration: underline;" href="'+base_url+'home/searchorders?ordertype=fa&searchby=orderid&search_order_out='+errordermultiqty+'" target="_blank">View All</a>  </div>').insertAfter("div.search-bg");
				}

				///Error if No Message On Cake
				if(noMsgOnCake != '')
				{
					$('<div class="alert alert-danger"><a class="close" aria-label="close" data-dismiss="alert" href="#">×</a><strong>No Message On Cake!</strong> '+noMsgOnCake+'&nbsp;&nbsp; <a style="color: blue;text-decoration: underline;" href="'+base_url+'home/searchorders?ordertype=fa&searchby=orderid&search_order_out='+noMsgOnCake+'" target="_blank">View All</a>  </div>').insertAfter("div.search-bg");
				}

				///Error if personalised order
				if(errorderper != '')
				{
					$('<div class="alert alert-danger"><a class="close" aria-label="close" data-dismiss="alert" href="#">×</a><strong>PERSONALISED!</strong> '+errorderper+'&nbsp;&nbsp; <a style="color: blue;text-decoration: underline;" href="'+base_url+'home/searchorders?ordertype=fa&searchby=orderid&search_order_out='+errorderper+'" target="_blank">View All</a>  </div>').insertAfter("div.search-bg");
				}


				///Error if order is vendor order 
				if(errorderuid != '')
				{
					$('<div class="alert alert-danger"><a class="close" aria-label="close" data-dismiss="alert" href="#">×</a><strong>VENDOR ORDERS!</strong> '+errorderuid+'&nbsp;&nbsp; <a style="color: blue;text-decoration: underline;" href="'+base_url+'home/searchorders?ordertype=fa&searchby=orderid&search_order_out='+errorderuid+'" target="_blank">View All</a>  </div>').insertAfter("div.search-bg");
				}

				///sucess if order assign
				if(successorder != '')
				{
					$('<div class="alert alert-success"><a class="close" aria-label="close" data-dismiss="alert" href="#">×</a><strong>SUCCESS!</strong> '+successorder+' Orders successfully assigned ! To process click on Save button ! </div>').insertAfter("div.search-bg");
				}

			}
		});
		///assign vendor + costing ends here

	}
});
//Auto Assigning Vendors Ends Here





//GET ORDER DETAIL START
function getorderout(orderid){
	var order_id = orderid;
	var url = base_url+'home/get_orderdetail/'+order_id;
	//if (fooXHR) fooXHR.abort();
	$('.loading').show();
	$.ajax({
		type: "POST",
		url: url,
		data: {order_id:order_id},
		success: function(result){
			$('.loading').hide();
			$('tr#order_'+order_id).each(function () {
				var i =1;
				$(this).find('td').each(function () {
					if(i>5)
					{
						$(this).closest("td").remove();
					}
					i++;
				});
			});
			$('tr#order_'+order_id).append(result);
		}
	});
}
//GET ORDER DETAIL END

// start : update UI after status change
// 
function modifyUI(array, newstatus, type) {
    if(type === 'assign') {
      $.each(array, function(index, element) {
        $('#order_'+element).find('td:last span.status').removeClass().addClass('status '+newstatus).text(sentenceCase(newstatus));
        $('#order_'+element+' input[type="checkbox"]').attr('checked', false);
        $('#order_'+element).css({'background':''});
        $('#order_'+element+' .vendor_input_td input[type="text"]').attr('readonly', 'readonly');
      });
    }
    else if(type === 'change_status') {
      $.each(array, function(index, element) {
        $('#order_'+element).find('td.status_td span.status').removeClass().addClass('status '+newstatus).text(sentenceCase(newstatus));
        $('#order_'+element).find('td.status_td span.received-by, td.status_td span.opdely, td.status_td span.opbefore, td.status_td span.opsl').remove();
        $('#order_'+element+' input[type="checkbox"]').attr('checked', false);
        $('#order_'+element).css({'background':''});

        if((newstatus=='payment_received') || (newstatus =='declined')) {
          $('#order_'+element+' .vendor_input_td input[type="text"]').removeAttr('readonly');
        } else {
          $('#order_'+element+' .vendor_input_td input[type="text"]').attr('readonly', 'readonly');
        }
        
      });
    }
}
// 
// end : update UI after status change

function sentenceCase (str) {
  if ((str===null) || (str===''))
    return false;
  else
    str = str.toString();
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

$('.btn-rimender').click(function(){
	var sThisVal = '';
	$('input[class="orders"]:checked').each(function () {
		if($(this).prop('checked')==true){
			sThisVal += $(this).val()+',';
		}
	});
	if(sThisVal.length==0){
		alert('Please select order for which you want to send reminders.');
		return false;
	}
	else{
		$('#selected_orders').val(sThisVal);
		url = base_url+'home/send_reminders';
		$('.loading').show();
		if (fooXHR) fooXHR.abort();
		fooXHR = $.ajax({
			type: "POST",
			url: url,
			data: {orderids : sThisVal },  // serializes the form's elements.
			success: function(result){
				$('.loading').hide();
				if(result == 1){
					nurl = $('#currenturl').val();
					window.location.replace(nurl);
				}
				if(result == 0){
					alert('Please assign vendor first');
				}
			}
		});
	}
});


$(document).on('click','.amount_update',function(){
	var id1 = $(this).attr('id');
	var amount1 = $('input[name="amount_'+id1+'"]').val();
	var amount2 = $(this).attr('data-amount');
	$('.loading').show();
	$.post(base_url+'home/updateamount',{id: id1 ,amount: amount1}, function(result){
		$('.loading').hide();
		var data = $.parseJSON(result);
		if(data.status=='true')
		{

			$('input[name="amount_'+id1+'"]').val(data.amount);
			$('input[name="amount_'+id1+'"]').attr('placeholder',data.amount);
			$('#'+id1).attr('data-amount',data.amount);
			$('#'+id1).after( "<div class='hideupdated'><b>Amount updated.</b></div>" );
			setTimeout(function(){
				$(".hideupdated").remove();
			}, 2000);
			//alert('Amount updated');
		}
		else
		{
			$('input[name="amount_'+id1+'"]').val(amount2);
		}

	});
});


$('.search_button_order_out').click(function(){

	var sarch_str = $('#search_order_out').val();
	if(sarch_str != ""){
		$('.loading').show();
		$('form#search_header').submit();
	}
});

$(document).on('click','.ajax_pagging',function(){

	var urll = $(this).attr('data-href');
	$('.loading').show();
	$.get(urll, function(result){
		$('.loading').hide();
		var data = $.parseJSON(result);
		$('.bottom_pagination').html(data.pagging);
		$("#order_out_ajax").html(data.result);

	});

});
function validatefilters(){

	var customdate = $('#customDate').val();
	if(customdate == ''){
		bootbox.alert('You must have to Select Delivery Date to apply Filter ! ');
	} else{
		$('#order_searching_tab').submit();
	}
}



$(document).on('mouseover','.ajax_pagging',function(){
	var href = $(this).attr('href');
	if(href!='javascript:void(0);')
	{
		$(this).attr('data-href',href);
		$(this).attr('href','javascript:void(0);');
	}
});
$(function() {
	$("#start_date").datepicker({
		onSelect: function(selectedDate) {
			$('#end_date').datepicker( "option", "minDate", selectedDate );
			$('#end_date').datepicker( "setDate", selectedDate );
		},
		onClose: function () {
			$('#end_date').focus();
		}
	});
	$("#start_datec").datepicker({
		onSelect: function(selectedDate) {
			$('#end_datec').datepicker( "option", "minDate", selectedDate );
			$('#end_datec').datepicker( "setDate", selectedDate );
		},
		onClose: function () {
			$('#end_datec').focus();
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
			var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $(this).val());
			return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
		},
		onSelect:function(dateText, inst) {
			$("#custom_date").hide();
			$('#ui-datepicker-div').hide();
			$('#customRange').val($('#start_date').val()+'-'+$(this).val());

		}
	});
	$( "#end_datec" ).datepicker({
		beforeShowDay: function(date) {
			var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#start_datec").val());
			var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $(this).val());
			return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
		},
		onSelect:function(dateText, inst) {
			$("#custom_datec").hide();
			$('#ui-datepicker-div').hide();
			$('#customRangec').val($('#start_datec').val()+'-'+$(this).val());

		}
	});

});

$(document).ready(function(){
	$('.ui-datepicker-prev').attr('id','prev-arrow');
	$('.ui-datepicker-next').attr('id','next-arrow');
});

function checkdate(day,el) {
	$(el).closest('li').addClass("tick select").siblings().removeClass("tick select");
}

function custom_date(cus){
	$("#custom_date").show();
	//$("#custom_datec").show();
	$('#start_date').removeAttr('readonly');
	$('#end_date').removeAttr('readonly');
	$('.custum_date').val(cus);
	$('.custum_date').attr("placeholder",cus);
	$('#customRange').attr('type','text');
	$('#customRange').attr("placeholder",'25/11/2015-31/11/2015');
	$('#start_date').focus();
}

function custom_date2(cus){
	//$("#custom_date").show();
	$("#custom_datec").show();
	$('#start_datec').removeAttr('readonly');
	$('#end_datec').removeAttr('readonly');
	$('.custum_date2').val(cus);
	$('.custum_date2').attr("placeholder",cus);
	$('#customRangec').attr('type','text');
	$('#customRangec').attr("placeholder",'25/11/2015-31/11/2015');
	$('#start_datec').focus();
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
function custom_date_off2(e1){
	///alert("hello");
	$('#start_date').attr('readonly','true');
	$('#end_date').attr('readonly','true');
	$('#start_date').val('');
	$('#end_date').val('');
	$('.custum_date2').val($(e1).val());
	$('#customRangec').attr('type','hidden');
	$('.custum_date2').attr("placeholder",$(e1).val());
}
$(document).on('click','#search_orders',function(){

	///order status
	var selectedstatus = $("#lstOrderStatus option:selected");
	var messagestatus = "";
	selectedstatus.each(function () {
		messagestatus += "'"+ $(this).val() + "',";
	});
	var statuses = messagestatus;

	///order slot
	var selectedslot = $("#orderslot option:selected");
	var messageslot  = "";
	selectedslot.each(function () {
		messageslot += "'"+ $(this).val() + "',";
	});
	var slots = messageslot;

	///order slot type
	var selectedslottype = $("#orderslottype option:selected");
	var messageslottype  = "";
	selectedslottype.each(function () {
		messageslottype += "'"+ $(this).val() + "',";
	});
	var slotstype  = messageslottype;


	///order types
	var ordertype = $("#ordertype option:selected");
	var ordertypestatus = "";
	ordertype.each(function () {
		ordertypestatus += "'"+ $(this).val() + "',";
	});
	var ordertypes = ordertypestatus;
	if(ordertype.length > 1){
		var ordertypes = '';
	}



	var startdate = '';
	var enddate = '';
	var dates = $('#customDate').val();
	if(dates == 'Custom Date'){
		startdate = $('#start_date').val();
		enddate = $('#end_date').val();
	}
	var vendorname = $('#vendorName').val();
	var city = $('#city').val();

	url = base_url+'home/search_orders_ajax';
	$('.loading').show();
	if (fooXHR) fooXHR.abort();
	fooXHR = $.ajax({
		type: "POST",
		url: url,
		data: { orderstatus : statuses,slottype: slotstype, slots : slots, ordertype : ordertypes, dates: dates, startdate: startdate,enddate:enddate,vendorname:vendorname,city:city }, // serializes the form's elements.
		success: function(result){
			$('#todaydatemsg').hide();
			$('.loading').hide();
			var data = $.parseJSON(result);
			$('.bottom_pagination').html(data.pagging);
			$("#order_out_ajax").html(data.result);

			/*****checkbox select script ****/

			var $chkboxes = $('.orders');
			$chkboxes.click(function(e) {
				if(!lastChecked) {
					lastChecked = this;
					return;
				}

				if(e.shiftKey) {

					var start = $chkboxes.index(this);
					var end = $chkboxes.index(lastChecked);
					if(lastChecked.checked == true)
					{
						var colorclass = "#ffffd5";
					}
					if(lastChecked.checked == false)
					{
						var colorclass = "#ffffff";
					}
					$chkboxes.slice(Math.min(start,end), Math.max(start,end)+ 1).prop('checked', lastChecked.checked).parent().parent().css('background',colorclass);;
				}
				lastChecked = this;
			});
			/*****checkbox select script Ends ****/
			//$.holdReady();

		}
	});
});
/*
 $(document).on('click','#search_orders_reset',function(){
 url = base_url+'home/reset_search_order_out';
 $('.loading').show();
 $.ajax({
 type: "POST",
 url: url,
 data: { resetsearch:'active' }, // serializes the form's elements.
 success: function(result){
 if(result == '1'){
 $('.loading').hide();
 window.location.href = base_url+'home/order_out';
 }
 }
 });
 });
 */
//GET COURIER DETAIL START
function getorderdetail(orderid){
	var order_id = orderid;
	var url = base_url+'home/get_courier_detail/'+order_id;
	//if (fooXHR) fooXHR.abort();
	$('.loading').show();
	$.ajax({
		type: "POST",
		url: url,
		data: {order_id:order_id},
		success: function(result){
			$('.loading').hide();
			$('tr#courier_'+order_id).each(function () {
				var i =1;
				$(this).find('td').each(function () {
					if(i>4)
					{
						$(this).closest("td").remove();
					}
					i++;
				});
			});
			$('tr#courier_'+order_id).append(result);
		}
	});
}
//GET COURIER DETAIL END

$(document).ready(function() {
	//set initial state.

	$(document).on('change','.orders',function() {
		var selected_orders = '';
		var i = 0;
		$('input[class="orders"]:checked').each(function () {
			selected_orders += $(this).val()+',';
			i++;
		});
		if(i==1){
			$('#customerMailText').show();
		}
		if(i>1 || i==0 ){
			$('#customerMailText').hide();
		}
		$('#updates_orders').val(selected_orders);
	});


$(document).on('click','#update_order_button',function(){
    var updateOrder = $('#updates_orders').val();
    var newstatus = $('select[name="newstatus"]').val();
    if(!newstatus) {
        $("#update_error_msg").html('Please select order status.').css({'color':'#fc0202'}).show().delay(3000).fadeOut();
        return false;
    }
    if(newstatus == 'vendor_attempted') {
        var $attempted_reason = $('#select_attempted_reason').val();
        if(!$attempted_reason) {
          $("#update_error_msg").html('Please select attempted reason.').css({'color':'#fc0202'}).show().delay(3000).fadeOut();
          return false;
        }
    }
    if (!updateOrder) {
        $("#update_error_msg").html('Please choose atleast one order to update.').css({'color':'#fc0202'}).show().delay(3000).fadeOut();
        return false;
    } else {
        if ($(".selectboxdiv").val() == "declined") {
            var status = $(".selectboxdiv").val();
            var order_list = "";
            $('#order_out_ajax  input[type=checkbox]').each(function () {
                if ($(this).is(":checked")) {
                    order_list = order_list + $(this).val() + ",";
                }
            });
            $("#order_id_list").val(order_list);
            $("#modelDeclineReason").modal("show");
            return false;
        }
    }
    var url = base_url+'home/update_orders_status';
    
    $('.loading').show();
    if (fooXHR) fooXHR.abort();
    fooXHR = $.ajax({
        type: "POST",
        url: url,
        data: $("#order_status_update").serialize(), // serializes the form's elements.
        success: function(result){
            $('.loading').hide();
            var response1 =jQuery.parseJSON(result);
            if(response1.status == "false") {
                    alert(response1.msg);
                    return false;
            }
            if(response1.status == "true") {
                    alert(response1.msg);
                    location.reload(true);
                    return false;
            }



            $('#customer_mail_text, #updates_orders').val('');
            $("input[name='send_mail']:checkbox").prop('checked',false);
            try {
                    var response=jQuery.parseJSON(result);
                    var result1 = response;
                    var sla_html = result1.sla_html;

                    var listingdata = [];
                    listingdata = result1.updated_orders;

                    if(result1.activetab == "order_out"){
                        modifyUI(listingdata, newstatus, 'change_status');
                        if((newstatus=='vendor_attempted') || (newstatus=='vendor_complete') || (newstatus=='completed')) {
                          $.each(listingdata, function(index, element) {
                            $('#order_'+element).find('td.status_td').append(sla_html[element]);
                          });
                        }
                    }
                    if(result1.activetab == "courier"){
                            $.each(listingdata, function(index, element) {
                                    $('#courier_'+element).css('background','#fff');
                                    $('#courier_'+element+' input[type="checkbox"]').attr('checked', false);
                                    $('input[class="select_all"]').removeAttr('checked');
//                                    getorderdetail(element);
                                    $('#courier_'+element).find('td:nth-last-of-type(2)').html('<span class="status '+newstatus+'">'+newstatus+'</span>');
                            });

                    }
                    if ( $( ".alert" ).length ) {
                            $( ".alert" ).remove();
                    }

                    $('<div class="alert alert-success"><a class="close" aria-label="close" data-dismiss="alert" href="#">×</a><strong>Success!</strong>'+result1.updated_msg+'</div>').insertAfter("div.search-bg");

            } catch(e) {
                    //location.reload(true);
            }
        }
    });
    
});

  $(document).on('change','select[name=newstatus]',function(){
    var val = $(this).val();
    if(val=='vendor_attempted') {
        $('#select_attempted_reason').parent().show();
    } else {
        $('#select_attempted_reason').parent().hide();
    }
  });


});

function print_courier(oid){
	var nurl= base_url+"home/courier_receipt/single/"+oid;
	window.open(nurl, '_blank');

	setTimeout(function(){
		getorderdetail(oid);
	}, 3000);
}

$(document).on('click','.btn-print-challan',function(){
	var sThisVal = '';
	$('input[class="orders"]:checked').each(function () {
		if($(this).prop('checked')==true){
			sThisVal += $(this).val()+'-';
		}
	});
	if(sThisVal.length==0){
		alert('Please select order which you want to print challan.');
		return false;
	}
	else{
		sThisVal = sThisVal.slice(0,-1);
		var nurl= base_url+"home/courier_receipt/multiple/"+sThisVal;
		window.open(nurl, '_blank');
		var listingdata = [];
		listingdata = sThisVal.split('-');
		setTimeout(function(){
			$.each(listingdata, function(index, element) {
				getorderdetail(element);
			});
		}, 3000);
	}
});
$(document).on('click','.btn-print-challan-del',function(){
	var sThisVal = '';
	$('input[class="orders"]:checked').each(function () {
		if($(this).prop('checked')==true){
			sThisVal += $(this).val()+'-';
		}
	});
	if(sThisVal.length==0){
		bootbox.alert('Please select order which you want to print challan.');
		return false;
	}
	else{
		sThisVal = sThisVal.slice(0,-1);
		var nurl= base_url+"delhivery/courier_receipt/multiple/"+sThisVal;
		window.open(nurl, '_blank');
		var listingdata = [];
		listingdata = sThisVal.split('-');
		setTimeout(function(){
			$.each(listingdata, function(index, element) {
				getorderdetail(element);
			});
		}, 3000);
	}
});


///print multiple message
$(document).on('click','.btn-print-cmsg',function(){
	var sThisVal = '';
	$('input[class="orders"]:checked').each(function () {
		if($(this).prop('checked')==true){
			sThisVal += $(this).val()+'-';
		}
	});
	if(sThisVal.length==0){
		alert('Please select order which you want to print challan.');
		return false;
	}
	else{
		sThisVal = sThisVal.slice(0,-1);
		var nurl= base_url+"home/printMessage/multiple/"+sThisVal;
		window.open(nurl, '_blank');
		var listingdata = [];
		listingdata = sThisVal.split('-');
		setTimeout(function(){
			$.each(listingdata, function(index, element) {
				getorderdetail(element);
			});
		}, 3000);
	}
});
///print multiple message Ends

///push to partner
$('#p2t').click(function(){
	var sThisVal = '';
	$('input[class="orders"]:checked').each(function () {
		if($(this).prop('checked')==true){
			sThisVal += $(this).val()+',';
		}
	});
	if(sThisVal.length==0){
		bootbox.alert('Please select order which you want to modify');
		return false;
	}
	else{
		$('body').append('<form id="courier_form_checkbox"></form>');
		$('#selected_couriers').val(sThisVal);
		var orderids  = $('#selected_couriers').val().slice(0,-1);
		$('.loading').show();
		var url = base_url+'delhivery/genrateWayBillNumber/';
		var urlblue 	= base_url+'bluedartapi/awbnumber';
		var urlecom 	= base_url+'ecomapi/genrateAwbnumber';
		var deltype = $('#delivery_type').val();
		if(deltype == 1) {
			$.ajax({
				type: "POST",
				url: url,
				data: {oids: sThisVal},
				success: function (result) {
					$('.loading').hide();
					var response = jQuery.parseJSON(result);
					var result1 = response;
					var listingdata = [];
					listingdata = result1.updated_orders;
					$.each(listingdata, function (index, element) {
						$('#courier_' + element).css('background', '#fff');
						$('#courier_' + element + ' input[type="checkbox"]').attr('checked', false);
						$('input[class="select_all"]').removeAttr('checked');
						getorderdetail(element);
					});
					$('.btn-print-challan-del, .btn-print-challan, .btn-success-courier').show('slow');
					$('#p2t').hide();
					if ($(".alert").length) {
						$(".alert").remove();
					}
					$('<div class="alert alert-success"><a class="close" aria-label="close" data-dismiss="alert" href="#">×</a><strong>Success!</strong>' + result1.updated_msg + ' Orders successfully move to Push TO Partner !.</div>').insertAfter("div.search-bg");
				}
			});
		}
		if(deltype == 2){
			$.ajax({
				type: "POST",
				url: urlblue,
				data: {oids: sThisVal},
				success: function (result) {
					$('.loading').hide();
					var response = jQuery.parseJSON(result);
					var result1 = response;
					var listingdata = [];
					listingdata = result1.updated_orders;

					$.each(listingdata, function (index, element) {
						$('#courier_' + element).css('background', '#fff');
						$('#courier_' + element + ' input[type="checkbox"]').attr('checked', false);
						$('input[class="select_all"]').removeAttr('checked');
						getorderdetail(element);
					});
					$('.btn-print-challan-del, .btn-print-challan, .btn-success-courier').show('slow');
					$('#p2t').hide();
					if ($(".alert").length) {
						$(".alert").remove();
					}
					$('<div class="alert alert-success"><a class="close" aria-label="close" data-dismiss="alert" href="#">×</a><strong>Success!</strong>' + result1.updated_msg + ' Orders successfully move to Push TO Partner !.</div>').insertAfter("div.search-bg");

				}
			});
		}
		if(deltype == 3) {
			$.ajax({
				type: "POST",
				url: urlecom,
				data: {oids: sThisVal},
				success: function (result) {
					$('.loading').hide();
					var response = jQuery.parseJSON(result);
					var result1 = response;
					var listingdata = [];
					listingdata = result1.updated_orders;

					$.each(listingdata, function (index, element) {
						$('#courier_' + element).css('background', '#fff');
						$('#courier_' + element + ' input[type="checkbox"]').attr('checked', false);
						$('input[class="select_all"]').removeAttr('checked');
						getorderdetail(element);
					});
					$('.btn-print-challan-del, .btn-print-challan, .btn-success-courier').show('slow');
					$('#p2t').hide();
					if ($(".alert").length) {
						$(".alert").remove();
					}
					$('<div class="alert alert-success"><a class="close" aria-label="close" data-dismiss="alert" href="#">×</a><strong>Success!</strong>' + result1.updated_msg + ' Orders successfully move to Push TO Partner !.</div>').insertAfter("div.search-bg");

				}
			});
		}
	}
});
function updateconsnumber(mycons)
{
	var url = base_url+'delhivery/updatecons';
	$.ajax({
		type: "POST",
		url: url,
		data: {upcons:mycons},
		success: function(result){
		}
	});
}

$('.btn-success-courier').click(function(){
	var sThisVal = '';
	$('input[class="orders"]:checked').each(function () {
		if($(this).prop('checked')==true){
			sThisVal += $(this).val()+',';
		}
	});
	if(sThisVal.length==0){
		alert('Please select order which you want to modify');
		return false;
	}
	else{
		$('body').append('<form id="courier_form_checkbox"></form>');
		$('#selected_couriers').val(sThisVal);
		var strVale = $('#selected_couriers').val().slice(0,-1);
		var  order_ids;
		order_ids = 0;
		arr = strVale.split(',');
		$('.loading').show();
		var url = base_url+'home/update_courier/';
		$.each(arr, function(index, element) {

			var carrier = $('#carrier_'+element).val();
			var consignment = $('#consignment_'+element).val();
			$('#courier_form_checkbox').append('<input name="courier_id['+element+']" value="'+carrier+'"><input name="consign_id['+element+']" value="'+consignment+'">');



		});

		$.ajax({
			type: "POST",
			url: url,
			data: $('#courier_form_checkbox').serialize(), // serializes the form's elements.
			success: function(result){
				$('#courier_form_checkbox').remove();
				$('.loading').hide();
				try {
					var response=jQuery.parseJSON(result);
					var result1 = response;
					var listingdata = [];
					listingdata = result1.updated_orders;
					$.each(listingdata, function(index, element) {
						$('#courier_'+element).css('background','#fff');
						$('#courier_'+element+' input[type="checkbox"]').attr('checked', false);
						$('input[class="select_all"]').removeAttr('checked');
						getorderdetail(element);
					});

					if ( $( ".alert" ).length ) {
						$( ".alert" ).remove();
					}
					$('<div class="alert alert-success"><a class="close" aria-label="close" data-dismiss="alert" href="#">×</a><strong>Success!</strong>'+result1.updated_msg+'</div>').insertAfter("div.search-bg");

				}
				catch(e) {
					if(result == "success"){
						location.reload(true);
					}
				}
			}
		});


	}
});

$(document).on('click','#filter_courier',function(){
	url = base_url+'home/search_courier_ajax/';
	$('.loading').show();
	if (fooXHR) fooXHR.abort();
	fooXHR = $.ajax({
		type: "POST",
		url: url,
		data: $('#courier_search_tab').serialize(),
		success: function(result){
			$('.loading').hide();
			var data = $.parseJSON(result);
			$('.bottom_pagination').html(data.pagging);
			$("#order_out_ajax").html(data.result);
		}
	});
});

$(document).on('click','.clear_all_filter',function(){
	url = base_url+'home/courier';
	window.location.href = url;
});


$(document).on('click','.sorting', function(){
	var field 		= $(this).attr('data-field');
	var typ 		= $('#ordty').val();
	var currenturl = $('#currenturl').val();
	var terminate  = '&';
	var nofilter   = base_url+'home/order_out';
	var redirect   = base_url+'home/orderoutfilter';
	var index      = currenturl.indexOf("?order_by");
	if(currenturl == nofilter || index != -1){
		var terminate  = '?';
		var orderby          = field+' '+typ;
		var currenturl       = redirect+terminate+'order_by'+'='+orderby+'&ordty='+typ;
	} else{
		var orderby          = field+' '+typ;
		var currenturl       = currenturl+terminate+'order_by'+'='+orderby+'&ordty='+typ;
	}
	window.location.href = currenturl;
});

$(document).on('click','.sorting_courier', function(){

	var field 		= $(this).attr('data-field');
	var typ 		= 	$(this).attr('data-type');
	var show = typ=='ASC'?'DESC':'ASC';
	$(this).attr('data-type',show);
	url = base_url+'home/search_courier_ajax/';
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
			$("#order_out_ajax").html(data.result);
		}
	});

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
	$('.loading').show();
	var url = base_url+'home/raise_ticket/';
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


function closeticket(vid) {
    var r = confirm("Are you sure want to close the ticket?");
    if (r == true) {
        var oid = vid;
        var url = base_url + 'home/close_ticket/' + oid;
        $('.loading').show();
        if (fooXHR)
            fooXHR.abort();
        fooXHR = $.ajax({
            type: "POST",
            url: url,
            data: {closeticket: oid},
            success: function (result) {
                var data = $.parseJSON(result);
                $('.loading').hide();
                if (data.success == 1) {
                    if (data.ticket_type != '1') {
                        $('tr#ticket_' + oid).each(function () {
                            var i = 1;
                            $(this).find('td').each(function () {
                                if (i > 7)
                                {
                                    $(this).closest("td").remove();
                                }
                                i++;
                            });
                        });
                        $('tr#ticket_' + oid).append('<p class="marginTop-5 f10c99 paddingBottom-0">' + data.message + '</p>');
                    } else {
                        location.reload();

                    }
                }
            }
        });
    }
}

$(document).on('submit','#filter_form',function(event){
	url = base_url+'home/get_vendor_orders';
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

$(document).on('submit','#pending_filter_form',function(event){
	url = base_url+'billings/get_pending_billing';
	$('.loading').show();
	if (fooXHR) fooXHR.abort();
	fooXHR = $.ajax({
		type: "POST",
		url: url,
		data: $(this).serialize(), // serializes the form's elements.
		success: function(result){
			$('.loading').hide();
			$('#vendor_pendings').html(result);
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
	var total_amount_sup    = $('#total_amount_sup').val();
  	var dateOne 			= new Date("2018 11").getTime();
  	var dateTwo 			= new Date(time_period).getTime();
  console.log('date1',dateOne);
  console.log('date2',dateTwo);
   if(dateOne>dateTwo){
   		
	if((ids_out!='' && typeof ids_out!== "undefined") || (orderids_in!='' && typeof orderids_in!== "undefined")){
		var r = confirm("Are you sure want to generate the invoice? If once created you will not be able to regenerate again.");
		if (r == true) {
			url = base_url+'home/generate_invoice_orders';
			$('.loading').show();
			if (fooXHR) fooXHR.abort();
			fooXHR = $.ajax({
				type: "POST",
				url: url,
				data: {ids_out:ids_out, time_period:time_period, grand_total_out: grand_total_out, vendor_id: vendor_id, revnuetotal_out: revnuetotal_out, orderids_in: orderids_in, grand_total_in: grand_total_in, ids_sup: ids_sup, total_amount_sup: total_amount_sup}, // serializes the form's elements.
				success: function(result){
					$('.loading').hide();
					if(result == "success"){
						$('#Genratemessage').show();
						setTimeout(function() {
							$('#Genratemessage').fadeOut('slow');
						}, 2000);
					}
					if(result == "again"){
						alert('Invoice already generated!');
					}
					if(result == "nonver")
					{
						alert("Sorry!  Invoice Not genrated because all Orders are not in completed stage !");
					}
				}
			});
			event.preventDefault();
		}
	}
	else{
		alert('invoice can not be generated because of no orders');
	}}
	else{
		alert('invoice can not be generated. check time period');
	}
});

$(document).on('submit','#search_invoices',function(event){
	url = base_url+'home/search_generated_invoices';
	$('.loading').show();
	if (fooXHR) fooXHR.abort();
	fooXHR = $.ajax({
		type: "POST",
		url: url,
		data: $(this).serialize(), // serializes the form's elements.
		success: function(result){
			$('.loading').hide();
			$('table#generated_invoices').html(result);
		}
	});
	event.preventDefault();
});

$(document).on('submit','#add_amount',function(event){
	url = $(this).attr('action');
	$('.loading').show();
	if (fooXHR) fooXHR.abort();
	fooXHR = $.ajax({
		type: "POST",
		url: url,
		data: $(this).serialize(), // serializes the form's elements.
		success: function(result){
			$('.loading').hide();
			if(result == "success"){
				$('.btn-close').click();
				$('#search_invoices').submit();
			}
		}
	});
	event.preventDefault();
});

//Order Info
// JavaScript Document
var fooXHRO;
$('#update-order').click(function(){
	if($('#dlv_date').val() ==''){
		$('.order-info-edit').show();
		$('#dlv_date').focus();
		return false;
	}

	if($("#dlv_type").val()=='') {
		$('.order-info-edit').show();
		$('#dlv_type').focus();
		return false;
	}

	if($("#dlv_occasion").val()=='') {
		$('.order-info-edit').show();
		$('#dlv_occasion').focus();
		return false;
	}
	if($("#dlv_sender").val()=='') {
		$('.order-info-edit').show();
		$('#dlv_sender').focus();
		return false;
	}

	if($('#receiver_name').val() ==''){
		$('.order-info-edit').show();
		$('#receiver_name').focus();
		return false;
	}

	$('.order-info-edit').hide();
	url = base_url+'home/update_order_info';
	$('.loading').show();
	if (fooXHR) fooXHRO.abort();
	fooXHRO = $.ajax({
		type: "POST",
		url: url,
		data: $("#order-update-form").serialize(),// serializes the form's elements.
		success: function(result){
			$('.loading').hide();
			var data = $.parseJSON(result);
			if(data.success == 1){
				alert('Order #'+data.orderid+' '+data.msg);
				location.reload(true);
			}
			else{
				alert(data.msg);
			}

		},
		complete:function(response){

		}
	});

});

//Order Info End


//Delivery Info
// JavaScript Document
var fooXHRD;
$('#update-order-del-info').click(function(){
	if($('#delivery_first_name').val() ==''){
		$('.order-del-info-edit').show();
		$('#delivery_first_name').focus();
		return false;
	}

	if($('#delivery_phone').val() ==''){
		$('.order-del-info-edit').show();
		$('#delivery_phone').focus();
		return false;
	}


	if($('#delivery_street1').val() ==''){
		$('.order-del-info-edit').show();
		$('#delivery_street1').focus();
		return false;
	}


	if($('#delivery_city').val() ==''){
		$('.order-del-info-edit').show();
		$('#delivery_city').focus();
		return false;
	}


	if($('#delivery_zone').val() ==''){
		$('.order-del-info-edit').show();
		$('#delivery_zone').focus();
		return false;
	}

	if($('#delivery_postal_code').val() ==''){
		$('.order-del-info-edit').show();
		$('#delivery_postal_code').focus();
		return false;
	}




	$('.order-del-info-edit').hide();
	url = base_url+'home/update_delivery_info';
	$('.loading').show();
	if (fooXHRD) fooXHRD.abort();
	fooXHRD = $.ajax({
		type: "POST",
		url: url,
		data: $("#order-delivery-info-form").serialize(),// serializes the form's elements.
		success: function(result){
			$('.loading').hide();
			var data = $.parseJSON(result);
			if(data.success == 1){
				alert('Order #'+data.orderid+' '+data.msg);
				location.reload(true);
			}
			else{
				alert(data.msg);
			}
		},
		complete:function(response){

		}
	});

});

//Delivery Info End


//Billing Info
// JavaScript Document
var fooXHRB;
$('#update-billing-info').click(function(){
	if($('#billing_first_name').val() ==''){
		$('.order-billing-edit').show();
		$('#billing_first_name').focus();
		return false;
	}

	if($('#billing_city').val() ==''){
		$('.order-billing-edit').show();
		$('#billing_city').focus();
		return false;
	}

	if($('#billing_phone').val() ==''){
		$('.order-billing-edit').show();
		$('#billing_phone').focus();
		return false;
	}


	$('.order-billing-edit').hide();
	url = base_url+'home/update_billing_info';

	if (fooXHRB) fooXHRB.abort();
	$('.loading').show();
	fooXHRB = $.ajax({
		type: "POST",
		url: url,
		data: $("#order-billing-info-form").serialize(),// serializes the form's elements.
		success: function(result){
			$('.loading').hide();
			var data = $.parseJSON(result);
			if(data.success == 1){
				alert('Order #'+data.orderid+' '+data.msg);
				location.reload(true);
			}
			else{
				alert(data.msg);
			}
		},
		complete:function(response){

		}
	});

});

//Billing Info End


//Payment Info
// JavaScript Document
var fooXHRP;
$('#update-payment-info').click(function(){
	if($('#uid').val() ==''){
		$('.order-payment-edit').show();
		$('#uid').focus();
		return false;
	}

	if($('#primary_email').val() ==''){
		$('.order-payment-edit').show();
		$('#primary_email').focus();
		return false;
	}

	if($('#payment_method').val() ==''){
		$('.order-payment-edit').show();
		$('#payment_method').focus();
		return false;
	}


	$('.order-payment-edit').hide();
	url = base_url+'home/update_payment_info';

	if (fooXHRP) fooXHRP.abort();
	$('.loading').show();
	fooXHRP = $.ajax({
		type: "POST",
		url: url,
		data: $("#order-payment-info-form").serialize(),// serializes the form's elements.
		success: function(result){
			$('.loading').hide();
			var data = $.parseJSON(result);
			if(data.success == 1){
				alert('Order #'+data.orderid+' '+data.msg);
				location.reload(true);
			}
			else {
				alert(data.msg);
			}
		},
		complete:function(response){
		}
	});

});

//Payment Info End


//Get Product Attributes
/*var fooXHRAP;
 $('#product_qty').focus(function(){
 if($('#product_filter').val() ==''){
 $('.add-more-product-error').show();
 $('#product_filter').focus();
 return false;
 }
 $('#order_id').val($('input[name="oid"]').val());
 //{'product_filter':$('#product_filter').val(),'product_qty':$('#product_qty').val(),'order_id':$('input[name="oid"]').val()}
 $('.add-more-product-error').hide();
 url = base_url+'home/getproductapi';
 if (fooXHRAP) fooXHRAP.abort();
 $('.loading').show();
 fooXHRAP = $.ajax({
 type: "POST",
 url: url,
 data: $('#add-more-product-form').serialize(),// serializes the form's elements.
 success: function(result){
 $('.loading').hide();
 var data = $.parseJSON(result);
 if(data.status=='done')
 {
 var chk_str = '';
 var ic = 1;
 $.each(data.result, function(key,value){
 if(ic==1)
 {
 chk_str +='<li class="flw100 dyn-attr-search">';
 }

 if(ic%2==0)
 {

 chk_str +=' <label> <input type="checkbox" name="attr[]"  value="'+value.label+':'+value.name+'"/> '+value.label+' : '+value.name+' </label> ';
 chk_str +='</li>';
 chk_str +='<li class="flw100 dyn-attr-search">';


 }
 else
 {
 chk_str +='<label> <input type="checkbox" name="attr[]" value="'+value.label+':'+value.name+'"/> '+value.label+' : '+value.name+' </label> ';
 }

 ic++;
 });

 $("#add-more-prod-attr li:last-child").before(chk_str);
 chk_str='';

 //window.location.reload();
 }
 else
 {
 $("#add-more-prod-attr li:last-child").before('<li class="flw100 dyn-attr-search">No attribute found.</li>');

 }

 //window.location = base_url+'vendor/created_order';
 },
 complete:function(response){

 }
 });


 });*/



// reset add product popup form
$('#close-prod-add-popup').click(function(){
	$('#add-more-product-attr').show();
	$('#add-more-product').hide();
	$('#add-more-product-form')[0].reset();
	$('.dyn-attr-search').remove();
});


// reset add product popup form

//Add more product start
// JavaScript Document

var fooXHRAAP;
$('#add-more-product').click(function(){

	if($('#product_filter').val() ==''){
		$('.add-more-product-error').show();
		$('#product_filter').focus();
		return false;
	}

	if($('#product_qty').val() ==''){
		$('.add-more-product-error').show();
		$('#product_qty').focus();
		return false;
	}
	$('.add-more-product-error').hide();
	var oid= $('#order_id').val();
	url = base_url+'home/addproductapi';
	if (fooXHRAAP) fooXHRAAP.abort();
        //alert($('#add-more-product-form').serialize());
        //return false;
        
	$('.loading').show();
	fooXHRAAP = $.ajax({
		type: "POST",
		url: url,
		data: $('#add-more-product-form').serialize(),// serializes the form's elements.
		success: function(result){
			$('.loading').hide();
			var data = $.parseJSON(result);
			if(data.status=="true")
			{
				nurl = base_url+'home/edit_order_info/'+oid;
				window.location.replace(nurl);
			}
			if(data.status=="false")
			{
				alert(data.msg);
				nurl = base_url+'home/edit_order_info/'+oid;
				window.location.replace(nurl);
                                $(location).attr('href', 'http://stackoverflow.com')
			}
		}
	});

});

//Add more product end


//Get product attributes on add ptoduct Start

$('#product_filter').blur(function(){

	$("#gifloader").css("display", "block");
	$("#producterror").addClass('loading2');
	var searchparam = $('#product_filter').val();
	$('#order_id').val($('input[name="oid"]').val());
	var order_id = $('#order_id').val();
	if(searchparam){
		//url = base_url+'home/getproductattr/'+searchparam;
		url = base_url+'home/getproductattr/'+1;
		if (fooXHR) fooXHR.abort();
		fooXHR = $.ajax({
			type: "POST",
			url: url,
			data: {product:searchparam}, // serializes the form's elements.
			success: function(result){
				var data = $.parseJSON(result);
				if(data.status=='false') {
					$("#gifloader").css("display", "none");
					$("#producterror").removeClass('loading2');
					$("#producterror").removeClass('success');
					$("#producterror").addClass('error');
					$("#producterror").html("Product Not Found").show().fadeOut(4000);
					$("#add-more-product,#checkout-add-more-product").css("display", "none");

				}

				if(data.status=='done'){
					if(data.count > 1){ 
						$('#producterror').css("display", 'block');
						$("#gifloader").css("display", "none");
						$("#producterror").removeClass('loading2');
						$("#producterror").removeClass('error');
						$("#producterror").addClass('success');
						$('#producterror').html("product available.");
						$("#productnames").css("display", "block");
						$("#productAttr").css("display", "none");

						chk_str1  ='';

						$.each(data.result, function (key, result1) {

							chk_str1 += '<div class="active1" id="'+result1.sku+'"><li class="flw100 dyn-attr-search">';
							chk_str1 += ' <label> <input type="radio" name="pradio" id="multipleproduct" inv="'+result1.inv+'" attr="'+result1.attr+'" value="'+result1.sku+'"/> ' + result1.inv + ' :   <b>' + result1.sku + '</b> </label> </br>';

							if('attr' in result1){
							$.each(result1.attr, function (key, attr) {

								chk_str1 +='<label> <input  type="checkbox" disabled="disabled" name="attr[]"  value="' + attr.label + ':' + attr.name + '"/> ' + attr.label + ' : ' + attr.name + ' </label>';
								chk_str1 +='</br></br>';
							});
						}

							chk_str1 += '</li></div>';
						});


						$("#productnames").html(chk_str1);

					}else {
						$('#producterror').css("display", 'block');
						$("#gifloader").css("display", "none");
						$("#producterror").removeClass('loading2');
						$("#producterror").removeClass('error');
						$("#producterror").addClass('success');
						$('#producterror').html("product available.");
						$("#add-more-product,#checkout-add-more-product").css("display", "block");
						$("#productnames").css("display", "none");



						//$('#productAddBtn').attr('display','block') //to show
						var chk_str = '';
						var ic = 1;
						$('#product_inv').val(data.inv);
						$.each(data.result, function (key, result1) {
                                                    if(result1.display_type==3){ 
                                                        var result_name = result1.name;
                                                        if(result1.name === "10 roses"){result_name = "Add 10 red roses";}
                                                        else if(result1.name === "VASE"){result_name = "Add Vase";}
                                                        else if(result1.name === "Quantity"){result_name = "Double the flower quantity";}
                                                        	chk_str += '<li class="flw100 dyn-attr-search"> <label> <input type="checkbox" name="attr[]"  value="' 
                                                                        + result_name 
                                                                        + ':' + result_name + '"/> ' + result_name 
                                                                        + ' </label></li>';
                                                    }else if(result1.display_type==1 || result1.display_type==2){
                                                        chk_str += '<li class="flw100 dyn-attr-search"> <label>';
                                                        chk_str += result1.label+"<select name='selectAttr[]'>";
                                                        $.each(result1.options, function (key2, options) {
                                                            chk_str += "<option value='"+result1.name+":"+options.name+"'>"+options.name+"</option>";
                                                        });
                                                        chk_str += "</select >";
                                                        chk_str += "</label></li>";
                                                    }
						});

						$("#productAttr").html(chk_str);
					}
				}else{
					$("#productAttr").html('No attribute found.');

				}

			}
		});
	}
});

//Get product attributes on add ptoduct END

///select single product
$(document).on('click','#multipleproduct',function(){
	var inv = $(this).attr('inv');
	var attr = $(this).attr('attr');
	var value = $(this).attr('value');
	$("#add-more-product,#checkout-add-more-product").css("display", "block");
	$('input:checkbox').attr("disabled", true);
	$('input:checkbox').removeAttr("checked");
	$('#'+value).find('input:checkbox').removeAttr("disabled");
});





//Get courier product attributes on add ptoduct Start
$('#courier_product_qty').focus(function(){

	var searchparam = $('#product_filter').val();
	$('#order_id').val($('input[name="oid"]').val());
	$('.dyn-attr-search').remove();
	var order_id = $('#order_id').val();
	if(searchparam){
		url = base_url+'home/getcourierproductattr/'+searchparam;
		$('.loading').show();
		if (fooXHR) fooXHR.abort();
		fooXHR = $.ajax({
			type: "POST",
			url: url,
			data: {product:searchparam}, // serializes the form's elements.
			success: function(result){
				$('.loading').hide();
				var data = $.parseJSON(result);
				if(data.status=='done')
				{
					var chk_str = '';
					var ic = 1;
					$.each(data.result, function(key,value){
						if(ic==1)
						{
							chk_str +='<li class="flw100 dyn-attr-search">';
						}

						if(ic%2==0)
						{

							chk_str +=' <label> <input type="checkbox" name="attr[]"  value="'+value.label+':'+value.name+'"/> '+value.label+' : '+value.name+' </label> ';
							chk_str +='</li>';
							chk_str +='<li class="flw100 dyn-attr-search">';


						}
						else
						{
							chk_str +='<label> <input type="checkbox" name="attr[]" value="'+value.label+':'+value.name+'"/> '+value.label+' : '+value.name+' </label> ';
						}

						ic++;
					});

					$("#add-more-prod-attr li:last-child").before(chk_str);
					chk_str='';

					//window.location.reload();
				}
				else
				{
					$("#add-more-prod-attr li:last-child").before(data.result);

				}

			}
		});
	}
});

//Get courier product attributes on add ptoduct END

//Add more courier product start
// JavaScript Document

var fooXHRAAP;
$('#add-more-courier-product').click(function(){

	if($('#product_filter').val() ==''){
		$('.add-more-product-error').show();
		$('#product_filter').focus();
		return false;
	}

	if($('#courier_product_qty').val() ==''){
		$('.add-more-product-error').show();
		$('#courier_product_qty').focus();
		return false;
	}
	$('.add-more-product-error').hide();
	var oid= $('#order_id').val();
	url = base_url+'home/addcourierproductapi';
	if (fooXHRAAP) fooXHRAAP.abort();
	$('.loading').show();
	fooXHRAAP = $.ajax({
		type: "POST",
		url: url,
		data: $('#add-more-product-form').serialize(),// serializes the form's elements.
		success: function(result){
			$('.loading').hide();
			var data = $.parseJSON(result);
			if(data.status=='true')
			{
				nurl = base_url+'home/edit_courier_order_info/'+oid;
				window.location.replace(nurl);
			}
		}
	});

});

//Add more courier product end

//ADD LINE ITEM START
$('select#add_name_item').on('change', function() {
	$('a#add_line').attr('data-select', $(this).val() );
});

$('a#add_line').on('click',function(){
	var select_item = $(this).attr('data-select');
	if(select_item){
		if(select_item=='coupon'){
			title_name = 'Coupon Discount';
		}
		if(select_item=='shipping'){
			title_name = 'Shipping Charges';
		}
		if(select_item=='empty'){
			title_name = '';
		}
		if(select_item=='midnight'){
			title_name = 'Midnight Delivery Charges';
		}
		if(select_item=='variable_shipping_cost'){
			title_name = 'Variable Shipping Charges';
		}
		$('div.add-line-part').show();

		$('form#add-line-part').append('<ul><input type="hidden" name="type[]" value="'+select_item+'"><li class="cross-li" onclick="delete_li(this);"><img src="'+base_url+'assets/images/cross108.png" alt="cross-img" /></li><li><input type="text" value="'+title_name+'" class="discount-coupon-input" name="title[]" required /></li><li>:&nbsp;Rs.</li><li><input type="text" value="" class="final-price-input" name="amount[]" required/></li></ul>');

	}

});

function delete_li(e){
	$(e).closest('ul').remove();
}


$(document).on('submit','#add-line-part',function( event ) {

	var url = base_url+'home/add_line_items/';
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
			if(data.res == 'success'){
				nurl = base_url+'home/edit_order_info/'+data.order_id;
				window.location.replace(nurl);
			}
		}

	});
	event.preventDefault();
});
//ADD LINE ITEM END - - EDIT ORDER

//DELETE LINE ITEM START - EDIT ORDER
$(document).on('click','.delete_line_item',function( event ) {
	var line_id 	= $(this).attr('data-href');
	var order_id 	= $(this).attr('data-order-id');
	var type_name 	= $(this).attr('data-line-type');
	if(order_id){
		var r = confirm("Are you sure want to delete the line item?");
		if (r == true) {
			var url = base_url+'home/delete_line_item/'+line_id+'/'+order_id+'/'+type_name;
			$('.loading').show();
			if (fooXHR) fooXHR.abort();
			fooXHR = $.ajax({

				type: "POST",
				url: url,
				data: {line_id: line_id, orderid:order_id , type_name: type_name}, // serializes the form's elements.
				success: function(result)
				{
					$('.loading').hide();
					var data = $.parseJSON(result);
					if(data.success == '1'){
						location.reload(true);
					}
				}

			});
		}
	}
});
//DELETE LINE ITEM END - - EDIT ORDER

//DELETE PRODUCT START - EDIT ORDER
$(document).on('click','.delete_product',function( event ) {
	var product_id = $(this).attr('data-href');
	if(product_id){
		var r = confirm("Are you sure want to delete the product?");
		if (r == true) {
			var url = base_url+'home/delete_product/'+product_id;
			$('.loading').show();
			if (fooXHR) fooXHR.abort();
			fooXHR = $.ajax({

				type: "POST",
				url: url,
				data: {id:product_id}, // serializes the form's elements.
				success: function(result)
				{
					$('.loading').hide();
					//alert("suc");
					var data = $.parseJSON(result);
					if(data.success == '1'){
						location.reload(true);
					}
					if(data.success == '0'){
						alert(data.msg);
					}
				}

			});
		}
	}
});


//DELETE PRODUCT END - EDIT ORDER


//ADMIN COMMENT START
$(document).on('submit','form#admin_comment',function( event ) {

	var url = base_url+'home/add_admin_comment/';
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
				location.reload(true);
			}
		}

	});

	event.preventDefault();
});


//ADMIN COMMENT END

//CUSTOMER COMMENT START
$(document).on('submit','form#customer_comments',function( event ) {

	var url = base_url+'home/add_customer_comment/';
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
				location.reload(true);
			}
		}

	});

	event.preventDefault();
});


//CUSTOMER COMMENT END

//Invoice Mail Start
$(document).on('submit','form#invoice_mail',function( event ) {

	var url = $(this).attr('action');
	$('.loading').show();
	if(url){
		if (fooXHR) fooXHR.abort();
		fooXHR = $.ajax({

			type: "POST",
			url: url,
			data: $(this).serialize(), // serializes the form's elements.
			success: function(result)
			{
				$('.loading').hide();
				var data = $.parseJSON(result);
				if(data.mailsent == true){
					alert('Mail sent to '+data.customer_mail);
				}
				else{
					alert('Please enter valid mail');
				}
			}

		});
	}

	event.preventDefault();
});
//Invoice Mail End


$(document).on('submit','#editvendor',function( event ) {
	var password 	= $('#fa_password').val();
	var cpassword 	= $('#fa_cpassword').val();



	if((password.trim()) || (password.length > 0) || (cpassword.trim()) || (cpassword.length > 0)){
		if((password.length > 0) && (!(cpassword.length) > 0)){
			$('#error').html('Error! Confirm Password field is required.');
			$('#view-1').animate({scrollTop: '0px'}, 800);
			return false;
		}
		if((cpassword.length > 0) && (!(password.length) > 0)){
			$('#error').html('Error! Password field is required.');
			$('#view-1').animate({scrollTop: '0px'}, 800);
			return false;
		}
		if(cpassword !== password){
			$('#error').html('Error! Password field must match with Confirm Password field.');
			$('#view-1').animate({scrollTop: '0px'}, 800);
			return false;
		}
	}

	else{
		$('#error').html('');
	}
	var action = $(this).attr('action');
	//$('.loading').show();
	if (fooXHR) fooXHR.abort();
	fooXHR = $.ajax({

		type: "POST",
		url: action,
		data: $(this).serialize(), // serializes the form's elements.
		success: function(result)
		{
			$('.loading').hide();
			var data = $.parseJSON(result);
			if(data.success == '1'){
				location.reload(false);
			}
			if(data.success == '0'){
				$('#error').html('Error occured while updating data.');
				$('#view-1').animate({scrollTop: '0px'}, 800);
				return false;
			}
			if(data.success == '2'){
				$('#error').html('Name and email must be unique.');
				$('#view-1').animate({scrollTop: '0px'}, 800);
				return false;
			}
		}

	});
	event.preventDefault();
});

$(document).on('submit','#edituser',function( event ) {
	var password 	= $('#fa_password').val();
	var cpassword 	= $('#fa_cpassword').val();



	if((password.trim()) || (password.length > 0) || (cpassword.trim()) || (cpassword.length > 0)){
		if((password.length > 0) && (!(cpassword.length) > 0)){
			$('#error').html('Error! Confirm Password field is required.');
			$('#view-1').animate({scrollTop: '0px'}, 800);
			return false;
		}
		if((cpassword.length > 0) && (!(password.length) > 0)){
			$('#error').html('Error! Password field is required.');
			$('#view-1').animate({scrollTop: '0px'}, 800);
			return false;
		}
		if(cpassword !== password){
			$('#error').html('Error! Password field must match with Confirm Password field.');
			$('#view-1').animate({scrollTop: '0px'}, 800);
			return false;
		}
	}

	else{
		$('#error').html('');
	}
	var action = $(this).attr('action');
	//$('.loading').show();
	if (fooXHR) fooXHR.abort();
	fooXHR = $.ajax({

		type: "POST",
		url: action,
		data: $(this).serialize(), // serializes the form's elements.
		success: function(result)
		{
			$('.loading').hide();
			var data = $.parseJSON(result);
			if(data.success == '1'){
				location.reload(false);
			}
			if(data.success == '0'){
				$('#error').html('Error occured while updating data.');
				$('#view-1').animate({scrollTop: '0px'}, 800);
				return false;
			}
			if(data.success == '2'){
				$('#error').html('Name and email must be unique.');
				$('#view-1').animate({scrollTop: '0px'}, 800);
				return false;
			}

		}

	});
	event.preventDefault();
});


function view_order(oid){
	//$('.loading').show();
	var nurl = base_url+'home/operations_order_view/'+oid;
	window.open(nurl,"_blank")
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

$(document).on('click','input[class="select_all"]',function(){
	if($(this).is( ':checked' ))
	{
		$('input[class="orders"]').each(function() {
			if(!$(this).is(':disabled'))	{								 //loop through each checkbox
				this.checked = true;  											//select all checkboxes with class "orders"
				$(this).parent().parent().css('background','#ffffd5');
				$(this).change();
			}
		});
	}
	else
	{
		$('input[class="orders"]').each(function() {
			if(!$(this).is(':disabled'))	{									 //loop through each checkbox
				this.checked = false; 												 //deselect all checkboxes with class "orders"
				$(this).parent().parent().css('background','#fff');
				$(this).change();
			}
		});
	}
});

$(document).on('click','input[class="orders"]',function(){
	var checkedchk = $('input[class="orders"]:not([disabled]').length;
	var counter = 0;
	$('input[class="orders"]:checked').each(function(){
		counter++;
	});

	if(checkedchk==counter)
	{
		$('input[class="select_all"]').prop('checked',true);
	}
	else
	{
		$('input[class="select_all"]').removeAttr('checked');
	}

});

$(document).on('click','.btn-order-canlcel-payment',function(){
	var oid = $(this).attr('id');
	var action1 = base_url+'home/cancel_order';
	$('.loading').show();
	if (fooXHR) fooXHR.abort();
	fooXHR = $.ajax({
		type: "POST",
		url: action1,
		data: {action:'check_status',order_id:oid}, // serializes the form's elements.
		success: function(result)
		{
			$('.loading').hide();
			var data = $.parseJSON(result);
			if(data.success == '1'){
				$('#btn-cancel-order-popup').trigger("click");
			}
			if(data.success == '0'){
				alert('Order #'+oid+' could not be cancelled.');
				return false;
			}


		}
	});

});
////validation only numeric value
$(document).ready(function () {
	//called when key is pressed in textbox
	$("#product_qty").keypress(function (e) {
		//if the letter is not digit then display error and don't type anything
		if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
			//display error message
			//alert("add only digit");
			$("#errmsg").html("Please Add valid value.").show().fadeOut(4000);
			return false;
		}
	});
});
///validation numeric value ends here







$(document).on('submit','#calcel_order_form',function(event){

	var action1 = base_url+'home/cancel_order';
	$('.loading').show();
	if (fooXHR) fooXHR.abort();
	fooXHR = $.ajax({
		type: "POST",
		url: action1,
		data: $('#calcel_order_form').serialize(), // serializes the form's elements.
		success: function(result)
		{
			$('.loading').hide();
			var data = $.parseJSON(result);
			if(data.success == '1'){
				$('#close-cancel-popup').trigger( "click" );
				$('#calcel_order_form')[0].reset();
				location.reload(true);
			}
			if(data.success == '0'){
				$('#close-cancel-popup').trigger( "click" );
				$('#calcel_order_form')[0].reset();
				alert(data.msg);

				return false;
			}


		}
	});

	event.preventDefault();

});

function validateQty(event) {
	var key = window.event ? event.keyCode : event.which;
	if (event.keyCode == 8 || event.keyCode == 46
		|| event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 9) {
		return true;
	}
	else if ( key < 48 || key > 57 ) {
		return false;
	}
	else return true;
};

$(document).on('click','#reset_courier',function(){
	url = base_url+'home/reset_search_courier';
	$('.loading').show();
	$.ajax({
		type: "POST",
		url: url,
		data: { resetsearch:'active' }, // serializes the form's elements.
		success: function(result){
			if(result == '1'){
				$('.loading').hide();
				window.location.href = base_url+'home/courier';
			}
		}
	});

});

$(document).on('click','.sorting_users', function(){

	var field = $(this).attr('data-field');
	var typ = 	$(this).attr('data-type');
	var show = typ=='ASC'?'DESC':'ASC';
	$(this).attr('data-type',show);
	var pages = $('#paging').val();
	url = base_url+'home/search_users/'+pages;
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
			$("#order_out_ajax").html(data.result);
		}
	});

});

$(document).on('click','.sorting_vendors', function(){

	var field = $(this).attr('data-field');
	var typ = 	$(this).attr('data-type');
	var show = typ=='ASC'?'DESC':'ASC';
	$(this).attr('data-type',show);
	var pages = $('#paging').val();
	url = base_url+'home/search_vendors/'+pages;
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
			$("#order_out_ajax").html(data.result);
			$('input[type="checkbox"].vandor-onoff').onoff();
		}
	});

});


var lastChecked = null;
$(document).ready(function() {
	var $chkboxes = $('.orders');
	$chkboxes.click(function(e) {
		if(!lastChecked) {
			lastChecked = this;
			return;
		}

		if(e.shiftKey) {

			var start = $chkboxes.index(this);
			var end = $chkboxes.index(lastChecked);
			if(lastChecked.checked == true)
			{
				var colorclass = "#ffffd5";
			}
			if(lastChecked.checked == false)
			{
				var colorclass = "#ffffff";
			}
			$chkboxes.slice(Math.min(start,end), Math.max(start,end)+ 1).prop('checked', lastChecked.checked).parent().parent().css('background',colorclass);;
		}
		lastChecked = this;
	});
});



//******* supplies Module JS *****//

$(document).ready(function(e) {
	$('#formsubmitclick').click(function(){
		$("#createorder").validate({
			errorElement: "span",
			rules: {
				vendorname:{
					required:true
				},
				ddate:{
					required:true,
				},
				'pname[]':{
					required:true,
				},
				'qty[]':{
					required:true,
				},
				'unitprice[]':{
					required:true,
				},
				'ttlamt[]':{
					required:true,
				},
				// Specify the validation error messages
			},
			submitHandler: function(form) {
				form.submit();
			}
		});
	});
});

//******* supplies Module JS  Ends *****//

function print_message(oid){
	var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
	sThisVal = Base64.encode(oid);
	var nurl= base_url+"home/printMessage/single/"+sThisVal;
	window.open(nurl, '_blank');
}
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
function viewphotocake(photopath){
	 $("#previewphotoimg").modal();
   	$("#photoimg_view").html("<li><p><img src='" + photopath + "'  style='max-width:100%'></p></li>");
}
//PRINT Multiple Message Ends

//bakingo
$(document).on('submit','#filter_form_bak',function(event){
	url = base_url+'billings/get_bak_vendor_orders';
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





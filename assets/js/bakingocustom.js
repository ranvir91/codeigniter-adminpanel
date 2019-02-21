// JavaScript Document
var fooXHR;
//ADMIN COMMENT START
$(document).on('submit','form#bakingoadmin_comment',function( event ) {
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
//CUSTOMER COMMENT START
$(document).on('submit','form#bakingocustomer_comments',function( event ) {
	var url = base_url+'bakingo/home/add_customer_comment/';
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
//raise ticket
$(document).on('submit','#bakingo_raise_ticket',function( event ) {
	var reason_type = $('#reason_type').val();
	if(reason_type == "Reason"){
		$('#reason_type').parents('div.selectdiv').addClass('yourClass');
		return false;
	}
	else{
		$('#reason_type').parents('div.selectdiv').removeClass('yourClass');
	}
	$('.loading').show();
	var url = base_url+'bakingo/home/raise_ticket/';
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
// assign orders bakingo

$('.btn-success-bakingo').click(function(){
	var sThisVal = '';
	$('input[class="orders"]:checked').each(function () {
		if($(this).prop('checked')==true){
			sThisVal += $(this).val()+',';
		}
	});
	if(sThisVal.length==0){
		bootbox.alert('Please select order which you want to modify !');
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
		var url = base_url+'bakingo/home/update_orders/';
		$.each(arr, function(index, element) {
			var vendor 		= $('[name="vendor_'+element+'"]').val();
			if(vendor == ""){
				$('[name="vendor_'+element+'"]').css('border','1px solid red').focus();
				return false;
			}
			var amount 		= $('[name="amount_'+element+'"]').val();
			var regex = new RegExp(/[\0\x08\x09\x1a\n\r"'\\\%]/g)
			var escaper = function escaper(char){
				var m = ['\\0', '\\x08', '\\x09', '\\x1a', '\\n', '\\r', "'", '"', "\\", '\\\\', "%"];
				var r = ['\\\\0', '\\\\b', '\\\\t', '\\\\z', '\\\\n', '\\\\r', "''", '""', '\\\\', '\\\\\\\\', '\\%'];
				return r[m.indexOf(char)];
			};
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
					$.each(listingdata, function(index, element) {
						$('#order_'+element).css('background','#fff');
						$('#order_'+element+' input[type="checkbox"]').prop('checked', false);
						$('input[class="select_all"]').removeAttr('checked');
						getorderout(element);
					});
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

$('.btn-rimender-bakingo').click(function(){
	var sThisVal = '';
	$('input[class="orders"]:checked').each(function () {
		if($(this).prop('checked')==true){
			sThisVal += $(this).val()+',';
		}
	});
	if(sThisVal.length==0){
		bootbox.alert('Please select order for which you want to send reminders ! ');
		return false;
	}
	else{
		$('#selected_orders').val(sThisVal);
		url = base_url+'bakingo/home/send_reminders';
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
					bootbox.alert('Please assign vendor first');
				}
			}
		});
	}
});
$(document).on('click','.bakingosorting', function(){
	var field 		= $(this).attr('data-field');
	var typ 		= $('#ordty').val();
	var currenturl = $('#currenturl').val();

	var terminate  = '&';
	var nofilter   = base_url+'bakingo/home/order_out';
	var redirect   = base_url+'bakingo/home/orderoutfilter';
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
$(document).on('click','#bakingo_update_order_button',function(){
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
        
	var url = base_url+'bakingo/home/update_orders_status';
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

				var listingdata = [];
				listingdata = result1.updated_orders;

				if(result1.activetab == "order_out"){
					$.each(listingdata, function(index, element) {

						$('#order_'+element).css('background','#fff');
						$('#order_'+element+' input[type="checkbox"]').attr('checked', false);
						$('input[class="select_all"]').removeAttr('checked');
						getorderout(element);
					});
				}
				if(result1.activetab == "courier"){
					$.each(listingdata, function(index, element) {
						$('#courier_'+element).css('background','#fff');
						$('#courier_'+element+' input[type="checkbox"]').attr('checked', false);
						$('input[class="select_all"]').removeAttr('checked');
						getorderdetail(element);
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

//Order Info
// JavaScript Document
var fooXHRO;
$('#bakingo-update-order').click(function(){

	//alert("hello");


	if($('#dlv_date').val() ==''){
		$('.order-info-edit').show();
		$('#dlv_date').focus();
		return false;
	}
/*
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
	*/
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
	url = base_url+'bakingo/home/update_order_info';
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
$('#bakingo-update-order-del-info').click(function(){
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
	url = base_url+'bakingo/home/update_delivery_info';
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

//Billing Info
// JavaScript Document
var fooXHRB;
$('#bakingo-update-billing-info').click(function(){
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
	url = base_url+'bakingo/home/update_billing_info';

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
//Delivery Info End
$(document).on('click','.bakingo_amount_update',function(){
	var id1 = $(this).attr('id');
	var amount1 = $('input[name="amount_'+id1+'"]').val();
	var amount2 = $(this).attr('data-amount');
	$('.loading').show();
	$.post(base_url+'bakingo/home/updateamount',{id: id1 ,amount: amount1}, function(result){
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
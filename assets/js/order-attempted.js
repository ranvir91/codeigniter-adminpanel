// vendor_attempted() method shows modal form and append form elements
function vendor_attempted(omid, oid, vendor_order_hash) {
    $('#order_attempted_form input[name=order_id]').val(oid);
    $('#order_attempted_form input[name=omid]').val(omid);
    $('#order_attempted_form input[name=vendor_order_hash]').val(vendor_order_hash);
    $('#order_attempted').modal('show');
}

function updateAttemptedReason() {
    var reason_attempted = $('select[name=reason_attempted]').val();
    var omid = $('input[name=attempted_omid]').val();
    var order_id = $('input[name=order_id]').val();
    var attempted_reason_old = $('input[name=attempted_reason_old]').val();
    if((reason_attempted) && (reason_attempted!=attempted_reason_old)) {
      $.ajax({
        type: "POST",
        url: base_url + 'vorder_e/update_vendor_attempted_status',
        beforeSend: function(){$("#attempted_message").html('<img src="'+base_url+'assets/images/loading.gif" alt="processing" width="16" />');},
        data: {'reason_attempted': reason_attempted, 'omid':omid,'order_id':order_id, 'attempted_reason_old':attempted_reason_old},
        success: function (result)
        {
            var data = $.parseJSON(result);
            if (data.status == 1) {
              $("#attempted_message").html('Reason updated successfully.').css({'color':'#437b18'}).show().delay(3000).fadeOut();
              $("input[name=attempted_reason_old]").val(data.reason);
            }
        }
      });
    } else {
        $("#attempted_message").html('Please select/change reason.').css({'color':'#fc0202'}).show().delay(3000).fadeOut();
    }
}

$(document).ready(function () {
    $('#order_attempted_form').validate();
});

$(document).on('submit', '#order_attempted_form', function (event) {
    var url = base_url + 'vorder_e/vendor_attempted_status/';
    $('.loading').show();
    var omid = $(this).children('input[name=omid]').val();
    $.ajax({
        type: "POST",
        url: url,
        data: $(this).serialize(), // serializes the form's elements.
        success: function (result)
        {
            $('#completeorder')[0].reset();
            $('.loading').hide();
            var data = $.parseJSON(result);
            if (data.action == 1) {
                $('#attm_btn_'+omid).parent().parent().fadeOut('slow');
            }
            $('#order_attempted').modal('hide');
            location.reload();
        }
    });
    event.preventDefault();
});

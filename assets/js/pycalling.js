function assignAgent(orderid, rowid) {
  $('#order_id').val(orderid+',');
  $('#row_id').val(rowid+',');
  $('#assignAgent').modal('show');
  $('#assignAgent').find('#Agentname').focus();
}

function assignMultipleAgent() {
  var selectObject = $("input:checkbox:checked");
  var values = "";
  var omids = "";
  selectObject.each(function(chk){
    values = values + selectObject[chk].value+",";
    omids += selectObject[chk].attributes.omid.value+",";
  });
  $('#order_id').val(values);
  $('#row_id').val(omids);
  $('#assignAgent').modal('show');
}

$('.checkAssign').change(function(){
    if($('.checkAssign').filter(':checked').length < 1){
       $('#assignMultiAgent').attr("disabled",true);
    }else{
        $('#assignMultiAgent').removeAttr('disabled');
    }
});

$(document).ready(function(e) {
    $('.checkAssign').attr("checked",false);
    $('#assignMultiAgent').attr("disabled",true);
    $('.checkAssign').change();
    $('#asignagentbtn').click(function () {
        $("#assign_agent_form").validate({
            errorElement: "span",
            rules: {
                Agentname:{
                    required:true
                },
                // Specify the validation error messages
            },
            submitHandler: function(form) {
                var rowid = form[0].value; // omid of record
                var agent = form[2].value;
                $.ajax({
                    url: form.action,
                    type: form.method,
                    data: $(form).serialize(),
                    success: function(response) {
                        var res = $.parseJSON(response);
                        if(res.status) {
                            $.each(res.data , function(index, elem){
                              var rowid = elem; // omid
                              var orderid = $.trim($('#row_'+rowid+' td.ordertd').text());
                              $('#row_'+rowid+' td.agenttd').html("<b>"+agent+"</b>" + '<span class="pull-right"><span class="glyphicon glyphicon-retweet"></span> <a href="javascript:void(0);" '
                  + 'onclick="assignAgent('+ orderid +','+ rowid +');">Reassign</a></span>');
                              $('#row_'+rowid+' td.ordertd').html('<a target="_blank" href="'+base_url+'pycalling/order-view/'+orderid+'">'+orderid+'</a>');
                              $('#row_'+rowid+' td.checkboxtd input:checkbox').attr('disabled', true);
                            });
                          show_snackbar(res.msg);
                          form.reset();
                          $('.checkAssign').attr('checked',false);
                          $('#assignAgent').modal('hide');
                        }
                    }            
                });
            }
        });
    });
});

$(function () {
    $('#order_status').multiselect({
        includeSelectAllOption: true,
        selectAllText: 'Select All',
        nonSelectedText: 'Order Status'
    });
    $('#btnSelected').click(function () {
        var selected = $("#orderslottype option:selected");
        var message = "";
        selected.each(function () {
            message += $(this).val() + ",";
        });
    });
});
$(function () {
    $('#order_des').multiselect({
        includeSelectAllOption: true,
        selectAllText: 'Select All',
        nonSelectedText: 'Desposition'
    });
    $('#btnSelected').click(function () {
        var selected = $("#orderslottype option:selected");
        var message = "";
        selected.each(function () {
            message += $(this).val() + ",";
        });
    });
});

$('#order_des').on("change",function(){
    var selectedstatus   = $("#order_des option:selected");
    var order_des         = "";
    selectedstatus.each(function () {
        order_des += "'"+ $(this).val() + "',";
    });
    $('#calldes').val(order_des);
});
$('#order_status').on("change",function(){
    var selecteds    = $("#order_status option:selected");
    var order_s         = "";
    selecteds.each(function () {
        order_s += "'"+ $(this).val() + "',";
    });
    $('#ostatus').val(order_s);
});

function submitformm(frm) {
    $search_from = $("#search_from").val();
    $search_to = $("#search_to").val();
    $date = $('#date_id').val();
    $phone = $('#id_phone').val();
    $order_id = $('#id_order_id').val();

    if($phone || $order_id || $date){
        $('#msg_form').html('').hide();
    }
    if(!$date) {
      if(!$search_from || !$search_to) {
        show_snackbar("Please fill Calling date range or Last year delivery date.");
        $("#search_from").focus();
        return false;
      }
    }
    $(frm).submit();
}

$(function(){
    $('#search_from , #search_to').datetimepicker({
        format: "yyyy-mm-dd" , todayHighlight : true, autoclose: true , clearBtn : true, pickTime : false , minView : 2
    }).datetimepicker('setEndDate', new Date());
    
    $('#search_from').datetimepicker({
        }).on('changeDate', function (selected) {
        var startDate = new Date(selected.date.valueOf());
        $('#search_to').datetimepicker('setStartDate', startDate);
    }).on('clearDate', function (selected) {
        $('#search_to').datetimepicker('setStartDate', null);
    });
    
    $('#search_to').datetimepicker({
        }).on('changeDate', function (selected) {
        var endDate = new Date(selected.date.valueOf());
        $('#search_from').datetimepicker('setEndDate', endDate);
    }).on('clearDate', function (selected) {
        $('#search_from').datetimepicker('setEndDate', null);
    });
});

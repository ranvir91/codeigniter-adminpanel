function open_form_customize_text(that, order_product_id)
{
    $('.edit-form-cont-'+order_product_id).slideDown();
    var text = $('.input-text-'+order_product_id).val();
    $('.input-text-'+order_product_id).val('');
    $('.input-text-'+order_product_id).focus().val(text);
}

function _close_form(that)
{
    $(that).parent().parent().slideUp();
}

function edit_customize_text(that, order_product_id)
{
    var url = base_url + 'home/update_custom_text';
    var customize_text = $.trim($('.input-text-'+order_product_id).val());
    var order_id = $(that).parent().find('.input-text-order_id').val();
    var valid = false;
    
    if(customize_text) {
      valid = true;
    }
    
    if(valid==false) {
      bootbox.alert('Please fill customize text.');
      return false;
    }
    else {
      $.ajax({
        type: "POST",
        url: url,
        data: {order_product_id: order_product_id, customize_text : customize_text, order_id : order_id},
        beforeSend : function() {
            $(that).next().append('<img src="'+base_url+'assets/images/loading.gif" width="20" title="Processing..." />');
        },
        success: function (response) {
            if(response.status) {
                $(that).parent().hide();
                $('.custo-txt-span-'+order_product_id).text(customize_text);
                $('.cust-txt-msg-'+order_product_id).show().text(response.message).css({color:'green'}).fadeOut(3000);
                $(that).next().find('img').remove();
            }else {
                $('.cust-txt-msg-'+order_product_id).show().text(response.message).css({color:'red'}).fadeOut(3000);
            }
        }
      });
    }
}
function download_file(filename, order_id){
    url = base_url + "home/download-file?file="+filename+ "&order_id="+ order_id;
    window.open(url,'_blank');
}

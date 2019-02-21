$(function() {
    var rv = {};
    rv.optionalArray = ['delivery_timing','staff_complaint','other'];
    var vendors = vendors_json;
    $( ".vendor_name_autocomplete" ).autocomplete({ source: vendors });

    $('#add_complaint_order_view').click(function() {
      var order_id = $('#add_complaint_form input[name=order_id]').val();
      if(order_id) {
        call_validate_orderid(order_id, rv);
      }
    });

    $("#add_complaint_form #order_id").blur(function () {
      var order_id = $(this).val();
      if(order_id) {
        call_validate_orderid(order_id, rv);
      }
    });

    $("#add_complaint_form #vendor_name").blur(function () {
        var vendor   = $(this).val();
        var order_id = $('#add_complaint_form #order_id').val();
        var url     = base_url+'ticket/vendorValidation/';
        $.ajax({
            type: "POST",
            url: url,
            data: {vendor :vendor, order_id : order_id}, // serializes the form's elements.
            success: function(result){
                var response = jQuery.parseJSON(result);
                if(response.errorv){
                    $('#vendor_name').val('').focus();
                    $('#vendorerr').html(response.errorv).fadeIn().delay(3000).fadeOut();
                    $('#vendorsuc').html('');
                }
                if(response.sucessv){
                    $('#vendorsuc').html(response.sucessv).fadeIn().delay(3000).fadeOut();
                    $('#vendorerr').html('');
                }
                if(response.errva){
                    $('#vendor_name').val('').focus();
                    $('#vendorerr').html(response.errva).fadeIn().delay(3000).fadeOut();
                    $('#vendorsuc').html('');
                }
            }
        });
    });

    $('#add_complaint_form select[name=comp_type]').on('change', function(){
        var value = $(this).val();
        if(!value){
          $('#product_items').html('').prev().hide();
        }        
        if(rv.productsArray) {
            var temp = '';
            $.each(rv.productsArray, function(index, element) {
                temp += '<div class="col-md-6"><div class="form-group"><p style="padding:0"><label><input class="marginRight-15 product_checkbox" type="checkbox" name="product[]" value="'+element.nid+'" /> '+element.title+' </label></p></div></div>';
                if((index%2)==1){
                    temp += '<div class="clearfix"></div>';
                }
            });
            if($.inArray(value, rv.optionalArray)==-1) {
              $('#product_items').html(temp).prev().show();
            } else {
              $('#product_items').html('').prev().hide();
            }
        }
    });

    $('#add_complaint_form').validate({
        rules: {
            order_id:{ required:true },
            vendor_name:{ required:true },
            comp_type:{ required:true },
            ddate:{ required:true },
            'product[]': {
                required: function(element){
                    var value = $('#add_complaint_form select[name=comp_type]').val();
                    return ((value) && ($.inArray(value, rv.optionalArray)==-1)) ? true : false;
                }
            }
        },
        messages : {
            'product[]' : "Please choose product(s)"
        }
    });


});


function ValidateFileUpload() {
    var fuData = document.getElementById('uploadBtn');
    var FileUploadPath = fuData.value;
    //To check if user upload any file
    if (FileUploadPath == '') {
        alert("Please upload an image");
    } else {
        var Extension = FileUploadPath.substring(
            FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
        //The file uploaded is an image
        if (Extension == "gif" || Extension == "png" || Extension == "bmp"
            || Extension == "jpeg" || Extension == "jpg") {

            var size = fuData.files[0].size;
             if(size > 5000000){
                 $('#uploadBtn').val("");
                 var baseurl = $('#baseurl').val();
                 $('#blah').attr('src', baseurl+'/assets/images/noimage.jpg');
                 bootbox.alert("maximum size of file is 5MB ");
                 return;
             }
            // To Display
            if (fuData.files && fuData.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $('#blah').attr('src', e.target.result);
                }
                reader.readAsDataURL(fuData.files[0]);
            }
        }
       //The file upload is NOT an image
        else {
            $('#uploadBtn').val("");
            bootbox.alert("Photo only allows file types of PNG, JPG, JPEG and BMP. ");
            var baseurl = $('#baseurl').val();
            $('#blah').attr('src', baseurl+'/assets/images/noimage.jpg');
        }
    }
}

function call_validate_orderid(order_id, rv) {
    $('#add_complaint_form #vendor_name').prop('readonly', false);
    var url = base_url+'ticket/orderidValidation/';
    $.ajax({
        type: "POST",
        url: url,
        data: {order_id:order_id}, // serializes the form's elements.
        success: function(result){
            //alert(result);
            //return false;
            var response = jQuery.parseJSON(result);
            rv.productsArray = response.products; // assign product array
            if(response.error){
                $('#orderdel').html('');
                $('#vendor_name').val('');
                $("#vendorsuc").val('');
                $('#order_id').val('').focus();
                $('#ordererr').html(response.error).show().fadeOut(5000);
            }
            if(response.deliverydate ){
                $('#ordererr').html('');
                $('#orderdel').html(response.deliverydate).show().fadeOut(5000);
                $('#vendor_name').val(response.vendorname);
                $('#add_complaint input[name=merchant_id]').val(response.merchant);
            }
            if(response.courier == true){
                $('#vendor_name').prop('readonly', true);
            }
        }
    });
}

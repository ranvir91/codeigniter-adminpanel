function showUploadedImage(order_id){
    $("#previewimagesmodel .cs-hidden").html("");
    $.ajax({
        type: "GET",
        url: base_url +'vendor_deliveryboy/ajax_get_uploaded_image?order_id='+order_id,
        data: {'order_id':order_id}, // serializes the form's elements.
        success: function (result){
            var result = $.parseJSON(result);
            $.each(result,function(k,image){
                $("#previewimagesmodel .cs-hidden").append("<li><p><img src='" +image.image_name + "' ></p><p class='img_name'>" + image.created_date + "</p></li>");
            });
            $('#previewimagesmodel').modal('show');
        }
    });
}

$(document).on('click','input[class="select_all"]',function(){
    if($(this).is( ':checked' ))
    {
        $('input[class="orders"]').each(function() {
            if(!$(this).is(':disabled'))    {                                //loop through each checkbox
                this.checked = true;                                            //select all checkboxes with class "orders"
                $(this).parent().parent().css('background','#ffffd5');
                $(this).change();
            }
        });
    }
    else
    {
        $('input[class="orders"]').each(function() {
            if(!$(this).is(':disabled'))    {                                    //loop through each checkbox
                this.checked = false;                                                //deselect all checkboxes with class "orders"
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


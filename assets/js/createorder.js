/* Fundraising Grader
*
* Generic Copyright, yadda yadd yadda
*
* Plug-ins: jQuery Validate, jQuery 
* Easing
*/
function getpaymentlink(){
           order_id = order_id;
           if(order_id != ''){
           var dataString = '&order_id='+order_id;
           $('.loading').show();
            $.ajax({
            type: "POST",
            url: base_url+'orders/getsorturl/',
            dataType: 'JSON',
            data: dataString,
            success: function(result){
                            $('.loading').hide();
                            statuscode  = result.data.status_code;
                            if(statuscode == 200){
                             paymentlink = result.data.link;
                             $('#pay_link').val(paymentlink);
                         } else{
                             bootbox.alert("Something wrong please try again");
                         } 
                }
            });
        } else{
            bootbox.alert("Order Id missing unable to create payment Link");
        }
}
function confirmorder(){
    order_id     =  $('#order_id').val();;
    billingmail  =  $('#pay_email').val();
    billingphone =  $('#pay_email').val();
    paylink      =  $('#pay_link').val();
    if(paylink == '') { bootbox.alert("Please Genrate Payment Link ! ");  return false; }
    $('.loading').show();
    $.ajax({
			type: "POST",
                        dataType: 'JSON',
			url: base_url+'orders/confirmorders/',
			data: {mail: billingmail,phone:billingphone,paylink:paylink,order_id:order_id},
			success: function (result) {
                            $('.loading').hide();
			    statuscode  = result.data.status_code;
                            if(statuscode == 200){
                            location = base_url+'orders/confirmorder/'+order_id;
                            window.open(location);
                         } else{
                             bootbox.alert("Something wrong please try again");
                         } 
			}
		});
}
function setHeader(xhr) {

  xhr.setRequestHeader('Authorization', 'Access-Control-Allow-Headers');
}
$(document).ready(function() {
    var current_fs, next_fs, previous_fs;
    var left, opacity, scale;
    var animating;
   
    $(".steps").validate({
        errorClass: 'invalid',
        errorElement: 'span',
        errorPlacement: function(error, element) {
            error.insertAfter(element.next('span').children());
        },
        highlight: function(element) {
            $(element).next('span').show();
        },
        unhighlight: function(element) {
            $(element).next('span').hide();
        }
    });
    
    $(".next").click(function() {
        
        
        $(".steps").validate({
            errorClass: 'invalid',
            errorElement: 'span',
            errorPlacement: function(error, element) {
                error.insertAfter(element.next('span').children());
            },
            highlight: function(element) {
                $(element).next('span').show();
            },
            unhighlight: function(element) {
                $(element).next('span').hide();
            }
        });
        if ((!$('.steps').valid())) {
            return true;
        }
        
       // if (animating) return false;
        
        
        animating  = true;
        current_fs = $(this).parent();
        next_fs    = $(this).parent().next();
        step       = $(this).attr('step');
        postdata   = [];
        dataString = ''; 
        if(step == 'checkout_step_one'){
            $('.loading').show();
            step       = step;
            autoorderid = $('#order_id').val();
            username   = $('#user_name').val();
            mail       = $('#email').val();
            phone      = $('#phone').val();
            var dataString = '&create=' + step +'&username='+username+'&mail='+mail+'&phone='+phone+'&order_id='+autoorderid;
        
        //console.log(dataString);
        $.ajax({
            type: "POST",
            url: base_url+'orders/callapiorders/',
            dataType: 'JSON',
            data: dataString,
            success: function(result){
                             $('.loading').hide();                  
                             statuscode = result.data.status_code;
                             userid     = result.data.user_id;
                             order_id   = result.data.order_id;
                             $('#order_id').val(order_id);
                             $('#user_id').val(user_id);
                             if(statuscode == 200){
                                 $('#pay_email').val(mail);
                                 $('#pay_phone').val(phone);
                             $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
                                next_fs.show();
                                current_fs.animate({
                                    opacity: 0
                                }, {
                                    step: function(now, mx) {
                                        scale = 1 - (1 - now) * 0.2;
                                        left = (now * 50) + "%";
                                        opacity = 1 - now;
                                        current_fs.css({
                                            'transform': 'scale(' + scale + ')'
                                        });
                                        next_fs.css({
                                            'left': left,
                                            'opacity': opacity
                                        });
                                    },
                                    duration: 800,
                                    complete: function() {
                                        current_fs.hide();
                                        animating = false;
                                    },
                                    easing: 'easeInOutExpo'
                                });
                                if(order_id) {
                                  window.location.href = base_url + "orders/createorder/" + order_id;
                                }
                          }
                    }
        });
    } else if(step == 'checkout_step_two'){
        
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
                                next_fs.show();
                                current_fs.animate({
                                    opacity: 0
                                }, {
                                    step: function(now, mx) {
                                        scale = 1 - (1 - now) * 0.2;
                                        left = (now * 50) + "%";
                                        opacity = 1 - now;
                                        current_fs.css({
                                            'transform': 'scale(' + scale + ')'
                                        });
                                        next_fs.css({
                                            'left': left,
                                            'opacity': opacity
                                        });
                                    },
                                    duration: 800,
                                    complete: function() {
                                        current_fs.hide();
                                        animating = false;
                                    },
                                    easing: 'easeInOutExpo'
                                });
        
    } else if(step == 'checkout_step_three'){
            orderid                 = order_id;
            delivery_first_name     = $('#del_first_name').val();
            delivery_street1        = $('#street_address').val();
            delivery_postal_code    = $('#Postal_code').val();
            delivery_city           = $('#ocity').val();
            state                   = $('#state').val();
            delivery_phone          = $('#delivery_phone').val();
            pincode_delivery_charge = $('#pincode_delivery_charge').val();
            user_id                 = $('#user_id').val();
            $('.loading').show();
            var dataString = '&order_id='+orderid+'&user_id='+user_id+'&create=checkout_step_two&delivery_first_name='+delivery_first_name+'&delivery_street1='+delivery_street1+'&delivery_postal_code='+delivery_postal_code+'&delivery_city='+delivery_city+'&state='+state+'&delivery_phone='+delivery_phone+'&pincode_charges='+pincode_delivery_charge;
            
            
            $.ajax({
            type: "POST",
            url: base_url+'orders/callapiorders/',
            dataType: 'JSON',
            data: dataString,
            success: function(result){
                $('.loading').hide();
                statuscode = result.data.status_code;
                if(statuscode == 200){
                    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
                   next_fs.show();
                   current_fs.animate({
                       opacity: 0
                   }, {
                       step: function(now, mx) {
                           scale = 1 - (1 - now) * 0.2;
                           left = (now * 50) + "%";
                           opacity = 1 - now;
                           current_fs.css({
                               'transform': 'scale(' + scale + ')'
                           });
                           next_fs.css({
                               'left': left,
                               'opacity': opacity
                           });
                       },
                       duration: 800,
                       complete: function() {
                           current_fs.hide();
                           animating = false;
                       },
                       easing: 'easeInOutExpo'
                   });
                }
            },
            error : function(){
                alert('Network error, Please try after sometime.');
            }
        });
    } else if(step == 'checkout_step_four'){
            orderid                 = order_id;
            del_type                = '0';
            slot_id                 = $('#slotid').val();
            if(slot_id == ''){ bootbox.alert("Please select Delivery Slot"); return false;}
            if(slot_id == '58') { del_type  = 1; } 
            products_type           = $('#product_type').val();
            delivery_date           = $('#delivery_date').val();
            delivery_gdate          = $('#gift_delivery_date').val();
            if(delivery_gdate == ''){ delivery_gdate = delivery_date; } 
            delivery_charge          = $('#delivery_charge').val();
            sender_name             = $('#sender_name').val();
            m_type                  = $('#occasion').val();
            m_text                  = $('#message').val();
            spl_instruction         = $('#spec_ins').val();
            typecharges             = $('#charge_type').val();
            chargetype              = '';
            if(typecharges != ''){
                if(typecharges == 'midnight'){ chargetype = 'midnight delivery charge'; }
                if(typecharges == 'fixedtime'){ chargetype = 'fixed delivery '; }
            }
            charge_type             = chargetype;
            charge_amount           = delivery_charge;
            user_id                 = $('#user_id').val();
            
           var dataString = '&order_id='+orderid+'&create=checkout_step_three&del_type='+del_type+
                   '&slot_id='+slot_id+'&products_type='+products_type+'&delivery_date='+delivery_date+
                   '&delivery_gdate='+delivery_gdate+'&sender_name='+sender_name+
                   '&m_type='+m_type+'&m_text='+m_text+
                   '&spl_instruction='+spl_instruction+'&charge_type='+charge_type+
                   '&charge_amount='+charge_amount+'&user_id='+user_id;
            $.ajax({
            type: "POST",
            url: base_url+'orders/callapiorders/',
            dataType: 'JSON',
            data: dataString,
            success: function(result){
                            statuscode = result.data.status_code;
                             if(statuscode == 200){
                                 $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
                                next_fs.show();
                                current_fs.animate({
                                    opacity: 0
                                }, {
                                    step: function(now, mx) {
                                        scale = 1 - (1 - now) * 0.2;
                                        left = (now * 50) + "%";
                                        opacity = 1 - now;
                                        current_fs.css({
                                            'transform': 'scale(' + scale + ')'
                                        });
                                        next_fs.css({
                                            'left': left,
                                            'opacity': opacity
                                        });
                                    },
                                    duration: 800,
                                    complete: function() {
                                        current_fs.hide();
                                        animating = false;
                                    },
                                    easing: 'easeInOutExpo'
                                });
                             }
                }
            });
            
    }
    });
    $(".submit").click(function() {
        $(".steps").validate({
            errorClass: 'invalid',
            errorElement: 'span',
            errorPlacement: function(error, element) {
                error.insertAfter(element.next('span').children());
            },
            highlight: function(element) {
                $(element).next('span').show();
            },
            unhighlight: function(element) {
                $(element).next('span').hide();
            }
        });
        if ((!$('.steps').valid())) {
            return false;
        }
        if (animating) return false;
        animating = true;
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        next_fs.show();
        current_fs.animate({
            opacity: 0
        }, {
            step: function(now, mx) {
                scale = 1 - (1 - now) * 0.2;
                left = (now * 50) + "%";
                opacity = 1 - now;
                current_fs.css({
                    'transform': 'scale(' + scale + ')'
                });
                next_fs.css({
                    'left': left,
                    'opacity': opacity
                });
            },
            duration: 800,
            complete: function() {
                current_fs.hide();
                animating = false;
            },
            easing: 'easeInOutExpo'
        });
    });
    $(".previous").click(function() {
        //if (animating) return false;
        animating = true;
        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
        previous_fs.show();
        current_fs.animate({
            opacity: 0
        }, {
            step: function(now, mx) {
                scale = 0.8 + (1 - now) * 0.2;
                left = ((1 - now) * 50) + "%";
                opacity = 1 - now;
                current_fs.css({
                    'left': left
                });
                previous_fs.css({
                    'transform': 'scale(' + scale + ')',
                    'opacity': opacity
                });
            },
            duration: 800,
            complete: function() {
                current_fs.hide();
                animating = false;
            },
            easing: 'easeInOutExpo'
        });
    });

    if(order_id > 0) {
        $("#progressbar li").eq(0).removeClass("active");
        $("form fieldset").eq(0).hide();
        $("#progressbar li").eq(1).addClass("active");
        $("form fieldset").eq(1).show();
    }
});

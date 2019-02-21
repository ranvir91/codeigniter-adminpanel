var fooXHR;
function getticket(sel) {
    var newval = sel.value;
    if (newval == 'Price Request') {
        $('#reason_div').show();
        $('#price_div').show();
        $('#commnents_div').show();
        $('#submit_div').show();
        $("input#price").prop('required', true);
        $("textarea#comment").prop('required', true);
        $("#comments").val(newval);
    }
    if (newval == 'Product Not Available' || newval == 'Alternate contact number'  || newval == 'Time slot not possible' || newval == 'Other') {
        $('#reason_div').hide();
        $('#price_div').hide();
        $("input#price").prop('required', false);
        $("#comments").prop('required', true);
        $('#commnents_div').show();
        $('#submit_div').show();
        $('#reason_type').val('Other');
        $("#comments").val('');
    }
    if (newval == 'Choose Ticket Type') {
        $('#reason_div').hide();
        $('#price_div').hide();
        $('#commnents_div').hide();
        $('#submit_div').hide();
        $("#comments").prop('required', false);
        $('#reason_type').val('Other');
    }
}
$(document).on('submit', '#raise_ticket', function (event) {
    var reason_type = $('#reason_type').val();
    if (reason_type == "Reason") {
        $('#reason_type').parents('div.selectdiv').addClass('yourClass');
        return false;
    } else {
        $('#reason_type').parents('div.selectdiv').removeClass('yourClass');
    }
    var url = base_url + 'vorder_e/raise_ticket/';
    $('.loading').show();
    if (fooXHR)
        fooXHR.abort();
    fooXHR = $.ajax({
        type: "POST",
        url: url,
        data: $(this).serialize(), // serializes the form's elements.
        success: function (result)
        {
            $('.loading').hide();
            var data = $.parseJSON(result);
            if (data.success == '1') {
                location.reload(false);
            } else {
                bootbox.alert({
                    size: 'small',
                    message: "Multiple price request cannot open. Please close previous Price request tickets.",
                    callback: function () {
                    }
                });

            }
        }
    });
    event.preventDefault();
});
$(document).on('click', '.out_delivey_action', function () {
    var oid = $(this).attr('data-href');
    url = base_url + 'vendor/change_out_delivery/' + oid;
    $('.loading').show();
    if (fooXHR)
        fooXHR.abort();
    fooXHR = $.ajax({
        type: "POST",
        url: url,
        data: {orderid: oid}, // serializes the form's elements.
        success: function (result) {
            $('.loading').hide();
            getorderdetail(oid);
        }
    });
});

$(document).on('click', '.vendor_complete_action', function () {
    var oid = $(this).attr('data-href');
    $("#divhide h3").text('Order Id: ' + oid);
    $("#orderid").val(oid);
    $("#divhide").fadeIn();
    $("#backdiv").fadeIn();
});

function print_courier(oid) {
    var Base64 = {_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) {
            var t = "";
            var n, r, i, s, o, u, a;
            var f = 0;
            e = Base64._utf8_encode(e);
            while (f < e.length) {
                n = e.charCodeAt(f++);
                r = e.charCodeAt(f++);
                i = e.charCodeAt(f++);
                s = n >> 2;
                o = (n & 3) << 4 | r >> 4;
                u = (r & 15) << 2 | i >> 6;
                a = i & 63;
                if (isNaN(r)) {
                    u = a = 64
                } else if (isNaN(i)) {
                    a = 64
                }
                t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
            }
            return t
        }, decode: function (e) {
            var t = "";
            var n, r, i;
            var s, o, u, a;
            var f = 0;
            e = e.replace(/[^A-Za-z0-9+/=]/g, "");
            while (f < e.length) {
                s = this._keyStr.indexOf(e.charAt(f++));
                o = this._keyStr.indexOf(e.charAt(f++));
                u = this._keyStr.indexOf(e.charAt(f++));
                a = this._keyStr.indexOf(e.charAt(f++));
                n = s << 2 | o >> 4;
                r = (o & 15) << 4 | u >> 2;
                i = (u & 3) << 6 | a;
                t = t + String.fromCharCode(n);
                if (u != 64) {
                    t = t + String.fromCharCode(r)
                }
                if (a != 64) {
                    t = t + String.fromCharCode(i)
                }
            }
            t = Base64._utf8_decode(t);
            return t
        }, _utf8_encode: function (e) {
            e = e.replace(/rn/g, "n");
            var t = "";
            for (var n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r)
                } else if (r > 127 && r < 2048) {
                    t += String.fromCharCode(r >> 6 | 192);
                    t += String.fromCharCode(r & 63 | 128)
                } else {
                    t += String.fromCharCode(r >> 12 | 224);
                    t += String.fromCharCode(r >> 6 & 63 | 128);
                    t += String.fromCharCode(r & 63 | 128)
                }
            }
            return t
        }, _utf8_decode: function (e) {
            var t = "";
            var n = 0;
            var r = c1 = c2 = 0;
            while (n < e.length) {
                r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r);
                    n++
                } else if (r > 191 && r < 224) {
                    c2 = e.charCodeAt(n + 1);
                    t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                    n += 2
                } else {
                    c2 = e.charCodeAt(n + 1);
                    c3 = e.charCodeAt(n + 2);
                    t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                    n += 3
                }
            }
            return t
        }}
    sThisVal = Base64.encode(oid);
    var nurl = base_url + "vendor/vendor_receipt/single/" + sThisVal;
    window.open(nurl, '_blank');
}

function print_message(oid) {
    var Base64 = {_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) {
            var t = "";
            var n, r, i, s, o, u, a;
            var f = 0;
            e = Base64._utf8_encode(e);
            while (f < e.length) {
                n = e.charCodeAt(f++);
                r = e.charCodeAt(f++);
                i = e.charCodeAt(f++);
                s = n >> 2;
                o = (n & 3) << 4 | r >> 4;
                u = (r & 15) << 2 | i >> 6;
                a = i & 63;
                if (isNaN(r)) {
                    u = a = 64
                } else if (isNaN(i)) {
                    a = 64
                }
                t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
            }
            return t
        }, decode: function (e) {
            var t = "";
            var n, r, i;
            var s, o, u, a;
            var f = 0;
            e = e.replace(/[^A-Za-z0-9+/=]/g, "");
            while (f < e.length) {
                s = this._keyStr.indexOf(e.charAt(f++));
                o = this._keyStr.indexOf(e.charAt(f++));
                u = this._keyStr.indexOf(e.charAt(f++));
                a = this._keyStr.indexOf(e.charAt(f++));
                n = s << 2 | o >> 4;
                r = (o & 15) << 4 | u >> 2;
                i = (u & 3) << 6 | a;
                t = t + String.fromCharCode(n);
                if (u != 64) {
                    t = t + String.fromCharCode(r)
                }
                if (a != 64) {
                    t = t + String.fromCharCode(i)
                }
            }
            t = Base64._utf8_decode(t);
            return t
        }, _utf8_encode: function (e) {
            e = e.replace(/rn/g, "n");
            var t = "";
            for (var n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r)
                } else if (r > 127 && r < 2048) {
                    t += String.fromCharCode(r >> 6 | 192);
                    t += String.fromCharCode(r & 63 | 128)
                } else {
                    t += String.fromCharCode(r >> 12 | 224);
                    t += String.fromCharCode(r >> 6 & 63 | 128);
                    t += String.fromCharCode(r & 63 | 128)
                }
            }
            return t
        }, _utf8_decode: function (e) {
            var t = "";
            var n = 0;
            var r = c1 = c2 = 0;
            while (n < e.length) {
                r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r);
                    n++
                } else if (r > 191 && r < 224) {
                    c2 = e.charCodeAt(n + 1);
                    t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                    n += 2
                } else {
                    c2 = e.charCodeAt(n + 1);
                    c3 = e.charCodeAt(n + 2);
                    t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                    n += 3
                }
            }
            return t
        }}
    sThisVal = Base64.encode(oid);
    var nurl = base_url + "vendor/vendor_message/single/" + sThisVal;
    window.open(nurl, '_blank');
}

function changestatus(oid, vendor_order_hash) {
    url = base_url + 'vorder_e/acknowledge';
    if (fooXHR)
        fooXHR.abort();
    $('.loading').show();
    fooXHR = $.ajax({
        type: "POST",
        url: url,
        data: {orderid: oid, vendor_order_hash: vendor_order_hash}, // serializes the form's elements.
        success: function (result) {
            $('.loading').hide();
            if (result == 1) {
                location.reload();
            }
        }
    });
}
function out_of_delivery(oid, vendor_order_hash) {
    url = base_url + 'vorder_e/change_out_delivery';
    $('.loading').show();
    if (fooXHR) {
        fooXHR.abort();
    } else {
    }
    fooXHR = $.ajax({
        type: "POST",
        url: url,
        data: {orderid: oid, vendor_order_hash: vendor_order_hash}, // serializes the form's elements.
        success: function (result) {
            $('.loading').hide();
            if (result == 1) {
                location.reload();

            }
        }
    });
}

function vendor_complete(oid, vendor_order_hash) {
    $("#divhide h3").text('Order Id: ' + oid);
    $('form#completeorder').append('<input type="hidden" name="order_id" value="' + oid + '"/> '
            + '<input type="hidden" name="vendor_order_hash" value="' + vendor_order_hash + '"/> ');
    $("#divhide").fadeIn();
    $("#backdiv").fadeIn();
    
}

function divtesthide() {
    $("#divhide").fadeOut();
    $("#backdiv").fadeOut();
}
function getorderdetail(orderid) {
    var order_id = orderid;
    var url = base_url + 'home/get_order_detail/' + order_id;
    //if (fooXHR) fooXHR.abort();
    $('.loading').show();
    $.ajax({
        type: "POST",
        url: url,
        data: {order_id: order_id},
        success: function (result) {
            $('.loading').hide();
            $('tr#row_' + order_id).each(function () {
                var i = 1;
                $(this).find('td').each(function () {
                    if (i > 3)
                    {
                        $(this).closest("td").remove();
                    }
                    i++;
                });
            });
            $('tr#row_' + order_id).append(result);
            $('tr#row_' + order_id).removeClass('reminder_bg');
        }
    });
}
$(document).on('submit', '#completeorder', function (event) {

    var url = base_url + 'vorder_e/vendor_complete_status/';
    $('.loading').show();
    if (fooXHR)
        fooXHR.abort();
    fooXHR = $.ajax({

        type: "POST",
        url: url,
        data: $(this).serialize(), // serializes the form's elements.
        success: function (result)
        {
            $('#completeorder')[0].reset();
            $('.loading').hide();
            var data = $.parseJSON(result);
            if (data.page == '0') {
                divtesthide();
                getorderdetail(data.orderid);
            }
            if (data.page == '1') {
                divtesthide();
            }
            location.reload();
        }

    });
    event.preventDefault();
});

function closeticket(vid, order_id, vendor_order_hash) {
    var r = confirm("Are you sure want to close the ticket?");
    if (r == true) {
        var oid = vid;

        var url = base_url + 'vorder_e/close_ticket';
        $('.loading').show();
        if (fooXHR)
            fooXHR.abort();
        fooXHR = $.ajax({
            type: "POST",
            url: url,
            data: {closeticket: oid, order_id: order_id, vendor_order_hash: vendor_order_hash},
            success: function (result) {
                $('.loading').hide();
                var data = $.parseJSON(result);
                if (data.success == 1) {
                    $('tr#ticket_' + oid).each(function () {
                        var i = 1;
                        $(this).find('td').each(function () {
                            if (i > 7) {
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
        });
    }
}

$(".close").on("click", function (event) {
    event.preventDefault();
    $(this).parents("div").remove();
});
function vendorProductcost(e) {
    url = $(e).attr('data-href');
    $('ul.listMenu li').each(function () {
        var inactive = $(this).find('a').attr('data-href');
        if (inactive != url) {
            $(this).find('a').removeClass("selected");
        }
    });
    $(e).addClass('selected');
    $('.loading').show();
    if (fooXHR)
        fooXHR.abort();
    fooXHR = $.ajax({
        type: "POST",
        url: url,
        data: {billing: 'active'}, // serializes the form's elements.
        success: function (result) {
            $('.loading').hide();
            $('div.custom-search-bg').hide();
            $('.vendor_order_e').html(result);
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
									$('.vendor_order_e').html(result);
						   }
						});
}
function viewphotocake(photopath){
	$("#previewphotoimg").modal();
	$("#photoimg_view").html("<li><p><img src='" + photopath + "'  style='max-width:100%'></p></li>");
}
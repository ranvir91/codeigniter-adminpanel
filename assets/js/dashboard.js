$(function(){

    var merchant_id = $('#merchant_id').val();
    var search_to = $('#search_to').val();
    var search_from = $('#search_from').val();
    var customdate = $('#customdate').val();


// get total orders status
    $.ajax({
        type: "POST",
        url: base_url + 'dashboard/get-orders-status',
        dataType: "json",
        data: {search_to: search_to, search_from:search_from, merchant_id:merchant_id, customdate:customdate },
        beforeSend : function() {
            $('#ord_delivered, #ord_received, #ord_unass, #ord_assign, #ord_ack, #ord_unack, #ord_ofd, #ord_cancelled, #ord_completed, #ord_couriers, #ord_received_c, #ord_received_v, #ord_received_amt').
                    html('<img src="'+base_url+'assets/images/loading-1.gif" width="14" title="Processing..." />');
        },
        success: function (res) {
            if(res.status) {
              var $d = res.data;
              $('#ord_delivered').html($d.ttlOrders);
              $('#ord_received').html($d.totalRecivedOrders);
              $('#ord_unass').html($d.unassigned);
              $('#ord_assign').html($d.assigned);
              $('#ord_ack').html($d.ackOrders);
              $('#ord_unack').html($d.unackOrders);
              $('#ord_ofd').html($d.ofdOrders);
              $('#ord_cancelled').html($d.cancelledOrders);
              $('#ord_completed').html($d.completedOrders);
              $('#ord_couriers').html($d.courierOrders);
              $('#ord_received_c').html($d.rCourierordercnt);
              $('#ord_received_v').html($d.rVendorordercnt);
              $('#ord_received_amt').html($d.receivedamount);
            }
        }
    });

// get delivery types here
    $.ajax({
        type: "POST",
        url: base_url + 'dashboard/get-delivery-types',
        dataType: "json",
        data: {search_to: search_to, search_from:search_from, merchant_id:merchant_id, customdate:customdate },
        beforeSend : function() {
            $('#del_midnight, #del_fixed, #del_standard, #del_early_morning, #del_dynamic').
                    html('<img src="'+base_url+'assets/images/loading-1.gif" width="14" title="Processing..." />');
        },
        success: function (res) {
            if(res.status) {
              var $d = res.data;
              if($d.merchant==1) {
                $('#del_midnight').html($d.midnighttype);
                $('#del_fixed').html($d.fixedtype);
                $('#del_standard').html($d.standardtype);
                $('#del_early_morning').html($d.earlyMoringType);
                $('#del_dynamic').html($d.dynamicType);
              }
              else if($d.merchant==2) {
                if(Object.keys($d.deliveryTypeArray).length) {
                    var html = '';
                    $.each($d.deliveryTypeArray, function(index, value){
                      var htmlinner = ''; var title = ''; var temp = '';
                      $.each(value, function(i, val){
                        if (index == 3) {
                            title = $d.deliveryTypeName[index];
                        } else {
                            temp = i.split('_');
                            title = getTimeFormated(temp[0], 12) + '-' + getTimeFormated(temp[1], 12);
                        }
//                            title = $d.deliveryTypeName[index];
                        htmlinner += '<div class="panel panel-primary">\n\
                                <div class="panel-heading"><h3 class="panel-title">'+ title +'</h3></div>\n\
                                <div class="panel-body">\n\
                                <span>'+ val +'</span>\n\
                                </div></div>';
                      });
                      html += htmlinner;
                    });
                } else {
                  html = '<div class="panel panel-warning">\n\
                        <div class="panel-heading"><h3 class="panel-title">N/A</h3></div>\n\
                        <div class="panel-body">No result found.</div></div>';
                }
                $('#bk_types_delivery').html(html);
              }
            }
        }
    });


// get complaints here
    $.ajax({
        type: "POST",
        url: base_url + 'dashboard/get-orders-complaint',
        dataType: "json",
        data: {search_to: search_to, search_from:search_from, merchant_id:merchant_id, customdate:customdate },
        beforeSend : function() {
            $('#comp_open, #comp_proc, #comp_clos, #comp_totl').
                    html('<img src="'+base_url+'assets/images/loading-1.gif" width="14" title="Processing..." />');
        },
        success: function (res) {
            if(res.status) {
              var $d = res.data;
              $('#comp_open').html($d.openCompCount);
              $('#comp_proc').html($d.procesCompCount);
              $('#comp_clos').html($d.closeCompCount);
              $('#comp_totl').html($d.totalCompCount);
            }
        }
    });




if(merchant_id == 2) {
// get top five product in bakingo here
    $.ajax({
        type: "POST",
        url: base_url + 'dashboard/get-product-topfive',
        dataType: "json",
        data: {search_to: search_to, search_from:search_from, merchant_id:merchant_id, customdate:customdate },
        beforeSend : function() {
            $('#top_five_products').html('<tr><td colspan="3"><img src="'+base_url+'assets/images/loading-1.gif" width="20" title="Processing..." /> Loading...</td></tr>');
        },
        success: function (res) {
            if(res.status) {
              var $d = res.data;
              var products = '';
              if($d.topfiveProducts.length) {
                $.each($d.topfiveProducts , function(index, value){
                    products += '<tr class=""><td>'+(parseInt(index)+1)+'</td><td>'+ value.title +'</td><td>'+ value.cnt +'</td></tr>';
                });
              } else {
                  products += '<tr><td colspan="3">No result found.</td></tr>';
              }
              $('#top_five_products').html(products);
            }
        }
    });
}

// get top ten city and vendors here
    $.ajax({
        type: "POST",
        url: base_url + 'dashboard/get-top-ten-city-vendor',
        dataType: "json",
        data: {search_to: search_to, search_from:search_from, merchant_id:merchant_id, customdate:customdate },
        beforeSend : function() {
            $('#top_ten_city, #top_ten_vendors').
                    html('<tr><td colspan="3"><img src="'+base_url+'assets/images/loading-1.gif" width="20" title="Processing..." /> Loading...</td></tr>');
        },
        success: function (res) {
            if(res.status) {
              var $d = res.data;
              var citys , vendors = '';
              if($d.topTenCityOrders.length) {
                $.each($d.topTenCityOrders , function(index, value){
                    citys += '<tr class=""><td>'+(parseInt(index)+1)+'</td><td>'+ value.city +'</td><td>'+ value.cnt +'</td></tr>';
                });
              } else {
                  citys += '<tr><td colspan="3">No result found.</td></tr>';
              }
              if($d.topTenAssignedVendors.length) {
                $.each($d.topTenAssignedVendors , function(index, value){
                    vendors += '<tr class=""><td>'+(parseInt(index)+1)+'</td><td>'+ value.vendor +'</td><td>'+ value.cnt +'</td></tr>';
                });
              } else {
                  vendors += '<tr><td colspan="3">No result found.</td></tr>';
              }
              $('#top_ten_city').html(citys);
              $('#top_ten_vendors').html(vendors);
            }
        }
    });


// get revenue datails here
    $.ajax({
        type: "POST",
        url: base_url + 'dashboard/get-revenue-details',
        dataType: "json",
        data: {search_to: search_to, search_from:search_from, merchant_id:merchant_id, customdate:customdate },
        beforeSend : function() {
            $('#rev_amount, #rev_cost, #rev_percent, #ord_delivered_amt').
                    html('<img src="'+base_url+'assets/images/loading-1.gif" width="14" title="Processing..." />');
        },
        success: function (res) {
            if(res.status) {
              var $d = res.data;
              $('#rev_amount , #ord_delivered_amt').html('Rs. '+ $d.totalamount);
              $('#rev_cost').html('Rs. '+ $d.totalcost);
              $('#rev_percent').html('Rs. '+ $d.profit + ' | ( ' + $d.profitpercentage + '% )');
            }
        }
    });

    var window_width = $(document).width(); // get window width
    if((window_width < 444)) {
        $('.form-group').css({margin:'8px'});
        $('.form-group #customDate').css({width:'77px'});
        if(customdate == 'Custom Date') {
          $('#cust .dropAro').css({top:'25px', right:'8px', width : '22px'});
        }
    }

});

// load data on count links
function open_popup(type, vendor) {
    $modal = $('#blank_modal').modal('show').find('.modal-body').html('<div class="col-md-12 marginTop-5 text-center"><img src="'+base_url+'assets/images/loading-1.gif" alt="Loading..." title="Processing..." /></div><div class="clearfix"></div>');
    var search_to = $('#search_to').val();
    var search_from = $('#search_from').val();
    $.ajax({
        type: "POST",
        url: base_url + 'manager-dashboard/get-links',
//        dataType: "json",
        data: {search_to: search_to, search_from:search_from, vendor:vendor, type:type },
        beforeSend : function() { },
        success: function (res) {
          if(res) {
            $('#blank_modal').find('.modal-body').html(res);
          }
        }
    });
}

function getTimeFormated($input, $format=12){
  var $t;
  if($format == 12){
    if($input<12) {
      $t = $input + 'am';
    } else if($input==12) {
      $t = $input + 'pm';
    } else {
      $t = ($input-12) + 'pm';
    }
  } else {
    $t = $input + ':00';
  }
  return $t;
}
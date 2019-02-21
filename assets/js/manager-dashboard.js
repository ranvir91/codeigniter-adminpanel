$(function(){
    
    $( "#search_from , #search_to" ).datepicker({
        maxDate : 0 ,
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        onSelect: function( selectedDate ) {
            if(this.id == 'search_from'){
              var search_from_date = $("#search_from").datepicker("getDate");
              var end = new Date();
              var days = (end - search_from_date) / (1000 * 60 * 60 * 24); // miliseconds
              days = Math.round(days) - 1;
              days = (days<30) ? days : 30;
              var dateMin = search_from_date;
              var rMin = new Date(dateMin.getFullYear(), dateMin.getMonth(),dateMin.getDate() ); // Min Date
              var rMax = new Date(dateMin.getFullYear(), dateMin.getMonth(),dateMin.getDate() + days); // Max Date = Selected + days till today
              $('#search_to').datepicker("option","minDate",rMin).datepicker("option","maxDate",rMax);
            }
        }
    });

    var search_to = $('#search_to').val();
    var search_from = $('#search_from').val();

// get total orders fixtime
    $.ajax({
        type: "POST",
        url: base_url + 'manager-dashboard/get-total-orders-fixtime',
        dataType: "json",
        data: {search_to: search_to, search_from:search_from },
        beforeSend : function() {
            $('#tr_ftoc .headcoup').html('<img src="'+base_url+'assets/images/loading-1.gif" width="20" title="Processing..." />');
        },
        success: function (res) {
            if(res.status) {
                var type = ($.type(res.data));
                var hasValues = false;
                if(type==='object') {
                    hasValues = true;
                }
                if(hasValues) {
                    $('#tr_ftoc .headcoup').each(function(elem, i){ $(this).html(0); });
                    $.each(res.data, function(key, val){
                      if(val!=0){
                        $('#td_ftoc_'+key).html('<a class="open-modaaal" title="Show All" onclick="open_popup(\'ftoc\', '+key+');">'+val+'</a>');
                      } else {
                        $('#td_ftoc_'+key).html(val);
                      }
                    });
                } else {
                    $('#tr_ftoc .headcoup').each(function(elem, i){ $(this).html(0); });
                }
            } else {
              $('#tr_ftoc .headcoup').each(function(elem, i){ $(this).html(0); });
            }
        }
    });
    
// get total orders
    $.ajax({
        type: "POST",
        url: base_url + 'manager-dashboard/get-total-orders',
        dataType: "json",
        data: {search_to: search_to, search_from:search_from },
        beforeSend : function() {
            $('#tr_toc .headcoup').html('<img src="'+base_url+'assets/images/loading-1.gif" width="20" title="Processing..." />');
            $('#tr_imgunot .headcoup').html('<img src="'+base_url+'assets/images/loading-1.gif" width="20" title="Processing..." />');
        },
        success: function (res) {
            if(res.status) {
                var type = ($.type(res.data));
                var hasValues = false;
                if(type==='object') {
                    hasValues = true;
                }
                if(hasValues) {
                    $('#tr_toc .headcoup').each(function(elem, i){ $(this).html(0); });
                    $.each(res.data.to, function(key, val){
                      $('#td_toc_'+key).html(val);
                    });
                } else {
                    $('#tr_toc .headcoup').each(function(elem, i){ $(this).html(0); });
                }
                $.each(res.data.imgNotUp, function(key, val){
                    if(val!=0){
                      $('#td_imgunot_'+key).html('<a class="open-modaaal" title="Show All" onclick="open_popup(\'imgunot\', '+key+');">'+val+'</a>');
                    } else {
                      $('#td_imgunot_'+key).html(val);
                    }
                });
            } else {
              $('#tr_toc .headcoup').each(function(elem, i){ $(this).html(0); });
              $('#tr_imgunot .headcoup').each(function(elem, i){ $(this).html(0); });
            }
        }
    });
    
// get total orders over 2000
    $.ajax({
        type: "POST",
        url: base_url + 'manager-dashboard/get-total-orders-greater-2k',
        dataType: "json",
        data: {search_to: search_to, search_from:search_from },
        beforeSend : function() {
            $('#tr_ov .headcoup').html('<img src="'+base_url+'assets/images/loading-1.gif" width="20" alt="Loading..." title="Processing..." />');
        },
        success: function (res) {
            if(res.status) {
                var type = ($.type(res.data));
                var hasValues = false;
                if(type==='object') {
                    hasValues = true;
                }
                if(hasValues) {
                    $('#tr_ov .headcoup').each(function(elem, i){ $(this).html(0); });
                    $.each(res.data, function(key, val){
                      if(val!=0){
                        $('#td_ov_'+key).html('<a class="open-modaaal" title="Show All" onclick="open_popup(\'ov\', '+key+');">'+val+'</a>');
                      } else {
                        $('#td_ov_'+key).html(val);
                      }
                    });
                } else {
                    $('#tr_ov .headcoup').each(function(elem, i){ $(this).html(0); });
                }
            } else {
              $('#tr_ov .headcoup').each(function(elem, i){ $(this).html(0); });
            }
        }
    });
    
// get total orders of SLA
    $.ajax({
        type: "POST",
        url: base_url + 'manager-dashboard/get-total-orders-sla',
        dataType: "json",
        data: {search_to: search_to, search_from:search_from },
        beforeSend : function() {
            $('#tr_dsla .headcoup').html('<img src="'+base_url+'assets/images/loading-1.gif" width="20" alt="Loading..." title="Processing..." />');
            $('#tr_dosla .headcoup').html('<img src="'+base_url+'assets/images/loading-1.gif" width="20" alt="Loading..." title="Processing..." />');
        },
        success: function (res) {
            if(res.status) {
                var type = ($.type(res.data.sla));
                var hasValues = false;
                if(type==='object') {
                    hasValues = true;
                }
                // print values for within SLA
                if(hasValues) {
                    $('#tr_dsla .headcoup').each(function(elem, i){ $(this).html(0); });
                    $.each(res.data.sla, function(key, val){
                      $('#td_dsla_'+key).html(val);
                    });
                } else {
                    $('#tr_dsla .headcoup').each(function(elem, i){ $(this).html(0); });
                }
                var type = ($.type(res.data.slaOut));
                var hasValues = false;
                if(type==='object') {
                    hasValues = true;
                }
                // print values for out of SLA
                if(hasValues) {
                    $('#tr_dosla .headcoup').each(function(elem, i){ $(this).html(0); });
                    $.each(res.data.slaOut, function(key, val){
                      if(val!=0){
                        $('#td_dosla_'+key).html('<a class="open-modaaal" title="Show All" onclick="open_popup(\'dosla\', '+key+');">'+val+'</a>');
                      } else {
                        $('#td_dosla_'+key).html(val);
                      }
                    });
                } else {
                    $('#tr_dosla .headcoup').each(function(elem, i){ $(this).html(0); });
                }
            } else {
              $('#tr_dsla .headcoup').each(function(elem, i){ $(this).html(0); });
              $('#tr_dosla .headcoup').each(function(elem, i){ $(this).html(0); });
            }
        }
    });    
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


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

    $("#vendorName").autocomplete({
        source: availableTags,
        select: function (event, ui) {
            $('#amount_' + $(this).attr('vendor_order')).removeAttr("readonly");
            $('#instruction_' + $(this).attr('vendor_order')).removeAttr("readonly");
        },
        change: function (event, ui) {
            if (!ui.item) {
                $(this).val("");
            }

        }
    });

});


function checkValidation(form){
    
    $date = $('#customDate').val();
    $vendor = $('#vendorName').val();
    if(!$date){
      show_snackbar('Please select date');
      return false;
    }
    else if(!$vendor){
      show_snackbar('Please select any vendor');
      $("#vendorName").focus();
      return false;
    }
}
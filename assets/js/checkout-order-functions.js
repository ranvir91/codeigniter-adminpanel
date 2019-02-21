$(document).ready(function(e) {
  $('#click_to_call').click(function(){
    var agent = $('#call_agent').val();
    var phonenum = $('#call_phonenum').val();
    if(!agent) {
      $('#nguccCallableMessage').show();
    } else {
      $('#nguccCallableMessage').hide();
    }
    if(agent && phonenum) {
        var url = NGUCC_BASE_URL + 'CrmDial?exeAgentName='+agent+'&phoneNumber='+phonenum;
        var nguccWindow = window.open(url, '_blank');
        nguccWindow.close();
      $('#savecalllogbtn').val('End Call');
    } else {
      $('#savecalllogbtn').val('Save');
    }
    $('#callmodel').modal('show');
    var d = new Date();
    var year,month,day,hour,min,filldate = '';
    year = d.getFullYear();
    month = (d.getMonth()<10) ? '0'+(d.getMonth()+1) : (d.getMonth()+1);
    day = (d.getDate()<10) ? '0'+d.getDate() : d.getDate()();
    hour = d.getHours();
    min = d.getMinutes();
    filldate = year +'-'+ month +'-'+ day +' '+ hour +':'+min;
    $('#calltime').val(filldate);
  });
});

function click_to_call_dispose() {
    var agent = $('#call_agent').val();
    var disposition = $('#idCallDisp').val();
    var calltime = $('#calltime').val();
    var followup = $('#followup').val();
    var disposition1 = '';
    var callbackDate = '';
    callbackDate = (followup!=='') ? followup : calltime;

    if(disposition=='call_back') {
      disposition1 = 'CALLBACK:CALLBACK';
      callbackDate += (callbackDate) ? ':00' : '';
    } else {
      disposition1 = 'DEFAULT:TEST';
      callbackDate = '';
    }
    var url = NGUCC_BASE_URL + 'CrmHangup?exeAgentName='+agent+'&disposition='+disposition1+'&callbackDate='+callbackDate;
    var nguccWindow = window.open(url, '_blank');
    nguccWindow.close();
}

var map;
var infowindow = new google.maps.InfoWindow();
var directions = new google.maps.DirectionsService();
var renderer = new google.maps.DirectionsRenderer({
//  suppressPolylines: true,
  infoWindow: infowindow,
  polylineOptions: {
    strokeColor: '#42c721',
    strokeWeight: 2,
  }
});

function generate_mapview() {

    var vdb_id = $('#delivery_boy').val();
    var date = $('#date_id').val();

    if(date && vdb_id) {
      $('#ErrorMSG').html('');
      $.ajax({
        type: "POST",
        data : {date:date, vdb_id:vdb_id} ,
        url: base_url + "vendor/track-deliveryboy-data",
        success:function(response1){
            var response = $.parseJSON(response1);
            var orderpointsTotal = response.orderpoints;
            if((response.status=='success') && (parseInt(orderpointsTotal) < 2)){
                $('#ErrorMSG').html('No enough data to show result');
                $('#map_canvas').html('');
                $('#directions_panel').hide();
            }
            else if((response.status=='success') && (response.result==false)){
                $('#map_canvas').html(response.data.message);
                $('#directions_panel').hide();
            }
            else if((response.status=='success') && (response.result==true)) {
                if(parseInt(allowed_waypoints_total) < parseInt(orderpointsTotal)) {
                    $('#ErrorMSG').html('Total Orders '+ orderpointsTotal +', and Map is showing '+ allowed_waypoints_total + ' only');
                }
                $('#directions_panel').show();
                initialize_gmap({},response.data.waypoints);
            }
        }
      });
      return false;
    }
    else {
        $('#ErrorMSG').html('Please select date and delivery boy to Track.');
        $('#map_canvas').html('');
        $('#directions_panel').hide();
        return false;
    }
}
function storelatlong(){
        var vdb_id      = $('#delivery_boy').val();
        var date        = $('#date_id').val();
        $.ajax({
        type: "POST",
        data : {vdb_id:vdb_id} ,
        url: base_url + "vendor/storelatlong",
        success:function(result){
              if(result == 1){
                  initMap(vdb_id,date);
              }
              else {
                  $('#map').html('No Data found');
                  alert('Something is wrong ! please try again.')
              }
   }
});
}


  function initMap() {
    var vdb_id = $('#delivery_boy').val();
   
  
  $.ajax({
        type: "POST",
        data : { vdb_id:vdb_id} ,
        url: base_url + "vendor/get_deliveryboy_data",
        success:function(response1){
          console.log(response1);
           var response = $.parseJSON(response1);
   if(response.status =='success' && response.data.latlong !='' && response.data.latlong !=null){
  var myLatLng = {lat: parseFloat(response.data.latlong.lat), lng: parseFloat(response.data.latlong.long)};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Delivery Boy Location',
    icon: base_url + 'assets/images/inst.png'
  });

 }else{
     $('#map').html('No Data found');
  $('#map').val('error');
 }  }
});
}



function initialize_gmap(conf, waypoints) {
    var $stopover = true;
    var waypts = [];
    var lastPoint = (waypoints.length-1);
    var orderComplete = [];
    var timearray = [];
    var hasSinglePoint = (waypoints.length==1) ? true : false;

    if(hasSinglePoint) {
        var i = 0;
        conf.origin = new google.maps.LatLng(waypoints[i].location.lat, waypoints[i].location.long);
        conf.destination = new google.maps.LatLng(waypoints[i].location.lat, waypoints[i].location.long);
        if(waypoints[i].location.t=='O') {
            orderComplete.push({oid: waypoints[i].oid});
        }
        timearray.push(waypoints[i].location.tm);
    } else {
        for (var i = 0; i < waypoints.length; i++) {
          if (waypoints[i].location) {
              if(i==0) {
                  conf.origin = new google.maps.LatLng(waypoints[i].location.lat, waypoints[i].location.long);
              } else if(i==lastPoint ) {
                  conf.destination = new google.maps.LatLng(waypoints[i].location.lat, waypoints[i].location.long);
              } else {
                waypts.push({
                  location: new google.maps.LatLng(waypoints[i].location.lat, waypoints[i].location.long) ,
                  stopover: (waypoints[i].location.t=='O') ? $stopover : false
                });
              }
              if(waypoints[i].location.t=='O') {
                  orderComplete.push({oid: waypoints[i].oid});
              }
              timearray.push(waypoints[i].location.tm);
          }
        }
    }
    
  var mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(lat, lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
  renderer.setMap(map);
  calcRoute(conf, waypts, orderComplete, timearray);
}

function calcRoute(conf, waypts, orderComplete, timearray) {
  var request = {
    origin: conf.origin,
    destination: conf.destination,
    waypoints : waypts,
    optimizeWaypoints: true,
//    travelMode: google.maps.TravelMode.DRIVING // google.maps.DirectionsTravelMode.WALKING
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };

  var panel = document.getElementById('directions_panel');
  panel.innerHTML = '';
  directions.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      renderer.setDirections(response);
      renderer.setMap(map);
      renderDirectionsPolylines(response, orderComplete, timearray);
    } else {
      renderer.setMap(null);
      renderer.setPanel(null);
    }
  });
}

var polylineOptions = {
  strokeColor: '#42c721',
  strokeOpacity: 1,
  strokeWeight: 2
};
var polylines = [];
function renderDirectionsPolylines(response, orderComplete, timearray) {
  for (var i=0; i<polylines.length; i++) {
    polylines[i].setMap(null);
  }
  var legs = response.routes[0].legs;
        var summaryPanel = document.getElementById("directions_panel");
        summaryPanel.innerHTML = "";
        var panelcontent = "";
        var routeSegment = 0;
  for (var i = 0; i < legs.length; i++) {
      var stepPolyline = new google.maps.Polyline(polylineOptions);
        stepPolyline.getPath().push(legs[i].start_location);
      if(i==0){
        panelcontent += '<div class="leg-div">';
        panelcontent += "<h5><b>Point " + getChar(i);
        panelcontent += " :</b> "+ timearray[i] +"</h5>";
        panelcontent += '<p class="addr" style="display:none;">'+ legs[i].start_address ;
        panelcontent += "</p>";
        panelcontent += '<p class="dist"><b>Order id: '+ ((($.inArray(orderComplete[i] , orderComplete) != -1) && (orderComplete[i].oid != '')) ? orderComplete[i].oid : '-') +"</b></p>";
        panelcontent += '</div>';
      }
        panelcontent += '<div class="leg-div">';
        panelcontent += "<h5><b>Point " + getChar(i+1);
        panelcontent += " :</b> "+ timearray[i] +"</h5>";
        panelcontent += '<p class="addr" >'+ legs[i].end_address ;
        panelcontent += "</p>";
        panelcontent += '<p class="dist"><b>Order id: '+ ((($.inArray(orderComplete[i] , orderComplete) != -1) && (orderComplete[i].oid != '')) ? orderComplete[i].oid : '-') +"</b></p>";
        panelcontent += '</div>';
          
      stepPolyline.setMap(map);
      polylines.push(stepPolyline);
      google.maps.event.addListener(stepPolyline,'click', function(evt) {
         infowindow.setContent(""+evt.latLng.toUrlValue(6));
         infowindow.setPosition(evt.latLng);
         infowindow.open(map);
      });
    routeSegment++;
  }
  summaryPanel.innerHTML =  panelcontent;
}
function getChar(num) {
  var char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return char[num];
}
$(document).on('click', '.leg-div', function(e){
    e.preventDefault();
    var addr = $(this).find('.addr');
    $(addr).toggle();
});

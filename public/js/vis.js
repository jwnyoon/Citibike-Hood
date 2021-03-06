
L.mapbox.accessToken = 'pk.eyJ1Ijoiaml3b255b29uIiwiYSI6IklscjNONVkifQ.UR5XyoM6aKmj2DqVh4xWRw';
var map = L.mapbox.map('map')
    .setView([40.739, -73.986], 13);


var baseLayer = L.mapbox.tileLayer('mapbox.dark');
baseLayer.setOpacity(1);
baseLayer.addTo(map);





// var color = [];
// function rndColor(){
//   color.push('#'+Math.floor(Math.random()*(1<<24)).toString(16));
// }

var hoodLayer = L.mapbox.featureLayer();

// var DockLayer = L.mapbox.featureLayer();
var DockLayer = L.layerGroup();


// var URL ='http://cors.io/?u=https://citibikenyc.com/stations/json/';





function callHood(){

var color = [];
function rndColor(){
  // color.push('#'+Math.floor(Math.random()*(1<<24)).toString(16));
  color.push('#'+('00000'+(Math.random()*16777216<<0).toString(16)).substr(-6));
}


omnivore.csv('data.csv')
  .on('ready',function(layer){
    // rndColor();
    map.removeLayer(DockLayer);

    for(var i=0; i<26; i++){
    this.eachLayer(function(marker){
          rndColor();

  
      if(marker.toGeoJSON().properties.group==i){
        marker.setIcon(L.mapbox.marker.icon({
          'marker-color': color[i],
          'marker-size': 'small',
        }));
      }

    
         marker.bindPopup(marker.toGeoJSON().properties.name);
    });
  }

  })
  .addTo(hoodLayer);
hoodLayer.addTo(map);


}



hoodLayer.on('click', function(e) {
  console.log(e.layer.feature.properties.group);

    // e.layer.feature.properties['old-color'] = e.layer.feature.properties['marker-color'];
    // e.layer.feature.properties['marker-color'] = '#ff8888';
    // myLayer.setGeoJSON(geoJson);
    console.log("yes");
    // e.layer.feature.properties['old-color'] = e.layer.feature.properties['marker-color'];
    // e.layer.feature.properties['marker-color'] = '#ff8888';
    $('.Group').html('Group '+e.layer.feature.properties.group);
    $('.GroupDes').html(e.layer.feature.properties.groupdes);

    // For each filter link, get the 'data-filter' attribute value.
//     var filter = e.layer.feature.properties.group;
//     hoodLayer.setFilter(function(f) {
//         // If the data-filter attribute is set to "all", return
//         // all (true). Otherwise, filter on markers that have
//         // a value set to true based on the filter name.
//         return (filter === 'all') ? true : f.properties.filter === true;
//     });
//     return false;
// });

















    });




function callrealtime(){


  // var URL ='http://www.citibikenyc.com/stations/json/';
  // var URL ='//www.citibikenyc.com/stations/json/';
  var URL ='http://cors.io/?u=http://citibikenyc.com/stations/json/';


d3.json(URL, function(err, data) {
      console.log(data.executionTime);
        $('.des2').html(data.executionTime);
      map.removeLayer(hoodLayer);  
    addCircle(data);

// d3.jsonp(URL, function(data) {
//       console.log(data.executionTime);
//         $('.des2').html(data.executionTime);
//       map.removeLayer(hoodLayer);  
//     addCircle(data);


 
// $.ajax({
//     url: URL,
//     type: 'GET',
//     crossDomain: true,
//     dataType: 'jsonp',
//      jsonpCallback: "jsonpcallback",
//     success: function(data) {
//         console.log(data.executionTime);
//         $('.des2').html(data.executionTime);
//         map.removeLayer(hoodLayer);  
//        addCircle(data); 
//     }    

});




 function addCircle(result){
  for (var i = 0; i < result.stationBeanList.length; i++) {
      var station = result.stationBeanList[i];
      var latlng = L.latLng(station.latitude, station.longitude);
      var bike = station.totalDocks - station.availableBikes; 
  
    if (bike == 0){
      radius = 1;
    }
    else{
      radius = bike/5;


    }
    
      var marker = L.circleMarker(latlng, {
        radius: radius,
        fillColor: station.totalDocks > 0 ? '#f55' : '#a00',
        fillOpacity: 0.7,
        weight: 0.5,
        color: '#fff'
      }).bindPopup(station.stationName + '</br>'+ 'Number of Bikes: '+
        bike)
        .addTo(DockLayer);
        DockLayer.addTo(map);
}
}
}


function pointColor(feature) {
  for (var i = 0; i < feature.stationBeanList.length; i++) {
      var station = feature.stationBeanList[i];
      var latlng = L.latLng(station.latitude, station.longitude);
      var bike = station.totalDocks - station.availableBikes; 
      return bike > 5 ? '#f55' : '#a00';
  }

}

function pointRadius(feature) {
  for (var i = 0; i < feature.stationBeanList.length; i++) {
      var station = feature.stationBeanList[i];
      var latlng = L.latLng(station.latitude, station.longitude);
      var bike = station.totalDocks - station.availableBikes; 
      return (bike - 4) * 10;
  }
   
}

function scaledPoint(feature, latlng) {
    return L.circleMarker(latlng, {
        radius: pointRadius(feature),
        fillColor: pointColor(feature),
        fillOpacity: 0.7,
        weight: 0.5,
        color: '#fff'
    }).bindPopup(
        '<h2>' + feature.properties.place + '</h2>' +
        '<h3>' + new Date(feature.properties.time) + '</h3>' +
        feature.properties.mag + ' magnitude');
}






// function addCircle2(result){
//     rndColor();

//   for(var i=0; i<26; i++){

//   if(result.group==i){

//       var marker = L.circleMarker(latlng, {

//       radius: 5,
//       fillColor: color[i],
//       fillOpacity:0.7,
//       weight:0.5,
//       color: '#fff'
//     }).bindPopup(name + '</br>' + edge)
//       .addTo(hoodLayer);

//   }
  

//   }
// }





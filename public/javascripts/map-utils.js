// Array bidimensional Orden Rojo,Amarillo,Verde,Negro,Azul

var url = 'https://3000-dot-8903396-dot-devshell.appspot.com';
var webmap = null;
var objresponse = null;
var markers = [];
var limits = null;
var icons = {
    "Rojo": url + '/images/mark-red.png',
    "Amarillo": url + '/images/mark-yellow.png',
    "Verde": url + '/images/mark-green.png',
    "Negro": url + '/images/mark-black.png',
    "Azul": url + '/images/mark-blue.png'
};



function httpGetSync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(JSON.parse(xmlHttp.responseText));
        }
    }
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);

}

function drawTags() {
    var checkred = document.getElementById("high-priority-input");
    var checkyellow = document.getElementById("medium-priority-input");
    var checkgreen = document.getElementById("low-priority-input");
    var urlcolor = url + "/tag/?colour=";
    deleteMarkers();
    if (checkred.checked == true) {
        httpGetSync(urlcolor + "Rojo", addMarkers);
    }
    if (checkyellow.checked == true) {
        httpGetSync(urlcolor + "Amarillo", addMarkers);
    }
    if (checkgreen.checked == true) {
        httpGetSync(urlcolor + "Verde", addMarkers);
    }
    setMapOnAll(webmap);
}

function drawBestRoute() {
    var checkred = document.getElementById("high-priority-input");
    var checkyellow = document.getElementById("medium-priority-inpu");
    var checkgreen = document.getElementById("low-priority-input");
    var arr_red = null;
    var arr_yellow = null;
    var arr_green = null;
    var urlcolor = url + "/tags/getBestRoute/";
    if (checkred.checked == true) {
        httpGetAsync(urlcolor + "1", addMarkers(arr_red));
    }
    if (checkyellow.checked == true) {
        httpGetAsync(urlcolor + "2", addMarkers(arr_yellow));
    }
    if (checkgreen.checked == true) {
        httpGetAsync(urlcolor + "3", addMarkers(arr_green));
    }
}

function drawOnMap(JSONobj) {
    console.log(JSON.stringify(JSONobj));
}

function addMarkers(JSONobj) {
    if (JSONobj != null && JSONobj !== undefined) {
        JSONobj.forEach(function(element) {
            var marker;
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(element.latitud, element.longitud),
                map: webmap,
                icon: new google.maps.MarkerImage(icons[element.color], new google.maps.Size(32, 32))
            });
            markers.push(marker);
        });
    }
}

function deleteMarkers() {
    markers.forEach(function(e) {
        e.setMap(null);
    });
    markers = [];

}

function initialMap() {
    // Se comprueba si el navegador soporta la geolocalizacion
    var latlng = new google.maps.LatLng(39.305, -76.617);
    var myOptions = {
        center: latlng,
        zoom: 12
    };
    webmap = new google.maps.Map(document.getElementById("google-map"), myOptions);
    limits = new google.maps.LatLngBounds();
}

function setMapOnAll(map) {

    markers.forEach((e) => limits.extend(e.position));
    map.fitBounds(limits);
}
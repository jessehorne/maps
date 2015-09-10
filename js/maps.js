(function() {

    // Called when user presses Find or the enter key
    function changePosition() {
        if (address.value != "") {
            var newAddress = address.value.split(' ').join('+');
            var apiURL = geocode.replace('ADDRESS', newAddress).replace(
                'TOKEN', config.key);
            var json = "";
            $.getJSON(apiURL, function(data) {
                var location = data.features[0].geometry
                    .coordinates
                    .reverse();
                if (location) {
                    map.setView(location, 11);
                } else {
                    address.value = "Couldn't find";
                }
            });
        } else {
            // Find anywhere
            var plusOrMinus = Math.random() < 0.5 ? 1 : -1;
            var lon = plusOrMinus * Math.floor(Math.random() * 180 + 1);
            var lat = plusOrMinus * Math.floor(Math.random() * 180 + 1);
            console.log(lon, lat);
            map.setView([lon, lat], 7);
        }
    }

    // unique config key; you must get this from mapbox
    L.mapbox.accessToken = config.key;

    $('#map').height($(window).height() - $('#map').position().top - 10);

    var directionsWidth = $('#directions').width();
    $('#map').width($('#map').width() - directionsWidth - 10);
    $('#address').width($('#map').width() - $('img').width() - 10);
    $('#github').css({
        top: $('#address').offset().top,
        left: $('#address').width() + 25
    });

    var map = L.mapbox.map('map', 'mapbox.streets')
        .setView([0.0, 0.0], 10);

    map.attributionControl.setPosition('bottomleft');

    map.on('click', function(e) {
        /*
               marker = L.marker(e.latlng).addTo(map);
               marker.on('click', function(e) {
                   map.removeLayer(marker);
               }); */
    });

    var address = document.getElementById('address');
    var button = document.getElementById('find');

    var geocode =
        'https://api.mapbox.com/v4/geocode/mapbox.places/ADDRESS.json?access_token=TOKEN';

    // Get location of user
    var user_location;
    $.getJSON('http://ipinfo.io/', function(data) {
        user_location = data.city + ", " + data.region;

        if (user_location) {
            address.value = user_location;
            changePosition();
        }
    });

    $('#address').keyup(function(event) {
        if (event.keyCode == 13) {
            changePosition();
        }
    });

    // directions
    var directions = L.mapbox.directions();
    $('#inputs').css({
        top: $('#map').offset().top + 10,
        left: $('#map').width() - $('#inputs').width() - 10
    });

    var directionsLayer = L.mapbox.directions.layer(directions)
        .addTo(map);

    var directionsInputControl = L.mapbox.directions.inputControl(
            'inputs', directions)
        .addTo(map);
    var directionsErrorsControl = L.mapbox.directions.errorsControl(
            'errors', directions)
        .addTo(map);
    var directionsRoutesControl = L.mapbox.directions.routesControl(
            'routes', directions)
        .addTo(map);
    var directionsInstructionsControl = L.mapbox.directions.instructionsControl(
        'instructions',
        directions).addTo(map);
})();

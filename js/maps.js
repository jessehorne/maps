(function() {

    // Called when user presses Find or the enter key
    function changePosition() {
        if (address.value != "") {
            var newAddress = address.value.split(' ').join('+');
            var apiURL = apiCall.replace('ADDRESS', newAddress).replace(
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
        }
    }

    // unique config key; you must get this from mapbox
    L.mapbox.accessToken = config.key;

    $('#map').height($(window).height() - $('#map').position().top - 10);

    var map = L.mapbox.map('map', 'mapbox.streets')
        .setView([0.0, 0.0], 10);;

    var address = document.getElementById('address');
    var button = document.getElementById('find');

    var apiCall =
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

    button.onclick = function() {
        changePosition();
    }

    $('#address').keyup(function(event) {
        if (event.keyCode == 13) {
            changePosition();
        }
    });
})();

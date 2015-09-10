(function() {

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
                    map.setView(location, 15);
                } else {
                    address.value = "Couldn't find";
                }
            });
        }
    }

    L.mapbox.accessToken = config.key;

    $('#map').height($(window).height() - $('#map').position().top - 10);

    var map = L.mapbox.map('map', 'mapbox.streets')
        .setView([33.923014, -84.406099], 9);

    var address = document.getElementById('address');
    var button = document.getElementById('find');

    var apiCall =
        'https://api.mapbox.com/v4/geocode/mapbox.places/ADDRESS.json?access_token=TOKEN';

    button.onclick = function() {
        changePosition();
    }

    $('#address').keyup(function(event) {
        if (event.keyCode == 13) {
            changePosition();
        }
    });
})();

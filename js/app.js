(function () {

    $('[data-toggle="tooltip"]').tooltip({
        container: 'body'
    });

    var mymap = L.map('map', {
        zoomControl: false
    }).setView([38.03962, -84.496257], 12);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibGptb3NlcjgzIiwiYSI6ImNqMG5sNmI1bjAwY3UzM3Q4cXNncGl6NDMifQ.jAX66dC8oy8Mh4IvgF5SPg'
    }).addTo(mymap);

    L.marker([38.03962, -84.496257]).addTo(mymap)
        .bindPopup('lex-foodscape is under construction.')
        .openPopup();
    new L.Control.Zoom({
        position: 'topright'
    }).addTo(mymap);

    var sidebar = L.control.sidebar('sidebar');
    sidebar.onAdd = function (mymap) {
        var sb = L.DomUtil.get('sidebar');
        L.DomEvent.disableScrollPropogation('sb');
        L.DomEvent.disableClickPropogation('sb');
        return sb;
    }
    sidebar.addTo(mymap);

    var x = document.getElementById("demo");

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        x.innerHTML = "Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude;
    }

    var loc = getLocation();
    geo = navigator.geolocation
    geo.getCurrentPosition(function (position) {
        console.log(position.coords.latitude, position.coords.longitude);
    });

    function drop(position) {
        L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap).bindPopup('This is your approximate current location.')
            .openPopup();
    }
    geo.getCurrentPosition(drop);
    $.when($.getJSON('data/Lex_Food/lf.json')).done(function (lf) {

        var food = L.markerClusterGroup();
        var cIcon = L.icon({
            iconUrl: 'images/c.png'
        });

        var fIcon = L.icon({
            iconUrl: 'images/f.png'
        });

        var gIcon = L.icon({
            iconUrl: 'images/g.png'
        });

        var lIcon = L.icon({
            iconUrl: 'images/l.png'
        });

        function color(feature) {
            var icon;
            if (feature.properties.RFEI_cat == "C") icon = cIcon;
            else if (feature.properties.RFEI_cat == "F") icon = fIcon;
            else if (feature.properties.RFEI_cat == "L") icon = lIcon;
            else icon = gIcon;

            return icon;
        }

        // loop through all our signals features
        lf.features.forEach(function (feature) {
            // create a new Leaflet marker for each
            var coords = feature.geometry.coordinates;
            cat = feature.properties.RFEI_cat;
            marker = L.marker([coords[1], coords[0]], {
                icon: color(feature)
            });
            // bind a tooltip to the marker
            marker.bindTooltip("Name: " + feature.properties.Name);
            // add the marker to the markerClusterGroup
            food.addLayer(marker);

        });
        // add the markerClusterGroup to the map
        mymap.addLayer(food);



    });



})()
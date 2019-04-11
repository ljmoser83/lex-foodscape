(function () {
    var mymap = L.map('map', {
        zoomControl: true
    }).setView([38.03962, -84.496257], 12);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {

        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibGptb3NlcjgzIiwiYSI6ImNqMG5sNmI1bjAwY3UzM3Q4cXNncGl6NDMifQ.jAX66dC8oy8Mh4IvgF5SPg'
    }).addTo(mymap);

    L.marker([38.03962, -84.496257]).addTo(mymap)
        .bindPopup('Lex-Foodscape is under construction.')
        .openPopup();

    var radioControl = L.control({
        position: 'bottomleft'
    });

    // when added to the map
    radioControl.onAdd = function (map) {

        // select the element with id of 'slider'
        var controls = L.DomUtil.get("radio-container");

        // disable the mouse events
        L.DomEvent.disableScrollPropagation(controls);
        L.DomEvent.disableClickPropagation(controls);

        // add slider to the control
        return controls;
    }

    // add the control to the map
    radioControl.addTo(mymap);

    var healthyControl = L.control({
        position: 'bottomright'
    });

    // when added to the map
    healthyControl.onAdd = function (map) {

        // select the element with id of 'slider'
        var controls = L.DomUtil.get("healthy");

        // disable the mouse events
        L.DomEvent.disableScrollPropagation(controls);
        L.DomEvent.disableClickPropagation(controls);

        // add slider to the control
        return controls;
    }

    // add the control to the map
    healthyControl.addTo(mymap);

    var geocodeControl = L.control({
        position: 'topright'
    });

    // when added to the map
    geocodeControl.onAdd = function (map) {

        // select the element with id of 'slider'
        var controls = L.DomUtil.get("geocode");

        // disable the mouse events
        L.DomEvent.disableScrollPropagation(controls);
        L.DomEvent.disableClickPropagation(controls);

        // add slider to the control
        return controls;
    }

    // add the control to the map
    geocodeControl.addTo(mymap);
    $.when($.getJSON('data/Lex_Food/lf.json')).done(function (lf) {


        var food = L.markerClusterGroup();

        // loop through all our signals features
        lf.features.forEach(function (feature) {
            // create a new Leaflet marker for each
            var coords = feature.geometry.coordinates,
                marker = L.marker([coords[1], coords[0]]);
            // bind a tooltip to the marker
            marker.bindTooltip("Name: " + feature.properties.Name);
            // add the marker to the markerClusterGroup
            food.addLayer(marker);

        });
        // add the markerClusterGroup to the map
        mymap.addLayer(food);
    });



})()
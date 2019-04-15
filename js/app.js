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
        .bindPopup('lex-foodscape is under construction.')
        .openPopup();

    var radioControl = L.control({
        position: 'bottomleft'
    });

    // when added to the map
    radioControl.onAdd = function (map) {

        // select the element with id of 'radio-container'
        var controls = L.DomUtil.get("radio-container");

        // disable the mouse events
        L.DomEvent.disableScrollPropagation(controls);
        L.DomEvent.disableClickPropagation(controls);

        // add radio-container to the control
        return controls;
    }

    // add the radioControl to the map
    radioControl.addTo(mymap);

    var healthyControl = L.control({
        position: 'bottomright'
    });

    // when added to the map
    healthyControl.onAdd = function (map) {

        // select the element with id of 'healthy'
        var controls = L.DomUtil.get("healthy");

        // disable the mouse events
        L.DomEvent.disableScrollPropagation(controls);
        L.DomEvent.disableClickPropagation(controls);

        // add healthy to the control
        return controls;
    }

    // add the healthyControl to the map
    healthyControl.addTo(mymap);

    var geocodeControl = L.control({
        position: 'topright'
    });

    // when added to the map
    geocodeControl.onAdd = function (map) {

        // select the element with id of 'geocode'
        var controls = L.DomUtil.get("geocode");

        // disable the mouse events
        L.DomEvent.disableScrollPropagation(controls);
        L.DomEvent.disableClickPropagation(controls);

        // add geocode to the control
        return controls;
    }

    // add the geocodeControl to the map
    geocodeControl.addTo(mymap);


    var legendControl = L.control({
        position: 'bottomright'
    });

    // when added to the map
    legendControl.onAdd = function (map) {

        // select the element with id of 'legend'
        var controls = L.DomUtil.get("legend");

        // disable the mouse events
        L.DomEvent.disableScrollPropagation(controls);
        L.DomEvent.disableClickPropagation(controls);

        // add legend to the control
        return controls;
    }

    // add the legendControl to the map
    legendControl.addTo(mymap);

    
        var ratioControl = L.control({
        position: 'topleft'
    });

    // when added to the map
    ratioControl.onAdd = function (map) {

        // select the element with id of 'ratio'
        var controls = L.DomUtil.get("ratio");

        // disable the mouse events
        L.DomEvent.disableScrollPropagation(controls);
        L.DomEvent.disableClickPropagation(controls);

        // add ratio to the control
        return controls;
    }

    // add the ratioControl to the map
    ratioControl.addTo(mymap);
    
    
    
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
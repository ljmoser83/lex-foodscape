$(function () {
    var mymap = L.map('map').setView([38.03962, -84.496257], 12);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
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

    $.when($.getJSON('data/C/C.json'),
        $.getJSON('data/F/F.json'),
        $.getJSON('data/G/G.json'),
        $.getJSON('data/L/L.json')
    ).done(function (C, F, G, L) {
        console.log(C);
        console.log(F);
        console.log(G);
        console.log(L);





    })
})

(function () {

    $('[data-toggle="tooltip"]').tooltip({
        container: 'body'
    });

    // Creates a leaflet map within the #map div and assigns to variable mymap
    var mymap = L.map('map', {
        zoomControl: false,
        attributionControl: false,
        minZoom: 10
    }).setView([38.03962, -84.496257], 12);

    // Adds a tilelayer to the map using mapbox API key for tile access
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibGptb3NlcjgzIiwiYSI6ImNqMG5sNmI1bjAwY3UzM3Q4cXNncGl6NDMifQ.jAX66dC8oy8Mh4IvgF5SPg'
    }).addTo(mymap);

    // Adds a leaflet zoom control in the topright corner of the #map div
    new L.Control.Zoom({
        position: 'topright'
    }).addTo(mymap);

    // Adds the legend to the map
    var legend = L.control({
        position: 'bottomright'
    });

    legend.onAdd = function (map) {

        var div = L.DomUtil.get("leg");

        L.DomEvent.disableScrollPropagation(div);
        L.DomEvent.disableClickPropagation(div);

        return div;

    }

    legend.addTo(mymap);
    // Adds a leaflet sidebar control along left side of #map div to add buttons for various content and functionality 
    var sidebar = L.control.sidebar('sidebar');
    sidebar.onAdd = function (mymap) {
        var sb = L.DomUtil.get('sidebar');
        L.DomEvent.disableScrollPropogation('sb');
        L.DomEvent.disableClickPropogation('sb');
        return sb;
    }
    sidebar.addTo(mymap);
    // Declares a shortcut variable to update the inner html of the #fcr div
    var x = document.getElementById("fcr");
    // Declares a shortcut variable for the navigator.geolocation method that will be reused several times
    var geo = navigator.geolocation;
    // Declares several global variables for use throughout code
    var location = {};
    var ll = [];
    var distance = null;
    var circle = {};
    var highlight = {};

    // Adds a click event listener to mymap that will add a marker to the map and assign the coordinates of the click event to the global variable ll
    mymap.on('dblclick', function (e) {
        x.innerHTML = '---'
        lat = e.latlng.lat;
        lon = e.latlng.lng;
        ll = [
                    lat,
                    lon
                ];
        if (location != undefined) {
            mymap.removeLayer(location);
        };
        if (ll != undefined) {
            mymap.removeLayer(circle);
        };
        mymap.removeLayer(highlight);
        mymap.setView([lat, lon], 15);
        //Add a marker to show where you clicked.
        location = L.marker([lat, lon]).addTo(mymap).bindPopup('This is your clicked location of interest.')
            .openPopup();
        mymap.flyTo(ll, 16);
    });

    // Declares a function that will utilize the location services of the user's device and pass their location information to the function to add a marker to the map and assign coordinates to the global variable ll
    function drop(position) {
        mymap.setView([position.coords.latitude, position.coords.longitude], 15);
        x.innerHTML = '---'
        if (location != undefined) {
            mymap.removeLayer(location);
        };
        if (ll != undefined) {
            mymap.removeLayer(circle);
        };
        mymap.removeLayer(highlight);
        ll = [position.coords.latitude, position.coords.longitude];
        location = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap).bindPopup('This is your approximate current location.')
            .openPopup();
        mymap.flyTo(ll, 16);
    }

    // Declares a function that will invoke the location services and pass that data to the drop function
    function mark() {
        geo.getCurrentPosition(drop);
    }

    // declares a global reference to the JQuery method that will obtain the user entered text value in #text div
    var text = $("#text").val();

    // Binds an event listener to the # locate div that geolocates the user with location services and adds a mark to the #map div and stores coordinates as ll
    $("#locate").on("click", mark);

    // Instantiate a Here platform object:
    var platform = new H.service.Platform({
        'app_id': 'S9VBfXc4kP9esjYB6kHN',
        'app_code': '9s3PVp7_J1xBkXxEzuX7vQ'
    });

    // Get an instance of the geocoding service:
    var geocoder = platform.getGeocodingService();

    //define the onResult function that will make a marker with geocoded address and store the coordinates to ll
    var onResult = function (result) {
            x.innerHTML = '---'
            if (location != undefined) {
                mymap.removeLayer(location);
            };
            if (ll != undefined) {
                mymap.removeLayer(circle);
            };
            mymap.removeLayer(highlight);
            if (text == '') {
                alert("Enter an address to be geocoded.");
            } else {
                ll = [result.Response.View[0].Result[0].Location.DisplayPosition.Latitude, result.Response.View[0].Result[0].Location.DisplayPosition.Longitude];
                location = L.marker(ll).addTo(mymap).bindPopup('This is your geocoded location!')
                    .openPopup();
                mymap.flyTo(ll, 16);
            }
        },
        onError = function (error) {
            console.log(error);
        };

    // Function that will obtain the value of the #text div entered by the user and will use it as the searchtext for the Here geocoding API
    function button() {
        text = $("#text").val()
        geocoder.geocode({
            searchText: text
        }, onResult, onError);
    }

    // Binds event listener to the #button div
    $("#button").on("click", button);



    // AJAX request to retrieve the lf.json file containing hte LExington, KY food locations
    $.when($.getJSON('data/Lex_Food/lf.json')).done(function (lf) {

        // Creates a cluster group to store layers in that will be used the the markercluster functionality
        var food = L.markerClusterGroup({
            disableClusteringAtZoom: 14,
            chunkedLoading: true,
            polygonOptions: {
                stroke: false,
                color: 'red'
            }
        });


        // Function definition to assign the icon color based on the food location classification
        function color(feature) {
            var icon;
            if (feature.properties.RFEI_cat == "C") icon = '#7570b3';
            else if (feature.properties.RFEI_cat == "F") icon = '#d95f02';
            else if (feature.properties.RFEI_cat == "L") icon = '#e7298a';
            else icon = '#1b9e77';
            return icon;
        }

        // Defines a function that will be used to filter the food locations to only fresh food locations
        function gFilter(feature) {
            if (feature.properties.RFEI_cat == "G") return true
        }

        // Establishes an object that contains only fresh food locations. This will be used in conjunction with the healthy food location button
        var ff = L.geoJSON(lf, {
            filter: gFilter
        });

        // loop through all our features
        lf.features.forEach(function (feature) {
            // create a new Leaflet marker for each
            var coords = feature.geometry.coordinates;
            cat = feature.properties.RFEI_cat;
            marker = L.circleMarker([coords[1], coords[0]], {
                radius: 4,
                color: 'black',
                weight: 1,
                fillColor: color(feature),
                fillOpacity: 1
            });
            // bind a tooltip to the marker
            marker.bindTooltip("Name: " + feature.properties.Name);
            // add the marker to the markerClusterGroup
            food.addLayer(marker);
        });


        // add the markerClusterGroup to the map
        mymap.addLayer(food);
        var fb = food.getBounds();
        mymap.setMaxBounds(fb);
        var allFood = L.geoJSON(lf);

        // Defined a function to utilize the leaflet-knn library method for locating the nearest point in a layer based on a set of parameters
        function fresh(nearestGroc) {
            if (ll == '') {
                alert("Set a location of interest.");
            } else {
                var nearest = leafletKnn(ff).nearest(L.latLng(ll), 1);
                var nearestGroc = [nearest[0].lat, nearest[0].lon];
                mymap.flyTo(nearestGroc, 18);
                food.unspiderfy;
                highlight = L.circle(nearestGroc, {
                    color: 'yellow',
                    radius: 6,
                    fillOpacity: 0
                }).addTo(mymap).bringToBack();
            }
        }

        // Binds an event listener to the #healthy div button that locates the nearest fresh food location to the user defined location
        $("#healthy").on("click", fresh);

        // established two variables to be used within the logic of hte unhealthy/healthy food ratio calculation
        var num = 0;
        var den = 0;

        // Binds a function to the dist radio input that will add a circle of desired radius to the map and calculate the unhealthy/healthy food choice ratio
        $("input[name='dist']").click(function () {
            distance = parseInt(this.value);
            if (ll == '') {
                alert("Set a location of interest.");
            }
            if (ll != undefined) {
                mymap.removeLayer(circle);
                circle = L.circle(ll, {
                    radius: (distance)
                }).addTo(mymap).bringToBack();
                var within = leafletKnn(allFood).nearest(L.latLng(ll), 500, distance);
                var cb = circle.getBounds();
                mymap.flyToBounds(circle);
                food.unspiderfy;

                // Additional logic to reset num and den each time the function is called and defines the logic for the calculation of the ratio. Also proceeds through the logicc depending on set criteria and provides messages to the user based on defined criteria //
                num = 0;
                den = 0;
                if (within != '') {
                    for (var i = 0; i < within.length; i++) {
                        if (within[i].layer.feature.properties.RFEI_cat == "C") num += 1;
                        else if (within[i].layer.feature.properties.RFEI_cat == "F") num += 1;
                        else if (within[i].layer.feature.properties.RFEI_cat == "L") num += 1;
                        else den += 1;
                    }
                    if (den == 0) x.innerHTML = num + " unhealthy/less healthy options and no healthy food locations in this area of interest!";
                    else x.innerHTML = (num / den).toFixed(2) + ":1";
                } else if (within == '') x.innerHTML = "No food locations in this area of interest!";
            }
        });
        // Function that will reset the map without a full site reload
        function reset() {
            x.innerHTML = '---';
            ll = '';
            if (location != undefined) {
                mymap.removeLayer(location);
            };
            if (ll != undefined) {
                mymap.removeLayer(circle);
            };
            mymap.removeLayer(highlight);
            mymap.setView([38.03962, -84.496257], 12);

        }
        //Binds an event listener no the #reset button
        $("#reset").on("click", reset);
    });
})()
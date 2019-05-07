(function () {
    // JQuery call to display tooltips within the body container
    $('[data-toggle="tooltip"]').tooltip({
        container: 'body'
    });
// Creates a leaflet map within the #map div and assigns to variable mymap
    var mymap = L.map('map', {
        zoomControl: false
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
// Adds a click event listener to mymap that will add a marker to the map and assign the coordinates of the click event to the global variable ll
    mymap.on('click', function (e) {
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
        mymap.setView([lat, lon], 15);
        //Add a marker to show where you clicked.
        location = L.marker([lat, lon]).addTo(mymap).bindPopup('This is your clicked location of interest.')
            .openPopup();
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
        ll = [position.coords.latitude, position.coords.longitude];
        location = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap).bindPopup('This is your approximate current location.')
            .openPopup();
    }
// Declares a function that will invoke the location services and pass that data to the drop function
    function mark() {
        geo.getCurrentPosition(drop);
    }
// declares a global referencce to the JQuery method that will obtain the user entered text value in #text div
    var text = $("#text").val();
 
    $("#locate").on("click", mark);
    // Instantiate a platform object:
    var platform = new H.service.Platform({
        'app_id': 'S9VBfXc4kP9esjYB6kHN',
        'app_code': '9s3PVp7_J1xBkXxEzuX7vQ'
    });

    // Create the parameters for the geocoding request:
    var geocodingParams = {
        searchText: '214 East Main Street, Lexington, KY'
    };

    // Get an instance of the geocoding service:
    var geocoder = platform.getGeocodingService();

    //define the onResult function that will do something with geocoded data
    var onResult = function (result) {
            x.innerHTML = '---'
            if (location != undefined) {
                mymap.removeLayer(location);
            };
            if (ll != undefined) {
                mymap.removeLayer(circle);
            };
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

    function button() {
        text = $("#text").val();
        geocoder.geocode({
            searchText: text
        }, onResult, onError);
    }

    $("#button").on("click", button);

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

        function gFilter(feature) {
            if (feature.properties.RFEI_cat == "G") return true
        }
        var ff = L.geoJSON(lf, {
            filter: gFilter
        });
        //        console.log(ff._layers);

        // loop through all our features
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
        var allFood = L.geoJSON(lf);

        function fresh(nearestGroc) {
            if (ll == '') {
                alert("Set a location of interest.");
            } else {

                var nearest = leafletKnn(ff).nearest(L.latLng(ll), 1);
                console.log(nearest);
                var nearestGroc = [nearest[0].lat, nearest[0].lon];

                mymap.flyTo(nearestGroc, 18);

            }
        }
        $("#healthy").on("click", fresh);

        var num = 0;
        var den = 0;
        $("input[name='dist']").click(function () {
            distance = parseInt(this.value);

            if (ll != undefined) {
                mymap.removeLayer(circle);
                circle = L.circle(ll, {
                    radius: (distance)
                }).addTo(mymap);
                var within = leafletKnn(allFood).nearest(L.latLng(ll), 500, distance);

                num = 0;
                den = 0;
                if (within != '') {

                    for (var i = 0; i < within.length; i++) {
                        if (within[i].layer.feature.properties.RFEI_cat == "C") num += 1;
                        else if (within[i].layer.feature.properties.RFEI_cat == "F") num += 1;
                        else if (within[i].layer.feature.properties.RFEI_cat == "L") num += 1;
                        else den += 1;
                    }

                    if (den == 0) x.innerHTML = "No fresh food locations in this area of interest!";
                    else x.innerHTML = (num / den).toFixed(2) + ":1";
                } else if (within == '') x.innerHTML = "No food locations in this area of interest!";
            }
        });

    });
})()
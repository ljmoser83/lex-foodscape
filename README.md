# lex-foodscape
# Lexington, KY Foodscape Mapping Project

## I. Introduction
The goal of the *Lexington, KY Foodscape Mapping Project* is to design an interactive web map that explores the [foodscape](https://journals.sagepub.com/doi/pdf/10.1177/1536504214545754) concept and investigates the prevalence and location of various types of food options in Lexington, Kentucky. This project visualizes the food choices that the general public in Lexington, KY are faced with in our daily lives. These choices and exposures play a large role in determining how we consume food and the overall health impact of our consumption decisions. Website users will gain a better understanding of the Lexington, KY foodscape. Gaining this understanding will raise awareness of the daily choices we face in obtaining nourishment. An underlying theme of this project is a focus on improving food system equity (equal access and exposure to healthy food choices across demographic and socioeconomic groups). 

## II. Methodology
     
### A. Data
The primary food location data was derived from the Lexington Fayette County Urban Government (LFUCG) Health Department's [food-protection database](https://lexingtonhealthdepartment.org/food-protection/). This database is traditionally used to manage health inspection scores of permitted food locations in Fayette County, Kentucky. Each entry has food location name, address, health inspection scores, and several other pieces of extraneous information. Food location data obtained from the database was reduced to include only the necessary fields for geocoding and processing. To reduce the file size for web optimization, duplicate entries and extraneous fields were removed using [JupyterLab](https://github.com/jupyterlab/jupyterlab), [Python](https://www.python.org/), and [Pandas](https://pandas.pydata.org/). The subsequent dataset was exported as [lf.csv](https://github.com/ljmoser83/lex-foodscape/blob/master/data/lf.csv) for geocoding. The process is documented in a Jupyter Notebook for reproducibility of procedure and updating of entries and removal of food locations from the master list.

Lexington food locations were geocoded using [Google Cloud Google Maps Platform](https://cloud.google.com/maps-platform/). The input for the geocoder was the name, address, city, and state fields for each record within the [lf.csv](https://github.com/ljmoser83/lex-foodscape/blob/master/data/lf.csv) file. The output for the geocoding process was a JSON file containing point locations for each permitted food location, [lf.json](https://github.com/ljmoser83/lex-foodscape/blob/master/data/Lex_Food/lf.json). [lf.json](https://github.com/ljmoser83/lex-foodscape/blob/master/data/Lex_Food/lf.json) was manually converted to a GeoJSON and modified in [QGIS v3.2 (Bonn)](https://www.qgis.org/en/site/) open source GIS software suite. An additional field called "RFEI_cat" was added to the GeoJSON file to classify each food location to calculate a retail food environment index for user defined locations based on methodology described in [Cooksey-Stowers, et al., 2017](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5708005/pdf/ijerph-14-01366.pdf). [QGIS v3.2 (Bonn)](https://www.qgis.org/en/site/) was used for digitizing additional food locations and removing non-traditional food locations (based on Retail Food Environment Index methodology set forth in [Cooksey-Stowers, et al., 2017](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5708005/pdf/ijerph-14-01366.pdf)), such as food trucks, schools, concession stands, and assisted living facilities that are either seasonal, mobile, or only available to a subset of the population. Upon review of the GeoJSON, additional food locations that may have been missed, such as convenience food locations that do not require health department inspections, were manually added to the collection. The resulting GeoJSON is projected in [crs:84 (EPSG: 4326, WGS 84)](https://epsg.io/4326) for display in a web map. 

### B. Medium for delivery
A mobile-first, responsive website was built around an interactive web map containing the food location data for Lexington, KY and surrounding parts of Fayette County. The website content and design were programmed using [html5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5), [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference), and [JavaScript](https://developer.mozilla.org/bm/docs/Web/JavaScript). The web map and associated website were built using [Leaflet](https://leafletjs.com/) open source geospatial and [Bootstrap](https://getbootstrap.com/) responsive design libraries. The website content includes a mission statement, an interactive map, and a section that will define critical concepts and terminology to ensure that the user is educated on the jargon associated with foodscapes, food access, and food equity. Methodological and technical references are provided within the map toolbar.

### C. Application layout
Original Conceptions:

Mobile:

![Mobile Design Sketch](https://github.com/ljmoser83/lex-foodscape/blob/master/images/mobile.png)

Desktop:

![Desktop Design Sketch](https://github.com/ljmoser83/lex-foodscape/blob/master/images/lex-foodscape-concept.png)

Final Design:

![Final Design](https://github.com/ljmoser83/lex-foodscape/blob/master/images/layout.png)

Link to Live Web Page:

[lex-foodscape](https://ljmoser83.github.io/lex-foodscape/)

### D. Thematic representation

The "RFEI_cat" field is used for visualization and symbology during website user interaction. It is also be utilized to quantify the exposure to unhealthy:healthy food choices in the selected foodscape area (as determined by the selected radio value) based on methods set forth in [Cooksey-Stowers, et al., 2017](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5708005/pdf/ijerph-14-01366.pdf). 

### E. User interaction

User interactions focus on identifying the user's exposure to potentially unhealthy and healthy food choices in their foodscape. The "Tutorial" tab on the map's control bar walks the user through specific use instructions. Within the "Maps Tools" tab, the user has access to several ways to interact with the dataset. Users are able to utilize an address geocoder that will place a point of interest on the map and analyze the food environment in a set radius around that point. Alternative methods for adding this point to the map include a double click on a location of interest on the map or by using the "Use Current Location" button next to the geocoder that utilizes location services of the user's device to drop a location on the map. The location of interest can be buffered with a radius that is determined from the radio selector. This will serve as a representation of the user's foodscape based on a 0.25 mile (~5 minute walk; unlikely to need a car for most users), 0.5 mile (~10 minute walk; could requires a car for some users), and 1.0 mile (~20 minute walk; requires a car for most users) radius from their location of interest. These distances should serve as a suitable means of identifying exposure to the foodscape in the user's geographic location. A button to "Locate Nearest Healthy Option" is included on the "Map Tools" tab. This button zooms the user to the nearest healthy option and highlights it with a yellow circle. The user is able to zoom in and out of the web map using zoom control. A mouseover or click on a food location displays information about the feature of interest. The user is able to see a ratio of potentially unhealthy and healthy food options in their foodscape (area of interest buffered by the distance set from the radio selector) within the "Map Tools" tab. A "Reset" button has been included to the sidebar to allow the user to remove all user applied information from the map and reset the map to the original extent, without reloading the browser. Social media buttons have been added to the webpage to allow the user an easy method to share the website with other potential users.


### F. Aesthetics and design considerations

The web map and website utilize mobile-first design. I envision users accessing the website from their mobile device as they move around Lexington, KY. Marker clustering will be utilized to represent the large number of point locations that will be visible at the full extent of the map. As the user zooms into the map these clusters will break up and begin showing individual points. The mobile version is designed with the mission statement in the header of the website, the map in the body of the website, and descriptions of key concepts and terminology in the footer of the website, in a vertical scroller layout. The desktop version is similarly designed.

### G. Conclusion

The lex-foodscape project provides an opportunity for Lexington, KY community members and visitors to turn a critical eye to their everyday exposure to various food choices within their foodscape. Raising awareness of exposure, food choices, and access is the first step in educating community members and visitors on ways to address issues of food equity and promote healthy food decisions. Developing a critical evaluative framework for foodscape analysis that can help shape food policy on the city, regional, state, and national level would be a critical next step to further the work of this project. 
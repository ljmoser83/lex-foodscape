# lex-foodscape
# Lexington, KY Foodscape Mapping Project

## I. Introduction
The goal of the *Lexington, KY Foodscape Mapping Project* is to design an interactive web map that explores the foodscape concept and investigates the prevalence and location of various types of food options in Lexington, Kentucky. This project will visualize how demographic characteristics, health indicators of residents, measures of economic prosperity, and accessibility serve as explanatory and response variables for shaping a foodscape. Map users will gain a better understanding of the Lexington, KY foodscape. Gaining this understanding will raise awareness of food system equity. 

## II. Methodology
     
### A. Data
-Address data for food locations registered with the Lexington Fayette County Urban Government Health Department will be obtained from an open database. Fayette County Food Locations: https://lexingtonhealthdepartment.org/food-protection/.   

-Food Location data obtained from the database will be minimized to reduce the file size for web optimization. This process will occur using Jupyter Lab and Pandas (Python programming language). Processed version of the dataset is available at: https://github.com/ljmoser83/lex-foodscape/blob/master/data/food_locs_fayette.xlsx

-Food Locations will be geocoded using the MMQGIS plugin within the QGIS open source GIS software suite. The geocoding will take place using an API key for Google Maps and the Google Cloud Platform. The input for the geocoder will be a .csv file and the output will be a shapefile. Geocoded shapefile of this data can be found at: https://github.com/ljmoser83/lex-foodscape/tree/master/data/Lex_Food. An additional field called "RFEI_cat" will be added to the shapefile to classify each food location based on methodology from Corskey, et al., 2017 (https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5708005/pdf/ijerph-14-01366.pdf). 

-The shapefile will then be converted to a web optimized GeoJSON file using GDAL: ogr2ogr on the command line. The resulting GeoJSON will be projected in crs:84 (EPSG: 4326, WGS 84) for display in a web map. 

### B. Medium for delivery
A responsive website will be built around an interactive web map containing the food location data for Lexington, KY. The web map will be programmed using open source geospatial and responsive design libraries. The website content and design will be programmed using html5, CSS, and Javascript. The website will include a narrative section that will define critical concepts and terminology to ensure that the user is educated on the jargon associated with foodscapes, food access, and food equity.

### C. Application layout

![Website Design Sketch](https://github.com/ljmoser83/lex-foodscape/blob/master/images/lex-foodscape-concept.png)

### D. Thematic representation

-The "RFEI_cat" field will be used for visualization and symbology during website user interaction. It will also be utilized for a statistical analysis to represent the exposure to healthy/unhealthy food choices in the selected foodscape area.

-I am considering utilizing visualizations with kde plots that aggregate based on the definition of various foodscape phenomena (food swamp, desert, areas of healthy foods).

-For Web design, I am looking into using the mapbox framework for user interface design. I am also going to look into adding a mapbox (or smililar) geocoder to the website so that people can investigate specific locations, by address, in Lexington. I will be exploring further options for the geospatial stack that will be employed for the website and may revert to using leaflet with a general responsive design library to customize web design with mobile users in mind.

### E. User interaction

The user interactions will focus on identifying the user's exposure to potentially healthy and unhealthy food choices in their foodscape. Users will be able to interact with the website and web map in several planned manners, including:

-An address geocoder that will place a point of interest on the map and analyze the food environment in a set radius around that point. Alternative methods for adding this point to the map will include a tap/click on a location of interest on the map or by using the "locate me" button next to the geocoder that will utilize location services of the user's device to drop a location on the map.

-The location of interest will be buffered with a radius that is determined from the radio selector in the bottom left corner of the web map. This will serve as a representation of the user's foodscape based on a 0.25, 0.5, and 1.0 mile radius from their location of interest. These distances should serve as sufficient means of identifying exposure to the foodscape in the user's general geographic location.

-I anticipate including a button for the user to locate the closest source of fresh, healthy food.

-I may explore adding buttons to check the "food swamp" and "food desert" status of the location the user enters into the website. If I choose to implement this feature, I will need to add some additional geospatial data representing food access by census tract.

-The user will be able to zoom in and out of the web map using zoom control.

-The user will be able to mouseover food locations to obtain information about a feature of interest.

-The user will be able to see an interactive list of potentially healthy and unhealthy food options in their foodscape (area of interest buffered by the distance set from the radio selector).

### F. Aesthetics and design considerations

-The website will be developed using mobile-first design. I envision the user accessing the website from their mobile device as they move around Lexington, KY. I will likely have a version like the image displayed in the application layout for desktop design, as well. The mobile version will likely be designed with the narrative in the header of the website, the map in the body of the website, and the interactive list of food locations in the footer of the website, in a vertical scroller layout. I generally prefer dark themed base maps with strongly contrasted text. I believe this will be my target for the aesthetics of the website design.

### G. Conclusion

The lex-foodscape project will provide an opportunity for Lexington, KY community members and visitors to turn a critical eye to their everyday exposure to various food choices within their foodscape. Raising awareness of exposure, food choices, and access is the first step in educating community members and visitors on ways to address issues of food equity and promote healthy food decisions. Developing a critical evaluative framework for foodscape analysis that can help shape food policy on the city, regional, state, and national level would be a critical next step to further the work of this project. 
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
A responsive website will be built around an interactive web map containing The food location data for Lexington, KY. The web map will be programmed using open source geospatial and responsive design libraries. The website content and design will be programmed using html5, CSS, and Javascript.

### C. Application layout
![Website Design Sketch](https://github.com/ljmoser83/lex-foodscape/blob/master/images/lex-foodscape-concept.png)

### D. Thematic representation

-The "RFEI_cat" field will be used for visualization and and symbology during website user interaction. It will also be utilized for a statistical analysis to represent the exposure to healthy/unhealthy food choices in the selected foodscape area.

-I am considering utilizing visualizations with kde plots that aggregate based on the definition of various foodscape phenomena (food swamp, desert, areas of healthy foods).

-For Web design, I am looking into using the mapbox framework for user interface design. I am also going to look into adding a mapbox (or smililar) geocoder to the website so that people can investigate specific locations, by address, in Lexington. I will be eploring further options for the geospatial stack that will be employed for the website and may revert to using leaflet with a general responsive design library to customize web design with mobile users in mind.

### E. User interaction

### F. Aesthetics and design considerations

### G. Conclusion

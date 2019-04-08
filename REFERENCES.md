# References

## Data
* Fayette County Food Locations: https://lexingtonhealthdepartment.org/food-protection/ 

* processed version of the dataset is available at: https://github.com/ljmoser83/lex-foodscape/blob/master/data/food_locs_fayette.xlsx

* This dataset will be geocoded to establish the locations of food sites throughout lexington.

* a dataset focused on food access (USDA food desert classifications) that is available from: https://www.ers.usda.gov/data-products/food-access-research-atlas/download-the-data.aspx

* The source data is in Excel (.xlsx) format, so I will start the exercise by attempting to load the data from the Excel file, which has three tabs of information within the workbook. I will specifically target the tab named: "Food Access Research Atlas". pandas' .read_excel() documentation is available at: https://pandas.pydata.org/pandas-docs/stable/generated/pandas.read_excel.html#pandas.read_excel and a good example and explanation/walkthrough is available at: https://www.dataquest.io/blog/excel-and-pandas/. xlrd is a package that is useful for loading and handling excel files. Documentation available at: http://www.python-excel.org/

* The file is ~75 MB in size (this is halfway between the filesize that generates a warning for github upload (50MB) and the filesize that is rejected by github (100MB). This leads me to expect some potential issues with manipulating this file, but it might be ok), so I will start reducing file size, with the utimate goal of producing a version of the spreadsheet that only contains records for Fayette County, Kentucky and has all unnecessary columns removed. The remaining fields will be appropriately renamed and formatted and the "CensusTract" column will ultimately be used to execute a tabular join to the GEOID column in the spatial file that contains the census tracts for the state of Kentucky. The original shapefile for the census tracts for Kentucky is available at: https://www.census.gov/geo/maps-data/data/cbf/cbf_tracts.html. It is projected in NAD 1983 (EPSG: 4269) and will eventually need to be converted to GeoJSON through ogr2ogr conversion script and reprojected to Web Mercatur (EPSG: 3857).

* There is excellent metadata documentation avaialble at: https://www.ers.usda.gov/webdocs/DataFiles/80591/documentation.pdf?v=0 to aid me in determining which data is necessary to keep as I transform the dataset into a web map optimized JSON that will eventually become a GeoJSON when joined to the census tract geometries for Kentucky.

* In anticipation of joining the processed data from this notebook to the spatial data asociated with the Kentucky census tracts, I prepared a GeoJSON file using the following ogr2ogr (https://www.gdal.org/ogr2ogr.html) command in OSGeo4W Shell: ogr2ogr -f GeoJSON -t_srs crs:84 -lco COORDINATE_PRECISION= 5 kentucky_census_tracts.geojson cb_2017_21_tract_500k.shp The resultant file is available in the ./data/cb_2017_21_tract_500k/ directory. I will likely start a second notebook that will focus on joining the output from this notebook to the newly generated GeoJSON file and clean up and prepare the resultant GeoJSON for web map optimization. This tutorial will be useful when moving on to the join: https://www.shanelynn.ie/merge-join-dataframes-python-pandas-index-1/

* I have requested block level demographic data from LFUCG PVA. I would like to look at the affect of the resolution of block vs tract level data on how the demographics and other characteristics of the population are impacted (This is a classic example of the MAUP).

* I am considering utilizing visualizations with kde plots that aggregate based on the definition of various foodscape phenomena (food swamp, desert, areas of healthy foods).

* For Web design, I am looking into using the mapbox framework for user interface design. I am also going to look into adding a mapbox (or smililar) geocoder to the website so that people can investigate specific locations, by address, in Lexington.

## Literature Review
* Christian, J.W. Using geospatial technologies to explore activity-based retail food environments. Spatial and Spatio-temporal Epidemiology 3(2012) 287-295. Accessed 1/25/2019.
* Shannon, J., Christian, J.W. What is the relationship between food shopping and daily mobility? A relational approach to analysis of food access. Geojournal (2017) 82:769-785. Accessed 1/25/2019.
* Rose, D., Bodor, N., Swalm, C., Rice, J., Fraley, T., Hutchinson, P. Deserts in New Orleans? Illustrations of Urban Food Access and Implications for Policy. University of Michigan National Poverty Center. USDA Economic Research Service Research: Ann Arbor, MI, USA. 2009. https://pdfs.semanticscholar.org/abc8/b418aa0783c8f3b0a0c4fca8f137ad806e0a.pdf
* Cooksey-Stowers, K., Schwarts, M.B., Brownell, K.D. Food Swamps Predict Obesity Rates Better than Food Deserts in the United States. International Journal of Environmental Reesearch and Public Health. 2017. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5708005/pdf/ijerph-14-01366.pdf 
* Mackendrick, Norah. (2014). Jargon: Foodscape. Contexts. 13. 16-18. 10.1177/1536504214545754. https://journals.sagepub.com/doi/pdf/10.1177/1536504214545754 

## Notes
* python ETL documentation and data sources available for Fayette census tracts and USDA ERS: https://github.com/newmapsplus/map674-module-03-ljmoser83/blob/master/exercise_03.ipynb



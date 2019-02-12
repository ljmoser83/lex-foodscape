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

* I have requested block level demographic data from LFUCG PVA. I would like to look at the effect of the resolution of block vs tract level data on how the demographics and other characteristics of the population are impacted (This is a classic example of the MAUP).

## Literature Review
* Christian, J.W. Using geospatial technologies to explore activity-based retail food environments. Spatial and Spatio-temporal Epidemiology 3(2012) 287-295. Accessed 1/25/2019.
* Shannon, J., Christian, J.W. What is the relationship between food shopping and daily mobility? A relational approach to analysis of food access. Geojurnal (2017) 82:769-785. Accessed 1/25/2019.

## Notes
* python ETL documentation and data sources available for Fayette census tracts and USDA ERS: https://github.com/newmapsplus/map674-module-03-ljmoser83/blob/master/exercise_03.ipynb



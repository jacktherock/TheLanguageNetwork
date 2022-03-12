/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv", am4maps.MapChart);

// Set map definition
chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.Orthographic();
chart.panBehavior = "rotateLong";
chart.deltaLatitude = -20;
chart.padding(20, 20, 20, 20);

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;
// polygonSeries.include = ["BR", "UA", "MX", "CI"];

// Create image series
var imageSeries = chart.series.push(new am4maps.MapImageSeries());

// Create image
var imageSeriesTemplate = imageSeries.mapImages.template;
var marker = imageSeriesTemplate.createChild(am4core.Image);
marker.width = 28;
marker.height = 28;
marker.nonScaling = true;
marker.tooltipText = "{title}";
marker.horizontalCenter = "middle";
marker.verticalCenter = "middle";
marker.propertyFields.href = "flag";

// Set property fields
imageSeriesTemplate.propertyFields.latitude = "latitude";
imageSeriesTemplate.propertyFields.longitude = "longitude";

var tower = "https://img.icons8.com/color/344/radio-tower.png";
// Add data for the three cities
imageSeries.data = [
    {
        "latitude": 20.5937,
        "longitude": 78.9629,
        "title": "India",
        "flag": tower
    },
    {
        "latitude": 40.4637,
        "longitude": 3.7492,
        "title": "Spain",
        "flag": tower
    },
    {
        "latitude": 46.2276,
        "longitude": 2.2137,
        "title": "France",
        "flag": tower
    },
    {
        "latitude": 51.1657,
        "longitude": 10.4515,
        "title": "Germany",
        "flag": tower
    },
    {
        "latitude": 35.8617,
        "longitude": 104.1954,
        "title": "China",
        "flag": tower
    },
    {
        "latitude": 35.9078,
        "longitude": 127.7669,
        "title": "South Korea",
        "flag": tower
    },
    {
        "latitude": 36.2048,
        "longitude": 138.2529,
        "title": "Japan",
        "flag": tower
    },
];

// Curve line series
var lineSeries = chart.series.push(new am4maps.MapLineSeries());
lineSeries.mapLines.template.strokeWidth = 2;
lineSeries.mapLines.template.stroke = am4core.color("#800080");

var line = lineSeries.mapLines.create();

line.multiGeoLine = [[
    { "latitude": 20.5937, "longitude": 78.9629 },
    { "latitude": 35.8617, "longitude": 104.1954 },
    { "latitude": 35.9078, "longitude": 127.7669 },
    { "latitude": 36.2048, "longitude": 138.2529 },
    { "latitude": 40.4637, "longitude": 3.7492 },
    { "latitude": 46.2276, "longitude": 2.2137 },
    { "latitude": 51.1657, "longitude": 10.4515 },
]];

line.id = "myline";
line.setClassName();

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.fill = am4core.color("#566dff");
polygonTemplate.stroke = am4core.color("#000033");
polygonTemplate.strokeWidth = 0.1;
polygonTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
polygonTemplate.url = "https://www.datadrum.com/main.php?package={id}";
polygonTemplate.urlTarget = "_blank";

// Map grid
var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
graticuleSeries.toBack();
graticuleSeries.fitExtent = false;

// Earth color
chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#000033");
chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;

// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = chart.colors.getIndex(0).brighten(-0.5);

let animation;
setTimeout(function () {
    animation = chart.animate({ property: "deltaLongitude", to: 100000 }, 20000000);
}, 3000)

chart.seriesContainer.events.on("down", function () {
    animation.stop();
})


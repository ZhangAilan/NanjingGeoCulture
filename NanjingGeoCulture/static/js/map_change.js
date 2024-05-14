//创建初始底图
var basemap = L.map('mapid').setView([32.0603, 118.7969], 13); 
console.log("BaseMap has been created.")

//底图选项
var map_initial =L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
        }).addTo(basemap);

var map1=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        });

var map2=L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
            maxZoom: 19,
        });

var map3=L.tileLayer('https://cartocdn_{s}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png', {
            maxZoom: 19,
        });

var map4=L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png ', {
            maxZoom: 19,
        });

var map5=L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
            maxZoom: 19,
        });

//切换底图
function changeMap(mapType){
    basemap.eachLayer(function (layer) {
        basemap.removeLayer(layer);
        console.log("Map has been removed.")
    });

    switch(mapType){
        case "map1":
            map1.addTo(basemap);
            break;
        case "map2":
            map2.addTo(basemap);
            break;
        case "map3":
            map3.addTo(basemap);
            break;
        case "map4":
            map4.addTo(basemap);
            break;
        case "map5":
            map5.addTo(basemap);
            break;
        default:
            map_initial.addTo(basemap);
            break;
    }
    console.log("Map has been changed.")
}

//添加GeoJSON图层(一直保留在地图上)
var persistentGeoJSONLayer;

function addPersistentGeoJSONLayer(filepath){
    console.log("Persistent GeoJSON is being added.")
    if(persistentGeoJSONLayer){
        basemap.removeLayer(persistentGeoJSONLayer);
        console.log("Old persistent GeoJSON has been removed.")
    }
    fetch(filepath)
        .then(response => response.json())
        .then(data => {
            persistentGeoJSONLayer = L.geoJSON(data, {
                style: function(feature) {
                    return {color: "#75E5FF"};  // 设置颜色为蓝色
                },
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng);
                },
                onEachFeature: function (feature, layer) {
                    layer.on('click', function () {
                        var offcanvasElement = document.getElementById('offcanvasLabel');
                        var bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
                        bsOffcanvas.show();
                    });
                }
            }).addTo(basemap);
            console.log("Persistent GeoJSON has been added.")
        });
}


//导航栏：要素组合  （两个geojson文件）

var geoJSONLayer1, geoJSONLayer2;

function addGeoJSONLayers(filepath1, filepath2 = null, pointStyle = null){
    console.log("GeoJSON is being added.")
    if(geoJSONLayer1){
        basemap.removeLayer(geoJSONLayer1);
        console.log("GeoJSON 1 has been removed.")
    }
    if(geoJSONLayer2){
        basemap.removeLayer(geoJSONLayer2);
        console.log("GeoJSON 2 has been removed.")
    }
    if(filepath2){
        fetch(filepath2)
            .then(response => response.json())
            .then(data => {
                geoJSONLayer1 = L.geoJSON(data, {
                    style: function(feature) {
                        return {color: "#FF8092"};  // 设置颜色
                    },
                    pointToLayer: function (feature, latlng) {
                        return pointStyle ? pointStyle(feature, latlng) : L.marker(latlng);
                    },
                    onEachFeature: function (feature, layer) {
                        layer.on('click', function () {
                            var offcanvasElement = document.getElementById('offcanvasLabel');
                            var bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
                            bsOffcanvas.show();
                        });
                    }
                }).addTo(basemap).bringToFront();
                console.log("GeoJSON 1 has been added.")
            });
    }
    fetch(filepath1)
    .then(response => response.json())
    .then(data => {
        geoJSONLayer2 = L.geoJSON(data, {
            style: function(feature) {
                return {color: "#8A84FF"};  // 设置颜色
            },
            pointToLayer: function (feature, latlng) {
                return pointStyle ? pointStyle(feature, latlng) : L.marker(latlng);
            },
            onEachFeature: function (feature, layer) {
                layer.on('click', function () {
                    var offcanvasElement = document.getElementById('offcanvasLabel');
                    var bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
                    bsOffcanvas.show();
                });
            }
        }).addTo(basemap).bringToFront();
        console.log("GeoJSON 2 has been added.")
    });    
    }
   
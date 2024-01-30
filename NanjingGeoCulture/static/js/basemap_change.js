var basemap = L.map('mapid').setView([32.0603, 118.7969], 13); 
console.log("BaseMap has been created.")

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

//切换地图
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

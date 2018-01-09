function resizeContent(options){
  var header = document.getElementsByTagName("header")
  var footer = document.getElementsByTagName("footer");
  var aside = document.getElementsByTagName("aside");
  options = (typeof(options) !== 'undefined') ? options : {
    section : document.getElementsByTagName("section"),
    headerHeight : (header.length !== 0) ? parseInt((getComputedStyle(header[0]).height).replace(/[^-\d\.]/g,'')) : 0,
    footerHeight : (footer.length !== 0) ? parseInt((getComputedStyle(footer[0]).height).replace(/[^-\d\.]/g,'')) : 0,
    asideWidth :   (aside.length !== 0) ? parseInt((getComputedStyle(aside[0]).width).replace(/[^-\d\.]/g,'')) : 0
  };
  var frameWidth = window.innerWidth, frameHeight = window.innerHeight;
  for(var i=0; i<options.section.length; i++){
    options.section[i].style.width = (frameWidth - options.asideWidth) + 'px';
    options.section[i].style.height = (frameHeight - (options.headerHeight + options.footerHeight)) + 'px';
  }

}
function getLayer(map, title){
  var array = map.getLayers().getArray();
  for(var i=0; i<array.length; i++){
    if (array[i].get('title') == title){
      return array[i];
    }
  }
  return null;
}
function removeLayers(map, likeString){
  var array = map.getLayers().getArray();
  var catchArr = new Array();
  for(var i=0; i<array.length; i++){
    if (array[i].get('title').indexOf(likeString) != -1){
      catchArr.push(array[i]);
    }
  }
  for (var i=0; i<catchArr.length; i++){
    map.removeLayer(catchArr[i]);
  }
}
function loading(sw){
  if (sw ==true){
    $('#loader').css('display','block');
  } else {
    $('#loader').css('display','none');
  }
}
function selectColor(obj, type){
  var result = null;
  if (obj == objsName[0]){ //wall
    (type == 'stroke'? result ="#6c6c6c" : result = "rgba(108, 108, 108, 0.8)");
  } else if (obj == objsName[1]){ //space
    (type == 'stroke'? result ="#ffffff" : result = "rgba(255, 255, 255, 0.8)");
  } else if (obj == objsName[2]){ // column
    (type == 'stroke'? result ="#4cc643" : result = "rgba(76, 198, 67, 0.8)");
  }  else if (obj == objsName[3]){ //Door
    (type == 'stroke'? result ="#FF6347" : result = "rgba(255, 99, 71, 0.8)");
  }  else if (obj == objsName[4]){ //stair
    (type == 'stroke'? result ="#008080" : result = "rgba(0, 128, 128, 0.8)");
  }  else if (obj == objsName[5]){ //Window
    (type == 'stroke'? result ="#F5DEB3" : result = "rgba(245, 222, 179, 0.8)");
  }  else if (obj == objsName[6]){ //Elevator
    (type == 'stroke'? result ="#4169E1" : result = "rgba(65, 105, 225, 0.8)");
  }  else if (obj == objsName[7]){ //Escalator
    (type == 'stroke'? result ="#ff80ff" : result = "rgba(255, 128, 255, 0.8)");
  }
  return result;
}
function setIndex(objKey, layer){
  if (objKey == 'Space'){
    layer.setZIndex(3);
  } else if (objKey == 'Wall'){
    layer.setZIndex(4);
  } else if (objKey == 'Column'){
    layer.setZIndex(5);
  } else if (objKey == 'Window'){
    layer.setZIndex(6);
  } else if (objKey == 'Stair'){
    layer.setZIndex(7);
  } else if (objKey == 'Door'){
    layer.setZIndex(8);
  } else if (objKey == 'Escalator'){
    layer.setZIndex(9);
  } else {
    layer.setZIndex(9);
  }
}
function addPOIs(map, title, data){
  var array = new Array();
  for(var i=0; i<data.length; i++){
    var obj = data[i];
    var coordinates = ol.proj.fromLonLat([obj.lon, obj.lat]);
    var feature = new ol.Feature({
      geometry : new ol.geom.Point(coordinates)
    });
    //iconStyle
    var icon = new ol.style.Style({
      image : new ol.style.Icon({
        src: './images/'+ title + '.png'
      })
    });
    feature.setStyle(icon);
    feature.set('title', title);
    feature.set('info', JSON.stringify(obj));
    array.push(feature);
  }
  var source = new ol.source.Vector({
    features : array
  });
  var layer = new ol.layer.Vector({
    title : title,
    source : source
  });
  layer.setZIndex(10);
  map.addLayer(layer);
}

function removePOIs(map, title){
  var array = map.getLayers().getArray();
  for(var i=0; i<array.length; i++){
    if (array[i].get('title') == title){
      map.removeLayer(array[i]);
      return true;
    }
  }
  return false;
}

function seoulMapInfo(map){
  var baseUrl = 'http://map.seoul.go.kr/smgis/apps/mapsvr.do?key=51b32cf8444d4b6592a290bc64a88dc8';
  var infoUrl = baseUrl + '&cmd=getMapInfo';
  var proj_5179 = new ol.proj.Projection({ code : "EPSG:5179" });
  $.ajax({
    url : infoUrl,
    type : 'get',
    success : function(data){
      var info = (typeof (data) !== 'undefined') ? data : null;
      if (info == null){
        return -1;
      }
      info = JSON.parse(info);
      var enMap = info['tileMapInfos']['tileMapInfo'][16];

      var tilegrid = new ol.tilegrid.TileGrid({
        origin : [enMap['originX'], enMap['originY']],
        extent : [enMap['mbr']['minx'], enMap['mbr']['miny'],
          enMap['mbr']['maxx'], enMap['mbr']['maxy']],
        resolutions : [128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25],
        tileSize : [enMap['imageSize'], enMap['imageSize']]
      });
      var xyz = new ol.source.XYZ({
        crossOrigin : 'Anonymous',
        projection : proj_5179,
        tileUrlFunction : function(coordinate, pixelRatio, projection){
          var z = coordinate[0];
          var x = coordinate[1];
          var y = coordinate[2];
          var xHalf = parseInt(x/50);
          var yHalf = parseInt(y/50); 
          return enMap['url'] +
                      z + '/' + xHalf + '/' + yHalf + '/' + x + '_' + y + '.png';
        },
        tileGrid : tilegrid
      });

      var bgLayer = getLayer(map, 'background-map');
      bgLayer.setSource(xyz);

    },
    error : function(err){
      console.log(err);
    }
  })
}
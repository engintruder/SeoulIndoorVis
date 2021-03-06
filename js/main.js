//http://113.198.80.59/app/openapi/seoulcity/indoor2dmap/layerInfo.json?key=03c88b3566c5431fa45f691425a8a8df&bldId=514&floorIdx=5
var baseURL = 'http://113.198.80.59/app/openapi/seoulcity';
//var baseURL = 'http://indoormap.seoul.go.kr/app/openapi/seoulcity';
var objsName = ["Wall", "Space", "Column", "Door", "Stair", "Window", "Elevator", "Escalator"];
var apiKey = '03c88b3566c5431fa45f691425a8a8df';
//Request Building List
function requestBuildingList(callback){
  callback = (typeof(callback) !== 'undefined') ? callback : null;
  //console.log(baseURL + '/indoor2dmap/buildingList.json?key=03c88b3566c5431fa45f691425a8a8df');
  $.ajax({
    url : baseURL + '/indoor2dmap/buildingList.json?key=03c88b3566c5431fa45f691425a8a8df',
    success : function (data){
      var result = data.result;
      var div = $('#dataList');
      div.empty();
      for(var i=0; i<result.length; i++){
        div.append(
          '<li><a href="#" class="list-evt" ' +
          'data-val=' + JSON.stringify((result[i])) + '>'
          + result[i]['bldName']
          +'</a></li>'
        );

      }
      if (callback != null){
        callback(result);
      }
    }, error : function (err){
      console.log(err);
    }
  });
}
//Request Building Data
function requestBuildingData(sw, bldId, floorIdx, callback){
  callback = (typeof(callback) !== 'undefined') ? callback : null;
  var url = baseURL + '/indoor2dmap/layerInfo.json?key=03c88b3566c5431fa45f691425a8a8df'
            +'&bldId='+ bldId
            + '&floorIdx=' + floorIdx;
  loading(true);
  $.ajax({
    url : url,
    success : function (evt){
      loading(false);
      try{
        var result = JSON.parse(evt.result);
        if (callback != null){
          callback(result);
        }
      } catch(e){
        console.log(e);
        console.log(evt.result);
      }
    }
  })
}

//Request Building FloorList Data
function requestFloorData(bldId, callback){
  callback = (typeof(callback) !== 'undefined') ? callback : null;
  var url = baseURL + '/indoor2dmap/floorList.json?key=03c88b3566c5431fa45f691425a8a8df'
    +'&bldId='+ bldId;
  loading(true);
  $.ajax({
    url : url,
    success : function (evt){
      loading(false);
      try{
        var result = evt.result;
        if (callback != null){
          callback(result);
        }
      } catch(e){
        console.log(e);
        console.log(evt.result);
      }
    }
  })
}


//Request Linker Info List
function requestLinkerContentList(type, bldId, callback){
  callback = (typeof(callback) !== 'undefined') ? callback : null;
  var url = baseURL;
  if (type == 'nearby'){
    url = url + '/nearby/nearbyInfo.json';
  } else if (type == 'handi'){
    url = url + '/handicapFacility/facilityList.json';
  } else if (type == 'enter'){
    url = url + '/entrance/entranceList.json';
  } else if (type == 'shopping'){
    url = url + '/shoppingCenter/shoppingCenterList.json';
  }
  url = url + '?key=03c88b3566c5431fa45f691425a8a8df' + '&bldId=' + bldId;
  loading(true);
  $.ajax({
    url : url,
    success : function (evt){
      loading(false);
      try{
        var result = evt.result;
        if (callback != null){
          callback(result);
        }
      } catch(e){
        console.log(e);
        console.log(evt.result);
      }
    }
  });
}

//Request Linker Detail Info
function requestLinkerContent(type, poiId, callback){
  callback = (typeof(callback) !== 'undefined') ? callback : null;
  var url = baseURL;
  if (type =='nearby'){

  } else if (type == 'handi'){
    url = url + '/handicapFacility/facilityInfo.json';
  } else if (type == 'enter'){
    url = url + '/entrance/entranceInfo.json';
  } else if (type == 'shopping'){
    url = url + '/shoppingCenter/shoppingCenterInfo.json';
  }
  url = url + '?key=03c88b3566c5431fa45f691425a8a8df' + '&poiId=' + poiId;
  loading(true);
  console.log(url);
  $.ajax({
    url : url,
    success : function (evt){
      loading(false);
      try{
        var result = evt.result;
        if (callback != null){
          callback(result);
        }
      } catch(e){
        console.log(e);
        console.log(evt.result);
      }
    }
  });
}
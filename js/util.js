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
    (type == 'stroke'? result ="#000000" : result = "rgba(0, 0, 0, 0.8)");
  } else if (obj == objsName[2]){ // column
    (type == 'stroke'? result ="#008080" : result = "rgba(0, 128, 128, 0.8)");
  }  else if (obj == objsName[3]){ //Door
    (type == 'stroke'? result ="#FF6347" : result = "rgba(255, 99, 71, 0.8)");
  }  else if (obj == objsName[4]){ //stair
    (type == 'stroke'? result ="#40e0d0" : result = "rgba(64, 224, 208, 0.8)");
  }  else if (obj == objsName[5]){ //Window
    (type == 'stroke'? result ="#F5DEB3" : result = "rgba(245, 222, 179, 0.8)");
  }  else if (obj == objsName[6]){ //Elevator
    (type == 'stroke'? result ="#4169E1" : result = "rgba(65, 105, 225, 0.8)");
  }  else if (obj == objsName[7]){ //Escalator
    (type == 'stroke'? result ="#ff80ff" : result = "rgba(255, 128, 255, 0.8)");
  }
  return result;
}
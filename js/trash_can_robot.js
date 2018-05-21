/*
@Author: Sheng
@Description: 在開啟頁面的時候就開始每0.5秒更新一次狀態 並在發送Request前再次Check一次
*/

/* Global Initialization */

var c = document.getElementById("mycan");
var ctx = c.getContext("2d");
var members = ["Moon", "Liao", "Jacky", "Audrey", "Mag", "Hank", "Kane", "Kouichi", "Rich", "Sheng", "Yuyun"];
var origin = {x: 187, y: 700};
var isBusy = false;
var fps = 60;
var percent = 0;
var checkLoop = setInterval(CheckStatus, 500); // check status with a timer for each 0.5 sec





function CheckStatus() {
  // @TODO: fetch position from API to identify status
  var data = FetchDataFromAPI();
  
  ctx.clearRect(0, 0, c.width, c.height); // clear canvas
  requestAnimationFrame(function(){DrawTrashCan(data.position);}); // refresh trashcan position and draw
  
  if (data.distance <= 15) { isBusy = false; } else { isBusy = true; }

  // show images according status
  if (isBusy) {// 垃圾桶工作中
    for (var i in members) {
      var person = members[i];
      document.getElementById(person).disabled = true;
    }
  } else { // 垃圾桶無人使用時
    for (var i in members) {
      var person = members[i];
      document.getElementById(person).disabled = false;
      ctx.clearRect(0, 0, c.width, c.height) // 路徑消失
    }
  }
  return isBusy;
}

function FetchDataFromAPI() {
  //var position = {x: 187, y: 700}; // fixed version: the position received from API
  //var position = {x: Math.floor(Math.random()*30+172), y: Math.floor(Math.random()*30+685)}; // random version
  
  /* manual version */
  var position = {
    x: document.getElementById("x").value,
	y: document.getElementById("y").value
  };
  
  var xDiff = Math.abs( position.x - origin.x ); // absolute value of x-axis difference
  var yDiff = Math.abs( position.y - origin.y ); // absolute value of y-axis difference
  var distance = Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2) );
  var data = {
	position: position,
	distance: distance
  };
  
  return data;
}


function SendRequest(name) {
  isBusy = CheckStatus();
  var endPoint = ReturnEndPointByID(name);
  if (!isBusy) {
    MakeCanMove(endPoint); //moving the trashcan icon
    ShowPath(187, 700, endPoint[0], endPoint[1]);

    // @TODO: send request via API

    // @TODO: high-light target

    // refresh by checking status
    isBusy = true;
    CheckStatus();
  }
}



function ShowPath(start_x, start_y, end_x, end_y) {
  ctx.beginPath();
  ctx.lineWidth = "5";
  ctx.strokeStyle = "green"; // Green path
  ctx.moveTo(start_x, start_y);
  ctx.lineTo(end_x, end_y);
  ctx.stroke(); // Draw it
}





function MakeCanMove(endPoint) {
  // console.log(percent);
  // set the animation position (0-100)
  if (percent == 100) {
	direction = -1;
	percent = 0;
  }
  if (percent < 100) {
    percent += 1;
    var newPoint = endPoint;
    Draw(percent, 187, 700, endPoint[0], endPoint[1]);
    //console.log(newPoint);
	
	// request another frame
	setTimeout( function() {
	  requestAnimationFrame( function(){ MakeCanMove(newPoint); } ); 
	}, 1000 / fps);
  }
  //console.log(endPoint[0]);
  //console.log(endPoint[1]);

}

function MakeGoBack(endPoint) {
  
  endPoint[0] = 187;
  endPoint[1] = 130;
  if (percent == 100) {
    percent = 0;
    direction = -1;
  };

  if (percent < 100) {
    percent += 1;
    var newPoint = endPoint;
    GoBack(percent, 187, 130, 187, 700);
    
  };
  //console.log(endPoint[0]);
  //console.log(endPoint[1]);

  // request another frame
  setTimeout( function () {
	requestAnimationFrame( function(){ MakeGoBack(newPoint); } );
  }, 1000 / fps);
}

function GoBack(sliderValue, start_x, start_y, end_x, end_y) {
  ctx.clearRect(0, 0, c.width, c.height)

  // draw the tracking rectangle
  ShowPath(187, 130, 187, 700);

  var xy;

  if (sliderValue < 100) {
    var percent = sliderValue / 100;

    xy = GetLineXYAtPercent(
      {x: 187, y: 130},
      {x: 187, y: 700},
      percent
    );
  } else { percent = 0; }
    //console.log(end_x);
    //console.log(end_y);
    //console.log(xy);
  DrawTrashCan(xy);
}

// draw the current frame based on sliderValue
function Draw(sliderValue, start_x, start_y, end_x, end_y) {


  ctx.clearRect(0, 0, c.width, c.height);

  // draw the tracking rectangle
  ShowPath(187, 700, end_x, end_y);

  var xy;

  if (sliderValue < 100) {
    var percent = sliderValue / 100;

    xy = GetLineXYAtPercent(
      {x: 187, y: 700},
      {x: end_x, y: end_y},
      percent
    );
  } else { percent=0; }
    //console.log(end_x);
    //console.log(end_y);
  //console.log(xy);
  DrawTrashCan(xy);

}


function DrawTrashCan(point) {
  var img = document.getElementById("scream");
  //img.style.left = point.x + "px";
  //img.style.top = point.y + "px";
  ctx.drawImage(img, point.x-30, point.y-30);
}

// line: percent is 0-1
function GetLineXYAtPercent(startPt, endPt, percent) {
  var dx = endPt.x - startPt.x;
  var dy = endPt.y - startPt.y;
  var X = startPt.x + dx * percent;
  var Y = startPt.y + dy * percent;
  return ({
    x: X,
    y: Y
  });
}

function ReturnEndPointByID(name) {
  /*
    左上轉折點 : 214.5,130
    Jacky,Andrey: 214.5,280
    Hank,Ken  : 214.5,480
    Rich,Sheng: 214.5,680
    左下轉折點 : 214.5,750

    右上轉折點:  620,130
    Mag:  620,280
    Kouichi:  620,480
    Yuyun:  620,680
    右下轉折點:  620,750
  */
  var end_x, end_y;

  switch (name) {
    case 'Moon': end_x = 187; end_y = 130; break;
    case 'Liao': end_x = 550; end_y = 130; break;
    case 'Jacky': end_x = 187; end_y = 280; break;
    case 'Audrey': end_x = 187; end_y = 280; break;
    case 'Mag': end_x = 550; end_y = 280; break;
    case 'Hank': end_x = 187; end_y = 460; break;
    case 'Kane': end_x = 187; end_y = 460; break;
    case 'Kouichi': end_x = 550; end_y = 460; break;
    case 'Rich': end_x = 187; end_y = 640; break;
    case 'Sheng': end_x = 187; end_y = 640; break;
    case 'Yuyun': end_x = 550; end_y = 640; break;
    default: break;
  }
  return [end_x, end_y];
}

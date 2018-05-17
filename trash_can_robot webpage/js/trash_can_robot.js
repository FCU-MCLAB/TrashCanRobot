/*
@Author: Sheng
@Description: 在開啟頁面的時候就開始每0.5秒更新一次狀態 並在發送Request前再次Check一次
*/

/* Global Initialization */
var c = document.getElementById("mycan");
var ctx = c.getContext("2d");
var members = ["Moon", "Liao", "Jacky", "Audrey", "Mag", "Hank", "Kane", "Kouichi", "Rich", "Sheng", "Yuyun"];
var isBusy = false;
var checkLoop = setInterval(CheckStatus, 500); //Check Status with a timer for each 0.5 sec.

var fps = 10;
var percent = 0;




function CheckStatus() {
  // @TODO: fetch status from API (currently using a random function)
  var num = Math.floor(Math.random() * 100);
  if (num <= 15) {
    isBusy = false;
  }

  // show images according status
  if (isBusy) {//垃圾桶工作中
    for (var i in members) {
      var person = members[i];
      document.getElementById(person).disabled = true;
    }
  } else { //垃圾桶無人使用時
    for (var i in members) {
      var person = members[i];
      document.getElementById(person).disabled = false;
      //  路徑消失
      ctx.clearRect(0, 0, c.width, c.height)
    }
  }
  return isBusy;
}


function SendRequest(name) {
  isBusy = CheckStatus();
  var endPoint = ReturnEndPointByID(name);
  if (!isBusy) {
    MakeCanMove(endPoint); //moving the trashcan icon
    ShowPath(214.5, 750, endPoint[0], endPoint[1]);

    //讓
    //MakeCanMove();

    // @TODO: send request via API

    // @TODO: high-light target

    // check status
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
    percent = 0;
    direction = -1;
  };

  if (percent < 100) {
    percent += 1;
    var newPoint = endPoint;
    draw(percent, 214.5, 750, endPoint[0], endPoint[1]);

  };
  //console.log(endPoint[0]);
  //console.log(endPoint[1]);

  // request another frame
  setTimeout(function () {
    requestAnimationFrame(MakeCanMove(newPoint));
  }, 1000 / fps);
}


// draw the current frame based on sliderValue
function draw(sliderValue, start_x, start_y, end_x, end_y) {


  ctx.clearRect(0, 0, c.width, c.height)

  // draw the tracking rectangle
  ShowPath(214.5, 750, end_x, end_y);

  var xy;

  if (sliderValue < 100) {
    var percent = sliderValue / 100;

    xy = getLineXYatPercent(
      { x: 214.5, y: 750},
      { x: end_x, y: end_y},
      percent
    );
    }
    else { percent=0;}
    //console.log(end_x);
    //console.log(end_y);
    console.log(xy);
  drawRect(xy);

}


// draw tracking rect at xy
function drawRect(point) {

  var img = document.getElementById("trash_can_image");
  ctx.drawImage(img,point.x-30,point.y-30);
  //  ctx.fillStyle = "yellow";
  // ctx.strokeStyle = "gray";
  // ctx.lineWidth = 1;
  // ctx.beginPath();
  // ctx.rect(point.x, point.y, 25, 15);
  // ctx.fill();
  // ctx.stroke();
}

// line: percent is 0-1
function getLineXYatPercent(startPt, endPt, percent) {
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
    case 'Moon': end_x = 214.5; end_y = 130; break;
    case 'Liao': end_x = 620; end_y = 130; break;
    case 'Jacky': end_x = 214.5; end_y = 280; break;
    case 'Audrey': end_x = 214.5; end_y = 280; break;
    case 'Mag': end_x = 620; end_y = 280; break;
    case 'Hank': end_x = 214.5; end_y = 480; break;
    case 'Kane': end_x = 214.5; end_y = 480; break;
    case 'Kouichi': end_x = 620; end_y = 480; break;
    case 'Rich': end_x = 214.5; end_y = 680; break;
    case 'Sheng': end_x = 214.5; end_y = 680; break;
    case 'Yuyun': end_x = 620; end_y = 680; break;
    default: break;
  }
  return [end_x, end_y];
}

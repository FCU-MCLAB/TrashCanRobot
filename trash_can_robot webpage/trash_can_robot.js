/*
@Author: Sheng
@Description: 在開啟頁面的時候就開始每0.5秒更新一次狀態 並在發送Request前再次Check一次
*/

/* Global Initialization */
var members = [ "Moon", "Liao", "Jacky", "Audrey", "Mag", "Hank", "Kane", "Kouichi", "Rich", "Sheng", "Yuyun" ];
var isBusy = false;
var checkLoop = setInterval(CheckStatus, 500); //Check Status with a timer for each 0.5 sec.



function CheckStatus(){
  // @TODO: fetch status from API (currently using a random function)
  var num = Math.floor(Math.random()*100);
  if( num <= 10){
	   isBusy = false;
    //  路徑消失
     ctx.clearRect(0,0,c.width,c.height)
  }

  // show images according status
  if(isBusy){
	for(var i in members){
	  var person = members[i];
	  document.getElementById(person).disabled = true;
	}
  }else{
	for(var i in members){
	  var person = members[i];
	  document.getElementById(person).disabled = false;
	}
  }
  return isBusy;
}


function SendRequest(name){
  isBusy = CheckStatus();
  var endPoint= ReturnEndPointByID(name);
  if(!isBusy){
    ShowPath(214.5,750,endPoint[0],endPoint[1]);

	// @TODO: send request via API

	// @TODO: high-light target

	// check status
	isBusy = true;
	CheckStatus();
  }
}

function ShowPath(start_x, start_y, end_x, end_y){

  ctx.beginPath();
  ctx.lineWidth="5";
  ctx.strokeStyle="green"; // Green path
  ctx.moveTo(start_x,start_y);
  ctx.lineTo(end_x,end_y);
  ctx.stroke(); // Draw it

}

function ReturnEndPointByID(name){
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
  var end_x,end_y;

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
  return [end_x,end_y];
}

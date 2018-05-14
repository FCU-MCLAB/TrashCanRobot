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
  if(!isBusy){
	// @TODO: send request via API
	
	// @TODO: high-light target
	
	// check status
	isBusy = true;
	CheckStatus();
  }
}
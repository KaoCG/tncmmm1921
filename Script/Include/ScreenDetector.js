

/* Get the documentElement (<html>) to display the page in fullscreen */

/* View in fullscreen */

// globalScale = 1; //這個變數外面會用到，切記不要設置成區域變數

getsize();


//待重置
function mobileresize() {
  phoneWidth = parseInt(window.innerWidth);
  globalScale = phoneWidth / screenWidth;

  var ua = navigator.userAgent;
  var isAndroid = /(android)/i.test(ua);
  if (isAndroid) {

    var version = parseFloat(RegExp.$1);

    //console.log("phoneWidth:" + phoneWidth + " screenWidth:" + screenWidth + " phoneScale:" + globalScale);

    if (version > 2.3) {
      // console.log("Andriod2.3");
      /*document.write('<meta name="viewport" content="width='
        + phoneWidth +
        ', minimum-scale = ' +
        globalScale +
        ', maximum-scale = ' +
        globalScale +
        ', target-densitydpi=device-dpi">');*/
    }
    else {
      // console.log("Andriod1.0");
      /*document.write('<meta name="viewport" content="width='
        + phoneWidth +
        ', target-densitydpi=device-dpi" > ');*/
    }

  }
  else {

    /*console.log("Not Andriod");
    document.write('<meta name="viewport" content="width='
      + screenWidth +
      ', user-scalable=no, target-densitydpi=device-dpi">');*/
  }
}

function getsize() {
  phoneWidth = parseInt(window.innerWidth);
  //globalScale = phoneWidth / screenWidth;
  globalScale = 1;
}

function openFullscreen() {

  // screen.orientation.lock("landscape-primary");
  //window.screen.lockOrientation('landscape');

  var elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}



function resize() {


  var dir = 1;
  phoneHeight = parseInt(document.documentElement.clientHeight);
  phoneWidth = parseInt(document.documentElement.clientWidth);

  if (window.matchMedia("(orientation: portrait)").matches) {
    //console.log("portrait");
    dir = 0;
    var temp = phoneWidth;
    phoneWidth = phoneHeight;
    phoneHeight = temp;
  }

  if (window.matchMedia("(orientation: landscape)").matches) {
    //console.log("landscape");
    dir = 1;
  }

  if (dir == 1) {



    var globalScale_w = phoneWidth / screenWidth;
    var globalScale_h = phoneHeight / screenHeight;
    globalScale = 1; //外面會用到
    var deltaDis = 0;

    if (globalScale_w > globalScale_h) {
      //console.log("LONG");

      globalScale = globalScale_h;
      deltaDis = phoneWidth - screenWidth * globalScale;
      app.stage.x = deltaDis / 2;
      app.stage.y = 0;

      blackrectangleA.width = deltaDis / 2 + 400;
      blackrectangleA.height = phoneHeight + 400;
      blackrectangleA.position.set(-deltaDis / 2 - 400, -200);

      blackrectangleB.width = deltaDis / 2 + 400;
      blackrectangleB.height = phoneHeight + 400;
      blackrectangleB.position.set(screenWidth, -200);

    }
    else {
      //console.log("HIGH");
      globalScale = globalScale_w;
      deltaDis = phoneHeight - screenHeight * globalScale;
      app.stage.x = 0;
      app.stage.y = deltaDis / 2;

      blackrectangleA.width = phoneWidth + 400;
      blackrectangleA.height = deltaDis / 2 + 400;
      blackrectangleA.position.set(-200, -deltaDis / 2 - 400);

      blackrectangleB.width = phoneWidth + 400;
      blackrectangleB.height = deltaDis / 2 + 400;
      blackrectangleB.position.set(-200, screenHeight);
    }

    app.renderer.resize(phoneWidth, phoneHeight);
    app.stage.scale.set(globalScale, globalScale);

    app.stage.rotation = 0;

  }
  else if (dir == 0) {

    var globalScale_w = phoneWidth / screenWidth;
    var globalScale_h = phoneHeight / screenHeight;
    globalScale = 1;//外面會用到
    var deltaDis = 0;

    if (globalScale_w > globalScale_h) {
      //console.log("Height");

      globalScale = globalScale_h;
      deltaDis = phoneWidth - screenWidth * globalScale;

      app.stage.x = 0; //不同
      app.stage.y = deltaDis / 2;

      blackrectangleA.width = deltaDis / 2 + 400;
      blackrectangleA.height = phoneWidth + 400;
      blackrectangleA.position.set(-deltaDis / 2 - 400, -200);

      blackrectangleB.width = deltaDis / 2 + 400;
      blackrectangleB.height = phoneWidth + 400;
      blackrectangleB.position.set(screenWidth, -200);
    }
    else {
      //console.log("Long");
      globalScale = globalScale_w;
      deltaDis = phoneHeight - screenHeight * globalScale;

      app.stage.x = deltaDis / 2;//不同
      app.stage.y = 0;

      blackrectangleA.width = phoneHeight + 400;
      blackrectangleA.height = deltaDis / 2 + 400;
      blackrectangleA.position.set(-200, -deltaDis / 2 - 400);

      blackrectangleB.width = phoneHeight + 400;
      blackrectangleB.height = deltaDis / 2 + 400;
      blackrectangleB.position.set(-200, screenHeight);
    }

    app.renderer.resize(phoneHeight, phoneWidth); //不同

    app.stage.scale.set(globalScale, globalScale);

    app.stage.rotation = Math.PI / 2;//不同
    app.stage.x += screenHeight * globalScale;
  }



}












/*
globalScale =  1;
//globalScale = phoneWidth / screenWidth;

var ua = navigator.userAgent;
var isAndroid = /(android)/i.test(ua);

if (isAndroid) {

 var version = parseFloat(RegExp.$1);
 globalScale =  screenWidth / phoneHeight -0.8 ;

 //console.log("phoneWidth:" + phoneWidth +" screenWidth:" + screenWidth + " phoneScale:" + globalScale );

 if (window.DeviceOrientationEvent) {
   console.log("DeviceOrientation is supported");
   window.addEventListener('deviceorientation', function (eventData) { });
 }

 if (version > 2.3) {
  // console.log("Andriod2.3");
   document.write('<meta name="viewport" content="width='
     + phoneWidth +
     ', minimum-scale = ' +
     globalScale +
     ', maximum-scale = ' +
     globalScale +
     ', target-densitydpi=device-dpi">');
 }
 else {
  // console.log("Andriod1.0");
   document.write('<meta name="viewport" content="width='
     + phoneWidth +
     ', target-densitydpi=device-dpi" > ');
 }
}
else {

 globalScale = 1;
 console.log("Not Andriod");
 document.write('<meta name="viewport" content="width='
   + screenWidth +
   ', user-scalable=no, target-densitydpi=device-dpi">');
}*/


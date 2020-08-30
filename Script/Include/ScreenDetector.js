

/* Get the documentElement (<html>) to display the page in fullscreen */

/* View in fullscreen */

// globalScale = 1; //這個變數外面會用到，切記不要設置成區域變數

getsize();

{
  var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
  var isCommonjs = typeof module !== 'undefined' && module.exports;
  
  var fn = (function () {
    var val;
  
    var fnMap = [
      [
        'requestFullscreen',
        'exitFullscreen',
        'fullscreenElement',
        'fullscreenEnabled',
        'fullscreenchange',
        'fullscreenerror'
      ],
      // New WebKit
      [
        'webkitRequestFullscreen',
        'webkitExitFullscreen',
        'webkitFullscreenElement',
        'webkitFullscreenEnabled',
        'webkitfullscreenchange',
        'webkitfullscreenerror'
  
      ],
      // Old WebKit
      [
        'webkitRequestFullScreen',
        'webkitCancelFullScreen',
        'webkitCurrentFullScreenElement',
        'webkitCancelFullScreen',
        'webkitfullscreenchange',
        'webkitfullscreenerror'
  
      ],
      [
        'mozRequestFullScreen',
        'mozCancelFullScreen',
        'mozFullScreenElement',
        'mozFullScreenEnabled',
        'mozfullscreenchange',
        'mozfullscreenerror'
      ],
      [
        'msRequestFullscreen',
        'msExitFullscreen',
        'msFullscreenElement',
        'msFullscreenEnabled',
        'MSFullscreenChange',
        'MSFullscreenError'
      ]
    ];
  
    var i = 0;
    var l = fnMap.length;
    var ret = {};
  
    for (; i < l; i++) {
      val = fnMap[i];
      if (val && val[1] in document) {
        for (i = 0; i < val.length; i++) {
          ret[fnMap[0][i]] = val[i];
        }
        return ret;
      }
    }
  
    return false;
  })();
  
  var eventNameMap = {
    change: fn.fullscreenchange,
    error: fn.fullscreenerror
  };
  
  screenfull = {
    request: function (element) {
      return new Promise(function (resolve, reject) {
        var onFullScreenEntered = function () {
          this.off('change', onFullScreenEntered);
          resolve();
        }.bind(this);
  
        this.on('change', onFullScreenEntered);
  
        element = element || document.documentElement;
  
        var returnPromise = element[fn.requestFullscreen]();
  
        if (returnPromise instanceof Promise) {
          returnPromise.then(onFullScreenEntered).catch(reject);
        }
      }.bind(this));
    },
    exit: function () {
      return new Promise(function (resolve, reject) {
        if (!this.isFullscreen) {
          resolve();
          return;
        }
  
        var onFullScreenExit = function () {
          this.off('change', onFullScreenExit);
          resolve();
        }.bind(this);
  
        this.on('change', onFullScreenExit);
  
        var returnPromise = document[fn.exitFullscreen]();
  
        if (returnPromise instanceof Promise) {
          returnPromise.then(onFullScreenExit).catch(reject);
        }
      }.bind(this));
    },
    toggle: function (element) {
      return this.isFullscreen ? this.exit() : this.request(element);
    },
    onchange: function (callback) {
      this.on('change', callback);
    },
    onerror: function (callback) {
      this.on('error', callback);
    },
    on: function (event, callback) {
      var eventName = eventNameMap[event];
      if (eventName) {
        document.addEventListener(eventName, callback, false);
      }
    },
    off: function (event, callback) {
      var eventName = eventNameMap[event];
      if (eventName) {
        document.removeEventListener(eventName, callback, false);
      }
    },
    raw: fn
  };
  
  if (!fn) {
    if (isCommonjs) {
      module.exports = { isEnabled: false };
    } else {
      window.screenfull = { isEnabled: false };
    }
  }
  
  Object.defineProperties(screenfull, {
    isFullscreen: {
      get: function () {
        return Boolean(document[fn.fullscreenElement]);
      }
    },
    element: {
      enumerable: true,
      get: function () {
        return document[fn.fullscreenElement];
      }
    },
    isEnabled: {
      enumerable: true,
      get: function () {
        // Coerce to boolean in case of old WebKit
        return Boolean(document[fn.fullscreenEnabled]);
      }
    }
  });
  
  if (isCommonjs) {
    module.exports = screenfull;
  } else {
    window.screenfull = screenfull;
  }
  
}

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

async function full()
{
  if (screenfull.isEnabled) {
    screenfull.request();
  }

}

async function resize() {

  //console.log(screenfull.isEnabled);

  //document.documentElement.requestFullscreen();

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


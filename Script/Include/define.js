const log = console.log;
const PI = 3.14;
let Application = PIXI.Application,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite;
let TextureCache = PIXI.utils.TextureCache;

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.body;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =  url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

function hitTestRectangle(r1, r2) {
  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
  //hit will determine whether there's a collision
  hit = false;
  //Find the center points of each sprite
  r1.centerX = r1.getGlobalPosition().x ;
  r1.centerY = r1.getGlobalPosition().y ;
  r2.centerX = r2.getGlobalPosition().x ;
  r2.centerY = r2.getGlobalPosition().y ;
  //Find the half-widths and half-heights of each sprite

    r1.halfWidth = r1.width / 2 ;
    r1.halfHeight = r1.height / 1;
    r2.halfWidth = r2.width / 1;
    r2.halfHeight = r2.height / 1 ;


 
  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;
  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;
  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {
    //A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {
      //There's definitely a collision happening
      hit = true;
    } else {
      //There's no collision on the y axis
      hit = false;
    }
  } else {
    //There's no collision on the x axis
    hit = false;
  }
  //`hit` will be either `true` or `false`
  return hit;
};

function keyboard(keyCode)
{
  let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  //宣告物件事件 `downHandler`
  key.downHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //宣告物件事件  `upHandler`
  key.upHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //把物件事件與主事件綁在一起。
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}



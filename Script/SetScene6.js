
//過廠走跳關卡

LoadScene0();

async function LoadScene0() {

  if (centerComponent.sceneExist[0] == false) {

    centerComponent.sceneExist[0] = true;
    await LoadSetting();
  }

  await SetObject();
  //await SetVideo();

  StartingFadeFunc();
}

//讀取設定
async function LoadSetting() {

  await SetContainer();


  scene0_tickerFunc = [];
  scene0_keyGroup = [];

}

//設定容器
async function SetContainer() {

  app.renderer.backgroundColor = 0x30BCED;

  scene0 = new PIXI.Container();
  scene0.zIndex = 0;
  scene0.sortableChildren = true;
  app.stage.addChild(scene0);

}

async function SetObject() {
  app.renderer.backgroundColor = 0x000000;
  //BG
  //Button
  {
    let start3 = new PIXI.Sprite(PIXI.Texture.from("Start03"));
    start3.scale.set(globalImageScale, globalImageScale);
    start3.zIndex = 1;
    start3.visible = false;
    scene0.addChild(start3);
    start3.x = -15;

    let start2 = new PIXI.Sprite(PIXI.Texture.from("Start02"));
    start2.scale.set(globalImageScale, globalImageScale);
    start2.zIndex = 2;
    start2.visible = false;
    scene0.addChild(start2);
    start2.x = -15;

    let start1 = new PIXI.Sprite(PIXI.Texture.from("Start01"));
    start1.scale.set(globalImageScale, globalImageScale);
    start1.zIndex = 3;
    start1.visible = false;
    scene0.addChild(start1);
    start1.y = -22;
    start1.x = 0;

    let start0 = new PIXI.Sprite(PIXI.Texture.from("Start00"));
    start0.scale.set(globalImageScale, globalImageScale);
    start0.zIndex = 4;
    start0.visible =false;
    scene0.addChild(start0);
    start0.y = -22;


    let but2 = new PIXI.Sprite(PIXI.Texture.from("StartBut02"));
    but2.width = start0.width ;
    but2.height = start0.height;
    but2.zIndex = 10;
    but2.visible = false;
    scene0.addChild(but2);
    but2.y = -41;
    but2.x = 0;

    but2.interactive = true;
    but2.buttonMode = true;

    let but = new PIXI.Sprite(PIXI.Texture.from("StartBut02"));
    but.width = start0.width * 1.1;
    but.height = start0.height * 1.1;
    but.zIndex = 10;
    but.visible = false;
    scene0.addChild(but);
    but.y = -42;
    but.x = -42;

    but.interactive = true;
    but.buttonMode = true;

    but.addListener("pointerdown", function () {
      but.visible = false;
      //EndThisScene();
    });
    but2.addListener("pointerup", function () {
      //but.visible = true;
      but.visible = false;
      EndThisScene();
    });


  }

  //cat
  {
    let cat_frame = [PIXI.Texture.from("Cat0"), PIXI.Texture.from("Cat1"), PIXI.Texture.from("Cat2"), PIXI.Texture.from("Cat3")];

    let cat = new PIXI.AnimatedSprite(cat_frame);
    cat.animationSpeed = 0.25;
    cat.pivot.set(cat.width, 0);
    cat.test = false;
    cat.play();

    cat.visible = false;
    cat.scale.set(globalImageScale, globalImageScale);
    //1000->-200
    cat.zIndex = 3.5;
    cat.x = 1500;
    cat.y = 305;
    scene0.addChild(cat);

    let counter = 0;

    scene0_tickerFunc.push(CatMove);
    function CatMove(deltaTime) {

      if (cat.currentFrame == 3 && cat.test == false) {
        cat.x -= 180;
        cat.test = true;
      }
      if (cat.currentFrame == 1 && cat.test == true) {
        cat.test = false;
      }

      counter++;
      if (counter == 1) {
        cat.x = 1800;
      }
      else if (counter == 200) {
        counter = 0;
      }

    }

  }

  //runner
  {
    let runner_frame = [PIXI.Texture.from("runner0"), PIXI.Texture.from("runner1"), PIXI.Texture.from("runner2"), PIXI.Texture.from("runner3"), PIXI.Texture.from("runner4"), PIXI.Texture.from("runner5")];
   
    let runner = new PIXI.AnimatedSprite(runner_frame);
    runner.animationSpeed = 0.15;
    runner.pivot.set(0, 0);
    runner.test = false;
    runner.play();
    runner.scale.set(1.5, 1.5);
    //1000->-200
    runner.zIndex = 2.5;
    runner.x = 0;
    runner.y = 680;
    scene0.addChild(runner);

   

    let runnerS_frame = [PIXI.Texture.from("runnerS0"), PIXI.Texture.from("runnerS1"), PIXI.Texture.from("runnerS2"), PIXI.Texture.from("runnerS3"), PIXI.Texture.from("runnerS4"), PIXI.Texture.from("runnerS5")];

    let runnerS = new PIXI.AnimatedSprite(runnerS_frame);
    runnerS.animationSpeed = 0.15;
    runnerS.pivot.set(0, 0);
    runnerS.play();
    //runnerS.scale.set(globalImageScale, globalImageScale);
    //1000->-200
    runnerS.zIndex = 2.5;
    //runnerS.x = 0;
    //runnerS.y = 124;
    //runner.addChild(runnerS);
    


    let vvv = new PIXI.Sprite(PIXI.Texture.from("VideoSelect"));
    vvv.zIndex = 10;
    vvv.visible = true;
    vvv.scale.set(2,2);
    scene0.addChild(vvv);
    vvv.y = 600;
    vvv.x = 1000;
    vvv.zIndex = 1;
    
    let vvv2 = new PIXI.Sprite(PIXI.Texture.from("VideoSelect2"));
    vvv2.zIndex = 10;
    vvv2.visible = true;
    vvv2.alpha = 0;
    vvv2.scale.set(2,2);
    scene0.addChild(vvv2);
    vvv2.y = 650;
    vvv2.x = 1000;
    vvv2.zIndex = 1;

    let fff = new PIXI.Sprite(PIXI.Texture.from("VideoTitle"));
    fff.zIndex = 11;
    fff.visible = true;
    fff.scale.set(0.25,0.25);
    scene0.addChild(fff);
    fff.y = 0;
    fff.x = 1920/2 - fff.width/2;
    fff.zIndex = 1;

    let www = new PIXI.Sprite(PIXI.Texture.from("white"));
    www.width = 1980;
    www.height = 1980;
    www.zIndex = 110;
    www.visible = true;
    www.alpha = 0;
    scene0.addChild(www);
    www.y = 0;
    www.x = 0;
    www.zIndex = 1;


    let counter = -20;
    scene0_tickerFunc.push(RunnerMove);
    function RunnerMove(deltaTime) {

      counter++;
      if (counter <=0) {
        runner.x = -200;
      }
      else if(counter <= 298)
      {
        runner.x += 5;
      }
      else if (counter <= 338) {
        runner.alpha -= 0.025;
      }
      else if (counter <= 358) {
        vvv2.alpha += 0.025;
      }
      else if (counter <= 378) {
        vvv2.alpha -= 0.025;
      }
      else if (counter <= 418) {
        vvv2.alpha += 0.025;
      }
    }


  }


  for (let i = 0; i < scene0_tickerFunc.length; i++) {
    app.ticker.add(scene0_tickerFunc[i]);
  }

}


async function SetVideo() {


  const texture = PIXI.Texture.from('./Resource/video.webm');

  texture.baseTexture.resource.autoPlay = false;


  videoSprite = new PIXI.Sprite(texture);
  scene0.addChild(videoSprite);

  /**@type {HTMLVideoElement}*/
  let videoControler = videoSprite.texture.baseTexture.resource.source;


  videoControler.currentTime = 0; // reset video time
  //videoControler.muted = "muted";
  texture.baseTexture.resource._width = 300;

  texture.baseTexture.resource.source.onended = () => { afterVideo(); }; //結束時發動

  key_Q = keyboard(81);
  key_Q.press = () => { videoControler.currentTime = 0; videoControler.play(); };
  scene0_keyGroup.push(key_Q);

  key_W = keyboard(87);
  key_W.press = () => { videoControler.pause(); afterVideo(); };
  scene0_keyGroup.push(key_W);


  //StartingFadeFunc();


}

async function afterVideo() {

  EndThisScene();
}

function EndThisScene() {

  for (let i = 0; i < scene0_keyGroup.length; i++) {
    scene0_keyGroup[i].press = null;
  }

  for (let i = 0; i < scene0_tickerFunc.length; i++) {
    app.ticker.remove(scene0_tickerFunc[i]);
  }

  //scene0.visible = false;

  // videoSprite.visible = false;
  //  videoSprite.parent.removeChild(videoSprite);
  //videoSprite.destroy({ children: true });


  EndingFadeFunc(scene0);

  //GoToNextScene();
}


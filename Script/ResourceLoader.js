
LoadResourceLoader();

async function LoadResourceLoader() {

  //設定畫面底色與相關設定
  app = new PIXI.Application({
    autoResize: true,
    width: screenWidth,
    height: screenHeight,
    resolution: devicePixelRatio
  });
  app.stage.sortableChildren = true;
  app.renderer.backgroundColor = 0x000000;

  //這個是影片用的設定
  /*app = new PIXI.Application({
    autoResize: true,
    width: 1920,
    height: 1080,
    resolution: devicePixelRatio
  });
  app.renderer.backgroundColor = 0x000000;*/

  //調整尺寸時用來填補在上下的黑圖案
  {
    blackrectangleA = new PIXI.Graphics();
    blackrectangleA.beginFill(0x000000).drawRect(0, 0, 1, 1).endFill();
    blackrectangleA.alpha = 1;
    blackrectangleA.zIndex = 200;
    app.stage.addChild(blackrectangleA);

    blackrectangleB = new PIXI.Graphics();
    blackrectangleB.beginFill(0x000000).drawRect(0, 0, 1, 1).endFill();
    blackrectangleB.alpha = 1;
    blackrectangleB.zIndex = 200;
    app.stage.addChild(blackrectangleB);
  }


  await resize();
  window.addEventListener('resize', resize);

  //把畫面放入html
  document.getElementById("display").appendChild(app.view);
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

  //這個用影片時暫時暫停

  await LoadScene0();

  await SetLoader();

  await ResetSetting();

  //console.log(   blackrectangleA.position);
  //blackrectangleA.position.set( blackrectangleA.position.x, blackrectangleA.position.y);
  //console.log(   blackrectangleA.position);
  //console.log(   blackrectangleB.position);

}

async function LoadScene0() {

  /* if (centerComponent.sceneExist[0] == false) {
 
     centerComponent.sceneExist[0] = true;
     await LoadSetting();
   }*/

  await LoadSetting();
  await SetObject();


  //await SetVideo();
  //StartingFadeFunc();
}

//讀取設定
async function LoadSetting() {

  await SetContainer();


  scene0_tickerFunc = [];
  scene0_keyGroup = [];

}

//設定畫面容器
async function SetContainer() {

  app.renderer.backgroundColor = 0x30BCED;

  scene0 = new PIXI.Container();
  scene0.zIndex = 0;
  scene0.sortableChildren = true;
  app.stage.addChild(scene0);

  CreateLoadingText();

}

async function SetObject() {

  //BG
  //Button
  {
    let start3 = new PIXI.Sprite.from("./Resource/Final/StartScene/Start03.png");
    start3.scale.set(globalImageScale, globalImageScale);
    start3.zIndex = 1;
    scene0.addChild(start3);
    start3.x = -15;

    let start2 = new PIXI.Sprite.from("./Resource/Final/StartScene/Start02.png");
    start2.scale.set(globalImageScale, globalImageScale);
    start2.zIndex = 2;
    scene0.addChild(start2);
    start2.x = -5;

    let start1 = new PIXI.Sprite.from("./Resource/Final/StartScene/Start01.png");
    start1.scale.set(globalImageScale, globalImageScale);
    start1.zIndex = 3;
    scene0.addChild(start1);
    start1.y = -30;
    start1.x = 0;

    let start0 = new PIXI.Sprite.from("./Resource/Final/StartScene/Start00.png");
    start0.scale.set(globalImageScale, globalImageScale);
    start0.zIndex = 4;
    scene0.addChild(start0);
    start0.y = -30;

    let but2 = new PIXI.Sprite(PIXI.Texture.from("./Resource/Final/StartScene/StartBut02.png"));
    but2.width = 806.74;
    but2.height = 492.15;
    but2.zIndex = 10;
    scene0.addChild(but2);
    but2.y = -41;
    but2.x = 0;
    but2.visible = false;

    but2.interactive = true;
    but2.buttonMode = true;

    scene0_but = but2;

    /*  let but = new PIXI.Sprite.from("./Resource/Final/StartScene/StartBut02.png");
      but.width = start0.width * 1.1;
      but.height = start0.height * 1.1;
      but.zIndex = 10;
      but.visible = true;
      scene0.addChild(but);
      but.y = -42;
      but.x = -42;
  
      but.interactive = true;
      but.buttonMode = true;
  
      but.addListener("pointerdown", function () {
        but.visible = false;
        //EndThisScene();
      });*/

    but2.addListener("pointerdown", function () {
      //but.visible = true;
      //but.visible = false;

      onAssetsLoaded();

      //EndThisScene();
    });



  }

  //cat
  {
    let cat_frame = [PIXI.Texture.from("./Resource/Final/StartScene/cat0.png"),
    PIXI.Texture.from("./Resource/Final/StartScene/cat1.png"),
    PIXI.Texture.from("./Resource/Final/StartScene/cat2.png"),
    PIXI.Texture.from("./Resource/Final/StartScene/cat3.png")];

    let cat = new PIXI.AnimatedSprite(cat_frame);
    cat.animationSpeed = 0.25;
    cat.pivot.set(cat.width, 0);
    cat.test = false;
    cat.play();

    cat.scale.set(globalImageScale, globalImageScale);
    //1000->-200
    cat.zIndex = 3.5;
    cat.x = 1500;
    cat.y = 300;
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
    let runner_frame = [
      PIXI.Texture.from("./Resource/Final/runner/runnerR0.png"),
      PIXI.Texture.from("./Resource/Final/runner/runnerR1.png"),
      PIXI.Texture.from("./Resource/Final/runner/runnerR2.png"),
      PIXI.Texture.from("./Resource/Final/runner/runnerR3.png"),
      PIXI.Texture.from("./Resource/Final/runner/runnerR4.png"),
      PIXI.Texture.from("./Resource/Final/runner/runnerR5.png")];

    let runner = new PIXI.AnimatedSprite(runner_frame);
    runner.animationSpeed = 0.15;
    runner.pivot.set(0, 0);
    runner.test = false;
    runner.play();
    runner.scale.set(globalImageScale, globalImageScale);
    //1000->-200
    runner.zIndex = 2.5;
    runner.x = 0;
    runner.y = 124;
    scene0.addChild(runner);

    let counter = 0;
    scene0_tickerFunc.push(RunnerMove);
    function RunnerMove(deltaTime) {

      runner.x += 5;

      counter++;
      if (counter == 1) {
        runner.x = -200;
      }
      else if (counter == 200) {
        counter = 0;
      }

    }

    let runnerS_frame =
      [PIXI.Texture.from("./Resource/Final/runner/runnerRS0.png"),
      PIXI.Texture.from("./Resource/Final/runner/runnerRS1.png"),
      PIXI.Texture.from("./Resource/Final/runner/runnerRS2.png"),
      PIXI.Texture.from("./Resource/Final/runner/runnerRS3.png"),
      PIXI.Texture.from("./Resource/Final/runner/runnerRS4.png"),
      PIXI.Texture.from("./Resource/Final/runner/runnerRS5.png")];

    let runnerS = new PIXI.AnimatedSprite(runnerS_frame);
    runnerS.animationSpeed = 0.15;
    runnerS.pivot.set(0, 0);
    runnerS.play();
    //runnerS.scale.set(globalImageScale, globalImageScale);
    //1000->-200
    runnerS.zIndex = 2.5;
    //runnerS.x = 0;
    //runnerS.y = 124;
    runner.addChild(runnerS);



  }


  for (let i = 0; i < scene0_tickerFunc.length; i++) {
    app.ticker.add(scene0_tickerFunc[i]);
  }


  //resize();
}

async function ResetSetting() {
  scene0.visible = true;
  PIXI.sound.play('theme');
}

async function SetLoader() {


  await document.fonts.load('16px pixelFont');
  await document.fonts.load('8px pixelSilver');

  //音樂載入
  PIXI.sound.add('plot', './Resource/Music/mp3/plot.mp3');
  PIXI.sound.add('run1', './Resource/Music/mp3/run1.mp3');
  PIXI.sound.add('run2', './Resource/Music/mp3/run2.mp3');
  PIXI.sound.add('run3', './Resource/Music/mp3/run3.mp3');
  PIXI.sound.add('small_game1', './Resource/Music/mp3/small_game1.mp3');
  PIXI.sound.add('small_game2', './Resource/Music/mp3/small_game2.mp3');
  PIXI.sound.add('theme', './Resource/Music/mp3/theme.mp3');



  //團片載入
  await PIXI.loader.onComplete.add(finishHandler);

  PIXI.loader
    .add("slime", "./Resource/slimeSpriteSheet.json")
    .add("apple", "./Resource/apple.json")
    .add("statue", "./Resource/statue.png")
    .add("sight", "./Resource/sight.png")
    .add("textContent", "./Resource/textContent.json")
    .add("paper", "./Resource/paper.png")
    .add("video", "./Resource/video.webm")
    .add("white", "./Resource/White.png")
    .add("fade", "./Resource/Fade.png");

  //其他物件
  PIXI.loader.add("dialogBox", "./Resource/Final/dialogBox.png");
  PIXI.loader.add("arrow", "./Resource/Final/arrow.png");

  //可撿取物件
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 3; j++) {
      PIXI.loader.add("item" + i + "" + j, "./Resource/Final/item/item" + i + "" + j + ".png");
    }
  }

  //特殊物品(旭日章)
  PIXI.loader.add("spItem0", "./Resource/Final/item/spItem0.png");

  //半身像與人名
  for (let i = 0; i < 16; i++) {
    PIXI.loader.add("person" + i, "./Resource/Final/character/half/person" + i + ".png");
    PIXI.loader.add("name" + i, "./Resource/Final/character/name/name" + i + ".png");
  }

  //開頭的畫面
  for (let i = 0; i < 4; i++) {
    PIXI.loader.add("Start0" + i, "./Resource/Final/StartScene/Start0" + i + ".png");
  }
  for (let i = 0; i < 4; i++) {
    PIXI.loader.add("Cat" + i, "./Resource/Final/StartScene/cat" + i + ".png");
  }
  for (let i = 0; i < 3; i++) {
    PIXI.loader.add("StartBut0" + i, "./Resource/Final/StartScene/StartBut0" + i + ".png");
  }
  PIXI.loader.add("StartDialog", "./Resource/Final/StartScene/StartDialog.png");

  //飯店的畫面
  for (let i = 0; i < 3; i++) {
    PIXI.loader.add("Hotel0" + i, "./Resource/Final/HotelScene/hotel0" + i + ".png");
  }

  //結尾畫面
  for (let i = 0; i < 3; i++) {
    PIXI.loader.add("End" + i, "./Resource/Final/EndScene/End0" + i + ".png");
  }

  //跑步的人
  for (let i = 0; i < 6; i++) {
    PIXI.loader.add("runner" + i, "./Resource/Final/runner/runnerR" + i + ".png");
  }
  for (let i = 0; i < 6; i++) {
    PIXI.loader.add("runnerS" + i, "./Resource/Final/runner/runnerRS" + i + ".png");
  }


  //跑步1的場景背景
  for (let i = 0; i < 2; i++) {
    PIXI.loader.add("B1L0" + i, "./Resource/Final/B1/B1building/B1L0" + i + ".png");
    PIXI.loader.add("B1L1" + i, "./Resource/Final/B1/B1building/B1L1" + i + ".png");
    PIXI.loader.add("B1L2" + i, "./Resource/Final/B1/B1building/B1L2" + i + ".png");
  }
  PIXI.loader.add("B1L12", "./Resource/Final/B1/B1building/B1L12.png");
  PIXI.loader.add("B1L13", "./Resource/Final/B1/B1building/B1L13.png");
  PIXI.loader.add("B1Spe1", "./Resource/Final/B1/B1Spe1.png");
  //跑步2的場景背景
  for (let i = 0; i < 2; i++) {
    PIXI.loader.add("B2L0" + i, "./Resource/Final/B2/B2building/B2L0" + i + ".png");
    PIXI.loader.add("B2L1" + i, "./Resource/Final/B2/B2building/B2L1" + i + ".png");
    PIXI.loader.add("B2L2" + i, "./Resource/Final/B2/B2building/B2L2" + i + ".png");
  }
  PIXI.loader.add("B2L12", "./Resource/Final/B2/B2building/B2L12.png");
  PIXI.loader.add("B2L13", "./Resource/Final/B2/B2building/B2L13.png");
  PIXI.loader.add("B2Spe1", "./Resource/Final/B2/B2Spe1.png");
  //跑步3的場景背景
  for (let i = 0; i < 2; i++) {
    PIXI.loader.add("B3L0" + i, "./Resource/Final/B3/B3building/B3L0" + i + ".png");
    PIXI.loader.add("B3L1" + i, "./Resource/Final/B3/B3building/B3L1" + i + ".png");
    PIXI.loader.add("B3L2" + i, "./Resource/Final/B3/B3building/B3L2" + i + ".png");
  }
  PIXI.loader.add("B3L12", "./Resource/Final/B3/B3building/B3L12.png");
  PIXI.loader.add("B3Spe1", "./Resource/Final/B3/B3Spe1.png");

  //跑步1的選擇物件
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      PIXI.loader.add("B1S" + i + "" + j, "./Resource/Final/B1/B1select/B1S" + i + "" + j + ".png");
    }
  }
  //跑步2的選擇物件
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 2; j++) {
      PIXI.loader.add("B2S" + i + "" + j, "./Resource/Final/B2/B2select/B2S" + i + "" + j + ".png");
    }
  }
  PIXI.loader.add("B2S32", "./Resource/Final/B2/B2select/B2S32.png");
  //跑步3的選擇物件
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      PIXI.loader.add("B3S" + i + "" + j, "./Resource/Final/B3/B3select/B3S" + i + "" + j + ".png");
    }
  }

  //過廠對話1的人物場景
  PIXI.loader.add("B1C0", "./Resource/Final/character/full/B1PeopleA.png");
  PIXI.loader.add("B1C1", "./Resource/Final/character/full/B1PeopleB.png");
  PIXI.loader.add("B1C2", "./Resource/Final/character/full/B1PeopleC.png");

  for (var i = 0; i < 6; i++) {
    PIXI.loader.add("normalPeople" + i, "./Resource/Final/character/full/normal/normalPeople" + i + ".png");
  }

  //小遊戲1的場景背景/物件
  for (let i = 0; i < 10; i++) {
    PIXI.loader.add("M10" + i, "./Resource/Final/M1/M10" + i + ".png");
  }
  PIXI.loader.add("M110", "./Resource/Final/M1/M110.png");
  PIXI.loader.add("M111", "./Resource/Final/M1/M111.png");
  PIXI.loader.add("M112", "./Resource/Final/M1/M112.png");
  PIXI.loader.add("M113", "./Resource/Final/M1/M113.png");



  //小遊戲2 的場景背景/物件
  PIXI.loader.add("policeSmall", "./Resource/Final/M2/police.png");

  //結局畫面
  PIXI.loader.add("END1", "./Resource/Final/END1.png");
  PIXI.loader.add("END2", "./Resource/Final/END2.png");
  PIXI.loader.add("illustrated0", "./Resource/Final/Illustrated/illustrated0.png");

  //其他
  await PIXI.loader.add("block", "./Resource/Final/block.png");

  await PIXI.loader.add("VideoSelect", "./Resource/Final/Video/select.png");
  await PIXI.loader.add("VideoSelect2", "./Resource/Final/Video/select2.png");
  await PIXI.loader.add("VideoTitle", "./Resource/Final/Video/title.png");

  //結算
  //await PIXI.loader.onProgress.add(loadProgressHandler);
  //await loader.onComplete.add(onAssetsLoaded);
  //await loader.onComplete.add(testInit);
  x = 0;
  await PIXI.loader.onLoad.add(loadProgressHandler);
  await PIXI.loader.onComplete.add(finishHandler);

  await PIXI.loader.load();

  //載入結束時
  //PIXI.loader.on("progress", loadProgressHandler);


}

function finishHandler(loader, resource) {


  //onAssetsLoaded();
  scene0_but.visible = true;
  sceneLoading_scoreText.visible = false;
}

function loadProgressHandler(loader, resource) {



  // console.log(resource.name);
  // console.log(loader.progress.toFixed(2));

  //x++;
  //console.log(x);

  if (loader.progress.toFixed(2) > 99) {
    //等下打開
    // onAssetsLoaded();
    scene0_but.visible = true;
    sceneLoading_scoreText.visible = false;
  }
  else {
    sceneLoading_scoreText.text = "progress: " + loader.progress.toFixed(2) + "%";
    sceneLoading_scoreText2.text = "loading: " + resource.name;
  }

}

async function CreateLoadingText(loader, resource) {

  //padding可以處理字體顯示位置不正確的問題
  let style = new PIXI.TextStyle({
    fontFamily: "pixelFont",
    fontSize: 36,
    fill: "white",
    stroke: '#000000',
    strokeThickness: 5,
    letterSpacing: 0,
    padding: 10
    //dropShadow: true,
    //dropShadowColor: "#000000",
    //dropShadowBlur: 4,
    //dropShadowAngle: Math.PI / 6,
    //dropShadowDistance: 6,
  });

  sceneLoading = new PIXI.Container();
  sceneLoading.zIndex = 250;
  app.stage.addChild(sceneLoading);

  sceneLoading_scoreText = new PIXI.Text("0", style);
  sceneLoading_scoreText.position.set(screenWidth / 2 - 130, screenHeight / 2 + 65);
  sceneLoading_scoreText.visible = true;

  sceneLoading_scoreText2 = new PIXI.Text("0", style);
  sceneLoading_scoreText2.position.set(screenWidth / 2 - 150, screenHeight / 2 + 50);
  sceneLoading_scoreText2.visible = true;

  sceneLoading.addChild(sceneLoading_scoreText);
  //sceneLoading.addChild(sceneLoading_scoreText2);


}

async function onAssetsLoaded() {

  sceneLoading_scoreText.text = "Progress: " + 100 + " %";
  sceneLoading_scoreText2.text = "Loading: " + "Finish";


  let clickBox = new PIXI.Graphics();
  clickBox.beginFill(0xFFFFFF)
    .drawRect(0, 0, screenWidth, screenHeight)
    .endFill();
  clickBox.visible = true;
  clickBox.alpha = 0;
  clickBox.interactive = true;
  clickBox.buttonMode = true;

  clickBox.addListener("pointerdown", async function () {

    //測試時關閉
    //
    //EndThisScene();
  });
  sceneLoading.addChild(clickBox);

  //暫時關閉
  EndThisScene();
  screenfull.request();

  /*
    let key_Q = keyboard(81);
    key_Q.press = () => {
      key_Q.press = null;
      EndThisScene();
    };*/
}

function testInit() {

  sceneLoading_scoreText.text = "Progress: 100 %";
  sceneLoading_scoreText2.text = "Loading: Finish";
}

async function EndThisScene() {

  //設置好畫面和中央變數後，重新調整螢幕大小
  //await full();
  //await resize();

  await CreateCenterComponent();
  sceneLoading.visible = false;
  //openFullscreen();

  for (let i = 0; i < scene0_keyGroup.length; i++) {
    scene0_keyGroup[i].press = null;
  }

  for (let i = 0; i < scene0_tickerFunc.length; i++) {
    app.ticker.remove(scene0_tickerFunc[i]);
  }



  EndingFadeFunc(scene0, 'theme');
  //GoToNextScene();


}







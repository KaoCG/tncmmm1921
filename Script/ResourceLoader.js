
(async () => {

  //設定畫面底色與相關設定

  app = new PIXI.Application({
    autoResize: true,
    width: screenWidth,
    height: screenHeight,
    //height: screenWidth * globalScale,
    //width : screenHeight * globalScale,
    resolution: devicePixelRatio
  });

  //上下填補畫面
  {
    blackrectangleA = new PIXI.Graphics();
    blackrectangleA.beginFill(0x000000);
    blackrectangleA.drawRect(0, 0, 1, 1);
    blackrectangleA.endFill();
    blackrectangleA.zIndex = 200;
    blackrectangleA.alpha = 1;
    app.stage.addChild(blackrectangleA);

    blackrectangleB = new PIXI.Graphics();
    blackrectangleB.beginFill(0x000000);
    blackrectangleB.drawRect(0, 0, 1, 1);
    blackrectangleB.endFill();
    blackrectangleB.zIndex = 200;
    blackrectangleB.alpha = 1;
    app.stage.addChild(blackrectangleB);
  }

  await resize();
  window.addEventListener('resize', resize);

  //app.renderer.resize( screenHeight* globalScale,  screenWidth* globalScale);

  app.renderer.backgroundColor = 0x000000;
  document.getElementById("display").appendChild(app.view);
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

  await document.fonts.load('16px pixelFont');
  await document.fonts.load('16px pixelSilver');

  await CreateLoadingText();

  const loader = new PIXI.Loader();

  PIXI.loader
    .add("slime", "./Resource/slimeSpriteSheet.json")
    .add("apple", "./Resource/apple.json")
    //.add("tree", "./Resource/tree2.png")
    //.add("bg", "./Resource/bg_low.png")
    .add("statue", "./Resource/statue.png")
    //.add("book", "./Resource/book.png")
    //.add("bookMark", "./Resource/bookmark.png")
    .add("sight", "./Resource/sight.png")
    .add("textContent", "./Resource/textContent.json")
    .add("paper", "./Resource/paper.png")
    //.add("building0", "./Resource/Final/building0.png")
    //.add("table0", "./Resource/Final/table0.png")
    .add("video", "./Resource/video.webm")
    .add("white", "./Resource/White.png")
    .add("fade", "./Resource/Fade.png");

  //可撿取物件
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 3; j++) {
      PIXI.loader.add("item" + i + "" + j, "./Resource/Final/item/item" + i + "" + j + ".png");
    }
  }
  PIXI.loader.add("spItem0", "./Resource/Final/item/spItem0.png");

  //半身像與人名
  for (let i = 0; i < 10; i++) {
    PIXI.loader.add("person" + i, "./Resource/Final/character/half/person" + i + ".png");
  }
  PIXI.loader.add("person10", "./Resource/Final/character/half/person10.png");

  //開頭的畫面
  for (let i = 0; i < 4; i++) {
    PIXI.loader.add("Start0" + i, "./Resource/Final/StartScene/Start0" + i + ".png");
  }
  for (let i = 0; i < 4; i++) {
    PIXI.loader.add("Cat" + i, "./Resource/Final/StartScene/cat" + i + ".png");
  }
  for (let i = 0; i < 2; i++) {
    PIXI.loader.add("StartBut0" + i, "./Resource/Final/StartScene/StartBut0" + i + ".png");
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

  //跑步1的選擇物件
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 2; j++) {
      PIXI.loader.add("B1S" + i + "" + j, "./Resource/Final/B1/B1select/B1S" + i + "" + j + ".png");
    }
  }

  //跑步1的場景背景
  for (let i = 0; i < 2; i++) {
    PIXI.loader.add("B1L0" + i, "./Resource/Final/B1/B1building/B1L0" + i + ".png");
    PIXI.loader.add("B1L1" + i, "./Resource/Final/B1/B1building/B1L1" + i + ".png");
    PIXI.loader.add("B1L2" + i, "./Resource/Final/B1/B1building/B1L2" + i + ".png");
  }
  PIXI.loader.add("B1L12", "./Resource/Final/B1/B1building/B1L12.png");
  PIXI.loader.add("B1L13", "./Resource/Final/B1/B1building/B1L13.png");

  //過廠對話1的人物場景
  PIXI.loader.add("B1C0", "./Resource/Final/character/full/B1PeopleA.png");
  PIXI.loader.add("B1C1", "./Resource/Final/character/full/B1PeopleB.png");
  PIXI.loader.add("B1C2", "./Resource/Final/character/full/B1PeopleC.png");
  PIXI.loader.add("B1Spe1", "./Resource/Final/B1/B1Spe1.png");

  //小遊戲1的場景背景/物件
  for (let i = 0; i < 10; i++) {
    PIXI.loader.add("M10" + i, "./Resource/Final/M1/M10" + i + ".png");
  }
  PIXI.loader.add("M110", "./Resource/Final/M1/M110.png");
  PIXI.loader.add("M111", "./Resource/Final/M1/M111.png");
  PIXI.loader.add("M112", "./Resource/Final/M1/M112.png");
  PIXI.loader.add("M113", "./Resource/Final/M1/M113.png");

  //跑步2的選擇物件
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 2; j++) {
      PIXI.loader.add("B2S" + i + "" + j, "./Resource/Final/B2/B2select/B2S" + i + "" + j + ".png");
    }
  }
  PIXI.loader.add("B2S32", "./Resource/Final/B2/B2select/B2S32.png");

  //跑步2的場景背景
  for (let i = 0; i < 2; i++) {
    PIXI.loader.add("B2L0" + i, "./Resource/Final/B2/B2building/B2L0" + i + ".png");
    PIXI.loader.add("B2L1" + i, "./Resource/Final/B2/B2building/B2L1" + i + ".png");
    PIXI.loader.add("B2L2" + i, "./Resource/Final/B2/B2building/B2L2" + i + ".png");
  }
  PIXI.loader.add("B2L12", "./Resource/Final/B2/B2building/B2L12.png");
  PIXI.loader.add("B2L13", "./Resource/Final/B2/B2building/B2L13.png");

  //結局畫面
  PIXI.loader.add("END1", "./Resource/Final/END1.png");
  PIXI.loader.add("END2", "./Resource/Final/END2.png");



  //其他
  await PIXI.loader.add("block", "./Resource/Final/block.png");

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


})();

function finishHandler(loader, resource) {

  onAssetsLoaded();

}

function loadProgressHandler(loader, resource) {



   console.log(resource.name);
   console.log(loader.progress.toFixed(2));

  //x++;
  //console.log(x);

  if (loader.progress.toFixed(2) > 99) {
    onAssetsLoaded();
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
  sceneLoading_scoreText.position.set(screenWidth / 2 - 150, screenHeight / 2 - 50);
  sceneLoading_scoreText.visible = true;

  sceneLoading_scoreText2 = new PIXI.Text("0", style);
  sceneLoading_scoreText2.position.set(screenWidth / 2 - 150, screenHeight / 2 + 50);
  sceneLoading_scoreText2.visible = true;

  sceneLoading.addChild(sceneLoading_scoreText);
  sceneLoading.addChild(sceneLoading_scoreText2);

}

async function onAssetsLoaded() {

  sceneLoading_scoreText.text = "Progress: " + 08300315 + " %";
  sceneLoading_scoreText2.text = "Loading: " + "Finish";

  //console.log("END");

  let clickBox = new PIXI.Graphics();
  clickBox.beginFill(0xFFFFFF)
    .drawRect(0, 0, screenWidth, screenHeight)
    .endFill();
  clickBox.visible = true;
  clickBox.alpha = 0;
  clickBox.interactive = true;
  clickBox.buttonMode = true;

  clickBox.addListener("pointerdown", async function () {
    EndThisScene();
  });
  sceneLoading.addChild(clickBox);

  //暫時關閉
  //EndThisScene();

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
  GoToNextScene();
}








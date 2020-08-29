
//過廠走跳關卡

LoadScene1();

async function LoadScene1() {

  if (centerComponent.sceneExist[1] == false) {

    console.log("Create Scene 1");

    centerComponent.sceneExist[1] = true;
    await SetContainer();
    await LoadSetting();
    await SetObject();
    await GameFunction();

  }

  ResetSetting();

}

//重置設定(改數字改這裡就好)
async function ResetSetting() {

  scene1.visible = true;

  // scene1.scale.set(0.3,0.3);
  // scene1.position.set(0,0);

  scene1_slime.position.set(135, 340);


  //需要重新設定的參數
  {
    scene1_score = 0;
    scene1_energy = 0;
    scene1_energyBar.width = 0;
    addEnergy(250);

    scene1_slimeInitY = scene1_slime.position.y;
    scene1_slimeJumpInitSpeed = 14;
    scene1_slimeJumpSpeed = 0;
    scene1_slimeGravity = 0.8;
    scene1_slimeJumping = false;

    //畫面移動
    scene1_movingDistant = 0;
    scene1_movingSpeed = 4.5;
    scene1_movingPauseTimer = 0;

    //物件的位置
    scene1_itemFrame = 0;
    scene1_SPBGAccuDistant = 0;

    //史萊姆碰觸相關
    scene1_appleTimer = 0;
    scene1_appleCounter = 0;

    //隨機產生可碰觸的物件
    scene1_randomAddItemTimer = 0;
    scene1_randomAddItemTimeLimit = 50;

    //時間倒數
    scene1_stageTimer = 40;
    scene1_countDownTimer = 0;
    scene1_countDownTick = PIXI.settings.TARGET_FPMS * 1000;

  }

  for (let i = 0; i < scene1_selectableGroup.length; i++) {

    scene1_selectableGroup[i].activate = true;
    scene1_selectableGroup[i].text.visible = true;
  }
  //scene1_selectableGroup[0].x = 2400;
  //scene1_selectableGroup[1].x = 4100;
  //scene1_selectableGroup[2].x = 9450;
  //scene1_selectableGroup[3].x = 14530;
  //scene1_selectableGroup[4].x = 18150;
  scene1_selectableGroup[0].x = 3870;
  scene1_selectableGroup[1].x = 7600;
  scene1_selectableGroup[2].x = 9500;
  scene1_selectableGroup[3].x = 4500;
  scene1_selectableGroup[4].x = 2000;

  //分層背景
  for (let i = 0; i < scene1_BGObjectGroup.length; i++) {

    scene1_BGObjectGroup[i].x = scene1_BGObjectGroup[i].width * scene1_BGObjectGroup[i].index;
  }

  switch (centerComponent.currentStage) {
    case 4:
      for (let i = 0; i < 4; i++) {
        scene1_BGObjectGroup[i * 3].texture = PIXI.Texture.from("B1L0" + (i % 2));

        scene1_BGObjectGroup[i * 3 + 1].texture = PIXI.Texture.from("B1L1" + (i));

        scene1_BGObjectGroup[i * 3 + 2].texture = PIXI.Texture.from("B1L2" + (i % 2));
      }
      break;
    case 8:
      for (let i = 0; i < 4; i++) {
        scene1_BGObjectGroup[i * 3].texture = PIXI.Texture.from("B2L0" + (i % 2));

        scene1_BGObjectGroup[i * 3 + 1].texture = PIXI.Texture.from("B2L1" + (i));

        scene1_BGObjectGroup[i * 3 + 2].texture = PIXI.Texture.from("B2L2" + (i % 2));
      }
      break;
  }

  //特殊背景
  for (let i = 0; i < scene1_SPBGObjectGroup.length; i++) {

    scene1_SPBGObjectGroup[i].x = scene1_SPBGAccuDistant;
    scene1_SPBGAccuDistant += scene1_SPBGObjectGroup[i].width;
  }

  for (let i = 0; i < scene1_grassGroup.length; i++) {
    //console.log(i * scene1_grassGroup[i].Instance.width);

    scene1_grassGroup[i].position.set(i * scene1_grassGroup[i].Instance.width, 200);
  }

  for (let i = 0; i < scene1_tickerFunc.length; i++) {
    app.ticker.add(scene1_tickerFunc[i]);
  }

  for (let i = 0; i < scene1_keyGroup.length; i++) {
    scene1_keyGroup[i].press = scene1_keyFuncroup[i];
  }

  for (var i = scene1_itemGroup.length - 1; i >= 0; i--) {
    //把物件移到池中

    RecycleItem(scene1_itemGroup, i);

  }

  scene1_movingBoard.position.set(0, 0);


  StartingFadeFunc();
}

//設定容器
function SetContainer() {
  app.renderer.backgroundColor = 0x30BCED;

  scene1 = new PIXI.Container();
  scene1.sortableChildren = true;
  app.stage.addChild(scene1);

  //scene1.scale.set(0.2,0.2);
  //scene1.rotation = Math.PI/2;
  //scene1.x += 400;
  //scene1.y -= 100;

  {
    scene1_gameBoard = new PIXI.Container();
    scene1.addChild(scene1_gameBoard);
    scene1_gameBoard.scale.set(1);
    scene1_gameBoard.sortableChildren = true;

    scene1_slime = new PIXI.Container();
    scene1_slime.zIndex = -4;
    scene1_slime.sortableChildren = true;
    scene1_gameBoard.addChild(scene1_slime);

    scene1.scene1_slime = scene1_slime;

    scene1_runner = new PIXI.Container();
    scene1_runner.zIndex = -4;
    scene1_runner.sortableChildren = true;
    scene1_gameBoard.addChild(scene1_runner);

    scene1.scene1_slime = scene1_runner;

  }


  {
    scene1_movingBoard = new PIXI.Container();
    scene1_movingBoard.zIndex = -5;
    scene1_movingBoard.sortableChildren = true;
    scene1_gameBoard.addChild(scene1_movingBoard);

    scene1.scene1_movingBoard = scene1_movingBoard;

    scene1_grassBoard = new PIXI.Container();
    scene1_grassBoard.zIndex = -6;
    scene1_grassBoard.sortableChildren = true;
    scene1_movingBoard.addChild(scene1_grassBoard);

    scene1_BGContainer = new PIXI.Container();
    scene1_BGContainer.zIndex = -3;
    scene1_BGContainer.sortableChildren = true;
    scene1_movingBoard.addChild(scene1_BGContainer);

    scene1_selectableBoard = new PIXI.Container();
    scene1_selectableBoard.zIndex = -1;
    scene1_selectableBoard.sortableChildren = true;
    scene1_movingBoard.addChild(scene1_selectableBoard);

    scene1_itemBoard = new PIXI.Container();
    scene1_itemBoard.zIndex = 0;
    scene1_itemBoard.sortableChildren = true;
    scene1_movingBoard.addChild(scene1_itemBoard);

    scene1.scene1_itemBoard = scene1_itemBoard;

  }

  {
    scene1_uIBoard = new PIXI.Container();
    scene1_gameBoard.addChild(scene1_uIBoard);
    scene1_uIBoard.zIndex = 100;
    scene1_uIBoard.sortableChildren = true;

    scene1.scene1_uIBoard = scene1_uIBoard;

  }

  {
    scene1_prepareBoard = new PIXI.Container();
    scene1_gameBoard.addChild(scene1_prepareBoard);
    scene1_prepareBoard.visible = false;

    scene1.scene1_prepareBoard = scene1_prepareBoard;
  }

  scene1_BGContainerA = new PIXI.Container();
  scene1_BGContainerA.zIndex = -3;
  scene1_BGContainerA.sortableChildren = true;
  scene1_gameBoard.addChild(scene1_BGContainerA);

  scene1_BGContainerB = new PIXI.Container();
  scene1_BGContainerB.zIndex = -9;
  scene1_BGContainerB.sortableChildren = true;
  scene1_gameBoard.addChild(scene1_BGContainerB);

  scene1_BGContainerC = new PIXI.Container();
  scene1_BGContainerC.zIndex = -10;
  scene1_BGContainerC.sortableChildren = true;
  scene1_gameBoard.addChild(scene1_BGContainerC);

}

//設定變數起始值
function LoadSetting() {

  //需要紀錄的
  {
    //雕像

    scene1_energyBar = null;
    scene1_bottomDetectLine = null;

    scene1_itemGroup = [];
    scene1_BGObjectGroup = [];
    scene1_SPBGObjectGroup = [];
    scene1_grassGroup = [];
    scene1_prepareItemGroup = [];
    scene1_selectableGroup = [];
    scene1_tickerFunc = [];
    scene1_keyGroup = [];
    scene1_keyFuncroup = [];
    scene1_uiGroup = [];
    scene1_buttonGroup = [];

    scene1_appleTextures = [];
    for (var i = 0; i < 4; i++) {
      scene1_appleTextures.push(PIXI.Texture.from("appleP" + (i + 1) + ".png"));
    }

    var slimeTextures = [];
    for (var f = 1; f < 80; f++) {
      var str;
      if (f < 10) str = "0" + (f);
      else str = (f);
      let resource = PIXI.Texture.from("slime_sheet_" + str + ".gif");
      slimeTextures.push(resource);
    }

    scene1_itemTextures = [];
    for (var f = 0; f < 9; f++) {
      for (var j = 0; j < 3; j++) {
        let resource = PIXI.Texture.from("item" + f + "" + j);
        scene1_itemTextures.push(resource);
      }

    }


    scene1_frames = []; {
      scene1_frames.push(PIXI.Texture.from("slime_sheet_01.gif"));
      scene1_frames.push(PIXI.Texture.from("slime_sheet_02.gif"));
      scene1_frames.push(PIXI.Texture.from("slime_sheet_05.gif"));
      scene1_frames.push(PIXI.Texture.from("slime_sheet_04.gif"));
      scene1_frames.push(PIXI.Texture.from("slime_sheet_03.gif"));
      scene1_frames.push(PIXI.Texture.from("slime_sheet_05.gif"));
      scene1_frames.push(PIXI.Texture.from("slime_sheet_02.gif"));
      scene1_frames.push(PIXI.Texture.from("slime_sheet_01.gif"));
    }

  }

  //需要重新設定的
  {

    scene1_energy = 0;

    scene1_slimeInitY = 0;
    scene1_slimeJumpInitSpeed = 14;
    scene1_slimeJumpSpeed = 0;
    scene1_slimeGravity = 0.8;
    scene1_slimeJumping = false;

    //畫面移動
    scene1_movingDistant = 0;
    scene1_movingSpeed = 5;
    scene1_movingPauseTimer = 0;

    //物件的位置
    scene1_SPBGAccuDistant = 0;

    //史萊姆碰觸相關
    scene1_appleTimer = 0;
    scene1_appleCounter = 0;

    //隨機產生可碰觸的物件
    scene1_randomAddItemTimer = 0;
    scene1_randomAddItemTimeLimit = 50;

    //時間倒數
    scene1_stageTimer = 20;
    scene1_countDownTimer = 0;
    scene1_countDownTick = PIXI.settings.TARGET_FPMS * 1000;

  }

}

//動畫製作
function SetObject() {

  //史萊姆Sprite
  {
    scene1_slime.position.set(135, 340);
    scene1_slimeInitY = scene1_slime.position.y;

    let slimeInstance = new PIXI.AnimatedSprite(scene1_frames);
    slimeInstance.animationSpeed = 0.65 * 0.2;
    //slimeInstance.position.set(150, 302.5);

    slimeInstance.pivot.set(0, 0);
    slimeInstance.play();
    slimeInstance.width = 150;
    slimeInstance.height = 150;
    slimeInstance.zIndex = 3;

    scene1_slime.addChild(slimeInstance);
    scene1_slime.slimeInstance = slimeInstance;

    //一定要畫在0,0，再去條位置，用getGlobalPosition才能正確讀取。
    /*let slimeDetectBox = new PIXI.Graphics();
    slimeDetectBox.lineStyle(0, 0x82cd2e, 1);
    slimeDetectBox.beginFill(0x704828);
    slimeDetectBox.drawRect(0, 0, slimeInstance.width * 0.3, slimeInstance.height * 0.3);
    slimeDetectBox.endFill();
    //slimeDetectBox.position.set(slimeInstance.getGlobalPosition().x - slimeInstance.width / 2 + slimeInstance.width * 0.7 / 2, slimeInstance.getGlobalPosition().y - slimeInstance.height / 2 + slimeInstance.height * 0.7 / 2);
    slimeDetectBox.position.set(-slimeInstance.width * 0.15, -slimeInstance.height * 0.15);
    slimeDetectBox.zIndex = 100;
    slimeDetectBox.visible = false;
    scene1_slime.addChild(slimeDetectBox);
    scene1_slime.detectArea = slimeDetectBox;*/

    scene1_slime.visible = false;

  }

  //樹木Sprite
  {
    /*
        for (var i = 0; i < 16; i++) {
          let treeInstance = new PIXI.Sprite(PIXI.Texture.from("tree"));
          treeInstance.width = 200;
          treeInstance.height = 200;
          treeInstance.position.set(screenWidth * i / 12 * 1.5, Math.random() * 60);
          treeInstance.zIndex = -100 + treeInstance.y;
          treeInstance.x -= 100;
          treeInstance.y += 65;
    
          scene1_BGObjectGroup.push(treeInstance);
          scene1_BGContainer.addChild(treeInstance);
    
          //一定要畫在0,0，再去條位置，用getGlobalPosition才能正確讀取。
          let treeDetectBox = new PIXI.Graphics();
          treeDetectBox.lineStyle(0, 0x82cd2e, 1);
          treeDetectBox.beginFill(0x700028);
          treeDetectBox.drawRect(0, 0, treeInstance.width * 0.6, treeInstance.height * 0.6);
          treeDetectBox.endFill();
          treeDetectBox.zIndex = 100;
          treeDetectBox.visible = false;
          treeDetectBox.position.set(treeInstance.width * 0.1, treeInstance.height * 0.2);
    
          treeInstance.addChild(treeDetectBox);
          treeInstance.detectArea = treeDetectBox;
    
        }
        for (var i = 0; i < 15; i++) {
          let treeInstance = new PIXI.Sprite(PIXI.Texture.from("tree"));
    
          treeInstance.width = 200;
          treeInstance.height = 200;
          treeInstance.position.set(Math.random() * screenWidth * 1.5, Math.floor(Math.random() * 60));
          treeInstance.zIndex = -100 + treeInstance.y;
          treeInstance.x -= 100;
          treeInstance.y += 65;
          scene1_BGObjectGroup.push(treeInstance);
          scene1_BGContainer.addChild(treeInstance);
    
          let treeDetectBox = new PIXI.Graphics();
          treeDetectBox.lineStyle(0, 0x82cd2e, 1);
          treeDetectBox.beginFill(0x700028);
          treeDetectBox.drawRect(0, 0, treeInstance.width * 0.6, treeInstance.height * 0.6);
          treeDetectBox.endFill();
          treeDetectBox.zIndex = 100;
          treeDetectBox.visible = false;
          treeDetectBox.position.set(treeInstance.width * 0.1, treeInstance.height * 0.2);
    
          treeInstance.addChild(treeDetectBox);
          treeInstance.detectArea = treeDetectBox;
        }
    */
  }

  //背景色塊
  {
    /* let rectangle2 = new PIXI.Graphics();
     rectangle2.beginFill(0x5aa05a);
     rectangle2.drawRect(-5, 220, 900, 150);
     rectangle2.endFill();
     rectangle2.zIndex = -201;
     scene1_grassBoard.addChild(rectangle2);

     let rectangle = new PIXI.Graphics();
     rectangle.lineStyle(15, 0x82cd2e, 1);
     rectangle.beginFill(0x704828);
     rectangle.drawRect(-5, 260, 900, 450);
     rectangle.endFill();
     rectangle.zIndex = -2;
     scene1_grassBoard.addChild(rectangle);
     //scene1_grassBoard.mask = rectangle;*/
  }

  //草地Sprite
  {
    /*
        for (var i = 0; i < 6; i++) {
    
          let grass = new PIXI.Container();
          grass.activate = true;
    
          let grassInstance = new PIXI.Sprite(PIXI.Texture.from("bg"));
          grassInstance.zIndex = -300;
          grassInstance.scale.set(0.2, 0.2);
    
          grass.position.set(i * grassInstance.width, 200);
    
          grass.Instance = grassInstance;
          scene1_grassBoard.addChild(grass);
          grass.addChild(grassInstance);
    
          let grassDetectBox = new PIXI.Graphics();
          grassDetectBox.lineStyle(0, 0x82cd2e, 1);
          grassDetectBox.beginFill(0x700028);
          grassDetectBox.drawRect(0, 0, grassInstance.width * 0.6, grassInstance.height * 0.6);
          grassDetectBox.endFill();
          grassDetectBox.zIndex = 100;
          grassDetectBox.visible = false;
          grassDetectBox.position.set(0, 0);
    
          scene1_grassGroup.push(grass);
          scene1_grassGroup[i].addChild(grassDetectBox);
          scene1_grassGroup[i].detectArea = grassDetectBox;
    
        }
        */
  }

  //蘋果Sprite
  {
    {
      CreateItem(createInPool = false, name = 0);
      for (let i = 0; i < 8; i++) {
        CreateItem(createInPool = true, name = (i + 1));
      }
    }
  }

  //雕像Sprite
  {
    {
      /* let statue = new PIXI.Container();
       statue.no = 0;
       statue.activate = true;
       statue.zIndex = 1.5;
       statue.sortableChildren = true;
       statue.position.set(500, 260);
 
       let statueInstance = new PIXI.Sprite(PIXI.Texture.from("statue"));
       statueInstance.width = 50;
       statueInstance.height = 50;
 
       statueInstance.pivot.set(0.5, 0.5);
       statueInstance.scale.set(2, 2);
 
       //一定要畫在0,0，再去條位置，用getGlobalPosition才能正確讀取。
       let statueDetectBox = new PIXI.Graphics();
       statueDetectBox.lineStyle(0, 0x82cd2e, 1);
       statueDetectBox.beginFill(0x700028);
       statueDetectBox.drawRect(0, 0, statueInstance.width, statueInstance.height);
       statueDetectBox.endFill();
       statueDetectBox.alpha = 0.5;
       statueDetectBox.visible = false;
       statueDetectBox.position.set(0, statueInstance.height * 0.9);
 
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
       let chooseText = new PIXI.Text("choose", style);
       chooseText.position.set(statueInstance.width * -0.35, -42);
       chooseText.visible = true;
 
 
       scene1_selectableBoard.addChild(statue);
       statue.addChild(statueDetectBox);
       statue.addChild(statueInstance);
       statue.addChild(chooseText);
 
       statue.detectArea = statueDetectBox;
       statue.statueInstance = statueInstance;
       statue.text = chooseText;
 
       statue.id = 0;
       scene1_selectableGroup.push(statue);*/
    }
  }

  //桌子
  {
    /* let table = new PIXI.Container();
     table.position.set(900, 100);
     table.activate = true;
     table.zIndex = 1;
 
     let tableframes = [PIXI.Texture.from("B1S00"), PIXI.Texture.from("B1S01")];
 
     let tableInstance = new PIXI.AnimatedSprite(tableframes);
     tableInstance.scale.set(globalImageScale,globalImageScale);
     tableInstance.animationSpeed = 0.05;
     tableInstance.play();
 
     let tableDetectBox = new PIXI.Graphics();
     tableDetectBox.beginFill(0x700028).drawRect(0, 0, tableInstance.width * 0.6, tableInstance.height * 0.4).endFill();
     tableDetectBox.visible = true;
     tableDetectBox.position.set(tableInstance.width *0.2, tableInstance.height * 0.8);
 
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
     let chooseText = new PIXI.Text("choose", style);
     chooseText.position.set(tableInstance.width * 0.28, -15);
     chooseText.visible = true;
 
     scene1_selectableBoard.addChild(table);
     table.addChild(tableInstance);
     table.addChild(tableDetectBox);
     table.addChild(chooseText);
 
     table.instance = tableInstance;
     table.detectArea = tableDetectBox;
     table.text = chooseText;
 
     table.id = 1;
     scene1_selectableGroup.push(table);*/
  }

  //底部偵測區
  {

    scene1_bottomDetectLine = new PIXI.Container();

    scene1.addChild(scene1_bottomDetectLine);

    let bottomDetect = new PIXI.Graphics();
    bottomDetect.lineStyle(0, 0x82cd2e, 1);
    bottomDetect.beginFill(0x700028);
    bottomDetect.drawRect(0, 0, 10, screenHeight);
    bottomDetect.endFill();
    bottomDetect.zIndex = 100;
    bottomDetect.visible = true;
    bottomDetect.position.set(-400, screenHeight / 2);

    scene1_bottomDetectLine.addChild(bottomDetect);
    scene1_bottomDetectLine.detectArea = bottomDetect;


  }

  //UI

  (async () => {

    //右上角的分數
    {
      let scoreUI = new PIXI.Container();
      scoreUI.no = 0;
      scoreUI.activate = true;
      scoreUI.zIndex = 2;
      scoreUI.sortableChildren = true;

      scene1_uiGroup.push(scoreUI);
      scene1_uIBoard.addChild(scoreUI);

      /*let scoreUIInstance = new PIXI.Sprite(scene1_appleTextures[3]);

      scoreUIInstance.width = 40;
      scoreUIInstance.height = 40;

      scoreUIInstance.pivot.set(0.5, 0.5);      
      scoreUI.addChild(scoreUIInstance);*/

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

      let scoreText = new PIXI.Text("0", style);
      scoreUI.addChild(scoreText);
      scoreText.position.set(45, 5);
      scoreText.visible = true;
      scoreUI.text = scoreText;

      scoreUI.visible = false;
      scoreUI.position.set(screenWidth - 45 - scoreUI.text.width - 15, 10);
    }

    //右上角的時間
    {
      let timeUI = new PIXI.Container();
      timeUI.no = 0;
      timeUI.activate = true;
      timeUI.zIndex = 2;
      timeUI.sortableChildren = true;

      scene1_uiGroup.push(timeUI);

      //padding可以處理字體顯示位置不正確的問題
      let style = new PIXI.TextStyle({
        fontFamily: "pixelFont",
        fontSize: 36,
        fill: "white",
        stroke: '#000000',
        strokeThickness: 5,
        letterSpacing: 0,
        padding: 10
      });
      let timeText = new PIXI.Text(scene1_stageTimer, style);
      timeText.position.set(45, 55);
      timeText.visible = true;

      scene1_uIBoard.addChild(timeUI);
      timeUI.addChild(timeText);

      timeUI.text = timeText;

      timeUI.position.set(screenWidth - 45 - timeUI.text.width - 15, 10);
    }

    let buttonBoxSize = [115, 68];
    let buttonBoxEdgeDistant = [18, 15];

    //點擊UI
    {
      let clickBox = new PIXI.Graphics();
      clickBox.beginFill(0xFFFFFF);
      clickBox.drawRect(0, 0, buttonBoxSize[0], buttonBoxSize[1]);
      clickBox.x = screenWidth - buttonBoxSize[0] - buttonBoxEdgeDistant[0];
      clickBox.y = screenHeight - buttonBoxSize[1] - buttonBoxEdgeDistant[1];
      clickBox.endFill();
      clickBox.zIndex = 0;
      clickBox.visible = true;
      clickBox.alpha = 0.8;
      scene1_uIBoard.addChild(clickBox);

      scene1_buttonGroup.push(clickBox);

      clickBox.interactive = true;
      clickBox.buttonMode = true;

      //padding可以處理字體顯示位置不正確的問題
      let style = new PIXI.TextStyle({
        fontFamily: "pixelFont",
        fontSize: 36,
        fill: "white",
        stroke: '#000000',
        strokeThickness: 5,
        letterSpacing: 0,
        align: "center",
        padding: 10
        //dropShadow: true,
        //dropShadowColor: "#000000",
        //dropShadowBlur: 4,
        //dropShadowAngle: Math.PI / 6,
        //dropShadowDistance: 6,
      });
      let clickBoxText = new PIXI.Text("跳躍", style);
      clickBox.addChild(clickBoxText);
      clickBoxText.position
        .set(buttonBoxSize[0] / 2 - clickBoxText.width / 2,
          buttonBoxSize[1] / 2 - clickBoxText.height / 2 + 1);
      clickBoxText.visible = true;
    }

    //選擇UI
    {
      let selectBox = new PIXI.Graphics();
      selectBox.beginFill(0xFFFFFF);
      selectBox.drawRect(
        0,
        0,
        buttonBoxSize[0],
        buttonBoxSize[1]);
      selectBox.x = screenWidth - (buttonBoxSize[0] + buttonBoxEdgeDistant[0]) * 2;
      selectBox.y = screenHeight - (buttonBoxSize[1] + buttonBoxEdgeDistant[1]);
      selectBox.endFill();
      selectBox.zIndex = 0;
      selectBox.visible = true;
      selectBox.alpha = 0.8;
      scene1_uIBoard.addChild(selectBox);

      scene1_buttonGroup.push(selectBox);

      selectBox.interactive = true;
      selectBox.buttonMode = true;

      //padding可以處理字體顯示位置不正確的問題
      let style = new PIXI.TextStyle({
        fontFamily: "pixelFont",
        fontSize: 36,
        fill: "white",
        stroke: '#000000',
        strokeThickness: 5,
        letterSpacing: 0,
        align: "center",
        padding: 10
        //dropShadow: true,
        //dropShadowColor: "#000000",
        //dropShadowBlur: 4,
        //dropShadowAngle: Math.PI / 6,
        //dropShadowDistance: 6,
      });
      let selectBoxText = new PIXI.Text("選擇", style);
      selectBox.addChild(selectBoxText);
      selectBoxText.position
        .set(buttonBoxSize[0] / 2 - selectBoxText.width / 2,
          buttonBoxSize[1] / 2 - selectBoxText.height / 2 + 1);
      selectBoxText.visible = true;
    }

    let barSize = [115, 30];
    let barEdgeDistant = [12, 15];



    //drawRect的圖案尺寸調整，其實是用scale的方式達成，
    //因此初始長度為0的話，就無法調整了~ (因為0乘以多少都是0)

    //能量條(和其遮罩)
    {
      let barContainer = new PIXI.Container();
      scene1_uIBoard.addChild(barContainer);

      let maskBar = new PIXI.Graphics();
      maskBar.beginFill(0xFFFFFF);
      maskBar.drawRect(0, 0, 500, barSize[1] * 2).endFill();;
      maskBar.x = screenWidth / 2 - maskBar.width / 2;
      maskBar.y = 0;
      maskBar.zIndex = 1;
      maskBar.visible = true;
      maskBar.alpha = 0.8;
      barContainer.addChild(maskBar);

      scene1_energyBar3 = new PIXI.Graphics();
      scene1_energyBar3.beginFill(0x000000);
      scene1_energyBar3.drawRect(0, 0, 1, barSize[1] + 7).endFill();;
      scene1_energyBar3.width = 500 + 7;
      scene1_energyBar3.x = screenWidth / 2 - scene1_energyBar3.width / 2 + 0.05;
      scene1_energyBar3.y = 16 - 3.5;
      scene1_energyBar3.zIndex = 2;
      scene1_energyBar3.visible = true;
      scene1_energyBar3.alpha = 1;
      //scene1_energyBar3.mask = maskBar;
      barContainer.addChild(scene1_energyBar3);

      scene1_energyBar2 = new PIXI.Graphics();
      scene1_energyBar2.beginFill(0xFF6347);
      scene1_energyBar2.drawRect(0, 0, 1, barSize[1]).endFill();;
      scene1_energyBar2.width = 500;
      scene1_energyBar2.x = screenWidth / 2 - scene1_energyBar2.width / 2;
      scene1_energyBar2.y = 16;
      scene1_energyBar2.zIndex = 2;
      scene1_energyBar2.visible = true;
      scene1_energyBar2.alpha = 1;
      scene1_energyBar2.mask = maskBar;
      //barContainer.addChild(scene1_energyBar2);

      scene1_energyBar = new PIXI.Graphics();
      scene1_energyBar.beginFill(0xFFFF00);
      scene1_energyBar.drawRect(0, 0, 1, barSize[1]).endFill();;
      scene1_energyBar.width = 250;
      scene1_energyBar.x = screenWidth / 2 - scene1_energyBar.width / 2 - 125;
      scene1_energyBar.y = 16;
      scene1_energyBar.zIndex = 2;
      scene1_energyBar.visible = true;
      scene1_energyBar.alpha = 1;
      scene1_energyBar.mask = maskBar;
      barContainer.addChild(scene1_energyBar);

      barContainer.position.set(0, 0);

      //padding可以處理字體顯示位置不正確的問題
      /* let style = new PIXI.TextStyle({
       fontFamily: "pixelFont",
       fontSize: 32,
       fill: "white",
       stroke: '#000000',
       strokeThickness: 5,
       letterSpacing: 0,
       align: "center",
       padding: 10
       //dropShadow: true,
       //dropShadowColor: "#000000",
       //dropShadowBlur: 4,
       //dropShadowAngle: Math.PI / 6,
       //dropShadowDistance: 6,
     });
    
   let energyBarText = new PIXI.Text("改革派", style);
     scene1_uIBoard.addChild(energyBarText);
     energyBarText.position.set(20, 17);
     energyBarText.visible = true;

     let energyBarText2 = new PIXI.Text("日治派", style);
     scene1_uIBoard.addChild(energyBarText2);
     energyBarText2.position.set(screenWidth - 20 - energyBarText2.width, 17);
     energyBarText2.visible = true;*/

      let sp = new PIXI.Sprite(PIXI.Texture.from("spItem0"));
      scene1_uIBoard.addChild(sp);
      sp.position.set(60, 3);

    }

  })();

  //背景相關
  for (let i = 0; i < 4; i++) {
    let B1O00 = new PIXI.Sprite(PIXI.Texture.from("B1L0" + (i % 2)));
    B1O00.zIndex = 215;
    B1O00.scale.set(globalImageScale, globalImageScale);
    B1O00.position.set(B1O00.width * i, 0);
    B1O00.index = i;
    B1O00.layerIndex = 0;
    scene1_BGContainerA.addChild(B1O00);
    scene1_BGObjectGroup.push(B1O00);

    let B1O01 = new PIXI.Sprite(PIXI.Texture.from("B1L1" + i));
    B1O01.zIndex = 214;
    B1O01.scale.set(globalImageScale, globalImageScale);
    B1O01.position.set(B1O01.width * i, 0);
    B1O01.index = i;
    B1O01.layerIndex = 1;
    scene1_BGContainerB.addChild(B1O01);
    scene1_BGObjectGroup.push(B1O01);

    let B1O02 = new PIXI.Sprite(PIXI.Texture.from("B1L2" + (i % 2)));
    B1O02.zIndex = 213;
    B1O02.scale.set(globalImageScale, globalImageScale);
    B1O02.position.set(B1O02.width * i, 0);
    B1O02.index = i;
    B1O02.layerIndex = 2;
    scene1_BGContainerC.addChild(B1O02);
    scene1_BGObjectGroup.push(B1O02);

  }

  //選擇物件
  {
    {
      let B1S00 = new PIXI.Container();
      B1S00.position.set(2000, 100);
      B1S00.activate = true;
      B1S00.zIndex = 1;

      let tableframes = [PIXI.Texture.from("B1S00"), PIXI.Texture.from("B1S01")];

      let tableInstance = new PIXI.AnimatedSprite(tableframes);
      tableInstance.scale.set(globalImageScale, globalImageScale);
      tableInstance.animationSpeed = 0.05;
      tableInstance.play();

      let tableDetectBox = new PIXI.Graphics();
      tableDetectBox.beginFill(0x700028).drawRect(0, 0, tableInstance.width * 0.3, tableInstance.height * 0.4).endFill();
      tableDetectBox.visible = false;
      tableDetectBox.position.set(tableInstance.width * 0.25, tableInstance.height * 0.8);

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
      let chooseText = new PIXI.Text("choose", style);
      chooseText.position.set(tableInstance.width * 0.28, -15);
      chooseText.visible = true;

      scene1_selectableBoard.addChild(B1S00);
      B1S00.addChild(tableInstance);
      B1S00.addChild(tableDetectBox);
      B1S00.addChild(chooseText);

      B1S00.instance = tableInstance;
      B1S00.detectArea = tableDetectBox;
      B1S00.text = chooseText;

      B1S00.id = 1;
      scene1_selectableGroup.push(B1S00);
    }

    {
      let B1S00 = new PIXI.Container();
      B1S00.position.set(1300, 200);
      B1S00.activate = true;
      B1S00.zIndex = 1;

      let tableframes = [PIXI.Texture.from("B1S10"), PIXI.Texture.from("B1S11")];

      let tableInstance = new PIXI.AnimatedSprite(tableframes);
      tableInstance.scale.set(globalImageScale, globalImageScale);
      tableInstance.animationSpeed = 0.05;
      tableInstance.play();

      let tableDetectBox = new PIXI.Graphics();
      tableDetectBox.beginFill(0x700028).drawRect(0, 0, tableInstance.width * 0.4, tableInstance.height * 0.4).endFill();
      tableDetectBox.visible = false;
      tableDetectBox.position.set(tableInstance.width * 0.25, tableInstance.height * 0.6);

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
      let chooseText = new PIXI.Text("choose", style);
      chooseText.position.set(tableInstance.width * 0.28, -15);
      chooseText.visible = true;

      scene1_selectableBoard.addChild(B1S00);
      B1S00.addChild(tableInstance);
      B1S00.addChild(tableDetectBox);
      B1S00.addChild(chooseText);

      B1S00.instance = tableInstance;
      B1S00.detectArea = tableDetectBox;
      B1S00.text = chooseText;

      B1S00.id = 1;
      scene1_selectableGroup.push(B1S00);
    }

    {
      let B1S00 = new PIXI.Container();
      B1S00.position.set(500, 40);
      B1S00.activate = true;
      B1S00.zIndex = 1;

      let tableframes = [PIXI.Texture.from("B1S20"), PIXI.Texture.from("B1S21")];

      let tableInstance = new PIXI.AnimatedSprite(tableframes);
      tableInstance.scale.set(globalImageScale, globalImageScale);
      tableInstance.animationSpeed = 0.05;
      tableInstance.play();

      let tableDetectBox = new PIXI.Graphics();
      tableDetectBox.beginFill(0x700028).drawRect(0, 0, tableInstance.width * 0.2, tableInstance.height * 0.4).endFill();
      tableDetectBox.visible = false;
      tableDetectBox.position.set(tableInstance.width * 0.4, tableInstance.height * 0.7);

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
      let chooseText = new PIXI.Text("choose", style);
      chooseText.position.set(tableInstance.width * 0.28, -15);
      chooseText.visible = true;

      scene1_selectableBoard.addChild(B1S00);
      B1S00.addChild(tableInstance);
      B1S00.addChild(tableDetectBox);
      B1S00.addChild(chooseText);

      B1S00.instance = tableInstance;
      B1S00.detectArea = tableDetectBox;
      B1S00.text = chooseText;

      B1S00.id = 1;
      scene1_selectableGroup.push(B1S00);
    }

    {
      let B1S00 = new PIXI.Container();
      B1S00.position.set(1500, 178);
      B1S00.activate = true;
      B1S00.zIndex = 1;

      let tableframes = [PIXI.Texture.from("B1S30"), PIXI.Texture.from("B1S31")];

      let tableInstance = new PIXI.AnimatedSprite(tableframes);
      tableInstance.scale.set(globalImageScale, globalImageScale);
      tableInstance.animationSpeed = 0.05;
      tableInstance.play();

      let tableDetectBox = new PIXI.Graphics();
      tableDetectBox.beginFill(0x700028).drawRect(0, 0, tableInstance.width * 0.2, tableInstance.height * 0.4).endFill();
      tableDetectBox.visible = false;
      tableDetectBox.position.set(tableInstance.width * 0.3, tableInstance.height * 0.6);

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
      let chooseText = new PIXI.Text("choose", style);
      chooseText.position.set(tableInstance.width * 0.28, -15);
      chooseText.visible = true;

      scene1_selectableBoard.addChild(B1S00);
      B1S00.addChild(tableInstance);
      B1S00.addChild(tableDetectBox);
      B1S00.addChild(chooseText);

      B1S00.instance = tableInstance;
      B1S00.detectArea = tableDetectBox;
      B1S00.text = chooseText;

      B1S00.id = 1;
      scene1_selectableGroup.push(B1S00);
    }

    {
      let B1S00 = new PIXI.Container();
      B1S00.position.set(1000, 39);
      B1S00.activate = true;
      B1S00.zIndex = 1;

      let tableframes = [PIXI.Texture.from("B1S40"), PIXI.Texture.from("B1S41")];

      let tableInstance = new PIXI.AnimatedSprite(tableframes);
      tableInstance.scale.set(globalImageScale, globalImageScale);
      tableInstance.animationSpeed = 0.05;
      tableInstance.play();

      let tableDetectBox = new PIXI.Graphics();
      tableDetectBox.beginFill(0x700028).drawRect(0, 0, tableInstance.width * 0.2, tableInstance.height * 0.4).endFill();
      tableDetectBox.visible = false;
      tableDetectBox.position.set(tableInstance.width * 0.35, tableInstance.height * 0.7);

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
      let chooseText = new PIXI.Text("choose", style);
      chooseText.position.set(tableInstance.width * 0.28, -15);
      chooseText.visible = true;

      scene1_selectableBoard.addChild(B1S00);
      B1S00.addChild(tableInstance);
      B1S00.addChild(tableDetectBox);
      B1S00.addChild(chooseText);

      B1S00.instance = tableInstance;
      B1S00.detectArea = tableDetectBox;
      B1S00.text = chooseText;

      B1S00.id = 1;
      scene1_selectableGroup.push(B1S00);
    }
  }

  //runner
  {
    let runnerS_frame = [PIXI.Texture.from("runnerS0"), PIXI.Texture.from("runnerS1"), PIXI.Texture.from("runnerS2"), PIXI.Texture.from("runnerS3"), PIXI.Texture.from("runnerS4"), PIXI.Texture.from("runnerS5")];
    scene1_runnerS = new PIXI.AnimatedSprite(runnerS_frame);
    scene1_runnerS.animationSpeed = 0.15;
    scene1_runnerS.pivot.set(0, 0);
    scene1_runnerS.play();
    scene1_runnerS.scale.set(globalImageScale, globalImageScale);
    //1000->-200
    scene1_runnerS.zIndex = -5;
    scene1_runnerS.alpha = 0.8;
    scene1_runnerS.x = -20;
    scene1_runnerS.y = 85;
    //scene1_gameBoard.addChild(scene1_runnerS);

    let runner_frame = [PIXI.Texture.from("runner0"), PIXI.Texture.from("runner1"), PIXI.Texture.from("runner2"), PIXI.Texture.from("runner3"), PIXI.Texture.from("runner4"), PIXI.Texture.from("runner5")];

    let runner = new PIXI.AnimatedSprite(runner_frame);
    runner.animationSpeed = 0.15;
    runner.pivot.set(0, 0);
    runner.test = false;
    runner.play();

    runner.scale.set(globalImageScale, globalImageScale);
    //1000->-200
    //runner.zIndex = 1;
    scene1_runner.addChild(runner);
    runner.x = -20;
    runner.y = 85;


    //一定要畫在0,0，再去條位置，用getGlobalPosition才能正確讀取。
    let runnerDetectBox = new PIXI.Graphics();
    runnerDetectBox.lineStyle(0, 0x82cd2e, 1);
    runnerDetectBox.beginFill(0x704828);
    runnerDetectBox.drawRect(0, 0, runner.width *0.1, runner.height*0.25);
    runnerDetectBox.endFill();
    //slimeDetectBox.position.set(slimeInstance.getGlobalPosition().x - slimeInstance.width / 2 + slimeInstance.width * 0.7 / 2, slimeInstance.getGlobalPosition().y - slimeInstance.height / 2 + slimeInstance.height * 0.7 / 2);
    runnerDetectBox.position.set(runner.x + runner.width/2 - 20, runner.y+ runner.height/2 - 30 );
    runnerDetectBox.zIndex = 100;
    runnerDetectBox.alpha = 0.5;
    runnerDetectBox.visible = false;
    scene1_runner.addChild(runnerDetectBox);
    scene1_runner.detectArea = runnerDetectBox;




  }

}

async function CreateItem(createInPool = true, name = -1) {

  var apple = new PIXI.Container();
  apple.name = name;
  apple.no = 0;
  apple.activate = true;
  apple.zIndex = 3;
  apple.sortableChildren = true;
  apple.index = -1;
  apple.frame = 0;


  var appleInstance = new PIXI.AnimatedSprite(scene1_appleTextures);

  //appleInstance.scale.set(1.2,1.2);
  appleInstance.pivot.set(appleInstance.width, appleInstance.height);
  appleInstance.scale.set(2, 2);
  appleInstance.position.set(0, 0);


  //一定要畫在0,0，再去條位置，用getGlobalPosition才能正確讀取。
  let appleDetectBox = new PIXI.Graphics();
  appleDetectBox.beginFill(0x700028).drawRect(0, 0, 30, 30).endFill();
  appleDetectBox.visible = false;
  appleDetectBox.zIndex = 10;
  //appleDetectBox.position.set(appleInstance.width * 0.25 + appleInstance.width * 0.2 / 2, appleInstance.height * 0.25 + appleInstance.width * 0.2 / 2);

  if (createInPool) {
    scene1_prepareBoard.addChild(apple);
    scene1_prepareItemGroup.push(apple);
  }
  else {
    scene1_itemBoard.addChild(apple);
    scene1_itemGroup.push(apple);
  }

  apple.addChild(appleInstance);
  apple.addChild(appleDetectBox);

  apple.instance = appleInstance;
  apple.detectArea = appleDetectBox;


}

function RecycleItem(itemGroup, i) {
  //把物件移到池中
  let removeItem = itemGroup[i];

  removeItem.activate = false;
  removeItem.instance.stop();
  removeItem.instance.texture = null;


  itemGroup[i].parent.removeChild(itemGroup[i]);
  itemGroup.splice(i, 1);

  scene1_prepareBoard.addChild(removeItem);
  scene1_prepareItemGroup.push(removeItem);
  removeItem.position.set(screenWidth / 2, screenHeight / 2);

}

async function ReuseItem() {


  if (scene1_prepareItemGroup.length == 0) {
    console.log("Empty");

    return;
    // await CreateItem();
  }

  let reuseItem = scene1_prepareItemGroup[0];

  reuseItem.parent.removeChild(reuseItem);
  scene1_prepareItemGroup.splice(0, 1);

  scene1_itemBoard.addChild(reuseItem);
  scene1_itemGroup.push(reuseItem);

  ItemReset(reuseItem);

}

function ItemReset(item) {

  item.x = scene1_movingDistant + screenWidth * 1.1;
  //item.y = 210 + 40 * Math.floor(Math.random() * 3);
  item.y = 280 - 35 * Math.floor(Math.random() * 4)*2;

  //在這邊決定出現的道具是哪個
  //item.instance.texture = scene1_appleTextures[3];
  var itemIndex = Math.floor(Math.random() * 9);
  item.id = itemIndex;

  //item.instance.texture = scene1_itemTextures[itemIndex * 3];
  //item.frame = 0;
  let itemframes = [scene1_itemTextures[itemIndex * 3 + 1], scene1_itemTextures[itemIndex * 3 + 2]];
  item.instance.textures = itemframes;
  item.instance.animationSpeed = 0.05;
  item.instance.play();

  item.activate = true;

  item.index = itemIndex;

}

function GameFunction() {

  //時間相關-(畫面移動、底部碰撞相關、史萊姆碰觸相關、隨機產生可碰觸的物件)
  {

    //畫面移動
    scene1_tickerFunc.push(SlimeMove);
    function SlimeMove(deltaTime) {

      if (scene1_movingPauseTimer != 0) {
        scene1_movingPauseTimer -= 1;
      }
      else {
        scene1_movingDistant += scene1_movingSpeed;
        scene1_movingBoard.x = -scene1_movingDistant;

        scene1_BGContainerA.x = -scene1_movingDistant * 1.1;
        scene1_BGContainerB.x = -scene1_movingDistant;
        scene1_BGContainerC.x = -scene1_movingDistant * 0.4;
      }

    }

    //底部碰撞相關
    scene1_tickerFunc.push(BottomDetect);
    function BottomDetect(deltaTime) {


      //分層背景
      for (var i = 0; i < scene1_BGObjectGroup.length; i++) {
        //分層背景
        if (scene1_BGObjectGroup[i].layerIndex == 0) {

          if (scene1_BGObjectGroup[i].x + (scene1_BGContainerA.x) <= -scene1_BGObjectGroup[i].width * 1.5) {
            scene1_BGObjectGroup[i].x += scene1_BGObjectGroup[i].width * 4;
          }
        }
        else if (scene1_BGObjectGroup[i].layerIndex == 1) {
          if (scene1_BGObjectGroup[i].x + (scene1_BGContainerB.x) <= -scene1_BGObjectGroup[i].width * 1.5) {
            scene1_BGObjectGroup[i].x += scene1_BGObjectGroup[i].width * 4;
          }
        }
        else if (scene1_BGObjectGroup[i].layerIndex == 2) {
          if (scene1_BGObjectGroup[i].x + (scene1_BGContainerC.x) <= -scene1_BGObjectGroup[i].width * 1.5) {
            scene1_BGObjectGroup[i].x += scene1_BGObjectGroup[i].width * 4;
          }
        }

      }

      for (var i = 0; i < scene1_SPBGObjectGroup.length; i++) {

        //特殊背景
        if (scene1_SPBGObjectGroup[i].x + (scene1_movingDistant * -1) <= -scene1_SPBGObjectGroup[i].width * 1.5) {
          scene1_SPBGObjectGroup[i].x = scene1_SPBGAccuDistant;
          scene1_SPBGAccuDistant += scene1_SPBGObjectGroup[i].width;
        }
      }

      for (var i = 0; i < scene1_itemGroup.length; i++) {

        if (scene1_itemGroup[i].x + (scene1_movingDistant * -1) <= -400) {

          //把物件移到池中
          RecycleItem(scene1_itemGroup, i);

        }
      }

      for (var i = 0; i < scene1_selectableGroup.length; i++) {
        /*
                if (scene1_selectableGroup[i].x + (scene1_movingDistant * -1) <= -400) {
                  scene1_selectableGroup[i].x += screenWidth * 1.8;
                  scene1_selectableGroup[i].activate = true;
                  scene1_selectableGroup[i].instance.gotoAndPlay(0);
        
                  scene1_selectableGroup[i].text.visible = true;
                }*/
      }

    }

    //史萊姆碰觸相關
    scene1_tickerFunc.push(EatApple);
    function EatApple(deltaTime) {

      //撿取蘋果
      for (let i = 0; i < scene1_itemGroup.length; i++) {
        if (scene1_itemGroup[i].activate && hitTestRectangle(scene1_runner.detectArea, scene1_itemGroup[i].detectArea)) {

          if (scene1_itemGroup[i].id == 0 || scene1_itemGroup[i].id == 5 || scene1_itemGroup[i].id == 6 || scene1_itemGroup[i].id == 3) {
            addEnergy(-10);
          }
          else if (scene1_itemGroup[i].id == 1 || scene1_itemGroup[i].id == 2 || scene1_itemGroup[i].id == 8 || scene1_itemGroup[i].id == 4) {
            addEnergy(10);
          }

          //console.log(scene1_itemGroup[i].id);
          RecycleItem(scene1_itemGroup, i);

          //3符咒 4紳章 7錢袋
        }
      }


    }

    //隨機產生可碰觸的物件
    scene1_tickerFunc.push(RandomAddItem);
    function RandomAddItem(deltaTime) {
      scene1_randomAddItemTimer += 1;
      if (scene1_randomAddItemTimer >= scene1_randomAddItemTimeLimit + 15) {
        if (Math.floor(Math.random() * 10) == 0) {
          ReuseItem();
          scene1_randomAddItemTimer = 15;
        }
      }
    }

    //時間倒數
    scene1_tickerFunc.push(TimerCountDown);
    function TimerCountDown(deltaTime) {

      if (scene1_stageTimer > 0) {
        scene1_countDownTimer += 1;
        if (scene1_countDownTimer > scene1_countDownTick) {
          scene1_countDownTimer = 0;
          scene1_stageTimer -= 1;
          scene1_uiGroup[1].text.text = scene1_stageTimer;
        }
      }
      else if (scene1_stageTimer == 0) {
        scene1_stageTimer -= 1;
        //console.log("GAME OVER");
        EndThisScene();
      }
    }


  }

  //史萊姆跳躍
  {

    function SlimeJump() {
      if (scene1_slimeJumping) return;
      else scene1_slimeJumping = true;

      scene1_runnerS.visible = false;

      scene1_slimeJumpSpeed = scene1_slimeJumpInitSpeed;
      app.ticker.add(function SlimeJumpTicker(deltaTime) {

        scene1_slime.position.y -= scene1_slimeJumpSpeed;
        scene1_runner.position.y -= scene1_slimeJumpSpeed;
        scene1_slimeJumpSpeed -= scene1_slimeGravity;

        if (scene1_slime.position.y > scene1_slimeInitY) {
          scene1_slime.position.y = scene1_slimeInitY;
          scene1_runner.position.y = 0;
          scene1_slimeJumping = false;

          scene1_runnerS.visible = true;

          app.ticker.remove(SlimeJumpTicker);
        }
      });
    }
  }

  //史萊姆選擇
  {
    function SlimeSelect() {

      //當按下選擇按鈕時
      let canSelect = false;
      let index = -1;
      let id = -1;

      //確認所有啟動中的可選物件是否與玩家重疊
      for (let i = 0; i < scene1_selectableGroup.length; i++) {
        if (scene1_selectableGroup[i].activate && hitTestRectangle(scene1_runner.detectArea, scene1_selectableGroup[i].detectArea)) {
          //任意物件都只能啟動一次
          scene1_selectableGroup[i].activate = false;
          scene1_selectableGroup[i].instance.gotoAndStop(1);
          canSelect = true;
          index = i;
          break;
        }
      }

      //如果都沒有人符合條件，則回歸
      if (canSelect == false) return;

      //結算觸發物件
      //根據此受選物件的編號不同產生結果

      scene1_movingPauseTimer = 30;
      id = scene1_selectableGroup[index].id;
      scene1_selectableGroup[index].text.visible = false;

      if (id == 0) {
        addExp(30);
      }
      else if (id == 1) {
        addExp(100);
      }

    }
  }

  //按鈕相關
  {
    scene1_buttonGroup[0].addListener("pointerdown", function () {
      SlimeJump();
    });

    scene1_buttonGroup[1].addListener("pointerdown", function () {
      SlimeSelect();
    });

  }

  // 鍵盤操作相關
  {
    let key_Q = keyboard(81);
    key_Q.press = SlimeJump;
    scene1_keyGroup.push(key_Q);
    scene1_keyFuncroup.push(SlimeJump);

    let key_W = keyboard(87);
    key_W.press = () => {


    };
    scene1_keyGroup.push(key_W);
    scene1_keyFuncroup.push(null);

    let key_E = keyboard(69);
    key_E.press = () => {

    };
    scene1_keyGroup.push(key_E);
    scene1_keyFuncroup.push(null);

  }

}

function addExp(addScore = 10) {

  scene1_score += addScore;
  //scene1_energyBar.width = scene1_energy / 5;
  scene1_uiGroup[0].text.text = scene1_score;
  //scene1_uiGroup[0].position.set(screenWidth - 45 - scene1_uiGroup[0].text.width - 15, 10);
}

function addEnergy(addScore = 10) {

  scene1_energy += addScore;
  scene1_energyBar.width = scene1_energy;
  //scene1_uiGroup[0].text.text = scene1_energy;
  scene1_uiGroup[0].position.set(screenWidth / 2 - scene1_energyBar.width / 2 - 125, 10);
}

async function EndThisScene() {

  for (let i = 0; i < scene1_keyGroup.length; i++) {
    scene1_keyGroup[i].press = null;
  }
  for (let i = 0; i < scene1_tickerFunc.length; i++) {
    app.ticker.remove(scene1_tickerFunc[i]);
  }


  EndingFadeFunc(scene1);
}







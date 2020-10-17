//人群遊戲

LoadScene4();

async function LoadScene4() {

  if (centerComponent.sceneExist[4] == false) {

    centerComponent.sceneExist[4] = true;
    await LoadSetting();
    await SetContainer();
    await SetObject();
    await GameFunction();
  }

  ResetSetting();

}

async function ResetSetting() {

  for (let i = 0; i < scene4_keyGroup.length; i++) {
    scene4_keyGroup[i].press = scene4_keyFuncroup[i];
  }

  for (let i = 0; i < scene4_tickerFunc.length; i++) {
    app.ticker.add(scene4_tickerFunc[i]);
  }

  scene4_TalkList[0].visible = true;
  for (let i = 1; i < scene4_slimeGroup.length; i++) {
    scene4_slimeGroup[i].visible = false;
    scene4_TalkList[i].visible = false;
  }

  for (let i = scene4_buttonGroup.length - 1; i >= 0; i--) {
    RecyleButton(scene4_buttonGroup, i);
  }

  if (centerComponent.dialogResult == 0) {
    centerComponent.dialogResult = -1;
  }
  else if (centerComponent.dialogResult == 1) {
    centerComponent.dialogResult = -1;
  }

  scene4_score = 0;
  scene4_scoreUI.text.text = scene4_score.toFixed(0);
  scene4_energyBar.width = scene4_score * 3;

  scene4_totalButtonConnter = 0;
  scene4_clickButtonConuter = 0;
  scene4_currentScoreLevel = 0;
  scene4_scoreLevel = 0;

  //時間倒數
  scene4_stageTotalTime = 25;
  scene4_stageTimer = scene4_stageTotalTime;
  scene4_countDownTimer = 0;
  scene4_startTimer = 0;

  scene4_title.alpha = 1;

  //讓按鈕不會重複位置
  scene4_lastButDir = -1;
  scene4_lastButDir = -1;

  //廣播功能
  scene4_radio = -1;

  //先把所有按鈕關掉
  for (let i = 0; i < 4; i++) {
    scene4_butTrue[i].visible = false;
    scene4_butFalse[i].visible = false;
  }

  //開場開一個稱號
  for (let i = 0; i < scene4_CharTitleLList.length; i++) {
    scene4_CharTitleLList[i].visible = false;
  }

  if (centerComponent.sceneExist[1])
    scene4_CharTitleLList[scene1_title].visible = true;
  else
    scene4_CharTitleLList[4].visible = true;

  scene4.visible = true;

  StartingFadeFunc(scene4, 'small_game2');
}

//讀取設定
function LoadSetting() {

  scene4_markContainer = null;
  scene4_scoreUI = null;
  scene4_energyBar = null;

  scene4_gameMode = 1; //0依序 1隨機
  scene4_score = 0;
  scene4_buttonGroup = [];
  scene4_totalButtonConnter = 0;
  scene4_clickButtonConuter = 0;

  scene4_barSize = [120, 30];
  scene4_barEdgeDistant = [12, 15];
  scene4_barSizeMaskMult = 4;

  scene4_buttonBoxSize = [80, 80];
  scene4_buttonBoxEdgeDistant = [15, 15];

  scene4_currentScoreLevel = 0;
  scene4_scoreLevel = 0;

  scene4_counterPerIndex = 12;
  scene4_spMoveLeftSpeed = 3;

  scene4_slimeTexture = (PIXI.Texture.from("slime_sheet_" + "01" + ".gif"));

  //時間倒數
  scene4_stageTimer = 20;
  scene4_countDownTimer = 0;
  scene4_countDownTick = PIXI.settings.TARGET_FPMS * 1000;

  scene4_slimeGroup = [];
  scene4_policeGroup = [];
  scene4_keyGroup = [];
  scene4_keyFuncroup = [];
  scene4_tickerFunc = [];
  scene4_prepareButtonGroup = [];
  scene4_uIGroup = [];
}

//設定容器
function SetContainer() {

  scene4 = new PIXI.Container();
  scene4.scale.set(1);
  scene4.sortableChildren = true;
  app.stage.addChild(scene4);

  scene4_movingBoard = new PIXI.Container();
  scene4_movingBoard.zIndex = -5;
  scene4_movingBoard.sortableChildren = true;
  scene4.addChild(scene4_movingBoard);

  scene4_uIBoard = new PIXI.Container();
  scene4_uIBoard.zIndex = 100;
  scene4_uIBoard.sortableChildren = true;
  scene4.addChild(scene4_uIBoard);

  scene4_prepareBoard = new PIXI.Container();
  scene4_prepareBoard.zIndex = 100;
  scene4_prepareBoard.sortableChildren = true;
  scene4_prepareBoard.visible = false;
  scene4.addChild(scene4_prepareBoard);

}

function SetObject() {

  //UI
  {
    //印記製作
    {
      scene4_markContainer = new PIXI.Container();
      scene4_markContainer.visible = false;
      scene4_markContainer.scale.set(1);
      scene4_markContainer.sortableChildren = true;
      scene4_markContainer.zIndex = 11;

      scene4_uIBoard.addChild(scene4_markContainer);

      let markA = new PIXI.Sprite(PIXI.Texture.from("sight"));
      markA.pivot.set(0.5, 0.5);
      markA.width = 23;
      markA.height = 19;
      markA.position.set(-48, -48);
      markA.zIndex = 10;
      scene4_markContainer.addChild(markA);

      let markB = new PIXI.Sprite(PIXI.Texture.from("sight"));
      markB.pivot.set(0.5, 0.5);
      markB.width = 23;
      markB.height = 19;
      markB.rotation = PI / 2;
      markB.position.set(48, -48);
      markB.zIndex = 10;
      scene4_markContainer.addChild(markB);

      let markC = new PIXI.Sprite(PIXI.Texture.from("sight"));
      markC.pivot.set(0.5, 0.5);
      markC.width = 23;
      markC.height = 19;
      markC.rotation = PI;
      markC.position.set(48, 48);
      markC.zIndex = 10;
      scene4_markContainer.addChild(markC);

      let markD = new PIXI.Sprite(PIXI.Texture.from("sight"));
      markD.pivot.set(0.5, 0.5);
      markD.width = 23;
      markD.height = 19;
      markD.rotation = PI / 2 * 3;
      markD.position.set(-48, 48);
      markD.zIndex = 10;
      scene4_markContainer.addChild(markD);
    }
    if (scene4_gameMode == 0) {

      scene4_markContainer.position.set(70, screenHeight - 70)

    } else {
      scene4_markContainer.position.set(-300, -300)
    }

    //右上角的計數器
    {
      scene4_scoreUI = new PIXI.Container();
      scene4_scoreUI.no = 0;
      scene4_scoreUI.zIndex = 2;
      scene4_scoreUI.sortableChildren = true;
      scene4_scoreUI.visible = false;

      let scoreUIInstance = new PIXI.Sprite(PIXI.Texture.from("statue"));
      scoreUIInstance.width = 40;
      scoreUIInstance.height = 40;
      scoreUIInstance.pivot.set(0.5, 0.5);

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
      let scoreCounterText = new PIXI.Text(scene4_score, style);

      scoreCounterText.position.set(45, 5);
      scoreCounterText.visible = true;
      scene4_scoreUI.text = scoreCounterText;
      scene4_scoreUI.position.set(screenWidth - 45 - scene4_scoreUI.text.width - 15, 10);

      scene4_uIBoard.addChild(scene4_scoreUI);
      scene4_scoreUI.addChild(scoreUIInstance);
      scene4_scoreUI.addChild(scoreCounterText);
    }

    //右上角的時間
    {
      let timeUI = new PIXI.Container();
      timeUI.no = 0;
      timeUI.activate = true;
      timeUI.zIndex = 2;
      timeUI.sortableChildren = true;
      timeUI.visible = false;

      scene4_uIGroup.push(timeUI);

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
      let timeText = new PIXI.Text(scene4_stageTimer, style);
      timeText.position.set(45, 52);
      timeText.visible = true;

      scene4_uIBoard.addChild(timeUI);
      timeUI.addChild(timeText);

      timeUI.text = timeText;

      timeUI.position.set(screenWidth - 45 - timeUI.text.width - 15, 10);
    }

    //能量條(和其遮罩)
    {
      let ene = new PIXI.Container();
      scene4_uIBoard.addChild(ene);
      ene.visible = false;

      let maskBar = new PIXI.Graphics();
      maskBar.beginFill(0xFFFFFF);
      maskBar.drawRect(0, 0, scene4_barSize[0] * scene4_barSizeMaskMult, scene4_barSize[1] * 2);
      maskBar.x = scene4_barEdgeDistant[0] + 80;;
      maskBar.y = 0;
      maskBar.endFill();
      maskBar.zIndex = 1;
      maskBar.alpha = 0.8;
      ene.addChild(maskBar);

      let maskBar_V = new PIXI.Graphics();
      maskBar_V.beginFill(0xFFFFFF);
      maskBar_V.drawRect(0, 0, scene4_barSize[0] * scene4_barSizeMaskMult, scene4_barSize[1] * 2);
      maskBar_V.x = scene4_barEdgeDistant[0] + 80;;
      maskBar_V.y = 0;
      maskBar_V.endFill();
      maskBar_V.zIndex = -1;
      maskBar_V.alpha = 0.8;
      ene.addChild(maskBar_V);

      scene4_energyBar = new PIXI.Graphics();
      scene4_energyBar.beginFill(0xFFFF00);
      scene4_energyBar.drawRect(0, 0, 1, scene4_barSize[1]);
      scene4_energyBar.width = 0;
      scene4_energyBar.x = scene4_barEdgeDistant[0] + 80;
      scene4_energyBar.y = scene4_barEdgeDistant[1];
      scene4_energyBar.endFill();
      scene4_energyBar.zIndex = 2;
      scene4_energyBar.visible = true;
      scene4_energyBar.alpha = 1;
      scene4_energyBar.mask = maskBar;
      ene.addChild(scene4_energyBar);

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
      });
      let energyBarText = new PIXI.Text("EXP", style);
      ene.addChild(energyBarText);
      energyBarText.position.set(20, 16);
      energyBarText.visible = true;

    }

    //按鈕位置
    {
      let edge = 20;

      let dialogBoxA = new PIXI.Graphics();
      dialogBoxA.beginFill(0xFFFFFF);
      dialogBoxA.drawRect(0, 0, scene4_buttonBoxSize[0] * 2, scene4_buttonBoxSize[1] * 2);
      dialogBoxA.endFill();
      dialogBoxA.zIndex = 10;
      dialogBoxA.alpha = 0;
      x = screenWidth / 2 - dialogBoxA.width / 2; y = 10;
      dialogBoxA.position.set(x, y);
      scene4_uIBoard.addChild(dialogBoxA);
      dialogBoxA.interactive = true;
      dialogBoxA.buttonMode = true;
      dialogBoxA.on("pointerdown", function () {
        DetectButtonInput(0);
      });

      let dialogBoxB = new PIXI.Graphics();
      dialogBoxB.beginFill(0xFFFFFF);
      dialogBoxB.drawRect(0, 0, scene4_buttonBoxSize[0] * 2, scene4_buttonBoxSize[1] * 2);
      dialogBoxB.endFill();
      dialogBoxB.zIndex = 10;
      dialogBoxB.alpha = 0;
      x = screenWidth - dialogBoxB.width - edge; y = screenHeight / 2 - dialogBoxB.height / 2;
      dialogBoxB.position.set(x, y);
      scene4_uIBoard.addChild(dialogBoxB);
      dialogBoxB.interactive = true;
      dialogBoxB.buttonMode = true;
      dialogBoxB.on("pointerdown", function () {
        DetectButtonInput(1);
      });

      let dialogBoxC = new PIXI.Graphics();
      dialogBoxC.beginFill(0xFFFFFF);
      dialogBoxC.drawRect(0, 0, scene4_buttonBoxSize[0] * 2, scene4_buttonBoxSize[1] * 2);
      dialogBoxC.endFill();
      dialogBoxC.zIndex = 10;
      dialogBoxC.alpha = 0;
      x = screenWidth / 2 - dialogBoxC.width / 2; y = screenHeight - dialogBoxC.height - 10;
      dialogBoxC.position.set(x, y);
      scene4_uIBoard.addChild(dialogBoxC);
      dialogBoxC.interactive = true;
      dialogBoxC.buttonMode = true;
      dialogBoxC.on("pointerdown", function () {
        DetectButtonInput(2);
      });

      let dialogBoxD = new PIXI.Graphics();
      dialogBoxD.beginFill(0xFFFFFF);
      dialogBoxD.drawRect(0, 0, scene4_buttonBoxSize[0] * 2, scene4_buttonBoxSize[1] * 2);
      dialogBoxD.endFill();
      dialogBoxD.zIndex = 10;
      dialogBoxD.alpha = 0;
      x = edge; y = screenHeight / 2 - dialogBoxB.height / 2;
      dialogBoxD.position.set(x, y);
      scene4_uIBoard.addChild(dialogBoxD);
      dialogBoxD.interactive = true;
      dialogBoxD.buttonMode = true;
      dialogBoxD.on("pointerdown", function () {
        DetectButtonInput(3);
      });

    }

    //按鈕
    {
      scene4_butTrue = [];
      scene4_butFalse = [];
      scene4_answer = -1;

      //真按鈕
      for (let i = 0; i < 4; i++) {
        let edge = 18;

        let dialogBox = new PIXI.Sprite(PIXI.Texture.from("G2But0" + i));
        dialogBox.scale.set(globalImageScale * 1.5, globalImageScale * 1.5);
        dialogBox.zIndex = 60;
        scene4_uIBoard.addChild(dialogBox);
        scene4_butTrue.push(dialogBox);
        dialogBox.visible = false;
        //padding可以處理字體顯示位置不正確的問題   
        let dir = i;

        let x = 0;
        let y = 0;

        if (dir == 0) {
          x = screenWidth / 2 - dialogBox.width / 2; y = -40;
        }
        else if (dir == 1) {
          x = screenWidth - dialogBox.width - edge + 50; y = screenHeight / 2 - dialogBox.height / 2 - 30;
        }
        else if (dir == 2) {
          x = screenWidth / 2 - dialogBox.width / 2; y = screenHeight - dialogBox.height - 20;
        }
        else if (dir == 3) {
          x = edge - 50; y = screenHeight / 2 - dialogBox.height / 2 - 30;
        }
        dialogBox.position.set(x, y);

        dialogBox.dir = dir;
      }

      //假按鈕
      for (let i = 0; i < 4; i++) {
        let edge = 18;

        let dialogBox = new PIXI.Sprite(PIXI.Texture.from("G2ButE0" + i));
        dialogBox.scale.set(globalImageScale * 1.5, globalImageScale * 1.5);
        dialogBox.zIndex = 60;
        scene4_uIBoard.addChild(dialogBox);
        scene4_butFalse.push(dialogBox);
        dialogBox.visible = false;
        //padding可以處理字體顯示位置不正確的問題   
        let dir = i;

        let x = 0;
        let y = 0;

        if (dir == 0) {
          x = screenWidth / 2 - dialogBox.width / 2; y = -40;
        }
        else if (dir == 1) {
          x = screenWidth - dialogBox.width - edge + 50; y = screenHeight / 2 - dialogBox.height / 2 - 30;
        }
        else if (dir == 2) {
          x = screenWidth / 2 - dialogBox.width / 2; y = screenHeight - dialogBox.height - 20;
        }
        else if (dir == 3) {
          x = edge - 50; y = screenHeight / 2 - dialogBox.height / 2 - 30;
        }
        dialogBox.position.set(x, y);

        dialogBox.dir = dir;
      }

    }


  }

  //人物Sprite
  {

    for (let i = 0; i < 6; i++) {
      let slime = new PIXI.Container();
      slime.no = 0;
      slime.zIndex = 10 - i

      let slimeInstance = new PIXI.Sprite(PIXI.Texture.from("G2People0" + i));
      slimeInstance.width = 40;
      slimeInstance.height = 40;
      slimeInstance.zIndex = 50;
      slimeInstance.scale.set(2, 2);
      slimeInstance.pivot.set(0.5, 0.5);

      slime.position.set(-15, -14);
      //slime.zIndex = 2 + slime.y * 0.01;

      if (i != 0)
        slime.visible = false;

      scene4_uIBoard.addChild(slime);
      slime.addChild(slimeInstance);

      scene4_slimeGroup.push(slime);
    }

  }

  //背景
  {
    let sceneA = new PIXI.Container();
    scene4_movingBoard.addChild(sceneA);

    let scene3_ScenePic = new PIXI.Sprite(PIXI.Texture.from("B2Spe1"));
    scene3_ScenePic.zIndex = 0;
    scene3_ScenePic.scale.set(globalImageScale, globalImageScale);
    scene3_ScenePic.position.set(0, 0);
    scene3_ScenePic.position.set(screenWidth / 2 - scene3_ScenePic.width / 2, screenHeight / 2 - scene3_ScenePic.height / 2);
    sceneA.addChild(scene3_ScenePic)

    let scene3_effect = new PIXI.Sprite(PIXI.Texture.from("M102"));
    scene3_effect.scale.set(2.06, globalImageScale - 0.04);
    sceneA.addChild(scene3_effect)

    let scene4_uIBoardSP = new PIXI.Container();
    scene4_uIBoardSP.scale.set(globalImageScale + 0.1, globalImageScale + 0.1);
    scene4_uIBoardSP.y = -12;
    sceneA.addChild(scene4_uIBoardSP);

    moveDelta = 10;

    Bridge_CharTilteUIDefault = new PIXI.Sprite(PIXI.Texture.from('Bridge_CharTilteUIDefault'));
    scene4_uIBoardSP.addChild(Bridge_CharTilteUIDefault);
    Bridge_CharTilteUIDefault.x = 17;
    Bridge_CharTilteUIDefault.y = 205 - moveDelta;

    Bridge_CharTilteUI = new PIXI.Sprite(PIXI.Texture.from('Bridge_CharTilteUI'));
    Bridge_CharTilteUI.visible = false;
    scene4_uIBoardSP.addChild(Bridge_CharTilteUI);
    Bridge_CharTilteUI.x = 16;
    Bridge_CharTilteUI.y = 204 - moveDelta;

    Bridge_RadioUI = new PIXI.Sprite(PIXI.Texture.from('Bridge_RadioUI'));
    Bridge_RadioUI.visible = true;
    scene4_uIBoardSP.addChild(Bridge_RadioUI);
    Bridge_RadioUI.x = 84;
    Bridge_RadioUI.y = 209 - moveDelta;

    scene4_CharTitleLList = [];
    for (let i = 0; i < 9; i++) {

      let scene4_CharTitle = new PIXI.Sprite(PIXI.Texture.from("CharTitle" + i));
      scene4_CharTitle.visible = false;
      scene4_CharTitle.scale.set(0.079, 0.079);
      scene4_CharTitleLList.push(scene4_CharTitle);
      scene4_CharTitle.x = 52 - scene4_CharTitle.width / 2;
      scene4_CharTitle.y = 212 - moveDelta;
      scene4_uIBoardSP.addChild(scene4_CharTitle);

    }

    scene4_RadioList = [];
    for (let i = 0; i < 2; i++) {

      let scene4_Radio = new PIXI.Sprite(PIXI.Texture.from("G2Radio0" + i));
      scene4_Radio.visible = false;

      scene4_Radio.scale.set(0.079, 0.079);

      scene4_Radio.x = 101;
      scene4_Radio.y = 212.2 - moveDelta;
      scene4_RadioList.push(scene4_Radio);

      scene4_uIBoardSP.addChild(scene4_Radio);

    }

    scene4_TalkList = [];
    for (let i = 0; i < 6; i++) {

      let scene4_Talk = new PIXI.Sprite(PIXI.Texture.from("G2Talk0" + i));

      if (i != 0)
        scene4_Talk.visible = false;
      scene4_Talk.y = -2;
      scene4_Talk.scale.set(0.189, 0.189);

      // scene4_Talk.x = 101;
      // scene4_Talk.y = 212.2;
      scene4_TalkList.push(scene4_Talk);

      scene4_uIBoardSP.addChild(scene4_Talk);

    }




  }
  //警察sPRITE
  {
    for (let i = 0; i < 3; i++) {
      let police = new PIXI.Container();
      police.no = 0;

      police.sortableChildren = true;

      let policeInstance = new PIXI.Sprite(PIXI.Texture.from("policeSmall"));
      policeInstance.pivot.set(policeInstance.width / 2, policeInstance.height / 2);
      policeInstance.scale.set(-2, 2);


      scene4_uIBoard.addChild(police);
      police.addChild(policeInstance);
      scene4_policeGroup.push(police);
    }

    scene4_policeGroup[0].position.set(530, 262);
    scene4_policeGroup[1].position.set(580, 255);
    scene4_policeGroup[2].position.set(630, 265);

    for (let i = 0; i < 3; i++) {
      scene4_policeGroup[0].zIndex = 2 + scene4_policeGroup[0].y * 0.01;
    }


  }

  //標題
  {
    scene4_title = new PIXI.Sprite(PIXI.Texture.from("G2GameTitle"));
    scene4_title.zIndex = 120;
    scene4_title.scale.set(globalImageScale, globalImageScale);
    scene4_title.position.set
      (screenWidth / 2 - scene4_title.width / 2,
        screenHeight / 2 - scene4_title.height / 2 - 30);
    scene4.addChild(scene4_title);
  }
}

function showRadio(radio = 0) {

  console.log(radio);
  let timer = 0;
  let counter = 0;
  let counterLimit = 24;

  scene4_RadioList[radio].visible = true;
  scene4_RadioList[radio].tint = "0x07ffa5";

  //07ffa5
  app.ticker.add(function TitleShine(deltaTime) {

    timer++;

    if (timer > 15) {
      timer = 0;
      counter++;

      if (counter % 2 == 0) {
        scene4_RadioList[radio].tint = "0x07ffa5";
      }
      else if (counter % 2 == 1) {
        scene4_RadioList[radio].tint = "0xFFFFFF";
      }

      if (counter >= counterLimit) {
        scene4_RadioList[radio].visible = false;
        app.ticker.remove(TitleShine);
      }
    }
  });

}

function RecyleButton(itemGroup, i) {

  //把物件移到池中
  let removeItem = itemGroup[i];
  itemGroup[i].parent.removeChild(itemGroup[i]);
  itemGroup.splice(i, 1);

  scene4_prepareBoard.addChild(removeItem);
  scene4_prepareButtonGroup.push(removeItem);
  removeItem.position.set(screenWidth / 2, screenHeight / 2);
}

async function ReuseButton(dir) {

  if (scene4_prepareButtonGroup.length == 0) {

    return;
  }

  scene4_totalButtonConnter++;

  let reuseItem = scene4_prepareButtonGroup[0];
  reuseItem.parent.removeChild(reuseItem);
  scene4_prepareButtonGroup.splice(0, 1);

  await scene4_buttonGroup.push(reuseItem);

  if (dir == -1) dir = Math.floor(Math.random() * 4);

  //讓新的按鈕位置不會和上次一樣
  while (dir == scene4_lastButDir) dir = Math.floor(Math.random() * 4);
  scene4_lastButDir = dir;

  if (scene4_buttonGroup.length != 1) {
    while (dir == scene4_buttonGroup[0].dir) {
      dir = Math.floor(Math.random() * 4);
    }
  }

  let dialogBox = reuseItem;
  reuseItem.dir = dir;
  dialogBox.zIndex = 9 + scene4_totalButtonConnter * -0.01;
  dialogBox.index = scene4_buttonGroup.length - 1;
  dialogBox.moveLeftCounter = 0;
  dialogBox.moveLeftCounterSP = 0;


  let edge = 20;

  //根據遊戲模式不同，選擇不同的生成模式
  if (scene4_gameMode == 0) {
    if (scene4_buttonGroup.length > 10) {
      dialogBox.x = scene4_buttonBoxEdgeDistant[0] * 2 + (scene4_buttonBoxEdgeDistant[0] + scene4_buttonBoxSize[0]) * (dialogBox.index);
      dialogBox.y = screenHeight - scene4_buttonBoxSize[1] - scene4_buttonBoxEdgeDistant[0] * 2;
    } else {
      dialogBox.x = scene4_buttonBoxEdgeDistant[0] * 2 + (scene4_buttonBoxEdgeDistant[0] + scene4_buttonBoxSize[0]) * (10 + dialogBox.index);
      dialogBox.y = screenHeight - scene4_buttonBoxSize[1] - scene4_buttonBoxEdgeDistant[0] * 2;
      dialogBox.moveLeftCounterSP = (10) * scene4_counterPerIndex;
    }
  }
  else if (scene4_gameMode == 1) {

    let x = 0;
    let y = 0;

    if (dir == 0) {
      x = screenWidth / 2 - dialogBox.width / 2; y = -40;
    }
    else if (dir == 1) {
      x = screenWidth - dialogBox.width - edge + 50; y = screenHeight / 2 - dialogBox.height / 2;
    }
    else if (dir == 2) {
      x = screenWidth / 2 - dialogBox.width / 2; y = screenHeight - dialogBox.height + 40;
    }
    else if (dir == 3) {
      x = edge - 50; y = screenHeight / 2 - dialogBox.height / 2;
    }
    dialogBox.position.set(x, y);

    dialogBox.texture = PIXI.Texture.from("G2But0" + dir);

    if (dialogBox.index == 0) {
      scene4_markContainer.position.set(x + scene4_buttonBoxSize[0] / 2, y + scene4_buttonBoxSize[0] / 2);
    }

  }

  scene4_uIBoard.addChild(dialogBox);

}

function CreateButton(dir) {


  let edge = 18;


  /* let dialogBox = new PIXI.Graphics();
   dialogBox.beginFill(0xFFFFFF);
   dialogBox.drawRect(0, 0, scene4_buttonBoxSize[0], scene4_buttonBoxSize[1]);
   dialogBox.endFill();
   dialogBox.zIndex = 9 + scene4_totalButtonConnter * -0.01;
   dialogBox.visible = true;
   dialogBox.alpha = 1;*/


  let dialogBox = new PIXI.Sprite(PIXI.Texture.from("G2But00"));
  //dialogBox.pivot.set(dialogBox.width/2,dialogBox.height/2);
  dialogBox.scale.set(globalImageScale * 1.5, globalImageScale * 1.5);
  //dialogBox.position.set(dialogBox.width/2,dialogBox.height/2);
  scene4_prepareBoard.addChild(dialogBox);
  scene4_prepareButtonGroup.push(dialogBox);

  //padding可以處理字體顯示位置不正確的問題
  let style = new PIXI.TextStyle({
    fontFamily: "pixelFont",
    fontSize: 36,
    fill: "white",
    stroke: '#000000',
    strokeThickness: 5,
    letterSpacing: 0,
    padding: 10,
    lineHeight: 80
  });
  let dialogBoxText = new PIXI.Text("", style);
  dialogBoxText.position.set(edge, edge + 5);
  dialogBox.addChild(dialogBoxText);
  dialogBox.text = dialogBoxText;
  dialogBoxText.visible = false;
  if (dir == -1) dir = Math.floor(Math.random() * 4);
  if (dir == 0) dialogBoxText.text = "上";
  else if (dir == 1) dialogBoxText.text = "右";
  else if (dir == 2) dialogBoxText.text = "下";
  else if (dir == 3) dialogBoxText.text = "左";

  dialogBox.dir = dir;
  dialogBox.index = scene4_buttonGroup.length;
  dialogBox.moveLeftCounter = 0;
  dialogBox.moveLeftCounterSP = 0;



}

function GameFunction() {

  /*for (let i = 0; i < 15; i++) {
    CreateButton(-1);
  }*/

  // 鍵盤操作相關
  {
    if (scene4_gameMode == 0) {

      {
        let key_Up = keyboard(38);
        scene4_keyGroup.push(key_Up);
        scene4_keyFuncroup.push(() => { DetectButtonInput(0) });

        let key_Right = keyboard(39);
        scene4_keyGroup.push(key_Right);
        scene4_keyFuncroup.push(() => { DetectButtonInput(1) });

        let key_Down = keyboard(40);
        scene4_keyGroup.push(key_Down);
        scene4_keyFuncroup.push(() => { DetectButtonInput(2) });

        let key_Left = keyboard(37);
        scene4_keyGroup.push(key_Left);
        scene4_keyFuncroup.push(() => { DetectButtonInput(3) });

      }

    }
    else {
      let key_Up = keyboard(38);
      scene4_keyGroup.push(key_Up);
      scene4_keyFuncroup.push(() => { DetectButtonInput(0) });

      let key_Right = keyboard(39);
      scene4_keyGroup.push(key_Right);
      scene4_keyFuncroup.push(() => { DetectButtonInput(1) });

      let key_Down = keyboard(40);
      scene4_keyGroup.push(key_Down);
      scene4_keyFuncroup.push(() => { DetectButtonInput(2) });

      let key_Left = keyboard(37);
      scene4_keyGroup.push(key_Left);
      scene4_keyFuncroup.push(() => { DetectButtonInput(3) });
    }

  }

  //時間相關
  {
    if (scene4_gameMode == 0) {
      scene4_tickerFunc.push(ButtonMoveLeft);
    }

    let timer = 0;
    let buttonTimer = 0;
    scene4_tickerFunc.push(gameTimer);
    function gameTimer(deltaTime) {

      timer += 1;
      buttonTimer += 1;

      if (timer == 1) {
        timer = 0;
        AddScore(-0.05);
      }

      if (buttonTimer >= 30 && scene4_gameMode == 0) {

        if (Math.floor(Math.random() * 3) == 0) {
          buttonTimer = 0;
          ReuseButton(-1);
        }
      }

      if (scene4_stageTimer > 0) {
        scene4_countDownTimer += deltaTime;
        if (scene4_countDownTimer > scene4_countDownTick) {
          scene4_countDownTimer = 0;
          scene4_stageTimer -= 1;
          scene4_uIGroup[0].text.text = scene4_stageTimer;

          if (scene4_stageTimer == scene4_stageTotalTime - 5 && scene4_radio == -1) {
            scene4_radio++;
            showRadio(scene4_radio);
          }
          else if (scene4_stageTimer == scene4_stageTotalTime - 18 && scene4_radio == 0) {
            scene4_radio++;
            showRadio(scene4_radio);
          }
        }
      }
      else if (scene4_stageTimer == 0) {
        scene4_stageTimer -= 1;
        console.log("GAME OVER");
        EndThisScene();
      }


    }

    //標題消失(和遊戲開始)
    scene4_tickerFunc.push(TitleShowUp);
    function TitleShowUp(deltaTime) {
      scene4_startTimer++;

      if (scene4_startTimer <= 20) {
        scene4_title.scale.set(((1 - scene4_startTimer / 20) * 2 + 1) * globalImageScale, ((1 - scene4_startTimer / 20) * 2 + 1) * globalImageScale);
        //scene4_title.position.set(screenWidth / 2 - scene4_title.width / 2, screenHeight / 2 - scene4_title.height / 2 - 20)

      }
      else if (scene4_startTimer <= 60) {
      }
      else if (scene4_startTimer <= 100) {
        scene4_title.alpha = (1 - (scene4_startTimer - 60) / 40);
      }
      else {

        //開場時放一個按鈕
        if (scene4_gameMode == 1) {

          scene4_answer = Math.floor(Math.random() * 4);
          scene4_lastButDir = scene4_answer;

          scene4_false = Math.floor(Math.random() * 4);
          //讓新的按鈕位置不會和上次一樣
          while (scene4_false == scene4_answer) scene4_false = Math.floor(Math.random() * 4);

          scene4_butTrue[scene4_answer].visible = true;
          scene4_butFalse[scene4_false].visible = true;
        }

        app.ticker.remove(TitleShowUp);
      }

    }

  }




}

//鍵盤按下對應按鈕 (GAMEMODE = 0)
//手機觸控按下按鈕 (GAMEMODE = 1)
function DetectButtonInput(dir) {

  //if (scene4_buttonGroup.length == 0) return;

  if (scene4_gameMode == 0) {

    if (scene4_buttonGroup[0].moveLeftCounter >= 2 || scene4_buttonGroup[0].moveLeftCounterSP >= 2) return;

    if (scene4_buttonGroup[0].dir == dir) {
      AddScore(10);
      RecyleButton(scene4_buttonGroup, 0);
      CheckButtonIndex();
    } else {
      AddScore(-18);
    }

  }

  else if (scene4_gameMode == 1) {

    console.log(scene4_answer);
    if (scene4_answer == dir) {

      PIXI.sound.play('small_game_click');
      AddScore(8);

      scene4_butTrue[scene4_answer].visible = false;
      scene4_butFalse[scene4_false].visible = false;

      scene4_answer = Math.floor(Math.random() * 4);

      //讓新的按鈕位置不會和上次一樣
      while (scene4_answer == scene4_lastButDir) scene4_answer = Math.floor(Math.random() * 4);
      scene4_lastButDir = scene4_answer;

      scene4_false = Math.floor(Math.random() * 4);
      while (scene4_false == scene4_answer) scene4_false = Math.floor(Math.random() * 4);

      scene4_butTrue[scene4_answer].visible = true;
      scene4_butFalse[scene4_false].visible = true;

      //RecyleButton(scene4_buttonGroup, 0);
      //ReuseButton(-1);
      //CheckButtonIndex();
      //PIXI.sound.play('small_game_click');

    } else {
      AddScore(-18);
    }
  }
}

function CheckButtonIndex() {

  if (scene4_gameMode == 0) {
    for (let i = 0; i < scene4_buttonGroup.length; i++) {

      if (scene4_buttonGroup[i].index != i) {
        scene4_buttonGroup[i].moveLeftCounter += scene4_counterPerIndex * (scene4_buttonGroup[i].index - i);
        scene4_buttonGroup[i].index = i;
      }
    }
  } else if (scene4_gameMode == 1) {
    for (let i = 0; i < scene4_buttonGroup.length; i++) {
      if (scene4_buttonGroup[i].index != i) {
        scene4_buttonGroup[i].index = i;
      }
    }
    scene4_markContainer.position.set(scene4_buttonGroup[0].x + scene4_buttonBoxSize[0] / 2, scene4_buttonGroup[0].y + scene4_buttonBoxSize[0] / 2);
  }

}

function ButtonMoveLeft() {

  for (let i = 0; i < scene4_buttonGroup.length; i++) {
    if (scene4_buttonGroup[i].moveLeftCounter != 0) {
      scene4_buttonGroup[i].moveLeftCounter -= 1;
      scene4_buttonGroup[i].x -= (scene4_buttonBoxEdgeDistant[0] + scene4_buttonBoxSize[0]) / scene4_counterPerIndex;
    }

    if (scene4_buttonGroup[i].moveLeftCounterSP != 0) {
      scene4_buttonGroup[i].moveLeftCounterSP -= scene4_spMoveLeftSpeed;
      scene4_buttonGroup[i].x -= (scene4_buttonBoxEdgeDistant[0] + scene4_buttonBoxSize[0]) / scene4_counterPerIndex * scene4_spMoveLeftSpeed;
    }
  }

}

function AddScore(delta) {
  scene4_score += delta;
  if (scene4_score < 0) scene4_score = 0;
  scene4_scoreUI.text.text = scene4_score.toFixed(0);
  scene4_scoreUI.position.set(screenWidth - 45 - scene4_scoreUI.text.width - 15, 10);

  scene4_energyBar.width = scene4_score * 3;

  CheckScoreLevel();
}

function CheckScoreLevel() {
  let degree = scene4_barSize[0] * 4 / 4;

  if (scene4_energyBar.width <= degree / 3) scene4_scoreLevel = 0;
  else if (scene4_energyBar.width < degree) scene4_scoreLevel = 1;
  else if (scene4_energyBar.width < degree * 2) scene4_scoreLevel = 2;
  else if (scene4_energyBar.width < degree * 3) scene4_scoreLevel = 3;
  else if (scene4_energyBar.width < degree * 4) scene4_scoreLevel = 4;
  else if (scene4_energyBar.width >= degree * 4) scene4_scoreLevel = 5;

  let k = 0;

  if (scene4_scoreLevel != scene4_currentScoreLevel) {
    scene4_currentScoreLevel = scene4_scoreLevel;

    scene4_TalkList[0].visible = false;
    for (let i = 1; i < scene4_slimeGroup.length; i++) {
      scene4_TalkList[i].visible = false;
      scene4_slimeGroup[i].visible = false;
    }

    if (scene4_currentScoreLevel >= 1) {
      k = 1;
      scene4_slimeGroup[1].visible = true;
    }

    if (scene4_currentScoreLevel >= 2) {
      k = 2;
      scene4_slimeGroup[2].visible = true;
    }

    if (scene4_currentScoreLevel >= 3) {
      k = 3;
      scene4_slimeGroup[3].visible = true;
    }

    if (scene4_currentScoreLevel >= 4) {
      k = 4;
      scene4_slimeGroup[4].visible = true;
    }
    if (scene4_currentScoreLevel >= 5) {
      k = 5;
      scene4_slimeGroup[5].visible = true;
    }

    scene4_TalkList[k].visible = true;

  }

}



function EndThisScene() {

  for (let i = scene4_keyGroup.length - 1; i >= 0; i--) {
    scene4_keyGroup[i].press = null;
  }

  for (let i = scene4_tickerFunc.length - 1; i >= 0; i--) {
    app.ticker.remove(scene4_tickerFunc[i]);
  }

  if (scene4_currentScoreLevel >= 4) {
    centerComponent.stageResult = 1;
  }
  else {
    centerComponent.stageResult = 0;
  }

  console.log(centerComponent.stageResult);

  EndingFadeFunc(scene4, 'small_game2');
}


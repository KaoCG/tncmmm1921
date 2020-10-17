
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
  scene1_endChar.visible = false;

  //需要重新設定的參數
  {
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
    scene1_countDownTimer = 0;
    scene1_countDownTick = PIXI.settings.TARGET_FPMS * 1000;

  }

  //關閉所有選擇物件
  for (let i = 0; i < scene1_selectableGroup.length; i++) {
    scene1_selectableGroup[i].visible = false;
    scene1_selectableGroup[i].activate = false;
    scene1_selectableGroup[i].instance.stop();
  }

  //開啟所有背景物件，並重置位置
  for (let i = 0; i < 4; i++) {
    scene1_BGObjectGroup[i * 3].visible = true;
    scene1_BGObjectGroup[i * 3 + 1].visible = true;
    scene1_BGObjectGroup[i * 3 + 2].visible = true;
  }
  for (let i = 0; i < scene1_BGObjectGroup.length; i++) {

    scene1_BGObjectGroup[i].x = scene1_setWidth * scene1_BGObjectGroup[i].index;
  }

  //關閉所有普通廣播/B3廣播
  for (let i = 0; i < scene1_RadioList.length; i++) {
    scene1_RadioList.visible = false;
  }
  for (let i = 0; i < scene1_B3RadioList.length; i++) {
    scene1_B3RadioList[i].visible = false;
  }

  for (let i = 0; i < scene1_PosterList.length; i++) {
    scene1_PosterList[i].visible = false;
  }



  //關卡時間
  scene1_stageTimer = 40;
  scene1_itemList = [40, 3, 6, 5, 5, 0, 5, 5, 5, 6];

  //根據關卡進行設定
  switch (centerComponent.currentStage) {
    case 4:
    default:

      scene1_score = 0;
      scene1_energy = 0;
      addEnergy(0);
      scene1_GhostEvent = 0;
      scene1_PlaneEventCounterA = 0; //台字紋
      scene1_PlaneEventCounterB = 0; //書籍
      CheckPlaneEvent();
      scene1_MoneyCounter = 0;
      scene1_GentleMarkCounter = 0;

      centerComponent.HideEndingTriggerA = [false, false, false, false, false, false, false];
      //【0】飛機【1】紳章>3【2】錢袋>5【3】選擇購買掛號【4】藍隊三人【5】對話:台灣人的台灣【6】六三法血量<30%
      centerComponent.HideEndingTriggerB = [false, false, false, false, false, false, false];
      //【0】旭日章(把書給警察)【1】紳章>3【2】錢袋>5【3】選擇長官銅像【4】紅隊三人【5】對話:寧做太平犬【6】六三法血量>70%

      //廣播重置
      scene1_radio = -1;

      //稱號重置
      scene1_title = 4;
      for (let i = 0; i < 9; i++) {
        if (i != scene1_title)
          scene1_CharTitleList[i].visible = false;
        else
          scene1_CharTitleList[i].visible = true;
      }

      //背景畫面安排
      for (let i = 0; i < 4; i++) {
        scene1_BGObjectGroup[i * 3].texture = PIXI.Texture.from("B1L0" + (i % 2));
        scene1_BGObjectGroup[i * 3 + 1].texture = PIXI.Texture.from("B1L1" + (i));
        scene1_BGObjectGroup[i * 3 + 2].texture = PIXI.Texture.from("B1L2" + (i % 2));
      }
      for (let i = 0; i < 5; i++) {
        scene1_selectableGroup[i].visible = true;
        scene1_selectableGroup[i].activate = true;
        scene1_selectableGroup[i].instance.play();
      }

      //教學畫面
      if (centerComponent.readTutorial == false) {
        scene1_runner.instance.stop();
        for (let i = 0; i < scene1_Tutorial.length; i++) {
          //console.log(scene1_Tutorial.length);
          scene1_Tutorial[i].visible = true;
        }
      }
      else {
        SetTickerFunc();
        scene1_runner.instance.play();
      }

      scene1_selectableGroup[4].position.set(2000, 39)
      scene1_selectableGroup[0].position.set(3870, 105);
      scene1_selectableGroup[3].position.set(4500, 178);
      scene1_selectableGroup[1].position.set(7600, 200);
      scene1_selectableGroup[2].position.set(9500, 40);

      scene1_selectableGroup[0].id = 10;
      scene1_selectableGroup[1].id = 11;

      scene1_endChar.x = 12250;
      scene1_stageTimer = 40;
      //40秒的關卡大概是2350甄
      scene1_itemList = [40, 3, 6, 5, 5, 0, 5, 5, 5, 6];
      scene1_randomAddItemTimeLimit = 2350 / 40 * scene1_stageTimer / (scene1_itemList[0] + 4);

      scene1_endChar.visible = true;
      scene1_finalDistant = 11800;

      scene1_currentAudio = 'run1';

      break;
    case 8:
      for (let i = 0; i < 4; i++) {
        scene1_BGObjectGroup[i * 3].texture = PIXI.Texture.from("B2L0" + (i % 2));
        scene1_BGObjectGroup[i * 3 + 1].texture = PIXI.Texture.from("B2L1" + (i));
        scene1_BGObjectGroup[i * 3 + 2].texture = PIXI.Texture.from("B2L2" + (i % 2));
      }

      for (let i = 15; i < 21; i++) {
        scene1_selectableGroup[i].visible = true;
        scene1_selectableGroup[i].activate = true;
        scene1_selectableGroup[i].instance.play();
      }

      scene1_selectableGroup[15].position.set(1330, 165); //雕像(原本在750)
      scene1_selectableGroup[20].position.set(1330, 45);
      scene1_selectableGroup[16].position.set(1748, 165);
      scene1_selectableGroup[17].position.set(scene1_setWidth + 743, 110); //飛機
      //scene1_selectableGroup[17].position.set(500, 110); //飛機
      scene1_selectableGroup[18].position.set(scene1_setWidth * 2 + 2364, 208);
      scene1_selectableGroup[19].position.set(scene1_setWidth * 3 + 1200, 19);

      //建好的雕像先隱藏+不啟動
      scene1_selectableGroup[20].activate = false;
      scene1_selectableGroup[20].visible = false;
      scene1_selectableGroup[20].instance.stop();

      //飛機先不啟動
      //scene1_selectableGroup[17].activate = false;
      scene1_selectableGroup[17].activate = true;
      CheckPlaneEvent();

      //特殊飛機隱藏
      scene1_SPPlane.visible = false;
      scene1_SPPlane.scale.set(globalImageScale,globalImageScale);
      scene1_SPPlane.position.set(scene1_setWidth + 743, 120);
      //scene1_SPPlane.position.set(0,-120);

      scene1_stageTimer = 40;
      scene1_finalDistant = 11800;
      scene1_itemList = [40, 5, 5, 5, 0, 5, 5, 5, 5, 5];
      //40秒的關卡大概是2350甄
      scene1_randomAddItemTimeLimit = 2350 / 40 * scene1_stageTimer / (scene1_itemList[0] + 4);



      scene1_currentAudio = 'run2';

      break;
    case 12:
      for (let i = 0; i < 4; i++) {
        scene1_BGObjectGroup[i * 3].texture = PIXI.Texture.from("B3L0" + (i % 1 + 1));
        scene1_BGObjectGroup[i * 3 + 1].texture = PIXI.Texture.from("B3L1" + (i % 3));
        scene1_BGObjectGroup[i * 3 + 2].texture = PIXI.Texture.from("B3L2" + (i % 2));
      }

      scene1_BGObjectGroup[10].visible = false;

      for (let i = 5; i < 15; i++) {
        scene1_selectableGroup[i].visible = true;
        scene1_selectableGroup[i].activate = true;
        scene1_selectableGroup[i].instance.play();
      }
      scene1_selectableGroup[5].position.set(494, 146);
      scene1_selectableGroup[5].dialog.position.set(65, -30);
      scene1_selectableGroup[6].position.set(1070, 151);
      scene1_selectableGroup[6].dialog.position.set(65, -50);
      scene1_selectableGroup[7].position.set(1863, 142.5);
      scene1_selectableGroup[7].dialog.position.set(40, -40);
      scene1_selectableGroup[8].position.set(scene1_setWidth + 268, 147);
      scene1_selectableGroup[8].dialog.position.set(60, -52);
      scene1_selectableGroup[9].position.set(scene1_setWidth + 735, 152);
      scene1_selectableGroup[9].dialog.position.set(-145, -55);
      scene1_selectableGroup[10].position.set(scene1_setWidth + 1390, 132);
      scene1_selectableGroup[10].dialog.position.set(125, -27);
      scene1_selectableGroup[11].position.set(scene1_setWidth * 2 + 292, 148);
      scene1_selectableGroup[11].dialog.position.set(60, -50);
      scene1_selectableGroup[12].position.set(scene1_setWidth * 2 + 738, 146);
      scene1_selectableGroup[12].dialog.position.set(-142, -42);
      scene1_selectableGroup[13].position.set(scene1_setWidth * 2 + 1340, 146);
      scene1_selectableGroup[13].dialog.position.set(56, -58);
      scene1_selectableGroup[14].position.set(scene1_setWidth * 2 + 1910, 148);
      scene1_selectableGroup[14].dialog.position.set(-75, -42);

      if (scene1_GhostEvent == 5) {
        scene1_selectableGroup[10].visible = false;
        scene1_selectableGroup[10].activate = false;
      }

      scene1_finalDistant = 8065.5;
      scene1_stageTimer = 40;

      scene1_InvitedAmount = 3;
      scene1_B3RadioList[0].visible = true;

      scene1_InvitedPeopleList = [-1, -1, -1];

      scene1_currentAudio = 'run3';

      break;
  }

  if (centerComponent.currentStage != 4) {
    SetTickerFunc();
  }

  for (let i = 0; i < scene1_keyGroup.length; i++) {
    scene1_keyGroup[i].press = scene1_keyFuncroup[i];
  }

  for (var i = scene1_itemGroup.length - 1; i >= 0; i--) {
    //把物件移到池中
    RecycleItem(scene1_itemGroup, i);
  }

  scene1_movingBoard.position.set(0, 0);

  StartingFadeFunc(scene1, scene1_currentAudio);
}

function SetTickerFunc() {
  for (let i = 0; i < scene1_tickerFunc.length; i++) {
    app.ticker.add(scene1_tickerFunc[i]);
  }
}

//設定容器
function SetContainer() {

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

  /*scene1_BGContainerQQ = new PIXI.Container();
    scene1_BGContainerQQ.zIndex = 50;
    scene1_BGContainerQQ.sortableChildren = true;
    scene1_gameBoard.addChild(scene1_BGContainerQQ);*/

}

//設定變數起始值
function LoadSetting() {

  //不需要重新設定的
  //需要紀錄的
  {
    //雕像

    scene1_energyBar = null;
    scene1_bottomDetectLine = null;
    scene1_energy = 0;
    scene1_score = 0;
    scene1_title = 4;
    scene1_radio = -1;

    scene1_itemGroup = [];
    scene1_BGObjectGroup = [];
    // scene1_SPBGObjectGroup = [];
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

    //
    scene1_GhostEvent = 0;
    scene1_PlaneEventCounterA = 0;
    scene1_PlaneEventCounterB = 0;
    scene1_MoneyCounter = 0;
    scene1_GentleMarkCounter = 0;

    scene1_InvitedPeopleList = [0, 0, 0];
  }

}

//動畫製作
function SetObject() {

  //史萊姆Sprite
  {
    scene1_slime.position.set(135, 340);
    scene1_slimeInitY = scene1_slime.position.y;

    let slimeInstance = new PIXI.Sprite(PIXI.Texture.from("slime_sheet_01.gif"));

    //slimeInstance.position.set(150, 302.5);

    slimeInstance.pivot.set(0, 0);

    slimeInstance.width = 150;
    slimeInstance.height = 150;
    slimeInstance.zIndex = 3;

    scene1_slime.addChild(slimeInstance);
    scene1_slime.slimeInstance = slimeInstance;
    scene1_slime.visible = false;

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


    let buttonBoxSize = [115, 68];
    let buttonBoxEdgeDistant = [18, 15];


    let barSize = [115, 30];

    let scene1_uIBoardSP = new PIXI.Container();
    scene1_uIBoardSP.scale.set(globalImageScale + 0.1, globalImageScale + 0.1);
    scene1_uIBoardSP.y = -12;
    scene1_uIBoard.addChild(scene1_uIBoardSP);

    //let default_UI = new PIXI.Sprite(PIXI.Texture.from('Bridge_DefaultUI'));
    //scene1_uIBoardSP.addChild(default_UI);

    let moveDeltaTemp = 3;
    let Blood = new PIXI.Sprite(PIXI.Texture.from('Blood'));
    Blood.x = 16;
    Blood.y = 14 + moveDeltaTemp;
    scene1_uIBoardSP.addChild(Blood);

    let Blood_Mask = new PIXI.Graphics();
    Blood_Mask.beginFill(0xFFFFFF);
    Blood_Mask.drawRect(42, 23, 156.5, 9);
    Blood_Mask.endFill();
    Blood_Mask.visible = true;
    Blood_Mask.position.set(0, moveDeltaTemp);
    scene1_uIBoardSP.addChild(Blood_Mask);

    let Blood_MaskW = new PIXI.Graphics();
    Blood_MaskW.beginFill(0xFFFFFF);
    Blood_MaskW.drawRect(42, 23, 156.5, 9);
    Blood_MaskW.endFill();
    Blood_MaskW.visible = true;
    Blood_MaskW.position.set(0, moveDeltaTemp);
    Blood_MaskW.mask = Blood_Mask;
    scene1_energyBar = Blood_MaskW;
    scene1_uIBoardSP.addChild(Blood_MaskW);

    moveDelta = 10;

    Bridge_CharTilteUIDefault = new PIXI.Sprite(PIXI.Texture.from('Bridge_CharTilteUIDefault'));
    scene1_uIBoardSP.addChild(Bridge_CharTilteUIDefault);
    Bridge_CharTilteUIDefault.x = 17;
    Bridge_CharTilteUIDefault.y = 205 - moveDelta;

    Bridge_CharTilteUI = new PIXI.Sprite(PIXI.Texture.from('Bridge_CharTilteUI'));
    Bridge_CharTilteUI.visible = false;
    scene1_uIBoardSP.addChild(Bridge_CharTilteUI);
    Bridge_CharTilteUI.x = 16;
    Bridge_CharTilteUI.y = 204 - moveDelta;

    Bridge_RadioUI = new PIXI.Sprite(PIXI.Texture.from('Bridge_RadioUI'));
    Bridge_RadioUI.visible = true;
    scene1_uIBoardSP.addChild(Bridge_RadioUI);
    Bridge_RadioUI.x = 84;
    Bridge_RadioUI.y = 209 - moveDelta;

    scene1_CharTitleList = [];

    for (let i = 0; i < 9; i++) {

      let scene1_CharTitle = new PIXI.Sprite(PIXI.Texture.from("CharTitle" + i));

      if (i != scene1_title)
        scene1_CharTitle.visible = false;

      scene1_CharTitle.scale.set(0.079, 0.079);

      scene1_CharTitle.x = 1;
      scene1_CharTitleList.push(scene1_CharTitle);

      scene1_CharTitle.x = 52 - scene1_CharTitle.width / 2;
      scene1_CharTitle.y = 212 - moveDelta;

      scene1_uIBoardSP.addChild(scene1_CharTitle);

    }


    scene1_RadioList = [];
    for (let i = 0; i < 5; i++) {

      let scene1_Radio = new PIXI.Sprite(PIXI.Texture.from("Radio" + i));
      scene1_Radio.visible = false;

      scene1_Radio.scale.set(0.079, 0.079);

      scene1_Radio.x = 101;
      scene1_Radio.y = 212.2 - moveDelta;
      scene1_RadioList.push(scene1_Radio);

      scene1_uIBoardSP.addChild(scene1_Radio);

    }

    scene1_B3RadioList = [];
    for (let i = 0; i < 4; i++) {

      let scene1_Radio = new PIXI.Sprite(PIXI.Texture.from("B3R0" + i));
      scene1_Radio.visible = false;

      scene1_Radio.scale.set(0.189, 0.189);

      scene1_Radio.x = 101;
      scene1_Radio.y = 212 - moveDelta;
      scene1_B3RadioList.push(scene1_Radio);

      scene1_uIBoardSP.addChild(scene1_Radio);
    }

    //按鈕
    {
      Button_choose = new PIXI.Sprite(PIXI.Texture.from('Button_choose'));
      Button_choose_down = new PIXI.Sprite(PIXI.Texture.from('Button_choose_down'));
      Button_jamp = new PIXI.Sprite(PIXI.Texture.from('Button_jamp'));
      Button_jamp_down = new PIXI.Sprite(PIXI.Texture.from('Button_jamp_down'));
      Button_choose.scale.set(0.1, 0.1);
      Button_choose_down.scale.set(0.1, 0.1);
      Button_jamp.scale.set(0.1, 0.1);
      Button_jamp_down.scale.set(0.1, 0.1);
      Button_choose_down.visible = false;
      Button_jamp_down.visible = false;
      Button_choose.position.set(250 - 5, 200 - moveDelta);
      Button_choose_down.position.set(251.3 - 5, 201.2 - moveDelta);
      Button_jamp.position.set(250 + 70, 200 - moveDelta);
      Button_jamp_down.position.set(251.3 + 70, 201.2 - moveDelta);
      scene1_uIBoardSP.addChild(Button_choose);
      scene1_uIBoardSP.addChild(Button_choose_down);
      scene1_uIBoardSP.addChild(Button_jamp);
      scene1_uIBoardSP.addChild(Button_jamp_down);
    }

    //點擊UI
    {
      let clickBox = new PIXI.Graphics();
      clickBox.beginFill(0xFFFFFF).drawRect(0, 0, buttonBoxSize[0], buttonBoxSize[1]).endFill();
      clickBox.x = screenWidth - buttonBoxSize[0] - buttonBoxEdgeDistant[0] - 10;
      clickBox.y = screenHeight - buttonBoxSize[1] - buttonBoxEdgeDistant[1] + 20 - moveDelta;;
      clickBox.visible = true;
      clickBox.alpha = 0;
      scene1_uIBoard.addChild(clickBox);
      scene1_buttonGroup.push(clickBox);
      clickBox.interactive = true;
      clickBox.buttonMode = true;
    }

    //選擇UI
    {
      let selectBox = new PIXI.Graphics();
      selectBox.beginFill(0xFFFFFF).drawRect(0, 0, buttonBoxSize[0], buttonBoxSize[1]).endFill();
      selectBox.x = screenWidth - (buttonBoxSize[0] + buttonBoxEdgeDistant[0]) * 2 - 30;
      selectBox.y = screenHeight - (buttonBoxSize[1] + buttonBoxEdgeDistant[1]) + 20 - moveDelta;;
      selectBox.visible = true;
      selectBox.alpha = 0;
      scene1_uIBoard.addChild(selectBox);
      scene1_buttonGroup.push(selectBox);
      selectBox.interactive = true;
      selectBox.buttonMode = true;
    }

    //drawRect的圖案尺寸調整，其實是用scale的方式達成，
    //因此初始長度為0的話，就無法調整了~ (因為0乘以多少都是0)



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

    scene1_setWidth = B1O00.width;

    //console.log(scene1_setWidth);
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

  //padding可以處理字體顯示位置不正確的問題
  let style = new PIXI.TextStyle({
    fontFamily: "pixelSilver",
    fontSize: 72,
    fill: "white",
    letterSpacing: 9,
    padding: 72
  });

  scene1_InvitedAmount = 0;

  //選擇物件
  {


    for (var i = 0; i < 21; i++) {
      let B1S00 = new PIXI.Container();
      B1S00.position.set(2000, 100);
      B1S00.activate = true;
      B1S00.zIndex = 1;

      let tableframes = [];
      let whiteTexture = PIXI.Texture.from("B1S02")
      B1S00.id = 1;


      switch (i) {

        //0~4場景一
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
          tableframes = [PIXI.Texture.from("B1S" + i + "0"), PIXI.Texture.from("B1S" + i + "1")];
          whiteTexture = PIXI.Texture.from("B1S" + i + "2");
          break;

        //5~14 場景三
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
          let j = i - 5;
          tableframes = [PIXI.Texture.from("B3S" + (j) + "0"), PIXI.Texture.from("B3S" + (j) + "1")];
          whiteTexture = PIXI.Texture.from("B3S" + (j) + "2");
          B1S00.id = 30 + j;

          let dialog = new PIXI.Sprite(PIXI.Texture.from("B3S" + (j) + "3"));
          dialog.scale.set(0.3, 0.3);
          B1S00.addChild(dialog);
          B1S00.dialog = dialog;
          break;

        //15~20 場景二
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
          let k = i - 15;
          tableframes = [PIXI.Texture.from("B2S" + (k) + "0"), PIXI.Texture.from("B2S" + (k) + "1")];
          whiteTexture = PIXI.Texture.from("B2S" + (k) + "2");
          B1S00.id = 20 + k;

          break;
      }

      let tableInstance = new PIXI.AnimatedSprite(tableframes);
      tableInstance.scale.set(globalImageScale, globalImageScale);
      tableInstance.animationSpeed = 0.05;
      tableInstance.stop();
      tableInstance.tint = 0xFFFFFF;

      let tableDetectBox = new PIXI.Graphics();
      tableDetectBox.beginFill(0x700028).drawRect(0, 0, tableInstance.width * 0.5, tableInstance.height * 0.5).endFill();
      tableDetectBox.visible = false;
      tableDetectBox.position.set(tableInstance.width * (0.5 - 0.5 / 2), tableInstance.height * (0.6));

      let white = new PIXI.Sprite(whiteTexture);
      white.alpha = 0;
      white.visible = false;

      scene1_selectableBoard.addChild(B1S00);
      B1S00.addChild(tableInstance);
      B1S00.addChild(tableDetectBox);

      tableInstance.addChild(white);

      B1S00.instance = tableInstance;
      B1S00.detectArea = tableDetectBox;
      B1S00.white = white


      scene1_selectableGroup.push(B1S00);

    }

    // 飛機(特殊)
    {
      let B1S00 = new PIXI.Container();
      B1S00.position.set(2000, 100);
      B1S00.zIndex = 1;
      B1S00.visible = false;

      let tableframes = PIXI.Texture.from("B2S23");

      let tableInstance = new PIXI.Sprite(tableframes);
      //tableInstance
      B1S00.instance = tableInstance;

      scene1_selectableBoard.addChild(B1S00);
      B1S00.addChild(tableInstance);

      scene1_SPPlane = B1S00;
      scene1_SPPlane.scale.set(globalImageScale, globalImageScale);
    }

    scene1_PosterList = [];
    //POSTER
    {
      for (let i = 0; i < 10; i++) {
        let tableframes = PIXI.Texture.from("B2Poster");
        let tableInstance = new PIXI.Sprite(tableframes);
        tableInstance.scale.set(globalImageScale * globalImageScale , globalImageScale * globalImageScale);
        tableInstance.visible = false;
        //tableInstance.x = scene1_SPPlane.x + scene1_SPPlane.width / 2 - tableInstance.width / 2;
        //tableInstance.y = scene1_SPPlane.y + scene1_SPPlane.height / 2 - tableInstance.height / 2 + 10;
        scene1_selectableBoard.addChild(tableInstance);
        scene1_PosterList.push(tableInstance);
      }
    }


    {
      scene1_endChar = new PIXI.Container();
      scene1_endChar.position.set(1000, 85);
      scene1_endChar.activate = true;
      scene1_endChar.zIndex = 1;

      let tableframes = PIXI.Texture.from("B1C2");

      let tableInstance = new PIXI.Sprite(tableframes);
      tableInstance.scale.set(globalImageScale, globalImageScale);

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

      scene1_selectableBoard.addChild(scene1_endChar);
      scene1_endChar.addChild(tableInstance);

      scene1_endChar.instance = tableInstance;

    }
  }

  //runner
  {

    scene1_runner_frame = [PIXI.Texture.from("runner4"), PIXI.Texture.from("runner5"), PIXI.Texture.from("runner0"), PIXI.Texture.from("runner1"), PIXI.Texture.from("runner2"), PIXI.Texture.from("runner3")];
    scene1_runner_jumpframe = [PIXI.Texture.from("runnerJump")];

    let runner = new PIXI.AnimatedSprite(scene1_runner_frame);
    runner.animationSpeed = 0.15;
    runner.pivot.set(0, 0);
    runner.test = false;
    runner.play();

    runner.scale.set(globalImageScale, globalImageScale);
    //1000->-200
    //runner.zIndex = 1;
    scene1_runner.addChild(runner);
    scene1_runner.instance = runner;
    runner.x = -20;
    runner.y = 85;


    //一定要畫在0,0，再去條位置，用getGlobalPosition才能正確讀取。
    let runnerDetectBox = new PIXI.Graphics();
    runnerDetectBox.lineStyle(0, 0x82cd2e, 1);
    runnerDetectBox.beginFill(0x704828);
    runnerDetectBox.drawRect(0, 0, runner.width * 0.1, runner.height * 0.2);
    runnerDetectBox.endFill();
    //slimeDetectBox.position.set(slimeInstance.getGlobalPosition().x - slimeInstance.width / 2 + slimeInstance.width * 0.7 / 2, slimeInstance.getGlobalPosition().y - slimeInstance.height / 2 + slimeInstance.height * 0.7 / 2);
    runnerDetectBox.position.set(runner.x + runner.width / 2 - 20, runner.y + runner.height / 2 - 30);
    runnerDetectBox.zIndex = 100;
    runnerDetectBox.alpha = 0.5;
    runnerDetectBox.visible = false;
    scene1_runner.addChild(runnerDetectBox);
    scene1_runner.detectArea = runnerDetectBox;

    scene1_runner.y = -2;
    scene1_runnerInitY = scene1_runner.y;

  }

  //教學物件
  {
    scene1_Tutorial = [];
    for (let i = 0; i < 5; i++) {
      let B1O00 = new PIXI.Sprite(PIXI.Texture.from("Tutorial0" + (i)));
      B1O00.zIndex = 250 - i;
      B1O00.scale.set(globalImageScale * 0.2, globalImageScale * 0.2);
      scene1.addChild(B1O00);
      scene1_Tutorial.push(B1O00);
      B1O00.x = (screenWidth - B1O00.width) / 2;
      B1O00.y = -45;
      B1O00.visible = false;
      B1O00.interactive = true;

      if (i == 4) {
        B1O00.addListener("pointerdown", function () {
          B1O00.visible = false;
          scene1_runner.instance.play();
          centerComponent.readTutorial = true;
          SetTickerFunc();
        })
      }
      else {
        B1O00.addListener("pointerdown", function () { B1O00.visible = false; })
      }

    }
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
  }

  if (scene1_itemList[0] == 0) {
    console.log("No Item Left");
    return;
  }

  let reuseItem = scene1_prepareItemGroup[0];

  reuseItem.parent.removeChild(reuseItem);
  scene1_prepareItemGroup.splice(0, 1);

  scene1_itemBoard.addChild(reuseItem);
  scene1_itemGroup.push(reuseItem);

  ItemReset(reuseItem);

}

testCounter = 0;

function ItemReset(item) {

  item.x = scene1_movingDistant + screenWidth * 1.1;
  //item.y = 210 + 40 * Math.floor(Math.random() * 3);
  item.y = 280 - 35 * Math.floor(Math.random() * 4) * 2;

  //在這邊決定出現的道具是哪個
  //item.instance.texture = scene1_appleTextures[3];
  var itemIndex = Math.floor(Math.random() * 9);
  let bugCrasher = 0;

  while (scene1_itemList[itemIndex + 1] == 0 && bugCrasher < 50) { itemIndex = Math.floor(Math.random() * 9); bugCrasher++; }
  if (bugCrasher >= 50) { console.log("BUG"); }

  testCounter++;

  scene1_itemList[itemIndex + 1] -= 1;
  scene1_itemList[0] -= 1;

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

function CheckPlaneEvent() {

  if (scene1_PlaneEventCounterA >= 5 && scene1_PlaneEventCounterB >= 5) {
    scene1_selectableGroup[17].instance.textures = [PIXI.Texture.from("B2S20"), PIXI.Texture.from("B2S21")];
    if (centerComponent.currentStage == 8) scene1_selectableGroup[17].activate = true;
    scene1_selectableGroup[17].instance.play();
  }
  else {
    scene1_selectableGroup[17].instance.textures = [PIXI.Texture.from("B2S24")];
    scene1_selectableGroup[17].instance.stop();
  }





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
        //scene1_movingDistant += scene1_movingSpeed;
        scene1_movingDistant += scene1_finalDistant / (scene1_stageTimer * scene1_countDownTick);
        scene1_movingBoard.x = -scene1_movingDistant;

        scene1_BGContainerA.x = -scene1_movingDistant * 1.1;
        scene1_BGContainerB.x = -scene1_movingDistant;
        scene1_BGContainerC.x = -scene1_movingDistant * 0.4;

        if (centerComponent.currentStage != 12) {
          if (scene1_movingDistant >= scene1_finalDistant) {
            EndThisScene();
          }
        }


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
            scene1_BGObjectGroup[i].x += scene1_setWidth * 4;

          }
        }

        else if (scene1_BGObjectGroup[i].layerIndex == 1) {
          if (scene1_BGObjectGroup[i].x + (scene1_BGContainerB.x) <= -scene1_BGObjectGroup[i].width * 1.5) {

            if (centerComponent.currentStage == 12) {
              scene1_BGObjectGroup[i].x += scene1_setWidth * 3;
            }
            else {
              scene1_BGObjectGroup[i].x += scene1_setWidth * 4;
            }

          }
        }

        else if (scene1_BGObjectGroup[i].layerIndex == 2) {
          if (scene1_BGObjectGroup[i].x + (scene1_BGContainerC.x) <= -scene1_BGObjectGroup[i].width * 1.5) {
            scene1_BGObjectGroup[i].x += scene1_setWidth * 4;
          }
        }

      }

      for (var i = 0; i < scene1_itemGroup.length; i++) {

        if (scene1_itemGroup[i].x + (scene1_movingDistant * -1) <= -400) {

          //把物件移到池中
          RecycleItem(scene1_itemGroup, i);

        }
      }

      for (var i = 0; i < scene1_selectableGroup.length; i++) {

        if (centerComponent.currentStage == 12) {
          if (scene1_selectableGroup[i].visible && scene1_selectableGroup[i].x + (scene1_movingDistant * -1) <= -400) {
            if (scene1_selectableGroup[i].activate == false) {
              scene1_selectableGroup[i].visible = false;
            }
            else {
              scene1_selectableGroup[i].x += scene1_setWidth * 3;
              scene1_selectableGroup[i].instance.gotoAndPlay(0);
            }
          }
        }

      }

    }

    //撿取物件相關
    scene1_tickerFunc.push(EatApple);
    function EatApple(deltaTime) {

      //撿取蘋果
      for (let i = 0; i < scene1_itemGroup.length; i++) {
        if (scene1_itemGroup[i].activate && hitTestRectangle(scene1_runner.detectArea, scene1_itemGroup[i].detectArea)) {

          switch (scene1_itemGroup[i].id) {
            case 0:
              addEnergy(-2);
              scene1_PlaneEventCounterB += 1; //書籍
              CheckPlaneEvent();
              break;
            case 1:
              addEnergy(+1);
              break;
            case 2:
              addEnergy(+2);
              scene1_PlaneEventCounterA += 1; //台字紋
              CheckPlaneEvent();
              break;
            case 3:
              addEnergy(0);
              scene1_GhostEvent += 1;
              break;
            case 4:
              addEnergy(0);
              scene1_GentleMarkCounter += 1;
              if (scene1_GentleMarkCounter >= 3) {
                centerComponent.HideEndingTriggerA[1] = true;
                centerComponent.HideEndingTriggerB[1] = true;
              }
              break;
            case 5:
              addEnergy(-1);
              break;
            case 6:
              addEnergy(-1);
              break;
            case 7:
              addEnergy(0);
              scene1_MoneyCounter += 1;
              if (scene1_MoneyCounter >= 3) {
                centerComponent.HideEndingTriggerA[2] = true;
                centerComponent.HideEndingTriggerB[2] = true;
              }
              break;
            case 8:
              addEnergy(+2);
              break;
          }



          RecycleItem(scene1_itemGroup, i);

          //PIXI.sound.play('choose_click');
          //PIXI.sound.play('small_game_click');
          PIXI.sound.play('get_something');

          //3符咒 4紳章 7錢袋
        }
      }



    }

    //隨機產生可碰觸的物件
    scene1_tickerFunc.push(RandomAddItem);
    function RandomAddItem(deltaTime) {

      if (centerComponent.currentStage != 12) {
        scene1_randomAddItemTimer += 1;
        if (scene1_randomAddItemTimer >= scene1_randomAddItemTimeLimit + 15) {
          ReuseItem();
          scene1_randomAddItemTimer = 15;
        }
      }

    }

    //時間倒數
    {
      /*
       scene1_tickerFunc.push(TimerCountDown);
       function TimerCountDown(deltaTime) {
   
         if (scene1_stageTimer > 0) {
           scene1_countDownTimer += 1;
           if (scene1_countDownTimer > scene1_countDownTick) {
             scene1_countDownTimer = 0;
             scene1_stageTimer -= 1;
   
             scene1_uiGroup[1].text.text = scene1_stageTimer;
             //scene1_uiGroup[1].text.text = globalScale.toFixed(2);
           }
         }
         else if (scene1_stageTimer == 0) {
           scene1_stageTimer -= 1;
           //console.log("GAME OVER");
           EndThisScene();
         }
       }
   */
    }
  }

  //史萊姆跳躍
  {

    function SlimeJump() {
      if (scene1_slimeJumping) return;
      else scene1_slimeJumping = true;

      scene1_runner.instance.stop();

      if (scene1_runner.instance.currentFrame < 3) {
        scene1_runner_jumpframe[0] = PIXI.Texture.from("runnerS5")
      }
      else {
        scene1_runner_jumpframe[0] = PIXI.Texture.from("runnerS2")
      }

      scene1_runner.instance.textures = scene1_runner_jumpframe;
      //scene1_runnerS.visible = false;



      scene1_slimeJumpSpeed = scene1_slimeJumpInitSpeed;
      app.ticker.add(function SlimeJumpTicker(deltaTime) {

        scene1_slime.position.y -= scene1_slimeJumpSpeed;
        scene1_runner.position.y -= scene1_slimeJumpSpeed;
        scene1_slimeJumpSpeed -= scene1_slimeGravity;

        if (scene1_slime.position.y > scene1_slimeInitY) {
          scene1_slime.position.y = scene1_slimeInitY;
          scene1_runner.position.y = scene1_runnerInitY;
          scene1_slimeJumping = false;

          scene1_runner.instance.textures = scene1_runner_frame;
          scene1_runner.instance.play();
          app.ticker.remove(SlimeJumpTicker);
        }
      });
    }
  }

  //史萊姆選擇
  {
    function SlimeSelect() {

      if (scene1_slimeJumping) return;

      //當按下選擇按鈕時
      //let canSelect = false;
      let index = -1;
      let id = -1;

      //確認所有啟動中的可選物件是否與玩家重疊
      for (let i = 0; i < scene1_selectableGroup.length; i++) {

        //當成功碰到的話
        if (scene1_selectableGroup[i].activate && hitTestRectangle(scene1_runner.detectArea, scene1_selectableGroup[i].detectArea)) {

          //任意物件都只能啟動一次
          scene1_selectableGroup[i].activate = false;
          scene1_selectableGroup[i].instance.gotoAndStop(1);
          //canSelect = true;
          index = i;
          id = scene1_selectableGroup[index].id;
          //console.log(id); 

          break;
        }

      }

      //如果都沒有人符合條件，則回歸
      if (index == -1) return;

      let counter = 0;
      scene1_selectableGroup[index].white.visible = true;
      app.ticker.add(function ChooseShine(deltaTime) {
        counter++;
        if (counter <= 15) {
          scene1_selectableGroup[index].white.alpha += 0.06;
        }
        else if (counter <= 30) {

          if (id == 20) {
            scene1_selectableGroup[index].white.alpha = 0;
            scene1_selectableGroup[index].visible = false;
            index = 20;
            id = 25;
            scene1_selectableGroup[index].white.visible = true;
            scene1_selectableGroup[index].white.alpha = 1;
            scene1_selectableGroup[index].visible = true;
          }
          scene1_selectableGroup[index].white.alpha -= 0.06;
        }
        else {
          scene1_selectableGroup[index].white.alpha = 0;
          scene1_selectableGroup[index].white.visible = false;
          app.ticker.remove(ChooseShine);
        }
      });

      //結算觸發物件
      //根據此受選物件的編號不同產生結果
      PIXI.sound.play('choose_click');

      scene1_movingPauseTimer = 30;

      if (id == 0) {

      }
      else if (id == 1) {

      }
      else if (id == 10) {
        addEnergy(-5);
      }
      else if (id == 11) {

        addEnergy(+5);
      }
      //場景二的雕像
      else if (id == 25 || id == 20) {
        centerComponent.HideEndingTriggerB[3] = true;
        addEnergy(+5);
      }
      //場景二的掛號
      else if (id == 21) {
        centerComponent.HideEndingTriggerA[3] = true;
        addEnergy(-5);
      }
      //場景二的飛機
      else if (id == 22) {
        centerComponent.HideEndingTriggerA[0] = true;

        let timer = 0;
        let totaltimer = 1000;
        let timerLimit = 245;
        let stage = 0;
        let totalX = 100000;
        let totalY = 180000;
        let scene1_SPPlaneInitX = scene1_SPPlane.x;
        let scene1_SPPlaneInitY = scene1_SPPlane.y;
        let posterIndex = 0;
        let dt = 0;
        let dty = 0;
        app.ticker.add(function PlaneTakeOff() {

          timer++;
          if (stage == 0 && timer > 150) {
            scene1_SPPlane.visible = true;
            stage = 1
            timer = 0;
          }
          else if (stage == 1) {

            dt = (1 - timer / totaltimer);
            if (dt > 1) dt = 1;
            scene1_SPPlane.x = scene1_SPPlaneInitX + totalX * (1 - (dt * dt * dt - 3 * dt * dt + 3 * dt));

            if (timer >= timerLimit) {
              dty = (1 - (timer - timerLimit) / (totaltimer - timerLimit));
              scene1_SPPlane.y = scene1_SPPlaneInitY - totalY * (1 - (dty * dty * dty - 3 * dty * dty + 3 * dty));
            }

            if (timer == 350) {

              timer = 0;
              scene1_SPPlane.y = -160;
              scene1_SPPlane.scale.set(-1 * globalImageScale * globalImageScale, globalImageScale * globalImageScale);
              stage = 2;

            }
          }
          else if (stage == 2) {

            scene1_SPPlane.x -= 40;

            if (timer % 7 == 0) {

              //////////////////
              console.log(posterIndex);
              let tableInstance = scene1_PosterList[posterIndex];
              posterIndex++;

              tableInstance.alpha = 1;
              tableInstance.visible = true;
              tableInstance.x = scene1_SPPlane.x + scene1_SPPlane.width / 2 - tableInstance.width / 2;
              tableInstance.y = scene1_SPPlane.y + scene1_SPPlane.height / 2 - tableInstance.height / 2 + 10;

              let posterTimer = 0;
              app.ticker.add(function PosterDrop() {
                tableInstance.y += 1.2;
                posterTimer++;
                if (posterTimer > 50) {
                  tableInstance.alpha -= 0.06;

                  if(tableInstance.alpha == 0)
                  {
                    app.ticker.remove(PosterDrop);
                  }
                }

                //tableInstance.y += 4;
              })
            }

            if (timer == 50) {
              app.ticker.remove(PlaneTakeOff);
            }

          }




        })
      }
      //B3的人物被選取了
      else if (id >= 30 && id <= 39) {

        if (scene1_InvitedAmount == 0) return;

        scene1_B3RadioList[3 - scene1_InvitedAmount].visible = false;
        scene1_InvitedAmount -= 1;
        scene1_InvitedPeopleList[scene1_InvitedAmount] = id % 10;
        scene1_B3RadioList[3 - scene1_InvitedAmount].visible = true;

        if (scene1_InvitedAmount == 0) {
          let timer = 0;
          app.ticker.add(function EndTimer(deltaTime) {

            timer++;

            if (timer > 100) {
              app.ticker.remove(EndTimer);
              EndThisScene();
            }
          });

        }

      }

    }
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

  //按鈕相關
  {
    scene1_buttonGroup[0].addListener("pointerdown", function () {
      Button_jamp.visible = false;
      Button_jamp_down.visible = true;
      PIXI.sound.play('jump');
      SlimeJump();
    });
    scene1_buttonGroup[0].addListener("pointerup", function () {
      Button_jamp.visible = true;
      Button_jamp_down.visible = false;
    });

    scene1_buttonGroup[1].addListener("pointerdown", function () {
      Button_choose.visible = false;
      Button_choose_down.visible = true;
      SlimeSelect();
    });

    scene1_buttonGroup[1].addListener("pointerup", function () {
      Button_choose.visible = true;
      Button_choose_down.visible = false;
    });

  }

}

function addExp(addScore = 0) {

  scene1_score += addScore;

  if (scene1_score >= 25) {
    changeTitle(8);
  }
  else if (scene1_score >= 20) {
    changeTitle(7);
  }
  else if (scene1_score >= 15) {
    changeTitle(6);
  }
  else if (scene1_score >= 8) {
    changeTitle(5);
  }
  else if (scene1_score > -8) {
    changeTitle(4);
  }
  else if (scene1_score > -15) {
    changeTitle(3);
  }
  else if (scene1_score > -20) {
    changeTitle(2);
  }
  else if (scene1_score > -25) {
    changeTitle(1);
  }
  else {
    changeTitle(0);
  }




}

function changeTitle(newTitle = 0) {

  if (newTitle == scene1_title) return;

  scene1_CharTitleList[scene1_title].visible = false;


  scene1_title = newTitle;

  scene1_CharTitleList[newTitle].visible = true;

  let timer = 0;
  let counter = 0;
  let counterLimit = 8;

  app.ticker.add(function TitleShine(deltaTime) {

    timer++;

    if (timer > 20) {
      timer = 0;
      counter++;

      if (counter % 2 == 0) {

        Bridge_CharTilteUI.visible = false;
      }
      else if (counter % 2 == 1) {

        Bridge_CharTilteUI.visible = true;
      }

      if (counter >= counterLimit) {
        app.ticker.remove(TitleShine);
      }
    }
  });

}

function addEnergy(addScore = 10) {

  if (addScore > 0) addExp(1);
  else if (addScore < 0) addExp(-1);

  scene1_energy += addScore;

  let total = 156;

  let rate = (30 / 90 + scene1_energy / 90)
  if (rate > 1) rate = 1;
  if (rate < 0) rate = 0;

  centerComponent.rate = rate;
  scene1_energyBar.x = total * rate;

  showRadio(rate);

}

function showRadio(rate = 0) {

  if (rate >= 0.4 && scene1_radio == -1) {
    scene1_radio = 0;
  }
  else if (rate >= 0.5 && scene1_radio == 0) {
    scene1_radio = 1;
  }
  else if (rate >= 0.6 && scene1_radio == 1) {
    scene1_radio = 2;
  }
  else if (rate >= 0.7 && scene1_radio == 2) {
    scene1_radio = 3;
  }
  else if (rate >= 0.8 && scene1_radio == 3) {
    scene1_radio = 4;
  }
  else return;

  if (scene1_radio != 0) {
    scene1_RadioList[scene1_radio - 1].visible = false;
  }

  let timer = 0;
  let counter = 0;
  let counterLimit = 24;

  scene1_RadioList[scene1_radio].visible = true;
  scene1_RadioList[scene1_radio].tint = "0x07ffa5";

  //07ffa5
  let temp = scene1_radio;
  app.ticker.add(function TitleShine(deltaTime) {

    if (scene1_RadioList[temp] === undefined) {
      scene1_RadioList[temp].visible = false;
      app.ticker.remove(TitleShine);
      return;
    }

    timer++;

    if (timer > 15) {
      timer = 0;
      counter++;

      if (counter % 2 == 0) {

        scene1_RadioList[temp].tint = "0x07ffa5";
      }
      else if (counter % 2 == 1) {
        scene1_RadioList[temp].tint = "0xFFFFFF";
      }

      if (counter >= counterLimit) {
        scene1_RadioList[temp].visible = false;
        app.ticker.remove(TitleShine);
      }
    }
  });

}

async function EndThisScene() {

  console.log(scene1_movingDistant);

  for (let i = 0; i < scene1_keyGroup.length; i++) {
    scene1_keyGroup[i].press = null;
  }
  for (let i = 0; i < scene1_tickerFunc.length; i++) {
    app.ticker.remove(scene1_tickerFunc[i]);
  }


  EndingFadeFunc(scene1, scene1_currentAudio);
}







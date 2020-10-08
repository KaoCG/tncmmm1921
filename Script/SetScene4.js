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

  for (let i = 1; i < scene4_slimeGroup.length; i++) {
    scene4_slimeGroup[i].visible = false;
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
  scene4_stageTimer = 20;
  scene4_countDownTimer = 0;

  //讓按鈕不會重複位置
  scene4_lastButDir = -1;

  if (scene4_gameMode == 1) {
    await ReuseButton(-1);
    //await ReuseButton(-1);
  }


  scene4.visible = true;

  StartingFadeFunc(scene4,'small_game2');
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

  app.renderer.backgroundColor = 0x30BCED;

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

      let maskBar = new PIXI.Graphics();
      maskBar.beginFill(0xFFFFFF);
      maskBar.drawRect(0, 0, scene4_barSize[0] * scene4_barSizeMaskMult, scene4_barSize[1] * 2);
      maskBar.x = scene4_barEdgeDistant[0] + 80;;
      maskBar.y = 0;
      maskBar.endFill();
      maskBar.zIndex = 1;
      maskBar.alpha = 0.8;
      scene4_uIBoard.addChild(maskBar);

      let maskBar_V = new PIXI.Graphics();
      maskBar_V.beginFill(0xFFFFFF);
      maskBar_V.drawRect(0, 0, scene4_barSize[0] * scene4_barSizeMaskMult, scene4_barSize[1] * 2);
      maskBar_V.x = scene4_barEdgeDistant[0] + 80;;
      maskBar_V.y = 0;
      maskBar_V.endFill();
      maskBar_V.zIndex = -1;
      maskBar_V.alpha = 0.8;
      scene4_uIBoard.addChild(maskBar_V);

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
      scene4_uIBoard.addChild(scene4_energyBar);

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
      scene4_uIBoard.addChild(energyBarText);
      energyBarText.position.set(20, 16);
      energyBarText.visible = true;

    }

    {
      let edge = 20;

      let dialogBoxA = new PIXI.Graphics();
      dialogBoxA.beginFill(0xFFFFFF);
      dialogBoxA.drawRect(0, 0, scene4_buttonBoxSize[0], scene4_buttonBoxSize[1]);
      dialogBoxA.endFill();
      dialogBoxA.zIndex = 10;
      dialogBoxA.visible = true;
      dialogBoxA.alpha = 0;
      x = screenWidth / 2 - dialogBoxA.width / 2; y = 80;
      dialogBoxA.position.set(x, y);
      scene4_uIBoard.addChild(dialogBoxA);
      dialogBoxA.interactive = true;
      dialogBoxA.buttonMode = true;
      dialogBoxA.on("pointerdown", function () {
        DetectButtonInput(0);
      });

      let dialogBoxB = new PIXI.Graphics();
      dialogBoxB.beginFill(0xFFFFFF);
      dialogBoxB.drawRect(0, 0, scene4_buttonBoxSize[0], scene4_buttonBoxSize[1]);
      dialogBoxB.endFill();
      dialogBoxB.zIndex = 10;
      dialogBoxB.visible = true;
      dialogBoxB.alpha = 0;
      x = screenWidth - dialogBoxB.width - edge; y = screenHeight / 2 - dialogBoxB.height / 2 + 40 - 20;
      dialogBoxB.position.set(x, y);
      scene4_uIBoard.addChild(dialogBoxB);
      dialogBoxB.interactive = true;
      dialogBoxB.buttonMode = true;
      dialogBoxB.on("pointerdown", function () {
        DetectButtonInput(1);
      });

      let dialogBoxC = new PIXI.Graphics();
      dialogBoxC.beginFill(0xFFFFFF);
      dialogBoxC.drawRect(0, 0, scene4_buttonBoxSize[0], scene4_buttonBoxSize[1]);
      dialogBoxC.endFill();
      dialogBoxC.zIndex = 10;
      dialogBoxC.visible = true;
      dialogBoxC.alpha = 0;
      x = screenWidth / 2 - dialogBoxC.width / 2; y = screenHeight - dialogBoxC.height - 35;
      dialogBoxC.position.set(x, y);
      scene4_uIBoard.addChild(dialogBoxC);
      dialogBoxC.interactive = true;
      dialogBoxC.buttonMode = true;
      dialogBoxC.on("pointerdown", function () {
        DetectButtonInput(2);
      });

      let dialogBoxD = new PIXI.Graphics();
      dialogBoxD.beginFill(0xFFFFFF);
      dialogBoxD.drawRect(0, 0, scene4_buttonBoxSize[0], scene4_buttonBoxSize[1]);
      dialogBoxD.endFill();
      dialogBoxD.zIndex = 10;
      dialogBoxD.visible = true;
      dialogBoxD.alpha = 0;
      x = edge; y = screenHeight / 2 - dialogBoxD.height / 2 + 40 - 20;
      dialogBoxD.position.set(x, y);
      scene4_uIBoard.addChild(dialogBoxD);
      dialogBoxD.interactive = true;
      dialogBoxD.buttonMode = true;
      dialogBoxD.on("pointerdown", function () {
        DetectButtonInput(3);
      });


      /*
      if (dir == 0) {  }
      else if (dir == 1) { }
      else if (dir == 2) {  }
      else if (dir == 3) { }*/

    }

  }

  //史萊姆Sprite
  {
    var peopleID = 5;
    var x = 0;
    var y = 6;

    for (let i = 0; i < 15; i++) {
      let slime = new PIXI.Container();
      slime.no = 0;

      slime.sortableChildren = true;

      peopleID = (peopleID + 7) % 6;
      x = (x + 70)%27;
      y = (y + 55)%21;

      let slimeInstance = new PIXI.Sprite(PIXI.Texture.from("normalPeople" + peopleID));
      slimeInstance.width = 40;
      slimeInstance.height = 40;
      slimeInstance.scale.set(2, 2);
      slimeInstance.pivot.set(0.5, 0.5);

      /*let x = Math.floor(Math.random() * 8);
      let y = Math.floor(Math.random() * 8);
      while (x % 2 == y % 2) {
        x = Math.floor(Math.random() * 8);
        y = Math.floor(Math.random() * 8);
      }*/


      slime.position.set(-80 + x * 9, 55 + (70-55)/21 * y);
      slime.zIndex = 2 + slime.y * 0.01;

      if (i != 0)
        slime.visible = false;

      scene4_uIBoard.addChild(slime);
      slime.addChild(slimeInstance);

      scene4_slimeGroup.push(slime);
    }

  }
 
  // Scene
 {
  let sceneA = new PIXI.Container();

  let scene3_ScenePic = new PIXI.Sprite(PIXI.Texture.from("B2Spe1"));
  scene3_ScenePic.zIndex = 0;
  scene3_ScenePic.scale.set(globalImageScale, globalImageScale);
  scene3_ScenePic.position.set(0, 0);
  scene3_ScenePic.position.set(screenWidth / 2 - scene3_ScenePic.width / 2, screenHeight / 2 - scene3_ScenePic.height / 2 - 5);

  scene4_movingBoard.addChild(sceneA);
  sceneA.addChild(scene3_ScenePic)

  sceneA.visible = true;

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

    scene4_policeGroup[0].position.set(520, 255);
    scene4_policeGroup[1].position.set(570, 245);
    scene4_policeGroup[2].position.set(620, 260);

    for (let i = 0; i < 3; i++) {
      scene4_policeGroup[0].zIndex = 2 + scene4_policeGroup[0].y * 0.01;
    }


  }


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
  while(dir == scene4_lastButDir)dir = Math.floor(Math.random() * 4);
  scene4_lastButDir = dir;

  if (scene4_buttonGroup.length != 1) {
    while (dir == scene4_buttonGroup[0].dir) {
      dir = Math.floor(Math.random() * 4);
    }
  }


  if (dir == 0) reuseItem.text.text = "上";
  else if (dir == 1) reuseItem.text.text = "右";
  else if (dir == 2) reuseItem.text.text = "下";
  else if (dir == 3) reuseItem.text.text = "左";

  let dialogBox = reuseItem;

  reuseItem.dir = dir;
  dialogBox.zIndex = 9 + scene4_totalButtonConnter * -0.01;

  dialogBox.index = scene4_buttonGroup.length - 1;

  dialogBox.moveLeftCounter = 0;
  dialogBox.moveLeftCounterSP = 0;

  console.log(dialogBox.index);

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

    if (dir == 0) { x = screenWidth / 2 - dialogBox.width / 2; y = 80; }
    else if (dir == 1) { x = screenWidth - dialogBox.width - edge; y = screenHeight / 2 - dialogBox.height / 2 + 40; }
    else if (dir == 2) { x = screenWidth / 2 - dialogBox.width / 2; y = screenHeight - dialogBox.height; }
    else if (dir == 3) { x = edge; y = screenHeight / 2 - dialogBox.height / 2 + 40; }


    dialogBox.position.set(x, y);

    if (dialogBox.index == 0) {
      scene4_markContainer.position.set(x + scene4_buttonBoxSize[0] / 2, y + scene4_buttonBoxSize[0] / 2);
    }

    /* let q = dialogBox.index ;
     dialogBox.on("pointerdown", function () {
       DetectButtonInput(q);
     });*/
  }

  scene4_uIBoard.addChild(dialogBox);

}

function CreateButton(dir) {


  let edge = 18;

  let dialogBox = new PIXI.Graphics();
  dialogBox.beginFill(0xFFFFFF);
  dialogBox.drawRect(0, 0, scene4_buttonBoxSize[0], scene4_buttonBoxSize[1]);
  dialogBox.endFill();
  dialogBox.zIndex = 9 + scene4_totalButtonConnter * -0.01;

  dialogBox.visible = true;
  dialogBox.alpha = 0.9;

  //dialogBox.interactive = true;
  //dialogBox.buttonMode = true;

  //padding可以處理字體顯示位置不正確的問題
  let style = new PIXI.TextStyle({
    fontFamily: "pixelFont",
    fontSize: 36,
    fill: "white",
    stroke: '#000000',
    strokeThickness: 5,
    letterSpacing: 0,
    align: "left",
    padding: 10,
    lineHeight: 80

  });

  let dialogBoxText = new PIXI.Text("", style);

  if (dir == -1) dir = Math.floor(Math.random() * 4);

  if (dir == 0) dialogBoxText.text = "上";
  else if (dir == 1) dialogBoxText.text = "右";
  else if (dir == 2) dialogBoxText.text = "下";
  else if (dir == 3) dialogBoxText.text = "左";

  dialogBox.addChild(dialogBoxText);
  dialogBoxText.position.set(edge, edge + 5);
  dialogBoxText.visible = true;
  dialogBox.text = dialogBoxText;

  dialogBox.dir = dir;
  dialogBox.index = scene4_buttonGroup.length;
  dialogBox.moveLeftCounter = 0;
  dialogBox.moveLeftCounterSP = 0;

  scene4_prepareBoard.addChild(dialogBox);
  scene4_prepareButtonGroup.push(dialogBox);

}

function GameFunction() {

  for (let i = 0; i < 15; i++) {
    CreateButton(-1);
  }

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

    let key_Q = keyboard(81);
    scene4_keyGroup.push(key_Q);
    scene4_keyFuncroup.push(() => { ReuseButton(-1) });

  }

  //時間相關
  {
    if (scene4_gameMode == 0) {
      scene4_tickerFunc.push(ButtonMoveLeft);
    }

    let timer = 0;
    let buttonTimer = 0;

    function gameTimer(deltaTime) {

      timer += 1;
      buttonTimer += 1;

      if (timer == 1) {
        timer = 0;
        AddScore(-0.08);
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
        }
      }
      else if (scene4_stageTimer == 0) {
        scene4_stageTimer -= 1;
        console.log("GAME OVER");
        EndThisScene();
      }


    }

    scene4_tickerFunc.push(gameTimer);

  }



}

//鍵盤按下對應按鈕 (GAMEMODE = 0)
//手機觸控按下按鈕 (GAMEMODE = 1)
function DetectButtonInput(dir) {

  if (scene4_buttonGroup.length == 0) return;

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

    if (scene4_buttonGroup[0].dir == dir) {
      AddScore(10);
      RecyleButton(scene4_buttonGroup, 0);
      ReuseButton(-1);
      CheckButtonIndex(); 

      PIXI.sound.play('small_game_click');

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


  if (scene4_scoreLevel != scene4_currentScoreLevel) {
    scene4_currentScoreLevel = scene4_scoreLevel;

    for (let i = 1; i < scene4_slimeGroup.length; i++) {
      scene4_slimeGroup[i].visible = false;
    }

    if (scene4_currentScoreLevel >= 1) {
      scene4_slimeGroup[1].visible = true;
    }

    if (scene4_currentScoreLevel >= 2) {
      scene4_slimeGroup[2].visible = true;
      scene4_slimeGroup[3].visible = true;
    }

    if (scene4_currentScoreLevel >= 3) {
      scene4_slimeGroup[4].visible = true;
      scene4_slimeGroup[5].visible = true;
      scene4_slimeGroup[6].visible = true;
    }

    if (scene4_currentScoreLevel >= 4) {
      scene4_slimeGroup[7].visible = true;
      scene4_slimeGroup[8].visible = true;
      scene4_slimeGroup[9].visible = true;
      scene4_slimeGroup[10].visible = true;
    }
    if (scene4_currentScoreLevel >= 5) {
      scene4_slimeGroup[11].visible = true;
      scene4_slimeGroup[12].visible = true;
      scene4_slimeGroup[13].visible = true;
      scene4_slimeGroup[14].visible = true;
    }


  }

}

function EndThisScene() {

  for (let i = scene4_keyGroup.length - 1; i >= 0; i--) {
    scene4_keyGroup[i].press = null;
  }

  for (let i = scene4_tickerFunc.length - 1; i >= 0; i--) {
    app.ticker.remove(scene4_tickerFunc[i]);
  }

  EndingFadeFunc(scene4,'small_game2');
}


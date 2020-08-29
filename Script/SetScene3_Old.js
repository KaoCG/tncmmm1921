
//對話框環節

//舊版
//兩側的人物會切換移動

LoadScene3();

async function LoadScene3() {

  if (centerComponent.sceneExist[3] == false) {
    centerComponent.sceneExist[3] = true;
    await LoadSetting();
    await GameFunction();

  }

  await ResetSetting();


}

//讀取設定
async function LoadSetting() {


  scene3_dialogBox = new PIXI.Graphics();
  scene3_nameBox = [];


  scene3_textInput = PIXI.loader.resources.textContent.data.set1;
  scene3_selectTextInput = PIXI.loader.resources.textContent.data.choose1;

  scene3_textIndex = 0;
  scene3_selectIndex = 0;

  scene3_selectBoxes = [];

  scene3_chars = [];
  scene3_charPos = [];
  scene3_charMoveframes = 10;

  scene3_tickerFunc = [];

  await SetContainer();
  await SetObject();
}

//重置設定
async function ResetSetting() {

  scene3.visible = true;

  switch (centerComponent.currentStage) {
    case 2:
      scene3_textInput = PIXI.loader.resources.textContent.data.set1;
      scene3_selectTextInput = PIXI.loader.resources.textContent.data.choose1;
      break;
    case 3:
      scene3_textInput = PIXI.loader.resources.textContent.data.set2;
      scene3_selectTextInput = PIXI.loader.resources.textContent.data.choose2;
      break;
    case 5:
      scene3_textInput = PIXI.loader.resources.textContent.data.set3;
      scene3_selectTextInput = PIXI.loader.resources.textContent.data.choose3;
      break;
    case 7:
      scene3_textInput = PIXI.loader.resources.textContent.data.set4;
      scene3_selectTextInput = PIXI.loader.resources.textContent.data.choose4;
      break;
    case 9:
      scene3_textInput = PIXI.loader.resources.textContent.data.set5;
      scene3_selectTextInput = PIXI.loader.resources.textContent.data.choose5;
      break;
    case 11:
      scene3_textInput = PIXI.loader.resources.textContent.data.set6;
      scene3_selectTextInput = PIXI.loader.resources.textContent.data.choose6;
      break;
    case 13:
      scene3_textInput = PIXI.loader.resources.textContent.data.set7;
      scene3_selectTextInput = PIXI.loader.resources.textContent.data.choose7;
      break;
    case 14:
      scene3_textInput = PIXI.loader.resources.textContent.data.set8;
      scene3_selectTextInput = PIXI.loader.resources.textContent.data.choose8;
      break;
  }

  scene3_textIndex = 0 - 1;

  if (centerComponent.stageResult == -1) {
    GoToNextDialog();
  }
  else {
    let stageResult = centerComponent.stageResult;
    centerComponent.stageResult = -1;
    console.log("FLY" + stageResult);
    JumpResult(stageResult);


  }



  //scene3_dialogBox.text.text = scene3_textInput[scene3_textIndex];
  scene3_dialogBox.active = true;
  scene3_dialogBox.dialogEnd = false;

  scene3_nameBox[0].visible = true;
  scene3_nameBox[1].visible = false;

  app.ticker.add(CharMoveLeft);

  StartingFadeFunc();
}

//設定容器
async function SetContainer() {

  app.renderer.backgroundColor = 0x30BCED;

  scene3 = new PIXI.Container();
  scene3.sortableChildren = true;
  scene3.visible = true;
  app.stage.addChild(scene3);

  scene3_gameBoardGroup = new PIXI.Container();
  scene3_gameBoardGroup.visible = true;
  scene3_gameBoardGroup.scale.set(1);
  scene3_gameBoardGroup.sortableChildren = true;
  scene3.addChild(scene3_gameBoardGroup);

  scene3_uIBoard = new PIXI.Container();
  scene3_uIBoard.zIndex = 100;
  scene3_uIBoard.sortableChildren = true;
  scene3_gameBoardGroup.addChild(scene3_uIBoard);

}

async function SetObject() {

  //UI
  {

    let edge = 20;
    let buttonBoxSize = [screenWidth, 130];

    //文字對話框
    {
      scene3_dialogBox.beginFill(0xFFFFFF);
      scene3_dialogBox.drawRect(0, 0, buttonBoxSize[0], buttonBoxSize[1]).endFill();
      //圖案沒有position數值，一定要用X和Y
      scene3_dialogBox.x = 0;
      scene3_dialogBox.y = screenHeight - buttonBoxSize[1];
      scene3_dialogBox.alpha = 0.8;
      scene3_uIBoard.addChild(scene3_dialogBox);

      scene3_dialogBox.interactive = true;
      scene3_dialogBox.buttonMode = true;

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
        lineHeight: 50
      });

      let dialogBoxText = new PIXI.Text(scene3_textInput[scene3_textIndex], style);
      scene3_dialogBox.addChild(dialogBoxText);
      dialogBoxText.position.set(edge * 2, 25);
      scene3_dialogBox.text = dialogBoxText;

      scene3_dialogBox.active = true;
      scene3_dialogBox.dialogEnd = false;
    }

    //文字對話框上的名字A
    {
      var scene3_NameBoxA = new PIXI.Graphics();
      scene3_NameBoxA.beginFill(0xFFFFFF);
      scene3_NameBoxA.drawRect(0, 0, 130, 45).endFill();
      //圖案沒有position數值，一定要用X和Y
      scene3_NameBoxA.x = 0;
      scene3_NameBoxA.y = - scene3_NameBoxA.height;
      scene3_NameBoxA.alpha = 1;

      scene3_dialogBox.addChild(scene3_NameBoxA);

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
        lineHeight: 50
      });

      let dialogBoxText = new PIXI.Text("Name", style);

      scene3_NameBoxA.addChild(dialogBoxText);
      dialogBoxText.position.set((scene3_NameBoxA.width - dialogBoxText.width - 10) / 2, (scene3_NameBoxA.height - dialogBoxText.height + 6) / 2);
      scene3_NameBoxA.text = dialogBoxText;
      scene3_nameBox.push(scene3_NameBoxA);
    }
    //文字對話框上的名字B
    {
      var scene3_NameBoxB = new PIXI.Graphics();
      scene3_NameBoxB.beginFill(0xFFFFFF);
      scene3_NameBoxB.drawRect(0, 0, 130, 45).endFill();
      //圖案沒有position數值，一定要用X和Y
      scene3_NameBoxB.x = scene3_dialogBox.width - scene3_NameBoxB.width;
      scene3_NameBoxB.y = - scene3_NameBoxB.height;
      scene3_NameBoxB.alpha = 1;

      scene3_dialogBox.addChild(scene3_NameBoxB);

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
        lineHeight: 50
      });

      let dialogBoxText = new PIXI.Text("Name", style);
      scene3_NameBoxB.addChild(dialogBoxText);
      dialogBoxText.position.set((scene3_NameBoxB.width - dialogBoxText.width - 10) / 2, (scene3_NameBoxA.height - dialogBoxText.height + 6) / 2);
      scene3_NameBoxB.text = dialogBoxText;
      scene3_nameBox.push(scene3_NameBoxB);
    }

    //選擇UI
    let selectButtonBoxSize = [150, 60];
    let selectButtonBoxEdgeDistant = [18, 15];
    {
      for (let i = 0; i < 3; i++) {
        let select = new PIXI.Container();
        scene3_uIBoard.addChild(select);
        select.x = (screenWidth) / 2;
        select.y = screenHeight - edge - buttonBoxSize[1] - (selectButtonBoxSize[1] + edge * 0.8) * (i + 1) - 15;

        select.interactive = true;
        select.buttonMode = true;

        let selectBox = new PIXI.Graphics();
        selectBox.beginFill(0xFFFFFF);
        selectBox.drawRect(0, 0, selectButtonBoxSize[0], selectButtonBoxSize[1]).endFill();
        selectBox.zIndex = 0;
        selectBox.alpha = 0.8;


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
          lineHeight: 50
          //dropShadow: true,
          //dropShadowColor: "#000000",
          //dropShadowBlur: 4,
          //dropShadowAngle: Math.PI / 6,
          //dropShadowDistance: 6,
        });

        let selectBoxText = new PIXI.Text(scene3_selectTextInput[scene3_selectIndex][i], style);
        selectBoxText.position.set(edge, 15);

        select.text = selectBoxText;
        select.box = selectBox;

        select.addChild(selectBox);
        select.addChild(selectBoxText);

        selectBox.visible = true;
        selectBoxText.visible = true;
        select.visible = false;

        scene3_selectBoxes.push(select);
      }



    }

    //腳色
    {


      let charApos = [[50, 80], [-40, 100]];
      let charBpos = [[screenWidth - 50, 80], [screenWidth - 50 + 90, 80 + 20]];
      scene3_charPos = [charApos, charBpos];

      let charA = new PIXI.Container();
      let charB = new PIXI.Container();
      //charA.visible = false;
      //charB.visible = false;

      scene3_chars.push(charA);
      scene3_chars.push(charB);

      charA.moveCounter = 0;
      charB.moveCounter = 0;

      charA.onoff = 0;
      charB.onoff = 1;
      charA.color = 255;
      charB.color = 255;

      let charAInstance = new PIXI.Sprite(PIXI.Texture.from("statue"));
      charAInstance.scale.set(7, 7);
      charAInstance.position.set(0, 0);

      charA.x = charApos[charA.onoff][0];
      charA.y = charApos[charA.onoff][1];
      charA.instance = charAInstance;
      charA.zIndex = -150;
      scene3_uIBoard.addChild(charA);
      charA.addChild(charAInstance);


      let charBInstance = new PIXI.Sprite(PIXI.Texture.from("statue"));
      charBInstance.scale.set(-7, 7);
      charBInstance.position.set(0, 0);

      charB.x = charBpos[charB.onoff][0];
      charB.y = charBpos[charB.onoff][1];
      charB.instance = charBInstance;
      charB.zIndex = -150;
      scene3_uIBoard.addChild(charB);
      charB.addChild(charBInstance);

      scene3_chars[0].color = 255 - 120 * scene3_chars[0].onoff;
      scene3_chars[0].instance.tint = "0x" + scene3_chars[0].color.toString(16) + scene3_chars[0].color.toString(16) + scene3_chars[0].color.toString(16);
      scene3_chars[1].color = 255 - 120 * scene3_chars[1].onoff;
      scene3_chars[1].instance.tint = "0x" + scene3_chars[1].color.toString(16) + scene3_chars[1].color.toString(16) + scene3_chars[1].color.toString(16);
    }

/*
    let char = new PIXI.Container();
    scene3.addChild(char);


    char.zIndex = -10;

    let charInstance = new PIXI.Sprite(PIXI.Texture.from("person3"));
    char.addChild(charInstance);
    charInstance.scale.set(2.8, 2.8);
    charInstance.position.set(- charInstance.width / 2, -charInstance.height / 2);
    char.position.set(screenWidth / 2, screenHeight / 2 - 62);

    let nameInstance = new PIXI.Sprite(PIXI.Texture.from("name3"));
    nameInstance.scale.set(0.75,0.75);
    nameInstance.position.set(34,-4)
    char.addChild(nameInstance);

    charInstance.tint = "0xAAAAAA";
*/

  }

}

async function GoToNextDialog() {

  //進入下一句話。
  scene3_textIndex = (scene3_textIndex + 1) % scene3_textInput.length;
  let content = scene3_textInput[scene3_textIndex];

  //如果這個是選項的話...
  //Options/選項
  if (content[0] == "O") {

    //進入選項時無法繼續對話。
    scene3_dialogBox.active = false;

    //確認目前是選項幾
    scene3_selectIndex = parseInt(content[1], 10);
    console.log("AA:" + scene3_selectIndex);

    var optionsNumber = scene3_selectTextInput[scene3_selectIndex].length
    for (let i = 0; i < optionsNumber; i++) {
      scene3_selectBoxes[i].visible = true;
      scene3_selectBoxes[i].text.text = scene3_selectTextInput[scene3_selectIndex][i];
      // console.log(scene3_selectBoxes[i].text.width);

      scene3_selectBoxes[i].text.x = -(scene3_selectBoxes[i].text.width) / 2;
      scene3_selectBoxes[i].box.width = scene3_selectBoxes[i].text.width + 20;
      scene3_selectBoxes[i].box.x = (- scene3_selectBoxes[i].box.width) / 2;

      scene3_selectBoxes[i].y =
        (screenHeight - 20 - 125 - 15) - (60 + 20 * 0.8 + (3 - optionsNumber) * 10) * (i + 1) + (3 - optionsNumber) * -25;


    }
  }
  //End/結尾
  else if (content[0] == "E") {
    scene3_dialogBox.dialogEnd = true;

    //自動跳到下一句話
    GoToNextDialog();
  }
  //Character/切換角色
  else if (content[0] == "C") {

    //確認是要換誰
    var charIndex = parseInt(content[1], 10);

    //讀取下一個名字
    scene3_textIndex = (scene3_textIndex + 1) % scene3_textInput.length;
    var name = scene3_textInput[scene3_textIndex];

    //切換人物位置
    if (charIndex == 0) {
      scene3_nameBox[0].visible = true; scene3_nameBox[1].visible = false;
      toggleCharPos(0, 0, 0); toggleCharPos(1, 1, 0);
    }
    else {
      scene3_nameBox[0].visible = false; scene3_nameBox[1].visible = true;
      toggleCharPos(0, 1, 0); toggleCharPos(1, 0, 0);
    }

    //更改人物姓名
    scene3_nameBox[charIndex].text.text = name;

    //更改人物姓名的欄位
    scene3_nameBox[charIndex].text.position.set((130 - scene3_nameBox[charIndex].text.width) / 2 - 2.5, (45 - scene3_nameBox[charIndex].text.height + 25) / 2);

    //自動跳到下一句話
    GoToNextDialog();
  }
  //JUMP/ 跳到目標處

  else if (content[0] == "J") {

    //確認是要跳幾號
    var jumpIndex = parseInt(content[1], 10);

    JumpResult(jumpIndex);
  }
  //Result/ 選擇目標 (須由C觸發，純讀到時直接跳過)
  else if (content[0] == "R") {
    //自動跳到下一句話
    GoToNextDialog();
  }
  //Target/ 跳躍目標 (須由J觸發，純讀到時直接跳過)
  else if (content[0] == "T") {
    //自動跳到下一句話
    GoToNextDialog();
  }
  // ELSE/直接讀取
  else {
    scene3_dialogBox.text.text = content;
  }

  /*
  //隨機切換講話的腳色。
  if (Math.floor(Math.random() * 3) == 0)
    if (scene3_chars[0].onoff == 0) {
      scene3_nameBox[0].visible = false; scene3_nameBox[1].visible = true;
      toggleCharPos(0, 1, 0); toggleCharPos(1, 0, 0);
    }
    else {
      scene3_nameBox[0].visible = true; scene3_nameBox[1].visible = false;
      toggleCharPos(0, 0, 0); toggleCharPos(1, 1, 0);
    }*/
}

async function OptionsResult(result) {

  while (true) {
    scene3_textIndex = (scene3_textIndex + 1) % scene3_textInput.length;
    let content = scene3_textInput[scene3_textIndex];

    if (content[0] == "R") {
      var targetIndex = parseInt(content[1], 10);
      if (result == targetIndex) {
        //抵達
        break;
      }
      else {
        //未抵達
        continue;
      }
    }
    else if (content[0] == "E") {
      scene3_textIndex -= 1;
      break;
    }
    else {
      continue;
    }
  }

  //自動跳到下一句話
  GoToNextDialog();
}
async function JumpResult(result) {

  while (true) {
    scene3_textIndex = (scene3_textIndex + 1) % scene3_textInput.length;
    let content = scene3_textInput[scene3_textIndex];

    if (content[0] == "T") {
      var targetIndex = parseInt(content[1], 10);
      if (result == targetIndex) {
        //抵達
        break;
      }
      else {
        //未抵達
        continue;
      }
    }
    else if (content[0] == "E") {
      scene3_textIndex -= 1;
      break;
    }
    else {
      continue;
    }
  }

  //自動跳到下一句話
  GoToNextDialog();
}

function clickSelectBox(a) {

  console.log(scene3_selectIndex + " " + a);

  for (let i = 0; i < scene3_selectBoxes.length; i++) {
    scene3_selectBoxes[i].visible = false;
  }

  scene3_dialogBox.active = true;
  centerComponent.dialogResult = a;
  OptionsResult(a);

}

async function GameFunction() {

  scene3_dialogBox.on("pointerdown", function () {
    if (scene3_dialogBox.dialogEnd == true) {
      scene3_dialogBox.dialogEnd = false;
      scene3_dialogBox.active = false;
      EndThisScene();
    }
    else if (scene3_dialogBox.active == true) {
      GoToNextDialog();
    }

  });

  for (let i = 0; i < scene3_selectBoxes.length; i++) {

    let buttonNo = i;

    scene3_selectBoxes[i].addListener("pointerdown", () => {

      clickSelectBox(i);

    });
  }


  app.ticker.add(CharMoveLeft);
  scene3_tickerFunc.push(CharMoveLeft);


}

function toggleCharPos(charIndex, onoff, dir) {
  let char = scene3_chars[charIndex];

  if (dir == 1) {
    char.position.set(scene3_charPos[charIndex][onoff][0], scene3_charPos[charIndex][onoff][1]);
  }
  else {

    char.moveCounter = scene3_charMoveframes;
    char.onoff = onoff;
    char.speed = [(scene3_charPos[charIndex][onoff][0] - char.x) / frames, (scene3_charPos[charIndex][onoff][1] - char.y) / frames];
    char.nowPos = char.position;
    char.finalPos = scene3_charPos[charIndex][onoff];
    char.nowColor = char.color;
    char.finalColor = 255 - 120 * onoff;
  }

}

function CharMoveLeft() {

  for (let i = 0; i < scene3_chars.length; i++) {

    if (scene3_chars[i].moveCounter != 0) {
      scene3_chars[i].moveCounter -= 1;

      let di = scene3_chars[i].moveCounter / scene3_charMoveframes;

      let compute = MoveTrackCompute(scene3_chars[i].moveCounter, scene3_charMoveframes);
      let pos = [scene3_chars[i].nowPos.x * compute + scene3_chars[i].finalPos[0] * (1 - compute), scene3_chars[i].nowPos.y * compute + scene3_chars[i].finalPos[1] * (1 - compute)];

      scene3_chars[i].x = pos[0];
      scene3_chars[i].y = pos[1];

      scene3_chars[i].color = Math.round(scene3_chars[i].nowColor * di + scene3_chars[i].finalColor * (1 - di));
      scene3_chars[i].instance.tint = "0x" + scene3_chars[i].color.toString(16) + scene3_chars[i].color.toString(16) + scene3_chars[i].color.toString(16);
      //console.log(scene3_chars[i].color.toString(16) );

    }

  }


}

function MoveTrackCompute(i, total) {
  let di = i / total;
  return di * di * di - 3 * di * di + 3 * di;

}

function EndThisScene() {
  for (let i = 0; i < scene3_tickerFunc.length; i++) {
    app.ticker.remove(scene3_tickerFunc[i]);
  }


  EndingFadeFunc(scene3);
}



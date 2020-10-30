
//對話框環節

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
  scene3_names = [];
  scene3_charPos = [];
  scene3_charMoveframes = 20;

  scene3_tickerFunc = [];

  scene3_sceneList = [];

  scene9_currentBoard = 0;
  scene9_totalObject = [8, 3, 9];

  await SetContainer();
  await SetObject();
}

//重置設定
async function ResetSetting() {

  scene3.visible = true;

  for (let i = 0; i < scene3_sceneList.length; i++) {
    scene3_sceneList[i].visible = false;
  }

  for (let i = 0; i < scene3_keyGroup.length; i++) {
    scene3_keyGroup[i].press = scene3_keyFuncroup[i];
    //scene2_keyGroup[i].release = scene2_keyReleaseFuncroup[i];
  }

  /////////////////////
  //測試用
  //centerComponent.currentStage = 14;
  /////////////////////

  let audio = 'plot';

  scene3_dialogContainer.visible = true;
  scene3_charBoard.visible = true;
  scene3_nameBoard.visible = true;
  scene5_EndTS.stop();

  switch (centerComponent.currentStage) {
    //開頭林獻堂感嘆
    case 2:
      scene3_textInput = PIXI.loader.resources.textContent.data.set1;
      scene3_selectTextInput = PIXI.loader.resources.textContent.data.choose1;
      scene3_sceneList[0].visible = true;

      for (let i = 0; i < scene3_sceneList[0].BD.length; i++) {
        scene3_sceneList[0].BD[i].visible = true;
        scene3_sceneList[0].BD[i].interactive = true;
        scene3_sceneList[0].BD[i].alpha = 1;
      }
      break;
    //主角感嘆
    case 3:
      scene3_textInput = PIXI.loader.resources.textContent.data.set2;
      scene3_selectTextInput = PIXI.loader.resources.textContent.data.choose2;
      scene3_sceneList[1].visible = true;
      break;
    //主角被招募
    case 5:
      scene3_textInput = PIXI.loader.resources.textContent.data.set3;
      scene3_selectTextInput = PIXI.loader.resources.textContent.data.choose3;
      scene3_sceneList[2].visible = true;
      audio = 'plot';
      break;
    //主角蓋完書
    case 7:
      scene3_textInput = PIXI.loader.resources.textContent.data.set4;
      scene3_selectTextInput = PIXI.loader.resources.textContent.data.choose4;
      scene3_sceneList[6].visible = true;
      audio = 'plot';
      break;
    //主角發完書看到抗議
    case 9:
      scene3_textInput = PIXI.loader.resources.textContent.data.set5;
      scene3_selectTextInput = PIXI.loader.resources.textContent.data.choose5;
      scene3_sceneList[4].visible = true;
      audio = 'plot';
      break;
    //抗議遊戲結束
    //主角要去找人
    case 11:
      scene3_textInput = PIXI.loader.resources.textContent.data.set6;
      scene3_selectTextInput = PIXI.loader.resources.textContent.data.choose6;
      scene3_sceneList[5].visible = true;
      audio = 'plot';
      break;
    //找完人回去在飯店
    case 13:
      scene3_InvitedPeopleImageList = [0, 1, 2];
      scene3_GroupTend = 0;
      let sp = false;

      if (centerComponent.sceneExist[1])
        for (let i = 0; i < scene1_InvitedPeopleList.length; i++) {
          let k = 2 - i;
          scene3_sceneList[3].char[k].texture = PIXI.Texture.from("SPPeople0" + scene1_InvitedPeopleList[i] % 10);
          scene3_sceneList[3].char[k].y = 301.5 - scene3_sceneList[3].char[k].height / 2;

          switch (scene1_InvitedPeopleList[i] % 10) {
            case 0:
              scene3_InvitedPeopleImageList[k] = 4
              scene3_GroupTend++;
              break;
            case 1:
              scene3_InvitedPeopleImageList[k] = 2
              scene3_GroupTend++;
              break;
            case 2:
              scene3_InvitedPeopleImageList[k] = 7
              scene3_GroupTend--;
              break;
            case 3:
              scene3_InvitedPeopleImageList[k] = 0
              scene3_GroupTend++;
              break;
            case 4:
              scene3_InvitedPeopleImageList[k] = 8
              scene3_GroupTend--;
              break;
            case 5:
              scene3_InvitedPeopleImageList[k] = 12
              sp = true;
              centerComponent.seenGhost = true;
              break;
            case 6:
              scene3_InvitedPeopleImageList[k] = 17
              scene3_GroupTend--;
              break;
            case 7:
              scene3_InvitedPeopleImageList[k] = 1
              break;
            case 8:
              scene3_InvitedPeopleImageList[k] = 5
              scene3_GroupTend--;
              break;
            case 9:
              scene3_InvitedPeopleImageList[k] = 11
              scene3_GroupTend--;
              break;
          }
        }

      if (scene3_GroupTend >= 2) {
        centerComponent.stageResult = 1;
        centerComponent.HideEndingTriggerB[4] = true;
      }
      else if (scene3_GroupTend <= -2) {
        centerComponent.stageResult = 0;
        centerComponent.HideEndingTriggerA[4] = true;
      }
      else centerComponent.stageResult = 2;

      if (sp == true) centerComponent.stageResult = 2;

      scene3_textInput = PIXI.loader.resources.textContent.data.set7;
      scene3_selectTextInput = PIXI.loader.resources.textContent.data.choose7;
      scene3_sceneList[3].visible = true;
      audio = 'plot';

      scene3_dialogContainer.visible = false;
      scene3_charBoard.visible = false;
      scene3_nameBoard.visible = false;

      let timer = 200;
      let stageResult = centerComponent.stageResult;

      app.ticker.add(function Wait() {
        timer--;

        if (timer <= 0) {
          scene3_dialogContainer.visible = true;
          scene3_charBoard.visible = true;
          scene3_nameBoard.visible = true;

          JumpResult(stageResult);
          app.ticker.remove(Wait);
        }

      })


      break;
    //主角結局前獨白(飯店)
    case 14:

      if (centerComponent.rate >= 0.5) centerComponent.stageResult = 1;
      else centerComponent.stageResult = 0;

      scene3_textInput = PIXI.loader.resources.textContent.data.set8;
      scene3_selectTextInput = PIXI.loader.resources.textContent.data.choose8;
      scene3_sceneList[3].visible = true;
      audio = 'for_conclusion';
      break;
    //結局字幕畫面
    case 15:

      if (centerComponent.rate < 0.5) {
        scene3_ENDPic.texture = PIXI.Texture.from("END2");
        centerComponent.stageResult = 1;

        for (let i = 0; i < scene3_endBoard.BDA.length; i++) {
          scene3_endBoard.BDA[i].visible = true;
          scene3_endBoard.BDA[i].interactive = true;
          scene3_endBoard.BDA[i].alpha = 1;
        }
        for (let i = 0; i < scene3_endBoard.BDB.length; i++) {
          scene3_endBoard.BDB[i].visible = false;
        }
      }
      else {
        scene3_ENDPic.texture = PIXI.Texture.from("END1");
        centerComponent.stageResult = 0;

        for (let i = 0; i < scene3_endBoard.BDB.length; i++) {
          scene3_endBoard.BDB[i].visible = true;
          scene3_endBoard.BDB[i].interactive = true;
          scene3_endBoard.BDB[i].alpha = 1;
        }
        for (let i = 0; i < scene3_endBoard.BDA.length; i++) {
          scene3_endBoard.BDA[i].visible = false;
        }
      }

      scene3_textInput = PIXI.loader.resources.textContent.data.set9;
      audio = 'for_conclusion';
      break;
    //結算畫面
    case 16:
      scene3_textInput = PIXI.loader.resources.textContent.data.set10;
      scene3_sceneList[7].visible = true;

      scene5_EndTS.play();

      scene5_EndT.visible = false;
      //兩種底板
      {
        if (centerComponent.rate < 0.25) { centerComponent.stageResult = 0; scene5_End0.texture = PIXI.Texture.from("EndR00"); scene5_EndT.instance.texture = PIXI.Texture.from("EndT00"); }
        else if (centerComponent.rate < 0.5) { centerComponent.stageResult = 1; scene5_End0.texture = PIXI.Texture.from("EndR00"); scene5_EndT.instance.texture = PIXI.Texture.from("EndT01"); }
        else if (centerComponent.rate < 0.75) { centerComponent.stageResult = 2; scene5_End0.texture = PIXI.Texture.from("EndR01"); scene5_EndT.instance.texture = PIXI.Texture.from("EndT02"); }
        else if (centerComponent.rate <= 1) { centerComponent.stageResult = 3; scene5_End0.texture = PIXI.Texture.from("EndR01"); scene5_EndT.instance.texture = PIXI.Texture.from("EndT03"); }
      }

      if (centerComponent.rate <= 0.3) centerComponent.HideEndingTriggerA[6] = true;
      else if (centerComponent.rate >= 0.7) centerComponent.HideEndingTriggerB[6] = true;

      //兩種隱藏結局
      {
        let HideEndingTrigger = true;
        for (let i = 0; i < centerComponent.HideEndingTriggerA.length; i++) {
          if (centerComponent.HideEndingTriggerA[i] == false) HideEndingTrigger = false;
        }
        if (HideEndingTrigger) centerComponent.stageResult = 4;

        HideEndingTrigger = true;
        for (let i = 0; i < centerComponent.HideEndingTriggerB.length; i++) {
          if (centerComponent.HideEndingTriggerB[i] == false) HideEndingTrigger = false;
        }
        if (HideEndingTrigger) centerComponent.stageResult = 5;
      }

      //稱號
      {
        for (let i = 0; i < scene5_CharTitleList.length; i++) {
          scene5_CharTitleList[i].visible = false;
        }
        if (centerComponent.sceneExist[1]) {
          scene5_CharTitleList[scene1_title].visible = true;
        }
        else {
          scene5_CharTitleList[4].visible = true;
        }
      }

      //數字
      {
        //centerComponent.G1Rate = 0;
        let A = parseInt(centerComponent.G1Rate * 100, 10);
        if (A < 10) {
          scene5_N7.texture = PIXI.Texture.from("Number0" + (A % 10));
          scene5_N6.visible = false;
          scene5_N5.visible = false;
        }
        else {
          scene5_N3.texture = PIXI.Texture.from("Number0" + (A % 10));
          scene5_N2.texture = PIXI.Texture.from("Number0" + (parseInt((A / 10), 10) % 10));
          if (A < 100) scene5_N1.visible = false;
        }


        //console.log(parseInt(centerComponent.rate * 100, 10));
        A = parseInt(centerComponent.rate * 100, 10);
        if (A < 10) {
          scene5_N7.texture = PIXI.Texture.from("Number0" + (A % 10));
          scene5_N6.visible = false;
          scene5_N5.visible = false;
        }
        else {
          scene5_N7.texture = PIXI.Texture.from("Number0" + (A % 10));
          scene5_N6.texture = PIXI.Texture.from("Number0" + (parseInt((A / 10), 10) % 10));
          if (A < 100) scene5_N5.visible = false;
        }

      }

      audio = 'theme';
      break;
  }

  for (let i = 0; i < scene3_chars.length; i++) {
    scene3_chars[i].visible = false;

  }

  for (let i = 0; i < scene3_names.length; i++) {
    scene3_names[i].visible = false;
  }

  scene3_textIndex = 0 - 1;

  //如果結局
  if (centerComponent.currentStage == 15) {

    scene3_endBoard.visible = true;
    scene3_endBoard.text.visible = true;

    if (centerComponent.stageResult == -1) {
      GoToNextDialog();
    }
    else {
      let stageResult = centerComponent.stageResult;
      centerComponent.stageResult = -1;
      JumpResult_End(stageResult);
    }
  }
  //如果普通對話環節
  else {

    scene3_endBoard.visible = false;
    scene3_endBoard.text.visible = false;

    //console.log(centerComponent.stageResult);
    if (centerComponent.stageResult == -1) {

      if (centerComponent.currentStage != 2) {
        GoToNextDialog();
      }
      else {
        scene3_dialogContainer.visible = false;
        scene3_charBoard.visible = false;
        scene3_nameBoard.visible = false;
      }

    }
    else {
      let stageResult = centerComponent.stageResult;
      centerComponent.stageResult = -1;

      if (centerComponent.currentStage != 13)
        JumpResult(stageResult);
    }

  }

  for (let i = 0; i < scene3_tickerFunc.length; i++) {
    app.ticker.add(scene3_tickerFunc[i]);
  }

  scene3_dialogBox.active = true;
  scene3_dialogBox.dialogEnd = false;

  //scene3_nameBox[0].visible = true;

  scene3_thisAudio = audio;
  StartingFadeFunc(scene3, audio);
}

//設定容器
async function SetContainer() {

  scene3 = new PIXI.Container();
  scene3.sortableChildren = true;
  scene3.visible = true;
  app.stage.addChild(scene3);

  scene3_gameBoardGroup = new PIXI.Container();
  scene3_gameBoardGroup.visible = true;
  //scene3_gameBoardGroup.scale.set(1);
  scene3_gameBoardGroup.sortableChildren = true;
  scene3.addChild(scene3_gameBoardGroup);

  scene3_sceneBoard = new PIXI.Container();
  scene3_sceneBoard.zIndex = 10;
  scene3_sceneBoard.sortableChildren = true;
  scene3_gameBoardGroup.addChild(scene3_sceneBoard);

  scene3_charBoard = new PIXI.Container();
  scene3_charBoard.zIndex = 50;
  scene3_charBoard.sortableChildren = true;
  scene3_gameBoardGroup.addChild(scene3_charBoard);

  scene3_uIBoard = new PIXI.Container();
  scene3_uIBoard.zIndex = 100;
  scene3_uIBoard.sortableChildren = true;
  scene3_gameBoardGroup.addChild(scene3_uIBoard);

  scene3_nameBoard = new PIXI.Container();
  scene3_nameBoard.zIndex = 101;
  scene3_nameBoard.sortableChildren = true;
  scene3_gameBoardGroup.addChild(scene3_nameBoard);

  scene3_endBoard = new PIXI.Container();
  scene3_endBoard.zIndex = 150;
  scene3_endBoard.sortableChildren = true;
  scene3_gameBoardGroup.addChild(scene3_endBoard);

}

async function SetObject() {

  //UI
  {

    let edge = 20;
    let buttonBoxSize = [screenWidth, 130];

    //文字對話框
    {

      scene3_dialogContainer = new PIXI.Container();

      scene3_dialogBox.beginFill(0xFFFFFF);
      scene3_dialogBox.drawRect(0, 0, buttonBoxSize[0], buttonBoxSize[1]).endFill();
      //圖案沒有position數值，一定要用X和Y
      scene3_dialogBox.x = 0;
      scene3_dialogBox.y = screenHeight - buttonBoxSize[1];
      scene3_dialogBox.alpha = 0;

      scene3_dialogBox.interactive = true;
      scene3_dialogBox.buttonMode = true;

      //padding可以處理字體顯示位置不正確的問題
      /*let style = new PIXI.TextStyle({
        fontFamily: "pixelSilver",
        fontSize: 54,
        fill: "white",
        fontStyle: "normal",
        fontWeight: "lighter",
        //stroke: '#000000',
        //strokeThickness: 0,
        letterSpacing: 5.4,
        align: "left",
        padding: 10,
        lineHeight: 54
      });*/

      let style = new PIXI.TextStyle({
        fontFamily: "NotoSansCJKtc-Regular",
        fontSize: 32, //36
        fill: "white",
        fontStyle: "normal",
        fontWeight: "lighter",
        //stroke: '#000000',
        //strokeThickness: 0,
        letterSpacing: 4,
        align: "left",
        padding: 10,
        lineHeight: 48
      });


      let scale = 2.55;
      //新版文字框
      {
        let dialogBox = new PIXI.Sprite(PIXI.Texture.from("dialogBox"));
        dialogBox.scale.set(scale, scale);
        dialogBox.position.set(screenWidth / 2 - dialogBox.width / 2, -36);
        dialogBox.zIndex = 0;

        let dialogBoxText = new PIXI.Text(scene3_textInput[scene3_textIndex], style);
        dialogBoxText.scale.set(1 / scale * 0.5, 1 / scale * 0.5);
        dialogBoxText.zIndex = 1;
        dialogBoxText.position.set(44 - 2, 143 - 1);
        scene3_dialogBox.text = dialogBoxText;
        scene3_dialogBox.active = true;
        scene3_dialogBox.dialogEnd = false;

        //箭頭
        scene1_arrow = new PIXI.Sprite(PIXI.Texture.from("arrow"));
        scene1_arrow.scale.set(1.2, 1.2);
        scene1_arrow.position.set(145, 159);

        scene3_dialogContainer.sortableChildren = true;
        scene3_uIBoard.addChild(scene3_dialogContainer);
        scene3_dialogContainer.addChild(scene3_dialogBox);
        scene3_dialogContainer.addChild(dialogBox);
        dialogBox.addChild(dialogBoxText);
        dialogBox.addChild(scene1_arrow);
      }

      //新版選擇框
      {
        let dialogBoxS0 = new PIXI.Sprite(PIXI.Texture.from("dialogBoxS0"));
        dialogBoxS0.scale.set(scale, scale);
        dialogBoxS0.position.set(screenWidth / 2 - dialogBoxS0.width / 2, -15);
        dialogBoxS0.visible = false;
        dialogBoxS0.zIndex = -1;

        let dialogBoxS1 = new PIXI.Sprite(PIXI.Texture.from("dialogBoxS1"));
        dialogBoxS1.scale.set(scale, scale);
        dialogBoxS1.position.set(screenWidth / 2 - dialogBoxS1.width / 2, -15);
        dialogBoxS1.visible = false;
        dialogBoxS1.zIndex = -1;

        let dialogBoxS2 = new PIXI.Sprite(PIXI.Texture.from("dialogBoxS2"));
        dialogBoxS2.scale.set(scale, scale);
        dialogBoxS2.position.set(screenWidth / 2 - dialogBoxS2.width / 2, -15);
        dialogBoxS2.visible = false;
        dialogBoxS2.zIndex = -1;

        //-114.2
        //-48
        //18.2

        //-81
        //15

        let black = new PIXI.Sprite(PIXI.Texture.from("white"));
        black.width = screenWidth;
        black.height = screenHeight;
        black.visible = false;
        black.tint = "0x000000";
        black.zIndex = -10;
        black.alpha = 0.5;
        scene3_dialogContainer.addChild(black);

        scene3_dialogContainer.addChild(dialogBoxS2);
        scene3_dialogContainer.addChild(dialogBoxS0);
        scene3_dialogContainer.addChild(dialogBoxS1);

        scene3_dialogContainer.dialogBoxSTarget = 0;
        scene3_dialogContainer.dialogBoxS0 = dialogBoxS0;
        scene3_dialogContainer.dialogBoxS1 = dialogBoxS1;
        scene3_dialogContainer.dialogBoxS2 = dialogBoxS2;
        scene3_dialogContainer.dialogBoxSB = black;
      }
    }

    //選擇UI
    let selectButtonBoxSize = [150, 50];
    {
      for (let i = 0; i < 3; i++) {
        let select = new PIXI.Container();
        scene3_uIBoard.addChild(select);
        select.x = (screenWidth) / 2;
        select.y = screenHeight - edge - buttonBoxSize[1] - (selectButtonBoxSize[1] + edge * 0.8) * (i + 1) - 15;

        select.scale.set(0.5, 0.5);

        select.interactive = true;
        select.buttonMode = true;

        let selectBox = new PIXI.Graphics();
        selectBox.beginFill(0xFFFFFF);
        selectBox.drawRect(0, 0, selectButtonBoxSize[0] + 16 + 20, selectButtonBoxSize[1] + 4).endFill();
        selectBox.zIndex = 0;
        selectBox.alpha = 1;

        /*let selectBox2 = new PIXI.Graphics();
        selectBox2.beginFill(0xFFFFFF);
        selectBox2.drawRect(0, 0, selectButtonBoxSize[0], selectButtonBoxSize[1]).endFill();
        selectBox2.position.set(8, 5);
        selectBox2.zIndex = 0;
        selectBox2.alpha = 1;
        selectBox.addChild(selectBox2);*/

        //padding可以處理字體顯示位置不正確的問題
        /* let style = new PIXI.TextStyle({
           fontFamily: "pixelSilver",
           fontSize: 96,
           fill: "black",
           fontStyle: "normal",
           fontWeight: "lighter",
           letterSpacing: 9,
           align: "left",
           padding: 100,
           lineHeight: 96
         });*/

        let style = new PIXI.TextStyle({
          fontFamily: "NotoSansCJKtc-Medium",
          fontSize: 68,
          fill: "black",
          fontStyle: "normal",
          fontWeight: "lighter",
          letterSpacing: 16,
          align: "left",
          padding: 100,
          lineHeight: 68
        });

        let selectBoxText = new PIXI.Text(scene3_selectTextInput[scene3_selectIndex][i], style);
        selectBoxText.position.set(edge - 5, 20.5 - 13);
        selectBoxText.scale.set(0.5, 0.5);

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

    //腳色和名字
    for (let i = 0; i < 18; i++) {

      let char = new PIXI.Container();
      char.zIndex = 10;
      char.visible = false;
      char.color = 135;
      char.position.set(screenWidth / 2, screenHeight / 2 - 61);
      scene3_charBoard.addChild(char);
      scene3_chars.push(char);

      let black = new PIXI.Sprite(PIXI.Texture.from("white"));
      black.width = screenWidth;
      black.height = screenHeight;
      black.interactive = true;
      black.position.set(-char.position.x, -char.position.y);
      black.tint = "0x000000";
      black.zIndex = -10;
      black.alpha = 0.7;
      char.addChild(black);

      let charInstance = new PIXI.Sprite(PIXI.Texture.from("person" + i));
      charInstance.scale.set(2.4, 2.4);
      charInstance.position.set(- charInstance.width / 2, -charInstance.height / 2);
      charInstance.tint = "0xAAAAAA";
      char.instance = charInstance;
      char.addChild(charInstance);



      let name = new PIXI.Container();
      name.zIndex = 20;
      name.visible = false;
      name.qqq = i;
      let nameInstance = new PIXI.Sprite(PIXI.Texture.from("name" + i));
      nameInstance.scale.set(0.5, 0.5);
      nameInstance.position.set(0, 0);
      name.position.set(28, 225);
      name.instance = nameInstance;
      scene3_names.push(name);
      scene3_nameBoard.addChild(name);
      name.addChild(nameInstance);
    }

  }

  //結局相關
  {
    scene3_ENDPic = new PIXI.Sprite(PIXI.Texture.from("END1"));
    scene3_ENDPic.zIndex = 20;
    scene3_ENDPic.scale.set(1.59, 1.59);
    scene3_ENDPic.position.set(screenWidth / 2 - scene3_ENDPic.width / 2, screenHeight / 2 - scene3_ENDPic.height / 2 - 5);
    scene3_endBoard.addChild(scene3_ENDPic);

    //R=133 G=95 B=55
    //855f37
    //89623b

    //padding可以處理字體顯示位置不正確的問題
    let style = new PIXI.TextStyle({
      fontFamily: "pixelSilver",
      fontSize: 58,
      fill: "#89623b",
      fontWeight: 'normal',
      stroke: '#89623b',
      strokeThickness: 0.2,
      letterSpacing: 5.8,
      align: "center",
      padding: 10,
      lineHeight: 58
    });

    let dialogBoxText = new PIXI.Text("1", style);
    scene3_endBoard.addChild(dialogBoxText);
    dialogBoxText.zIndex = 21;
    //dialogBoxText.position.set(screenWidth / 2 - dialogBoxText.width / 2, screenHeight / 2 - dialogBoxText.height / 2 - 125);
    dialogBoxText.scale.set(0.5, 0.5);
    scene3_endBoard.text = dialogBoxText;

    scene3_ENDPic.interactive = true;

    //BDA
    {
      let BD3 = new PIXI.Sprite(PIXI.Texture.from("BD03"));
      BD3.zIndex = 31;
      BD3.width = screenWidth; BD3.height = screenHeight;
      BD3.interactive = true;
      //BD.buttonMode = true;
      BD3.fadeFunc = () => {
        if (!BD3.interactive) return;
        BD3.interactive = false;
        let totalCounter = 100 * 0.4;
        let counter = totalCounter;
        app.ticker.add(function countdown() {
          counter--;
          if (counter > 0) {

            BD3.alpha = counter / totalCounter;
          }
          else if (counter == 0) {
            BD3.visible = false;
            app.ticker.remove(countdown);
          }
          else if (counter == -100) {
            scene3_dialogContainer.visible = true;
            scene3_charBoard.visible = true;
            scene3_nameBoard.visible = true;
            //GoToNextDialog();
          }
        })
      };
      BD3.addListener("pointerdown", function () {
        BD3.fadeFunc();
      })

      let BD2 = new PIXI.Sprite(PIXI.Texture.from("BD02"));
      BD2.zIndex = 32;
      BD2.width = screenWidth; BD2.height = screenHeight;
      BD2.interactive = true;
      //BD2.buttonMode = true;
      BD2.fadeFunc = () => {
        if (!BD2.interactive) return;
        BD2.interactive = false;
        let totalCounter = 100 * 0.4;
        let counter = totalCounter;
        app.ticker.add(function countdown() {
          counter--;
          BD2.alpha = counter / totalCounter;
          if (counter == 0) {
            BD2.visible = false;
            app.ticker.remove(countdown);
          }
        })
      }
      BD2.addListener("pointerdown", function () {
        BD2.fadeFunc();
      });

      let BD1 = new PIXI.Sprite(PIXI.Texture.from("BD01"));
      BD1.zIndex = 33;
      BD1.width = screenWidth; BD1.height = screenHeight;
      BD1.interactive = true;
      BD1.fadeFunc = () => {
        if (!BD1.interactive) return;
        BD1.interactive = false;
        let totalCounter = 100 * 0.4;
        let counter = totalCounter;
        app.ticker.add(function countdown() {
          counter--;
          BD1.alpha = counter / totalCounter;
          if (counter == 0) {
            BD1.visible = false;
            app.ticker.remove(countdown);
          }
        });
      }
      BD1.addListener("pointerdown", function () {
        BD1.fadeFunc();
      })

      /*let BD7 = new PIXI.Sprite(PIXI.Texture.from("BD07"));
      BD7.zIndex = 34;
      BD7.width = screenWidth; BD7.height = screenHeight;
      BD7.interactive = true;
      BD7.addListener("pointerdown", function () {

        BD7.interactive = false;
        let totalCounter = 100;
        let counter = totalCounter;
        app.ticker.add(function countdown() {
          counter--;
          BD7.alpha = counter / totalCounter;
          if (counter == 0) {
            BD7.visible = false;
            app.ticker.remove(countdown);
          }
        })
      })*/

      scene3_endBoard.addChild(BD1);
      scene3_endBoard.addChild(BD2);
      scene3_endBoard.addChild(BD3);
      //scene3_endBoard.addChild(BD7);

      BD1.visible = false;
      BD2.visible = false;
      BD3.visible = false;

      scene3_endBoard.BDA = [];
      scene3_endBoard.BDA.push(BD1);
      scene3_endBoard.BDA.push(BD2);
      scene3_endBoard.BDA.push(BD3);
      //scene3_endBoard.BDA.push(BD7);

    }

    //BDB
    {
      let BD3 = new PIXI.Sprite(PIXI.Texture.from("BD03"));
      BD3.zIndex = 31;
      BD3.width = screenWidth; BD3.height = screenHeight;
      BD3.interactive = true;
      BD3.fadeFunc = () => {
        if (!BD3.interactive) return;
        BD3.interactive = false;
        let totalCounter = 100 * 0.4;
        let counter = totalCounter;
        app.ticker.add(function countdown() {
          counter--;
          if (counter > 0) {

            BD3.alpha = counter / totalCounter;
          }
          else if (counter == 0) {
            BD3.visible = false;
            app.ticker.remove(countdown);
          }
          else if (counter == -100) {
            scene3_dialogContainer.visible = true;
            scene3_charBoard.visible = true;
            scene3_nameBoard.visible = true;
            //GoToNextDialog();


          }
        })
      }
      //BD.buttonMode = true;
      BD3.addListener("pointerdown", function () {
        BD3.fadeFunc();
      })

      let BD2 = new PIXI.Sprite(PIXI.Texture.from("BD05"));
      BD2.zIndex = 32;
      BD2.width = screenWidth; BD2.height = screenHeight;
      BD2.interactive = true;
      BD2.fadeFunc = () => {
        if (!BD2.interactive) return;
        BD2.interactive = false;
        let totalCounter = 100 * 0.4;
        let counter = totalCounter;
        app.ticker.add(function countdown() {
          counter--;
          BD2.alpha = counter / totalCounter;
          if (counter == 0) {
            BD2.visible = false;
            app.ticker.remove(countdown);
          }
        })
      }
      //BD2.buttonMode = true;
      BD2.addListener("pointerdown", function () {
        BD2.fadeFunc();
      });

      let BD1 = new PIXI.Sprite(PIXI.Texture.from("BD04"));
      BD1.zIndex = 33;
      BD1.width = screenWidth; BD1.height = screenHeight;
      BD1.interactive = true;
      BD1.fadeFunc = () => {
        if (!BD1.interactive) return;
        BD1.interactive = false;
        let totalCounter = 100 * 0.4;
        let counter = totalCounter;
        app.ticker.add(function countdown() {
          counter--;
          BD1.alpha = counter / totalCounter;
          if (counter == 0) {
            BD1.visible = false;
            app.ticker.remove(countdown);
          }
        })
      }
      BD1.addListener("pointerdown", function () {
        BD1.fadeFunc();
      })

      /*let BD7 = new PIXI.Sprite(PIXI.Texture.from("BD07"));
      BD7.zIndex = 34;
      BD7.width = screenWidth; BD7.height = screenHeight;
      BD7.interactive = true;
      BD7.addListener("pointerdown", function () {

        BD7.interactive = false;
        let totalCounter = 100;
        let counter = totalCounter;
        app.ticker.add(function countdown() {
          counter--;
          BD7.alpha = counter / totalCounter;
          if (counter == 0) {
            BD7.visible = false;
            app.ticker.remove(countdown);
          }
        })
      })*/

      BD1.visible = false;
      BD2.visible = false;
      BD3.visible = false;
      scene3_endBoard.addChild(BD1);
      scene3_endBoard.addChild(BD2);
      scene3_endBoard.addChild(BD3);
      // scene3_endBoard.addChild(BD7);

      scene3_endBoard.BDB = [];
      scene3_endBoard.BDB.push(BD1);
      scene3_endBoard.BDB.push(BD2);
      scene3_endBoard.BDB.push(BD3);
      // scene3_endBoard.BDB.push(BD7);

    }
  }

  //對話場景相關
  {

    // Scene0
    //開頭林獻堂感嘆
    {
      let sceneA = new PIXI.Container();
      scene3_sceneBoard.addChild(sceneA);
      scene3_sceneBoard.sortableChildren = true;

      let scene3_ScenePic0 = new PIXI.Sprite(PIXI.Texture.from("Hotel00"));
      scene3_ScenePic0.zIndex = 8;
      scene3_ScenePic0.scale.set(globalImageScale - 0.12, globalImageScale - 0.12);
      scene3_ScenePic0.position.set(screenWidth / 2 - scene3_ScenePic0.width / 2, screenHeight / 2 - scene3_ScenePic0.height / 2 - 5);

      let scene3_ScenePic1 = new PIXI.Sprite(PIXI.Texture.from("Hotel01"));
      scene3_ScenePic1.zIndex = 4;
      scene3_ScenePic1.scale.set(globalImageScale - 0.12, globalImageScale - 0.12);
      scene3_ScenePic1.position.set(screenWidth / 2 - scene3_ScenePic1.width / 2, screenHeight / 2 - scene3_ScenePic1.height / 2 - 5);

      let scene3_ScenePic2 = new PIXI.Sprite(PIXI.Texture.from("Hotel02"));
      scene3_ScenePic2.zIndex = 0;
      scene3_ScenePic2.scale.set(globalImageScale - 0.12, globalImageScale - 0.12);
      scene3_ScenePic2.position.set(screenWidth / 2 - scene3_ScenePic2.width / 2, screenHeight / 2 - scene3_ScenePic2.height / 2 - 5);

      let scene3_ScenePic3 = new PIXI.Sprite(PIXI.Texture.from("Hotel03"));
      scene3_ScenePic3.zIndex = 1;
      scene3_ScenePic3.width = screenWidth; scene3_ScenePic3.height = screenHeight;
      //scene3_ScenePic3.scale.set(globalImageScale - 0.12, globalImageScale - 0.12);
      scene3_ScenePic3.position.set(screenWidth / 2 - scene3_ScenePic3.width / 2, screenHeight / 2 - scene3_ScenePic3.height / 2 + 3);

      let k = 0.9;
      let a = 50;
      let P0 = new PIXI.Sprite(PIXI.Texture.from("characterFull3"));
      P0.zIndex = 3;
      P0.jumpSpeed = 0;
      P0.scale.set(0.24 * k, 0.24 * k);
      P0.position.set(-45 - 20, 22 + a);
      let P1 = new PIXI.Sprite(PIXI.Texture.from("policeSmall"));
      P1.zIndex = 3;
      P1.jumpSpeed = 0;
      P1.scale.set(-(globalImageScale + 1) * k, (globalImageScale + 1) * k);
      P1.position.set(835 + 20, 34 + a);
      // console.log(P0.width);
      // console.log(P1.width);

      let BD = new PIXI.Sprite(PIXI.Texture.from("BD00"));
      BD.zIndex = 10;
      BD.visible = false;
      BD.width = screenWidth; BD.height = screenHeight;
      BD.interactive = true;
      //BD.buttonMode = true;
      BD.fadeFunc = () => {

        if (BD.interactive == false) return;
        BD.interactive = false;
        let totalCounter = 100;
        let counter = totalCounter;
        app.ticker.add(function countdown() {
          counter--;
          if (counter > 0) {

            BD.alpha = counter / totalCounter;
          }
          else if (counter == 0) {
            BD.visible = false;
          }
          else if (counter == -100) {
            scene3_dialogContainer.visible = true;
            scene3_charBoard.visible = true;
            scene3_nameBoard.visible = true;
            GoToNextDialog();

            app.ticker.remove(countdown);
          }
        })
      }

      BD.addListener("pointerdown", function () {
        BD.fadeFunc();
      })

      sceneA.sortableChildren = true;
      sceneA.addChild(scene3_ScenePic3);
      sceneA.addChild(scene3_ScenePic2);
      //sceneA.addChild(scene3_ScenePic1);
      sceneA.addChild(scene3_ScenePic0);
      sceneA.addChild(P0);
      sceneA.addChild(P1);
      sceneA.addChild(BD);
      //sceneA.addChild(BD2);

      sceneA.BD = [];
      sceneA.BD.push(BD);

      sceneA.char = [];
      sceneA.char.push(P0);
      sceneA.char.push(P1);
      for (let i = 0; i < sceneA.char.length; i++) {
        sceneA.char[i].jump = false;
        sceneA.char[i].initY = sceneA.char[i].position.y;
      }


      scene3_sceneList.push(sceneA);

      sceneA.visible = false;

    }

    // Scene1
    //主角感嘆
    {
      let sceneA = new PIXI.Container();

      let scene3_ScenePic = new PIXI.Sprite(PIXI.Texture.from("B1Spe1"));
      scene3_ScenePic.zIndex = 0;
      scene3_ScenePic.scale.set(globalImageScale, globalImageScale);
      scene3_ScenePic.position.set(0, 0);
      scene3_ScenePic.position.set(screenWidth / 2 - scene3_ScenePic.width / 2, screenHeight / 2 - scene3_ScenePic.height / 2 - 5);

      let P0 = new PIXI.Sprite(PIXI.Texture.from("B1C0"));
      P0.zIndex = 1;
      P0.scale.set(globalImageScale, globalImageScale);
      P0.position.set(420 + 20, 150);

      let P1 = new PIXI.Sprite(PIXI.Texture.from("B1C1"));
      P1.zIndex = 1;
      P1.scale.set(-globalImageScale, globalImageScale);
      P1.position.set(750 + 20, 150);

      let P2 = new PIXI.Sprite(PIXI.Texture.from("characterFull10"));
      P2.zIndex = 1;
      P2.scale.set(globalImageScale, globalImageScale);
      P2.position.set(-10, 73);

      scene3_sceneBoard.addChild(sceneA);
      sceneA.addChild(scene3_ScenePic)
      sceneA.addChild(P0)
      sceneA.addChild(P1)
      sceneA.addChild(P2)

      sceneA.char = [];
      sceneA.char.push(P2);
      sceneA.char.push(P0);
      sceneA.char.push(P1);

      for (let i = 0; i < sceneA.char.length; i++) {
        sceneA.char[i].jumpSpeed = 0;
        sceneA.char[i].jump = false;
        sceneA.char[i].initY = sceneA.char[i].position.y;
      }

      scene3_sceneList.push(sceneA);

      sceneA.visible = false;

    }

    // Scene2
    //主角被招募
    {
      let sceneA = new PIXI.Container();
      scene3_sceneBoard.addChild(sceneA);

      let scene3_ScenePic = new PIXI.Sprite(PIXI.Texture.from("B1Spe1"));
      scene3_ScenePic.zIndex = -1;
      scene3_ScenePic.scale.set(globalImageScale, globalImageScale);
      scene3_ScenePic.position.set(0, 0);
      scene3_ScenePic.position.set(screenWidth / 2 - scene3_ScenePic.width / 2, screenHeight / 2 - scene3_ScenePic.height / 2 - 5);
      sceneA.addChild(scene3_ScenePic)

      let P0 = new PIXI.Sprite(PIXI.Texture.from("characterFull10"));
      P0.zIndex = 1;

      P0.scale.set(globalImageScale, globalImageScale);
      P0.position.set(-10, 73);
      let P1 = new PIXI.Sprite(PIXI.Texture.from("B1C2"));
      P1.zIndex = 1;

      P1.scale.set(globalImageScale, globalImageScale);
      P1.position.set(450, 73);
      sceneA.addChild(P0);
      sceneA.addChild(P1);

      sceneA.char = [];
      sceneA.char.push(P0);
      sceneA.char.push(P1);

      for (let i = 0; i < sceneA.char.length; i++) {
        sceneA.char[i].jumpSpeed = 0;
        sceneA.char[i].jump = false;
        sceneA.char[i].initY = sceneA.char[i].position.y;
      }

      scene3_sceneList.push(sceneA);

      sceneA.visible = false;

    }

    // Scene3
    //找完人回去在飯店
    {
      let sceneA = new PIXI.Container();

      let scene3_ScenePic0 = new PIXI.Sprite(PIXI.Texture.from("Hotel00"));
      scene3_ScenePic0.zIndex = 8;
      scene3_ScenePic0.scale.set(globalImageScale - 0.12, globalImageScale - 0.12);
      scene3_ScenePic0.position.set(screenWidth / 2 - scene3_ScenePic0.width / 2, screenHeight / 2 - scene3_ScenePic0.height / 2 - 5);

      let scene3_ScenePic1 = new PIXI.Sprite(PIXI.Texture.from("Hotel01"));
      scene3_ScenePic1.zIndex = 4;
      scene3_ScenePic1.scale.set(globalImageScale - 0.12, globalImageScale - 0.12);
      scene3_ScenePic1.position.set(screenWidth / 2 - scene3_ScenePic1.width / 2, screenHeight / 2 - scene3_ScenePic1.height / 2 - 5);

      let scene3_ScenePic2 = new PIXI.Sprite(PIXI.Texture.from("Hotel02"));
      scene3_ScenePic2.zIndex = 0;
      scene3_ScenePic2.scale.set(globalImageScale - 0.12, globalImageScale - 0.12);
      scene3_ScenePic2.position.set(screenWidth / 2 - scene3_ScenePic2.width / 2, screenHeight / 2 - scene3_ScenePic2.height / 2 - 5);

      let P1 = new PIXI.Sprite(PIXI.Texture.from("SPPeople00"));
      P1.scale.set(globalImageScale, globalImageScale);
      P1.x = 68; P1.y = 325 - P1.height / 2;

      let P2 = new PIXI.Sprite(PIXI.Texture.from("SPPeople00"));
      P2.scale.set(-1 * globalImageScale, globalImageScale);
      P2.x = 170 + 103 + P2.width; P2.y = 325 - P2.height / 2;

      let P3 = new PIXI.Sprite(PIXI.Texture.from("SPPeople00"));
      P3.scale.set(-1 * globalImageScale, globalImageScale);
      P3.x = 272 + 104 + P3.width; P3.y = 325 - P3.height / 2;

      let P4 = new PIXI.Sprite(PIXI.Texture.from("characterFull3"));
      P4.scale.set(globalImageScale * 0.1, globalImageScale * 0.1);
      P4.x = -70; P4.y = 340 - P4.height / 2;

      let P5 = new PIXI.Sprite(PIXI.Texture.from("characterFull10"));
      P5.scale.set(-globalImageScale * 1.2, globalImageScale * 1.2);
      P5.x = 430 + P5.width; P5.y = 345 - P5.height / 2;


      scene3_sceneBoard.addChild(sceneA);
      scene3_sceneBoard.sortableChildren = true;
      sceneA.addChild(scene3_ScenePic2)
      sceneA.addChild(P1);
      sceneA.addChild(P2);
      sceneA.addChild(P3);

      sceneA.addChild(scene3_ScenePic1)
      sceneA.addChild(P4);
      sceneA.addChild(P5);
      sceneA.addChild(scene3_ScenePic0)



      sceneA.char = [];
      sceneA.char.push(P1);
      sceneA.char.push(P2);
      sceneA.char.push(P3);
      sceneA.char.push(P4);
      sceneA.char.push(P5);

      for (let i = 0; i < sceneA.char.length; i++) {
        sceneA.char[i].jumpSpeed = 0;
        sceneA.char[i].jump = false;
        sceneA.char[i].initY = sceneA.char[i].position.y;
      }

      scene3_sceneList.push(sceneA);

      sceneA.visible = false;

    }

    // Scene4
    //主角發完書看到抗議(B2場景)
    {
      let sceneA = new PIXI.Container();

      let scene3_ScenePic = new PIXI.Sprite(PIXI.Texture.from("B2Spe1"));
      scene3_ScenePic.zIndex = -1;
      scene3_ScenePic.scale.set(globalImageScale, globalImageScale);
      scene3_ScenePic.position.set(0, 0);
      scene3_ScenePic.position.set(screenWidth / 2 - scene3_ScenePic.width / 2, screenHeight / 2 - scene3_ScenePic.height / 2 - 5);

      scene3_sceneBoard.addChild(sceneA);
      sceneA.addChild(scene3_ScenePic)

      scene3_sceneList.push(sceneA);

      sceneA.visible = false;

      sceneA.char = [];

      //人物
      {
        let slime = new PIXI.Container();
        let slimeInstance = new PIXI.Sprite(PIXI.Texture.from("G2People0" + 0));
        slimeInstance.width = 40;
        slimeInstance.height = 40;
        slimeInstance.zIndex = 50;
        slimeInstance.scale.set(2, 2);
        slimeInstance.pivot.set(0.5, 0.5);
        slimeInstance.position.set(-15, -14);
        sceneA.addChild(slime);
        slime.addChild(slimeInstance);

        sceneA.char.push(slime);

      }

      //警察
      {
        let scene3_policeGroup = [];
        for (let i = 0; i < 3; i++) {
          let police = new PIXI.Container();
          police.sortableChildren = true;
          let policeInstance = new PIXI.Sprite(PIXI.Texture.from("policeSmall"));
          policeInstance.pivot.set(policeInstance.width / 2, policeInstance.height / 2);
          policeInstance.scale.set(-2, 2);
          sceneA.addChild(police);
          police.addChild(policeInstance);
          scene3_policeGroup.push(police);
          sceneA.char.push(police);
        }

        scene3_policeGroup[0].position.set(530, 262);
        scene3_policeGroup[1].position.set(580, 255);
        scene3_policeGroup[2].position.set(630, 265);
        for (let i = 0; i < 3; i++) {
          scene3_policeGroup[0].zIndex = 2 + scene3_policeGroup[0].y * 0.01;
        }
      }


      for (let i = 0; i < sceneA.char.length; i++) {
        sceneA.char[i].jumpSpeed = 0;
        sceneA.char[i].jump = false;
        sceneA.char[i].initY = sceneA.char[i].position.y;
      }

    }

    // Scene5
    //主角要去找人(B3場景)
    {
      let sceneA = new PIXI.Container();

      let scene3_ScenePic = new PIXI.Sprite(PIXI.Texture.from("B3Spe1"));
      scene3_ScenePic.zIndex = -1;
      scene3_ScenePic.scale.set(globalImageScale, globalImageScale);
      scene3_ScenePic.position.set(0, 0);
      scene3_ScenePic.position.set(screenWidth / 2 - scene3_ScenePic.width / 2, screenHeight / 2 - scene3_ScenePic.height / 2 - 5);

      scene3_sceneBoard.addChild(sceneA);
      sceneA.addChild(scene3_ScenePic)


      scene3_sceneList.push(sceneA);

      sceneA.visible = false;

    }

    // Scene6
    //主角蓋完書(B2場景)
    {
      let sceneA = new PIXI.Container();

      let scene3_ScenePic = new PIXI.Sprite(PIXI.Texture.from("B2Spe1"));
      scene3_ScenePic.zIndex = -1;
      scene3_ScenePic.scale.set(globalImageScale, globalImageScale);
      scene3_ScenePic.position.set(0, 0);
      scene3_ScenePic.position.set(screenWidth / 2 - scene3_ScenePic.width / 2, screenHeight / 2 - scene3_ScenePic.height / 2 - 5);

      scene3_sceneBoard.addChild(sceneA);
      sceneA.addChild(scene3_ScenePic)

      scene3_sceneList.push(sceneA);

      sceneA.visible = false;

      let P0 = new PIXI.Sprite(PIXI.Texture.from("characterFull10"));
      P0.zIndex = 1;
      P0.jumpSpeed = 0;
      P0.scale.set(globalImageScale, globalImageScale);
      P0.position.set(-10, 73);
      let P1 = new PIXI.Sprite(PIXI.Texture.from("B1C2"));
      P1.zIndex = 1;
      P1.jumpSpeed = 0;
      P1.scale.set(globalImageScale, globalImageScale);
      P1.position.set(450, 73);
      sceneA.addChild(P0);
      sceneA.addChild(P1);

      sceneA.char = [];
      sceneA.char.push(P0);
      sceneA.char.push(P1);
      P0.jump = false;
      P1.jump = false;
      P0.initY = P0.position.y;
      P1.initY = P1.position.y;

    }

    // Scene7
    //結局畫面(場景)
    {

      scene5 = new PIXI.Container();
      scene5.scale.set(1);
      scene5.sortableChildren = true;

      scene3_sceneBoard.addChild(scene5);
      scene3_sceneList.push(scene5);

      uIBoard = new PIXI.Container();
      uIBoard.zIndex = 12;
      uIBoard.sortableChildren = true;
      scene5.addChild(uIBoard);

      resultBoard = new PIXI.Container();
      resultBoard.zIndex = 5;
      resultBoard.sortableChildren = true;
      uIBoard.addChild(resultBoard);

      achieveBoard = new PIXI.Container();
      achieveBoard.zIndex = 1;
      achieveBoard.sortableChildren = true;

      uIBoard.addChild(achieveBoard);

      {
        gameMode = 0; //0依序 1隨機
        score = 0;
        buttonGroup = [];
        totalButtonConnter = 0;
        clickButtonConuter = 0;

        barSize = [120, 30];
        barEdgeDistant = [12, 15];
        barSizeMaskMult = 4;

        currentScoreLevel = 0;
        scoreLevel = 0;

        counterPerIndex = 12;
        spMoveLeftSpeed = 3;

        slimeTexture = (PIXI.Texture.from("slime_sheet_" + "01" + ".gif"));

        slimeGroup = [];
        policeGroup = [];
      }
      {
        currentMode = 1;
        currentIndex = 0;

        resultPaperContainer = new PIXI.Container();
        selectBoxes = [];

        //結局畫面
        {
          let End2 = new PIXI.Sprite(PIXI.Texture.from("End2"));
          End2.width = screenWidth;
          End2.height = screenHeight;
          uIBoard.addChild(End2);

          let End1 = new PIXI.Sprite(PIXI.Texture.from("End1"));
          End1.width = screenWidth;
          End1.height = screenHeight;
          uIBoard.addChild(End1);

          scene5_End0 = new PIXI.Sprite(PIXI.Texture.from("End0"));
          scene5_End0.width = screenWidth;
          scene5_End0.height = screenHeight;
          uIBoard.addChild(scene5_End0);

          scene5_EndT = new PIXI.Container();
          uIBoard.addChild(scene5_EndT);

          scene5_EndTS = new PIXI.AnimatedSprite([PIXI.Texture.from("EndS00"), PIXI.Texture.from("EndS01")]);
          scene5_EndTS.animationSpeed = 0.08;
          //scene5_EndTS.visible = false;
          scene5_EndTS.stop();
          scene5_EndTS.width = screenWidth;
          scene5_EndTS.height = screenHeight;
          scene5_EndT.addChild(scene5_EndTS);

          scene5_EndTI = new PIXI.Sprite(PIXI.Texture.from("EndT00"));
          scene5_EndTI.width = screenWidth;
          scene5_EndTI.height = screenHeight;
          scene5_EndT.addChild(scene5_EndTI);

          scene5_EndTW = new PIXI.Sprite(PIXI.Texture.from("white"));
          scene5_EndTW.width = 80;
          scene5_EndTW.height = 180;
          scene5_EndTW.alpha = 0;
          scene5_EndTW.interactive = true;
          scene5_EndTW.buttonMode = true;
          scene5_EndTW.position.set(420, 85);
          scene5_EndTW.addListener("pointerdown", function () {
            scene5_CollectBoard.visible = true;
            scene0_audioButtonContainer.visible = false;
            scene5_CollectBoardReset();
          })

          scene5_EndT.addChild(scene5_EndTW);

          scene5_EndT.instance = scene5_EndTI;



          /*let Pen = new PIXI.Sprite(PIXI.Texture.from("Pen"));
          Pen.width = screenWidth;
          Pen.height = screenHeight;*/
          //uIBoard.addChild(Pen);
          //
          //


        }

        //稱號
        scene5_CharTitleList = [];
        for (let i = 0; i < 9; i++) {

          let scene5_CharTitle = new PIXI.Sprite(PIXI.Texture.from("EndTitle" + i));

          scene5_CharTitle.visible = false;

          scene5_CharTitle.scale.set(0.2 * 1.63, 0.2 * 1.63);

          scene5_CharTitle.x = 1;
          scene5_CharTitleList.push(scene5_CharTitle);
          scene5_CharTitle.x = 277;
          scene5_CharTitle.y = 99.5;

          uIBoard.addChild(scene5_CharTitle);

        }

        //數字
        {
          let moveDeltaTemp = 7;
          let moveDeltaTemp2 = 4;
          scene5_N1 = new PIXI.Sprite(PIXI.Texture.from("Number01"));
          scene5_N1.scale.set(0.12, 0.12);
          scene5_N1.x = 380 + 2 - moveDeltaTemp - moveDeltaTemp2;
          scene5_N1.y = 156.6;
          uIBoard.addChild(scene5_N1);

          scene5_N2 = new PIXI.Sprite(PIXI.Texture.from("Number02"));
          scene5_N2.scale.set(0.12, 0.12);
          scene5_N2.x = 380 + 8 + 1 - moveDeltaTemp - moveDeltaTemp2;
          scene5_N2.y = 156.6;
          uIBoard.addChild(scene5_N2);

          scene5_N3 = new PIXI.Sprite(PIXI.Texture.from("Number03"));
          scene5_N3.scale.set(0.12, 0.12);
          scene5_N3.x = 380 + 16 - moveDeltaTemp - moveDeltaTemp2;
          scene5_N3.y = 156.6;
          uIBoard.addChild(scene5_N3);

          scene5_N4 = new PIXI.Sprite(PIXI.Texture.from("Number10"));
          scene5_N4.scale.set(0.12, 0.12);
          scene5_N4.x = 380 + 24 + 1 - moveDeltaTemp - moveDeltaTemp2;
          scene5_N4.y = 156.6;
          uIBoard.addChild(scene5_N4);

          scene5_N5 = new PIXI.Sprite(PIXI.Texture.from("Number01"));
          scene5_N5.scale.set(0.12, 0.12);
          scene5_N5.x = 390 + 2 - moveDeltaTemp;
          scene5_N5.y = 174.5;
          uIBoard.addChild(scene5_N5);

          scene5_N6 = new PIXI.Sprite(PIXI.Texture.from("Number02"));
          scene5_N6.scale.set(0.12, 0.12);
          scene5_N6.x = 390 + 8 + 1 - moveDeltaTemp;
          scene5_N6.y = 174.5;
          uIBoard.addChild(scene5_N6);

          scene5_N7 = new PIXI.Sprite(PIXI.Texture.from("Number03"));
          scene5_N7.scale.set(0.12, 0.12);
          scene5_N7.x = 390 + 16 - moveDeltaTemp;
          scene5_N7.y = 174.5;
          uIBoard.addChild(scene5_N7);

          scene5_N8 = new PIXI.Sprite(PIXI.Texture.from("Number10"));
          scene5_N8.scale.set(0.12, 0.12);
          scene5_N8.x = 390 + 24 + 1 - moveDeltaTemp;
          scene5_N8.y = 174.5;
          uIBoard.addChild(scene5_N8);


        }

        //選擇UI
        let selectButtonBoxSize = [120, 50];
        let buttonText = ["再玩一次", "分享遊戲", "文化圖鑑", "瞭解更多", "123"]
        {

          let edge = 230;
          let buttonSpace = (screenWidth - edge) / 4 + 10;
          for (let i = 0; i < 5; i++) {
            let selectBox = new PIXI.Graphics();
            selectBox.beginFill(0xFFFFFF);
            selectBox.drawRect(0, 0, selectButtonBoxSize[0], selectButtonBoxSize[1]);
            selectBox.x = buttonSpace * i + (- selectButtonBoxSize[0] + edge) / 2 - 24;
            selectBox.y = screenHeight - 72;
            selectBox.endFill();
            //selectBox.zIndex = 12;
            selectBox.visible = true;
            selectBox.alpha = 0.8;

            scene5.addChild(selectBox);

            selectBox.interactive = true;
            selectBox.buttonMode = true;

            let style = new PIXI.TextStyle({
              fontFamily: "pixelFont",
              fontSize: 26,
              fill: "black",
              stroke: '#000000',
              strokeThickness: 0,
              letterSpacing: 0,
              align: "left",
              padding: 10,
              lineHeight: 50
            });

            let selectBoxText = new PIXI.Text(buttonText[i], style);
            selectBox.addChild(selectBoxText);
            selectBoxText.position.set(selectButtonBoxSize[0] / 2 - selectBoxText.width / 2 - 1, 16);
            selectBoxText.visible = true;
            selectBox.text = selectBoxText;
            selectBoxes.push(selectBox);
          }
        }

        {
          let Pen2 = new PIXI.Sprite(PIXI.Texture.from("Pen2"));
          //End2.scale.set(globalImageScale, globalImageScale);
          Pen2.width = screenWidth * 0.214;
          Pen2.height = screenHeight * 0.262;
          uIBoard.addChild(Pen2);
          Pen2.interactive = true;
          Pen2.buttonMode = true;
          Pen2.addListener("pointerdown", function () {
            Worker.visible = true;
            WX.visible = true;
            WXW.visible = true;
            scene0_audioButtonContainer.visible = false;
          })
          Pen2.position.set(28, 210);

          let Worker = new PIXI.Sprite(PIXI.Texture.from("Worker"));
          //End2.scale.set(globalImageScale, globalImageScale);
          Worker.width = screenWidth;
          Worker.height = screenHeight;
          Worker.visible = false;
          uIBoard.addChild(Worker);

          Worker.interactive = true;
          //  Worker.addListener("pointerdown", function () { Worker.visible = false; })

          let WX = new PIXI.Sprite(PIXI.Texture.from("Illustrat03"));
          uIBoard.addChild(WX);
          WX.visible = false;
          WX.pivot.set(WX.width / 2, WX.height / 2);
          WX.scale.set(globalImageScale * 0.15, globalImageScale * 0.15);
          WX.position.set(667 + 98, 62 - 31);

          let WXW = new PIXI.Sprite(PIXI.Texture.from("white"));
          uIBoard.addChild(WXW);
          WXW.visible = false;
          WXW.width = 50; WXW.height = 50;
          WXW.position.set(643 + 98, 40 - 31);
          WXW.alpha = 0;
          WXW.interactive = true;
          WXW.buttonMode = true;
          WXW.addListener("pointerdown", function () {
            Worker.visible = false;
            WX.visible = false;
            WXW.visible = false;
            scene0_audioButtonContainer.visible = true;
          });
        }

        scene5_CollectBoard = new PIXI.Container();
        scene5_CollectBoard.visible = false;
        uIBoard.addChild(scene5_CollectBoard);

        function scene5_CollectBoardReset() {

          if (scene1_totalItemCollector === undefined) {
            scene1_totalItemCollector = [0,0,0,0,0,0,0,0,0]
            scene1_totalInteractCollector = [false,false,false,false]
          }

          for (let i = 0; i < scene5_CollectItemText.length; i++) {
            var t = "X";
            switch (i) {
              case 0:
                t += scene1_totalItemCollector[8];
                break;
              case 1:
                t += scene1_totalItemCollector[2];
                break;
              case 2:
                t += scene1_totalItemCollector[5];
                break;
              case 3:
                t += scene1_totalItemCollector[1];
                break;
              case 4:
                t += scene1_totalItemCollector[3];
                break;
              case 5:
                t += scene1_totalItemCollector[4];
                break;
              case 6:
                t += scene1_totalItemCollector[6];
                break;
              case 7:
                t += scene1_totalItemCollector[7];
                break;
              case 8:
                t += scene1_totalItemCollector[0];
                break;
            }
            scene5_CollectItemText[i].text = t;
            scene5_CollectItemText[i].x = 108 - 36 - scene5_CollectItemText[i].width / 2 + i * 82;

          }


          scene5_CollectResultText.text = "你一共蒐集了";
          scene5_CollectResultText.text += (scene1_totalItemCollector[1] + scene1_totalItemCollector[2] + scene1_totalItemCollector[8]);
          scene5_CollectResultText.text += "件總督府的權力物件，";
          scene5_CollectResultText.text += (scene1_totalItemCollector[0] + scene1_totalItemCollector[5] + scene1_totalItemCollector[6]);
          scene5_CollectResultText.text += "件「有志之士」的象徵物件，\n";
          if (scene1_totalInteractCollector[0] || scene1_totalInteractCollector[1] || scene1_totalInteractCollector[2] || scene1_totalInteractCollector[3]) {
            scene5_CollectResultText.text += " 你也參與了"
            let temp = false;
            if (scene1_totalInteractCollector[0]) {
              scene5_CollectResultText.text += "演講會";
              temp = true
            }
            if (scene1_totalInteractCollector[3]) {
              if (temp) scene5_CollectResultText.text += "、";
              scene5_CollectResultText.text += "購買掛號";
              temp = true
            }
            if (scene1_totalInteractCollector[1]) {
              if (temp) scene5_CollectResultText.text += "、";
              scene5_CollectResultText.text += "吸食鴉片";
              temp = true
            }
            if (scene1_totalInteractCollector[2]) {
              if (temp) scene5_CollectResultText.text += "、";
              scene5_CollectResultText.text += "蓋長官銅像";
              temp = true
            }
            scene5_CollectResultText.text += "的活動"
          }
          else {
            scene5_CollectResultText.text += "而且並未參與所有會影響局勢的活動"
          }

          scene5_CollectResultText.text += "；\n因為你的選擇，總督府對社會的控制力道為";
          scene5_CollectResultText.text += (Math.round(centerComponent.rate * 100));
          if (scene1_radio + 1 != 0) {
            scene5_CollectResultText.text += "%，期間通過了";
            scene5_CollectResultText.text += (scene1_radio + 1);
            scene5_CollectResultText.text += "條不平等法令，\n最終促成了";
          }
          else {
            scene5_CollectResultText.text += "%，期間沒通過任何不平等法令，\n最終促成了";
          }

          if (centerComponent.rate >= 0.5) scene5_CollectResultText.text += "公益會";
          else scene5_CollectResultText.text += "文化協會";
          scene5_CollectResultText.text += "的誕生，可喜可賀，可喜可賀！";

          scene5_CollectResultText.x = (screenWidth - scene5_CollectResultText.width) / 2;




        }
        {
          let Collect = new PIXI.Sprite(PIXI.Texture.from("Collect"));
          //End2.scale.set(globalImageScale, globalImageScale);
          Collect.width = screenWidth;
          Collect.height = screenHeight;
          Collect.visible = true;
          Collect.interactive = true;
          scene5_CollectBoard.addChild(Collect);

          let X = new PIXI.Sprite(PIXI.Texture.from("Illustrat03"));
          scene5_CollectBoard.addChild(X);
          X.visible = true;
          X.pivot.set(X.width / 2, X.height / 2);
          X.scale.set(globalImageScale * 0.15, globalImageScale * 0.15);
          X.position.set(667 + 98 - 10, 62 - 31 + 20);

          let XW = new PIXI.Sprite(PIXI.Texture.from("white"));
          scene5_CollectBoard.addChild(XW);
          XW.visible = true;
          XW.width = 50; XW.height = 50;
          XW.position.set(643 + 98 - 10, 40 - 31 + 20);
          XW.alpha = 0;
          XW.interactive = true;
          XW.buttonMode = true;
          XW.addListener("pointerdown", function () {
            scene5_CollectBoard.visible = false;
            scene0_audioButtonContainer.visible = true;
          });

          let style = new PIXI.TextStyle({
            fontFamily: "DINPro-Regular_13937",
            fontSize: 36, //36
            fill: "black",
            fontStyle: "normal",
            fontWeight: "lighter",
            //stroke: '#000000',
            //strokeThickness: 0,
            letterSpacing: 4,
            padding: 100,
            lineHeight: 36
          });

          let style2 = new PIXI.TextStyle({
            fontFamily: "NotoSansCJKtc-Regular",
            fontSize: 50, //36
            fill: "black",
            align: "center",
            //stroke: '#000000',
            //strokeThickness: 0,
            letterSpacing: 5.0,
            padding: 100,
            lineHeight: 100
          });
          {
            scene5_CollectItemText = [];
            for (let i = 0; i < 9; i++) {
              let T0 = new PIXI.Text("X0", style);
              T0.scale.set(0.5, 0.5);
              T0.position.set(108 - 36 - T0.width / 2 + i * 82, 215);
              scene5_CollectBoard.addChild(T0);
              scene5_CollectItemText.push(T0);


            }


            scene5_CollectResultText = new PIXI.Text("你一共蒐集了18件總督府的權力物件，16件有志之士的象徵物件，\n你也參與了演講會、購買掛號、吸食鴉片、蓋長官銅像；\n因為你的選擇，總督府對社會的控制達到了50%，期間通過了5條不平等法令，\n最終促成了公益會的誕生，可喜可賀，可喜可賀！", style2);
            scene5_CollectResultText.scale.set(0.25, 0.25);
            scene5_CollectResultText.position.set((screenWidth - scene5_CollectResultText.width) / 2, 285);
            scene5_CollectBoard.addChild(scene5_CollectResultText);
          }
        }



      }

      //手機上外聯網址要用 on tap
      //電腦上用 on click
      //才能被偵測到是 user gesture ，而不被視為是垃圾彈出視窗。
      console.log(isMobile);
      if (isMobile) {

        selectBoxes[1].on("tap", (event) => { buttonB(); console.log("HI"); });
        selectBoxes[3].on("tap", (event) => { buttonD(); });
      }
      else {
        selectBoxes[1].on("click", (event) => { buttonB(); console.log("HO"); });
        selectBoxes[3].on("click", (event) => { buttonD(); });
      }

      selectBoxes[0].addListener("pointerdown", () => { buttonA(); });

      selectBoxes[2].addListener("pointerdown", () => { buttonC(); });

      selectBoxes[4].addListener("pointerdown", () => { buttonE(); });

      function buttonA() {

        PIXI.sound.play('button_click');
        centerComponent.currentStage = 1;

        ResetCenterComponent();

        EndThisScene();
      }
      function buttonB() {

        PIXI.sound.play('button_click');

        window.open('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftncmmm1921.vercel.app%2F&amp;src=sdkpreparse', '_blank');

      }
      function buttonC() {

        scene0_audioButtonContainer.visible = false;
        PIXI.sound.play('button_click');
        scene3_sceneList[9].visible = true;

        scene9_itemIndex = -1;
        nextItem(1);
        //scene9_itemBlockL.texture = scene9_itemTextureList[(scene9_itemIndex) % scene9_itemTextureList.length];
        //scene9_itemBlockC.texture = scene9_itemTextureList[(scene9_itemIndex + 1) % scene9_itemTextureList.length];
        //scene9_itemBlockR.texture = scene9_itemTextureList[(scene9_itemIndex + 2) % scene9_itemTextureList.length];

        //scene9_Title.text = scene9_itemTitleList[(scene9_itemIndex + 1) % scene9_itemTextureList.length];
        //scene9_Title.position.set(191 - scene9_Title.width / 2, 69);
        //scene9_Info.text = scene9_itemContentList[(scene9_itemIndex + 1) % scene9_itemTextureList.length];
        //scene9_Info.position.set((screenWidth - scene9_Info.width) / 2, 358);

      }
      function buttonD() {
        PIXI.sound.play('button_click');

        window.open('https://www.facebook.com/TNCMMM', '_blank');

        // document.getElementById("btnClickD").click();

      }
      function buttonE() {

        PIXI.sound.play('button_click');

        ghostFloatTimer = 0;
        ghostFloatMult = 30;
        ghostTalkTimer = 0;
        ghostTalkCounter = -1;
        app.ticker.add(GhostFloat);

        //測試用
        //centerComponent.seenGhost = true;

        if (centerComponent.seenGhost == true) {
          scene5_ghost.visible = true;
          scene5_inputContainer.visible = true;
          scene5_textEmpty.visible = false;

          scene5_butS0.x = screenWidth / 2 - scene5_butS0.width / 2 - 70;
          scene5_butS0.alpha = 1;

          scene5_butS1.visible = true;
          scene5_butS1.alpha = 1;
          scene_butS3.visible = true;
        }
        else {
          scene5_ghost.visible = false;
          scene5_inputContainer.visible = false;
          scene5_textEmpty.visible = true;

          scene5_butS0.x = screenWidth / 2 - scene5_butS0.width / 2;
          scene5_butS0.alpha = 1;

          scene5_butS1.visible = false;
          scene5_butS1.alpha = 1;
          scene_butS3.visible = false;
        }

        scene3_sceneList[8].visible = true;

      }


    }

    // Scene8
    //元帥畫面(場景)
    {

      let sceneA = new PIXI.Container();
      sceneA.sortableChildren = true;
      scene3_sceneBoard.addChild(sceneA);
      scene3_sceneList.push(sceneA);

      let white = new PIXI.Sprite(PIXI.Texture.from("Illustrat00"));
      sceneA.addChild(white);
      white.width = screenWidth;
      white.height = screenHeight;
      white.interactive = true;

      /* let but2 = new PIXI.Sprite(PIXI.Texture.from("SummonBut01"));
       but2.scale.set(globalImageScale * 0.1287, globalImageScale * 0.1287);
       but2.position.set(screenWidth / 2 - but2.width / 2 - 70, 360)
       sceneA.addChild(but2);*/

      let deltaY = 10;

      scene_butS3 = new PIXI.Sprite(PIXI.Texture.from("SummonBut03"));
      scene_butS3.scale.set(globalImageScale * 0.1287, globalImageScale * 0.1287);
      scene_butS3.position.set(screenWidth / 2 - scene_butS3.width / 2 + 70, 360 + deltaY + 5)
      sceneA.addChild(scene_butS3);

      scene5_butS0 = new PIXI.Sprite(PIXI.Texture.from("SummonBut00"));
      scene5_butS0.scale.set(globalImageScale * 0.1287, globalImageScale * 0.1287);
      scene5_butS0.position.set(screenWidth / 2 - scene5_butS0.width / 2 - 70, 360 + deltaY + 5)
      sceneA.addChild(scene5_butS0);
      scene5_butS0.interactive = true;
      scene5_butS0.buttonMode = true;

      //返回按鈕
      scene5_butS0.addListener("pointerdown", function () {
        PIXI.sound.play('button_click');
        scene3_sceneList[8].visible = false;
        scene5_butS0.alpha = 0;
        //but0.visible = false;
        app.ticker.remove(GhostFloat);
      })
      scene5_butS0.addListener("pointerup", function () {
        scene5_butS0.alpha = 1;
      })

      scene5_butS1 = new PIXI.Sprite(PIXI.Texture.from("SummonBut02"));
      scene5_butS1.scale.set(globalImageScale * 0.1287, globalImageScale * 0.1287);
      scene5_butS1.position.set(screenWidth / 2 - scene5_butS1.width / 2 + 70, 360 + deltaY + 5)
      sceneA.addChild(scene5_butS1);
      scene5_butS1.interactive = true;
      scene5_butS1.buttonMode = true;

      //送出按鈕
      if (isMobile) {
        scene5_butS1.on("tap",
          function () {


            var result = false;
            switch (text.text) {
              case "新文化運動月":
                window.open('https://drive.google.com/file/d/15z4ziM5IcppO7ZoAHIhTXIRLTmj5b9mp/view?usp=sharing');
                result = true;
                break;
              case "青年誕生":
                window.open('https://drive.google.com/file/d/1PdqR_mAQHq5UI5xgSJc9Nf1vumdUUFh4/view?usp=sharing');
                result = true;
                break;
              case "百年催生":
                window.open('https://drive.google.com/file/d/1BEMsESFgA6SxTT1PXBksa4J8vaP27KpO/view?usp=sharing');
                result = true;
                break;
              case "文化自造夜":
                window.open('https://drive.google.com/file/d/1ed-L3fTLM4hECY5b96XXImDwim6lQNna/view?usp=sharin');
                result = true;
                break;
              case "倒數1921":
                window.open('https://drive.google.com/file/d/1BnR0SstNkTZlRQ0tsEZh_Q36g-tQWpD3/view?usp=sharing');
                result = true;
                break;
              case "文協百年":
                window.open('https://drive.google.com/file/d/1Cdcsj0GEpzOb28uwLKMhjKpT7xioLFkl/view?usp=sharing');
                result = true;
                break;
            }
            if (result) {
              PIXI.sound.play('button_click');
            }
            else {
              PIXI.sound.play('error');
            }

          })
      }
      else {
        scene5_butS1.on("click",
          function () {

            var result = false;

            switch (text.text) {
              case "新文化運動月":
                window.open('https://drive.google.com/file/d/15z4ziM5IcppO7ZoAHIhTXIRLTmj5b9mp/view?usp=sharing');
                result = true;
                break;
              case "青年誕生":
                window.open('https://drive.google.com/file/d/1PdqR_mAQHq5UI5xgSJc9Nf1vumdUUFh4/view?usp=sharing');
                result = true;
                break;
              case "百年催生":
                window.open('https://drive.google.com/file/d/1BEMsESFgA6SxTT1PXBksa4J8vaP27KpO/view?usp=sharing');
                result = true;
                break;
              case "文化自造夜":
                window.open('https://drive.google.com/file/d/1ed-L3fTLM4hECY5b96XXImDwim6lQNna/view?usp=sharin');
                result = true;
                break;
              case "倒數1921":
                window.open('https://drive.google.com/file/d/1BnR0SstNkTZlRQ0tsEZh_Q36g-tQWpD3/view?usp=sharing');
                result = true;
                break;
              case "文協百年":
                window.open('https://drive.google.com/file/d/1Cdcsj0GEpzOb28uwLKMhjKpT7xioLFkl/view?usp=sharing');
                result = true;
                break;
            }

            if (result) {
              PIXI.sound.play('button_click');
            }
            else {
              PIXI.sound.play('error');
            }

          })
      }

      scene5_butS1.addListener("pointerup",
        function () {
          scene5_butS1.alpha = 1;
        })



      //鬼魂/輸入畫面

      let IMAGED = new PIXI.Sprite(PIXI.Texture.from("Summon04"));
      IMAGED.scale.set(globalImageScale, globalImageScale);
      IMAGED.position.set(screenWidth / 2 - IMAGED.width / 2 - 5, 0 + deltaY)
      sceneA.addChild(IMAGED);



      scene5_inputContainer = new PIXI.Container();
      sceneA.addChild(scene5_inputContainer);
      //scene5_input.visible = false;

      scene5_ghost = new PIXI.Container();
      sceneA.addChild(scene5_ghost);
      //scene5_ghost.visible = false;

      let IMAGEB = new PIXI.Sprite(PIXI.Texture.from("Summon07"));
      IMAGEB.scale.set(globalImageScale, globalImageScale);
      IMAGEB.position.set(screenWidth / 2 - IMAGEB.width / 2 + 5, 0 + deltaY)
      scene5_inputContainer.addChild(IMAGEB);

      let IMAGEC = new PIXI.Sprite(PIXI.Texture.from("Summon08"));
      IMAGEC.scale.set(globalImageScale * 0.15, globalImageScale * 0.15);
      IMAGEC.position.set(screenWidth / 2 - IMAGEC.width / 2 + 5, -61 + deltaY)
      scene5_inputContainer.addChild(IMAGEC);

      let IMAGEE = new PIXI.Sprite(PIXI.Texture.from("Summon05"));
      IMAGEE.scale.set(globalImageScale, globalImageScale);
      IMAGEE.position.set(screenWidth / 2 - IMAGEE.width / 2 - 5, 0 + deltaY)
      scene5_ghost.addChild(IMAGEE);

      let IMAGEF = new PIXI.Sprite(PIXI.Texture.from("Summon09"));
      IMAGEF.scale.set(globalImageScale * 0.16, globalImageScale * 0.16);
      IMAGEF.position.set(screenWidth / 2 - IMAGEF.width / 2, 15 + deltaY)
      scene5_inputContainer.addChild(IMAGEF);

      scene5_password = [-1, -1, -1, -1, -1, -1];
      scene5_passwordIndex = 0;

      //輸入元帥密碼的按鈕
      {
        for (let i = 0; i < 15; i++) {
          let AA = new PIXI.Graphics();
          AA.beginFill(0x700028).drawRect(0, 0, 280, 100).endFill();
          AA.visible = true;
          AA.alpha = 0;
          AA.id = i;
          switch (i) {
            case 0:
              AA.position.set(85, 205);
              break;
            case 1:
              AA.position.set(460, 205);
              break;
            case 2:
              AA.position.set(280, 350);
              break;
            case 3:
              AA.position.set(85, 500);
              break;
            case 4:
              AA.position.set(460, 500);
              break;
            case 5:
              AA.position.set(280, 660);
              break;
            case 6:
              AA.position.set(85, 820);
              break;

            case 7:
              AA.position.set(85 + 1640, 205);
              break;
            case 8:
              AA.position.set(460 + 1640, 205);
              break;
            case 9:
              AA.position.set(280 + 1640, 350);
              break;
            case 10:
              AA.position.set(85 + 1640, 500);
              break;
            case 11:
              AA.position.set(460 + 1640, 500);
              break;
            case 12:
              AA.position.set(280 + 1640, 660);
              break;
            case 13:
              AA.position.set(85 + 1640 + 375, 820);
              break;

            case 14:
              AA.width = 80;
              AA.id = -1;
              AA.position.set(85 + 1640, 940);
              break;
          }

          AA.interactive = true;

          AA.addListener("pointerdown", function () { GhostPasswordInput(AA.id); })


          IMAGEF.addChild(AA);
        }


      }

      scene5_ghostTalk = [];
      for (let i = 0; i < 3; i++) {
        let IMAGET = new PIXI.Sprite(PIXI.Texture.from("SummonTalk0" + i));
        IMAGET.visible = false;
        IMAGET.scale.set(globalImageScale * 0.22, globalImageScale * 0.22);
        IMAGET.position.set(270 - 5, 50)
        scene5_ghostTalk.push(IMAGET)
        scene5_ghost.addChild(IMAGET);
      }

      //輸入功能
      {
        scene5_input = new PIXI.TextInput({
          input: {
            fontSize: '36px',
            padding: '12px',
            width: '290px',
            height: '20px',
            color: '#26272E'
          },
          box: {
            default: { fill: 0xE8E9F3, rounded: 12, stroke: { color: 0xCBCEE0, width: 3 } },
            focused: { fill: 0xE1E3EE, rounded: 12, stroke: { color: 0xABAFC6, width: 3 } },
            disabled: { fill: 0xDBDBDB, rounded: 12 }
          }
        })

        scene5_input.width = 290;
        scene5_input.height = 20;


        scene5_input.x = (screenWidth - scene5_input.width) / 2;
        scene5_input.y = 312;

        scene5_input.visible = true;
        scene5_input.alpha = 0;

        //sceneA.addChild(scene5_input)
      }

      //padding可以處理字體顯示位置不正確的問題
      let style = new PIXI.TextStyle({
        fontFamily: "pixelSilver",
        fontSize: 42,
        fill: "white",
        letterSpacing: 2,
        padding: 42
      });
      let style2 = new PIXI.TextStyle({
        fontFamily: "pixelSilver",
        fontSize: 96,
        fill: "white",
        letterSpacing: 4,
        padding: 96
      });

      scene5_textEmpty = new PIXI.Text("傳說集得五枚大明慈悲國的遺落物，即可召喚元帥", style2);
      scene5_textEmpty.scale.set(0.25, 0.25);
      //scene5_textEmpty.x = (screenWidth-scene5_textEmpty)/2; scene5_textEmpty.y = 320;
      scene5_textEmpty.position.set((screenWidth - scene5_textEmpty.width) / 2, 315 + deltaY);
      sceneA.addChild(scene5_textEmpty);

      let text = new PIXI.Text("", style);
      text.scale.set(0.5, 0.5);
      text.x = 245; text.y = 318 + deltaY;
      sceneA.addChild(text);

      scene5_input.on('input', keycode => {
        text.text = keycode;
        //console.log('key pressed:', keycode)
      })
      scene5_input.on('focus', function () {
        IMAGEC.visible = false;
        scene5_input.text = "";
        text.text = "";
        //console.log('focus',)
      })
      scene5_input.on('blur', function () {
        if (text.text == "") IMAGEC.visible = true;
        //console.log('blur',)
      })


      function GhostPasswordInput(index) {

        console.log(index);
        //scene5_password = [-1, -1, -1, -1, -1, -1, -1, -1];
        //scene5_passwordIndex = 0;

        if (index == -1) {

          if (scene5_passwordIndex > 0) {
            PIXI.sound.play('button_click');
            scene5_passwordIndex -= 1;
            scene5_password[scene5_passwordIndex] = -1;
            GhostSetPasswordText();
          }

        }
        else {
          if (scene5_passwordIndex >= scene5_password.length) {
            PIXI.sound.play('error');
            return;
          }
          else {
            PIXI.sound.play('button_click');
            scene5_password[scene5_passwordIndex] = index;
            scene5_passwordIndex += 1;
            GhostSetPasswordText();
          }
        }


      }

      function GhostSetPasswordText() {

        if (scene5_passwordIndex > 0) {
          IMAGEC.visible = false;
        }
        else {
          IMAGEC.visible = true;

        }
        text.text = "";
        for (let i = 0; i < scene5_passwordIndex; i++) {
          if (scene5_password[i] == -1) {
            break;
          }
          else {
            let nextWord = "";
            switch (scene5_password[i]) {
              case 0:
                nextWord = "新";
                break;
              case 1:
                nextWord = "倒數";
                break;
              case 2:
                nextWord = "誕生";
                break;
              case 3:
                nextWord = "自造";
                break;
              case 4:
                nextWord = "1921";
                break;
              case 5:
                nextWord = "文協";
                break;
              case 6:
                nextWord = "運動月";
                break;

              case 7:
                nextWord = "青年";
                break;
              case 8:
                nextWord = "催生";
                break;
              case 9:
                nextWord = "2021";
                break;
              case 10:
                nextWord = "文化";
                break;
              case 11:
                nextWord = "夜";
                break;
              case 12:
                nextWord = "百年";
                break;
              case 13:
                nextWord = "耶";
                break;
            }

            text.text = text.text + nextWord;
          }

        }

      }

    }


    function GhostFloat() {

      ghostFloatTimer = (ghostFloatTimer + 1) % (360);
      scene5_ghost.y = (Math.cos(ghostFloatTimer / ghostFloatMult) * -1 + 1) * 5;
      //console.log(ghostFloatTimer);
      if (ghostFloatTimer == 1) {
        ghostTalkTimer++;
        if (ghostTalkTimer == 1) {
          ghostTalkTimer = 0;
          ghostTalkCounter = (ghostTalkCounter + 1) % 6;

          for (let i = 0; i < scene5_ghostTalk.length; i++) {
            scene5_ghostTalk[i].visible = false;
          }

          if (ghostTalkCounter < 3) {
            scene5_ghostTalk[ghostTalkCounter].visible = true;
          }

        }
      }
      //console.log(  scene5_ghost.y);
    }

    // Scene9
    // 圖鑑畫面
    {

      let sceneA = new PIXI.Container();
      sceneA.sortableChildren = true;
      scene3_sceneBoard.addChild(sceneA);
      scene3_sceneList.push(sceneA);

      {
        let white = new PIXI.Sprite(PIXI.Texture.from("Illustrat00"));
        sceneA.addChild(white);
        white.width = screenWidth;
        white.height = screenHeight;
        white.interactive = true;

        let BOXtemp = 0;
        let BOYtemp = 0;

        let BO1 = new PIXI.Sprite(PIXI.Texture.from("Illustrat09"));
        sceneA.addChild(BO1);
        BO1.width = screenWidth;
        BO1.height = screenHeight;
        BO1.position.set(screenWidth / 2 - BO1.width / 2 + BOXtemp, BOYtemp - 5);

        let BO1W = new PIXI.Sprite(PIXI.Texture.from("white"));
        sceneA.addChild(BO1W);
        BO1W.width = 70;
        BO1W.height = 50;
        BO1W.alpha = 0;
        BO1W.position.set(430, 50);
        BO1W.interactive = true;
        //BO1W.buttonMode = true;
        BO1W.addListener("pointerdown", function () { changeBoard(0); })

        let BO2 = new PIXI.Sprite(PIXI.Texture.from("Illustrat10"));
        sceneA.addChild(BO2);
        BO2.width = screenWidth;
        BO2.height = screenHeight;
        BO2.position.set(screenWidth / 2 - BO2.width / 2 + BOXtemp, BOYtemp);

        let BO2W = new PIXI.Sprite(PIXI.Texture.from("white"));
        sceneA.addChild(BO2W);
        BO2W.width = 70;
        BO2W.height = 50;
        BO2W.alpha = 0;
        BO2W.position.set(520, 50);
        BO2W.interactive = true;
        //BO2W.buttonMode = true;
        BO2W.addListener("pointerdown", function () { changeBoard(1); })

        let BO3 = new PIXI.Sprite(PIXI.Texture.from("Illustrat11"));
        sceneA.addChild(BO3);
        BO3.width = screenWidth;
        BO3.height = screenHeight;
        BO3.position.set(screenWidth / 2 - BO3.width / 2 + BOXtemp, BOYtemp);

        scene9_boardTag = [BO1, BO2, BO3];

        let BO3W = new PIXI.Sprite(PIXI.Texture.from("white"));
        sceneA.addChild(BO3W);
        BO3W.width = 70;
        BO3W.height = 50;
        BO3W.alpha = 0;
        BO3W.position.set(610, 50);
        BO3W.interactive = true;
        //BO3W.buttonMode = true;
        BO3W.addListener("pointerdown", function () { changeBoard(2); })

        let A = new PIXI.Sprite(PIXI.Texture.from("Illustrat06"));
        sceneA.addChild(A);
        A.width = screenWidth;
        A.height = screenHeight;
        A.position.set(screenWidth / 2 - A.width / 2, 0);
        scene9_Board = A;

        let B = new PIXI.Sprite(PIXI.Texture.from("Illustrat02"));
        B.width = screenWidth;
        B.height = screenHeight;
        B.position.set(screenWidth / 2 - B.width / 2, 0);

        let L = new PIXI.Sprite(PIXI.Texture.from("Illustrat04"));
        sceneA.addChild(L);
        L.pivot.set(L.width / 2, L.height / 2);
        L.scale.set(globalImageScale * 0.15, globalImageScale * 0.15);
        L.rotation = 90 * (Math.PI / 180);
        L.position.set(screenWidth / 2 - L.width / 2 - 235, 362);

        //上一個
        let LW = new PIXI.Sprite(PIXI.Texture.from("white"));
        sceneA.addChild(LW);
        LW.alpha = 0;
        LW.width = 50; LW.height = 50;
        LW.position.set(L.x - LW.width / 2, L.y - LW.height / 2);
        LW.interactive = true;
        LW.buttonMode = true;
        LW.addListener("pointerdown", function () { nextItem(-1); })

        let R = new PIXI.Sprite(PIXI.Texture.from("Illustrat04"));
        sceneA.addChild(R);
        R.pivot.set(R.width / 2, R.height / 2);
        R.scale.set(globalImageScale * 0.15, globalImageScale * 0.15);
        R.rotation = -90 * (Math.PI / 180);
        R.position.set(screenWidth / 2 - R.width / 2 + 258, 362);

        let RW = new PIXI.Sprite(PIXI.Texture.from("white"));
        sceneA.addChild(RW);
        RW.width = 50; RW.height = 50;
        RW.position.set(R.x - RW.width / 2, R.y - RW.height / 2);
        RW.alpha = 0;
        RW.interactive = true;
        RW.buttonMode = true;
        RW.addListener("pointerdown", function () { nextItem(1); })

        let X = new PIXI.Sprite(PIXI.Texture.from("Illustrat03"));
        sceneA.addChild(X);
        X.pivot.set(X.width / 2, X.height / 2);
        X.scale.set(globalImageScale * 0.15, globalImageScale * 0.15);
        X.position.set(667 + 98, 62 - 31);

        let XW = new PIXI.Sprite(PIXI.Texture.from("white"));
        sceneA.addChild(XW);
        XW.width = 50; XW.height = 50;
        XW.position.set(643 + 98, 40 - 31);
        XW.alpha = 0;
        XW.interactive = true;
        XW.buttonMode = true;
        XW.addListener("pointerdown", function () {
          scene0_audioButtonContainer.visible = true;
          scene3_sceneList[9].visible = false;
          PIXI.sound.play('button_click');
        });
      }

      scene9_itemIndex = 0;

      scene9_itemTextureList = [[], [], []];
      scene9_itemTitleList = [[], [], []];
      scene9_itemContentList = [[], [], []];
      for (let i = 0; i < 8; i++) {
        scene9_itemTextureList[0].push(PIXI.Texture.from("IllustratII" + i));
      }
      for (let i = 0; i < 3; i++) {
        scene9_itemTextureList[1].push(PIXI.Texture.from("IllustratIB" + i));
      }
      for (let i = 0; i < 9; i++) {
        scene9_itemTextureList[2].push(PIXI.Texture.from("IllustratIO" + i));
      }

      {


        //I0
        scene9_itemTitleList[0].push("書籍");
        scene9_itemContentList[0].push("臺灣青年看《臺灣青年》。");
        //04
        scene9_itemTitleList[0].push("甲長章");
        scene9_itemContentList[0].push("精緻的徽章，戴上統御能力加倍。");
        //08
        scene9_itemTitleList[0].push("符咒");
        scene9_itemContentList[0].push("依稀寫著「大明慈悲國…五福王爺 神諭」 字樣。");

        //09
        scene9_itemTitleList[0].push("紳章");
        scene9_itemContentList[0].push("總督府頒發給臺籍仕商的榮譽象徵。");

        //10
        scene9_itemTitleList[0].push("報紙");
        scene9_itemContentList[0].push("今日頭條－新文化運動月火熱進行中！");
        //11
        scene9_itemTitleList[0].push("臺字紋章");
        scene9_itemContentList[0].push("代表臺灣總督府的紋章。");

        //12
        scene9_itemTitleList[0].push("膠捲");
        scene9_itemContentList[0].push("上面寫著： 臺灣巡迴社教片 －文化協會");
        //05
        scene9_itemTitleList[0].push("警帽");
        scene9_itemContentList[0].push("警察大人必備，權力的象徵。");

        //11
        scene9_itemTitleList[1].push("新文化運動月");
        scene9_itemContentList[1].push("（臺灣新文化運動紀念館） 每年十月舉辦新文化運動月活動。");

        //12
        scene9_itemTitleList[1].push("街頭運動會");
        scene9_itemContentList[1].push("（辜宅） 深入瞭解大稻埕街區的導覽活動。");
        //05
        scene9_itemTitleList[1].push("百年催生");
        scene9_itemContentList[1].push("（淡水戲館） 一部臺灣文化協會的時空穿越劇作，由陳南宏編劇。");

        //O0
        scene9_itemTitleList[2].push("天來劍");
        scene9_itemContentList[2].push("余清芳的寶劍，據說拔劍一分可斬殺一萬人。");

        //O1
        scene9_itemTitleList[2].push("單光旭日章");
        scene9_itemContentList[2].push("國家級勳章－凡人無法直視其耀眼無比的光芒。");

        //03
        scene9_itemTitleList[2].push("長官銅像");
        scene9_itemContentList[2].push("為長官豎立銅像是仕商間流傳十種生存法則之一。");

        //06
        scene9_itemTitleList[2].push("茶葉");
        scene9_itemContentList[2].push("一不小心就世界留名的臺灣名產。");

        //07
        scene9_itemTitleList[2].push("高砂木瓜糖");
        scene9_itemContentList[2].push("曾經風靡萬千日本人的大稻埕特產。");

        //13
        scene9_itemTitleList[2].push("鴉片");
        scene9_itemContentList[2].push("民間傳說具有神秘的特殊功效，被稱為「帝國主義的麻醉劑」。");

        //14
        scene9_itemTitleList[2].push("議會請願傳單");
        scene9_itemContentList[2].push("相傳會從天而降、足有上萬張的傳單。(或許得集夠紳章和錢袋？)");

        //14
        scene9_itemTitleList[2].push("掛號小販");
        scene9_itemContentList[2].push("《掛號3》：一本關於新文化運動月的深度攻略。");

        //14
        scene9_itemTitleList[2].push("演講會");
        scene9_itemContentList[2].push("民眾獲得新知的最佳方式。");
      }
      //console.log(scene9_itemTitleList);


      scene9_3ItemBoard = new PIXI.Container();
      sceneA.addChild(scene9_3ItemBoard);

      let scene9_itemBlockSP = new PIXI.Sprite(PIXI.Texture.from("IllustratISP"));
      scene9_3ItemBoard.addChild(scene9_itemBlockSP);
      scene9_itemBlockSP.scale.set(globalImageScale * 0.1, globalImageScale * 0.1);
      scene9_itemBlockSP.position.set((screenWidth - scene9_itemBlockSP.width) / 2, 215 - scene9_itemBlockSP.height / 2);

      scene9_itemBlockC = new PIXI.Sprite(PIXI.Texture.from("IllustratII0"));
      scene9_3ItemBoard.addChild(scene9_itemBlockC);
      scene9_itemBlockC.scale.set(globalImageScale * 0.095, globalImageScale * 0.095);
      scene9_itemBlockC.position.set((screenWidth - scene9_itemBlockC.width) / 2, 215 - scene9_itemBlockC.height / 2);

      scene9_itemBlockR = new PIXI.Sprite(PIXI.Texture.from("IllustratII0"));
      scene9_3ItemBoard.addChild(scene9_itemBlockR);
      scene9_itemBlockR.scale.set(globalImageScale * 0.08, globalImageScale * 0.08);
      scene9_itemBlockR.position.set((screenWidth - scene9_itemBlockR.width) / 2 + 172, 215 - scene9_itemBlockR.height / 2 + 4);

      let scene9_itemBlockRW = new PIXI.Sprite(PIXI.Texture.from("white"));
      scene9_3ItemBoard.addChild(scene9_itemBlockRW);
      scene9_itemBlockRW.width = scene9_itemBlockR.width * 0.5;
      scene9_itemBlockRW.height = scene9_itemBlockR.height * 0.5;
      scene9_itemBlockRW.alpha = 0;
      scene9_itemBlockRW.position.set((screenWidth - scene9_itemBlockRW.width) / 2 + 172, 215 - scene9_itemBlockRW.height / 2 + 4);
      scene9_itemBlockRW.interactive = true;
      scene9_itemBlockRW.addListener("pointerdown", function () { nextItem(1); })

      scene9_itemBlockL = new PIXI.Sprite(PIXI.Texture.from("IllustratII0"));
      scene9_3ItemBoard.addChild(scene9_itemBlockL);
      scene9_itemBlockL.scale.set(globalImageScale * 0.08, globalImageScale * 0.08);
      scene9_itemBlockL.position.set((screenWidth - scene9_itemBlockL.width) / 2 - 172, 215 - scene9_itemBlockL.height / 2 + 4);

      let scene9_itemBlockLW = new PIXI.Sprite(PIXI.Texture.from("white"));
      scene9_3ItemBoard.addChild(scene9_itemBlockLW);
      scene9_itemBlockLW.width = scene9_itemBlockL.width * 0.5;
      scene9_itemBlockLW.height = scene9_itemBlockL.height * 0.5;
      scene9_itemBlockLW.alpha = 0;
      scene9_itemBlockLW.position.set((screenWidth - scene9_itemBlockLW.width) / 2 - 172, 215 - scene9_itemBlockLW.height / 2 + 4);
      scene9_itemBlockLW.interactive = true;
      scene9_itemBlockLW.addListener("pointerdown", function () { nextItem(-1); })

      scene9_BuildingBoard = new PIXI.Container();
      scene9_BuildingBoard.visible = false;
      sceneA.addChild(scene9_BuildingBoard);

      scene9_itemBlockB = new PIXI.Sprite(PIXI.Texture.from("IllustratIB0"));
      scene9_BuildingBoard.addChild(scene9_itemBlockB);
      scene9_itemBlockB.scale.set(globalImageScale * 0.15, globalImageScale * 0.15);
      scene9_itemBlockB.position.set((screenWidth - scene9_itemBlockB.width) / 2, 216 - scene9_itemBlockB.height / 2);

      function nextItem(input) {

        PIXI.sound.play('button_click');
        scene9_itemIndex = (scene9_itemIndex + input);
        while (scene9_itemIndex < 0) scene9_itemIndex += scene9_itemTextureList[scene9_currentBoard].length;

        if (scene9_currentBoard == 0 || scene9_currentBoard == 2) {
          scene9_itemBlockL.texture = scene9_itemTextureList[scene9_currentBoard][(scene9_itemIndex) % scene9_itemTextureList[scene9_currentBoard].length];
          scene9_itemBlockC.texture = scene9_itemTextureList[scene9_currentBoard][(scene9_itemIndex + 1) % scene9_itemTextureList[scene9_currentBoard].length];
          scene9_itemBlockR.texture = scene9_itemTextureList[scene9_currentBoard][(scene9_itemIndex + 2) % scene9_itemTextureList[scene9_currentBoard].length];
        }
        else {
          scene9_itemBlockB.texture = scene9_itemTextureList[scene9_currentBoard][(scene9_itemIndex + 1) % scene9_itemTextureList[scene9_currentBoard].length];
        }

        scene9_Title.text = scene9_itemTitleList[scene9_currentBoard][(scene9_itemIndex + 1) % scene9_itemTextureList[scene9_currentBoard].length];
        scene9_Title.position.set(171 - scene9_Title.width / 2, 71);
        scene9_Info.text = scene9_itemContentList[scene9_currentBoard][(scene9_itemIndex + 1) % scene9_itemTextureList[scene9_currentBoard].length];
        scene9_Info.position.set((screenWidth - scene9_Info.width) / 2, 358);

      }
      function changeBoard(input) {

        if (scene9_currentBoard == input) return;

        scene9_currentBoard = input;

        if (input != 1) {
          scene9_3ItemBoard.visible = true;
          scene9_BuildingBoard.visible = false;
        }
        else {
          scene9_3ItemBoard.visible = false;
          scene9_BuildingBoard.visible = true;
        }

        for (let i = 0; i < 3; i++) {
          scene9_boardTag[i].y = screenWidth / 2 - scene9_boardTag[i].width / 2;
        }
        scene9_boardTag[input].y = screenWidth / 2 - scene9_boardTag[input].width / 2 - 5;

        scene9_Board.texture = PIXI.Texture.from("Illustrat0" + (6 + input));

        scene9_itemIndex = 0;
        nextItem(0);
      }


      //784b32
      let style = new PIXI.TextStyle({
        fontFamily: "pixelSilver",
        fontSize: 48,
        fill: "0x666464",
        letterSpacing: 2,
        padding: 48
      });

      let style2 = new PIXI.TextStyle({
        fontFamily: "NotoSansCJKtc-Medium",
        fontSize: 30,
        fill: "white",
        letterSpacing: 5,
        padding: 30
      });

      scene9_Title = new PIXI.Text("高砂木瓜糖", style2);
      scene9_Title.scale.set(0.5, 0.5);
      sceneA.addChild(scene9_Title);

      scene9_Info = new PIXI.Text("曾經風靡萬千日本人的大稻埕特產", style);
      scene9_Info.scale.set(0.5, 0.5);
      sceneA.addChild(scene9_Info);

    }

    //對話中出現的道具物件
    {

      scene3_plotItemBlockContainer = new PIXI.Container();
      let bookContainer = new PIXI.Container();
      let metalContainer = new PIXI.Container();



      let book = new PIXI.Sprite(PIXI.Texture.from("illustrated0"));
      book.zIndex = 2;
      book.scale.set(0.1, 0.1);
      book.position.set(591, 270);

      let metal = new PIXI.Sprite(PIXI.Texture.from("spItem0"));
      metal.zIndex = 2;
      metal.scale.set(3 * 0.0417, 3 * 0.0417);
      metal.position.set(620 - 30, 295 - 28);

      scene3_uIBoard.addChild(scene3_plotItemBlockContainer);
      //scene3_plotItemBlockContainer.addChild(block);
      //scene3_plotItemBlockContainer.addChild(block2);
      scene3_plotItemBlockContainer.addChild(bookContainer);
      scene3_plotItemBlockContainer.addChild(metalContainer);
      bookContainer.addChild(book);
      metalContainer.addChild(metal);

      scene3_plotItemBlockContainer.book = bookContainer;
      scene3_plotItemBlockContainer.metal = metalContainer;
      bookContainer.visible = false;
      metalContainer.visible = false;
      scene3_plotItemBlockContainer.visible = false;
    }
  }
}

function CharJump(P) {

  if (P.jumpSpeed == 0) {
    P.jumpSpeed = 9;

    app.ticker.add(function CharJumpTicker(deltaTime) {

      P.position.y -= P.jumpSpeed;
      P.jumpSpeed -= 0.8;

      if (P.position.y > P.initY) {
        P.position.y = P.initY;
        P.jumpSpeed = 0;
        app.ticker.remove(CharJumpTicker);
      }
    });
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
    //console.log("AA:" + scene3_selectIndex);

    optionsNumber = scene3_selectTextInput[scene3_selectIndex].length

    scene3_dialogContainer.dialogBoxS2.visible = true;
    selectSelectBox(0);

    scene3_dialogContainer.dialogBoxSB.visible = true;
    if (optionsNumber == 2) {
      scene3_dialogContainer.dialogBoxS0.visible = true;
    }
    else {
      scene3_dialogContainer.dialogBoxS1.visible = true;
    }

    for (let i = 0; i < optionsNumber; i++) {

      scene3_selectBoxes[i].visible = true;

      scene3_selectBoxes[i].box.width = 500;
      scene3_selectBoxes[i].box.alpha = 0;
      scene3_selectBoxes[i].box.x = (scene3_selectBoxes[i].box.width) / 2;
      scene3_selectBoxes[i].x = (screenWidth - scene3_selectBoxes[i].box.width) / 2;

      scene3_selectBoxes[i].text.text = scene3_selectTextInput[scene3_selectIndex][i];
      scene3_selectBoxes[i].text.x = scene3_selectBoxes[i].box.x + (scene3_selectBoxes[i].box.width - scene3_selectBoxes[i].text.width) / 2 + 5;

      if (optionsNumber == 3) {
        scene3_selectBoxes[i].y = 147 + 66 * (i - 1);
      } //scene3_selectBoxes[i].y = 344 + 36 * (i - 1);
      else {
        scene3_selectBoxes[i].y = 147 + 33 + 66 * (i - 1);
      } //scene3_selectBoxes[i].y = 343 + 22 
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
    var charIndex = 0;
    charIndex += parseInt(content[1], 10);

    for (let i = 2; i < content.length; i++) {
      charIndex *= 10;
      charIndex += parseInt(content[i], 10);
    }

    if (charIndex == 30) {
      charIndex = scene3_InvitedPeopleImageList[0];
    }
    else if (charIndex == 31) {
      charIndex = scene3_InvitedPeopleImageList[1];
    }
    else if (charIndex == 32) {
      charIndex = scene3_InvitedPeopleImageList[2];
    }

    //console.log(charIndex);
    //讀取下一個名字
    scene3_textIndex = (scene3_textIndex + 1) % scene3_textInput.length;

    let name = scene3_names[charIndex];
    name.visible = true;

    //切換人物位置
    for (let i = 0; i < scene3_chars.length; i++) {

      if (scene3_names[i].visible == true && i != charIndex) {

        scene3_names[i].visible = false;

        if (i != 13 && i != 14 && i != 15)
          characterExit(i);

      }
    }



    if (charIndex != 13 && charIndex != 14 && charIndex != 15)
      characterEnter(charIndex);

    //自動跳到下一句話
    GoToNextDialog();
  }
  // Hop / 跳躍
  else if (content[0] == "H") {
    //確認是誰要跳
    var sceneIndex = 0;
    sceneIndex += parseInt(content[1], 10);

    var charIndex = 0;
    charIndex += parseInt(content[2], 10);

    for (let i = 3; i < content.length; i++) {
      charIndex *= 10;
      charIndex += parseInt(content[i], 10);
    }

    if (scene3_sceneList[sceneIndex].char[charIndex] !== undefined) {
      CharJump(scene3_sceneList[sceneIndex].char[charIndex]);
    }


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
  //X / 其他瑣碎的功能
  else if (content[0] == "X") {

    var charIndex = 0;
    charIndex += parseInt(content[1], 10);

    for (let i = 2; i < content.length; i++) {
      charIndex *= 10;
      charIndex += parseInt(content[i], 10);
    }


    //印書遊戲前的對話出現書本ICON
    if (charIndex == 0) {
      scene3_plotItemBlockContainer.visible = true;
      scene3_plotItemBlockContainer.book.visible = true;
    }
    //印書遊戲前的對話隱藏書本ICON
    else if (charIndex == 1) {
      scene3_plotItemBlockContainer.visible = false;
      scene3_plotItemBlockContainer.book.visible = false;
    }
    //發書的時候決定發給百姓
    else if (charIndex == 2) {
      centerComponent.stageResult = 0;
    }
    //發書的時候決定發給警察
    else if (charIndex == 3) {
      centerComponent.stageResult = 1;
    }
    //發書橋段後的對話出現旭日章ICON
    else if (charIndex == 4) {
      centerComponent.HideEndingTriggerB[0] = true;

      scene3_plotItemBlockContainer.visible = true;
      scene3_plotItemBlockContainer.metal.visible = true;
    }
    //發書橋段後的對話隱藏旭日章ICON
    else if (charIndex == 5) {
      scene3_plotItemBlockContainer.visible = false;
      scene3_plotItemBlockContainer.metal.visible = false;
    }
    //結局場景，結束後關閉對話框和人物
    else if (charIndex == 6) {
      scene3_dialogContainer.visible = false;
      scene3_charBoard.visible = false;
      scene3_nameBoard.visible = false;

      var scene5_startTimer = 0;

      scene5_EndT.visible = true;
      app.ticker.add(
        function EndTitleShowUp(deltaTime) {
          scene5_startTimer++;
          //結尾標題出現
          if (scene5_startTimer <= 10) {
            //scene5_EndT.scale.set(((1 - scene5_startTimer / 20) * 2 + 1) * globalImageScale, ((1 - scene5_startTimer / 20) * 2 + 1) * globalImageScale);
            scene5_EndT.width = screenWidth * ((1 - scene5_startTimer / 10) * 3 + 1);
            scene5_EndT.height = screenHeight * ((1 - scene5_startTimer / 10) * 3 + 1);
            scene5_EndT.position.set(screenWidth / 2 - scene5_EndT.width / 2, screenHeight / 2 - scene5_EndT.height / 2)
          }
          //等待
          else if (scene5_startTimer == 11) {
            PIXI.sound.play('ending_stamp');
            app.ticker.remove(EndTitleShowUp);
          }
        });

      return;
    }
    //台灣是台灣人的台灣
    else if (charIndex == 7) {
      centerComponent.HideEndingTriggerA[5] = true;
    }
    //寧做太平犬，不做亂世人
    else if (charIndex == 8) {
      centerComponent.HideEndingTriggerB[5] = true;
    }

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

async function GoToNextDialog_Ending() {



  //進入下一句話。
  scene3_textIndex = (scene3_textIndex + 1) % scene3_textInput.length;
  let content = scene3_textInput[scene3_textIndex];

  if (content[0] == "E") {
    scene3_dialogBox.dialogEnd = true;

    //自動跳到下一句話
    GoToNextDialog_Ending();
    return;
  }

  var dialogBoxText = scene3_endBoard.text;
  dialogBoxText.text = content;
  let y = screenHeight / 2 - dialogBoxText.height / 2 - 109;
  dialogBoxText.position.set(screenWidth / 2 - dialogBoxText.width / 2, y);

  let counter = 0;
  let counterLimit = 80;
  await app.ticker.remove(fadein);
  await app.ticker.add(fadein);

  function fadein(deltaTime) {

    counter++;

    if (counter <= counterLimit) {

      dialogBoxText.alpha = counter / counterLimit;
      dialogBoxText.y = y + (20 * (1 - MoveTrackCompute(counter, counterLimit)));
    }
    else {

      app.ticker.remove(fadein);
    }
  }

}

async function OptionsResult(result) {

  // console.log(result);

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

async function JumpResult_End(result) {

  while (true) {
    scene3_textIndex = (scene3_textIndex + 1) % scene3_textInput.length;
    let content = scene3_textInput[scene3_textIndex];

    if (content[0] == "T") {

      var targetIndex = parseInt(content[1], 10);
      console.log(result);
      if (result == targetIndex) {
        //抵達
        break;
      }
      else {
        //未抵達
        continue;
      }
    }
    else {
      continue;
    }
  }

  //自動跳到下一句話
  GoToNextDialog_Ending();
}

function selectSelectBox(a) {

  PIXI.sound.play('option_click');

  scene3_dialogContainer.dialogBoxSTarget = a;
  if (optionsNumber == 2) {
    if (a == 0) {
      scene3_dialogContainer.dialogBoxS2.y = -81;
    }
    else {
      scene3_dialogContainer.dialogBoxS2.y = -15;
    }
  }
  else if (optionsNumber == 3) {
    if (a == 0) {
      scene3_dialogContainer.dialogBoxS2.y = -114 - 0.4;
    }
    else if (a == 1) {
      scene3_dialogContainer.dialogBoxS2.y = -48;
    }
    else {
      scene3_dialogContainer.dialogBoxS2.y = 18.2;
    }
  }
}

function clickSelectBox(a) {

  //console.log(scene3_selectIndex + " " + a);

  if (scene3_dialogContainer.dialogBoxSTarget != a) {
    selectSelectBox(a);
  }
  else {

    PIXI.sound.play('option_click');

    scene3_dialogContainer.dialogBoxS0.visible = false;
    scene3_dialogContainer.dialogBoxS1.visible = false;
    scene3_dialogContainer.dialogBoxS2.visible = false;
    scene3_dialogContainer.dialogBoxSB.visible = false;

    for (let i = 0; i < scene3_selectBoxes.length; i++) {
      scene3_selectBoxes[i].visible = false;
    }

    scene3_dialogBox.active = true;
    centerComponent.dialogResult = a;
    OptionsResult(a);
  }


}

function scene3_SpaceFunc() {

  if (scene3_sceneList[0].BD[0].visible == true) {
    scene3_sceneList[0].BD[0].fadeFunc();
  }
  else if (scene3_endBoard.BDA[0].visible == true) {
    scene3_endBoard.BDA[0].fadeFunc();
  }
  else if (scene3_endBoard.BDA[1].visible == true) {
    scene3_endBoard.BDA[1].fadeFunc();
  }
  else if (scene3_endBoard.BDA[2].visible == true) {
    scene3_endBoard.BDA[2].fadeFunc();
  }
  else if (scene3_endBoard.BDB[0].visible == true) {
    scene3_endBoard.BDB[0].fadeFunc();
  }
  else if (scene3_endBoard.BDB[1].visible == true) {
    scene3_endBoard.BDB[1].fadeFunc();
  }
  else if (scene3_endBoard.BDB[2].visible == true) {
    scene3_endBoard.BDB[2].fadeFunc();
  }
  else if (scene3_dialogContainer.dialogBoxS2.visible == true) {
    clickSelectBox(scene3_dialogContainer.dialogBoxSTarget);
  }

  else if (scene3_dialogContainer.visible != true || scene3_dialogBox.visible != true) return;

  else if (centerComponent.currentStage == 15) {
    scene3_ENDPicPointerDown();
  }
  else {
    scene3_dialogBoxPointerDown();
  }

}
function scene3_ENDPicPointerDown() {
  if (scene3_dialogBox.dialogEnd == true) {
    scene3_dialogBox.dialogEnd = false;
    scene3_dialogBox.active = false;
    EndThisScene();
  }
  else if (scene3_dialogBox.active == true) {
    GoToNextDialog_Ending();
  }
}
function scene3_dialogBoxPointerDown() {
  PIXI.sound.play('talking_click');

  if (scene3_dialogBox.dialogEnd == true) {
    scene3_dialogBox.dialogEnd = false;
    scene3_dialogBox.active = false;
    EndThisScene();
  }
  else if (scene3_dialogBox.active == true) {
    GoToNextDialog();
  }
}

async function GameFunction() {

  scene3_ENDPic.on("pointerdown", function () {

    scene3_ENDPicPointerDown();
  });

  scene3_dialogBox.on("pointerdown", function () {
    scene3_dialogBoxPointerDown();
  });

  for (let i = 0; i < scene3_selectBoxes.length; i++) {

    let buttonNo = i;

    scene3_selectBoxes[i].addListener("pointerdown", () => {


      clickSelectBox(i);

    });
  }

  scene3_tickerFunc.push(ArrowMove);
  let arrowCounter = 0;
  function ArrowMove(deltaTime) {

    arrowCounter = (arrowCounter + 0.07) % 2.5;

    scene1_arrow.y = 156.3 + arrowCounter;




  }

  //app.ticker.add(CharMoveLeft);
  //scene3_tickerFunc.push(CharMoveLeft);
  {
    scene3_keyGroup = [];
    scene3_keyFuncroup = [];
    let key_Space = keyboard(32);
    scene3_keyGroup.push(key_Space);
    scene3_keyFuncroup.push(scene3_SpaceFunc);
    let key_Up = keyboard(38);
    scene3_keyGroup.push(key_Up);
    scene3_keyFuncroup.push(selectBoxUp);
    let key_Down = keyboard(40);
    scene3_keyGroup.push(key_Down);
    scene3_keyFuncroup.push(selectBoxDown);

    function selectBoxUp() {
      if (scene3_dialogContainer.dialogBoxS2.visible != true) return;
      if (scene3_dialogContainer.dialogBoxSTarget <= 0) return;
      selectSelectBox(scene3_dialogContainer.dialogBoxSTarget - 1);
    }
    function selectBoxDown() {
      if (scene3_dialogContainer.dialogBoxS2.visible != true) return;
      if (scene3_dialogContainer.dialogBoxSTarget >= (optionsNumber - 1)) return;
      selectSelectBox(scene3_dialogContainer.dialogBoxSTarget + 1);
    }
  }

}

function toggleCharPos(charIndex, onoff, dir) {
  /*let char = scene3_chars[charIndex];

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
  }*/

}
/*
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
*/
function MoveTrackCompute(i, total) {
  let di = i / total;
  return di * di * di - 3 * di * di + 3 * di;

}

function EndThisScene() {
  for (let i = 0; i < scene3_tickerFunc.length; i++) {
    app.ticker.remove(scene3_tickerFunc[i]);
  }

  for (let i = 0; i < scene3_keyGroup.length; i++) {
    scene3_keyGroup[i].press = null;
    //scene2_keyGroup[i].release = null;
  }

  EndingFadeFunc(scene3, scene3_thisAudio);
}

function characterEnter(index) {

  console.log("Enter:" + index);
  let char = scene3_chars[index];

  let counter = scene3_charMoveframes;


  char.visible = true;

  char.alpha = 0;
  //char.color = 256;
  //char.instance.tint = "0x" + char.color.toString(16) + char.color.toString(16) + char.color.toString(16);
  char.instance.tint = "0xFFFFFF"

  let nowColor = char.color;
  let finalColor = 255;

  app.ticker.add(function TestFuncA(deltaTime) {

    counter -= 1;
    let di = counter / scene3_charMoveframes;

    char.color = Math.round(nowColor * di + finalColor * (1 - di));
    char.alpha = 1 - di;
    //char.instance.tint = "0x" + char.color.toString(16) + char.color.toString(16) + char.color.toString(16);

    if (counter == 0) {
      app.ticker.remove(TestFuncA);
    }

  });


}

function characterExit(index) {

  let char = scene3_chars[index];
  let name = scene3_names[index];

  let counter = scene3_charMoveframes;

  name.visible = false;
  char.visible = true;
  //char.instance.tint = "0x" + char.color.toString(16) + char.color.toString(16) + char.color.toString(16);

  let nowColor = char.color;
  let finalColor = 0;

  app.ticker.add(function TestFuncB(deltaTime) {

    counter -= 1;
    let di = counter / scene3_charMoveframes;

    char.color = Math.round(nowColor * di + finalColor * (1 - di));
    char.alpha = di;
    //char.instance.tint = "0x" + char.color.toString(16) + char.color.toString(16) + char.color.toString(16);

    if (counter == 0) {
      //char.visible = false;
      app.ticker.remove(TestFuncB);
    }

  });

}





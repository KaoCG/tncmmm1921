
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

  await SetContainer();
  await SetObject();
}

//重置設定
async function ResetSetting() {

  scene3.visible = true;

  for (let i = 0; i < scene3_sceneList.length; i++) {
    scene3_sceneList[i].visible = false;
  }

  /////////////////////
  //測試用
  //centerComponent.currentStage = 14;
  /////////////////////

  let audio = 'plot';

  scene3_dialogContainer.visible = true;
  scene3_charBoard.visible = true;
  scene3_nameBoard.visible = true;

  switch (centerComponent.currentStage) {
    //開頭林獻堂感嘆
    case 2:
      scene3_textInput = PIXI.loader.resources.textContent.data.set1;
      scene3_selectTextInput = PIXI.loader.resources.textContent.data.choose1;
      scene3_sceneList[0].visible = true;
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
      audio = 'run1';
      break;
    //主角蓋完書
    case 7:
      scene3_textInput = PIXI.loader.resources.textContent.data.set4;
      scene3_selectTextInput = PIXI.loader.resources.textContent.data.choose4;
      scene3_sceneList[6].visible = true;
      audio = 'run2';
      break;
    //主角發完書看到抗議
    case 9:
      scene3_textInput = PIXI.loader.resources.textContent.data.set5;
      scene3_selectTextInput = PIXI.loader.resources.textContent.data.choose5;
      scene3_sceneList[4].visible = true;
      audio = 'run2';
      break;
    //抗議遊戲結束
    //主角要去找人
    case 11:
      scene3_textInput = PIXI.loader.resources.textContent.data.set6;
      scene3_selectTextInput = PIXI.loader.resources.textContent.data.choose6;
      scene3_sceneList[5].visible = true;
      audio = 'run3';
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
              scene3_InvitedPeopleImageList[k] = 16
              sp = true;
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

      if (scene3_GroupTend >= 2) centerComponent.stageResult = 1;
      else if (scene3_GroupTend <= -2) centerComponent.stageResult = 0;
      else centerComponent.stageResult = 2;

      if (sp == true) centerComponent.stageResult = 2;


      scene3_textInput = PIXI.loader.resources.textContent.data.set7;
      scene3_selectTextInput = PIXI.loader.resources.textContent.data.choose7;
      scene3_sceneList[3].visible = true;
      audio = 'plot';
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
      }
      else {
        scene3_ENDPic.texture = PIXI.Texture.from("END1");
        centerComponent.stageResult = 0;
      }

      scene3_textInput = PIXI.loader.resources.textContent.data.set9;
      audio = 'for_conclusion';
      break;
    //結算畫面
    case 16:
      scene3_textInput = PIXI.loader.resources.textContent.data.set10;
      scene3_sceneList[7].visible = true;

      //兩種底板
      {
        if (centerComponent.rate < 0.25) { centerComponent.stageResult = 0; scene5_End0.texture = PIXI.Texture.from("EndR00"); }
        else if (centerComponent.rate < 0.5) { centerComponent.stageResult = 1; scene5_End0.texture = PIXI.Texture.from("EndR01"); }
        else if (centerComponent.rate < 0.75) { centerComponent.stageResult = 2; scene5_End0.texture = PIXI.Texture.from("EndR02"); }
        else if (centerComponent.rate <= 1) { centerComponent.stageResult = 3; scene5_End0.texture = PIXI.Texture.from("EndR03"); }

      }

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

      audio = 'for_conclusion';
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

    scene3_ENDPic.visible = true;
    scene3_ENDPic.text.visible = true;

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

    scene3_ENDPic.visible = false;
    scene3_ENDPic.text.visible = false;

    //console.log(centerComponent.stageResult);
    if (centerComponent.stageResult == -1) {
      GoToNextDialog();
    }
    else {
      let stageResult = centerComponent.stageResult;
      centerComponent.stageResult = -1;
      JumpResult(stageResult);
    }

  }



  for (let i = 0; i < scene3_tickerFunc.length; i++) {
    app.ticker.add(scene3_tickerFunc[i]);
  }


  scene3_dialogBox.active = true;
  scene3_dialogBox.dialogEnd = false;

  scene3_nameBox[0].visible = true;

  scene3_thisAudio = audio;
  StartingFadeFunc(scene3, audio);
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
      let style = new PIXI.TextStyle({
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
      });

      //新版文字框
      {
        let scale = 2.55;

        let dialogBox = new PIXI.Sprite(PIXI.Texture.from("dialogBox"));
        dialogBox.scale.set(scale, scale);
        dialogBox.position.set(screenWidth / 2 - dialogBox.width / 2, -36);
        dialogBox.zIndex = -1;



        let dialogBoxText = new PIXI.Text(scene3_textInput[scene3_textIndex], style);


        dialogBoxText.scale.set(1 / scale * 0.5, 1 / scale * 0.5);
        //dialogBoxText.position.set(64, 32);
        //dialogBoxText.position.set(44, 141);
        dialogBoxText.position.set(44, 143);
        scene3_dialogBox.text = dialogBoxText;
        scene3_dialogBox.active = true;
        scene3_dialogBox.dialogEnd = false;

        //箭頭
        scene1_arrow = new PIXI.Sprite(PIXI.Texture.from("arrow"));
        scene1_arrow.scale.set(1.2, 1.2);
        scene1_arrow.position.set(145, 159);

        scene3_uIBoard.addChild(scene3_dialogContainer);
        scene3_dialogContainer.addChild(scene3_dialogBox);
        scene3_dialogContainer.addChild(dialogBox);
        dialogBox.addChild(dialogBoxText);
        dialogBox.addChild(scene1_arrow);
      }

    }

    //文字對話框上的名字A
    {
      var scene3_NameBoxA = new PIXI.Graphics();
      scene3_NameBoxA.beginFill(0xFFFFFF);
      scene3_NameBoxA.drawRect(0, 0, 130, 40).endFill();
      //圖案沒有position數值，一定要用X和Y
      scene3_NameBoxA.x = 0;
      scene3_NameBoxA.y = - scene3_NameBoxA.height;
      scene3_NameBoxA.alpha = 1;

      scene3_dialogBox.addChild(scene3_NameBoxA);

      //padding可以處理字體顯示位置不正確的問題
      let style = new PIXI.TextStyle({
        fontFamily: "pixelFont",
        fontSize: 32,
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
      dialogBoxText.position.set(
        (scene3_NameBoxA.width - dialogBoxText.width - 10) / 2,
        (scene3_NameBoxA.height - dialogBoxText.height + 6) / 2);
      scene3_NameBoxA.text = dialogBoxText;
      scene3_nameBox.push(scene3_NameBoxA);
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
        let style = new PIXI.TextStyle({
          fontFamily: "pixelSilver",
          fontSize: 96,
          fill: "black",
          fontStyle: "normal",
          fontWeight: "lighter",
          letterSpacing: 9,
          align: "left",
          padding: 100,
          lineHeight: 96
        });

        let selectBoxText = new PIXI.Text(scene3_selectTextInput[scene3_selectIndex][i], style);
        selectBoxText.position.set(edge - 5, 20.5);
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
    for (let i = 0; i < 17; i++) {

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
    scene3_ENDPic.position.set(0, 0);
    scene3_ENDPic.position.set(screenWidth / 2 - scene3_ENDPic.width / 2, screenHeight / 2 - scene3_ENDPic.height / 2 - 5);
    scene3_endBoard.addChild(scene3_ENDPic);

    //R=133 G=95 B=55
    //855f37
    //89623b

    //padding可以處理字體顯示位置不正確的問題
    let style = new PIXI.TextStyle({
      fontFamily: "pixelSilver",
      fontSize: 80,
      fill: "#89623b",
      fontWeight: 'normal',
      stroke: '#89623b',
      strokeThickness: 0.2,
      letterSpacing: 8,
      align: "center",
      padding: 10,
      lineHeight: 80
    });

    let dialogBoxText = new PIXI.Text("1", style);
    scene3_endBoard.addChild(dialogBoxText);
    dialogBoxText.zIndex = 21;
    dialogBoxText.position.set(screenWidth / 2 - dialogBoxText.width / 2, screenHeight / 2 - dialogBoxText.height / 2 - 115);
    dialogBoxText.scale.set(0.5, 0.5);

    scene3_ENDPic.text = dialogBoxText;

    scene3_ENDPic.interactive = true;
    scene3_ENDPic.buttonMode = true;


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
      scene3_ScenePic0.zIndex = 2;
      scene3_ScenePic0.scale.set(globalImageScale - 0.12, globalImageScale - 0.12);
      scene3_ScenePic0.position.set(screenWidth / 2 - scene3_ScenePic0.width / 2, screenHeight / 2 - scene3_ScenePic0.height / 2 - 5);
      let scene3_ScenePic1 = new PIXI.Sprite(PIXI.Texture.from("Hotel01"));
      scene3_ScenePic1.zIndex = 1;
      scene3_ScenePic1.scale.set(globalImageScale - 0.12, globalImageScale - 0.12);
      scene3_ScenePic1.position.set(screenWidth / 2 - scene3_ScenePic1.width / 2, screenHeight / 2 - scene3_ScenePic1.height / 2 - 5);
      let scene3_ScenePic2 = new PIXI.Sprite(PIXI.Texture.from("Hotel02"));
      scene3_ScenePic2.zIndex = 0;
      scene3_ScenePic2.scale.set(globalImageScale - 0.12, globalImageScale - 0.12);
      scene3_ScenePic2.position.set(screenWidth / 2 - scene3_ScenePic2.width / 2, screenHeight / 2 - scene3_ScenePic2.height / 2 - 5);
      sceneA.addChild(scene3_ScenePic2)
      sceneA.addChild(scene3_ScenePic1)
      sceneA.addChild(scene3_ScenePic0)

      let P0 = new PIXI.Sprite(PIXI.Texture.from("characterFull3"));
      P0.zIndex = 1;
      P0.jumpSpeed = 0;
      P0.scale.set(0.24, 0.24);
      P0.position.set(-45, 36);
      let P1 = new PIXI.Sprite(PIXI.Texture.from("policeSmall"));
      P1.zIndex = 1;
      P1.jumpSpeed = 0;
      P1.scale.set(-(globalImageScale + 1), globalImageScale + 1);
      P1.position.set(835, 48);
      // console.log(P0.width);
      // console.log(P1.width);

      sceneA.addChild(P0)
      sceneA.addChild(P1)







      sceneA.char = [];
      sceneA.char.push(P0);
      sceneA.char.push(P1);
      P0.jump = false;
      P1.jump = false;
      P0.initY = P0.position.y;
      P1.initY = P1.position.y;

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

      scene3_sceneBoard.addChild(sceneA);
      scene3_sceneBoard.sortableChildren = true;
      sceneA.addChild(scene3_ScenePic2)
      sceneA.addChild(scene3_ScenePic1)
      //sceneA.addChild(scene3_ScenePic0)

      let P1 = new PIXI.Sprite(PIXI.Texture.from("SPPeople00"));
      P1.scale.set(globalImageScale, globalImageScale);
      P1.x = 68; P1.y = 120;
      sceneA.addChild(P1);

      let P2 = new PIXI.Sprite(PIXI.Texture.from("SPPeople00"));
      P2.scale.set(globalImageScale, globalImageScale);
      P2.x = 170; P2.y = 120;
      sceneA.addChild(P2);

      let P3 = new PIXI.Sprite(PIXI.Texture.from("SPPeople00"));
      P3.scale.set(globalImageScale, globalImageScale);
      P3.x = 380; P3.y = 120;
      sceneA.addChild(P3);

      sceneA.char = [];
      sceneA.char.push(P1);
      sceneA.char.push(P2);
      sceneA.char.push(P3);

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
          //End2.scale.set(globalImageScale, globalImageScale);
          End2.width = screenWidth;
          End2.height = screenHeight;
          uIBoard.addChild(End2);

          let End1 = new PIXI.Sprite(PIXI.Texture.from("End1"));
          //End2.scale.set(globalImageScale, globalImageScale);
          End1.width = screenWidth;
          End1.height = screenHeight;
          uIBoard.addChild(End1);

          scene5_End0 = new PIXI.Sprite(PIXI.Texture.from("End0"));
          //End2.scale.set(globalImageScale, globalImageScale);
          scene5_End0.width = screenWidth;
          scene5_End0.height = screenHeight;
          uIBoard.addChild(scene5_End0);

        }

        //稱號
        scene5_CharTitleList = [];
        for (let i = 0; i < 9; i++) {

          let scene5_CharTitle = new PIXI.Sprite(PIXI.Texture.from("CharTitle" + i));

          scene5_CharTitle.visible = false;

          scene5_CharTitle.scale.set(0.2, 0.2);

          scene5_CharTitle.x = 1;
          scene5_CharTitleList.push(scene5_CharTitle);
          scene5_CharTitle.x = 277;
          scene5_CharTitle.y = 99.5;

          uIBoard.addChild(scene5_CharTitle);

        }

        //數字
        {
          scene5_N1 = new PIXI.Sprite(PIXI.Texture.from("Number01"));
          scene5_N1.scale.set(0.12, 0.12);
          scene5_N1.x = 380;
          scene5_N1.y = 156.6;
          uIBoard.addChild(scene5_N1);

          scene5_N2 = new PIXI.Sprite(PIXI.Texture.from("Number02"));
          scene5_N2.scale.set(0.12, 0.12);
          scene5_N2.x = 380 + 8;
          scene5_N2.y = 156.6;
          uIBoard.addChild(scene5_N2);

          scene5_N3 = new PIXI.Sprite(PIXI.Texture.from("Number03"));
          scene5_N3.scale.set(0.12, 0.12);
          scene5_N3.x = 380 + 16;
          scene5_N3.y = 156.6;
          uIBoard.addChild(scene5_N3);

          scene5_N4 = new PIXI.Sprite(PIXI.Texture.from("Number10"));
          scene5_N4.scale.set(0.12, 0.12);
          scene5_N4.x = 380 + 24;
          scene5_N4.y = 156.6;
          uIBoard.addChild(scene5_N4);

          scene5_N5 = new PIXI.Sprite(PIXI.Texture.from("Number01"));
          scene5_N5.scale.set(0.12, 0.12);
          scene5_N5.x = 390;
          scene5_N5.y = 174.5;
          uIBoard.addChild(scene5_N5);

          scene5_N6 = new PIXI.Sprite(PIXI.Texture.from("Number02"));
          scene5_N6.scale.set(0.12, 0.12);
          scene5_N6.x = 390 + 8;
          scene5_N6.y = 174.5;
          uIBoard.addChild(scene5_N6);

          scene5_N7 = new PIXI.Sprite(PIXI.Texture.from("Number03"));
          scene5_N7.scale.set(0.12, 0.12);
          scene5_N7.x = 390 + 16;
          scene5_N7.y = 174.5;
          uIBoard.addChild(scene5_N7);

          scene5_N8 = new PIXI.Sprite(PIXI.Texture.from("Number10"));
          scene5_N8.scale.set(0.12, 0.12);
          scene5_N8.x = 390 + 24;
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
      }

      selectBoxes[0].addListener("pointerdown", () => { buttonA(); });
      selectBoxes[1].addListener("pointerdown", () => { buttonB(); });
      selectBoxes[2].addListener("pointerdown", () => { buttonC(); });
      selectBoxes[3].addListener("pointerdown", () => { buttonD(); });
      selectBoxes[4].addListener("pointerdown", () => { buttonE(); });

      function buttonA() {

        PIXI.sound.play('button_click');
        centerComponent.currentStage = 1;

        ResetCenterComponent();

        EndingFadeFunc(scene5, 'theme');
      }

      function buttonB() {
        PIXI.sound.play('button_click');
        window.open('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftncmmm1921.vercel.app%2F&amp;src=sdkpreparse', 'Share tncmmm1921');
      }

      function buttonC() {



      }

      function buttonD() {

      }
      function buttonE() {
        scene3_sceneList[8].visible = true;
      }


    }

    // Scene8
    //元帥畫面(場景)
    {

      let sceneA = new PIXI.Container();
      sceneA.sortableChildren = true;
      scene3_sceneBoard.addChild(sceneA);

      let white = new PIXI.Sprite(PIXI.Texture.from("white"));
      sceneA.addChild(white);
      white.width = screenWidth;
      white.height = screenHeight;
      white.tint = "0x000000";
      white.interactive = true;

      let but0 = new PIXI.Sprite(PIXI.Texture.from("white"));
      sceneA.addChild(but0);
      but0.width = 100;
      but0.height = 50;
      but0.position.set(200, screenHeight - 70);
      but0.tint = "0xFFFFFF";
      but0.interactive = true;
      but0.buttonMode = true;
      but0.addListener("pointerdown", function () { scene3_sceneList[8].visible = false })

      let but1 = new PIXI.Sprite(PIXI.Texture.from("white"));
      but1.width = 100;
      but1.height = 50;
      but1.position.set(screenWidth - 300, screenHeight - 70);
      but1.tint = "0xFF00FF";
      but1.interactive = true;
      but1.buttonMode = true;
      but1.addListener("pointerdown", function () { })
      sceneA.addChild(but1);

      scene5_ghost = new PIXI.Container();
      sceneA.addChild(scene5_ghost);
      let IMAGEA = new PIXI.Sprite(PIXI.Texture.from("Summon00"));
      IMAGEA.scale.set(globalImageScale, globalImageScale);
      IMAGEA.position.set(screenWidth / 2 - IMAGEA.width / 2, 0)
      scene5_ghost.addChild(IMAGEA);

      let IMAGEB = new PIXI.Sprite(PIXI.Texture.from("Summon01"));
      IMAGEB.scale.set(globalImageScale, globalImageScale);
      IMAGEB.position.set(screenWidth / 2 - IMAGEB.width / 2, 0)
      sceneA.addChild(IMAGEB);

      let IMAGEC = new PIXI.Sprite(PIXI.Texture.from("Summon02"));
      IMAGEC.scale.set(globalImageScale * 0.1264, globalImageScale * 0.1264);
      IMAGEC.position.set(screenWidth / 2 - IMAGEC.width / 2, 0)
      sceneA.addChild(IMAGEC);

      for (let i = 0; i < 3; i++) {
        let IMAGET = new PIXI.Sprite(PIXI.Texture.from("SummonTalk0" + i));
        if (i != 0) IMAGET.visible = false;
        IMAGET.scale.set(globalImageScale * 0.2, globalImageScale * 0.2);
        IMAGET.position.set(screenWidth / 2 - IMAGET.width / 2 - 8, -37)
        sceneA.addChild(IMAGET);
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

        sceneA.addChild(scene5_input)
      }

      //padding可以處理字體顯示位置不正確的問題
      let style = new PIXI.TextStyle({
        fontFamily: "pixelSilver",
        fontSize: 36,
        fill: "white",
        letterSpacing: 2,
        padding: 36
      });

      let text = new PIXI.Text("", style);
      text.scale.set(0.5, 0.5);
      text.x = 263; text.y = 320;
      sceneA.addChild(text);

      scene5_input.on('input', keycode => {
        text.text = keycode;

        //console.log('key pressed:', keycode)
      })
      scene5_input.on('focus', function () {
        IMAGEC.visible = false;
        //console.log('focus',)
      })
      scene5_input.on('blur', function () {
        if (text.text == "") IMAGEC.visible = true;
        //console.log('blur',)
      })


      scene3_sceneList.push(sceneA);
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
      metal.scale.set(2, 2);
      metal.position.set(620, 295);

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
    console.log("AA:" + scene3_selectIndex);

    var optionsNumber = scene3_selectTextInput[scene3_selectIndex].length

    for (let i = 0; i < optionsNumber; i++) {

      scene3_selectBoxes[i].visible = true;
      scene3_selectBoxes[i].text.text = scene3_selectTextInput[scene3_selectIndex][i];
      scene3_selectBoxes[i].box.width = 314 + 30;
      scene3_selectBoxes[i].box.x = 343 - 20;
      scene3_selectBoxes[i].text.x =
        scene3_selectBoxes[i].box.x +
        scene3_selectBoxes[i].box.width / 2 -
        (scene3_selectBoxes[i].text.width) / 2 ;
        
      if (optionsNumber == 3)
        scene3_selectBoxes[i].y = 344 + 36 * (i - 1);
      else
        scene3_selectBoxes[i].y = 343 + 22 * (i * 2 - 1);
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

    //更改人物姓名
    scene3_nameBox[0].text.text = name;

    //更改人物姓名的欄位
    scene3_nameBox[0].text.position.set(
      (130 - scene3_nameBox[0].text.width) / 2 - 2.5,
      (45 - scene3_nameBox[0].text.height + 26) / 2);

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
      scene3_plotItemBlockContainer.visible = true;
      scene3_plotItemBlockContainer.metal.visible = true;
    }
    //發書橋段後的對話隱藏旭日章ICON
    else if (charIndex == 5) {
      scene3_plotItemBlockContainer.visible = false;
      scene3_plotItemBlockContainer.metal.visible = false;
    }
    //發書橋段後的對話隱藏旭日章ICON
    else if (charIndex == 6) {
      scene3_dialogContainer.visible = false;
      scene3_charBoard.visible = false;
      scene3_nameBoard.visible = false;
      return;
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

  var dialogBoxText = scene3_ENDPic.text;
  dialogBoxText.text = content;
  let y = screenHeight / 2 - dialogBoxText.height / 2 - 104;
  dialogBoxText.position.set(screenWidth / 2 - dialogBoxText.width / 2, y);

  let counter = 0;
  let counterLimit = 80;
  await app.ticker.remove(fadein);
  await app.ticker.add(fadein);

  function fadein(deltaTime) {

    counter++;

    if (counter <= counterLimit) {

      dialogBoxText.alpha = counter / counterLimit;
      dialogBoxText.position.set(screenWidth / 2 - dialogBoxText.width / 2, y + (+20 * (1 - MoveTrackCompute(counter, counterLimit))));
    }
    else {

      app.ticker.remove(fadein);
    }
  }

}

async function OptionsResult(result) {

  console.log(result);
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

  scene3_ENDPic.on("pointerdown", function () {
    if (scene3_dialogBox.dialogEnd == true) {
      scene3_dialogBox.dialogEnd = false;
      scene3_dialogBox.active = false;
      EndThisScene();
    }
    else if (scene3_dialogBox.active == true) {
      GoToNextDialog_Ending();
    }

  });

  scene3_dialogBox.on("pointerdown", function () {

    PIXI.sound.play('talking_click');

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

      PIXI.sound.play('option_click');
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





//結算畫面
LoadScene5();

async function LoadScene5() {

  if (centerComponent.sceneExist[5] == false) {
    await LoadSetting();
    await SetContainer();
    await SetObject();
    await GameFunction();
  }

  scene5.visible = true;
  StartingFadeFunc(scene5,'theme');
}

//讀取設定
function LoadSetting() {

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

//設定容器
function SetContainer() {

  app.renderer.backgroundColor = 0x30BCED;

  scene5 = new PIXI.Container();
  scene5.scale.set(1);
  scene5.sortableChildren = true;
  app.stage.addChild(scene5);

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

}

function SetObject() {

  currentMode = 1;
  currentIndex = 0;

  createEndBoard();

  // createAchieveBoard();

}


function createEndBoard() {
  resultPaperContainer = new PIXI.Container();
  selectBoxes = [];

  let paperPos = [0, -5];
  let paperScale = [1.15, 1.15];

  //羊皮紙
  {
    /*  var paperInstance = new PIXI.Sprite(PIXI.Texture.from("paper"));
      paperInstance.scale.set(paperScale[0], paperScale[1]);
      paperInstance.position.set(0, 0);
      paperInstance.zIndex = -100 + paperInstance.y;
  
      resultPaperContainer.x = screenWidth/2 - paperInstance.width/2;
      resultPaperContainer.y = paperPos[1];
      resultPaperContainer.paperInstance = paperInstance;
  
      resultBoard.addChild(resultPaperContainer);
      resultPaperContainer.addChild(paperInstance);*/
  }

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

    let End0 = new PIXI.Sprite(PIXI.Texture.from("End0"));
    //End2.scale.set(globalImageScale, globalImageScale);
    End0.width = screenWidth;
    End0.height = screenHeight;
    uIBoard.addChild(End0);

  }

  //padding可以處理字體顯示位置不正確的問題
  let textStyleA = new PIXI.TextStyle({
    fontFamily: "pixelFont",
    fontSize: 26,
    fill: "white",
    stroke: '#000000',
    strokeThickness: 4,
    letterSpacing: 0,
    align: "left",
    padding: 10,
    lineHeight: 36
    //dropShadow: true,
    //dropShadowColor: "#000000",
    //dropShadowBlur: 4,
    //dropShadowAngle: Math.PI / 6,
    //dropShadowDistance: 6,
  });

  //padding可以處理字體顯示位置不正確的問題
  let textStyleB = new PIXI.TextStyle({
    fontFamily: "pixelFont",
    fontSize: 20,
    fill: "white",
    stroke: '#000000',
    strokeThickness: 4,
    letterSpacing: 0,
    align: "left",
    padding: 10,
    lineHeight: 36
    //dropShadow: true,
    //dropShadowColor: "#000000",
    //dropShadowBlur: 4,
    //dropShadowAngle: Math.PI / 6,
    //dropShadowDistance: 6,
  });


  //let paperContentStartPos = [35, 60];
  //let lineGap = 48;

  //內文
  {
    /*
    let name = "台灣島";

    text_name = new PIXI.Text("姓名：" + name, textStyleA);
    resultPaperContainer.addChild(text_name);
    text_name.position.set(paperContentStartPos[0], paperContentStartPos[1]);

    let title = "無力評議員";

    text_title = new PIXI.Text("稱號：" + title, textStyleA);
    resultPaperContainer.addChild(text_title);
    text_title.position.set(paperContentStartPos[0] + 250, paperContentStartPos[1]);

    let diagnosisA = "世界和平的守門人";
    let diagnosisB = "台灣青年良率 - 80%";
    let diagnosisC = "六十三號法維穩率 - 35%";

    text_diagnosisTitle = new PIXI.Text("診斷：", textStyleA);
    resultPaperContainer.addChild(text_diagnosisTitle);
    text_diagnosisTitle.position.set(paperContentStartPos[0], paperContentStartPos[1] + lineGap);

    text_diagnosis = new PIXI.Text(diagnosisA + "\n" + diagnosisB + "\n" + diagnosisC, textStyleA);
    resultPaperContainer.addChild(text_diagnosis);
    text_diagnosis.position.set(paperContentStartPos[0] + text_diagnosisTitle.width - 5, paperContentStartPos[1] + lineGap);

    let prescriptionA = "文化自造夜";
    let prescriptionB = "演台團";
    let prescriptionC = "新文化運動會";

    let prescriptionAmonutA = "適量";
    let prescriptionAmonutB = "適量";
    let prescriptionAmonutC = "適量";

    text_prescriptionTitle = new PIXI.Text("處方：", textStyleA);
    resultPaperContainer.addChild(text_prescriptionTitle);
    text_prescriptionTitle.position.set(paperContentStartPos[0], paperContentStartPos[1] + lineGap * 3.5);

    text_prescription = new PIXI.Text(prescriptionA + "\n" + prescriptionB + "\n" + prescriptionC, textStyleA);
    resultPaperContainer.addChild(text_prescription);
    text_prescription.position.set(paperContentStartPos[0] + text_prescriptionTitle.width - 5, paperContentStartPos[1] + lineGap * 3.5);

    text_prescriptionAmount = new PIXI.Text(prescriptionAmonutA + "\n" + prescriptionAmonutB + "\n" + prescriptionAmonutC, textStyleA);
    resultPaperContainer.addChild(text_prescriptionAmount);
    text_prescriptionAmount.position.set(paperContentStartPos[0] + text_prescriptionTitle.width + text_prescription.width + 30, paperContentStartPos[1] + lineGap * 3.5);

    text_prescriptionTitle = new PIXI.Text("大正十年十月十七日 主義醫師蔣渭水", textStyleB);
    text_prescriptionTitle.style.fontSize = 20;
    resultPaperContainer.addChild(text_prescriptionTitle);
    text_prescriptionTitle.position.set(paperContentStartPos[0] + 170, paperContentStartPos[1] + lineGap * 6 + 10);*/
  }

  //選擇UI
  let selectButtonBoxSize = [120, 50];
  let buttonText = ["再玩一次", "分享遊戲", "文化圖鑑", "瞭解更多","123"]
  {

    let edge = 230;
    let buttonSpace = (screenWidth - edge) / 4 +10;
    for (let i = 0; i < 5; i++) {
      let selectBox = new PIXI.Graphics();
      selectBox.beginFill(0xFFFFFF);
      selectBox.drawRect(0, 0, selectButtonBoxSize[0], selectButtonBoxSize[1]);
      selectBox.x = buttonSpace * i + ( - selectButtonBoxSize[0] + edge) / 2 -24;
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

function createAchieveBoard() {

  //擋住畫面的黑幕
  {
    UIBlock = new PIXI.Graphics();
    UIBlock.beginFill(0x000000).drawRect(0, 0, screenWidth, screenHeight).endFill();
    UIBlock.zIndex = -1;
    achieveBoard.addChild(UIBlock);

    UIBlock.alpha = 0.5;
    UIBlock.visible = true;
    UIBlock.interactive = true;
  }

  //解鎖列表
  {
    achievementPaper = [];

    let paperPos = [screenWidth / 2, 15];
    let paperScale = [1, 1];

    let textStyleA = new PIXI.TextStyle({
      fontFamily: "pixelFont",
      fontSize: 26,
      fill: "white",
      stroke: '#000000',
      strokeThickness: 4,
      letterSpacing: 0,
      align: "left",
      padding: 10,
      lineHeight: 36
      //dropShadow: true,
      //dropShadowColor: "#000000",
      //dropShadowBlur: 4,
      //dropShadowAngle: Math.PI / 6,
      //dropShadowDistance: 6,
    });

    for (let i = 0; i < 5; i++) {
      let paperContainer = new PIXI.Container();

      var paperInstance = new PIXI.Sprite(PIXI.Texture.from("paper"));
      paperInstance.scale.set(paperScale[0], paperScale[1]);
      paperInstance.position.set(0, 0);
      paperInstance.zIndex = -100 + paperInstance.y;

      paperContainer.x = screenWidth / 2 - paperInstance.width / 2 + screenWidth * (i);
      paperContainer.y = paperPos[1];
      paperContainer.paperInstance = paperInstance;

      achieveBoard.addChild(paperContainer);
      paperContainer.addChild(paperInstance);

      achievementPaper.push(paperContainer);

      //文字
      {
        let name = "台灣島";

        text_name = new PIXI.Text("姓名：" + name, textStyleA);
        resultPaperContainer.addChild(text_name);
        text_name.position.set(paperContentStartPos[0], paperContentStartPos[1]);

      }
    }


  }

  //輸入功能
  {
    input = new PIXI.TextInput({
      input: {
        fontSize: '36px',
        padding: '12px',
        width: '500px',
        color: '#26272E'
      },
      box: {
        default: { fill: 0xE8E9F3, rounded: 12, stroke: { color: 0xCBCEE0, width: 3 } },
        focused: { fill: 0xE1E3EE, rounded: 12, stroke: { color: 0xABAFC6, width: 3 } },
        disabled: { fill: 0xDBDBDB, rounded: 12 }
      }
    })

    input.placeholder = 'hello there...'
    input.pivot.x = input.width / 2;
    input.pivot.y = input.height / 2;
    input.x = input.width / 2;
    input.y = input.height / 2 + 100;
    input.visible = false;
    uIBoard.addChild(input)
  }


}

function GameFunction() {

  selectBoxes[0].addListener("pointerdown", () => { buttonA(); });
  selectBoxes[1].addListener("pointerdown", () => { buttonB(); });
  selectBoxes[2].addListener("pointerdown", () => { buttonC(); });
  selectBoxes[3].addListener("pointerdown", () => { buttonD(); });


}

function buttonA() {

  PIXI.sound.play('button_click');
  centerComponent.currentStage = 1;

  EndingFadeFunc(scene5,'theme');
}

function buttonB() {
  PIXI.sound.play('button_click');
  window.open('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftncmmm1921.vercel.app%2F&amp;src=sdkpreparse', 'Share tncmmm1921');
}

function buttonC() {



}

function buttonD() {

}


//放入圖片

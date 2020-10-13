//蓋印章遊戲

LoadScene2();

async function LoadScene2() {

  if (centerComponent.sceneExist[2] == false) {

    centerComponent.sceneExist[2] = true;
    await LoadSetting();
    await SetContainer();
    await SetObject();
    await GameFunction();

  }

  ResetSetting();

}

//讀取設定
function ResetSetting() {

  //重置分數
  scene2_score = 0;
  scene2_totalScore = 0;
  scene2_scoreUI.text.text = scene2_score;
  scene2_scoreUI.position.set(screenWidth - 45 - scene2_scoreUI.text.width - 15, 10);
  scene2_stampBox2.enable = true;

  //重置物件位置
  scene2_movingDistant = 0;
  scene2_movingBoard.x = scene2_movingDistant;

  //scene2_stampBox.visible = false;
  //scene2_stampBox2.visible = false;

  scene2_title.alpha = 1;

  //重置隨機產生書本
  scene2_randomAddItemTimer = 0;

  //重置結束時間
  scene2_stageTimer = 25;
  scene2_countDownTimer = 0;
  scene2_startTimer = 0;


  //重新放入時間函數
  for (let i = scene2_tickerFunc.length; i >= 0; i--) {
    app.ticker.add(scene2_tickerFunc[i]);
  }

  for (let i = scene2_bookGroup.length - 1; i >= 0; i--) {
    RecycleBook(scene2_bookGroup, i);
  }

  for (let i = scene2_markGroup.length - 1; i >= 0; i--) {
    scene2_markGroup[i].parent.removeChild(scene2_markGroup[i]);
    scene2_markGroup[i].destroy({ children: true });
    scene2_markGroup.splice(i, 1);
  }

  for (let i = scene2_platforms.length - 1; i >= 0; i--) {
    scene2_platforms[i].x = scene2_platforms[i].width * i;
  }

  //顯示畫面
  scene2.visible = true;

  StartingFadeFunc(scene2, 'small_game1');

}

//讀取設定
function LoadSetting() {

  //陣列
  scene2_bookGroup = [];
  scene2_prepareBookGroup = [];
  scene2_markGroup = [];
  scene2_tickerFunc = [];
  scene2_platforms = [];

  //物件
  scene2_bottomDetectLine = null;
  scene2_scoreUI = null;
  scene2_stampBox = null;
  scene2_timeUI = null;

  //印記位置
  scene2_markPosX = 235;
  scene2_markPosY = 200;
  //scene2_markDistant = 27.5;

  //分數
  scene2_score = 0;

  //畫面移動
  scene2_movingDistant = 0;
  scene2_boardMoveSpeed = 8;


  //依時間產生書本
  scene2_randomAddItemTimer = 0;
  scene2_randomAddItemTimeLimit = 80;

  //時間倒數
  scene2_stageTimer = 25;
  scene2_countDownTimer = 0;
  scene2_countDownTick = PIXI.settings.TARGET_FPMS * 1000;

}

//設定容器
function SetContainer() {

  app.renderer.backgroundColor = 0x30BCED;

  scene2 = new PIXI.Container();
  scene2.scale.set(1);
  scene2.sortableChildren = true;
  app.stage.addChild(scene2);

  scene2_movingBoard = new PIXI.Container();
  scene2_movingBoard.zIndex = -5;
  scene2_movingBoard.sortableChildren = true;
  scene2.addChild(scene2_movingBoard);

  scene2_uIBoard = new PIXI.Container();
  scene2_uIBoard.zIndex = 100;
  scene2_uIBoard.sortableChildren = true;
  scene2.addChild(scene2_uIBoard);

  scene2_prepareBoard = new PIXI.Container();
  scene2_prepareBoard.zIndex = 100;
  scene2_prepareBoard.sortableChildren = true;
  scene2_prepareBoard.visible = false;
  scene2.addChild(scene2_uIBoard);

}

function SetObject() {

  //底部偵測區
  {
    scene2_bottomDetectLine = new PIXI.Container();
    app.stage.addChild(scene2_bottomDetectLine);

    let bottomDetect = new PIXI.Graphics();
    bottomDetect.lineStyle(0, 0x82cd2e, 1);
    bottomDetect.beginFill(0x700028);
    bottomDetect.drawRect(
      0,
      0,
      10,
      screenHeight);
    bottomDetect.endFill();
    bottomDetect.zIndex = 100;
    bottomDetect.visible = true;
    bottomDetect.position.set(-400, screenHeight / 2);

    scene2_bottomDetectLine.addChild(bottomDetect);
    scene2_bottomDetectLine.detectArea = bottomDetect;

  }

  //書本製作
  {
    for (let i = 0; i < 5; i++) {
      CreateBook();
    }
  }

  //印記製作
  {
    /*let markA = new PIXI.Sprite(PIXI.Texture.from("sight"));
    markA.pivot.set(0.5, 0.5);
    markA.width = 23;
    markA.height = 19;
    markA.position.set(-10 + scene2_markPosX, 60);
    scene2.addChild(markA);

    let markB = new PIXI.Sprite(PIXI.Texture.from("sight"));
    markB.pivot.set(0.5, 0.5);
    markB.width = 23;
    markB.height = 19;
    markB.rotation = PI / 2;
    markB.position.set(160 + scene2_markPosX, 60);
    scene2.addChild(markB);

    let markC = new PIXI.Sprite(PIXI.Texture.from("sight"));
    markC.pivot.set(0.5, 0.5);
    markC.width = 23;
    markC.height = 19;
    markC.rotation = PI;
    markC.position.set(160 + scene2_markPosX, 340);
    scene2.addChild(markC);

    let markD = new PIXI.Sprite(PIXI.Texture.from("sight"));
    markD.pivot.set(0.5, 0.5);
    markD.width = 23;
    markD.height = 19;
    markD.rotation = PI / 2 * 3;
    markD.position.set(-10 + scene2_markPosX, 340);
    scene2.addChild(markD);*/
  }
  {
    let mark = new PIXI.Sprite(PIXI.Texture.from("M110"));
    mark.pivot.set(0.5, 0.5);
    mark.scale.set(globalImageScale, globalImageScale);
    mark.position.set(scene2_markPosX - mark.width / 2, scene2_markPosY - mark.height / 2);
    scene2.addChild(mark);
  }

  //背景
  {
    for (let i = 0; i < 3; i++) {
      let platform = new PIXI.Sprite(PIXI.Texture.from("M109"));
      platform.pivot.set(0.5, 0.5);
      platform.scale.set(globalImageScale, globalImageScale);
      platform.position.set(platform.width * i, 0);
      platform.zIndex = -10;
      scene2_platforms.push(platform);
      scene2_movingBoard.addChild(platform);
    }

    let bottomA = new PIXI.Sprite(PIXI.Texture.from("M108"));
    bottomA.pivot.set(0.5, 0.5);
    bottomA.scale.set(globalImageScale, globalImageScale);
    bottomA.position.set(0 - 40, 0);
    bottomA.zIndex = -8;
    scene2.addChild(bottomA);
    let bottomB = new PIXI.Sprite(PIXI.Texture.from("M108"));
    bottomB.pivot.set(0.5, 0.5);
    bottomB.scale.set(globalImageScale, globalImageScale);
    bottomB.position.set(bottomB.width - 40, 0);
    bottomB.zIndex = -8;
    scene2.addChild(bottomB);

    let light = new PIXI.Sprite(PIXI.Texture.from("M102"));
    light.pivot.set(0.5, 0.5);
    light.scale.set(2.06, globalImageScale);
    light.position.set(0, 0);
    light.zIndex = 10;
    scene2.addChild(light);

    scene2_hand = new PIXI.Sprite(PIXI.Texture.from("M100"));
    scene2_hand.pivot.set(0.5, 0.5);
    scene2_hand.scale.set(globalImageScale, globalImageScale);
    scene2_hand.position.set(0, 0);
    scene2_hand.zIndex = 10;
    scene2.addChild(scene2_hand);

    scene2_title = new PIXI.Sprite(PIXI.Texture.from("M113"));
    scene2_title.zIndex = 20;
    scene2_title.scale.set(globalImageScale, globalImageScale);
    scene2_title.position.set(screenWidth / 2 - scene2_title.width / 2, screenHeight / 2 - scene2_title.height / 2);
    scene2.addChild(scene2_title);


  }

  //UI
  {

    //右上角的蘋果
    {
      scene2_scoreUI = new PIXI.Container();
      scene2_scoreUI.no = 0;
      scene2_scoreUI.zIndex = 2;
      scene2_scoreUI.sortableChildren = true;
      scene2_scoreUI.visible = false;

      var scoreUIInstance = new PIXI.Sprite(PIXI.Texture.from("statue"));
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
      let scoreCounterText = new PIXI.Text(scene2_score, style);

      scoreCounterText.position.set(45, 5);
      scoreCounterText.visible = true;
      scene2_scoreUI.text = scoreCounterText;
      scene2_scoreUI.position.set(screenWidth - 45 - scene2_scoreUI.text.width - 15, 10);

      scene2_uIBoard.addChild(scene2_scoreUI);
      scene2_scoreUI.addChild(scoreUIInstance);
      scene2_scoreUI.addChild(scoreCounterText);
    }

    //右上角的時間
    {
      scene2_timeUI = new PIXI.Container();
      scene2_timeUI.no = 0;
      scene2_timeUI.visible = false;
      scene2_timeUI.activate = true;
      scene2_timeUI.zIndex = 2;
      scene2_timeUI.sortableChildren = true;

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
      let timeText = new PIXI.Text(scene2_stageTimer, style);
      timeText.position.set(45, 52);
      timeText.visible = true;

      scene2_uIBoard.addChild(scene2_timeUI);
      scene2_timeUI.addChild(timeText);

      scene2_timeUI.text = timeText;

      scene2_timeUI.position.set(screenWidth - 45 - scene2_timeUI.text.width - 15, 10);
    }

    let buttonBoxSize = [115, 68];
    let buttonBoxEdgeDistant = [18, 12];

    //點擊UI
    {

      scene2_stampBox = new PIXI.Sprite(PIXI.Texture.from("M111"));
      scene2_stampBox.scale.set(globalImageScale, globalImageScale);
      scene2_stampBox.x = screenWidth - buttonBoxSize[0] - buttonBoxEdgeDistant[0] + 5;
      scene2_stampBox.y = screenHeight - buttonBoxSize[1] - buttonBoxEdgeDistant[1] + 5;
      scene2_uIBoard.addChild(scene2_stampBox);
      scene2_stampBox.zIndex = 0;
      scene2_stampBox.interactive = true;
      scene2_stampBox.buttonMode = true;

      let stampBoxText = new PIXI.Sprite(PIXI.Texture.from("M112"));
      scene2_stampBox.addChild(stampBoxText);
      stampBoxText.scale.set(0.18, 0.18);
      stampBoxText.x = - stampBoxText.width / 2 + scene2_stampBox.width / 4 + 2;
      stampBoxText.y = - stampBoxText.height / 2 + scene2_stampBox.height / 4 + 1;


      scene2_stampBox2 = new PIXI.Sprite(PIXI.Texture.from("M105"));
      scene2_stampBox2.scale.set(globalImageScale, globalImageScale);
      scene2_stampBox2.x = screenWidth - buttonBoxSize[0] - buttonBoxEdgeDistant[0];
      scene2_stampBox2.y = screenHeight - buttonBoxSize[1] - buttonBoxEdgeDistant[1];
      scene2_uIBoard.addChild(scene2_stampBox2);
      scene2_stampBox2.zIndex = 1;

      let stampBoxText2 = new PIXI.Sprite(PIXI.Texture.from("M112"));
      scene2_stampBox2.addChild(stampBoxText2);
      stampBoxText2.scale.set(0.18, 0.18);
      stampBoxText2.x = - stampBoxText2.width / 2 + scene2_stampBox2.width / 4;
      stampBoxText2.y = - stampBoxText2.height / 2 + scene2_stampBox2.height / 4 - 0.5;


    }

  }
}

function CreateBook() {

  let bookContainer = new PIXI.Container();
  bookContainer.zIndex = 1;
  bookContainer.sortableChildren = true;
  bookContainer.position.set(50, 50);
  //bookContainer.position.set(0, 0);

  let bookInstance = new PIXI.Sprite(PIXI.Texture.from("M106"));
  bookInstance.pivot.set(0.5, 0.5);
  bookInstance.scale.set(globalImageScale, globalImageScale);
  bookInstance.position.set(0, 0);
  bookContainer.instance = bookInstance;

  //一定要畫在0,0，再去條位置，用getGlobalPosition才能正確讀取。
  let bookDetectBox = new PIXI.Graphics();
  bookDetectBox.beginFill(0x700028);
  bookDetectBox.drawRect(0, 0, bookInstance.width, bookInstance.height);
  bookDetectBox.endFill();
  bookDetectBox.position.set(bookInstance.position.x, bookInstance.position.y);
  bookDetectBox.zIndex = 2;
  bookDetectBox.visible = false;
  bookContainer.detectArea = bookDetectBox;

  scene2_prepareBoard.addChild(bookContainer);
  bookContainer.addChild(bookInstance);
  bookContainer.addChild(bookDetectBox);

  scene2_prepareBookGroup.push(bookContainer);

  let scene2_bookBorder = new PIXI.Sprite(PIXI.Texture.from("M103"));
  scene2_bookBorder.visible = false;
  scene2_bookBorder.pivot.set(0.5, 0.5);
  scene2_bookBorder.scale.set(globalImageScale, globalImageScale);
  scene2_bookBorder.position.set(0, 0);
  scene2_bookBorder.zIndex = 10;
  bookContainer.addChild(scene2_bookBorder);

  bookContainer.border = scene2_bookBorder;
}

function RecycleBook(itemGroup, i) {

  //console.log("remove");

  //把物件移到池中
  let removeItem = itemGroup[i];
  itemGroup[i].parent.removeChild(itemGroup[i]);
  itemGroup.splice(i, 1);

  scene2_prepareBoard.addChild(removeItem);
  scene2_prepareBookGroup.push(removeItem);

  removeItem.position.set(screenWidth / 2, screenHeight / 2);
  removeItem.border.visible = false;

}

async function ReuseBook() {


  if (scene2_prepareBookGroup.length == 0) {
    //console.log("Empty");
    return;
  }
  // console.log("reuse");
  let reuseItem = scene2_prepareBookGroup[0];

  reuseItem.parent.removeChild(reuseItem);
  scene2_prepareBookGroup.splice(0, 1);

  scene2_movingBoard.addChild(reuseItem);
  scene2_bookGroup.push(reuseItem);

  reuseItem.x = scene2_movingDistant + screenWidth * 1.5;
  reuseItem.y = scene2_markPosY - reuseItem.height / 2;
  reuseItem.enable = true;
  //console.log(reuseItem.position);

  //ItemReset(reuseItem);

}

function createMark(distant = 0) {

  let markContainer = new PIXI.Container();
  markContainer.zIndex = 1;
  markContainer.sortableChildren = true;

  //markContainer.position.set(27.5 , 0); //27.5

  //let markInstance = new PIXI.Sprite(PIXI.Texture.from("bookMark"));
  let markInstance = new PIXI.Sprite(PIXI.Texture.from("M107"));
  markInstance.pivot.set(0.5, 0.5);
  markInstance.scale.set(globalImageScale, globalImageScale);
  //markInstance.width = 150;
  //markInstance.height = 260;
  markContainer.instance = markInstance;

  markContainer.position.set(scene2_markPosX + distant - markInstance.width / 2, scene2_markPosY - markInstance.height / 2);

  //一定要畫在0,0，再去條位置，用getGlobalPosition才能正確讀取。
  let markDetectBox = new PIXI.Graphics();
  markDetectBox.beginFill(0x700028);
  markDetectBox.drawRect(0, 0, markInstance.width, markInstance.height);
  markDetectBox.endFill();
  markDetectBox.position.set(markInstance.position.x, markInstance.position.y);
  markDetectBox.zIndex = 2;
  markDetectBox.visible = false;
  markContainer.detectArea = markDetectBox;

  scene2_movingBoard.addChild(markContainer);
  markContainer.addChild(markInstance);
  markContainer.addChild(markDetectBox);
  scene2_markGroup.push(markContainer);

}

function detectMarkPos() {
  let index = scene2_markGroup.length;
  if (index < 1) return;
  let lastMark = scene2_markGroup[index - 1];
  let lastMarkPos = lastMark.x;

  let highScore = 0;
  scene2_totalScore += 10;

  let perfectHit = false;
  var targetBook = -1;

  for (let i = 0; i < scene2_bookGroup.length; i++) {

    if (scene2_bookGroup[i].enable == false) continue;

    let bookPos = scene2_bookGroup[i].x;
    let thisScore = 0;
    //let dis = lastMarkPos - bookPos - scene2_markDistant;
    let dis = lastMarkPos - bookPos - scene2_bookGroup[i].width / 2 + scene2_markGroup[index - 1].width / 2;

    if (dis < 0) dis *= -1;

    if (dis < 15) { thisScore = 10; perfectHit = true; PIXI.sound.play('stamp_good'); }
    else if (dis < 35) { thisScore = 7; }
    else if (dis < 60) { thisScore = 4; }
    else if (dis < 80) { thisScore = 0; }

    if (highScore < thisScore) {
      highScore = thisScore;
      targetBook = i;
      console.log("SS");
    }
  }

  addScore(highScore);

  if (targetBook != -1) {
    scene2_bookGroup[targetBook].enable = false;

    if (perfectHit) {
      scene2_bookGroup[targetBook].border.texture = PIXI.Texture.from("M104");
      scene2_bookGroup[targetBook].border.visible = true;

      let shineTimer = 0;
      app.ticker.add(function BookShine(deltaTime) {

        if (scene2_bookGroup[targetBook] === undefined) {
          app.ticker.remove(BookShine);
        }
        else {
          shineTimer++;

          if (shineTimer == 6) {
            scene2_bookGroup[targetBook].border.texture = PIXI.Texture.from("M103");
          }
          else if (shineTimer == 12) {
            scene2_bookGroup[targetBook].border.texture = PIXI.Texture.from("M104");
          }
          else if (shineTimer == 18) {
            scene2_bookGroup[targetBook].border.texture = PIXI.Texture.from("M103");
          }
          else if (shineTimer > 24) {
            scene2_bookGroup[targetBook].border.visible = false;
            app.ticker.remove(BookShine);
          }
        }

      });
    }
  }



}

function addScore(delta) {
  scene2_score += delta;
  if (scene2_score < 0) scene2_score = 0;
  scene2_scoreUI.text.text = scene2_score;
  scene2_scoreUI.position.set(screenWidth - 45 - scene2_scoreUI.text.width - 15, 10);
}

function GameFunction() {



  //時間相關
  {
    //面板移動
    scene2_tickerFunc.push(BoardMove);
    function BoardMove(deltaTime) {

      scene2_movingDistant += scene2_boardMoveSpeed * 0.8;
      scene2_movingBoard.x = -scene2_movingDistant;
    }

    //底部碰撞相關
    scene2_tickerFunc.push(BottomDetect);
    function BottomDetect(deltaTime) {

      //書本回收
      for (let i = scene2_bookGroup.length - 1; i >= 0; i--) {
        if (scene2_bookGroup[i].x + (scene2_movingDistant * -1) <= -scene2_bookGroup[i].width * 1.5) {
          RecycleBook(scene2_bookGroup, i);
          //console.log("Book Recyle");
        }
      }

      //印記摧毀
      for (let i = scene2_markGroup.length - 1; i >= 0; i--) {
        if (scene2_markGroup[i].x + (scene2_movingDistant * -1) <= -scene2_markGroup[i].width * 1.5) {
          //刪除物件功能
          {
            scene2_markGroup[i].parent.removeChild(scene2_markGroup[i]);
            scene2_markGroup[i].destroy({ children: true });
            scene2_markGroup.splice(i, 1);
            //console.log("Mark Recyle");
          }
        }

      }

      for (let i = scene2_platforms.length - 1; i >= 0; i--) {
        if (scene2_platforms[i].x + (scene2_movingDistant * -1) <= -scene2_platforms[i].width * 1.5) {

          //把平台移動到後面
          {
            scene2_platforms[i].x += scene2_platforms[i].width * 3;
          }
        }

      }

    }

    //隨機產生書本
    scene2_tickerFunc.push(RandomAddBook);
    function RandomAddBook(deltaTime) {

      scene2_randomAddItemTimer += 1;
      if (scene2_randomAddItemTimer >= scene2_randomAddItemTimeLimit) {
        if (Math.floor(Math.random() * 10) == 0) {
          ReuseBook();
          scene2_randomAddItemTimer = 0;
        }
      }
    }

    //時間倒數
    scene2_tickerFunc.push(TimerCountDown);
    function TimerCountDown(deltaTime) {

      if (scene2_stageTimer > 0) {
        scene2_countDownTimer += 1;
        if (scene2_countDownTimer > scene2_countDownTick) {
          scene2_countDownTimer = 0;
          scene2_stageTimer -= 1;
          scene2_timeUI.text.text = scene2_stageTimer;
        }
      }
      else if (scene2_stageTimer == 0) {
        scene2_stageTimer -= 1;
        console.log("GAME OVER");
        EndThisScene();
      }

      if (scene2_hand.timer != -1) {
        scene2_hand.timer++;
        if (scene2_hand.timer == 8) {
          PointerUp();
        }
      }
    }

    scene2_tickerFunc.push(TitleShowUp);
    function TitleShowUp(deltaTime) {
      scene2_startTimer++;

      if (scene2_startTimer <= 20) {
        scene2_title.scale.set(((1 - scene2_startTimer / 20) * 2 + 1) * globalImageScale, ((1 - scene2_startTimer / 20) * 2 + 1) * globalImageScale);
        scene2_title.position.set(screenWidth / 2 - scene2_title.width / 2, screenHeight / 2 - scene2_title.height / 2)

      }
      else if (scene2_startTimer <= 60) {
      }
      else if (scene2_startTimer <= 100) {
        scene2_title.alpha = (1 - (scene2_startTimer - 60) / 40);
      }
      else {
        scene2_stampBox.visible = true;
        scene2_stampBox2.visible = true;

        app.ticker.remove(TitleShowUp);
      }

    }
  }

  //按鈕相關
  {
    scene2_stampBox.addListener("pointerdown", function () {

      scene2_stampBox2.visible = 0;
      scene2_hand.texture = PIXI.Texture.from("M101");
      scene2_hand.timer = 0;

      PIXI.sound.play('stamp');

      createMark(scene2_movingDistant);
      detectMarkPos();
    });

    //在按鈕上放開和在按鈕外放開
    //scene2_stampBox.on('pointerup', PointerUp);
    //scene2_stampBox.on('pointerupoutside', PointerUp);

    function PointerUp() {
      scene2_stampBox2.visible = 1;
      scene2_hand.texture = PIXI.Texture.from("M100");
      scene2_hand.timer = -1;
    }
  }


}

async function EndThisScene() {

  for (let i = scene2_tickerFunc.length - 1; i >= 0; i--) {
    app.ticker.remove(scene2_tickerFunc[i]);
  }

  let rate = scene2_score / scene2_totalScore;
  console.log(rate);

  centerComponent.G1Rate  = rate;
  
  if (rate > 0.6) {
    centerComponent.stageResult = 1;
  }
  else {
    centerComponent.stageResult = 0;
  }

  EndingFadeFunc(scene2, 'small_game1');
}

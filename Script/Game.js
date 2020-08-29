//slimeInstance.position.y = 50

//loadScript("Script/SetScene.js");

tick = 0;
movingDistant = 0;
//史萊姆移動
{
  slimeMoveSpeed = 3;
  slimeInitY = slime.position.y;
  slimeJumpInitSpeed = 14;
  slimeJumpSpeed = 0;
  slimeGravity = 0.8;
  slimeJumping = false;


  app.ticker.add(function slimeMove(deltaTime) {

    tick += 1;
    /*  slime.x += slimeMoveSpeed * deltaTime;

      if (tick == 200) {
        tick = 0;
        slimeInstance.scale.x *= -1;
        slimeMoveSpeed *= -1;
      }*/
    movingDistant -= 5;
    movingBoard.x = movingDistant;
  });
}

//史萊姆跳躍
{


  function SlimeJump() {
    if (slimeJumping) return;
    else slimeJumping = true;

    slimeJumpSpeed = slimeJumpInitSpeed;
    app.ticker.add(function SlimeJumpTicker(deltaTime) {

      slime.position.y -= slimeJumpSpeed;
      slimeJumpSpeed -= slimeGravity;

      if (slime.position.y > slimeInitY) {
        slime.position.y = slimeInitY;
        slimeJumping = false;
        app.ticker.remove(SlimeJumpTicker);
      }
    });
  }
}

//史萊姆選擇
{


  function SlimeSelect() {
    if (slime.canSelect == false) return;

    statue.activate = false;
    slime.canSelect = false;

    addExp();
  }
}

//按鈕相關
{
  clickBox.addListener("pointerdown", function() {
    SlimeJump();
  });

  selectBox.addListener("pointerdown", function() {
    SlimeSelect();
  });

}

//史萊姆碰觸相關
{
  appleTimer = 0;
  appleCounter = 0;

  app.ticker.add(function eatApple(deltaTime) {

    //撿取蘋果
    if (appleGroup[0].activate && hitTestRectangle(slime.detectArea, appleGroup[0].detectArea)) {
      appleGroup[0].activate = false;
      appleGroup[0].appleInstance.texture = appleTextures[0];

      appleCounter += 1;
      addExp();

      appleCounterText.text = appleCounter;

      appleUI.position.set(screenWidth - 45 - appleUI.text.width - 15, 10);

      appleCounterText.style.fontFamily = "pixelFont";


      appleTimer = 0;
      app.ticker.add(function waitForAppleReset(deltaTime) {
        appleTimer += 1;
        if (appleTimer == 80) {
          appleReset(0);
        } else if (appleTimer == 120) {
          appleGroup[0].activate = true;
          app.ticker.remove(waitForAppleReset);
        }
      })
    }

    //確認可否選擇
    if (statue.activate && hitTestRectangle(slime.detectArea, statue.detectArea)) {
      slime.canSelect = true;
    } else {
      slime.canSelect = false;
    }

  });

  function appleReset(no) {
    //appleGroup[0].position.set(100 + 110 * Math.floor(Math.random() * 6) + 40 * Math.random(), 200 + 40 * Math.floor(Math.random() * 3));
    appleGroup[0].appleInstance.texture = appleTextures[3];
  }

  function addExp() {

    energy += 10;
    energyBar.width = energy;
  }
}

//底部碰撞相關
{

  app.ticker.add(function bottomDetect(deltaTime) {

    for (var i = 0; i < grassGroup.length; i++) {
      //console.log("touch");
      if (hitTestRectangle(bottomDetectLine.detectArea, grassGroup[i].detectArea)) {
        grassGroup[i].x += grassGroup.length * grassGroup[i].Instance.width;
      }
    }

    for (var i = 0; i < treeGroup.length; i++) {
      if (hitTestRectangle(bottomDetectLine.detectArea, treeGroup[i].detectArea)) {
        treeGroup[i].x += screenWidth * 1.5;
        treeGroup[i].y = Math.random() * 60 + 70;
        treeGroup[i].zIndex = -100 + treeGroup[i].y;
      }
    }
    if (hitTestRectangle(bottomDetectLine.detectArea, appleGroup[0].detectArea)) {
      appleGroup[0].x += screenWidth * 1.5;
      appleGroup[0].y = 230 + 40 * Math.floor(Math.random() * 3);

    }

    if (hitTestRectangle(bottomDetectLine.detectArea, statue.detectArea)) {
      statue.x += screenWidth * 1.5;
      statue.activate = true;
    }


  });
}

// 鍵盤操作相關
{
  let key_Q = keyboard(81);
  key_Q.press = SlimeJump;

  let key_W = keyboard(87);
  key_W.press = () => {
    app.ticker.speed = 0;
  };

  let key_E = keyboard(69);
  key_E.press = () => {
    app.ticker.start()
  };
}

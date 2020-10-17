

async function CreateCenterComponent() {


  //過場畫面
  {
    app.stage.sortableChildren = true;
    let fadeUI = new PIXI.Container();
    fadeUI.no = 0;
    fadeUI.activate = true;
    fadeUI.zIndex = 100;
    fadeUI.position.set(screenWidth + screenHeight, 0);
    fadeUI.sortableChildren = true;

    let fadeUIInstance = new PIXI.Sprite.from("./Resource/Fade.png");
    fadeUIInstance.pivot.set(fadeUIInstance.width / 2, fadeUIInstance.height / 2);
    fadeUIInstance.width = screenHeight;
    fadeUIInstance.height = screenHeight * 2;
    fadeUIInstance.position.set(0, screenHeight / 2);
    fadeUIInstance.tint = 0x000000;
    fadeUIInstance.rotation = 90 * (Math.PI / 180);

    fadeUIInstance.interactive = true;
    fadeUIInstance.buttonMode = true;

    let blackUIInstance = new PIXI.Sprite.from("./Resource/White.png");
    blackUIInstance.pivot.set(blackUIInstance.width / 2, blackUIInstance.height / 2);
    blackUIInstance.width = screenWidth;
    blackUIInstance.height = screenHeight;
    blackUIInstance.position.set(0 - (screenHeight + screenWidth / 2), screenHeight / 2);
    blackUIInstance.tint = 0x000000;

    blackUIInstance.interactive = true;
    blackUIInstance.buttonMode = true;

    //console.log(  blackUIInstance.position);

    let fadeUIInstance2 = new PIXI.Sprite.from("./Resource/Fade.png");
    fadeUIInstance2.pivot.set(fadeUIInstance2.width / 2, fadeUIInstance2.height / 2);
    fadeUIInstance2.width = screenHeight;
    fadeUIInstance2.height = screenHeight * 2;
    fadeUIInstance2.position.set(0 - (screenHeight + screenWidth / 2) * 2, screenHeight / 2);
    fadeUIInstance2.tint = 0x000000;
    fadeUIInstance2.rotation = -90 * (Math.PI / 180);

    fadeUIInstance2.interactive = true;
    fadeUIInstance2.buttonMode = true;

    app.stage.addChild(fadeUI);
    fadeUI.addChild(fadeUIInstance);
    fadeUI.addChild(blackUIInstance);
    fadeUI.addChild(fadeUIInstance2);

    centerComponent.fadeUI = fadeUI;
  }

  //設置開始的位置測試用
  //centerComponent.stageResult = 1;
  //centerComponent.currentStage = 14;

  centerComponent.fadeFrame = 20;


}

function EndingFadeFunc(scene, audio) {
  //
  centerComponent.currentScene = scene;

  centerComponent.currentAudio = audio;

  centerComponent.fadeTimer = centerComponent.fadeFrame;
  centerComponent.fadeUI.x = -(screenHeight);
  app.ticker.add(EndingFade);
}
function StartingFadeFunc(scene, audio) {

  centerComponent.fadeTimer = centerComponent.fadeFrame + 20;
  centerComponent.currentScene = scene;


  centerComponent.currentAudio = audio;


  if (centerComponent.currentAudio != null) {

    centerComponent.AudioVolume = 0;
    PIXI.sound.volumeAll = centerComponent.AudioVolume * centerComponent.playAudio;
    PIXI.sound.play(centerComponent.currentAudio, { loop: true });

  }


  app.ticker.add(StartingFade);
}
function EndingFade(deltaTime) {

  centerComponent.fadeTimer -= 1;

  centerComponent.fadeUI.x += (screenWidth + screenHeight * 2) / centerComponent.fadeFrame;

  if (centerComponent.currentAudio != null) {

    centerComponent.AudioVolume = centerComponent.fadeTimer / centerComponent.fadeFrame;
    PIXI.sound.volumeAll = centerComponent.AudioVolume * centerComponent.playAudio;

  }

  if (centerComponent.fadeTimer == 0) {

    app.ticker.remove(EndingFade);

    if (centerComponent.currentAudio != null) {

      centerComponent.AudioVolume = 0;
      PIXI.sound.volumeAll = centerComponent.AudioVolume * centerComponent.playAudio;
      PIXI.sound.stop(centerComponent.currentAudio);
    }

    if (centerComponent.currentScene != null) centerComponent.currentScene.visible = false;
    GoToNextScene();
  }
}
function StartingFade(deltaTime) {

  centerComponent.fadeTimer -= 1;

  if (centerComponent.fadeTimer <= centerComponent.fadeFrame) {
    centerComponent.fadeUI.x += (screenWidth + screenHeight * 2) / centerComponent.fadeFrame;

    if (centerComponent.currentAudio != null) {

      centerComponent.AudioVolume = (1 - centerComponent.fadeTimer / (centerComponent.fadeFrame));
      PIXI.sound.volumeAll = centerComponent.AudioVolume * centerComponent.playAudio;
    }
  }

  if (centerComponent.fadeTimer == 0) {

    centerComponent.fadeUI.x = -(screenHeight);
    app.ticker.remove(StartingFade);

  }
}

async function GoToNextScene() {

  //console.log(centerComponent.currentStage);

  await centerComponent.currentStage++;

  //centerComponent.fadeUI.visible = false;
  centerComponent.currentStage = 16;
  //loadScript("Script/SetScene3.js");
  //return;

  switch (centerComponent.currentStage) {
    case 1:
    case 14:
      //loadScript("Script/SetScene0.js");
      GoToNextScene();
      break;
    case 2:
    case 3:
    case 5:
    case 7:
    case 9:
    case 11:
    case 13:
    case 15:
    case 16:
      loadScript("Script/SetScene3.js");
      break;
    case 4:
    case 8:
    case 12:
      loadScript("Script/SetScene1.js");
      break;
    case 6:
      loadScript("Script/SetScene2.js");
      break;
    case 10:
      loadScript("Script/SetScene4.js");
      break;

    default:
      console.log("END");
  }
}

function ResetCenterComponent() {


  centerComponent.G1Rate = 0.6;
  centerComponent.rate = 30 / 90;




}


// ALT+SHIFT+F 全部整齊化
// CTRL+K CTRL+0 全部折疊

//LOAD
//影片     --> 1  --> SCENE0  <-完成
//對話1    --> 2  --> SCENE3  <-完成
//跑步1    --> 3  --> SCENE1  <-完成
//對話2    --> 4  --> SCENE3
//台灣青年 --> 5  --> SCENE2
//對話3    --> 6  --> SCENE3
//跑步2    --> 7  --> SCENE1
//對話4    --> 8  --> SCENE3
//反對集會 --> 9  --> SCENE4
//對話5    --> 10 --> SCENE3
//跑步3          --> 11 --> SCENE1
//對話6(結尾劇情) --> 12 --> SCENE3
//評分畫面  --> 13 --> SCENE5
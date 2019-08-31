let button1, button2, button3;
let rectWidth;

let counter = 4; // so that when the restart happens, resets to 0 via the restart function.
let uiInterrupt = 0;

let hexColours = ["#000000", "#444444", "#888888", "#a1a1a1", "#c2c2c2", "#ffffff"]

let leafCount = 0;

function writeTextUI() {

  textSize(longEdge / 50);
  fill(0);
  noStroke();

  button1 = createButton('Save');
  button1.class('save');
  button1.mousePressed(saveImg);

  button2 = createButton('New Drawing');
  button2.class('restart');
  button2.mousePressed(restartTimeout);

  if (width > height) {
    rectWidth = height / 6;
    button1.position(rectWidth / 2, windowHeight - lmax * 12);
    button2.position(rectWidth / 2, windowHeight - lmax * 4);
  } else if (width <= height) {
    rectWidth = width / 6;
    button1.position(windowWidth - (28 * lmax) - (lmax * 1.5), windowHeight - rectWidth / 2 - (4 * lmax));
    button2.position(windowWidth - (18 * lmax) - (lmax * 1.5), windowHeight - rectWidth / 2 - (4 * lmax));
  }
}

function writeStageUI() {

  textSize(longEdge / 50);
  fill(0);
  noStroke();

  button3 = createButton('New leaf');
  button3.class('restart');
  button3.mousePressed(leafChooser);

  if (width > height) {
    rectWidth = height / 6;
    button3.position(rectWidth / 2, windowHeight - lmax * 8);

  } else if (width <= height) {
    button3.position(windowWidth - (18 * lmax) - (lmax * 1.5), windowHeight - rectWidth / 2 - (8 * lmax));
  }
}

function leafChooser() {

  leafCounter = 0;
  leafChoice.noTint();

  c2 = color("#FA6122");
  c1 = color("#faa27d");

  leafChoice.rectMode(CORNER);
  leafChoice.fill("#FA6122");
  leafChoice.rect(0, 0, width, height);


  if (width < height) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {

        leafChoice.image(leaf[leafCounter], i * (width / 3), j * (height / 4), shortEdge / 4, shortEdge / 4);
        leafCounter++;
      }
    }
  }

  if (width >= height) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {

        leafChoice.image(leaf[leafCounter], i * (width / 4), j * (height / 3), shortEdge / 4, shortEdge / 4);
        leafCounter++;
      }
    }
  }



  image(leafChoice, 0, 0, width, height);
  setTimeout(interruptor, 100);
}


function interruptor() {
  uiInterrupt= 1;
}


function restartTimeout(){
  setTimeout(restart, 250);
}

function restart() {
  counter++;
  // if (counter === 2) {
  //   writeStageUI();
  // }
  drawState = 1;
  drawLayer.clear();

  if (counter >= 4){
    counter = 0;
  }

  if (counter === 1 || counter === 2 || counter === 3){
  drawLayer.strokeWeight(1);
  drawLayer.stroke(180);
  drawLayer.line(0, height/2, width, height/2);
}


  if (counter === 0 || counter === 2 || counter === 3){
  drawLayer.strokeWeight(1);
  drawLayer.stroke(180);
  drawLayer.line(width/2, 0, width/2, height);
}


  console.log(counter);


}

function saveImg() {
  image(bg, 0, 0, width, height);
  image(drawLayer, 0, 0, width, height);
  save('SymmetryScape' + month() + day() + hour() + second() + '.jpg');
}

function makeSwatch() {

//landscape, UI on the right
  if (width > height) {
    rectWidth = height / 6;
    for (let i = 1; i < 7; i++) {
      uiLayer.fill(color(hexColours[i - 1]));
      uiLayer.noStroke();
      uiLayer.rect(0, (rectWidth * i) - rectWidth, rectWidth / 2, rectWidth * i);
      image(uiLayer, 0, 0);
    }
  }

  // portrait, UI on bottom
  if (width <= height) {
    rectWidth = width / 6;
    for (let i = 1; i < 7; i++) {
      uiLayer.fill(color(hexColours[i - 1]));
      uiLayer.noStroke();
      uiLayer.rect(rectWidth * (i - 1), height - (rectWidth / 2), rectWidth * (i), height);
      image(uiLayer, 0, 0);
    }
  }
}

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

  button3 = createButton('Erase');
  button3.class('deselect');
  button3.mousePressed(erase);

  if (width > height) {
    rectWidth = height / 6;
    button1.position((rectWidth / 2) + (lmax*0.5), windowHeight - lmax * 12.5);
    button2.position((rectWidth / 2) + (lmax*0.5), windowHeight - lmax * 4.5);
    button3.position((rectWidth / 2) + (lmax*0.5), lmax * 0.5);
  } else if (width <= height) {
    rectWidth = width / 6;
    button1.position(windowWidth - (28 * lmax) - (lmax * 1.5), windowHeight - rectWidth / 2 - (4.5 * lmax));
    button2.position(windowWidth - (18 * lmax) - (lmax * 1.5), windowHeight - rectWidth / 2 - (4.5 * lmax));
    button3.position(lmax * 0.5, windowHeight - rectWidth / 2 - (4.5 * lmax));
  }
}

function erase(){
makeSwatch();
brushSelected = 6;
button3.class("select");
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
  lineLayer.clear();

  if (counter >= 4){
    counter = 0;
  }

  if (counter === 1 || counter === 2){
  lineLayer.strokeWeight(1);
  lineLayer.stroke(180);
  lineLayer.line(0, height/2, width, height/2);
}


  if (counter === 0 || counter === 2){
  lineLayer.strokeWeight(1);
  lineLayer.stroke(180);
  lineLayer.line(width/2, 0, width/2, height);
}

if (counter === 3){
lineLayer.strokeWeight(1);
lineLayer.stroke(180);
lineLayer.line(0, 0, width, height);
lineLayer.line(width, 0, 0, height);
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

let saveButton, newButton, button3;
let rectWidth;
let counter = 4; // so that when the restart happens, resets to 0 via the restart function.
let uiInterrupt = 0;

let hexColours = ["#000000", "#444444", "#888888", "#a1a1a1", "#c2c2c2", "#ffffff"]
let colArray = ["#000000", "#444444", "#888888", "#a1a1a1", "#c2c2c2", "#ffffff"]

let fsBool = 0;
let fsButton;

function writeTextUI() {

  textSize(longEdge / 50);
  fill(0);
  noStroke();

  newButton = createButton("Next")
  newButton.class("select");
  newButton.position(width - (15 * vMax), height - (12.5 * vMax));
  newButton.style('font-size', '2.6vmax');
  newButton.style('height', '4.5vmax');
  newButton.mousePressed(restart);

  saveButton = createButton("Save")
  saveButton.class("select");
  saveButton.style('font-size', '2.6vmax');
  saveButton.style('height', '4.5vmax');
  saveButton.position(width - (15 * vMax), height - (6.5 * vMax));
  saveButton.mousePressed(saveImg);




  button = createImg('assets/eraseOn.png');
  button.remove();
  button = createImg('assets/eraseOff.png');
  button.position(0.8 * vMax, height - (14 * vMax));
  button.size(14 * vMax, 14 * vMax);
  button.mousePressed(erase);



    rectWidth = width / 6;




    swatch1 = createButton("");
    swatch1.position(13.5 * vMax, height - (13 * vMax));
    swatch1.size(7 * vMax, 10.5 * vMax);
    swatch1.style("background-color", colArray[0]);
    swatch1.class("box");
    swatch1.mousePressed(function() {
      changeBrush(1)
    });

    swatch2 = createButton("");
    swatch2.position(20.5 * vMax, height - (13 * vMax));
    swatch2.size(7 * vMax, 10.5 * vMax);
    swatch2.style("background-color", colArray[1]);
    swatch2.class("box");
    swatch2.mousePressed(function() {
      changeBrush(2)
    });

    swatch3 = createButton("");
    swatch3.position(27.5 * vMax, height - (13 * vMax));
    swatch3.size(7 * vMax, 10.5 * vMax);
    swatch3.style('background-color', colArray[2]);
    swatch3.class("box");
    swatch3.mousePressed(function() {
      changeBrush(3)
    });

    swatch4 = createButton("");
    swatch4.position(34.5 * vMax, height - (13 * vMax));
    swatch4.size(7 * vMax, 10.5 * vMax);
    swatch4.style("background-color", colArray[3]);
    swatch4.class("box");
    swatch4.mousePressed(function() {
      changeBrush(4)
    });

    swatch5 = createButton("");
    swatch5.position(41.5 * vMax, height - (13 * vMax));
    swatch5.size(7 * vMax, 10.5 * vMax);
    swatch5.style("background-color", colArray[4]);
    swatch5.class("box");
    swatch5.mousePressed(function() {
      changeBrush(5)
    });

    swatch6 = createButton("");
    swatch6.position(48.5 * vMax, height - (13 * vMax));
    swatch6.size(7 * vMax, 10.5 * vMax);
    swatch6.style("background-color", colArray[5]);
    swatch6.class("box");
    swatch6.mousePressed(function() {
      changeBrush(6)
    });

    selColour = createImg('assets/colSelected.png');
    selColour.position(13.5 * vMax, height - (16 * vMax));
    selColour.size(7 * vMax, 16 * vMax);
    selColour.mousePressed();

}

function erase(){

brushSelected = 6;
button.remove();
button = createImg('assets/eraseOn.png');
button.position(0.8 * vMax, height - (14 * vMax));
button.size(14 * vMax, 14 * vMax);
button.mousePressed(erase);
    selColour.remove();


  }


  function changeBrush(brushSel) {

    button.remove();
    button = createImg('assets/eraseOff.png');
    button.position(0.8 * vMax, height - (14 * vMax));
    button.size(14 * vMax, 14 * vMax);
    button.mousePressed(erase);

    brushSelected = brushSel-1;

    selColour.remove();
    selColour = createImg('assets/colSelected.png');
    selColour.position((13.5 + ((brushSel-1) * 7)) * vMax, height - (16 * vMax));
    selColour.size(7 * vMax, 16 * vMax);
    selColour.mousePressed();

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
  lineLayer.stroke(210);
  lineLayer.line(0, height/2, width, height/2);
}


  if (counter === 0 || counter === 2){
  lineLayer.strokeWeight(1);
  lineLayer.stroke(210);
  lineLayer.line(width/2, 0, width/2, height);
}

if (counter === 3){
lineLayer.strokeWeight(1);
lineLayer.stroke(210);
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

let brush = [];
let longEdge, shortEdge, circleRad, vMax, wmax, hmax;
let drawLayer, textLayer, uiLayer, lineLayer, introLayer;
let brushSelected = 0;
let faderStart;
let qtyIntroDots = 50;
let xCo = [];
let yCo = [];
let velo = [];
let brushBool = 0;

function preload() {
  bg = loadImage('assets/paper.jpg');
  audio = loadSound('assets/audio.mp3');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); // Ignores retina displays

  //Visible draw Layer
  drawLayer = createGraphics(width, height);
  drawLayer.colorMode(RGB, 255, 255, 255, 1000);
  drawLayer.strokeCap(PROJECT);

  uiLayer = createGraphics(width, height);
  textLayer = createGraphics(width, height);
  lineLayer = createGraphics(width, height);
  introLayer = createGraphics(width, height);
  drawLayer.colorMode(RGB, 255, 255, 255, 1000);
  introLayer.fill(100, 100, 100, 5);
  introLayer.strokeCap(SQUARE);
  textLayer = createGraphics(windowWidth, windowHeight);
  dimensionCalc();
  slideShow();

  for (i = 0; i < qtyIntroDots; i++) {
    xCo[i] = int(random(0, width));
    yCo[i] = 0;
    velo[i] = (random(1, 5));
  }

}

function dimensionCalc() {
  wmax = width / 100;
  hmax = height / 100;
  if (width > height) {
    longEdge = width;
    shortEdge = height;
    circleRad = shortEdge * 0.45;
    vMax = width / 100;
  } else {
    longEdge = height;
    shortEdge = width;
    vMax = height / 100;
    circleRad = shortEdge * 0.45;
  }
}

function mousePressed() {

if (introState === 3){

  // splash screen to select one of the brushes
  if (uiInterrupt === 1) {


    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (dist((i * (width / 4)) + shortEdge / 4, (j * (height / 3)) + shortEdge / 4, winMouseX, winMouseY) < shortEdge / 4) {
          //brush slected
        }
        brushCounter++;
      }
    }

    // Start of Slideshow
  } else if (introState === 0) {
    audio.loop();
    slide = 1;
    slideShow();
    introState = 1;

  } else if (introState === 3) {

    faderStart = 600;

  }
}
}


function touchEnded() {
  faderStart = 600;

}

function touchMoved() {

  if (introState === 3){
  makeDrawing(winMouseX, winMouseY, pwinMouseX, pwinMouseY);

} else {

// do stuff here
}
  return false;
}



function makeDrawing(_x, _y, pX, pY) {


  drawLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 1, 2)); // for line work
  drawLayer.stroke(0);


  if (counter === 0) {
    brushIt(_x, _y, pX, pY);
    brushIt(width - _x, _y, width - pX, pY);
  } else if (counter === 1) {
    brushIt(_x, _y, pX, pY);
    brushIt(_x, height - _y, pX, height - pY);
  } else if (counter === 2) {
    brushIt(_x, _y, pX, pY);
    brushIt(width - _x, _y, width - pX, pY);
    brushIt(_x, height - _y, pX, height - pY);
    brushIt(width - _x, height - _y, width - pX, height - pY);
  } else if (counter === 3) {
    drawLayer.push();
    brushIt(_x, _y, pX, pY);
    drawLayer.translate(width / 2, height / 2);
    drawLayer.rotate(PI * 0.5);
    drawLayer.translate(-width / 2, -height / 2);
    brushIt(_x, _y, pX, pY);
    drawLayer.translate(width / 2, height / 2);
    drawLayer.rotate(PI * 01);
    drawLayer.translate(-width / 2, -height / 2);
    brushIt(_x, _y, pX, pY);
    drawLayer.translate(width / 2, height / 2);
    drawLayer.rotate(PI * 1.5);
    drawLayer.translate(-width / 2, -height / 2);
    brushIt(_x, _y, pX, pY);
    drawLayer.pop();
  }
}

function brushIt(_x, _y, pX, pY) {

  if (brushSelected === 3) {



    drawLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 2, 3)); // for line work
    drawLayer.stroke(100, 100, 100, 500);

    for (i = 0; i < 10; i++) {
      let randX = randomGaussian(-6, 6);
      let randY = randomGaussian(-6, 6);
      drawLayer.line(_x + randX, _y + randY, pX + randX, pY + randY);
    }



  }

  if (brushSelected === 1) {
    drawLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 3, 5)); // for line work
    drawLayer.stroke(10, 10, 10, 600);
    drawLayer.line(_x, _y, pX, pY);
  }


  if (brushSelected === 0) {
    drawLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 14, 15)); // for line work
    drawLayer.stroke(20, 20, 20, 500);
    drawLayer.line(_x, _y, pX, pY);


  } else if (brushSelected === 4) {



    drawLayer.strokeWeight(abs(random(0, 4)));
    for (i = 0; i < 60; i++) {
      let tempCol = abs(random(200, 255));
      drawLayer.stroke(tempCol, tempCol, tempCol, 1000);
      drawLayer.point(_x + randomGaussian(-10, 10), _y + randomGaussian(-10, 10));
    }
  } else if (brushSelected === 5) {
    drawLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 30, 40)); // for line work
    drawLayer.stroke(255, 255, 255, 350);
    drawLayer.line(_x, _y, pX, pY);



  } else if (brushSelected === 2) {
    drawLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 50, 60)); // for line work

    if (faderStart <= 0) {
      brushBool = 0;
    }

    if (faderStart >= 1000) {
      brushBool = 1;
    }

    if (brushBool === 0) {
      drawLayer.stroke(100, 100, 100, (faderStart += 20) / 5);
    }

    if (brushBool === 1) {
      drawLayer.stroke(100, 100, 100, (faderStart -= 20) / 5);
    }

    drawLayer.line(_x, _y, pX, pY);




  } else if (brushSelected === 6) {


    drawLayer.loadPixels();
    for (let y = (_y - 60); y < (_y + 60); y++) {
      for (let x = (_x - 60); x < (_x + 60); x++) {
        if (dist(x, y, _x, _y) < 30) {
          drawLayer.set(x, y, color(0, 0));
        }
      }
    }
    drawLayer.updatePixels();



  }


}


function draw() {

  if (introState === 3) {


        image(bg, 0, 0, width, height);
        image(drawLayer, 0, 0, width, height);
        blendMode(BLEND);
        image(lineLayer, 0, 0, width, height);
        image(uiLayer, 0, 0, width, height);



  }



  else {
    blendMode(BLEND);
    background(106, 175, 172, 100);

    if (slide > 0) {
// DO STUFF
    }

    if (slide === 0) {
      textLayer.text(introText[slide], width / 2, (height / 8) * (slide + 2));
    } else {
      textLayer.text(introText[slide - 1], width / 2, (height / 6) * (slide));
    } // this if else statgement needs to be replaced with a better system. The current state tracking is not working
    image(textLayer, 0, 0, width, height);

  }
}

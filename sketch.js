let brush = [];
let longEdge, shortEdge, circleRad, lmax, wmax, hmax;
let drawLayer, textLayer, uiLayer;
let brushSelected = 1;
let faderStart;

function preload() {
  bg = loadImage('assets/paper.jpg');
  audio = loadSound('assets/audio.mp3');
  for (i = 0; i < 6; i++) {
    brush[i] = loadImage('assets/br-' + [i] + '.png')
  }
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

  dimensionCalc();
  slideShow();


}

function dimensionCalc() {
  wmax = width / 100;
  hmax = height / 100;
  if (width > height) {
    longEdge = width;
    shortEdge = height;
    circleRad = shortEdge * 0.45;
    lmax = width / 100;
  } else {
    longEdge = height;
    shortEdge = width;
    lmax = height / 100;
    circleRad = shortEdge * 0.45;
  }
}

function mousePressed() {

  // splash screen to select one of the brushes
  if (uiInterrupt === 1) {



    if (width < height) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
          if (dist((i * (width / 3)) + shortEdge / 4, (j * (height / 4)) + shortEdge / 4, winMouseX, winMouseY) < shortEdge / 4) {}
          //need to include a coutner here
        }
        brushCounter++;
      }
    } else if (width >= height) {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
          if (dist((i * (width / 4)) + shortEdge / 4, (j * (height / 3)) + shortEdge / 4, winMouseX, winMouseY) < shortEdge / 4) {
            //brush slected
          }
          brushCounter++;
        }
      }
    }

    // Start of Slideshow
  } else if (introState === 0) {
    //  audio.loop();
    slide = 1;
    slideShow();
    introState = 1;

  } else if (introState === 3) {

    faderStart = 1000;



    if (height > width) {
      if (mouseY > height - rectWidth / 2) {

        for (i = 0; i < 6; i++) {
          if (mouseX > rectWidth * i && mouseX < rectWidth * (i + 1)) {
            console.log(i);
            brushSelected = i;
            uiLayer.clear();
            makeSwatch();
            uiLayer.strokeWeight(10);
            uiLayer.stroke(250);
            uiLayer.noFill();
            uiLayer.blendMode(DIFFERENCE);
            uiLayer.rect(rectWidth*i, height-(rectWidth/2), rectWidth, height);
            uiLayer.blendMode(BLEND);
          }
        }
      }
    }

    if (height <= width) {

      if (mouseX < rectWidth / 2) {

        for (i = 0; i < 6; i++) {
          if (mouseY > rectWidth * i && mouseY < rectWidth * (i + 1)) {
            console.log(i)
            brushSelected = i;
            makeSwatch();
          }
        }
      }
    }



  }
}


function touchMoved() {


  makeDrawing(winMouseX, winMouseY, pwinMouseX, pwinMouseY);
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

  if (brushSelected === 1) {

    drawLayer.tint(0, 0, 0, 100)
    drawLayer.image(brush[2], _x, _y, 30, 30);

  //   drawLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 6, 7)); // for line work
  //   let temp = abs(random(400,800));
  //   drawLayer.stroke(50, 50, 50, temp);
  //   drawLayer.line(_x, _y, pX, pY);
  //   drawLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 3, 5)); // for line work
  //   drawLayer.stroke(10, 10, 10, temp);
  //   drawLayer.line(_x, _y, pX, pY);
   }

  if (brushSelected === 0) {
    drawLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 4, 5)); // for line work
    drawLayer.stroke(20, 20, 20, 300);
    drawLayer.line(_x, _y, pX, pY);
  }


  if (brushSelected === 2) {
    drawLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 14, 15)); // for line work
    drawLayer.stroke(20, 20, 20, 300);
    drawLayer.line(_x, _y, pX, pY);
  } else if (brushSelected === 3) {


    drawLayer.stroke(abs(random(0,255), 500));
    drawLayer.strokeWeight(abs(random(0, 4)));
    for (i = 0; i < 5; i++) {
      drawLayer.point(_x + randomGaussian(-6, 6), _y + randomGaussian(-6, 6));
    }
  } else if (brushSelected === 4) {
    drawLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 30, 40)); // for line work
    drawLayer.stroke(255, 255, 255, (faderStart--) / 5) + 1000;
    drawLayer.line(_x, _y, pX, pY);
    console.log(faderStart);
  }
  else if (brushSelected === 5) {
    drawLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 30, 40)); // for line work
    drawLayer.stroke(0, 0, 0, (faderStart--) / 10) + 1000;
    drawLayer.line(_x, _y, pX, pY);
    console.log(faderStart);
  }



}

function draw() {

  if (introState === 3) {
    if (uiInterrupt) {
      image(bg, 0, 0, width, height);
    } else {
      image(bg, 0, 0, width, height);
      image(drawLayer, 0, 0, width, height);
      blendMode(BLEND);
      image(uiLayer, 0, 0, width, height);
    }



  }
}

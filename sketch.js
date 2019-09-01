let brush = [];
let longEdge, shortEdge, circleRad, lmax, wmax, hmax;
let drawLayer, textLayer, uiLayer, lineLayer, introLayer;
let brushSelected = 1;
let faderStart;
let qtyIntroDots = 5;
let xCo = [];
let yCo = [];
let velo = [];

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
    lineLayer = createGraphics(width, height);
        introLayer = createGraphics(width, height);
            drawLayer.colorMode(RGB, 255, 255, 255, 1000);
        introLayer.fill(100, 100, 100, 5);
          introLayer.strokeCap(SQUARE);

  dimensionCalc();
  slideShow();

  for (i = 0; i < qtyIntroDots; i++){
    xCo[i] = int(random(0,width));
    yCo[i] = 0;
    velo[i] = (random(1,5));
  }


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
      audio.loop();
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
            uiLayer.rect((rectWidth * i) + 5, (height - (rectWidth / 2)) + 5, rectWidth - 10, height - 10);
            uiLayer.blendMode(BLEND);
            button3.class("deselect");
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
            uiLayer.strokeWeight(10);
            uiLayer.stroke(250);
            uiLayer.noFill();
            uiLayer.blendMode(DIFFERENCE);
            uiLayer.rect(5, (rectWidth * i) + 5, (rectWidth / 2) - 10, rectWidth - 10);
            uiLayer.blendMode(BLEND);
            button3.class("deselect");
          }
        }
      }
    }



  }
}


function touchEnded(){
  faderStart = 1000;

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

  if (brushSelected === 2) {


    // drawLayer.tint(0, 0, 0, 100)
    // drawLayer.imageMode(CENTER);
    // drawLayer.push();
    // drawLayer.translate(_x, _y);
    // drawLayer.rotate(random(0, PI / 10));
    // drawLayer.image(brush[2], 0, 0, 35, 35);
    // drawLayer.pop();

    drawLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 3, 5)); // for line work
    drawLayer.stroke(10, 10, 10, 200);

    for (i = 0; i < 10; i++){
      let randX = randomGaussian(-6,6);
          let randY = randomGaussian(-6,6);
        drawLayer.line(_x+randX, _y+randY, pX+randX, pY+randY);
    }



  }

  if (brushSelected === 0) {
    drawLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 3, 5)); // for line work
    drawLayer.stroke(10, 10, 10, 600);
    drawLayer.line(_x, _y, pX, pY);
  }


  if (brushSelected === 1) {
    drawLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 14, 15)); // for line work
    drawLayer.stroke(20, 20, 20, 500);
    drawLayer.line(_x, _y, pX, pY);
  } else if (brushSelected === 4) {



    drawLayer.strokeWeight(abs(random(0, 4)));
    for (i = 0; i < 60; i++) {
      let tempCol = abs(random(200, 255));
      drawLayer.stroke(tempCol, tempCol, tempCol, 500);
      drawLayer.point(_x + randomGaussian(-10, 10), _y + randomGaussian(-10, 10));
    }
  } else if (brushSelected === 5) {
    drawLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 30, 40)); // for line work
    drawLayer.stroke(255, 255, 255, (faderStart--) / 5) + 100;
    drawLayer.line(_x, _y, pX, pY);



  } else if (brushSelected === 3) {
    drawLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 30, 40)); // for line work
    drawLayer.stroke(0, 0, 0, (faderStart--) / 10) + 100;

    drawLayer.line(_x, _y, pX, pY);




  } else if (brushSelected === 6) {


    drawLayer.loadPixels();
    for (let y = (_y - 60); y < (_y + 60); y ++ ) {
      for (let x = (_x - 60); x < (_x + 60); x ++ ) {
        if (dist(x, y, _x, _y) < 30) {
          drawLayer.set(x, y, color(0, 0));
        }
      }
    }
    drawLayer.updatePixels();



  }


}


function draw() {

  if (introState != 3) {




    image(introLayer, 0, 0, width, height);
        image(textLayer, 0, 0, width, height);


    for (i = 0; i < qtyIntroDots; i++){
       xCo[i] += int(random(-2,5));
       xCo[i] = xCo[i]%(width);
          yCo[i] += int(random(1,velo[i]));
          yCo[i] = yCo[i]%((height/2)+2);


          for (j = 0; j < 5; j++){
            let randX = randomGaussian(-3,3);
            let randY = randomGaussian(-3,3);
            introLayer.fill(150, 150, 150, 150);
            introLayer.ellipse(xCo[i]+randX, yCo[i]+randY, 10, 10);
            introLayer.fill(130, 130, 130, 20);
            introLayer.ellipse(xCo[i]+randX, (height-yCo[i])+randY, 10, 10);
          }
          introLayer.strokeWeight(1);
          introLayer.stroke(120);
          introLayer.line(0,height/2,width,height/2);


    }





  }

  if (introState === 3) {
    if (uiInterrupt) {
      image(bg, 0, 0, width, height);
    } else {
      image(bg, 0, 0, width, height);
      image(drawLayer, 0, 0, width, height);
      blendMode(BLEND);
      image(lineLayer, 0, 0, width, height);
      image(uiLayer, 0, 0, width, height);
    }



  }
}

let introText = ["Touch", "Listen", "Look"];
let slide = 0;
let delayTime = 10000;
let introState = 0;
let noiseScale=2;


function slideShow() {

  if (slide === introText.length) {
    textLayer.clear();
    introState = 3;
    writeTextUI();
    makeSwatch();
    restart();
    counter = 0;
  }

  if (slide < introText.length) {

    textLayer.clear();
    textLayer.noFill();
    textLayer.noTint();

     introLayer.strokeWeight(2);
    for (let y = 0; y < height/2; y++) {
      let inter = map(y, 50, height/2, 0, 1);
      let c = lerpColor(color(0, 0, 0, 1000), color(100, 100, 100, 1000), inter);
      introLayer.stroke(c);

      introLayer.line(0, y, width, y);
     introLayer.line(0, height-y, width , height-y);
    }

    introLayer.noStroke();



    textLayer.fill(color("WHITE"));
    textLayer.textSize(lmax * 6);
    textLayer.textAlign(CENTER, CENTER);
    textLayer.rectMode(CENTER);
    textLayer.text(introText[slide], width / 2, (hmax * 50)-(lmax*2), width * 0.8, height);
    textLayer.push();
    textLayer.translate(width/2, height/2);
    textLayer.scale(1,-1);
    textLayer.fill(color(120,120,120,200));
    textLayer.text(introText[slide], 0, 0-(lmax*2), width * 0.8, height);
    textLayer.pop();


    image(bg, 0, 0, width, height);
    image(textLayer, 0, 0, width, height);

    if (slide > 0) {
      slide++;
      setTimeout(slideShow, delayTime);
    }

  }
}

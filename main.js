let handpose;
let video;
let myCanvas;
let predictions = [];
let isReady = false;

// variables to store finger coordinates
let indexFinger = [];
let middleFinger = [];
let pinkyFinger = [];
let ringFinger = [];
let thumb = [];
let palm = [];
let tipOfIndexFinger = [];
let tipOfThumb = [];
let baseOfPinky = [];

let time = 30;
let score = 0;
let startTime = false;

let timeInterval = setInterval(incrementTime, 1000);

function incrementTime() {
  if (startTime) {
    time -= 1;
  }
  // console.log(time);
  document.getElementById("time").innerHTML = time;

  if (time == 0) {
    clearInterval(timeInterval);
    console.log("Times up");
  }
}

let startTimeBtn = document.getElementById("startBtn");
let stopTimeBtn = document.getElementById("stopBtn");
let splashBtn = document.getElementById("splashBtn");
let mainBtn = document.getElementById("mainBtn");
let startBtn = document.getElementById("startBtn");
let hintBtn = document.getElementById("hintBtn");

startTimeBtn.addEventListener("click", () => {
  startTime = true;
  incrementTime();
});

stopTimeBtn.addEventListener("click", () => {
  myBool = false;
});

splashBtn.addEventListener("click", () => {
  document.getElementById("main-container").innerHTML = testHTML.splashScreen;
  startTime = false;
  time = 30;
  score = 0;

  // myCanvas.hide();
});

mainBtn.addEventListener("click", () => {
  document.getElementById("main-container").innerHTML = testHTML.mainScreen; // replace the page content with new html
  // reinitialise the button element and re add the event listner
  let newHintBtn = document.getElementById("hintBtn");
  newHintBtn.addEventListener("click", () => {
    document.getElementById("sign-img").classList.toggle("hidden");
    if (newHintBtn.innerHTML === "Hide Hint") {
      newHintBtn.innerHTML = "Show Hint";
    } else {
      newHintBtn.innerHTML = "Hide Hint";
    }
  });

  let newStartBtn = document.getElementById("startBtn");
  newStartBtn.addEventListener("click", () => {
    if (isReady) {
      myCanvas.parent("canvas-container");
      myCanvas.show();
      document.getElementById("sign-section").classList.remove("hidden");
      startTime = true;
    }
  });
  document.getElementById("sign-section").classList.add("hidden");
});

startBtn.addEventListener("click", () => {
  if (isReady) {
    myCanvas.parent("canvas-container");
    myCanvas.show();
    document.getElementById("sign-section").classList.remove("hidden");
  }
});

hintBtn.addEventListener("click", () => {
  document.getElementById("sign-img").classList.toggle("hidden");
  if (hintBtn.innerHTML === "Hide Hint") {
    hintBtn.innerHTML = "Show Hint";
  } else {
    hintBtn.innerHTML = "Hide Hint";
  }
});

function setup() {
  myCanvas = createCanvas(552, 480);

  video = createCapture(VIDEO);
  video.size(width, height);

  console.log(myCanvas);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", (results) => {
    predictions = results;
    if (results) {
      // console.log("Got results");
      //   console.log(results);
      if (results[0]) {
        // console.log("Got first object in results array");
        // console.log(results[0]);
        if (results[0].annotations) {
          // console.log("Got annotations");
          // console.log(results[0].annotations);

          // assign finger coordinates data to variables
          indexFinger = results[0].annotations.indexFinger;
          middleFinger = results[0].annotations.middleFinger;
          pinkyFinger = results[0].annotations.pinky;
          ringFinger = results[0].annotations.ringFinger;
          thumb = results[0].annotations.thumb;
          palm = results[0].annotations.palmBase;

          tipOfIndexFinger = results[0].annotations.indexFinger[3];
          tipOfThumb = results[0].annotations.thumb[3];
          baseOfPinky = results[0].annotations.pinky[0];
          // middleFinger = results[0].annotations.middleFinger;
          // pinkyFinger = results[0].annotations.pinky;
          // ringFinger = results[0].annotations.ringFinger;
          // thumb = results[0].annotations.thumb;
          // palm = results[0].annotations.palmBase;

          // output finger data for debugging
          // console.log("Index finger: ", indexFinger);
          // console.log("Middle finger: ", middleFinger);
          // console.log("Pinky finger: ", pinkyFinger);
          // console.log("Ring finger: ", ringFinger);
          // console.log("Thumb: ", thumb);
          // console.log("Palm: ", palm);
          // console.log("Tip of index: ", tipOfIndexFinger);
        } else {
          // console.log("No annotations");
        }
      } else {
        // console.log("No first object in results array");
      }
    } else {
      // console.log("No results");
    }
    // console.log(results[0]);
  });

  // Hide the video element, and just show the canvas
  video.hide();
  myCanvas.hide();
}

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    console.log("Browser tab is hidden");
    video.pause();
    document.title = "Video paused";
  } else {
    console.log("Browser tab is visible");
    video.play();
    document.title = "Video playing";
  }
});

function modelReady() {
  isReady = true;
  console.log("Model ready!");
  console.log(isReady);
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  // drawTipOfIndex();
}

let signNumber = 1;

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      // fill(0, 255, 0);
      // noStroke();
      // ellipse(keypoint[0], keypoint[1], 10, 10);

      const circleOfThumb = tipOfThumb;
      fill(255, 0, 0);
      noStroke();
      ellipse(circleOfThumb[0], circleOfThumb[1], 10, 10);

      const circleOfPinky = baseOfPinky;
      fill(255, 0, 0);
      noStroke();
      ellipse(circleOfPinky[0], circleOfPinky[1], 10, 10);

      // code for the ISL letter B
      let distance = dist(
        baseOfPinky[0],
        baseOfPinky[1],
        tipOfThumb[0],
        tipOfThumb[1]
      );

      document.getElementById("score").innerHTML = score;

      switch (signNumber) {
        case 1:
          // fill(255, 255, 0);
          // noStroke();
          // ellipse(baseOfPinky, baseOfPinky[1], 10, 10);
          // fill(255, 255, 255);
          // noStroke();
          // ellipse(circleOfThumb[0], circleOfThumb[1], 10, 10);
          if (distance < 50) {
            fill(0, 255, 0);
            noStroke();
            ellipse(circleOfPinky[0], circleOfPinky[1], 10, 10);
            fill(0, 255, 0);
            noStroke();
            ellipse(circleOfThumb[0], circleOfThumb[1], 10, 10);
            setTimeout(letterB, 3000);
          }

          break;
        case 2:
          const circleOfIndex = tipOfIndexFinger;
          fill(255, 0, 0);
          noStroke();
          ellipse(circleOfIndex[0], circleOfIndex[1], 10, 10);
          fill(255, 110, 0);
          noStroke();
          ellipse(baseOfPinky, baseOfPinky[1], 10, 10);
          fill(20, 255, 155);
          noStroke();
          ellipse(circleOfThumb[0], circleOfThumb[1], 10, 10);
          if (distance > 50) {
            setTimeout(letterQ, 3000);
          }
          break;
        case 3:
          console.log("Switch ended");
      }
    }
  }
}

function letterB() {
  if (signNumber == 1) {
    console.log("B correct!");
    signNumber++;
    score++;
    document.getElementById("sign-img").src = "/images/Letter Y.png";
    document.getElementById("sign-img").style.width = "80%";
    // document.getElementById("sign-img").style.height = "40%";
    console.log("Sign number: ", signNumber);
  }
}

function letterQ() {
  if (signNumber == 2) {
    console.log("F correct!");
    signNumber++;
    score++;
    console.log("Sign number: ", signNumber);
  }
}

// function drawTipOfIndex() {
//   const circleOfIndex = tipOfIndexFinger;
//   fill(255, 0, 0);
//   noStroke();
//   ellipse(circleOfIndex[0], circleOfIndex[1], 10, 10);
// }

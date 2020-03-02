let intentos = 0;

const images = [
  "../images/image3.jpg",
  "../images/image2.jpg",
  "../images/image1.jpg"
];

async function startGame() {
  try {
    setTimeout(function() {}, 500);
    const pat = document.getElementById("patienceMsg");
    pat.removeAttribute("style");
    let camera = await getVideo();

    let timeOUT = 1000;
    setTimeout(function() {}, timeOUT);

    const image = document.createElement("img");
    image.setAttribute("className", "images");
    setTimeout(function() {
      image.setAttribute("src", images[0]);
      document.getElementById("main").innerHTML = "";
      document.getElementById("main").appendChild(image);
    }, timeOUT + 1000);
    //Change images every second
    setTimeout(function() {
      image.setAttribute("src", images[0]);
      document.getElementById("main").innerHTML = "";
      document.getElementById("main").appendChild(image);
    }, timeOUT + 1000);

    setTimeout(function() {
      image.setAttribute("src", images[1]);
      document.getElementById("main").innerHTML = "";
      document.getElementById("main").appendChild(image);
    }, timeOUT + 2000);

    setTimeout(function() {
      image.setAttribute("src", images[2]);
      document.getElementById("main").innerHTML = "";
      document.getElementById("main").appendChild(image);
    }, timeOUT + 3000);

    //Start the game
    setTimeout(function() {
      //Create set visible
      const div = document.getElementById("root");
      div.removeAttribute("style");
      //eliminar el div
      const removeDiv = document.getElementById("main");
      removeDiv.remove();
      const removePatience = document.getElementById("patienceMsg");
      removePatience.remove();
      const but = document.getElementById("scoreButDiv");
      but.removeAttribute("style");
    }, timeOUT + 5000);
  } catch (error) {
    intentos++;
    console.log(error);
    if (intentos == 1) {
      const alert = document.createElement("div");
      alert.setAttribute("class", "alert alert-danger");
      alert.setAttribute("role", "alert");
      alert.textContent =
        "It's neccesary to enable your camera in order to play the game";
      const removePatience = document.getElementById("patienceMsg");
      removePatience.remove();
      document.getElementById("main").appendChild(alert);
    } else if (intentos == 2) {
      const alert = document.createElement("div");
      alert.setAttribute("class", "alert alert-danger");
      alert.setAttribute("role", "alert");
      alert.textContent = "It's neccesary to refresh the camera";
      document.getElementById("main").appendChild(alert);
    }
  }
}

//getVideo
async function getVideo() {
  this.videoElement = document.querySelector("video");
  this.snapShotCanvas = document.createElement("canvas");
  if (
    navigator.mediaDevices.getUserMedia ||
    navigator.mediaDevices.webkitGetUserMedia
  ) {
    const streamPromise = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    });
    window.stream = streamPromise;
    this.videoElement.srcObject = streamPromise;

    const loadDataPromise = new Promise(resolve => {
      this.videoElement.onloadedmetadata = () => {
        resolve([this.videoElement.videoWidth, this.videoElement.videoHeight]);
      };
    });

    //Show to the user that is loading the coco
    loadImage();

    this.videoElement.setAttribute("ref", "{this.videoElement}");
    const div = document.getElementById("root");
    //Set canvas atributtes and width and Height
    this.snapShotCanvas.width = window.innerWidth;
    this.snapShotCanvas.height = window.innerHeight;
    this.snapShotCanvas.setAttribute("class", "showvideo");
    this.snapShotCanvas.setAttribute("ref", "{this.snapShotCanvas}");
    div.appendChild(this.snapShotCanvas);

    // define a Promise that'll be used to load the model
    const loadlModelPromise = await cocoSsd.load();

    // resolve all the Promises
    Promise.all([loadlModelPromise, streamPromise])
      .then(values => {
        detectFromVideoFrame(values[0], this.videoElement);
      })
      .catch(error => {
        console.error(error);
      });
  }
  return null;
}

//Load Spinner
function loadImage() {
  const div = document.createElement("div");
  div.setAttribute("class", "d-flex justify-content-center");
  const spinner = document.createElement("div");
  spinner.setAttribute("class", "spinner-grow text-primary");
  spinner.setAttribute("role", "status");
  div.appendChild(spinner);
  document.getElementById("main").innerHTML = "";
  document.getElementById("main").appendChild(div);
}

//Detect the video frama
function detectFromVideoFrame(model, video) {
  model.detect(video).then(
    predictions => {
      this.showDetections(predictions);

      requestAnimationFrame(() => {
        this.detectFromVideoFrame(model, video);
      });
    },
    error => {
      console.log("Couldn't start the webcam");
      console.error(error);
    }
  );
}

//Draw the predictions in the canvas tag
function showDetections(predictions) {
  const ctx = this.snapShotCanvas.getContext("2d");
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const font = "24px helvetica";
  ctx.font = font;
  ctx.textBaseline = "top";

  predictions.forEach(prediction => {
    //Get Prediction Class name
    const className = prediction.class;
    /*fetch("/addScore")*/
    const x = prediction.bbox[0];
    const y = prediction.bbox[1];
    const width = prediction.bbox[2];
    const height = prediction.bbox[3];
    // Draw the bounding box.
    ctx.strokeStyle = "#2fff00";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, width, height);
    // Draw the label background.
    ctx.fillStyle = "#2fff00";
    const textWidth = ctx.measureText(className).width;
    const textHeight = parseInt(font, 10);
    // draw top left rectangle
    ctx.fillRect(x, y, textWidth + 10, textHeight + 10);
    /*draw the background of the percentage exactitud
    ctx.fillRect(x, y + height - textHeight, textWidth + 15, textHeight + 10);*/

    // Draw the text last to ensure it's on top.
    ctx.fillStyle = "#000000";
    ctx.fillText(prediction.class, x, y);
    /*    Draw the percentage of the prediction exactitud
    ctx.fillText(prediction.score.toFixed(2), x, y + height - textHeight);*/
  });
}

const renderScores = data => {
  const target = document.getElementById("main");
  data.forEach(user => {
    const div = document.createElement("div");
    div.textContent = `${user.userName} ${user.score}`;
    target.append(div);
  });
};

// const int = setInterval(() => {
//   fetch("./getUsers")
//     .then(res => res.json())
//     .then(renderScores)
//     .catch(() => {
//       const div = document.createElement("div");
//       div.className = "alert alert-danger";
//       div.textContent = "Error downloading data";
//       document.getElementById("main").append(div);
//       clearInterval(int);
//     });
// }, 10000);

//server side rendering
const int = setInterval(() => {
  fetch("./getUsersSS").catch(() => {
    const div = document.createElement("div");
    div.className = "alert alert-danger";
    div.textContent = "Error downloading data";
    document.getElementById("main").append(div);
    clearInterval(int);
  });
}, 10000);

function toScoreBoard() {
  window.location.href = "/getUsersSS";
}

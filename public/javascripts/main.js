let intentos = 0;

const images = [
  "../images/image3.jpg",
  "../images/image2.jpg",
  "../images/image1.jpg",
  "../images/image4John.jpg"
];

async function startGame() {
  try {
    let camera = await getVideo();

    const image = document.createElement("img");
    image.setAttribute("src", images[0]);
    image.setAttribute("className", "images");

    document.getElementById("main").innerHTML = "";

    document.getElementById("main").appendChild(image);

    //Change images every second
    setTimeout(function() {
      const image = document.createElement("img");
      image.setAttribute("src", images[1]);
      image.setAttribute("className", "images");
      document.getElementById("main").innerHTML = "";
      document.getElementById("main").appendChild(image);
    }, 1000);

    setTimeout(function() {
      const image = document.createElement("img");
      image.setAttribute("className", "images");
      image.setAttribute("src", images[2]);
      document.getElementById("main").innerHTML = "";
      document.getElementById("main").appendChild(image);
    }, 2000);

    setTimeout(function() {
      const image = document.createElement("img");
      image.setAttribute("src", images[3]);
      document.getElementById("main").innerHTML = "";
      document.getElementById("main").appendChild(image);
    }, 3000);

    //Start the game
    setTimeout(function() {
      //Create set visible
      const div = document.getElementById("root");
      div.removeAttribute("style");
      //eliminar el div
      const removeDiv = document.getElementById("main");
      removeDiv.remove();
    }, 3000);
  } catch (error) {
    intentos++;
    console.log(error);
    if (intentos == 1) {
      const alert = document.createElement("div");
      alert.setAttribute("class", "alert alert-danger");
      alert.setAttribute("role", "alert");
      alert.textContent = "It's neccesary the camera to play the game";
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
  console.log("VIDEO", this.videoElement.videoWidth);
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

function showDetections(predictions) {
  const ctx = this.snapShotCanvas.getContext("2d");
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const font = "24px helvetica";
  ctx.font = font;
  ctx.textBaseline = "top";

  predictions.forEach(prediction => {
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
    const textWidth = ctx.measureText(prediction.class).width;
    const textHeight = parseInt(font, 10);
    // draw top left rectangle
    ctx.fillRect(x, y, textWidth + 10, textHeight + 10);
    // draw bottom left rectangle
    ctx.fillRect(x, y + height - textHeight, textWidth + 15, textHeight + 10);

    // Draw the text last to ensure it's on top.
    ctx.fillStyle = "#000000";
    ctx.fillText(prediction.class, x, y);
    ctx.fillText(prediction.score.toFixed(2), x, y + height - textHeight);
  });
}

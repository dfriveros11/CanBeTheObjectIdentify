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

    /*  setTimeout(function() {
    const image = document.createElement("img");
    image.setAttribute("src", images[3]);
    document.getElementById("main").innerHTML = "";
    document.getElementById("main").appendChild(image);
  }, 3000);*/

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
        resolve();
      };
    });

    //LOADING COCO
    loadImage();

    // define a Promise that'll be used to load the model
    const loadlModelPromise = await cocoSsd.load();

    // resolve all the Promises
    Promise.all([loadlModelPromise, streamPromise])
      .then(values => {
        this.detectFromVideoFrame(values[0], this.videoElement);
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

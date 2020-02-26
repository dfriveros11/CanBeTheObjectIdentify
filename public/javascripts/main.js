console.log("CARGA");

function startGame() {
  const images = [
    "../images/image3.jpg",
    "../images/image2.jpg",
    "../images/image1.jpg",
    "../images/image4John.jpg"
  ];

  const image = document.createElement("img");
  image.setAttribute("src", images[0]);

  document.getElementById("main").innerHTML = "";

  document.getElementById("main").appendChild(image);

  //Change images every second
  setTimeout(function() {
    const image = document.createElement("img");
    image.setAttribute("src", images[1]);
    document.getElementById("main").innerHTML = "";
    document.getElementById("main").appendChild(image);
  }, 1000);

  setTimeout(function() {
    const image = document.createElement("img");
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
  }, 4000);
}

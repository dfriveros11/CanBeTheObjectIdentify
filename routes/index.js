var express = require("express");
var router = express.Router();

const MongoUtils = require("../db/MongoUtils.js");
const mu = MongoUtils();

/* GET home page. */
router.get("/getTest", function(req, res) {
  console.log("Try to connect to Mongo");

  mu.connect()
    .then(mu.getTest)
    .then(res.json);
});

router.post("/signUp", (req, res) => {
  const user = {
    userName: req.body.nameValue,
    pwd: req.body.pwdValue,
    score: req.body.score
  };
  res;
  mu.users
    .insertUser(user)
    .then(res.redirect("/getUsers"))
    .catch(err => console.log(err));
});

router.get("/getUsers", function(req, res) {
  mu.connect()
    .then(mu.users.find)
    .then(users => {
      res.json(users);
    })
    .catch(err => console.log(err));
});

router.get("/getUsersSS", function(req, res) {
  mu.connect()
    .then(mu.users.find)
    .then(users => {
      res.send(`  
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="author" content="Diego Riveros & Laura Pardo" />
        <meta name="description" content="Prueba TensorFLowjs" />
        <meta
          name="keywords"
          content="HTML,CSS, Bootstrap, JavaScript, TensorFLow.js, MongoDB "
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossorigin="anonymous"
        />

        <link rel="shortcut icon" href="./images/favicon.ico" />
        <title>Can the object be identified by our super AI?</title>
        <link href="/stylesheets/style.css" type="text/css" rel="stylesheet" />
        <!-- Load TensorFlow.js-->
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
        <!-- Load the coco-ssd model. -->
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd"></script>
        <script src="./javascripts/signUpForm.js" type="text/javascript"></script>
      </head>
      <body>
        <div class="container">
        <h1 class="text-center">ScoreBoard<h1>
        <ul class="list-group">
        ${users
          .map(
            u => `<li class="list-group-item">  ${u.userName}  ${u.score}</li>`
          )
          .join("")}
        </ul>
        <button class="btn btn-primary btn-lg active">
          <a href="index.html">Back</a>
        </button>
        </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->

    <script
      src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
      integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
      integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
      integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
`);
      console.log("Voy a salir");
    })
    .catch(err => console.log(err));
});

router.post("/getUser", function(req, res) {
  console.log(req.body.nameValue);
  mu.users
    .findUser(nameValue)
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

router.get("/updateScore", function(req, res) {
  const userName = "two";
  const newScore = 3;
  mu.users
    .updateScore(userName, newScore)
    .then(user => {
      res.json(user);
    })
    .catch(err => console.log(err));
});

module.exports = router;

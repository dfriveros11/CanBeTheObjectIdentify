var express = require("express");
var router = express.Router();

const MongoUtils = require("../db/MongoUtils.js");
const mu = MongoUtils();

/* GET home page. */
router.get("/getTest", function(req, res, next) {
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

router.get("/getUsers", function(req, res, next) {
  mu.connect()
    .then(mu.users.find)
    .then(users => {
      res.json(users);
    })
    .catch(err => console.log(err));
});

router.get("/getUsersSS", function(req, res, next) {
  mu.connect()
    .then(mu.users.find)
    .then(users => {
      res.send(`
        <h1>ScoreBoard<h1>
        <ul class="list-group">
        ${users
          .map(
            u => `<li class="list-group-item">  ${u.userName} : ${u.score}</li>`
          )
          .join("")}
        </ul>
        <button>
          <a href="index.html">Back</a>
        </button>`);
    })
    .catch(err => console.log(err));
});

router.post("/getUser", function(req, res, next) {
  console.log(req.body.nameValue);
  mu.users
    .findUser(nameValue)
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

router.get("/updateScore", function(req, res, next) {
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

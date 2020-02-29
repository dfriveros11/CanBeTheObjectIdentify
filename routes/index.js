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

module.exports = router;

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/register", (req, res) => {
  console.log("req.body==", req.body);
  res.json({ message: req.body });
  //res.send("regsiter page");
});

module.exports = router;

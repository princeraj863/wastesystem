const express = require("express");
const User = require("../model/userSchema");
const router = express.Router();

require("../db/conn");

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/register", (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "plz fill the feild " });
  }

  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "User already exsit " });
      }
      const user = new User({ name, email, phone, password, cpassword }); // if key and value are same we can write anyone of them only

      user
        .save()
        .then(() => {
          res.status(201).json({ message: "user registered successfully" });
        })
        .catch((err) => res.status(500).json({ error: "failed to register" }));
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

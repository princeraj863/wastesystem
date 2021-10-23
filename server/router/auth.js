const express = require("express");
const User = require("../model/userSchema");
const router = express.Router();

require("../db/conn");

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "plz fill the feild " });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "User already exsit " });
    }

    const user = new User({ name, email, phone, password, cpassword }); // if key and value are same we can write anyone of them only

    await user.save();

    res.status(201).json({ message: "user registered successfully" });
  } catch (err) {
    console.log(err);
  }
});

//login route

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "plz fill the feild " });
    }
    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);

    if (!userLogin) {
      res.status(400).json({ message: "Invalid Username or password" });
    } else {
      res.status(200).json({ message: "user Signin Successfullly" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

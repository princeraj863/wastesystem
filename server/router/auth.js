const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../model/userSchema");
const router = express.Router();
const bcrypt = require("bcrypt");

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
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Passwords are not matching " });
    } else {
      const user = new User({ name, email, phone, password, cpassword }); // if key and value are same we can write anyone of them only

      /*before saving we hash the password to be stored in db using pre function , type of function save(),and in 
    callback function we'll hash the password ,it's a middleware, we do it in UserSchema.js    */

      await user.save();

      res.status(201).json({ message: "user registered successfully" });
    }
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

    if (userLogin) {
      // first password = which user puts during signin, 2nd password is from the data that we get when find the user in db
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      console.log(token);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credientials" });
      } else {
        res.status(200).json({ message: "user Signin Successfullly" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credientials" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

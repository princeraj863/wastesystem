const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../model/userSchema");
const router = express.Router();
const bcrypt = require("bcrypt");
const authenticate = require("../middleware/authenticate");
const wasteData = require("../model/wasteData");

require("../db/conn");

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  /*res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    'Content-Type,"application/json"'
  );
*/
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

      const token = await userLogin.generateAuthToken(); //using jwt in userSchema
      token1 = token;
      console.log(token);

      res.cookie("jwtoken", token, {
        // first one is name, 2nd it's value
        expires: new Date(Date.now() + 10000000000),
        httpOnly: true, // otherwise won't work without https
      }); // first name of cookie and then value of it
      //const x = res.cookie();

      // console.log("res===", x);
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

router.get("/about", authenticate, async (req, res) => {
  try {
    console.log("wasteid", req.rootUser.Waste);

    let user = {};
    user.name = req.rootUser.name;
    user.email = req.rootUser.email;
    user.phone = req.rootUser.phone;
    user.Waste = req.rootUser.Waste;
    let waste1 = {};
    if (user.Waste) {
      let id = user.Waste;
      const docs = await wasteData.findById(id);

      waste1 = docs;
    }
    let profile = {};
    profile.user = user;
    profile.waste1 = waste1;
    console.log("about : ", profile);

    res.send(profile);
  } catch (err) {
    console.log(err);
  }
});

router.get("/contact", (req, res) => {
  //  res.cookie("jwttttttoken", token1);
  //  console.log("fcuk");
  res.send("hello contact");
});

router.post("/official", authenticate, async (req, res) => {
  try {
    const { electronic, plastic, organic, inorganic, medical, other } =
      req.body;
    console.log("req.body===", req.body);
    let wasteid = req.rootUser.Waste;
    console.log("wasteid===", req.rootUser.Waste);
    let waste = {};
    if (!req.rootUser.Waste) {
      console.log("hello wasteid");
      waste = await wasteData.create({
        electronic: electronic,
        plastic: plastic,
        organic: organic,
        inorganic: inorganic,
        medical: medical,
        other: other,
        user: req.rootUser._id,
      });

      await waste.save();
    } else {
      waste = await wasteData.findById(wasteid);
      console.log("first==", waste);

      waste.electronic += parseInt(electronic);
      waste.plastic += parseInt(plastic);
      waste.organic += parseInt(organic);
      waste.inorganic += parseInt(inorganic);
      waste.medical += parseInt(medical);
      waste.other += parseInt(other);
      console.log("first1==", waste);
      waste = await wasteData.findByIdAndUpdate(wasteid, waste);
      console.log("first2==", waste);
    }

    let user = {};
    user.name = req.rootUser.name;
    user.email = req.rootUser.email;
    user.phone = req.rootUser.phone;
    let waste1 = {};
    waste1.waste = waste;
    waste1.user = user;
    let id = req.rootUser.id;
    if (!wasteid) {
      const docs = await User.findByIdAndUpdate(id, { Waste: waste.id });
      console.log("Updated User : ", docs);
    }

    console.log("waste1===", waste1);
    res.send(waste1);
  } catch (err) {
    console.log("err=========", err);
  }
});

module.exports = router;

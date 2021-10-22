const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
//with the help of variable app, we can use express properties and methods
const app = express();

//once defined here , we don't have to do it everywhere
dotenv.config({ path: "./config.env" });

require("./db/conn");
const User = require("./model/userSchema");
const PORT = process.env.PORT;

//middleware runs before page loads
const middleware = (req, res, next) => {
  console.log("f");
  next();
};

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/about", middleware, (req, res) => {
  res.send("hello about");
});

app.get("/contact", (req, res) => {
  res.send("hello contact");
});

app.get("/signin", (req, res) => {
  res.send("hello signin");
});

app.get("/signup", (req, res) => {
  res.send("hello signup");
});

/*this means server is running when server runs on this port then do the above response like 
app.get('/',(req,res)=>{
    res.send("hello");
    });*/
app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});

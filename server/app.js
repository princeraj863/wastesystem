const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
//with the help of variable app, we can use express properties and methods
const app = express();

app.use(cors());
const cookieParser = require("cookie-parser");
//const { createProxyMiddleware } = require("http-proxy-middleware");

// example http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar
/*app.use(
  "/router/auth",
  createProxyMiddleware({ target: "http://localhost:3000", changeOrigin: true })
);
*/
app.use(cookieParser());

//once defined here , we don't have to do it everywhere
dotenv.config({ path: "./config.env" });

//to let localhost3000 fetch from localhost 5000 and avoid cors policy
//imp using this middleware and cors extension in google chrome it works
/*app.use(function (req, response, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type"
  );*/
/* response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT"
  );
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});
*/
require("./db/conn");
const User = require("./model/userSchema");

//to convert json data to object as this app doesn't understand data
app.use(express.json());

const PORT = process.env.PORT;

//middleware runs before page loads
//we limk the router files to make our route easy
app.use(require("./router/auth"));

/*app.get("/about", (req, res) => {
  res.cookie("jwtoken", "baby");
  res.send("hello about");
});
*/

app.get("/contact", (req, res) => {
  res.cookie("jwtoken", "baby");
  console.log("fcuk");
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

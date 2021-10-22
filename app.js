const express = require("express");
//with the help of variable app, we can use express properties and methods
const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/about", (req, res) => {
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
app.listen(5000, () => {
  console.log("server is running at port 5000");
});

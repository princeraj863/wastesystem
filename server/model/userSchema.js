const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
});

/*before saving we hash the password to be stored in db using pre function , type of function save(),and in 
    callback function we'll hash the password ,it's a middleware  */
userSchema.pre("save", async function (next) {
  console.log("hello from inside");
  if (this.isModified("password")) {
    // password will be modified only when it is given
    this.password = await bcrypt.hash(this.password, 12); //12 here is number of round
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

//creating a new collection using models
const User = mongoose.model("USER", userSchema);

module.exports = User;

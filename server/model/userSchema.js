const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  Waste: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "waste",
  },
});

/*before saving we hash the password to be stored in db using pre function , type of function save(),and in 
    callback function we'll hash the password ,it's a middleware  */
// hashing the password
userSchema.pre("save", async function (next) {
  console.log("hello from inside");
  if (this.isModified("password")) {
    // password will be modified only when it is given
    this.password = await bcrypt.hash(this.password, 12); //12 here is number of round
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

//generating token , userSchema is instance and with instanc we use method
userSchema.methods.generateAuthToken = async function () {
  try {
    //jwt.sign(payload,secretOrPrivateKey,[options,callback]), SECRET_KEY should be of atleast 32 characters for security
    //token generated
    let tokenuser = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: tokenuser });
    await this.save();
    return tokenuser;
  } catch (err) {
    console.log(err);
  }
};

//creating a new collection using models
const User = mongoose.model("User", userSchema);

module.exports = User;

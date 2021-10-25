import React, { useState } from "react";
import { Link } from "react-router-dom";
const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name; // key like email,phone,name
    value = e.target.value; // value we get what user writes on form

    setUser({ ...user, [name]: value }); //here [name] means name value i.e email, phone
  };

  return (
    <div className="form">
      <div>
        <label htmlFor="name">Name:</label>
        <br />
        <input
          className="input"
          type="text"
          name="name"
          id="name"
          autoComplete="off"
          value={user.name}
          onChange={handleInputs}
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <br />
        <input
          className="input"
          type="email"
          name="email"
          id="email"
          autoComplete="off"
          value={user.email}
          onChange={handleInputs}
          placeholder="Your email"
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <br />
        <input
          className="input"
          type="number"
          name="phone"
          id="phone"
          autoComplete="off"
          value={user.phone}
          onChange={handleInputs}
          placeholder="Your phone"
        />
      </div>
      <div>
        <label htmlFor="password">password:</label>
        <br />
        <input
          className="input"
          type="password"
          name="password"
          id="password"
          autoComplete="off"
          value={user.password}
          onChange={handleInputs}
          placeholder="Your password"
        />
      </div>
      <div>
        <label htmlFor="cpassword">Confirm password:</label>
        <br />
        <input
          className="input"
          type="password"
          name="cpassword"
          id="cpassword"
          autoComplete="off"
          value={user.cpassword}
          onChange={handleInputs}
          placeholder="Your confirm password"
        />
      </div>

      <div>
        <Link className="submit" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;

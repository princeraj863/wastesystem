import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
const Signup = () => {
  const history = useHistory();
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

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, cpassword } = user;
    console.log("user===", user);

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // as server doesn't understand json only so stringify used
        name,
        email,
        phone,
        password,
        cpassword,
      }),
    });
    console.log("res===", res.status);
    const data = await res.json();
    console.log("data1===", data.status);
    if (res.status === 422 || !data) {
      // as we are retuning 422 status when registration is not successful
      window.alert("Invalid Registration");
      console.log("invalid registration");
    } else {
      window.alert("Registration successful");
      console.log(" registration successful");

      history.push("/login"); //after registration user will go directly to login page
    }
  };

  return (
    <div className="form">
      <form method="POST">
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
          <input
            className="input"
            type="submit"
            name="signup"
            id="signup"
            value="regsiter"
            onClick={PostData}
          />
        </div>

        <div>
          <Link className="submit" to="/login">
            Already registered
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;

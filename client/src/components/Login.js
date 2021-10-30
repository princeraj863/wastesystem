import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = res.json();
    console.log("data==", data);

    if (res.status === 400 || !data) {
      window.alert("Invalid credentials");
    } else {
      window.alert("login successful");
      history.push("/");
    }
  };
  return (
    <div className="form">
      <form>
        <div method="POST">
          <label htmlFor="email">Email:</label>
          <br />
          <input
            className="input"
            type="email"
            name="email"
            id="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
        </div>

        <div>
          <input
            className="input"
            type="submit"
            name="signin"
            id="signin"
            value="login"
            onClick={loginUser}
            autoComplete="off"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;

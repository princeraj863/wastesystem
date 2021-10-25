import React from "react";

const Login = () => {
  return (
    <div className="form">
      <div>
        <label htmlFor="email">Email:</label>
        <br />
        <input
          className="input"
          type="email"
          name="email"
          id="email"
          autoComplete="off"
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
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default Login;

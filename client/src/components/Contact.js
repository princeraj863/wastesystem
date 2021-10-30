import React from "react";

const Contact = () => {
  return (
    <div>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <br />
          <input
            className="input"
            type="text"
            name="name"
            id="name"
            autoComplete="off"
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
            placeholder="Your phone"
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
      </form>
    </div>
  );
};

export default Contact;

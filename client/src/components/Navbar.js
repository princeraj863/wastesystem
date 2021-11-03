import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import Signup from "./Signup";
import Login from "./Login";
import About from "./About";
import Updatewaste1 from "./Updatewaste1";

const Navbar = () => {
  return (
    <Router>
      <div className="navwrapper">
        <div className="navwrapperleft">
          <li className="list">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
        </div>
        <div className="navwrapperright">
          <li className="list">
            <Link className="link" to="/about">
              About
            </Link>
          </li>
          <li className="list">
            <Link className="link" to="/signup">
              Signup
            </Link>
          </li>
          <li className="list">
            <Link className="link" to="/contact">
              Contact Me
            </Link>
          </li>
          <li className="list">
            <Link className="link" to="/login">
              Login
            </Link>
          </li>
          <li className="list">
            <Link className="link" to="/official">
              update waste
            </Link>
          </li>
        </div>
      </div>

      <Switch>
        <Route exact path="/">
          3
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/official">
          <Updatewaste1 />
        </Route>
      </Switch>
    </Router>
  );
};

export default Navbar;

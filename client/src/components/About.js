import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const About = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({}); //{} given in useState then it tells that it's gonna be object
  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include", // to include token
      });
      console.log("res in ==", res);

      const data = await res.json();
      console.log("about data", data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push("/login");
    }
  };
  const getdata = (x) => {
    let content = [];
    /* for (let i of user) {
      console.log(i);
    }*/
    console.log(x.waste1);
    for (let i in x.waste1) {
      console.log(i);
      console.log(x.waste1[i]);
      if (i == "user" || i == "_id" || i == "__v") {
        continue;
      }
      content.push(
        <ul>
          <li>
            {i}-----------------------------------{x.waste1[i]}
          </li>
        </ul>
      );
    }
    return content;
  };
  const getuser = (x) => {
    let content = [];

    for (let i in x.user) {
      console.log(i);
      console.log(x.user[i]);
      if (i == "Waste") {
        continue;
      }

      content.push(
        <ul>
          <li>
            {i}-----------------------------------{x.user[i]}
          </li>
        </ul>
      );
    }
    return content;
  };

  useEffect(() => {
    callAboutPage();
  }, []); //[] means it will be called once
  return (
    <div>
      {/* <h4>Your Name ={userData.user.name}</h4>
      <h4>Your Name ={userData.user.email}</h4>
      <h4>Your Name ={userData.user.phone}</h4>
      Comment here */}
      <tbody>
        <h3>Total waste data till now </h3>
        <ul>{getdata(userData)}</ul>
        <h3>About User </h3>
        <ul>{getuser(userData)}</ul>
      </tbody>
    </div>
  );
};

export default About;

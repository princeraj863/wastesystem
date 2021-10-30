import React, { useEffect } from "react";
import { useHistory } from "react-router";

const About = () => {
  const history = useHistory();
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

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []); //[] means it will be called once
  return (
    <div>
      <form method="GET">hello</form>
    </div>
  );
};

export default About;

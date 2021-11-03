import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
const Updatewaste1 = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    electronic: "",
    plastic: "",
    organic: "",
    inorganic: "",
    medical: "",
    other: "",
  });

  let name, value;
  const HandleInputs = (e) => {
    console.log(e);
    name = e.target.name; // key like email,phone,name
    value = e.target.value; // value we get what user writes on form

    setUser({ ...user, [name]: value }); //here [name] means name value i.e email, phone
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { electronic, plastic, organic, inorganic, medical, other } = user;
    //console.log("user===", user);

    const res = await fetch("/official", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // as server doesn't understand json only so stringify used
        electronic,
        plastic,
        organic,
        inorganic,
        medical,
        other,
      }),
    });
    console.log("res===", res.status);
    const data = await res.json();
    console.log("data1===", data);

    if (res.status === 422 || !data) {
      // as we are retuning 422 status when registration is not successful
      window.alert("Invalid updation");
      console.log("invalid updation");
    } else {
      window.alert("updation successful");
      console.log(" updation successful");

      //after registration user will go directly to login page
      history.push("/");
    }
  };

  return (
    <div className="form">
      <form method="POST">
        <div>
          <label htmlFor="electronic">electronic:</label>
          <br />
          <input
            className="input"
            type="number"
            name="electronic"
            id="electronic"
            autoComplete="off"
            value={user.electronic}
            onChange={HandleInputs}
            placeholder="electronic"
          />
        </div>
        <div>
          <label htmlFor="plastic">plastic:</label>
          <br />
          <input
            className="input"
            type="number"
            name="plastic"
            id="plastic"
            autoComplete="off"
            value={user.plastic}
            onChange={HandleInputs}
            placeholder="plastic"
          />
        </div>
        <div>
          <label htmlFor="organic">organic:</label>
          <br />
          <input
            className="input"
            type="number"
            name="organic"
            id="organic"
            autoComplete="off"
            value={user.organic}
            onChange={HandleInputs}
            placeholder=" organic"
          />
        </div>
        <div>
          <label htmlFor="inorganic">inorganic:</label>
          <br />
          <input
            className="input"
            type="number"
            name="inorganic"
            id="inorganic"
            autoComplete="off"
            value={user.inorganic}
            onChange={HandleInputs}
            placeholder="Your inorganic"
          />
        </div>
        <div>
          <label htmlFor="medical">medical:</label>
          <br />
          <input
            className="input"
            type="number"
            name="medical"
            id="medical"
            autoComplete="off"
            value={user.medical}
            onChange={HandleInputs}
            placeholder="medical"
          />
        </div>
        <div>
          <label htmlFor="other">other:</label>
          <br />
          <input
            className="input"
            type="number"
            name="other"
            id="other"
            autoComplete="off"
            value={user.other}
            onChange={HandleInputs}
            placeholder="number"
          />
        </div>

        <div>
          <input
            className="input"
            type="submit"
            name="signup"
            id="signup"
            value="Update value"
            onClick={PostData}
          />
        </div>
      </form>
    </div>
  );
};

export default Updatewaste1;

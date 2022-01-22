import React, { useState, useEffect } from "react";
import { Deploy } from "./Component/Deploy/Deploy";

function App() {
  const [data, setData] = useState([]);
  const getData = () => {
    fetch("http://localhost:5000/members", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setData(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {typeof data.members === "undefined" ? (
        <p>Loading...</p>
      ) : (
        data.members.map((member, i) => <p key={i}>{member}</p>)
      )}
      <Deploy />
    </div>
  );
}

export default App;

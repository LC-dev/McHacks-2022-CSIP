import React, { useState, useEffect } from "react";
import { Deploy } from "./Component/Deploy/Deploy";
import { InputForm } from "./Component/InputForm";

function App() {
  useEffect(() => {
    document.title = "Covid stringency index predictor";
  }, []);

  const [data, setData] = useState([]);
  const getData = () => {
    fetch("http://localhost:5000/output", {
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
      {typeof data.output === "undefined" ? (
        <p>Loading...</p>
      ) : (
        data.output.map((output, i) => <p key={i}>{output}</p>)
      )}
      <Deploy />
      <InputForm></InputForm>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Deploy } from "./Component/Deploy/Deploy";
import { InputForm } from "./Component/InputForm";

import "./App.css";

import { cssColor, getTheme } from "@fluentui/react";

const theme = getTheme();

function App() {
  useEffect(() => {
    document.title = "Covid stringency index predictor";
  }, []);

  const [data, setData] = useState([]);
  const getData = () => {
    fetch("/output", {
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
    <div className="base center">
      <div
        className="wrapper center"
        style={{ boxShadow: theme.effects.elevation4 }}
      >
        <InputForm>Input</InputForm>
      </div>
      <div
        className="wrapper center"
        style={{ boxShadow: theme.effects.elevation4 }}
      >
        {typeof data.output === "undefined" ? (
          <p>Loading...</p>
        ) : (
          data.output.map((output, i) => (
            <p className="center text-center" key={i}>
              {output}
            </p>
          ))
        )}
      </div>
    </div>
  );
}

export default App;

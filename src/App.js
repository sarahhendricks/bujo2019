import React, { useEffect } from "react";
import "./App.css";
import Pinterest from "./util.js";

const App = () => {
    useEffect(() => {
        Pinterest.login(() => {
            console.log("Calling login callback");
            Pinterest.pins("may-inspo", () => console.log("Getting pins"));
        });
    }, []);

    return <div className="App"></div>;
};

export default App;

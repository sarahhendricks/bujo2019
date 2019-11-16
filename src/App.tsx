import React, { useEffect } from "react";
import "./App.css";
import Pinterest from "./util.js";

const App: FunctionalComponent<> = () => {
    useEffect(() => {
        Pinterest.login(() => {
            console.log("Calling login callback");
            Pinterest.pins("may-inspo", result =>
                console.log(`Pins: ${result}`)
            );
        });
    }, []);

    return <div className="App"></div>;
};

export default App;

import React, { useEffect, FunctionComponent } from "react";
import "./App.css";
import Pinterest from "./util.js";

type Pin = {
    url: string;
    id: string;
    link: string;
    description: string;
};
type BoardPinsResponse = {
    data: Array<Pin>;
};

const App: FunctionComponent = () => {
    useEffect(() => {
        Pinterest.login(() => {
            console.log("Calling login callback");
            Pinterest.pins("may-inspo", (response: BoardPinsResponse) =>
                console.log(`Pins: ${response.data}`)
            );
        });
    }, []);

    return <div className="App"></div>;
};

export default App;

import React, { useEffect, FunctionComponent, useState } from "react";
import "./App.css";
import { Pinterest } from "./util";
import { BoardPinsResponse, Pin } from "./types";

const App: FunctionComponent = () => {
    const [pins, setPins] = useState(Array.of<Pin>());
    useEffect(() => {
        Pinterest.login(() => {
            console.log("Calling login callback");
            Pinterest.pins("may-inspo", (response: BoardPinsResponse) => {
                console.log(`Pins: ${response.data}`);
                setPins(response.data);
            });
        });
    }, []);

    return (
        <div className="App">
            {pins.map(pin => (
                <a href={pin.link} key={pin.id}>
                    <img src={pin.image.original.url} alt={pin.note} />
                </a>
            ))}
        </div>
    );
};

export default App;

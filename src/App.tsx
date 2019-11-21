import React, { useEffect, FunctionComponent, useState } from "react";
import "./App.css";
import { Pinterest } from "./util";
import { BoardPinsResponse, Pin } from "./types";
import { fetchPinsAsync } from "./store/pins/actions";
import { connect } from "react-redux";

// This is a little more funky than I'm used to. Think I'll want to go the usual way
// of creating prop types that are taken in and then the functions down below.
const mapStateToProps = {};
const dispatchProps = {
    fetchPinsSuccess: fetchPinsAsync.success
};

type Props = typeof dispatchProps;

const App: FunctionComponent<Props> = props => {
    const [pins, setPins] = useState(Array.of<Pin>());
    useEffect(() => {
        Pinterest.login(() => {
            console.log("Calling login callback");
            Pinterest.pins("may-inspo", (response: BoardPinsResponse) => {
                console.log(`Pins: ${response.data}`);
                // TODO: dispatch the success action here, just to test getting
                // the data into the store.
                props.fetchPinsSuccess({ month: "may", pins: response.data });
                // Later we will dispatch the request from here and it will go
                // through an epic to get the data.
                // setPins(response.data);
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

import React, { useEffect, FunctionComponent, useState } from "react";
import "./App.css";
import { Pinterest } from "./util";
import { BoardPinsResponse, Pin } from "./types";
import { fetchPinsAsync } from "./store/pins/actions";
import { connect } from "react-redux";

// const mapStateToProps = (state: PinState) => {
//     pins: selectPinsByMonth(state, )
// };
const dispatchProps = {
    fetchPinsSuccess: fetchPinsAsync.success
};

type Props = typeof dispatchProps;

const App: FunctionComponent<Props> = ({ fetchPinsSuccess }) => {
    const [pins, setPins] = useState(Array.of<Pin>());
    useEffect(() => {
        Pinterest.login(() => {
            console.log("Calling login callback");
            Pinterest.pins("may-inspo", (response: BoardPinsResponse) => {
                console.log(`Pins: ${response.data}`);

                fetchPinsSuccess({ month: "may", pins: response.data });
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

export default connect(null, dispatchProps)(App);

import React, { useEffect, FunctionComponent, useState } from "react";
import "./App.css";
import { Pinterest } from "./util";
import { BoardPinsResponse, Pin } from "./types";
import { fetchPinsAsync } from "./store/pins/actions";
import { connect } from "react-redux";
import { selectPinsByMonth } from "./store/pins/selectors";
import { PinState } from "./store/pins/reducers";

const mapStateToProps = (state: PinState) => ({
    pins: selectPinsByMonth(state, { month: "may" })
});
const dispatchProps = {
    fetchPinsSuccess: fetchPinsAsync.success
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

const App: FunctionComponent<Props> = props => {
    useEffect(() => {
        Pinterest.login(() => {
            Pinterest.pins("may-inspo", (response: BoardPinsResponse) => {
                console.log(`Pins: ${response.data}`);

                props.fetchPinsSuccess({ month: "may", pins: response.data });
                // Later we will dispatch the request from here and it will go
                // through an epic to get the data.
            });
        });
    }, []);

    return (
        <div className="App">
            {props.pins &&
                props.pins.map(pin => (
                    <a href={pin.link} key={pin.id}>
                        <img src={pin.image.original.url} alt={pin.note} />
                    </a>
                ))}
        </div>
    );
};

export default connect(mapStateToProps, dispatchProps)(App);

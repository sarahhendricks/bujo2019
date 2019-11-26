import React, { useEffect, FunctionComponent } from "react";
import "./App.css";
import { Pinterest } from "./util";
import { fetchPinsAsync } from "./store/pins/actions";
import { connect } from "react-redux";
import { selectPinsByMonth } from "./store/pins/selectors";
import { PinState } from "./store/pins/reducers";

const mapStateToProps = (state: PinState) => ({
    pins: selectPinsByMonth(state, { month: "may" })
});
const dispatchProps = {
    fetchPinsRequest: fetchPinsAsync.request
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

const App: FunctionComponent<Props> = props => {
    useEffect(() => {
        Pinterest.login(() => {
            // TODO: obviously we're going to need to request more than one month eventually
            props.fetchPinsRequest("may");
        });
    }, []);

    return (
        <div className="App">
            <div id="may">
                {props.pins &&
                    props.pins.map(pin => (
                        <a href={pin.link} key={pin.id}>
                            <img src={pin.image.original.url} alt={pin.note} />
                        </a>
                    ))}
            </div>
        </div>
    );
};

export default connect(mapStateToProps, dispatchProps)(App);

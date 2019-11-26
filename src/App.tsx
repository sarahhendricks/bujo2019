import React, { useEffect, FunctionComponent } from "react";
import "./App.css";
import { Pinterest, isInView } from "./util";
import { fetchPinsAsync } from "./store/pins/actions";
import { connect } from "react-redux";
import { selectPinsByMonth, selectIsLoadingPins } from "./store/pins/selectors";
import { PinState } from "./store/pins/reducers";
import { Loader, Dimmer } from "semantic-ui-react";

const mapStateToProps = (state: PinState) => ({
    isLoadingPins: selectIsLoadingPins(state),
    pins: selectPinsByMonth(state, { month: "may" })
});
const dispatchProps = {
    fetchPinsRequest: fetchPinsAsync.request
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

const App: FunctionComponent<Props> = props => {
    useEffect(() => {
        Pinterest.login(() => {
            // TODO: remove this call; it should be done by individual divs (I think?)
            props.fetchPinsRequest("may");
        });
    }, []);

    return (
        <div className="App">
            {/* TODO:
                - Loop over the months by name so theres not 12 copies
                - Determine which divs are in the viewport
                - Run the dispatch on the visible divs to grab their content
                -  */}
            <div id="may">
                {/* TODO: going to need to make sure this only displays in divs that don't have any
                items yet */}
                {props.isLoadingPins && (
                    <Dimmer active inverted>
                        <Loader />
                    </Dimmer>
                )}
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

import React, { useEffect, FunctionComponent } from "react";
import "./App.css";
import { Pinterest, months } from "./util";
import { fetchPinsAsync } from "./store/pins/actions";
import { connect } from "react-redux";
import { selectPinsByMonth, selectIsLoadingPins } from "./store/pins/selectors";
import { PinState } from "./store/pins/reducers";
import { Loader, Dimmer } from "semantic-ui-react";
import VisibilitySensor from "react-visibility-sensor";

const mapStateToProps = (state: PinState) => ({
    isLoadingPins: selectIsLoadingPins(state),
    pins: selectPinsByMonth(state, { month: "may" })
});
const dispatchProps = {
    fetchPinsRequest: fetchPinsAsync.request
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

const onVisibilityChange = (isVisible: boolean, month: string) => {
    console.log(`${month} is visible now: ${isVisible}`);
};

const resizeImage = (originalHeight: number, originalWidth: number) => {
    const isHorizontal = originalHeight <= originalWidth;
    return isHorizontal
        ? { height: "auto", width: "300px" }
        : { height: "300px", width: "auto" };
};

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
                - Run the dispatch on the visible divs to grab their content
                -  */}
            {months.map((month: string) => (
                <VisibilitySensor
                    onChange={(isVisible: boolean) =>
                        onVisibilityChange(isVisible, month)
                    }
                    partialVisibility
                    key={month}
                >
                    <div id={month} key={month}>
                        <h1>{month}</h1>
                        {props.isLoadingPins && !props.pins && (
                            <Dimmer active inverted>
                                <Loader />
                            </Dimmer>
                        )}
                        {props.pins &&
                            props.pins.map(pin => (
                                <a href={pin.link} key={month + pin.id}>
                                    <img
                                        className="fadeIn"
                                        style={resizeImage(
                                            pin.image.original.height,
                                            pin.image.original.width
                                        )}
                                        src={pin.image.original.url}
                                        alt={pin.note}
                                    />
                                </a>
                            ))}
                    </div>
                </VisibilitySensor>
            ))}
        </div>
    );
};

export default connect(mapStateToProps, dispatchProps)(App);

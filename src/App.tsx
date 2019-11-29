import React, { useEffect, FunctionComponent } from "react";
import "./App.css";
import { Pinterest, months } from "./util";
import { fetchPinsAsync } from "./store/pins/actions";
import { connect } from "react-redux";
import {
    selectIsLoadingPins,
    selectPins,
    selectPinsByMonth
} from "./store/pins/selectors";
import { PinState } from "./store/pins/reducers";
import { Loader, Dimmer } from "semantic-ui-react";
import VisibilitySensor from "react-visibility-sensor";
import uuid from "uuid";

const mapStateToProps = (state: PinState) => ({
    isLoadingPins: selectIsLoadingPins(state),
    // TODO: need to figure out how to get these dynamically...
    // pins: selectPinsByMonth(state, { month: "may" })
    pins: selectPins(state)
});
const dispatchProps = {
    fetchPinsRequest: fetchPinsAsync.request
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

const onVisibilityChange = (
    isVisible: boolean,
    month: string,
    pinCallback: any
) => {
    console.log(`the month is ${month} and I am visible: ${isVisible}`);
    if (isVisible) {
        pinCallback(month);
    }
};

const resizeImage = (originalHeight: number, originalWidth: number) => {
    const isHorizontal = originalHeight <= originalWidth;
    return isHorizontal
        ? { height: "auto", width: "300px" }
        : { height: "300px", width: "auto" };
};

const App: FunctionComponent<Props> = props => {
    useEffect(() => {
        Pinterest.login(() => {});
    }, []);

    return (
        <div className="App">
            {months.map((month: string) => (
                <VisibilitySensor
                    partialVisibility
                    onChange={(isVisible: boolean) =>
                        onVisibilityChange(
                            isVisible,
                            month,
                            props.fetchPinsRequest
                        )
                    }
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
                            props.pins.get(month) &&
                            props.pins.get(month)!.map(pin => (
                                <a href={pin.link} key={uuid()}>
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

import React, { useEffect, FunctionComponent } from "react";
import "./App.css";
import { Pinterest, months } from "./util";
import { fetchPinsAsync } from "./store/pins/actions";
import { connect } from "react-redux";
import VisibilitySensor from "react-visibility-sensor";
import { PayloadActionCreator } from "typesafe-actions";
import Month from "./Month";

const dispatchProps = {
    fetchPinsRequest: fetchPinsAsync.request,
    fetchPinsCancel: fetchPinsAsync.cancel
};

type Props = typeof dispatchProps;

const onVisibilityChange = (
    isVisible: boolean,
    month: string,
    pinCallback: PayloadActionCreator<"FETCH_DATA_REQUEST", string>,
    pinCancel: PayloadActionCreator<"FETCH_DATA_CANCEL", string>
) => {
    if (isVisible && (month === "july" || month === "august")) {
        // TODO: this needs to only be called when I need "more" to display, or even if my
        // month is changing if I decide to make a poller that just operates on the most current month
        pinCallback(month);
    } else if (!isVisible) {
        pinCancel(month);
    }
};

const App: FunctionComponent<Props> = props => {
    useEffect(() => {
        Pinterest.login(() => {
            // TODO: think we might need to do some route redirecting in here
        });
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
                            props.fetchPinsRequest,
                            props.fetchPinsCancel
                        )
                    }
                    key={month}
                >
                    <Month month={month} />
                </VisibilitySensor>
            ))}
        </div>
    );
};

export default connect(null, dispatchProps)(App);

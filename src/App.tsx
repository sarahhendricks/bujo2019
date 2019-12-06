import React, { useEffect, FunctionComponent } from "react";
import "./App.css";
import { Pinterest, months } from "./util";
import { fetchPinsAsync } from "./store/pins/actions";
import { connect } from "react-redux";
import VisibilitySensor from "react-visibility-sensor";
import { PayloadActionCreator } from "typesafe-actions";
import Month from "./Month";
import databaseRef from "./config";
import { Pin } from "./types";

const dispatchProps = {
    fetchPinsRequest: fetchPinsAsync.request,
    fetchPinsCancel: fetchPinsAsync.cancel
};

type Props = typeof dispatchProps;

// Making references
const mayRef = databaseRef.child("may/");

// Getting data from database
mayRef.once("value", snapshot => {
    snapshot.forEach(childSnapshot => {
        var value = childSnapshot.val() as Pin;
        console.log(`value.id: ${value.id}, value.image: ${value.image}`);
        // console.log(`value: ${value}, url: ${value.image.original.url}`);
    });
});

const onVisibilityChange = (
    isVisible: boolean,
    month: string,
    pinCallback: PayloadActionCreator<"FETCH_DATA_REQUEST", string>,
    pinCancel: PayloadActionCreator<"FETCH_DATA_CANCEL", string>
) => {
    if (isVisible && (month === "july" || month === "august")) {
        // TODO: change this to call from the database instead
        pinCallback(month);
    } else if (!isVisible) {
        pinCancel(month);
    }
};

const App: FunctionComponent<Props> = props => {
    useEffect(() => {
        Pinterest.login(() => {
            // TODO: think we might need to do some route redirecting in here
            props.fetchPinsRequest("may");
        });
    }, []);

    return (
        <div className="App">
            {months.map((month: string) => (
                <VisibilitySensor
                    partialVisibility
                    onChange={(isVisible: boolean) =>
                        // onVisibilityChange(
                        //     isVisible,
                        //     month,
                        //     props.fetchPinsRequest,
                        //     props.fetchPinsCancel
                        // )
                        console.log("visible now: " + isVisible)
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

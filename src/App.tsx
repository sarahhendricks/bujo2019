import React, { useEffect, FunctionComponent } from "react";
import "./App.css";
import { Pinterest, months } from "./util";
import { fetchPinsAsync } from "./store/pins/actions";
import { connect } from "react-redux";
import VisibilitySensor from "react-visibility-sensor";
import { PayloadActionCreator } from "typesafe-actions";
import Month from "./Month";
import databaseRef from "./config";

const dispatchProps = {
    fetchPinsRequest: fetchPinsAsync.request,
    fetchPinsCancel: fetchPinsAsync.cancel
};

type Props = typeof dispatchProps;

// Making references
const mayRef = databaseRef.child("may/");

// Getting data from database
mayRef.once("value", snapshot => console.log(snapshot.val()));

// Adding data to the database
databaseRef.child("june/").set({
    "138767232255530441": {
        id: "138767232255530441",
        note: "VSCO - theboyfriendmaterial",
        link:
            "https://www.pinterest.com/r/pin/138767232255530441/5065021390669794430/52dc6b67d50543f7384b03ec1af1bda3982711c86fe5a1251766f02b5152ce86",
        image: {
            original: {
                url:
                    "https://i.pinimg.com/originals/d1/e8/f2/d1e8f2c684619423cd19d0167c8559ba.jpg",
                width: 600,
                height: 908
            }
        }
    }
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

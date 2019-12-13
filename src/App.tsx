import React, { FunctionComponent, useEffect } from "react";
import "./App.css";
import { months } from "./util";
import VisibilitySensor from "react-visibility-sensor";
import Month from "./Month";
import databaseRef from "./config";
import { Pin } from "./types";
import { addPin } from "./store/pins/actions";
import { connect } from "react-redux";

const dispatchProps = {
    addPin: addPin
};

type Props = typeof dispatchProps;

const onVisibilityChange = (isVisible: boolean, monthRef: string) => {};

const App: FunctionComponent<Props> = props => {
    useEffect(() => {
        months.forEach((month: string) => {
            const monthRef = databaseRef.child(month + "/");

            // Getting data from database
            monthRef.once("value", snapshot => {
                snapshot.forEach(childSnapshot => {
                    var value = childSnapshot.val() as Pin;
                    props.addPin({ month, pin: value });
                });
            });
        });
    });

    return (
        <div className="App">
            {months.map((month: string) => (
                <VisibilitySensor
                    partialVisibility
                    onChange={(isVisible: boolean) =>
                        onVisibilityChange(isVisible, month)
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

import React, { FunctionComponent } from "react";
import "./App.css";
import { months } from "./util";
import VisibilitySensor from "react-visibility-sensor";
import Month from "./Month";
import databaseRef from "./config";
import { Pin } from "./types";

// Making references
const mayRef = databaseRef.child("may/");

// Getting data from database
mayRef.once("value", snapshot => {
    snapshot.forEach(childSnapshot => {
        var value = childSnapshot.val() as Pin;
    });
});

const onVisibilityChange = (isVisible: boolean, month: string) => {
    if (isVisible && (month === "july" || month === "august")) {
        // TODO: change this to call from the database instead
    }
};

const App: FunctionComponent = () => {
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

export default App;

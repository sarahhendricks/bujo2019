import "semantic-ui-css/semantic.min.css";
import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./Admin";

const Root: FunctionComponent = () => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/admin">
                    <Admin />
                </Route>
                <Route path="/">
                    <App />
                </Route>
            </Switch>
        </Router>
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById("root"));

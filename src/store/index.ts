import { createStore } from "redux";
import pinsReducer from "./pins/reducers";
import { createEpicMiddleware } from "redux-observable";
import { RootAction, RootState } from "typesafe-actions";
import { pinsEpic } from "./pins/epics";

export const epicMiddleware = createEpicMiddleware<
    RootAction,
    RootAction,
    RootState
>();

epicMiddleware.run(pinsEpic);

// TODO: do we need to make enhancers here?
const store = createStore(pinsReducer, {});

export default store;

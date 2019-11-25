import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { RootAction, RootState } from "typesafe-actions";
import { pinsEpic } from "./pins/epics";
import { rootReducer } from "./root-reducer";

export const epicMiddleware = createEpicMiddleware<
    RootAction,
    RootAction,
    RootState
>();

const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(pinsEpic);

export default store;

import { combineEpics } from "redux-observable";
import { fetchPinsEpic } from "./pins/epics";

export const rootEpic = combineEpics(fetchPinsEpic);

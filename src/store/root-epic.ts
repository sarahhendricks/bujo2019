import { combineEpics } from "redux-observable";
import { pinsEpic } from "./pins/epics";

export const rootEpic = combineEpics(pinsEpic);

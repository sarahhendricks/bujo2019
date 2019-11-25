import { combineReducers } from "redux";
import pinsReducer from "./pins/reducers";

export const rootReducer = combineReducers(pinsReducer);

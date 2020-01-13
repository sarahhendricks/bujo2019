import { createStore } from "redux";
import pinsReducer from "./pins/reducers";

const store = createStore(pinsReducer);

export default store;

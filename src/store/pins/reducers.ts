import { createReducer } from "typesafe-actions";
import { addPin } from "./actions";
import { combineReducers } from "redux";
import { Pin } from "../../types";
import { Map, List } from "immutable";

export const pins = createReducer(Map<string, List<Pin>>()).handleAction(
    addPin,
    (state, action) =>
        state.update(action.payload.month, (value = List()) =>
            value.concat(action.payload.pin)
        )
);

const pinsReducer = combineReducers({
    pins
});

export default pinsReducer;
export type PinState = ReturnType<typeof pinsReducer>;

import { createReducer } from "typesafe-actions";
import { fetchPinsAsync } from "./actions";
import { combineReducers } from "redux";
import { Pin } from "../../types";

export const isFetchingData = createReducer(false as boolean)
    .handleAction([fetchPinsAsync.request], (_, __) => true)
    .handleAction(
        [fetchPinsAsync.success, fetchPinsAsync.failure],
        (_, __) => false
    );

export const pins = createReducer(Array() as Array<Pin>).handleAction(
    fetchPinsAsync.success,
    // TODO: change to a map so we can organize by month name
    // TODO: we will need to actually add to the state here, rather than replacing it
    (state, action) => {
        console.log(`This is now the state: ${action.payload}`);
        return action.payload;
    }
);

const pinsReducer = combineReducers({
    isFetchingData,
    pins
});

export default pinsReducer;
export type PinState = ReturnType<typeof pinsReducer>;

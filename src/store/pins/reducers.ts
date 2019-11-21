import { createReducer } from "typesafe-actions";
import { fetchPinsAsync } from "./actions";
import { combineReducers } from "redux";
import { Pin } from "../../types";
import { Map, List } from "immutable";

export const isFetchingData = createReducer(false as boolean)
    .handleAction([fetchPinsAsync.request], (_, __) => true)
    .handleAction(
        [fetchPinsAsync.success, fetchPinsAsync.failure],
        (_, __) => false
    );

export const pins = createReducer(
    Map.of() as Map<string, List<Pin>>
).handleAction(fetchPinsAsync.success, (state, action) => {
    console.log(`This is now the state: ${action.payload}`);
    return state.set(action.payload.month, List(action.payload.pins));
});

const pinsReducer = combineReducers({
    isFetchingData,
    pins
});

export default pinsReducer;
export type PinState = ReturnType<typeof pinsReducer>;

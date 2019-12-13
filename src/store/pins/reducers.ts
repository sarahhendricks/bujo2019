import { createReducer } from "typesafe-actions";
import { fetchPinsAsync, addPin } from "./actions";
import { combineReducers } from "redux";
import { Pin } from "../../types";
import { Map, List } from "immutable";

export const isFetchingData = createReducer(Map<string, boolean>())
    .handleAction([fetchPinsAsync.request], (state, action) =>
        state.update(action.payload, () => true)
    )
    .handleAction([fetchPinsAsync.success], (state, action) =>
        state.update(action.payload.month, () => false)
    )
    .handleAction([fetchPinsAsync.failure], (state, action) =>
        state.update(action.payload, () => false)
    )
    .handleAction([fetchPinsAsync.cancel], (state, action) =>
        state.update(action.payload, () => false)
    );

export const pins = createReducer(Map<string, List<Pin>>()).handleAction(
    addPin,
    (state, action) =>
        state.update(action.payload.month, (value = List()) =>
            value.concat(action.payload.pin)
        )
);

const pinsReducer = combineReducers({
    isFetchingData,
    pins
});

export default pinsReducer;
export type PinState = ReturnType<typeof pinsReducer>;

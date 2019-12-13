import { createAsyncAction, createAction } from "typesafe-actions";
import { Pin } from "../../types";

type PinData = {
    month: string;
    pins: Array<Pin>;
};

export const fetchPinsAsync = createAsyncAction(
    "FETCH_DATA_REQUEST",
    "FETCH_DATA_SUCCESS",
    "FETCH_DATA_FAILURE",
    "FETCH_DATA_CANCEL"
)<string, PinData, string, string>();

export const addPin = createAction("ADD_PIN")<{ month: string; pin: Pin }>();

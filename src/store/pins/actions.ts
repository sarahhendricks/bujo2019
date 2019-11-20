import { createAsyncAction } from "typesafe-actions";
import { Pin } from "../../types";

export const fetchPinsAsync = createAsyncAction(
    "FETCH_DATA_REQUEST",
    "FETCH_DATA_SUCCESS",
    "FETCH_DATA_FAILURE"
)<string, Array<Pin>, string>();

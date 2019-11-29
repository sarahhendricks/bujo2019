import { PinState } from "./reducers";

export const selectPins = (state: PinState) => state.pins;

// This needs to be here so that the page can be memoized as much as possible.
// I'll only want the month(s) that are being shown to update with the data,
// not the whole page.
export const selectPinsByMonth = (state: PinState, props: { month: string }) =>
    state.pins.get(props.month);

export const selectIsLoadingPins = (state: PinState) => state.isFetchingData;

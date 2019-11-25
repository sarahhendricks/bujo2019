import { Epic } from "redux-observable";
import { RootAction, RootState, isActionOf } from "typesafe-actions";
import { fetchPinsAsync } from "./actions";
import { filter, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

// TODO: remember that you can access the stream at ANY time!
export const pinsEpic: Epic<
    RootAction, // Incoming action
    RootAction, // Outgoing action
    RootState
> = (action$, _) =>
    action$.pipe(
        filter(isActionOf(fetchPinsAsync.request)),
        // TODO: enter the switchmap that accesses the Pinterest API here
        map(action =>
            fetchPinsAsync.success({ month: action.payload, pins: [] })
        ),
        catchError((message: string) => of(fetchPinsAsync.failure(message)))
    );

// TODO: I think I'm doing this backwards... I need the FETCH call to kick off this
// guy, not necessarily to call the reducer after the data is in
//     Pinterest.pins("may-inspo", (response: BoardPinsResponse) => {
//         console.log(`Pins: ${response.data}`);
//         props.fetchPinsRequest("may");
//     });
// }

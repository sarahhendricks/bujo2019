import { Epic } from "redux-observable";
import { RootAction, RootState, isActionOf } from "typesafe-actions";
import { fetchPinsAsync } from "./actions";
import { filter, map, catchError, mergeMap, expand, tap } from "rxjs/operators";
import { bindCallback, of, empty } from "rxjs";
import { Pinterest } from "../../util";
import databaseRef from "../../config";

// const pinsObservable = bindCallback(Pinterest.pins);

export const fetchPinsEpic: Epic<RootAction, RootAction, RootState> = (
    action$,
    _
) =>
    action$.pipe(
        filter(isActionOf(fetchPinsAsync.request)),
        mergeMap(action =>
            bindCallback(Pinterest.pins)(action.payload).pipe(
                tap(response =>
                    console.log("Here is the current response: %o", response)
                ),
                expand(response => {
                    console.log(
                        `Entering the expand with resposne %o`,
                        response
                    );
                    if (response.hasNext) {
                        console.log(
                            `Think the response has more, calling now.`
                        );
                        console.log(response.next());
                        return of(response.next());
                    } else {
                        console.log("No more data to get, returning empty.");
                        return empty();
                    }
                }),
                map(response => {
                    console.log("About to add data to the database");

                    // Adding data to database
                    response.data.forEach(pin =>
                        databaseRef.child(action.payload + "/").push({
                            ...pin
                        })
                    );

                    return fetchPinsAsync.success({
                        month: action.payload,
                        pins: response.data
                    });
                }),
                catchError((message: string) =>
                    of(fetchPinsAsync.failure(message))
                )
            )
        )
    );

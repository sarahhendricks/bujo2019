import { Epic } from "redux-observable";
import { RootAction, RootState, isActionOf } from "typesafe-actions";
import { fetchPinsAsync } from "./actions";
import { filter, map, catchError, mergeMap } from "rxjs/operators";
import { bindCallback, of } from "rxjs";
import { Pinterest } from "../../util";
import databaseRef from "../../config";

const pinsObservable = bindCallback(Pinterest.pins);

export const pinsEpic: Epic<RootAction, RootAction, RootState> = (action$, _) =>
    action$.pipe(
        filter(isActionOf(fetchPinsAsync.request)),
        mergeMap(action =>
            pinsObservable(action.payload).pipe(
                map(response => {
                    if (response.hasNext) {
                        // recursively call getting more data
                        console.log(
                            `Going to get more data for ${action.payload}`
                        );
                        response.next!();
                    }

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

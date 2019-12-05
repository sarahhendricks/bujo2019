import { Epic } from "redux-observable";
import { RootAction, RootState, isActionOf } from "typesafe-actions";
import { fetchPinsAsync } from "./actions";
import { filter, map, catchError, mergeMap } from "rxjs/operators";
import { bindCallback, of } from "rxjs";
import { Pinterest } from "../../util";

const pinsObservable = bindCallback(Pinterest.pins);

export const pinsEpic: Epic<RootAction, RootAction, RootState> = (action$, _) =>
    action$.pipe(
        filter(isActionOf(fetchPinsAsync.request)),
        mergeMap(action =>
            pinsObservable(action.payload).pipe(
                map(response => {
                    if (response.hasNext) {
                        console.log("I can go grab more data now");
                        // TODO: this is going to cause a problem where each month module keeps refreshing
                        // because it's constantly fetching data...
                    }
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

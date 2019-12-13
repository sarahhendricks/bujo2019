import { BoardPinsResponse } from "./types";
import { List } from "immutable";

var Const = require("./const");

declare global {
    interface Window {
        PDK: any;
    }
}

const PDK = window.PDK;
PDK.init({ appId: Const.PIN_APP, cookie: true });

export const Pinterest = {
    login: (callback: (json: string) => void) => {
        PDK.login({ scope: Const.PIN_SCOPE }, callback);
    },

    pins: (boardName: string, callback: (json: BoardPinsResponse) => void) => {
        console.log(`About to call getting the pins for ${boardName}`);
        var params = {
            fields: "id, note, link, image",
            limit: 100
        };
        var boardId = `${boardName}-inspo`;
        PDK.request(`/boards/daisyinaglass/${boardId}/pins/`, params, callback);
        // const proxyurl = "https://cors-anywhere.herokuapp.com/";
        // fetch(
        //     proxyurl +
        //         "https://gist.githubusercontent.com/sarahhendricks/0c8681884bdd629221b50418b04942a1/raw/b40d26198529f3225002f93cf8223073f9410514/pinterest.json"
        // )
        //     .then(response => response.json())
        //     .then(response => response as BoardPinsResponse)
        //     .then(response => {
        //         // console.log(
        //         //     `Here is the response json: ${JSON.stringify(response)}`
        //         // );
        //         callback(response);
        //     })
        //     .catch(error => console.log(error));

        console.log("Finished calling getting the pins.");
    }
};

export const months = List.of(
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
);

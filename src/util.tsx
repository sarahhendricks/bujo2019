import { BoardPinsResponse } from "./types";

var Const = require("./const");

declare global {
    interface Window {
        PDK: any;
    }
}

const PDK = window.PDK;
console.log("about to initialize");
PDK.init({ appId: Const.PIN_APP, cookie: true });

export const Pinterest = {
    login: (callback: (json: string) => void) => {
        console.log("About to call login.");
        PDK.login({ scope: Const.PIN_SCOPE }, callback);
        console.log("Finished calling login.");
    },

    pins: (boardId: string, callback: (json: BoardPinsResponse) => void) => {
        console.log(`About to call getting the pins for ${boardId}`);
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(
            proxyurl +
                "https://gist.githubusercontent.com/sarahhendricks/0c8681884bdd629221b50418b04942a1/raw/f90ef2ff10a1e1aed68cb10cb89d434c3b0780bd/pinterest.json"
        )
            .then((response: Response) => {
                console.log(
                    `Here is the response json: ${JSON.stringify(
                        response.json()
                    )}`
                );
                // TODO: how to call the callback now?
            })
            .catch(error => console.log(error));
        // PDK.request(`/boards/daisyinaglass/${boardId}/pins/`, callback);
        console.log("Finished calling getting the pins.");
    }
};

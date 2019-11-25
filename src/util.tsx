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
        // var params = {
        //     fields: "id, note, link, image"
        // };
        // PDK.request(`/boards/daisyinaglass/${boardId}/pins/`, params, callback);
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(
            proxyurl +
                "https://gist.githubusercontent.com/sarahhendricks/0c8681884bdd629221b50418b04942a1/raw/b40d26198529f3225002f93cf8223073f9410514/pinterest.json"
        )
            .then(response => response.json())
            .then(response => response as BoardPinsResponse)
            .then(response => {
                console.log(
                    `Here is the response json: ${JSON.stringify(response)}`
                );
                callback(response);
            })
            .catch(error => console.log(error));

        console.log("Finished calling getting the pins.");
    }
};

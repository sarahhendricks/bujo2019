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
        var params = {
            fields: "id, note, link, image",
            limit: 100
        };
        var boardId = `${boardName}-inspo`;
        PDK.request(`/boards/daisyinaglass/${boardId}/pins/`, params, callback);
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

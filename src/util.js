var Const = require("./const");

const PDK = window.PDK;
console.log("about to initialize");
PDK.init({ appId: Const.PIN_APP, cookie: true });

var Pinterest = {
    login: callback => {
        console.log("About to call login.");
        PDK.login({ scope: Const.PIN_SCOPE }, callback);
        console.log("Finished calling login.");
    },

    pins: (boardId, callback) => {
        console.log("About to call getting the pins");
        PDK.request(`/boards/daisyinaglass/${boardId}/pins/`, callback);
        console.log("Finished calling getting the pins.");
    }
};

module.exports = Pinterest;

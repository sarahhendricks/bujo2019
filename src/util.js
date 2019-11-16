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
        console.log(`About to call getting the pins for ${boardId}`);
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(
            proxyurl +
                "https://gist.githubusercontent.com/sarahhendricks/0c8681884bdd629221b50418b04942a1/raw/f90ef2ff10a1e1aed68cb10cb89d434c3b0780bd/pinterest.json"
        )
            .then(response => {
                console.log(`Here is the response json: ${response.json()}`);
            })
            .catch(error => console.log(error));
        // PDK.request(`/boards/daisyinaglass/${boardId}/pins/`, callback);
        console.log("Finished calling getting the pins.");
    }
};

module.exports = Pinterest;

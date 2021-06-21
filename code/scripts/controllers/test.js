const opendsu = require("opendsu");

//Load resolver library
const resolver = opendsu.loadApi("resolver");

//Load keyssi library
const keyssispace = opendsu.loadApi("keyssi");

function loadDSU(aKeySSIStr) {
    resolver.loadDSU(aKeySSIStr, (err, anotherDSUInstance) => {
        if (err) {
            console.log("Error loading DSU.");
            throw err;
        }

        anotherDSUInstance.readFile('/data', (err, data) => {
            //Reached when data loaded
            if (err) {
                console.log("Error reading data from the DSU.");
                throw err;
            }

            const dataObject = JSON.parse(data.toString()); //Convert data (buffer) to string and then to JSON
            console.log("%cData load succesfully IN MAH SSAPP!", "color: green", dataObject.message); //Print message to console

            console.log("");
            console.log("DSU Keys: ");
            /* console.log("  KeySSI:   " + pskcrypto.pskBase58Decode(aKeySSIStr));
            console.log("  Read Key: " + aReadSSI.getIdentifier(true)); */
        });
    });
}

export default {
    loadDSU
}
const opendsu = require("opendsu");

//Load resolver library
const resolver = opendsu.loadApi("resolver");

//Load keyssi library
const keyssispace = opendsu.loadApi("keyssi");

/* const pskcrypto = require("../../privatesky/modules/pskcrypto"); */

function createDSU() {

    //Create a template keySSI (for default domain). See /conf/BDNS.hosts.json
    try {
        keyssispace.createSeedSSI('default', function(err, aSeedSSI) {

            console.log("seedSSI object:     ", aSeedSSI);
            console.log("seedSSI identifier: " + aSeedSSI.getIdentifier(true));

            let aData = { "message": "Hello world from MAH SSAPP!" };

            //Create a DSU
            resolver.createDSU(aSeedSSI, (err, dsuInstance) => {
                //Reached when DSU created
                if (err) {
                    console.log("Error creating DSU.");
                    throw err;
                }

                //Methods found in: /modules/bar/lib/Archive.js
                dsuInstance.writeFile('/data', JSON.stringify(aData), (err) => {
                    //Reached when data written to BrickStorage

                    if (err) {
                        console.log("Error writing data to DSU.");
                        throw err;
                    }
                    console.log("Data written succesfully! :) ");


                    dsuInstance.getKeySSIAsString((err, aKeySSIStr) => {
                        console.log("%cKeySSI identifier: ", "color: green", aKeySSIStr); // KeySSI identifier:  BBudGH6ySHG6GUHN8ogNrTWbSXyuv5XvYDpjVH3L973ioh5WqYv39pk5DJMhgCA2WTtoyCP54cZazSg8ozXawX9ZZ

                        const anotherSeedSSI = keyssispace.parse(aKeySSIStr);
                        console.log("secretSSIObject = ", anotherSeedSSI); // dsuSecretSSI
                        const aReadSSI = anotherSeedSSI.derive();
                        console.log("sReadSSI object = ", aReadSSI);
                        console.log("sReadSSI identifier = " + aReadSSI.getIdentifier(true));

                        const aZaSSI = aReadSSI.derive();
                        console.log("sZaSSI object = ", aZaSSI);
                        console.log("sZaSSI identifier = " + aZaSSI.getIdentifier(true));


                    });
                });
            });
        });
    } catch (exc) {

        console.log("Exception: ");
        console.log(exc);
    }


}

export default {
    createDSU
}
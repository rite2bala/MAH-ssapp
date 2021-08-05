const opendsu = require("opendsu");

//Load resolver library
const resolver = opendsu.loadApi("resolver");

//Load keyssi library
const keyssispace = opendsu.loadApi("keyssi");

/* const pskcrypto = require("../../privatesky/modules/pskcrypto"); */
let keySSI = "";

function createDSU(stringsampple) {

    //Create a template keySSI (for default domain). See /conf/BDNS.hosts.json
    try {
        keyssispace.createSeedSSI('default', function(err, aSeedSSI) {

            console.log("seedSSI object:     ", aSeedSSI);
            console.log("seedSSI identifier: " + aSeedSSI.getIdentifier(true));

            let aData = stringsampple;

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
                        console.log("%cKeySSI identifier: ", "color: green", aKeySSIStr);

                        const anotherSeedSSI = keyssispace.parse(aKeySSIStr);
                        console.log("secretSSIObject = ", anotherSeedSSI); // dsuSecretSSI

                        const aReadSSI = anotherSeedSSI.derive();
                        console.log("sReadSSI object = ", aReadSSI);
                        console.log("sReadSSI identifier = " + aReadSSI.getIdentifier(true));

                        const aZaSSI = aReadSSI.derive();
                        console.log("sZaSSI object = ", aZaSSI);
                        console.log("sZaSSI identifier = " + aZaSSI.getIdentifier(true));
                        keySSI = aKeySSIStr;
                    });
                });
            });
        });
    } catch (exc) {

        console.log("Exception: ");
        console.log(exc);
    }
}

function initializeDSU() {
    try {
        keyssispace.createSeedSSI('default', function(err, aSeedSSI) {
            //Create a DSU
            resolver.createDSU(aSeedSSI, (err, dsuInstance) => {
                //Reached when DSU created
                if (err) {
                    console.log("Error creating DSU.");
                    throw err;
                }
                //Methods found in: /modules/bar/lib/Archive.js
                dsuInstance.getKeySSIAsString((err, aKeySSIStr) => {
                    console.log("%cKeySSI identifier: ", "color: green", aKeySSIStr);
                    keySSI = aKeySSIStr;
                });
            });
        });
    } catch (exc) {

        console.log("Exception: ");
        console.log(exc);
    }
}

function loadDSU() {
    try {
        resolver.loadDSU(keySSI, (err, dsuInstance) => {
            if (err) {
                console.error(err);
                setModal("Error", "DSU has NOT been loaded, check console");
            }
            dsu = dsuInstance;
            console.log("DSU loaded", dsu);
            //   setModal("", "");
        })
    } catch (err) {
        console.log("broadcasting an error from here")
        console.error(err);
        //setModal("Error", "DSU has NOT been loaded, check console");
    }
}

function testCreate(stringSample) {
    resolver.loadDSU(keySSI, (err, DSUInstance) => {
        if (err) {
            console.log("Error loading DSU.");
            throw err;
        }
        DSUInstance.listFiles("/", (err, files) => {
            if (err) {
                throw err;
            } else {
                DSUInstance.writeFile("/file" + (files.length - 1), JSON.stringify(stringSample), (err) => {
                    if (err) {
                        throw err;
                    } else {

                    }
                });
            }
        });
    });

}

function testRead() {
    /* initializeDSU(); */
    resolver.loadDSU(keySSI, (err, DSUInstance) => {
        if (err) {
            console.log("Error loading DSU.");
            throw err;
        }
        DSUInstance.listFiles("/", (err, files) => {
            if (err) {
                throw err;
            } else {
                files.forEach((data) => {
                    // log file and user file not included
                    if (data != "dsu-metadata-log") {
                        // reads kit files
                        DSUInstance.readFile("/" + data, (err, buffer) => {
                            if (err) {
                                throw err;
                            } else {
                                let dataObject = JSON.parse(buffer.toString());
                                console.log(dataObject);

                            }

                        });
                    }
                });
            }
        });
    });
}
export default {
    createDSU,
    loadDSU,
    initializeDSU,
    testCreate,
    testRead
}
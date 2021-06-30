import ContainerController from "../../cardinal/controllers/base-controllers/ContainerController.js"; // main controller
import DSUManager from "./DSUManager.js"; // DSU manager

const model = {
    // user info
    // user: "",
    // courier: "",
    // values of "modal" prompt window
    modal: {
        opened: false,
        title: "",
        message: ""
    },
    // kit-ID text input
    productID: {
        label: "Product ID",
        name: "productID",
        required: true,
        placeholder: "Product ID here...",
        value: ""
    },
    // product name text input
    manufacturerName: {
        label: "Manufacturer Name",
        name: "Manufacturer Name",
        required: true,
        placeholder: "Sandoz",
        value: "Sandoz"
    },
    readManufacturerID: {
        label: "KeySSI here ",
        name: "KeySSI here ",
        required: true,
        placeholder: "KeySSI here ",
        value: ""
    },
    // status dropdown
    statusSelect: {
        label: "Status",
        placeholder: "Please select one option...",
        required: true,
        options: [{
            label: "Ready for pickup at Clinical Resource",
            value: "1"
        }, {
            label: "In transit",
            value: "2"
        }, {
            label: "Delivered to patient",
            value: "3"
        }, {
            label: "Ready for pickup at patient",
            value: "4"
        }, {
            label: "Unused product in transit",
            value: "5"
        }, {
            label: "Done",
            value: "6"
        }]
    },
    // courier dropdown
    courierSelect: {
        label: "Courier",
        placeholder: "Please select one option...",
        required: true,
        options: [{
            label: "DHL",
            value: "DHL"
        }, {
            label: "UPS",
            value: "UPS"
        }]
    },
    // description text area
    description: {
        label: "Description",
        name: "description",
        required: true,
        placeholder: "Description here...",
        value: ""
    },
    // creation date text field
    creationdate: {
        label: "Creation Date",
        name: "creationdate"
    },
    kit: {
        id: "",
        kitid: "",
        productname: "",
        status: "",
        statusLabel: "",
        courier: "",
        description: "",
        creationdate: ""
    },
    nextStep: "", // text for nextStep button
    buttonDisabled: false,
    // datamatrix values
    isDatamatrixShown: false,
    datamatrixLabel: "Show Datamatrix"
}

/**
 * Controller for Kit Details page
 */
export default class KitDetailsController extends ContainerController {
    /**
     * Constructor of KitDetailsController
     * @param {object} element default object
     * @param {object} history default object
     */
    constructor(element, history) {
        super(element, history);
        this.model = this.setModel(JSON.parse(JSON.stringify(model))); // sets model
        this.on("saveDrugData", () => {
            console.log("Hello There!", this.model.productID.value)
            DSUManager.createDSU(this.model.productID.value)
        }); // save to DSU
        this.on("fetchDrugData", () => {
            console.log("Hello There!", this.model.readManufacturerID.value)
            DSUManager.loadDSU(this.model.readManufacturerID.value)
        }); // Fetch from DSU
    }
}

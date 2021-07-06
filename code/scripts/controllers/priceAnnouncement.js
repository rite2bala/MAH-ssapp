import ContainerController from "../../cardinal/controllers/base-controllers/ContainerController.js"; // main controller
import DSUManager from "./DSUManager.js"; // DSU manager

const model = {
    // values of "modal" prompt window
    modal: {
        opened: false,
        title: "",
        message: ""
    },
    //fields required for Price announcement
    // Product-ID text input
    productID: {
        label: "Product ID",
        name: "productID",
        required: true,
        placeholder: "Product ID here...",
        value: ""
    },
    // Manufacturer ID text input
    manufacturerID: {
        label: "Manufacturer Name",
        name: "Manufacturer Name",
        required: true,
        placeholder: "Sandoz",
        value: "Sandoz"
    },
    //Product Group (IQVIA Molecule)

    productGroup: {
        label: "Product Group (IQVIA molecule)",
        name: "Product Group (IQVIA molecule)",
        required: true,
    },

    //Material ID (Shape ID)
    materialID: {
        label: "Material ID (Shape ID)",
        name: "Material ID (Shape ID)",
        required: true,
    },
    //Product Name
    productName: {
        label: "Product name",
        name: "Product name",
        required: true,
        value: ""
    },
    //Strength
    strength: {
        label: "Strength",
        name: "Strength",
        required: true,
        options: [ {
            label: "1mg",
            value: "1mg"
        }, {
            label: "5mg",
            value: "5mg"
        }, 
        {
            label: "30mg",
            value: "30mg"
        }, {
            label: "500mg",
            value: "500mg"
        }, {
            label: "1000mg",
            value: "1000mg"
        }, {
            label: "NA",
            value: "NA"
        }]
    },

    //Pack size
    packSize: {
        label: "Pack Size",
        name: "Pack Size",
        required: true,
        options: [ {
            label: "10",
            value: "10"
        }, {
            label: "15",
            value: "15"
        }, 
        {
            label: "60ml",
            value: "60ml"
        }, {
            label: "100ml",
            value: "100ml"
        }, {
            label: "200ml",
            value: "200ml"
        }, {
            label: "NA",
            value: "NA"
        }]
    },

    //Dosage Form
    dosageForm: {
        label: "Dosage Form",
        name: "Dosage Form",
        required: true,
        options: [{
            label: "Tablet",
            value: "Tablet"
        }, {
            label: "Syrup",
            value: "Syrup"
        }, {
            label: "Intravenous",
            value: "Intravenous"
        }, {
            label: "Capsules",
            value: "Capsules"
        }, {
            label: "Lozenges",
            value: "Lozenges"
        }, {
            label: "Spray",
            value: "Spray"
        }, {
            label: "Ointment",
            value: "Ointment"
        }]
    },

    //Price (APU)
    priceAPU: {
        label: "Price APU",
        name: "Price (APU)",
        required: true,
        value: ""
    },

    //Currency
    currency: {
        label: "Currency",
        name: "Currency",
        required: true,
        options: [{
            label: "Euro",
            value: "EUR"
        }, {
            label: "United States dollar",
            value: "USD"
        }, {
            label: "Japanese Yen",
            value: "JPY"
        }, {
            label: "Jersey Pound",
            value: "JEP"
        }, {
            label: "Kuwaiti Dinar",
            value: "KWD"
        }, {
            label: "Indian Rupee",
            value: "INR"
        }]
    },

    //Price Date
    priceDate: {
        label: "Price Date",
        name: "Price Date",
        required: true,
        value: ""
    },


    //used to print the DSU
    readManufacturerID: {
        label: "KeySSI here ",
        name: "KeySSI here ",
        required: true,
        placeholder: "KeySSI here ",
        value: ""
    },

    // kit: {
    //     id: "",
    //     kitid: "",
    //     productname: "",
    //     status: "",
    //     statusLabel: "",
    //     courier: "",
    //     description: "",
    //     creationdate: ""
    // },
    // nextStep: "", // text for nextStep button
    // buttonDisabled: false,
    // // datamatrix values
    // isDatamatrixShown: false,
    // datamatrixLabel: "Show Datamatrix"
}

/**
 * Controller for Price Announcement page
 */
export default class priceAnnouncementController extends ContainerController {
    /**
     * Constructor of priceAnnouncementController
     * @param {object} element default object
     * @param {object} history default object
     */
    constructor(element, history) {
        super(element, history);
        this.model = this.setModel(JSON.parse(JSON.stringify(model))); // sets model
        this.on("saveDrugData", () => {
            console.log("Hello There!", this.model.productID.value)
            DSUManager.createDSU(this.model)
        }); // save to DSU
        this.on("fetchDrugData", () => {
            DSUManager.testRead(this.model)
        }); // Fetch from DSU
    }
}
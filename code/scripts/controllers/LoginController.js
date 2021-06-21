import ContainerController from "../../cardinal/controllers/base-controllers/ContainerController.js"; // main controller
import DSUManager from "./DSUManager.js"; // DSU manager
import test from "./test.js";

const model = {
    // couriername text input
    couriername: {
        label: "THIS IS MAH SSAPP",
        name: "couriername",
        required: true,
        placeholder: "Courier name here...",
        value: ""
    },
    // username text input
    username: {
        label: "KeySSI",
        name: "keyssi",
        required: true,
        placeholder: "KeySSI here...",
        value: ""
    },
    // password text input (is disabled)
    password: {
        label: "Password",
        name: "password",
        required: true,
        placeholder: "Password here...",
        value: "12345678"
    },
    // values of "modal" prompt window
    modal: {
        opened: false,
        title: "",
        message: ""
    }
}

/**
 * Controller for Login page
 */
export default class LoginController extends ContainerController {
    /**
     * 
     * @param {object} element default object
     * @param {object} history default object
     */
    constructor(element, history) {
        super(element, history);
        this.model = this.setModel(JSON.parse(JSON.stringify(model))); // sets model
        /* DSUManager.loadDSU(); */
        DSUManager.createDSU();
        this.on("loginSubmit", () => {
            test.loadDSU(this.model.username.value);
        });
    }
}
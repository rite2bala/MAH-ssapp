import ContainerController from '../../cardinal/controllers/base-controllers/ContainerController.js'; // main controller
import DSUManager from './DSUManager.js'; // DSU manager

const model = {
    // values of "modal" prompt window
    modal: {
        opened: false,
        title: '',
        message: '',
    },

    //fields required for Price announcement
    // statusID text input
    statusId: {
        label: 'Status ID',
        name: 'statusId',
        required: true,
        placeholder: 'Status ID here...',
    },

    // Manufacturer ID text input
    manufacturerID: {
        label: 'Manufacturer ID',
        name: 'Manufacturer ID',
        required: true,
        placeholder: 'Sandoz',
        value: 'Sandoz',
    },

    // SHIId text input
    shiId: {
        label: 'SHIID',
        name: 'SHIId',
        required: true,
        placeholder: 'SHIID here...',
    },

    // Start Date text input
    startDate: {
        label: 'Start Date',
        name: 'startDate',
        required: true,
        placeholder: 'Start date here...',
    },

    // End Date text input
    endDate: {
        label: 'End Date',
        name: 'endDate',
        required: true,
        placeholder: 'End date here...',
    },

    // Payment Conditions text input
    paymentConditions: {
        label: 'Payment Conditions',
        name: 'paymentConditions',
        required: true,
        placeholder: 'Payment Conditions here...',
    },

    // Products text input
    products: {
        label: 'Products',
        name: 'products',
        required: true,
        placeholder: 'Products here...',
    },

    // Product ID text input
    productID: {
        label: 'Product ID',
        name: 'productID',
        required: true,
        placeholder: 'Product ID here...',
    },

    // Rebate Start date input
    rebateStart: {
        label: 'Rebate Start',
        name: 'rebateStart',
        required: true,
    },

    // Rebate End date input
    rebateEnd: {
        label: 'Rebate End',
        name: 'rebateEnd',
        required: true,
    },

    // Rebate Logic text input
    rebateLogic: {
        label: 'Rebate Logic',
        name: 'rebateLogic',
        required: true,
        placeholder: 'Rebate Logic here...',
    },

    // dicount text input
    discount: {
        label: 'Discount',
        name: 'discount',
        required: true,
        placeholder: 'Discount here...',
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
};

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
        this.on('save', () => {
            console.log('Hello There!', this.model.productID.value);
            DSUManager.createDSU(this.model);
        }); // save to DSU
    }
}

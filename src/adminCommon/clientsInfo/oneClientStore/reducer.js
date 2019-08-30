import {fromJS} from "immutable/dist/immutable";
import * as constants from './constants';

const defaultState = fromJS({
    id:"",
    customerNumber:"",
    isDel:null,
    corporateName:"",
    corporateAddress:"",
    contacts:"",
    contactsTel:"",
    contactsEmail:"",
    isEffective:null,
    introduction:"",
    invoiceCustomerName:"",
    taxPayerIdentificationNum:"",
    address:"",
    telephone:"",
    bank:"",
    bankAccount:"",
    summary:null,
    createdBy:null,
    createDate:null,
    lastUpdateBy:null,
    lastUpdateDate:null,
});
export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.CLIENT_INFO_CHANGE_ID:
            return state.set("id",action.value);
        case constants.CLIENT_INFO_CHANGE_CUSTOMER_NUMBER:
            return state.set("customerNumber",action.value);
        case constants.CLIENT_INFO_CHANGE_CORPORATE_NAME:
            return state.set("corporateName",action.value);
        case constants.CLIENT_INFO_CHANGE_CORPORATE_ADDRESS:
            return state.set("corporateAddress",action.value);
        case constants.CLIENT_INFO_CHANGE_CONTACTS:
            return state.set("contacts",action.value);
        case constants.CLIENT_INFO_CHANGE_CONTACTS_TEL:
            return state.set("contactsTel",action.value);
        case constants.CLIENT_INFO_CHANGE_CONTACTS_EMAIL:
            return state.set("contactsEmail",action.value);
        case constants.CLIENT_INFO_CHANGE_INTRODUCTION:
            return state.set("introduction",action.value);
        case constants.CLIENT_INFO_CHANGE_INVOICE_CUSTOMER_NAME:
            return state.set("invoiceCustomerName",action.value);
        case constants.CLIENT_INFO_CHANGE_TAX:
            return state.set("taxPayerIdentificationNum",action.value);
        case constants.CLIENT_INFO_CHANGE_TELEPHONE:
            return state.set("telephone",action.value);
        case constants.CLIENT_INFO_CHANGE_BANK:
            return state.set("bank",action.value);
        case constants.CLIENT_INFO_CHANGE_BANK_ACCOUNT:
            return state.set("bankAccount",action.value);
        case constants.CLIENT_INFO_CHANGE_ALL:
            return action.value;
        case constants.CLIENT_INFO_SET_DEFAULT:
            return defaultState;
        default:
            return state;
    }
}
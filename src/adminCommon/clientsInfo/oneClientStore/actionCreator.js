import * as constants from './constants';
import {fromJS} from "immutable";
import axios from 'axios';
import * as config from '../../../config';
import {message} from "antd";
import {actionCreator} from '../store';


export const clientChangeId = (id) => ({type:constants.CLIENT_INFO_CHANGE_ID,value:id});
export const clientChangeCustomerNumber = (number) => ({type:constants.CLIENT_INFO_CHANGE_CUSTOMER_NUMBER,value: number});
export const clientChangeCorporateName = (name) => ({type:constants.CLIENT_INFO_CHANGE_CORPORATE_NAME,value:name});
export const clientChangeCorporateAddress = (address) => ({type:constants.CLIENT_INFO_CHANGE_CORPORATE_ADDRESS,value:address});
export const clientChangeContacts = (contact) => ({type:constants.CLIENT_INFO_CHANGE_CONTACTS,value:contact});
export const clientChangeContactsTel = (contactsTel) => ({type:constants.CLIENT_INFO_CHANGE_CONTACTS_TEL,value:contactsTel});
export const clientChangeContactsEmail = (email) => ({type:constants.CLIENT_INFO_CHANGE_CONTACTS_EMAIL,value:email});
export const clientChangeIntroduction = (intro) => ({type:constants.CLIENT_INFO_CHANGE_INTRODUCTION,value:intro});
export const clientChangeInvoice = (invoice) => ({type:constants.CLIENT_INFO_CHANGE_INVOICE_CUSTOMER_NAME,value:invoice});
export const clientChangeTax = (tax) => ({type:constants.CLIENT_INFO_CHANGE_TAX,value:tax});
export const clientChangeTelephone = (telephone) => ({type:constants.CLIENT_INFO_CHANGE_TELEPHONE,value:telephone});
export const clientChangeBank = (bank) => ({type:constants.CLIENT_INFO_CHANGE_BANK,value:bank});
export const clientChangeBankAccount = (account) => ({type:constants.CLIENT_INFO_CHANGE_BANK_ACCOUNT,value:account});
export const clientChangeAll = (all)=>({type:constants.CLIENT_INFO_CHANGE_ALL,value:fromJS(all)});
export const clientSetDefault = {type:constants.CLIENT_INFO_SET_DEFAULT};

export const clientChangeModalIsVisible = (val) => ({type:constants.CHANGE_CLIENT_MODAL_IS_VISIBLE,value:val});


export const getOneClientInfo = (id)=> {
    return (dispatch)=> {
        axios.get(config.DOMAIN_NAME+'/get-one-client',{params:{'id':id}}).then((res)=>{
            dispatch(clientChangeAll(res.data));
        }).catch((err)=>{
            console.log(err);
        });
    }
};

export const verifyCorporateAdmin = (loginName,clientId) => {
    return (dispatch) => {
        let param = new URLSearchParams();
        param.append("loginName",loginName);param.append("clientId",clientId);
        axios.post(config.DOMAIN_NAME+'/verify-corporate-admin',param).then((res)=> {
            if(res.data)
            {
                dispatch(getOneClientInfo(clientId));
                dispatch(actionCreator.clientChangeModalIsVisible(true));
            }
            else {
                message.error("你不是该公司的管理员");
            }
        }).catch((err) => {
            console.log(err);
        })
    }
};

export const saveClientInfo = (clientDataPageCode,id,customerNumber,corporateName,corporateAddress,contacts,contactsTel,
                               contactsEmail,introduction,invoiceCustomerName,taxPayerIdentificationNum,
                               telephone,bank,bankAccount)=>{
    return (dispatch) => {
        /*let param = new URLSearchParams();
        param.append("id",id);param.append("customerNumber",customerNumber);param.append("corporateName",corporateName);
        param.append("corporateAddress",corporateAddress);param.append("contacts",contacts);param.append("contactsTel",contactsTel);
        param.append("contactsEmail",contactsEmail);param.append("introduction",introduction);param.append("invoiceCustomerName",invoiceCustomerName);
        param.append("taxPayerIdentificationNum",taxPayerIdentificationNum);param.append("telephone",telephone);
        param.append("bank",bank);param.append("bankAccount",bankAccount);
        console.log(param.toString());
        let client = JSON.parse(param.toString());*/
        /*let p = new URLSearchParams();
        p.append("client",obj);*/
        let client = {"id":id,"customerNumber":customerNumber,"corporateName":corporateName,"corporateAddress":corporateAddress,
        "contacts":contacts,"contactsTel":contactsTel,"contactsEmail":contactsEmail,"introduction":introduction,
        "invoiceCustomerName":invoiceCustomerName,"taxPayerIdentificationNum":taxPayerIdentificationNum,"telephone":telephone,
        "bank":bank,"bankAccount":bankAccount};
        axios.post(config.DOMAIN_NAME+'/save-one-client',client).then((res)=>{
            if(res.data.data)
            {
                message.success("保存成功！");
                dispatch(clientChangeModalIsVisible(false));
                dispatch(actionCreator.clientGetOnePageClientInfo(clientDataPageCode));
            }
            else {
                message.error(res.data.info);
            }
        }).catch((err)=>{
            console.log(err);
        });
    }
};

export const addClient = (clientDataPageCode,id,customerNumber,corporateName,corporateAddress,contacts,contactsTel,
                          contactsEmail,introduction,invoiceCustomerName,taxPayerIdentificationNum,
                          telephone,bank,bankAccount) => {
    return (dispatch) => {
        let client = {"id":id,"customerNumber":customerNumber,"corporateName":corporateName,"corporateAddress":corporateAddress,
            "contacts":contacts,"contactsTel":contactsTel,"contactsEmail":contactsEmail,"introduction":introduction,
            "invoiceCustomerName":invoiceCustomerName,"taxPayerIdentificationNum":taxPayerIdentificationNum,"telephone":telephone,
            "bank":bank,"bankAccount":bankAccount};
        axios.post(config.DOMAIN_NAME+'/add-client',client).then((res)=>{
            if(res.data.data)
            {
                message.success("又来了一位上帝！");
                dispatch(clientChangeModalIsVisible(false));
                dispatch(actionCreator.clientGetOnePageClientInfo(clientDataPageCode));
            }
            else {
                message.error(res.data.info);
            }
        }).catch((err)=>{
            console.log(err);
        });
    }
};
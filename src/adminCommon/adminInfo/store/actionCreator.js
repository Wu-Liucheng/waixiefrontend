import * as constants from './constants'
import axios from 'axios';
import {message} from "antd";
import {fromJS} from "immutable";
import * as config from '../../../config';
export const changeTabStatus = (status) => ({
    type:constants.CHANGE_TAB_STATUS,
    value:status,
});
export const changeManagerData = (data) => ({
    type:constants.CHANGE_MANAGER_DATA,
    value:fromJS(data),
});
export const changeManagerTotal = (total) => ({
    type:constants.CHANGE_MANAGER_TOTAL,
    value:total,
});
export const changeManagerPageCode = (code) => ({
    type:constants.CHANGE_MANAGER_PAGE_CODE,
    value:code,
});
export const changeCheckerData = (data) => ({
    type:constants.CHANGE_CHECKER_DATA,
    value:fromJS(data),
});
export const changeCheckerTotal = (total) => ({
    type:constants.CHANGE_CHECKER_TOTAL,
    value:total,
});
export const changeCheckerPageCode = (code) => ({
    type:constants.CHANGE_CHECKER_PAGE_CODE,
    value:code,
});
export const changeCorporateAdminData = (data) => ({
    type:constants.CHANGE_CORPORATE_ADMIN_DATA,
    value:fromJS(data),
});
export const changeCorporateAdminTotal = (total) => ({
    type:constants.CHANGE_CORPORATE_ADMIN_TOTAL,
    value:total,
});
export const changeCorporateAdminPageCode = (code) =>({
    type:constants.CHANGE_CORPORATE_ADMIN_PAGE_CODE,
    value:code,
});

export const getManagerData = (pageCode) => {
    return (dispatch) => {
        let cipher = config.ciphertext();
        axios.get(config.DOMAIN_NAME+'/get-manager-data',
            {params:{"pageCode":pageCode,"key":cipher.key,"value":cipher.value}})
            .then((res) => {
                if(res.data.success){
                    dispatch(changeManagerData(res.data.data));
                    dispatch(changeManagerTotal(res.data.total));
                    dispatch(changeManagerPageCode(pageCode));
                }
                else {
                    message.error("非法操作！");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
};
export const getCheckerData = (pageCode) => {
    return (dispatch) => {
        let cipher = config.ciphertext();
        axios.get(config.DOMAIN_NAME+'/get-checker-data',
            {params:{"pageCode":pageCode,"key":cipher.key,"value":cipher.value}})
            .then((res) => {
                if(res.data.success){
                    dispatch(changeCheckerData(res.data.data));
                    dispatch(changeCheckerTotal(res.data.total));
                    dispatch(changeCheckerPageCode(pageCode));
                }
                else {
                    message.error("非法操作！");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
};
export const getCorporateAdminData = (pageCode) => {
    return (dispatch) => {
        let cipher = config.ciphertext();
        axios.get(config.DOMAIN_NAME+'/get-corporate-admin-data',
            {params:{"pageCode":pageCode,"key":cipher.key,"value":cipher.value}})
            .then((res) => {
                if(res.data.success){
                    dispatch(changeCorporateAdminData(res.data.data));
                    dispatch(changeCorporateAdminTotal(res.data.total));
                    dispatch(changeCorporateAdminPageCode(pageCode));
                }
                else {
                    message.error("非法操作！");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
};
export const deleteManager = (id,pageCode) => {
    return (dispatch) => {
        let cipher = config.ciphertext();
        let param = new URLSearchParams();
        param.append("id",id);
        param.append("key",cipher.key);
        param.append("value",cipher.value);
        axios.post(config.DOMAIN_NAME+'/delete-manager',param)
            .then((res)=>{
                if(res.data.data){
                    message.info("已删除。");
                    dispatch(getManagerData(pageCode));
                }
                else {
                    message.error(res.data.info);
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }
};
export const deleteChecker = (id,pageCode) => {
    return (dispatch) => {
        let cipher = config.ciphertext();
        let param = new URLSearchParams();
        param.append("id",id);
        param.append("key",cipher.key);
        param.append("value",cipher.value);
        axios.post(config.DOMAIN_NAME+'/delete-checker',param)
            .then((res)=>{
                if(res.data.data){
                    message.info("已删除。");
                    dispatch(getCheckerData(pageCode));
                }
                else {
                    message.error(res.data.info);
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }
};
export const deleteCorporateAdmin = (id,pageCode) => {
    return (dispatch) => {
        let cipher = config.ciphertext();
        let param = new URLSearchParams();
        param.append("id",id);
        param.append("key",cipher.key);
        param.append("value",cipher.value);
        axios.post(config.DOMAIN_NAME+'/delete-corporate-admin',param)
            .then((res)=>{
                if(res.data.data){
                    message.info("已删除。");
                    dispatch(getCorporateAdminData(pageCode));
                }
                else {
                    message.error(res.data.info);
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }
};

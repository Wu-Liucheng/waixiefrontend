import * as constants from './constants';
import {fromJS} from "immutable";
import axios from 'axios';
import * as config from '../../../config';
import {message} from "antd";
export const changeSignUpData = (data) => ({
    type:constants.CHANGE_SIGN_UP_DATA,
    value:fromJS(data),
});
export const changeCurrentPageCode = (code) => ({
    type:constants.CHANGE_CURRENT_PAGE_CODE,
    value:code,
});
export const changeTotal = (total) => ({
    type:constants.CHANGE_TOTAL,
    value:total,
});

export const changeCheckerId = (id) => ({
    type:constants.CHANGE_CHECKER_ID,
    value:id,
});

export const changeConsultantInfoIsVisible = (val) => ({
    type:constants.CHANGE_CONSULTANT_INFO_IS_VISIBLE,
    value:val,
});

export const changeConsultantInfo = (info) => ({
    type:constants.CHANGE_CONSULTANT_INFO,
    value:info,
});


export const setCheckerId = (username) => {
    return (dispatch)=>{
        axios.get(config.DOMAIN_NAME+'/get-checker-id',{params:{"loginName":username}})
            .then((res)=>{
                if(res.data === null){
                    message.error("权限不足！");
                }
                else {
                    dispatch(changeCheckerId(res.data));
                    dispatch(getPageData(res.data,1));
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }
};

export const getPageData = (checkerId,pageCode) => {
    return (dispatch) => {
        let param = new URLSearchParams();
        param.append("checkerId",checkerId);
        param.append("pageCode",pageCode);
        axios.post(config.DOMAIN_NAME+'/get-sign-up-data',param)
            .then((res) => {
                if(res.data.success){
                    dispatch(changeSignUpData(res.data.data));
                    dispatch(changeCurrentPageCode(pageCode));
                    dispatch(changeTotal(res.data.total));
                }
                else {
                    message.error("获取失败！");
                }
            })
            .catch((err) =>{
                console.log(err);
            })
    }
} ;

export const getConsultantInfo = (id) => {
    return (dispatch) => {
        let param = new URLSearchParams();
        param.append("resumeId",id);
        axios.post(config.DOMAIN_NAME+'/resume-for-checker',param)
            .then((res) => {
                console.log(res.data);
                dispatch(changeConsultantInfo(res.data));
            })
            .catch((err) => {
                console.log(err);
            })
    }
};
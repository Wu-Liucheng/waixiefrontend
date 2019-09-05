import * as constants from './constants'
import axios from 'axios';
import {message} from "antd";
import {fromJS} from "immutable";
import * as config from '../../../config';

export const changeConsultantData = (data) => ({
    type:constants.CHANGE_CONSULTANT_DATA,
    value:fromJS(data),
});
export const changeTotal = (total) => ({
    type:constants.CHANGE_TOTAL,
    value:total,
});
export const changeCurrentPageCode = (code) => ({
    type:constants.CHANGE_CURRENT_PAGE_CODE,
    value:code,
});
export const changeCheckerId = (id) => ({
    type:constants.CHANGE_CHECKER_ID,
    value:id,
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
                    dispatch(getConsultantData(res.data,1));
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }
};

export const getConsultantData = (checkerId,pageCode)=>{
    return (dispatch) => {
        let param  = new URLSearchParams();
        param.append("checkerId",checkerId);
        param.append("pageCode",pageCode);
        axios.post(config.DOMAIN_NAME+'/user-status-for-checker',param)
            .then((res) => {
                if(res.data.success){
                    dispatch(changeConsultantData(res.data.data));
                    dispatch(changeCurrentPageCode(pageCode));
                    dispatch(changeTotal(res.data.total));
                }
                else {
                    message.error("获取失败");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
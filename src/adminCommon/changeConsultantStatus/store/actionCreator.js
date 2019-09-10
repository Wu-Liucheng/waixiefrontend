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
export const changeMdlIsVisible = (val) => ({
    type:constants.CHANGE_MODAL_IS_VISIBLE,
    value:val,
});
export const changeFocusUserId = (id) => ({
    type:constants.CHANGE_FOCUS_USER_ID,
    value:id,
});
export const changeUsername = (username) => ({
    type:constants.CHANGE_USERNAME,
    value:username,
});
export const changePlanDate = (date) => ({
    type:constants.CHANGE_PLAN_DATE,
    value:date,
});
export const changeIsBeingUsed = (val) => ({
    type:constants.CHANGE_IS_BEING_USED,
    value:val,
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

export const getConsultantStatus = (id) => {
    return (dispatch) => {
        let param = new URLSearchParams();
        param.append("id",id);
        axios.post(config.DOMAIN_NAME+'/consultant-status',param)
            .then((res)=>{
                if(res.data.success){
                    dispatch(changeMdlIsVisible(true));
                    dispatch(changeFocusUserId(id));
                    dispatch(changeUsername(res.data.username));
                    dispatch(changePlanDate(res.data.planDate));
                    dispatch(changeIsBeingUsed(res.data.isBeingUsed));
                }
                else {
                    message.error("发生了错误");
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }
};

export const updateStatus = (id,planDate,isBeingUsed) => {
    return (dispatch) => {
        let param = {"id":id,"planDate":planDate,"isBeingUsed":isBeingUsed};
        axios.post(config.DOMAIN_NAME+'/update-consultant-status',param)
            .then((res) => {
                if(res.data.data){
                    message.success("更改成功！");
                    dispatch(changeMdlIsVisible(false));
                }
                else {
                    message.error(res.data.info);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const relationIsOver = (demandId,userId,checkerId,pageCode) =>{
    return (dispatch) => {
        let param = {"demandId":demandId,"userId":userId};
        axios.post(config.DOMAIN_NAME+'/relation-is-over',param)
            .then((res)=>{
                if(res.data.data){
                    message.info("已经解除关系！");
                    dispatch(getConsultantData(checkerId,pageCode));
                }
                else {
                    message.error("操作失败！");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
} ;
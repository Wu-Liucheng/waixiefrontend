import * as constants from './constants'
import axios from 'axios';
import {message} from "antd";
import {fromJS} from "immutable";
import * as config from '../../../config';

export const changeManagerId = (id)  => ({
    type:constants.CHANGE_MANAGER_ID,
    value:id,
});
export const changeNoticeData = (data) => ({
    type:constants.CHANGE_NOTICE_DATA,
    value:fromJS(data),
});
export const changeTotal = (total) => ({
    type:constants.CHANGE_TOTAL,
    value:total,
});
export const changePageCode = (code) => ({
    type:constants.CHANGE_PAGE_CODE,
    value:code,
});
export const changeDrawerIsVisible = (val) => ({
    type:constants.CHANGE_DRAWER_IS_VISIBLE,
    value:val,
});
export const changeFocusKey = (key) => ({
    type:constants.CHANGE_FOCUS_KET,
    value:key,
});
export const changeDetail = (data) => ({
    type:constants.CHANGE_DETAIL,
    value:data,
});
export const getManagerId = (username) => {
    return (dispatch) => {
        let param = new URLSearchParams();
        param.append("username",username);
        axios.post(config.DOMAIN_NAME+'/get-manager-id',param)
            .then((res) => {
                if(res.data == null){
                    message.error("用户不存在！");
                }
                else{
                    dispatch(changeManagerId(res.data));
                    dispatch(getNoticeData(res.data,1));
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
};
export const getNoticeData = (managerId,pageCode)=>{
    return (dispatch) => {
        let param = new URLSearchParams();
        param.append("managerId",managerId);
        param.append("pageCode",pageCode);
        axios.post(config.DOMAIN_NAME+'/get-notice',param)
            .then((res)=> {
                if(res.data.success){
                    dispatch(changeNoticeData(res.data.data));
                    dispatch(changePageCode(pageCode));
                    dispatch(changeTotal(res.data.total));
                }
                else{
                    message.error("获取失败！");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const setIsRead = (id) => {
    return (dispatch) => {
        let param = new URLSearchParams();
        param.append("id",id);
        axios.post(config.DOMAIN_NAME+'/set-read-status',param)
            .catch((err)=>{
                console.log(err);
            })
    }
};

export const deleteNotice = (id,managerId,pageCode) => {
    return (dispatch) => {
        let param = new URLSearchParams();
        param.append("id",id);
        axios.post(config.DOMAIN_NAME+'/delete-notice',param)
            .then((res)=>{
                if(res.data.data){
                    message.info("已删除！");
                    dispatch(getNoticeData(managerId,pageCode))
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
export const getDetail = (id) => {
    return (dispatch)=>{
        axios.get(config.DOMAIN_NAME+'/detail-notice',{params:{
            "noticeId":id
            }})
            .then((res) =>{
                dispatch(changeDetail(res.data));
            })
            .catch((err)=>{
                console.log(err);
            })
    }
};
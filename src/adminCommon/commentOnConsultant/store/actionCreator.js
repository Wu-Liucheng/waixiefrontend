import * as constants from './constants'
import axios from 'axios';
import {message} from "antd";
import {fromJS} from "immutable";
import * as config from '../../../config';

export const changeManagerId = (id) => ({
    type:constants.CHANGE_MANAGER_ID,
    value:id,
});
export const changeCstData = (data) => ({
    type:constants.CHANGE_CONSULTANT_DATA,
    value:fromJS(data),
});
export const changeTotalData = (total) => ({
    type:constants.CHANGE_TOTAL_DATA,
    value:total,
});
export const changePageCode = (code) => ({
    type:constants.CHANGE_PAGE_CODE,
    value:code,
});
export const changeNowFocusUserId = (id) => ({
    type:constants.CHANGE_NOW_FOCUS_USER_ID,
    value:id,
});
export const changeComments = (comments) => ({
    type:constants.CHANGE_COMMENTS,
    value:comments,
});
export const changeCommentDefault = {
    type:constants.CHANGE_COMMENTS,
    value:"",
};
export const changeMdlIsVisible = (val) => ({
    type:constants.CHANGE_MODAL_VISIBLE,
    value:val,
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
                    dispatch(getBindUsersForManager(res.data,1));
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const getBindUsersForManager = (managerId,pageCode)=>{
    return (dispatch) => {
        let param = new URLSearchParams();
        param.append("managerId",managerId);
        param.append("pageCode",pageCode);
        axios.post(config.DOMAIN_NAME+'/get-bind-users-for-manager',param)
            .then((res) => {
                if(res.data.success){
                    dispatch(changeCstData(res.data.data));
                    dispatch(changePageCode(pageCode));
                    dispatch(changeTotalData(res.data.total));
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

export const addComment = (managerId,userId,comment) => {
    return (dispatch) => {
        let param = {"managerId":managerId,"userId":userId,"comment":comment}
        axios.post(config.DOMAIN_NAME+'/add-comment',param)
            .then((res) => {
                if(res.data.data){
                    message.success("评价成功！");
                    dispatch(changeMdlIsVisible(false));
                    dispatch(changeCommentDefault);
                    dispatch(changeNowFocusUserId(null));
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

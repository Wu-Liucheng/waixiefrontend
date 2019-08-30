import * as constants from './constants';
import axios from 'axios';
import {message,Modal} from "antd";
import * as config from '../../../config';
const confirm = Modal.confirm;
export const changeIsFirstPage = (isFirst) => ({
    type:constants.CHANGE_IS_FIRST_PAGE,
    value:isFirst
});
export const registerChangeUsername = (username) => ({
    type:constants.REGISTER_CHANGE_USERNAME,
    value:username,
});
export const registerChangePwd = (pwd) => ({
    type:constants.REGISTER_CHANGE_PASSWORD,
    value:pwd,
});
export const regsterChangeEmail = (email) => ({
    type:constants.REGISTER_CHANGE_EMAIL,
    value:email,
});
export const registerChangeIdentifyCode = (identifyCode) => ({
    type:constants.REGISTER_CHANGE_IDENTIFYCODE,
    value:identifyCode,
});
export const registerChangeName = (val) => ({
    type:constants.REGISTER_CHANGE_NAME,
    value:val,
});
export const registerChangeSex = (val) => ({
    type:constants.REGISTER_CHANGE_SEX,
    value:val,
});
export const registerChangePhone = (phone) => ({
    type:constants.REGISTER_CHANGE_PHONE,
    value:phone,
});
export const registerChangeQQNumber = (qq) => ({
    type:constants.REGISTER_CHANGE_QQ,
    value:qq,
});
export const registerChangeIsSent = (val) => ({
    type:constants.REGISTER_CHANGE_IS_SNET,
    value:val,
});
export const registerChangeSICI = (interval) => ({
    type:constants.REGISTER_CHANGE_SEND_IDENTIFY_CODE_INTERVAL,
    value:interval,
});
export const registerReset = {
    type:constants.REGISTER_RESET,
};
export const registerChangeUsernameIsExist = (val) => ({
    type:constants.REGISTER_CHANGE_USERNAME_IS_EXIST,
    value:val,
});
export const registerChangeReturnFlag = (val) => ({
    type:constants.REGISTER_CHANGE_RETURN_FLAG,
    value:val,
});
export const registerCheckUsernameIsExist = (username) => {
    return (dispatch) => {
        let param = new URLSearchParams();
        param.append("username",username);
        axios.post(config.DOMAIN_NAME+'/login_name_is_existed',param).then((res) => {
            if(res.data){
                message.error("此用户名已存在");
            }
            dispatch(registerChangeUsernameIsExist(res.data))
        })
    }
};
export const registerSendIdentifyCode = (email) => {
    return (dispatch) => {
        let param = new URLSearchParams();
        param.append("email",email);
        confirm({
            title:"即将发送验证码至邮箱"+email,
            content:"是否确定？",
            onOk(){
                axios.post(config.DOMAIN_NAME+"/send_register_vertification",param
                ).then((res) => {
                    if(res.data.data){
                        message.info("验证码已发送至"+email);
                        dispatch(registerChangeIsSent(true));
                        dispatch(registerChangeSICI(60));
                    }
                    else {
                        message.info(res.data.info);
                    }
                }).catch((err) => {
                    message.error(err);
                });
            },
            onCancel(){

            }
        });
    }
};
export const registerCheckIdentifyCode = (email,ic) => {
    return (dispatch) => {
        let param = new URLSearchParams();
        param.append("email",email);
        param.append("identifyCode",ic);
        axios.post(config.DOMAIN_NAME+"/register_check_verify_code",param)
            .then((res) => {
            if(res.data.data){
                dispatch(changeIsFirstPage(false));
            }
            else {
                message.error(res.data.info);
            }
        })
    }
};
export const registerAction= (username,pwd,email,_name,sex,phone,qq) => {
    return (dispatch) => {
        let param = new URLSearchParams();
        param.append("username",username);
        param.append("password",pwd);
        param.append("email",email);
        param.append("name",_name);
        param.append("sex",sex);
        param.append("phone",phone);
        param.append("qq",qq);
        axios.post(config.DOMAIN_NAME+"/register_action",param).then((res) => {
            if(res.data.data){
                message.success("注册成功！");
                dispatch(registerChangeReturnFlag(true));
                dispatch(registerReset);
            }
            else
            {
                message.info(res.data.info);
            }
        }).catch((err) => {
            message.error(err);
        })
    }
};

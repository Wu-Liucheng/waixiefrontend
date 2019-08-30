import * as constants from './constants';
import axios from 'axios';
import {message,Modal} from 'antd';
import * as config from '../../../config';
const confirm = Modal.confirm;
export const forgetChangeUsername = (username) => ({
    type:constants.FORGET_CHANGE_USERNAME,
    value:username,
});

export const forgetChangeIdentifyCode = (ic) => ({
    type:constants.FORGET_CHANGE_IDENTIFY_CODE,
    value:ic,
});

export const forgetChangeNewPwd_0 = (pwd) => ({
    type:constants.FORGET_CHANGE_NEW_PWD_0,
    value:pwd
});

export const forgetChangeNewPwd_1 = (pwd) => ({
    type:constants.FORGET_CHANGE_NEW_PWD_1,
    value:pwd
});

export const forgetChangeUsernameLegal = (val) => ({
    type:constants.FORGET_CHANGE_USERNAME_LEGAL,
    value:val,
});

export const forgetChangeIdentifyCodeLegal = (val) => ({
    type:constants.FORGET_CHANGE_IDENTIFY_CODE_LEGAL,
    value:val,
});

export const forgetChangeNewPwdLegal = (val) => ({
    type:constants.FORGET_CHANGE_NEW_PWD_LEGAL,
    value:val,
});

export const forgetChangeIsSent = (val) => ({
    type:constants.FORGET_CHANGE_IS_SENT,
    value:val,
});

export const forgetChangeInterval = (interval) => ({
    type:constants.FORGET_CHANGE_SEND_IDENTIFY_CODE_INTERVAL,
    value:interval,
});

export const forgetReturnFlag = (val) => ({
    type:constants.FORGET_CHANGE_RETURN_FLAG,
    value:val,
});

export const forgetReset = {
    type:constants.FORGET_RESET
};

export const sendIdentifyCodeByUsername = (username) => {
    return (dispatch) => {
        let param = new URLSearchParams();
        param.append("username",username);
        confirm({
            title:"即将发送验证码至用户"+username+"的验证邮箱",
            content:"是否确定？",
            onOk(){
                axios.post(config.DOMAIN_NAME+'/send_change_password_verify_code',
                    param
                ).then((res) => {
                    if(res.data.data)
                    {
                        message.success(res.data.info);
                        dispatch(forgetChangeIsSent(true))
                    }
                    else
                    {
                        dispatch(forgetChangeUsernameLegal(true));
                        message.error(res.data.info);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        })
    }
};
export const forgetChangePasswordAction = (username,ic,newPwd) => {
    return (dispatch) => {
        let param = new URLSearchParams();
        param.append("username",username);
        param.append("identify",ic);
        param.append("pwd",newPwd);
        axios.post(config.DOMAIN_NAME+'/change-pwd',param).then((res) => {
            if(res.data.data)
            {
                message.info(res.data.info);
                dispatch(forgetReturnFlag(true));
                dispatch(forgetReset);
            }
            else
            {
                message.error(res.data.info);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
};
import * as constants from './constants'
import axios from 'axios';
import {message} from "antd";
import * as config from '../../../config';
export const adminLoginChangeUsername = (username) => ({
    type:constants.ADMIN_LOGIN_CHANGE_USERNAME,
    value:username,
});
export const adminLoginChangePassword = (password) => ({
    type:constants.ADMIN_LOGIN_CHANGE_PASSWORD,
    value: password,
});
export const adminLoginChangeStatus = (val) => ({
    type:constants.ADMIN_LOGIN_CHANGE_LOGIN_STATUS,
    value:val,
});
export const adminLoginChangeRole = (val) => ({
    type:constants.ADMIN_LOGIN_CHANGE_ROLE,
    value:val,
});
export const adminLoginLoginAction = (username,password,role) => {
    return (dispatch) => {
        let params = new URLSearchParams();
        params.append("username",username);
        params.append("password",password);
        params.append("role",role);
        axios.post(config.DOMAIN_NAME+'/admin-login',params).then((res) => {
            if(res.data.data){
                message.success("登录成功！");
                dispatch(adminLoginChangeUsername(username));
                dispatch(adminLoginChangeRole(role));
                dispatch(adminLoginChangeStatus(true));
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
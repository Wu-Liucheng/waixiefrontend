/*
* @Author:Wuliucheng
* @Description:creat actions in login
* @Date:2019-3-20
* */
import * as constants from './constants';
import axios from 'axios';
import {message} from 'antd';
import * as config from '../../../config';
export const changeAccountValue = (value) => ({
    type:constants.CHANGE_ACCOUNT_VALUE,
    accountValue:value,
});
export const changePasswordValue = (value) => ({
    type:constants.CHANGE_PASSWORD_VALUE,
    passwordValue:value,
});
export const changeLoginStatus = (value) => ({
    type:constants.CHANGE_LOGIN_STATUS,
    loginStatus:value,
});
export const changeShowMsg = (value) => ({
    type:constants.CHANGE_SHOW_MSG,
    msg:value,
});
export const login = (accountValue,passwordValue) => {
    return (dispatch) => {
        if(passwordValue.length === 0 || accountValue.length === 0)
        {
            message.info("请输入完整的登录信息~");
        }

        else if(passwordValue.length < 8)
        {
            dispatch(changeLoginStatus(false));
            message.error("账号或密码错误！")
        }
        else
        {
            let param = new URLSearchParams();
            param.append("type","login");
            param.append("account",accountValue);
            param.append("password",passwordValue);
            axios.post(config.DOMAIN_NAME+'/login_action',param).then((res) => {
                const result = res.data;
                if(!result)
                {
                    message.error("账号或密码错误！")
                }
                dispatch(changeLoginStatus(result))
            }).catch((error) => {
                console.log(error)
            })
        }

    }
};
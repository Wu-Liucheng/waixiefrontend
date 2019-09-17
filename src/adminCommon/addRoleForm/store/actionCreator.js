import * as constants from './constants'
import axios from 'axios';
import {fromJS} from "immutable";
import {message} from "antd";
import * as config from '../../../config';
import {actionCreator as adminInfoActionCreator} from '../../adminInfo/store';
export const changeClientInfo = (info) => ({
    type:constants.CHANGE_CLIENT_INFO,
    value:fromJS(info),
});
export const getAllClientInfo = () => {
    return (dispatch) => {
        axios.get(config.DOMAIN_NAME+'/project-get-all-clients')
            .then((res)=> {
                dispatch(changeClientInfo(res.data));
            })
            .catch((err)=>{
                console.log(err);
            })
    }
};

export const addRoleAction = (loginName,password,email,phone,name,role,clientId,operateName,pageCode)=>{
    return (dispatch) => {
        let cipher = config.ciphertext();
        let param = new URLSearchParams();
        param.append("key",cipher.key);
        param.append("value",cipher.value);
        param.append("loginName",loginName);
        param.append("password",password);
        param.append("email",email);
        param.append("phone",phone);
        param.append("name",name);
        param.append("role",role);
        param.append("clientId",clientId);
        param.append("operateName",operateName);
        axios.post(config.DOMAIN_NAME+'/add-admin',param)
            .then((res)=>{
                if(res.data.data){
                    message.success("添加成功！");
                    switch (role) {
                        case 1:
                            dispatch(adminInfoActionCreator.getManagerData(pageCode));
                            break;
                        case 2:
                            dispatch(adminInfoActionCreator.getCheckerData(pageCode));
                            break;
                        case 3:
                            dispatch(adminInfoActionCreator.getCorporateAdminData(pageCode));
                            break;
                        default:break;
                    }
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
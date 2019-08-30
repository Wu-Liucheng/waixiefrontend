import * as constants from './constants';
import {fromJS} from 'immutable';
import axios from 'axios';
import {message} from "antd";
import * as config from '../../../config';
export const changeProcessData = (data)=>({type:constants.MAKE_PROCESS_CHANGE_PROCESS_DATA,value:fromJS(data)});
export const changeCurrentPageCode = (code)=>({type:constants.MAKE_PROCESS_CHANGE_CURRENT_PAGE_CODE,value:code});
export const changeTotal = (total)=>({type:constants.MAKE_PROCESS_CHANGE_TOTAL,value:total});
export const changeModalIsVisible = (val)=>({type:constants.MAKE_PROCESS_CHANGE_MODAL_IS_VISIBLE,value:val});
export const changeClientId = (id) => ({type:constants.MAKE_PROCESS_CHANGE_CLIENT_ID,value:id});
export const changeCheckerId = (id) => ({type:constants.MAKE_PROCESS_CHANGE_CHECKER_ID,value:id});
export const changeClientInfo = (info) => ({type:constants.MAKE_PROCESS_CHANGE_CLIENT_INFO,value:fromJS(info)});
export const changeCheckerInfo = (info) => ({type:constants.MAKE_PROCESS_CHANGE_CHECKER_INFO,value:fromJS(info)});

export const processNodeGetOnePageInfo = (pageCode)=>{
    return(dispatch)=>{
        axios.get(config.DOMAIN_NAME+'/get-one-page-process-node',{params:{"pageCode":pageCode}})
            .then((res)=>{
                if(res.data.success)
                {
                    dispatch(changeProcessData(res.data.info));
                    dispatch(changeCurrentPageCode(pageCode));
                    dispatch(changeTotal(res.data.total));
                }
                else{
                    message.error("获取结点信息失败！");
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }
};
export const makeProcessGetAllClientSimplyInfo = () => {
    return (dispatch) => {
        axios.get(config.DOMAIN_NAME + '/project-get-all-clients').then((res)=>{
            dispatch(changeClientInfo(res.data));
        }).catch((err) => {
            console.log(err);
        })
    }
};
export const makeProcessGetClientInfoByAdminName = (loginName) => {
    return (dispatch) => {
        axios.get(config.DOMAIN_NAME+'/make-process-get-client-by-admin-name',{params:{"loginName":loginName}})
            .then((res)=>{
                dispatch(changeClientInfo(res.data));
            }).catch((err)=>{
                console.log(err);
        })
    }
};
export const makeProcessGetAllChecker = ()=>{
    return (dispatch) => {
        axios.get(config.DOMAIN_NAME+'/get-all-checker').then((res)=>{
            dispatch(changeCheckerInfo(res.data))
        }).catch((err)=>{
            console.log(err);
        })
    }
};

export const addNode = (clientId,checkId,pageCode)=>{
    return (dispatch)=>{
        let param = {"clientId":clientId,"checkerId":checkId};
        axios.post(config.DOMAIN_NAME+'/add-node',param)
            .then((res)=>{
                if(res.data.data){
                    dispatch(changeModalIsVisible(false));
                    dispatch(processNodeGetOnePageInfo(pageCode));
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
export const verifyClientAdmin = (username,clientId,checkerId,pageCode) => {
    return (dispatch)=>{
        let param = {"loginName":username,"clientId":clientId};
        axios.post(config.DOMAIN_NAME+'/verify-client-admin',param)
            .then((res)=>{
                if(res.data){
                    dispatch(deleteNode(clientId,checkerId,pageCode));
                }
                else{
                    message.error("这不是您所属公司结点!");
                }
            })
            .catch((err)=>{console.log(err);})
    }
};
export const deleteNode = (clientId,checkerId,pageCode) =>{
    return (dispatch)=>{
        let param = {"clientId":clientId,"checkerId":checkerId};
        axios.post(config.DOMAIN_NAME+'/delete-node',param)
            .then((res)=>{
                if(res.data.data){
                    message.info("已删除结点！");
                    dispatch(processNodeGetOnePageInfo(pageCode));
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
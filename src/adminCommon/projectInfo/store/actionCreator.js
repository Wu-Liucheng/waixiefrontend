import * as constants from './constants'
import axios from 'axios';
import {message} from "antd";
import {fromJS} from "immutable";
import * as config from '../../../config';
import {actionCreator as modalDemandActionCreator} from "../../modalDemand/store";


export const projectMainChangeModalIsVisible = (val) => ({type:constants.PROJECT_MAIN_CHANGE_MODAL_VISIBLE,value:val});
export const projectMainChangeModalStatus = (val) => ({type:constants.PROJECT_MAIN_CHANGE_MODAL_STATUS,value:val});
export const projectMainChangeData = (data) => ({type:constants.PROJECT_MAIN_CHANGE_DATA,value:fromJS(data)});
export const projectMainChangeDataTotal = (total) => ({type:constants.PROJECT_MAIN_CHANGE_TOTAL,value:total});
export const projectMainChangeChangePageCode = (code) => ({type:constants.PROJECT_MAIN_CHANGE_PAGE_CODE,value:code});

export const projectMainChangeId = (id) => ({type:constants.PROJECT_MAIN_CHANGE_ID,value:id});
export const projectMainChangeName = (name) => ({type:constants.PROJECT_MAIN_CHANGE_NAME,value:name});
export const projectMainChangeNumber = (number) => ({type:constants.PROJECT_MAIN_CHANGE_NUMBER,value:number});
export const projectMainChangeStatus = (status) => ({type:constants.PROJECT_MAIN_CHANGE_STATUS,value:status});
export const projectMainChangeStartDate = (startDate) => ({type:constants.PROJECT_MAIN_CHANGE_START_DATE,value:startDate});
export const projectMainChangeEndDate = (endDate) => ({type:constants.PROJECT_MAIN_CHANGE_END_DATE,value:endDate});
export const projectMainChangeCorporateInfo = (info) => ({type:constants.PROJECT_MAIN_CHANGE_CORPORATE_INFO,value:fromJS(info)});
export const projectMainChangeManagerInfo = (info) => ({type:constants.PROJECT_MAIN_CHANGE_MANAGER_INFO,value:fromJS(info)});
export const projectMainChangeClientId = (id) => ({type:constants.PROJECT_MAIN_CHANGE_CLIENT_ID,value:id});
export const projectMainChangeManagerId = (id) => ({type:constants.PROJECT_MAIN_CHANGE_MANAGER_ID,value:id});

export const projectChangeIsYourself = (val) => ({type:constants.PROJECT_MAIN_CHANGE_IS_YOURSELF,value:val});

export const projectMainSetDataDefault = {type:constants.PROJECT_MAIN_SET_DEFAULT,value:null};


export const projectMainGetOnePageClientInfo = (pageCode) => {
    return (dispatch) => {
        axios.get(config.DOMAIN_NAME+'/get-one-page-projects',{
            params:{"pageCode":pageCode}
        }).then((res)=>{
            if(res.data.success){
                dispatch(projectMainChangeData(res.data.projects));
                dispatch(projectMainChangeDataTotal(res.data.total));
                dispatch(projectMainChangeChangePageCode(pageCode));
            }
            else {
                message.error("获取数据失败！");
            }
        }).catch((err) => {
            console.log(err);
        })
    }
};
export const projectMainGetOnePageClientInfoAboutYourself=(pageCode,username)=>{
    return (dispatch)=>{
        axios.get(config.DOMAIN_NAME+'/get-one-page-projects-yourself',{params:{"pageCode":pageCode,"username":username}})
            .then((res) => {
                if(res.data.success){
                    dispatch(projectMainChangeData(res.data.projects));
                    dispatch(projectMainChangeDataTotal(res.data.total));
                    dispatch(projectMainChangeChangePageCode(pageCode));
                }
            })
    }
};
export const projectMainGetOne = (id) => {
    return (dispatch) => {
        axios.get(config.DOMAIN_NAME+'/get-one-project',{
            params:{"id":id}
            }
        ).then((res) => {
            // console.log(res.data);
            dispatch(projectMainChangeId(res.data.id));
            dispatch(projectMainChangeName(res.data.name));
            dispatch(projectMainChangeNumber(res.data.number));
            dispatch(projectMainChangeStatus(res.data.status));
            dispatch(projectMainChangeStartDate(res.data.startDate));
            dispatch(projectMainChangeEndDate(res.data.endDate));
            dispatch(projectMainChangeCorporateInfo(res.data.corporateInfo));
            dispatch(projectMainChangeManagerInfo(res.data.managerInfo));
            dispatch(projectMainChangeClientId(res.data.corporateInfo[0]==null?null:res.data.corporateInfo[0].split(":")[0]));
            dispatch(projectMainChangeManagerId(res.data.managerInfo[0]==null?null:res.data.managerInfo[0].split(":")[0]));
        }).catch((err)=>{
            console.log(err);
        })
    }
};

export const verifyProjectManager = (username,projectId) => {
    return (dispatch) => {
        let param = new URLSearchParams();
        param.append("username",username);
        param.append("projectId",projectId);
        axios.post(config.DOMAIN_NAME+'/verify-project-manager',param).then((res)=> {
            if(res.data === true)
            {
                dispatch(projectMainGetOne(projectId));
                dispatch(projectMainChangeModalIsVisible(true));
                dispatch(projectMainChangeModalStatus(0));
            }
            else
            {
                message.error("这不是您的项目！");
            }
        }).catch((err)=> {
            console.log(err);
        })
    }
};

export const verifyProjectManagerHasAuthority = (username,projectId)=>{
    return (dispatch) => {
        let param = new URLSearchParams();
        param.append("username",username);
        param.append("projectId",projectId);
        axios.post(config.DOMAIN_NAME+'/verify-project-manager',param).then((res)=> {
            if(res.data === true)
            {
                dispatch(modalDemandActionCreator.modalDemandChangeIsVisible(true));
            }
            else
            {
                message.error("这不是您的项目！");
            }
        }).catch((err)=> {
            console.log(err);
        })
    }
};

export const updateProjectInfo = (id,name,number,status,startDate,endDate,projectDataPageCode,isYourselfProject,username) => {
    return (dispatch) => {
        let project = {"id":id,"name":name,"number":number,"status":status,"startDate":startDate,"endDate":endDate};
        console.log(project);
        axios.post(config.DOMAIN_NAME+'/update-project',project).then((res)=>{
            if(res.data.data){
                message.success("更新项目信息成功！");
                if(isYourselfProject)
                {
                    dispatch(projectMainGetOnePageClientInfoAboutYourself(projectDataPageCode,username));
                }
                else
                {
                    dispatch(projectMainGetOnePageClientInfo(projectDataPageCode));
                }
                dispatch(projectMainChangeModalIsVisible(false));
            }
            else
            {
                message.error(res.data.info);
            }
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const projectGetAllClientSimplyInfo = () => {
    return (dispatch) => {
        axios.get(config.DOMAIN_NAME + '/project-get-all-clients').then((res)=>{
            dispatch(projectMainChangeCorporateInfo(res.data));
        }).catch((err) => {
            console.log(err);
        })
    }
};

export const projectManagersBelongToAClient = (clientId) => {
    return (dispatch) => {
        axios.get(config.DOMAIN_NAME + '/project-get-a-clients-managers',{params:{"clientId":clientId}})
            .then((res) => {
                console.log(res.data);
                dispatch(projectMainChangeManagerInfo(res.data));
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const projectSetCorporateInfoAndManagerInfoByUsername = (username) => {
    return (dispatch) => {
        axios.get(config.DOMAIN_NAME+'/project-get-a-manager',{params:{"username":username}})
            .then((res)=>{
                dispatch(projectMainChangeCorporateInfo(res.data.clientInfo));
                dispatch(projectMainChangeManagerInfo(res.data.managerInfo));
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

export const projectAdd = (name,number,managerId,startDate,endDate,status,clientId,pageCode,isYourselfProject,username)=>{
    return (dispatch) => {
        let project = {"name":name,"number":number,"managerId":managerId,"startDate":startDate,"endDate":endDate,
        "status":status,"clientId":clientId};
        if(managerId==null||clientId == null)
        {
            message.error("请补全项目所属信息！！");
            return;
        }
        axios.post(config.DOMAIN_NAME+'/project-add',project).then((res) => {
            if(res.data.data){
                message.success("添加成功！");
                if(isYourselfProject)
                {
                    dispatch(projectMainGetOnePageClientInfoAboutYourself(pageCode,username));
                }
                else
                {
                    dispatch(projectMainGetOnePageClientInfo(pageCode));
                }
                dispatch(projectMainChangeModalIsVisible(false));
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
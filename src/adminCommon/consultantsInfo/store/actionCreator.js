import * as constants from './constants'
import axios from 'axios';
import {message} from "antd";
import {fromJS} from "immutable";
import * as config from '../../../config';
export const adminMainChangeConsultantData = (data) => ({
    type:constants.ADMIN_MAIN_CHANGE_CONSULTANT_DATA,
    value:fromJS(data),
});
export const adminMainChangeConsultantDataTotal = (total) => ({
    type:constants.ADMIN_MAIN_CHANGE_CONSULTANT_DATA_TOTAL,
    value:total,
});
export const adminMainChangeConsultantDataPageCode = (code) => ({
    type:constants.ADMIN_MAIN_CHANGE_CONSULTANT_DATA_PAGE_CODE,
    value:code,
});
export const consultantInfoChangeModalIsVisible = (val) => ({
    type:constants.ADMIN_CONSULTANT_INFO_MODAL_IS_VISIBLE,
    value:val,
});

export const consultantInfoChangeId = (value) => ({type:constants.CHANGE_ID,value:value});
export const consultantInfoChangeEmail = (val) => ({type:constants.CHANGE_EMAIL,value:val});
export const consultantInfoChangeName = (val) => ({type:constants.CHANGE_NAME,value:val});
export const consultantInfoChangeMobile = (val) => ({type:constants.CHANGE_MOBILE,value:val});
export const consultantInfoChangeEmployYears = (val) => ({type:constants.CHANGE_EMPLOY_YEARS,value:val});
export const consultantInfoChangeEstimateLevel = (val) => ({type:constants.CHANGE_ESTIMATE_LEVEL,value:val});
export const consultantInfoChangeEmployNumber = (val) => ({type:constants.CHANGE_EMPLOY_NUMBER,value:val});
export const consultantInfoChangePlanDate = (val) => ({type:constants.CHANGE_PLAN_DATE,value:val});
export const consultantInfoChangeCommunicateDate = (val) => ({type:constants.CHANGE_COMMUNICATE_DATE,value:val});
export const consultantInfoChangeCommunicatePerson = (val) => ({type:constants.CHANGE_COMMUNICATE_PERSON,value:val});
export const consultantInfoChangeLocation = (val) => ({type:constants.CHANGE_LOCATION,value:val});
export const consultantInfoChangeOtherInfo = (val) => ({type:constants.CHANGE_OTHER_INFO,value:val});

export const adminMainGetConsultantInfo = (pageCode) => {
    return (dispatch) => {
        axios.get(config.DOMAIN_NAME+'/get-one-page-consultants',{
            params:{"pageCode":pageCode}
        }).then((res) =>{
            if(res.data.success){
                dispatch(adminMainChangeConsultantData(res.data.consultants));
                dispatch(adminMainChangeConsultantDataTotal(res.data.total));
            }
            else {
                message.error("获取数据失败!");
            }
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const adminGetOneConsultantInfo = (id) => {
    return (dispatch) => {
        axios.get(config.DOMAIN_NAME+'/admin-get-resume',{
            params:{"id":id}
        }).then((res) => {
            dispatch(consultantInfoChangeId(res.data.id));
            dispatch(consultantInfoChangeEmail(res.data.email));
            dispatch(consultantInfoChangeName(res.data.name));
            dispatch(consultantInfoChangeMobile(res.data.mobile));
            dispatch(consultantInfoChangeEmployYears(res.data.employYears));
            dispatch(consultantInfoChangeEstimateLevel(res.data.estimateLevel));
            dispatch(consultantInfoChangeEmployNumber(res.data.employNumber));
            dispatch(consultantInfoChangePlanDate(res.data.planDate));
            dispatch(consultantInfoChangeCommunicateDate(res.data.communicateDate));
            dispatch(consultantInfoChangeCommunicatePerson(res.data.communicatePerson));
            dispatch(consultantInfoChangeLocation(res.data.location));
            dispatch(consultantInfoChangeOtherInfo(res.data.otherInfo));
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const saveConsultantInfo = (nowPage,id,email,name,mobile,employYears,estimateLevel,employNumber,planDate,communicateDate,communicatePerson
,location,otherInfo) => {
    return (dispatch) => {
        let p = /^[1][3,4,5,7,8][0-9]{9}$/i;
        var b = p.test(mobile);
        if(!b){
            message.error("手机号格式不正确！");
        }
        else if(otherInfo.length > 250){
            message.error("其他信息超出字数限制（250字上限）");
        }
        else {
            let params = new URLSearchParams();
            params.append("id",id);params.append("email",email);params.append("name",name);
            params.append("mobile",mobile);params.append("employYears",employYears);
            params.append("estimateLevel",estimateLevel);params.append("employNumber",employNumber);
            params.append("planDate",planDate);params.append("communicateDate",communicateDate);
            params.append("communicatePerson",communicatePerson);params.append("location",location);
            params.append("otherInfo",otherInfo);
            axios.post(config.DOMAIN_NAME+'/admin-save-resume',params).then((res) => {
                if(res.data.data){
                    message.success("保存成功！");
                    dispatch(consultantInfoChangeModalIsVisible(false));
                    dispatch(adminMainGetConsultantInfo(nowPage));
                }
                else {
                    message.error(res.data.info);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }
};
export const adminDeleteOneConsultant = (nowPage,id) => {
    return (dispatch) => {
        let params = new URLSearchParams();
        params.append("id",id);
        axios.post(config.DOMAIN_NAME+'/admin-delete-user',params).then((res) => {
            if(res.data.data){
                message.info("已删除");
                dispatch(adminMainGetConsultantInfo(nowPage));
            }
            else {
                message.error(res.data.info);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
};

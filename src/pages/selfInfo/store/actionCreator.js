import * as constants from './constants';
import axios from 'axios';
import {message} from "antd";
import * as config from '../../../config';
export const changeInfoModule = (oneValue) => ({
    type:constants.CHANGE_IS_BASE_INFO_PAGE,
    value:oneValue,
});
export const selfChangeName = (name) => ({
    type:constants.SELF_CHANGE_NAME,
    value:name,
});
export const selfChangeEmail = (email) => ({
    type:constants.SELF_CHANGE_EMAIL,
    value:email,
});
export const selfChangeUsername = (username) => ({
    type:constants.SELF_CHANGE_USERNAME,
    value:username,
});
export const selfChangeQQ = (qq) => ({
    type:constants.SELF_CHANGE_QQ,
    value:qq,
});
export const selfChangeEmployYears = (years) => ({
    type:constants.SELF_CHANGE_EMPLOY_YEARS,
    value:years,
});
export const  selfChangePhone = (phone) => ({
    type:constants.SELF_CHANGE_PHONE,
    value:phone,
});
export const selfChangeGoodAt = (goodAt) => ({
    type:constants.SELF_CHANGE_GOOD_AT,
    value:goodAt,
});
export const selfChangeEstimateLevel = (level) => ({
    type:constants.SELF_CHANGE_ESTIMATE_LEVEL,
    value:level,
});
export const selfChangePlanDate = (date) => ({
    type:constants.SELF_CHANGE_PLAN_DATE,
    value:date,
});
export const selfChangeCommunicateDate = (date) => ({
    type:constants.SELF_CHANGE_COMMUNICATE_DATE,
    value:date,
});
export const selfChangeIsBeingUsed = (val) => ({
    type:constants.SELF_CHANGE_IS_BEING_USED,
    value:val,
});
export const selfChangeCommunicatePerson = (person) => ({
    type:constants.SELF_CHANGE_COMMUNICATE_PERSON,
    value:person,
});
export const selfChangeEmployNumber = (number) => ({
    type:constants.SELF_CHANGE_EMPLOY_NUMBER,
    value:number,
});
export const selfChangeIdealSalary = (salary) => ({
    type:constants.SELF_CHANGE_IDEAL_SALARY,
    value:salary,
});
export const selfChangeIdNumber = (idNumber) => ({
    type:constants.SELF_CHANGE_ID_NUMBER,
    value:idNumber,
});
export const selfChangeBirth = (birth) => ({
    type:constants.SELF_CHANGE_BIRTH,
    value:birth,
});
export const selfChangeDegree = (degree) => ({
    type:constants.SELF_CHANGE_DEGREE,
    value:degree,
});
export const selfChangePriceUnit = (unit) => ({
    type:constants.SELF_CHANGE_PRICE_UNIT,
    value:unit,
});
export const selfChangeSchool = (school) => ({
    type:constants.SELF_CHANGE_SCHOOL,
    value:school,
});
export const selfChangeSex = (val) => ({
    type:constants.SELF_CHANGE_SEX,
    value:val,
});
export const selfChangeLocation = (location) => ({
    type:constants.SELF_CHANGE_LOCATION,
    value:location,
});
export const selfChangeOtherInfo = (other) => ({
    type:constants.SELF_CHANGE_OTHER_INFO,
    value:other,
});
export const selfChangeAll = (info) => ({
    type:constants.SELF_CHANGE_ALL,
    value:info,
});
export const selfGetInfo = (username) => {
    return (dispatch) => {
        axios.get(config.DOMAIN_NAME+'/get-self-info',{
            params:{
                username:username,
            }
        }).then((res) => {
            if(res.data.success)
            {
                dispatch(selfChangeAll(res.data.data.selfInfo));
            }
        }).catch((err) => {
            console.log(err);
        })
    }
};
export const selfSave = (name,email,username,qq,employYears,phone,goodAt,estimateLevel,
planDate,communicateDate,isBeingUsed,communicatePerson,employNumber,idealSalary,idNumber,
birth,degree,priceUnit,school,sex,location,otherInfo) => {
    return (dispatch) => {
        let param = new URLSearchParams();
        param.append("name",name);param.append("email",email);param.append("loginName",username);
        param.append("phone",phone);param.append("estimateLevel",estimateLevel);
        param.append("goodAt",goodAt);
        param.append("qq",qq);param.append("employYears",employYears);param.append("planDate",planDate.toString());
        param.append("communicateDate",communicateDate.toString());param.append("isBeingUsed",isBeingUsed);
        param.append("communicatePerson",communicatePerson);param.append("employNumber",employNumber);
        param.append("idealSalary",idealSalary===""?0:idealSalary);
        param.append("idNumber",idNumber);
        param.append("birth",birth.toString());param.append("degree",degree);param.append("priceUnit",priceUnit);
        param.append("school",school);param.append("sex",sex);param.append("location",location);
        param.append("otherInfo",otherInfo);
        axios.post(config.DOMAIN_NAME+'/save-self-info',param/*{
            params:{
                name:name,email:email,username:username,qq:qq,employYears:employYears,
                phone:phone,goodAt:goodAt,estimateLevel:estimateLevel,planDate:planDate,
                communicateDate:communicateDate,isBeingUsed:isBeingUsed,communicatePerson:
                communicatePerson,employNumber:employNumber,idealSalary:idealSalary,idNumber:
                idNumber,birth:birth,degree:degree,priceUnit:priceUnit,school:school,sex:sex,
                location:location,otherInfo:otherInfo
            }}*/
        ).then((res) => {
            if(res.data.data)
            {
                message.success("保存成功!");
            }
            else
            {
                message.info("保存失败");
            }
        }).catch((err) => {
            console.log(err);
        });
    }
};

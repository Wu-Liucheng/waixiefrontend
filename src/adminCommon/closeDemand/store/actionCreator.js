import * as constants from './constants'
import axios from 'axios';
import {message} from "antd";
import {fromJS} from "immutable";
import * as config from '../../../config';
export const changeDemandData = (data) => ({
    type:constants.CHANGE_DEMAND_DATA,
    value:fromJS(data),
});
export const changeTotal = (total) => ({
    type:constants.CHANGE_TOTAL,
    value:total,
});
export const changeCurrentPageCode = (code) => ({
    type:constants.CHANGE_CURRENT_PAGE_CODE,
    value:code,
});
export const changeCheckerId = (id) => ({
    type:constants.CHANGE_CHECKER_ID,
    value:id,
});

export const setCheckerId = (username) => {
    return (dispatch)=>{
        axios.get(config.DOMAIN_NAME+'/get-checker-id',{params:{"loginName":username}})
            .then((res)=>{
                if(res.data === null){
                    message.error("权限不足！");
                }
                else {
                    dispatch(changeCheckerId(res.data));
                    dispatch(getDemandData(res.data,1));
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }
};

export const getDemandData = (id,pageCode) => {
    return (dispatch)=>{
        let param = new URLSearchParams();
        param.append("id",id);
        param.append("pageCode",pageCode);
        axios.post(config.DOMAIN_NAME+'/get-demand-apply-by-checker-id-close-modular',param)
            .then((res)=>{
                if(res.data.success){
                    dispatch(changeDemandData(res.data.data));
                    dispatch(changeCurrentPageCode(pageCode));
                    dispatch(changeTotal(res.data.total));
                }
                else {
                    message.error("获取失败！");
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }
};

export const changeIsOpened = (checkerId,demandId,status,pageCode) => {
    return (dispatch) => {
        let param = new URLSearchParams();
        param.append("checkerId",checkerId);
        param.append("demandId",demandId);
        param.append("status",status);
        axios.post(config.DOMAIN_NAME+"/change-demand-status",param)
            .then((res)=> {
                if(res.data.data){
                    message.success("操作成功！");
                    dispatch(getDemandData(checkerId,pageCode));
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

export const deleteDemand = (checkerId,demandId,pageCode)=>{
    return (dispatch) => {
        let param = new URLSearchParams();
        param.append("checkerId",checkerId);
        param.append("demandId",demandId);
        axios.post(config.DOMAIN_NAME+"/delete-demand",param)
            .then((res)=>{
                if(res.data.data){
                    message.success("已删除！");
                    dispatch(getDemandData(checkerId,pageCode));
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
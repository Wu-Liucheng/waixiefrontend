import * as constants from './constants';
import {fromJS} from 'immutable';
import axios from 'axios';
import {message} from "antd";
import * as config from '../../../config';
export const changeDemandApplyData = (data) => ({type:constants.DEMAND_APPLY_CHANGE_DATA,value:fromJS(data)});
export const changeCurrentPageCode = (code) => ({type:constants.DEMAND_APPLY_CHANGE_CURRENT_PAGE_CODE,value:code});
export const changeTotal = (total) => ({type:constants.DEMAND_APPLY_CHANGE_TOTAL,value:total});
export const changeCheckerId = (id) => ({type:constants.DEMAND_APPLY_CHANGE_CHECKER_ID,value:id});
export const changeModalIsVisible = (val) => ({type:constants.DEMAND_APPLY_CHANGE_MODAL_IS_VISIBLE,value:val});
export const changeModalStatus = (status) => ({type:constants.DEMAND_APPLY_CHANGE_MODAL_STATUS,value:status});
export const changeTips = (tips) => ({type:constants.DEMAND_APPLY_CHANGE_TIPS,value:tips});
export const changeFocusedDemandId = (id) => ({type:constants.DEMAND_CHANGE_FOCUSED_DEMAND_ID,value:id});

export const setCheckerId = (username) => {
    return (dispatch)=>{
        axios.get(config.DOMAIN_NAME+'/get-checker-id',{params:{"loginName":username}})
            .then((res)=>{
                if(res.data === null){
                    message.error("权限不足！");
                }
                else {
                    dispatch(changeCheckerId(res.data));
                    dispatch(getDemandApply(res.data,1));
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }
};

export const getDemandApply = (id,pageCode) => {
    return (dispatch)=>{
        let param = new URLSearchParams();
        param.append("id",id);
        param.append("pageCode",pageCode);
        axios.post(config.DOMAIN_NAME+'/get-demand-apply-by-checker-id',param)
            .then((res)=>{
                if(res.data.success){
                    dispatch(changeDemandApplyData(res.data.data));
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

export const updateDemandStatusByChecker = (isPassed,demandId,checkerId,tips,pageCode)=>{
    return (dispatch) => {
        let param = {"demandId":demandId,"checkerId":checkerId,"content":tips,"examineStatus":isPassed};
        axios.post(config.DOMAIN_NAME+'/update-demand-status-by-checker',param)
            .then((res)=>{
                if(res.data.data){
                    message.info("审核成功");
                    dispatch(changeModalIsVisible(false));
                    dispatch(getDemandApply(checkerId,pageCode));
                }
                else {
                    message.error(res.data.info);
                    dispatch(getDemandApply(checkerId,pageCode));
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }
};
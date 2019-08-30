import * as constants from './constants';
import * as mainConstants from '../../mainInterface/store/constants';
import axios from 'axios';
import {message} from "antd";
import {fromJS} from "immutable";
import * as config from '../../../config';
export const listsChangeNeedingLists = (lists) => ({
    type:constants.LISTS_CHANGE_NEEDING_LISTS,
    value:fromJS(lists),
});
export const listsChangeTotalPages = (number) => ({
    type:constants.LISTS_CHANGE_TOTAL_PAGES,
    value:number,
});
export const listsChangePageCode = (code) => ({
    type:constants.LISTS_CHANGE_PAGE_CODE,
    value:code,
});
export const listsChangeEmployType = (flag) => ({
    type:constants.LISTS_CHANGE_EMPLOY_TYPE,
    value:flag,
});
export const listsChangeJobExperience = (flag) => ({
    type:constants.LISTS_CHANGE_JOB_EXPERIENCE,
    value:flag,
});
export const listsChangeDemandDuration = (flag) => ({
    type:constants.LISTS_CHANGE_DEMAND_DURATION,
    value:flag,
});
export const listsChangeSalary = (flag) => ({
    type:constants.LISTS_CHANGE_SALARY,
    value:flag,
});
export const mainChangeFocusedID = (id) => ({
    type:mainConstants.MAIN_CHANGE_FOCUSED_PROJECT_ID,
    value:id,
});
export const listsInitialize = () => {
    return (dispatch) => {
        axios.get(config.DOMAIN_NAME+'/lists-info')
            .then((result) => {
                if(result.data.success)
                {
                    dispatch(listsChangeNeedingLists(result.data.data.lists));
                    dispatch(listsChangeTotalPages(result.data.data.totalPages));
                }
                else
                {
                    message.info("初始化失败");
                }
            }).catch((err) => {
                console.log(err);
        })
    }
};
export const listsRefreshWithConditions = (pageCode,employType,jobExperience,demandDuration,salary) =>{
    return (dispatch) => {
        axios.get(config.DOMAIN_NAME+'/lists-info-with-conditions',{
            params:{
                pageCode:pageCode,
                employType:employType,
                jobExperience:jobExperience,
                demandDuration:demandDuration,
                salary:salary,
            }
        }).then((result) => {
            if(result.data.success)
            {
                /*message.info("刷新成功");*/
                dispatch(listsChangeNeedingLists(result.data.data.lists));
                dispatch(listsChangeTotalPages(result.data.data.totalPages));
            }
            else
            {
                message.info("载入失败");
            }
        }).catch((err) => {
            console.log(err);
        })
    }
};
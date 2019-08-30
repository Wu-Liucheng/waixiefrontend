import * as constants from './constants';
import axios from 'axios';
import {message} from "antd";
import {fromJS} from "immutable";
import * as config from '../../../config';
import * as mainConstants from '../../mainInterface/store/constants';
export const personalChangeNeedingLists = (lists) => ({
    type:constants.PERSONAL_CHANGE_NEEDING_LISTS,
    value:fromJS(lists),
});
export const personalChangeTotalPages = (num) => ({
    type: constants.PERSONAL_CHANGE_TOTAL_PAGES,
    value:num,
});
export const personalChangePageCode = (code) => ({
    type:constants.PERSONAL_CHANGE_PAGE_CODE,
    value:code,
});
export const mainChangeFocusedID = (id) => ({
    type:mainConstants.MAIN_CHANGE_FOCUSED_PROJECT_ID,
    value:id,
});
export const personalInitialize = (username) => {
    return (dispatch) => {
        axios.get(config.DOMAIN_NAME+'/personal-lists',{
            params:{
                username,
            }
        }).then((res) => {
            if(res.data.success)
            {
                dispatch(personalChangeNeedingLists(res.data.data.lists));
                dispatch(personalChangeTotalPages(res.data.data.totalPages));
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
export const personalRefresh = (username,pageCode) => {
    return (dispatch) => {
        axios.get(config.DOMAIN_NAME+'/personal-lists-page-code',{
            params:{
                username,
                pageCode,
            }
        }).then((res) => {
            if(res.data.success)
            {
                dispatch(personalChangeNeedingLists(res.data.data.lists));
                dispatch(personalChangeTotalPages(res.data.data.totalPages));
            }
            else
            {
                message.info("请求失败");
            }
        }).catch((err) => {
            console.log(err);
        })
    }
};
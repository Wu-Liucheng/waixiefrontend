import * as constants from './constants'
import axios from 'axios';
import {message} from "antd";
import {fromJS} from "immutable";
import * as config from '../../../config';
export const clientChangeData = (data) => ({type:constants.CHANGE_CLIENT_DATA,value:fromJS(data)});
export const clientChangeDataTotal = (total) => ({type:constants.CHANGE_CLIENT_DATA_TOTAL,value:total});
export const clientChangeDataPageCode = (code) => ({type:constants.CHANGE_CLIENT_DATA_PAGE_CODE,value:code});
export const clientChangeModalIsVisible = (val) => ({type:constants.CHANGE_CLIENT_MODAL_IS_VISIBLE,value:val});
export const clientChangeClientModalStatus = (val) => ({type:constants.CHANGE_CLIENT_MODAL_STATUS,value:val});

export const clientGetOnePageClientInfo = (pageCode) => {
    return (dispatch) => {
        axios.get(config.DOMAIN_NAME+'/get-one-page-clients',{
            params:{"pageCode":pageCode}
        }).then((res) => {
            if(res.data.success)
            {
                dispatch(clientChangeData(res.data.clients));
                dispatch(clientChangeDataTotal(res.data.total));
                dispatch(clientChangeDataPageCode(pageCode));
            }
            else {
                message.error("获取数据失败");
            }
        })
    }
};

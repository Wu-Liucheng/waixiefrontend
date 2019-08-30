import * as constants from './constants';
import axios from 'axios';
import {message} from "antd";
import {fromJS} from "immutable";
import * as config from '../../../config';
export const detailChangeInfo = (info) => ({
    type:constants.DETAIL_CHANGE_INFO,
    value:fromJS(info),
});

export const detailGetInfo = (projectID,username) => {
    return (dispatch) => {
        let params = new URLSearchParams();
        params.append("projectID",projectID);
        params.append("username",username);
        axios.post(config.DOMAIN_NAME+'/detail-demand-info',params).then((res) => {
            if(res.data.success)
            {
                dispatch(detailChangeInfo(res.data.info));
            }
            else
            {
                message.error("获取信息失败");
            }
        }).catch((err) => {
            console.log(err);
        })
    }
};
export const detailSignUp = (projectID,username) => {
    return (dispatch) => {
        let params = new URLSearchParams();
        params.append("projectID",projectID);
        params.append("username",username);
        axios.post(config.DOMAIN_NAME+'/sign-up-action',params).then((res) => {
            if(res.data.data)
            {
                message.info("报名成功");
            }
            else
            {
                message.info(res.data.info);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
};
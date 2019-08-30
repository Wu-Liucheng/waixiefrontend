import * as constants from './constants';
import axios from 'axios';
import {message} from "antd";
import {fromJS} from "immutable";
import * as config from '../../../config';
export const mainChangeDemands = (demands) => ({
    type:constants.MAIN_CHANGE_DEMANDS,
    value:demands,
});
export const mainChangeFocusedID = (id) => ({
    type:constants.MAIN_CHANGE_FOCUSED_PROJECT_ID,
    value:id,
});
export const mainIntializePage = () => {
    return (dispatch) => {
        axios.get(config.DOMAIN_NAME+'/latest-demands')
            .then((res) => {
                if(res.data.success){
                    dispatch(mainChangeDemands(fromJS(res.data.demands)));
                }
                else
                {
                    message.info("获取信息失败");
                }
            })
    }
};
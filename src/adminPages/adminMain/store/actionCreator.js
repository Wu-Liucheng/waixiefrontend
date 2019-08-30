import * as constants from './constants'
// import axios from 'axios';
// import {message} from "antd";
import {fromJS} from "immutable";
// import * as config from '../../../config';
export const adminMainChangeCollapsed = (val) => ({
    type:constants.ADMIN_MAIN_CHANGE_COLLAPSED,
    value:val,
});
export const adminMainChangeMenuSelectedKeys = (keys) => ({
    type:constants.ADMIN_MAIN_CHANGE_MENU_SELECTED_KEYS,
    value:fromJS(keys),
});


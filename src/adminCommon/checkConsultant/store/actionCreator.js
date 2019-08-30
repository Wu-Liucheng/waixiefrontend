import * as constants from './constants';
import {fromJS} from "immutable";
import axios from 'axios';
import * as config from '../../../config';
import {message} from "antd";
export const changeSignUpData = (data) => ({
    type:constants.CHANGE_SIGN_UP_DATA,
    value:fromJS(data),
});
export const changeCurrentPageCode = (code) => ({
    type:constants.CHANGE_CURRENT_PAGE_CODE,
    value:code,
});
export const changeTotal = (total) => ({
    type:constants.CHANGE_TOTAL,
    value:total,
});
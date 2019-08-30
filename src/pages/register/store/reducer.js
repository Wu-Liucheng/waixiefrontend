import {fromJS} from "immutable";
import * as constants from './constants';

const defaultState = fromJS({
    isFirstPage:true,
    username:"",
    usernameIsExist:false,
    password:"",
    email:"",
    identifyCode:"",
    name:"",
    isMale:true,
    phone:"",
    QQnumber:"",
    isSent:false,
    sendIdentifyCodeInterval:60,
    returnFlag:false,
});

export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.CHANGE_IS_FIRST_PAGE:
            return state.set('isFirstPage',action.value);
        case constants.REGISTER_CHANGE_USERNAME:
            return state.set('username',action.value);
        case constants.REGISTER_CHANGE_USERNAME_IS_EXIST:
            return state.set('usernameIsExist',action.value);
        case constants.REGISTER_CHANGE_PASSWORD:
            return state.set('password',action.value);
        case constants.REGISTER_CHANGE_EMAIL:
            return state.set('email',action.value);
        case constants.REGISTER_CHANGE_IDENTIFYCODE:
            return state.set('identifyCode',action.value);
        case constants.REGISTER_CHANGE_NAME:
            return state.set('name',action.value);
        case constants.REGISTER_CHANGE_SEX:
            return state.set('isMale',action.value);
        case constants.REGISTER_CHANGE_PHONE:
            return state.set('phone',action.value);
        case constants.REGISTER_CHANGE_QQ:
            return state.set('QQnumber',action.value);
        case constants.REGISTER_CHANGE_IS_SNET:
            return state.set('isSent',action.value);
        case constants.REGISTER_CHANGE_SEND_IDENTIFY_CODE_INTERVAL:
            return state.set('sendIdentifyCodeInterval',action.value);
        case constants.REGISTER_RESET:
            return defaultState;
        case constants.REGISTER_CHANGE_RETURN_FLAG:
            return state.set('returnFlag',action.value);
        default:
            return state;
    }
}
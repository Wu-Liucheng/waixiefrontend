import {fromJS} from "immutable/dist/immutable";
import * as constants from './constants';

const defaultState = fromJS({
    username:"",
    identifyCode:"",
    newPwd_0:"",
    newPwd_1:"",
    usernameLegal:false,
    identifyCodeLegal:false,
    newPwdLegal:false,
    isSent:false,
    sendIdentifyCodeInterval:60,
    returnFlag:false,
});
export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.FORGET_CHANGE_USERNAME:
            return state.set('username',action.value);
        case constants.FORGET_CHANGE_IDENTIFY_CODE:
            return state.set('identifyCode',action.value);
        case constants.FORGET_CHANGE_NEW_PWD_0:
            return state.set('newPwd_0',action.value);
        case constants.FORGET_CHANGE_NEW_PWD_1:
            return state.set('newPwd_1',action.value);
        case constants.FORGET_CHANGE_USERNAME_LEGAL:
            return state.set('usernameLegal',action.value);
        case constants.FORGET_CHANGE_IDENTIFY_CODE_LEGAL:
            return state.set('identifyCodeLegal',action.value);
        case constants.FORGET_CHANGE_NEW_PWD_LEGAL:
            return state.set('newPwdLegal',action.value);
        case constants.FORGET_CHANGE_IS_SENT:
            return state.set('isSent',action.value);
        case constants.FORGET_CHANGE_SEND_IDENTIFY_CODE_INTERVAL:
            return state.set('sendIdentifyCodeInterval',action.value);
        case constants.FORGET_CHANGE_RETURN_FLAG:
            return state.set('returnFlag',action.value);
        case constants.FORGET_RESET:
            return defaultState;
        default:
            return state;
    }
}
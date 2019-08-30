/*
* @Author:Wuliucheng
* @Description:Realize set state
* @Date:2019-3-21
* */

//将一个JS对象转换成一个immutable对象
import {fromJS} from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    login:false,
    accountValue:"",
    passwordValue:"",
    showMsg:"",
});
export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.CHANGE_ACCOUNT_VALUE:
            return state.set('accountValue',action.accountValue);
        case constants.CHANGE_PASSWORD_VALUE:
            return state.set('passwordValue',action.passwordValue);
        case constants.CHANGE_LOGIN_STATUS:
            return state.set('login',action.loginStatus);
        default:
            return state;
    }
}
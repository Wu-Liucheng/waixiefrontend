import {fromJS} from "immutable/dist/immutable";
import * as constants from './constants';

const defaultState = fromJS({
    username:"",
    password:"",
    role:0,
    loginStatus:false,
});
export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.ADMIN_LOGIN_CHANGE_USERNAME:
            return state.set('username',action.value);
        case constants.ADMIN_LOGIN_CHANGE_PASSWORD:
            return state.set('password',action.value);
        case constants.ADMIN_LOGIN_CHANGE_LOGIN_STATUS:
            return state.set('loginStatus',action.value);
        case constants.ADMIN_LOGIN_CHANGE_ROLE:
            return state.set('role',action.value);
        default:
            return state;
    }
}
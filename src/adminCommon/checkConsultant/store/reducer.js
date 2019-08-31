import * as constants from './constants';
import {fromJS} from "immutable/dist/immutable";
const defaultState = fromJS({
    signUpData:[],
    currentPageCode:1,
    total:0,

    checkerId:null,
});
export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.CHANGE_SIGN_UP_DATA:
            return state.set("signUpData",action.value);
        case constants.CHANGE_CURRENT_PAGE_CODE:
            return state.set("currentPageCode",action.value);
        case constants.CHANGE_TOTAL:
            return state.set("total",action.value);
        case constants.CHANGE_CHECKER_ID:
            return state.set("checkerId",action.value);
        default:
            return state;
    }
}
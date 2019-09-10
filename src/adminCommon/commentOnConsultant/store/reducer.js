import {fromJS} from "immutable/dist/immutable";
import * as constants from './constants';

const defaultState = fromJS({
    managerId:null,
    cstData:[],
    total:0,
    pageCode:1,

    nowFocusUserId:null,
    comments:"",
    mdlIsVisible:false,
});
export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.CHANGE_MANAGER_ID:
            return state.set("managerId",action.value);
        case constants.CHANGE_CONSULTANT_DATA:
            return state.set("cstData",action.value);
        case constants.CHANGE_TOTAL_DATA:
            return state.set("total",action.value);
        case constants.CHANGE_PAGE_CODE:
            return state.set("pageCode",action.value);
        case constants.CHANGE_NOW_FOCUS_USER_ID:
            return state.set("nowFocusUserId",action.value);
        case constants.CHANGE_COMMENTS:
            return state.set("comments",action.value);
        case constants.CHANGE_MODAL_VISIBLE:
            return state.set("mdlIsVisible",action.value);
        default:
            return state;
    }
}
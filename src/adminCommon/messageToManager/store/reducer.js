import {fromJS} from "immutable/dist/immutable";
import * as constants from './constants';

const defaultState = fromJS({
    managerId:null,
    noticeData:fromJS([]),
    total:0,
    pageCode:1,

    drawerIsVisible:false,
    focusKey:null,

    detail:null,
});
export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.CHANGE_MANAGER_ID:
            return state.set("managerId",action.value);
        case constants.CHANGE_NOTICE_DATA:
            return state.set("noticeData",action.value);
        case constants.CHANGE_TOTAL:
            return state.set("total",action.value);
        case constants.CHANGE_PAGE_CODE:
            return state.set("pageCode",action.value);
        case constants.CHANGE_DRAWER_IS_VISIBLE:
            return state.set("drawerIsVisible",action.value);
        case constants.CHANGE_FOCUS_KET:
            return state.set("focusKey",action.value);
        case constants.CHANGE_DETAIL:
            return state.set("detail",action.value);
        default:
            return state;
    }
}
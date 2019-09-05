import * as constants from './constants';
import {fromJS} from "immutable/dist/immutable";
const defaultState = fromJS({
    signUpData:[],
    currentPageCode:1,
    total:0,

    checkerId:null,
    consultantInfoIsVisible:false,
    consultantInfo:{},

    mdlIsVisible:false,
    mdlStatus:true,
    mdlContent:"",
    focusRecord:null,
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
        case constants.CHANGE_CONSULTANT_INFO_IS_VISIBLE:
            return state.set("consultantInfoIsVisible",action.value);
        case constants.CHANGE_CONSULTANT_INFO:
            return state.set("consultantInfo",action.value);
        case constants.CHANGE_MODAL_IS_VISIBLE:
            return state.set("mdlIsVisible",action.value);
        case constants.CHANGE_MODAL_STATUS:
            return state.set("mdlStatus",action.value);
        case constants.CHANGE_MODAL_CONTENT:
            return state.set("mdlContent",action.value);
        case constants.CHANGE_FOCUS_RECORD:
            return state.set("focusRecord",action.value);
        default:
            return state;
    }
}
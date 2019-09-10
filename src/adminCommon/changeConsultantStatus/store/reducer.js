import {fromJS} from "immutable/dist/immutable";
import * as constants from './constants';

const defaultState = fromJS({
    consultantData:[],
    total:0,
    currentPageCode:1,
    checkerId:null,

    mdlIsVisible:false,
    focusUserId:null,
    username:"",
    planDate:"",
    isBeingUsed:false,

});
export default (state = defaultState,action) => {
    switch (action.type) {

        case constants.CHANGE_CONSULTANT_DATA:
            return state.set("consultantData",action.value);
        case constants.CHANGE_TOTAL:
            return state.set("total",action.value);
        case constants.CHANGE_CURRENT_PAGE_CODE:
            return state.set("currentPageCode",action.value);
        case constants.CHANGE_CHECKER_ID:
            return state.set("checkerId",action.value);
        case constants.CHANGE_MODAL_IS_VISIBLE:
            return state.set("mdlIsVisible",action.value);
        case constants.CHANGE_FOCUS_USER_ID:
            return state.set("focusUserId",action.value);
        case constants.CHANGE_USERNAME:
            return state.set("username",action.value);
        case constants.CHANGE_PLAN_DATE:
            return state.set("planDate",action.value);
        case constants.CHANGE_IS_BEING_USED:
            return state.set("isBeingUsed",action.value);

        default:
            return state;
    }
}
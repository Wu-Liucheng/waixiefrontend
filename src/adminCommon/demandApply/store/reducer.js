import * as constants from './constants';
import {fromJS} from "immutable/dist/immutable";
const defaultState = fromJS({
    demandApplyData:[],
    currentPageCode:1,
    total:0,

    checkerId:null,
    modalIsVisible:false,
    modalStatus:0,
    tips:"",
    focusedDemandId:null,
});
export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.DEMAND_APPLY_CHANGE_DATA:
            return state.set("demandApplyData",action.value);
        case constants.DEMAND_APPLY_CHANGE_CURRENT_PAGE_CODE:
            return state.set("currentPageCode",action.value);
        case constants.DEMAND_APPLY_CHANGE_TOTAL:
            return state.set("total",action.value);
        case constants.DEMAND_APPLY_CHANGE_CHECKER_ID:
            return state.set("checkerId",action.value);
        case constants.DEMAND_APPLY_CHANGE_MODAL_IS_VISIBLE:
            return state.set("modalIsVisible",action.value);
        case constants.DEMAND_APPLY_CHANGE_MODAL_STATUS:
            return state.set("modalStatus",action.value);
        case constants.DEMAND_APPLY_CHANGE_TIPS:
            return state.set("tips",action.value);
        case constants.DEMAND_CHANGE_FOCUSED_DEMAND_ID:
            return state.set("focusedDemandId",action.value);
        default:
            return state;
    }
}
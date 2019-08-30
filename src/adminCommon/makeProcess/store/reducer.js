import * as constants from './constants';
import {fromJS} from "immutable/dist/immutable";
const defaultState = fromJS({
    processData:[],
    currentPageCode:1,
    total:0,
    modalIsVisible:false,

    clientId:null,
    checkerId:null,
    clientInfo:[],
    checkerInfo:[],
});
export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.MAKE_PROCESS_CHANGE_PROCESS_DATA:
            return state.set("processData",action.value);
        case constants.MAKE_PROCESS_CHANGE_CURRENT_PAGE_CODE:
            return state.set("currentPageCode",action.value);
        case constants.MAKE_PROCESS_CHANGE_TOTAL:
            return state.set("total",action.value);
        case constants.MAKE_PROCESS_CHANGE_MODAL_IS_VISIBLE:
            return state.set("modalIsVisible",action.value);
        case constants.MAKE_PROCESS_CHANGE_CLIENT_ID:
            return state.set("clientId",action.value);
        case constants.MAKE_PROCESS_CHANGE_CHECKER_ID:
            return state.set("checkerId",action.value);
        case constants.MAKE_PROCESS_CHANGE_CLIENT_INFO:
            return state.set("clientInfo",action.value);
        case constants.MAKE_PROCESS_CHANGE_CHECKER_INFO:
            return state.set("checkerInfo",action.value);
        default:
            return state;
    }
}
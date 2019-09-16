import {fromJS} from "immutable/dist/immutable";
import * as constants from './constants';

const defaultState = fromJS({
    tabStatus:1,
    managerData:[],
    managerTotal:0,
    managerPageCode:1,

    checkerData:[],
    checkerTotal:0,
    checkerPageCode:1,

    corporateAdminData:[],
    corporateAdminTotal:0,
    corporateAdminPageCode:1,

});
export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.CHANGE_TAB_STATUS:
            return state.set("tabStatus",action.value);
        case constants.CHANGE_MANAGER_DATA:
            return state.set("managerData",action.value);
        case constants.CHANGE_MANAGER_TOTAL:
            return state.set("managerTotal",action.value);
        case constants.CHANGE_MANAGER_PAGE_CODE:
            return state.set("managerPageCode",action.value);
        case constants.CHANGE_CHECKER_DATA:
            return state.set("checkerData",action.value);
        case constants.CHANGE_CHECKER_TOTAL:
            return state.set("checkerTotal",action.value);
        case constants.CHANGE_CHECKER_PAGE_CODE:
            return state.set("checkerPageCode",action.value);
        case constants.CHANGE_CORPORATE_ADMIN_DATA:
            return state.set("corporateAdminData",action.value);
        case constants.CHANGE_CORPORATE_ADMIN_TOTAL:
            return state.set("corporateAdminTotal",action.value);
        case constants.CHANGE_CORPORATE_ADMIN_PAGE_CODE:
            return state.set("corporateAdminPageCode",action.value);
        default:
            return state;
    }
}
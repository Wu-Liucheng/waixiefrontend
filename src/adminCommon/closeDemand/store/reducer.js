import {fromJS} from "immutable/dist/immutable";
import * as constants from './constants';

const defaultState = fromJS({
    demandData:[],
    total:0,
    currentPageCode:1,
    checkerId:null,
});
export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.CHANGE_DEMAND_DATA:
            return state.set("demandData",action.value);
        case constants.CHANGE_TOTAL:
            return state.set("total",action.value);
        case constants.CHANGE_CURRENT_PAGE_CODE:
            return state.set("currentPageCode",action.value);
        case constants.CHANGE_CHECKER_ID:
            return state.set("checkerId",action.value);

        default:
            return state;
    }
}
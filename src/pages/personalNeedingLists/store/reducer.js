import * as constants from './constants';
import {fromJS} from "immutable";

const defaultState = fromJS({
    needingLists:null,
    totalPages:1,
    pageCode:1,
});

export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.PERSONAL_CHANGE_NEEDING_LISTS:
            return state.set('needingLists',action.value);
        case constants.PERSONAL_CHANGE_TOTAL_PAGES:
            return state.set('totalPages',action.value);
        case constants.PERSONAL_CHANGE_PAGE_CODE:
            return state.set('pageCode',action.value);
        default:
            return state;
    }
}
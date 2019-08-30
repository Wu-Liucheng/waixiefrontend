import {fromJS} from "immutable";
import * as constants from './constants';

const defaultState = fromJS({
    needingLists:null,
    totalPages:1,
    pageCode:1,
    employType:1,
    jobExperience:1,
    demandDuration:1,
    salary:1,
});

export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.LISTS_CHANGE_NEEDING_LISTS:
            return state.set('needingLists',action.value);
        case constants.LISTS_CHANGE_TOTAL_PAGES:
            return state.set('totalPages',action.value);
        case constants.LISTS_CHANGE_PAGE_CODE:
            return state.set('pageCode',action.value);
        case constants.LISTS_CHANGE_EMPLOY_TYPE:
            return state.set('employType',action.value);
        case constants.LISTS_CHANGE_JOB_EXPERIENCE:
            return state.set('jobExperience',action.value);
        case constants.LISTS_CHANGE_DEMAND_DURATION:
            return state.set('demandDuration',action.value);
        case constants.LISTS_CHANGE_SALARY:
            return state.set('salary',action.value);
        default:
            return state;
    }
}
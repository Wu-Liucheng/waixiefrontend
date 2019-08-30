import {fromJS} from "immutable/dist/immutable";
import * as constants from './constants';

const defaultState = fromJS({
    collapsed:false,
    menuSelectedKeys:fromJS(["1"]),
    consultantData:fromJS([]),
    consultantDataTotal:0,
    consultantDataPageCode:1,
    modalIsVisible:false,

    id:null,
    email:null,
    name:null,
    mobile:null,
    employYears:null,
    estimateLevel:null,
    employNumber:null,
    planDate:null,
    communicateDate:null,
    communicatePerson:null,
    location:null,
    otherInfo:null,
});
export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.ADMIN_MAIN_CHANGE_CONSULTANT_DATA:
            return state.set('consultantData',action.value);
        case constants.ADMIN_MAIN_CHANGE_CONSULTANT_DATA_TOTAL:
            return state.set('consultantDataTotal',action.value);
        case constants.ADMIN_MAIN_CHANGE_CONSULTANT_DATA_PAGE_CODE:
            return state.set('consultantDataPageCode',action.value);
        case constants.ADMIN_CONSULTANT_INFO_MODAL_IS_VISIBLE:
            return state.set('modalIsVisible',action.value);


        case constants.CHANGE_ID:
            return state.set('id',action.value);
        case constants.CHANGE_EMAIL:
            return state.set('email',action.value);
        case constants.CHANGE_NAME:
            return state.set('name',action.value);
        case constants.CHANGE_MOBILE:
            return state.set('mobile',action.value);
        case constants.CHANGE_EMPLOY_YEARS:
            return state.set('employYears',action.value);
        case constants.CHANGE_ESTIMATE_LEVEL:
            return state.set('estimateLevel',action.value);
        case constants.CHANGE_EMPLOY_NUMBER:
            return state.set('employNumber',action.value);
        case constants.CHANGE_PLAN_DATE:
            return state.set('planDate',action.value);
        case constants.CHANGE_COMMUNICATE_DATE:
            return state.set('communicateDate',action.value);
        case constants.CHANGE_COMMUNICATE_PERSON:
            return state.set('communicatePerson',action.value);
        case constants.CHANGE_LOCATION:
            return state.set('location',action.value);
        case constants.CHANGE_OTHER_INFO:
            return state.set('otherInfo',action.value);
        default:
            return state;
    }
}
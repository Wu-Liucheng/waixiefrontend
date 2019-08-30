import {fromJS} from "immutable";
import * as constants from './constants';

const defaultState = fromJS({
    isBaseInfoPage:true,
    name:"",
    email:"",
    username:"",
    qq:"",
    employYears:"",
    phone:"",
    goodAt:"",
    estimateLevel:"",
    planDate:"",
    communicateDate:"",
    isBeingUsed:false,
    communicatePerson:"",
    employNumber:"",
    idealSalary:"",
    idNumber:"",
    birth:"",
    degree:"",
    priceUnit:"",
    school:"",
    sex:true,
    location:"",
    otherInfo:"",
});

export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.CHANGE_IS_BASE_INFO_PAGE:
            return state.set('isBaseInfoPage',action.value);
        case constants.SELF_CHANGE_USERNAME:
            return state.set('username',action.value);
        case constants.SELF_CHANGE_NAME:
            return state.set('name',action.value);
        case constants.SELF_CHANGE_EMAIL:
            return state.set('email',action.value);
        case constants.SELF_CHANGE_QQ:
            return state.set('qq',action.value);
        case constants.SELF_CHANGE_EMPLOY_YEARS:
            return state.set('employYears',action.value);
        case constants.SELF_CHANGE_PHONE:
            return state.set('phone',action.value);
        case constants.SELF_CHANGE_GOOD_AT:
            return state.set('goodAt',action.value);
        case constants.SELF_CHANGE_ESTIMATE_LEVEL:
            return state.set('estimateLevel',action.value);
        case constants.SELF_CHANGE_PLAN_DATE:
            return state.set('planDate',action.value);
        case constants.SELF_CHANGE_COMMUNICATE_DATE:
            return state.set('communicateDate',action.value);
        case constants.SELF_CHANGE_IS_BEING_USED:
            return state.set('isBeingUsed',action.value);
        case constants.SELF_CHANGE_COMMUNICATE_PERSON:
            return state.set('communicatePerson',action.value);
        case constants.SELF_CHANGE_EMPLOY_NUMBER:
            return state.set('employNumber',action.value);
        case constants.SELF_CHANGE_IDEAL_SALARY:
            return state.set('idealSalary',action.value);
        case constants.SELF_CHANGE_ID_NUMBER:
            return state.set('idNumber',action.value);
        case constants.SELF_CHANGE_BIRTH:
            return state.set('birth',action.value);
        case constants.SELF_CHANGE_DEGREE:
            return state.set('degree',action.value);
        case constants.SELF_CHANGE_PRICE_UNIT:
            return state.set('priceUnit',action.value);
        case constants.SELF_CHANGE_SCHOOL:
            return state.set('school',action.value);
        case constants.SELF_CHANGE_SEX:
            return state.set('sex',action.value);
        case constants.SELF_CHANGE_LOCATION:
            return state.set('location',action.value);
        case constants.SELF_CHANGE_OTHER_INFO:
            return state.set('otherInfo',action.value);
        case constants.SELF_CHANGE_ALL:
            return fromJS(action.value);
        default:
            return state;
    }
}
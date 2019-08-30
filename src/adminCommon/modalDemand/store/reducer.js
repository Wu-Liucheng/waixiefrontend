import * as constants from './constants';
import {fromJS} from "immutable/dist/immutable";
const defaultState = fromJS({
    id:-1,
    name:"",
    number:"",
    status:0,
    description:"",
    consultantRole:-1,
    type:0,
    modular:"",
    employTime:0,
    workAddress:"",
    isBoard:false,
    startDate:"",
    cycle:"",
    duration:"",
    maxPrice:0,
    minPrice:0,
    priceUnit:"",
    objectId:null,
    releaseTime:"",

    modalIsVisible:false,
});
export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.MODAL_DEMAND_CHANGE_ID:
            return state.set("id",action.value);
        case constants.MODAL_DEMAND_CHANGE_NAME:
            return state.set("name",action.value);
        case constants.MODAL_DEMAND_CHANGE_NUMBER:
            return state.set("number",action.value);
        case constants.MODAL_DEMAND_CHANGE_STATUS:
            return state.set("status",action.value);
        case constants.MODAL_DEMAND_CHANGE_DESCRIPTION:
            return state.set("description",action.value);
        case constants.MODAL_DEMAND_CHANGE_CONSULTANT_ROLE:
            return state.set("consultantRole",action.value);
        case constants.MODAL_DEMAND_CHANGE_TYPE:
            return state.set("type",action.value);
        case constants.MODAL_DEMAND_CHANGE_MODULAR:
            return state.set("modular",action.value);
        case constants.MODAL_DEMAND_CHANGE_EMPLOY_TIME:
            return state.set("employTime",action.value);
        case constants.MODAL_DEMAND_CHANGE_WORK_ADDRESS:
            return state.set("workAddress",action.value);
        case constants.MODAL_DEMAND_CHANGE_IS_BOARD:
            return state.set("isBoard",action.value);
        case constants.MODAL_DEMAND_CHANGE_START_DATE:
            return state.set("startDate",action.value);
        case constants.MODAL_DEMAND_CHANGE_CYCLE:
            return state.set("cycle",action.value);
        case constants.MODAL_DEMAND_CHANGE_DURATION:
            return state.set("duration",action.value);
        case constants.MODAL_DEMAND_CHANGE_MAX_PRICE:
            return state.set("maxPrice",action.value);
        case constants.MODAL_DEMAND_CHANGE_MIN_PRICE:
            return state.set("minPrice",action.value);
        case constants.MODAL_DEMAND_CHANGE_PRICE_UNIT:
            return state.set("priceUnit",action.value);
        case constants.MODAL_DEMAND_CHANGE_OBJECT_ID:
            return state.set("objectId",action.value);
        case constants.MODAL_DEMAND_CHANGE_RELEASE_TIME:
            return state.set("releaseTime",action.value);
        case constants.MODAL_DEMAND_DEFAULT:
            return defaultState;
        case constants.MODAL_DEMAND_CHANGE_IS_VISIBLE:
            return state.set("modalIsVisible",action.value);

        default:
            return state;
    }
}
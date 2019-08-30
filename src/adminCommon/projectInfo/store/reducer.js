import {fromJS} from "immutable/dist/immutable";
import * as constants from './constants';

const defaultState = fromJS({
    modalIsVisible:false,
    modalStatus:0,
    projectData:fromJS([]),
    projectDataTotal:0,
    projectDataPageCode:1,

    id:null,
    name:null,
    number:null,
    status:0,
    startDate:"",
    endDate:"",
    corporateInfo:null,
    managerInfo:null,
    owner:{},
    clientId:null,
    managerId:null,

    isYourselfProject:false,
});
export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.PROJECT_MAIN_CHANGE_DATA:
            return state.set('projectData',action.value);
        case constants.PROJECT_MAIN_CHANGE_MODAL_STATUS:
            return state.set('modalStatus',action.value);
        case constants.PROJECT_MAIN_CHANGE_MODAL_VISIBLE:
            return state.set('modalIsVisible',action.value);
        case constants.PROJECT_MAIN_CHANGE_PAGE_CODE:
            return state.set('projectDataPageCode',action.value);
        case constants.PROJECT_MAIN_CHANGE_TOTAL:
            return state.set('projectDataTotal',action.value);

        case constants.PROJECT_MAIN_CHANGE_ID:
            return state.set('id',action.value);
        case constants.PROJECT_MAIN_CHANGE_NAME:
            return state.set('name',action.value);
        case constants.PROJECT_MAIN_CHANGE_NUMBER:
            return state.set('number',action.value);
        case constants.PROJECT_MAIN_CHANGE_STATUS:
            return state.set('status',action.value);
        case constants.PROJECT_MAIN_CHANGE_START_DATE:
            return state.set('startDate',action.value);
        case constants.PROJECT_MAIN_CHANGE_END_DATE:
            return state.set('endDate',action.value);
        case constants.PROJECT_MAIN_CHANGE_CORPORATE_INFO:
            return state.set('corporateInfo',action.value);
        case constants.PROJECT_MAIN_CHANGE_MANAGER_INFO:
            return state.set('managerInfo',action.value);
        case constants.PROJECT_MAIN_CHANGE_CLIENT_ID:
            return state.set('clientId',action.value);
        case constants.PROJECT_MAIN_CHANGE_MANAGER_ID:
            return state.set('managerId',action.value);

        case constants.PROJECT_MAIN_SET_DEFAULT:
            return state.set('id',null).set('name',null).set('number',null).set('status',0)
                .set('startDate',"").set('endDate',"").set('corporateInfo',null).set('managerInfo',null)
                .set('owner',{}).set('clientId',null).set('managerId',null);
        case constants.PROJECT_MAIN_CHANGE_IS_YOURSELF:
            return state.set('isYourselfProject',action.value);
        default:
            return state;
    }
}
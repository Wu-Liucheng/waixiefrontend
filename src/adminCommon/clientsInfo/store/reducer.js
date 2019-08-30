import {fromJS} from "immutable/dist/immutable";
import * as constants from './constants';

const defaultState = fromJS({
    clientData:fromJS([]),
    clientDataTotal:0,
    clientDataPageCode:1,
    modalIsVisible:false,
    modalStatus:0,

});
export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.CHANGE_CLIENT_DATA:
            return state.set("clientData",action.value);
        case constants.CHANGE_CLIENT_DATA_TOTAL:
            return state.set("clientDataTotal",action.value);
        case constants.CHANGE_CLIENT_DATA_PAGE_CODE:
            return state.set("clientDataPageCode",action.value);
        case constants.CHANGE_CLIENT_MODAL_IS_VISIBLE:
            return state.set("modalIsVisible",action.value);
        case constants.CHANGE_CLIENT_MODAL_STATUS:
            return state.set("modalStatus",action.value);
        default:
            return state;
    }
}
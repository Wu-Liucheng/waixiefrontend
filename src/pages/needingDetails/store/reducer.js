import {fromJS} from "immutable";
import * as constants from './constants';

const defaultState = fromJS({
    detailInfo:null,
});

export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.DETAIL_CHANGE_INFO:
            return state.set('detailInfo',action.value);
        default:
            return state;
    }
}
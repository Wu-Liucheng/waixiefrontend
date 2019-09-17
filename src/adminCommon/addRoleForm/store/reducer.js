import {fromJS} from "immutable/dist/immutable";
import * as constants from './constants';

const defaultState = fromJS({
    clientInfo:[],
});
export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.CHANGE_CLIENT_INFO:
            return state.set('clientInfo',action.value);
        default:
            return state;
    }
}
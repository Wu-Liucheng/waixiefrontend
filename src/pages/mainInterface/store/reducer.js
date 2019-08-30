import {fromJS} from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    demands:null,
    focusedProjectID:null,
});
export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.MAIN_CHANGE_DEMANDS:
            return state.set('demands',action.value);
        case constants.MAIN_CHANGE_FOCUSED_PROJECT_ID:
            return state.set('focusedProjectID',action.value);
        default:
            return state;
    }
}
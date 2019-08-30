import {fromJS} from "immutable/dist/immutable";
import * as constants from './constants';

const defaultState = fromJS({
    collapsed:false,
    menuSelectedKeys:fromJS(["1"]),
});
export default (state = defaultState,action) => {
    switch (action.type) {
        case constants.ADMIN_MAIN_CHANGE_COLLAPSED:
            return state.set('collapsed',action.value);
        case constants.ADMIN_MAIN_CHANGE_MENU_SELECTED_KEYS:
            return state.set('menuSelectedKeys',action.value);

        default:
            return state;
    }
}
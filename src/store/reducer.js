/*
* @Author:Wuliucheng
* @Description:combine all the reducers
* @Date:2019-3-20
* */
import { combineReducers } from 'redux-immutable';
import {reducer as loginReducer} from '../pages/login/store'
import {reducer as registerReducer} from '../pages/register/store';
import {reducer as selfInfoReducer} from '../pages/selfInfo/store';
import {reducer as forgetReducer} from '../pages/forget/store';
import {reducer as mainReducer} from '../pages/mainInterface/store';
import {reducer as detailReducer} from '../pages/needingDetails/store';
import {reducer as listsReducer} from '../pages/needingLists/store';
import {reducer as personalReducer} from '../pages/personalNeedingLists/store';
import {reducer as adminLoginReducer} from '../adminPages/adminLogin/store';
import {reducer as adminMainReducer} from '../adminPages/adminMain/store';
import {reducer as consultantsInfoReducer} from'../adminCommon/consultantsInfo/store';
import {reducer as clientInfoReducer} from '../adminCommon/clientsInfo/store';
import {reducer as oneClientReducer} from '../adminCommon/clientsInfo/oneClientStore'
import {reducer as projectInfoReducer} from '../adminCommon/projectInfo/store';
import {reducer as modalDemandReducer} from '../adminCommon/modalDemand/store';
import {reducer as makeProcessReducer} from '../adminCommon/makeProcess/store';
import {reducer as demandApplyReducer} from '../adminCommon/demandApply/store';
import {reducer as checkConsultantReducer} from '../adminCommon/checkConsultant/store';
import {reducer as closeDemandReducer} from '../adminCommon/closeDemand/store';
import {reducer as changeConsultantStatusReducer} from '../adminCommon/changeConsultantStatus/store';
import {reducer as commentOnConsultantReducer} from '../adminCommon/commentOnConsultant/store';
import {reducer as messageToManagerReducer} from '../adminCommon/messageToManager/store';
import {reducer as adminInfoReducer} from '../adminCommon/adminInfo/store';
export default combineReducers({
    login:loginReducer,
    register:registerReducer,
    selfInfo:selfInfoReducer,
    forget:forgetReducer,
    main:mainReducer,
    detail:detailReducer,
    lists:listsReducer,
    personal:personalReducer,
    adminLogin:adminLoginReducer,
    adminMain:adminMainReducer,
    consultantsInfo:consultantsInfoReducer,
    clientInfo:clientInfoReducer,
    oneClient:oneClientReducer,
    projectInfo:projectInfoReducer,
    modalDemand:modalDemandReducer,
    makeProcess:makeProcessReducer,
    demandApply:demandApplyReducer,
    checkConsultant:checkConsultantReducer,
    closeDemand:closeDemandReducer,
    changeConsultantStatus:changeConsultantStatusReducer,
    commentOnConsultant:commentOnConsultantReducer,
    messageToManager:messageToManagerReducer,
    adminInfo:adminInfoReducer,
})

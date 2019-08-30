import * as constants from './constants';
import axios from 'axios';
import {message} from "antd";
import * as config from '../../../config';
export const modalDemandChangeId = (id)=>({type:constants.MODAL_DEMAND_CHANGE_ID,value:id});
export const modalDemandChangeName = (name) => ({type:constants.MODAL_DEMAND_CHANGE_NAME,value:name});
export const modalDemandChangeNumber = (number)=>({type:constants.MODAL_DEMAND_CHANGE_NUMBER,value:number});
export const modalDemandChangeStatus = (status)=>({type:constants.MODAL_DEMAND_CHANGE_STATUS,value:status});
export const modalDemandChangeDescription=(description)=>({type:constants.MODAL_DEMAND_CHANGE_DESCRIPTION,value:description});
export const modalDemandChangeConsultantRole=(role)=>({type:constants.MODAL_DEMAND_CHANGE_CONSULTANT_ROLE,value:role});
export const modalDemandChangeType = (type)=>({type:constants.MODAL_DEMAND_CHANGE_TYPE,value:type});
export const modalDemandChangeModular = (modular)=>({type:constants.MODAL_DEMAND_CHANGE_MODULAR,value:modular});
export const modalDemandChangeEmployTime=(employTime)=>({type:constants.MODAL_DEMAND_CHANGE_EMPLOY_TIME,value:employTime});
export const modalDemandChangeWorkAddress = (address) => ({type:constants.MODAL_DEMAND_CHANGE_WORK_ADDRESS,value:address});
export const modalDemandChangeIsBoard = (board) => ({type:constants.MODAL_DEMAND_CHANGE_IS_BOARD,value:board});
export const modalDemandChangeStartDate = (date)=>({type:constants.MODAL_DEMAND_CHANGE_START_DATE,value:date});
export const modalDemandChangeCycle = (cycle)=>({type:constants.MODAL_DEMAND_CHANGE_CYCLE,value:cycle});
export const modalDemandChangeDuration = (duration)=>({type:constants.MODAL_DEMAND_CHANGE_DURATION,value:duration});
export const modalDemandChangeMaxPrice = (maxPrice)=>({type:constants.MODAL_DEMAND_CHANGE_MAX_PRICE,value:maxPrice});
export const modalDemandChangeMinPrice = (minPrice)=>({type:constants.MODAL_DEMAND_CHANGE_MIN_PRICE,value:minPrice});
export const modalDemandChangePriceUnit = (priceUnit)=>({type:constants.MODAL_DEMAND_CHANGE_PRICE_UNIT,value:priceUnit});
export const modalDemandChangeObjectId = (objectId)=>({type:constants.MODAL_DEMAND_CHANGE_OBJECT_ID,value:objectId});
export const modalDemandChangeReleaseTime = (time)=>({type:constants.MODAL_DEMAND_CHANGE_RELEASE_TIME,value:time});
export const modalDemandChangeIsVisible = (val) => ({type:constants.MODAL_DEMAND_CHANGE_IS_VISIBLE,value:val});
export const modalDemandSetDefault = {type:constants.MODAL_DEMAND_DEFAULT};

export const modalDemandAdd = (name,
                               number,
                               status,
                               description,
                               modular,
                               workAddress,
                               isBoard,
                               startDate,
                               cycle,
                               duration,
                               maxPrice,
                               minPrice,
                               priceUnit,
                               objectId,type,employTime)=>{
    return (dispatch)=>{
        let price = (maxPrice+minPrice)/2; let priceFluctuation = Math.abs(maxPrice-price);
        let demand = {"name":name,"number":number,"status":status,"description":description,"modular":modular,
        "workAddress":workAddress,"isBoard":isBoard,"startDate":startDate,"cycle":cycle,"duration":duration,
        "price":price,"priceFluctuation":priceFluctuation,"priceUnit":priceUnit,"objectId":objectId,"type":type,
            "employTime":employTime};
        axios.post(config.DOMAIN_NAME+'/add-demand',demand).then((res)=>{
            if(res.data.data)
            {
                message.success("添加需求成功，请等待审核。");
                dispatch(modalDemandChangeIsVisible(false));
                dispatch(modalDemandSetDefault);
            }
            else {
                message.error(res.data.info);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
};

export const showDemandInfo = (demandId) => {
    return (dispatch)=>{
        axios.get(config.DOMAIN_NAME+'/get-demand-info-by-id',{params:{"id":demandId}})
            .then((res)=>{
                if(!(res == null)){
                    const data = res.data;
                    // console.log(data);
                    dispatch(modalDemandChangeId(data.id));
                    dispatch(modalDemandChangeName(data.name));
                    dispatch(modalDemandChangeNumber(data.number));
                    dispatch(modalDemandChangeStatus(data.status));
                    dispatch(modalDemandChangeDescription(data.description));
                    dispatch(modalDemandChangeModular(data.modular));
                    dispatch(modalDemandChangeWorkAddress(data.workAddress));
                    dispatch(modalDemandChangeIsBoard(data.isBoard));
                    dispatch(modalDemandChangeStartDate(data.startDate));
                    dispatch(modalDemandChangeCycle(data.cycle));
                    dispatch(modalDemandChangeDuration(data.duration));
                    dispatch(modalDemandChangeMaxPrice(data.price+data.priceFluctuation));
                    dispatch(modalDemandChangeMinPrice(data.price-data.priceFluctuation));
                    dispatch(modalDemandChangePriceUnit(data.priceUnit));
                    dispatch(modalDemandChangeType(data.type));
                    dispatch(modalDemandChangeEmployTime(parseInt(data.employTime)));
                    dispatch(modalDemandChangeIsVisible(true));
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }
};
import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {Input,Modal,Divider,DatePicker,Radio,InputNumber} from 'antd';
import {actionCreator} from "./store";
import moment from 'moment';


const {TextArea} = Input;
class ModalDemand extends PureComponent{

    render() {
        const{

            id,
            name,modalDemandChangeName,
            number,modalDemandChangeNumber,
            status,
            description,modalDemandChangeDescription,
            modular,modalDemandChangeModular,
            workAddress,modalDemandChangeWorkAddress,
            isBoard,modalDemandChangeIsBoard,
            startDate,modalDemandChangeStartDate,
            cycle,modalDemandChangeCycle,
            duration,modalDemandChangeDuration,
            maxPrice,modalDemandChangeMaxPrice,
            minPrice,modalDemandChangeMinPrice,
            priceUnit,modalDemandChangePriceUnit,
            objectId,
            type,modalDemandChangeType,
            employTime,modalDemandChangeEmployTime,

            modalIsVisible,modalDemandChangeIsVisible,

            modalDemandAdd,
            role,
        } = this.props;

        return (
            <Modal
                width={800}
                title="外协需求信息"
                visible={modalIsVisible}
                onOk={()=>{
                    // message.info("按你🐎");
                    if(role === 1)
                    {
                        modalDemandAdd(name,
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
                            objectId,
                            type,employTime
                        )
                    }
                    else{
                        modalDemandChangeIsVisible(false);
                    }
                }}
                onCancel={()=>{modalDemandChangeIsVisible(false)}}
                okText={role === 1?"保存":"确定"}
                cancelText="取消" cancelButtonProps={{disabled:!(role===1)}}
            >
                <label>id：</label><Input value={id} style={{width:100}} disabled={true}/>
                <label>&nbsp;&nbsp;&nbsp;需求名称：</label><Input value={name} style={{width:300}} onChange={modalDemandChangeName}/>
                <Divider dashed />
                <label>需求编号：</label><Input value={number==="null"?"":number} onChange={modalDemandChangeNumber} style={{width:150}}/>
                <label>&nbsp;&nbsp;&nbsp;需求状态：</label><Radio.Group value={status} disabled={true} size="small" >
                <Radio value={0} >关闭状态</Radio><Radio value={1}>开启状态</Radio>
            </Radio.Group>
                <Divider dashed />
                <label>涉及模块：</label><Input onChange={modalDemandChangeModular} value={modular==="null"?"":modular} style={{width:200}}/>
                <label>&nbsp;&nbsp;&nbsp;是否包住宿：</label><Radio.Group value={isBoard} onChange={modalDemandChangeIsBoard} size="small"><Radio value={false}>否</Radio><Radio value={true}>是</Radio></Radio.Group>
                <Divider dashed />
                <label>工作地区：</label><Input onChange={modalDemandChangeWorkAddress} value={workAddress==="null"?'':workAddress} style={{width:300}}/>
                <label>&nbsp;&nbsp;&nbsp;需求开始日期：</label><DatePicker format={'YYYY-MM-DD'}
                                                                     onChange={modalDemandChangeStartDate}
                                                                     value={startDate==null||startDate.toString()===""?moment():moment(startDate.toString(),"YYYY-MM-DD")} />
                <Divider dashed />
                <label>招聘类型：</label>
                <Radio.Group value={type} onChange={modalDemandChangeType} size="small" style={{fontSize:15}}>
                    <Radio value={0}>全日制外包</Radio>
                    <Radio value={1}>兼职外包</Radio>
                    <Radio value={2}>任务外包</Radio>
                    <Radio value={3}>全职</Radio>
                </Radio.Group><br/>
                <label>工作经验：</label>
                <Radio.Group value={employTime} onChange={modalDemandChangeEmployTime} size="small">
                    <Radio value={0}>不限</Radio>
                    <Radio value={1}>应届生</Radio>
                    <Radio value={2}>1-3年</Radio>
                    <Radio value={3}>4-6年</Radio>
                    <Radio value={4}>7-10年</Radio>
                    <Radio value={5}>10年以上</Radio>
                </Radio.Group>
                <Divider dashed />
                <label>年限：</label><Input value={duration} onChange={modalDemandChangeDuration} style={{width:250}}/>
                <label>&nbsp;&nbsp;&nbsp;需求周期：</label><Input value={cycle} onChange={modalDemandChangeCycle} style={{width:250}}/>
                <Divider dashed />
                <label>价格区间：</label><InputNumber min={0} value={minPrice} onChange={modalDemandChangeMinPrice}/><label>~</label>
                <InputNumber min={0} value={maxPrice} onChange={modalDemandChangeMaxPrice}/>
                <label>&nbsp;&nbsp;&nbsp;价格单位：</label><Input value={priceUnit} onChange={modalDemandChangePriceUnit} style={{width:150}}/>
                <Divider dashed />
                <label>需求描述：</label><TextArea onChange={modalDemandChangeDescription} value={description==="null"?"":description} rows={3}/>

            </Modal>
        );
    }

}
const mapState = (state) => ({
    role:state.getIn(['adminLogin','role']),

    id:state.getIn(['modalDemand','id']),
    name:state.getIn(["modalDemand","name"]),
    number:state.getIn(['modalDemand','number']),
    status:state.getIn(['modalDemand','status']),
    description:state.getIn(['modalDemand','description']),
    consultantRole: state.getIn(['modalDemand','consultantRole']),
    type:state.getIn(['modalDemand','type']),
    modular:state.getIn(['modalDemand','modular']),
    employTime: state.getIn(['modalDemand','employTime']),
    workAddress: state.getIn(['modalDemand','workAddress']),
    isBoard: state.getIn(['modalDemand','isBoard']),
    startDate:state.getIn(['modalDemand','startDate']),
    cycle:state.getIn(['modalDemand','cycle']),
    duration:state.getIn(['modalDemand','duration']),
    maxPrice: state.getIn(['modalDemand','maxPrice']),
    minPrice: state.getIn(['modalDemand','minPrice']),
    priceUnit:state.getIn(['modalDemand','priceUnit']),
    objectId:state.getIn(['modalDemand','objectId']),
    releaseTime: state.getIn(['modalDemand','releaseTime']),


    modalIsVisible: state.getIn(['modalDemand','modalIsVisible']),

});
const mapDispatch = (dispatch) => ({
    modalDemandChangeIsVisible(val){
        dispatch(actionCreator.modalDemandChangeIsVisible(val));
    },
    modalDemandChangeName(e){dispatch(actionCreator.modalDemandChangeName(e.target.value))},
    modalDemandChangeDescription(e){dispatch(actionCreator.modalDemandChangeDescription(e.target.value))},
    modalDemandChangeNumber(e){dispatch(actionCreator.modalDemandChangeNumber(e.target.value))},
    modalDemandChangeModular(e){dispatch(actionCreator.modalDemandChangeModular(e.target.value))},
    modalDemandChangeWorkAddress(e){dispatch(actionCreator.modalDemandChangeWorkAddress(e.target.value))},
    modalDemandChangeStartDate(data,dataString){dispatch(actionCreator.modalDemandChangeStartDate(dataString))},
    modalDemandChangeIsBoard(e){dispatch(actionCreator.modalDemandChangeIsBoard(e.target.value))},
    modalDemandChangeDuration(e){dispatch(actionCreator.modalDemandChangeDuration(e.target.value))},
    modalDemandChangeCycle(e){dispatch(actionCreator.modalDemandChangeCycle(e.target.value))},
    modalDemandChangeMinPrice(value){dispatch(actionCreator.modalDemandChangeMinPrice(value))},
    modalDemandChangeMaxPrice(value){dispatch(actionCreator.modalDemandChangeMaxPrice(value))},
    modalDemandChangePriceUnit(e){dispatch(actionCreator.modalDemandChangePriceUnit(e.target.value))},
    modalDemandChangeType(e){dispatch(actionCreator.modalDemandChangeType(e.target.value))},
    modalDemandChangeEmployTime(e){dispatch(actionCreator.modalDemandChangeEmployTime(e.target.value))},
    modalDemandAdd (name,
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
        objectId,type,employTime){dispatch(actionCreator.modalDemandAdd(name,
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
        objectId,type,employTime))}
});
export default connect(mapState,mapDispatch)(ModalDemand);

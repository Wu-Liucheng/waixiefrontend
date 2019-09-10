import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {
    Layout,
    Button,
    Table,
    Breadcrumb,
    message,
    Modal,
    Divider,
    DatePicker, Switch,
} from 'antd';
import {actionCreator} from "./store";
import {actionCreator as modalDemandActionCreator} from "../modalDemand/store";
import ModalDemand from "../modalDemand";
import moment from "moment";
const {
    Content
} = Layout;
const {confirm} = Modal;
class ChangeConsultantStatus extends PureComponent{

    componentDidMount() {
        const {role,username,setCheckerId} = this.props;
        if(role === 2){
            setCheckerId(username);
        }
        else{
            message.error("您不是外协专员，此模块无权查看。");
        }
    }

    render() {
        const {
            consultantData,getConsultantData,
            total,
            currentPageCode,
            checkerId,
            getDemandInfo,

            mdlIsVisible,changeMdlIsVisible,
            focusUserId,
            consultantName,
            planDate,changePlanDate,
            isBeingUsed,changeIsBeingUsed,
            getConsultantStatus,
            updateStatus,
            relationIsOver,
    } = this.props;

        const columns = [{
            title:'序号',
            dataIndex:'number',
            key:'number',
        },{
            title:'顾问姓名',
            dataIndex:'username',
            key:'username',
        },{
            title:'需求名称',
            dataIndex:'demandName',
            key:'demandName',
        },{
            title: '操作',
            key: 'action',
            render: (text,record) => (
                <span>
                    <Button type="primary" onClick={()=>{
                        getDemandInfo(record.demandId);
                    }}>查看需求信息</Button>&nbsp;&nbsp;&nbsp;
                    <Button onClick={()=>{
                        getConsultantStatus(record.userId);
                    }}>更改出项目日期</Button>
                    <Button type="danger" onClick={()=>{
                        confirm({
                            title: '是否解除绑定关系？',
                            content: '注意：此操作不可撤销，一般在项目结束后解除',
                            okText:"确定",
                            okType:"danger",
                            cancelText:"取消",
                            onOk() {
                                relationIsOver(record.demandId,record.userId,checkerId,currentPageCode);
                            },
                            onCancel() {
                            },
                        });
                    }}>解除绑定关系</Button>
                </span>
            ),
        }];

        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>外协需求</Breadcrumb.Item>
                    <Breadcrumb.Item>更改外协顾问状态</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Table columns={columns}
                           dataSource={consultantData.toJS()}
                           pagination={{showQuickJumper:true,pageSize:6,defaultCurrent:1,total:total,current:currentPageCode,onChange:(code)=>{
                                   getConsultantData(checkerId,code);
                               }}} />

                </div>
                <ModalDemand/>
                <Modal visible={mdlIsVisible}
                       onCancel={()=>{changeMdlIsVisible(false)}}
                       onOk={()=>{updateStatus(focusUserId,planDate,isBeingUsed)
                       }}
                       title="修改外协顾问状态"
                       okText="确定"
                       cancelText="取消"
                >
                    姓名：{consultantName}
                    <Divider/>
                    计划出项目日期：<DatePicker
                    value={planDate.toString()===""?moment():moment(planDate.toString(),"YYYY-MM-DD")}
                    onChange={changePlanDate}
                />
                    <Divider/>
                    是否在任用中：<Switch checkedChildren="任用中" unCheckedChildren="空闲中"
                                   checked={isBeingUsed}
                                   onChange={(checked)=>{changeIsBeingUsed(checked)}}
                />
                </Modal>
            </Content>
        );
    }

}
const mapState = (state) => ({
    role:state.getIn(['adminLogin','role']),
    username:state.getIn(['adminLogin','username']),

    consultantData:state.getIn(['changeConsultantStatus','consultantData']),
    total:state.getIn(['changeConsultantStatus','total']),
    currentPageCode:state.getIn(['changeConsultantStatus','currentPageCode']),
    checkerId:state.getIn(['changeConsultantStatus','checkerId']),

    mdlIsVisible:state.getIn(['changeConsultantStatus','mdlIsVisible']),
    focusUserId: state.getIn(['changeConsultantStatus','focusUserId']),
    consultantName:state.getIn(['changeConsultantStatus','username']),
    planDate:state.getIn(['changeConsultantStatus','planDate']),
    isBeingUsed:state.getIn(['changeConsultantStatus','isBeingUsed']),
});
const mapDispatch = (dispatch) => ({
    setCheckerId(username){dispatch(actionCreator.setCheckerId(username))},
    getConsultantData(checkerId,pageCode){dispatch(actionCreator.getConsultantData(checkerId,pageCode))},
    getDemandInfo(id){dispatch(modalDemandActionCreator.showDemandInfo(id))},
    changeMdlIsVisible(val){dispatch(actionCreator.changeMdlIsVisible(val))},
    changePlanDate(date,dateString){dispatch(actionCreator.changePlanDate(dateString))},
    changeIsBeingUsed(val){dispatch(actionCreator.changeIsBeingUsed(val))},
    getConsultantStatus(id){dispatch(actionCreator.getConsultantStatus(id))},
    updateStatus(id,planDate,isBeingUsed){dispatch(actionCreator.updateStatus(id,planDate,isBeingUsed)
    )},
    relationIsOver(demandId,userId,checkerId,pageCode){dispatch(actionCreator.relationIsOver(demandId,userId,checkerId,pageCode))},
});
export default connect(mapState,mapDispatch)(ChangeConsultantStatus);

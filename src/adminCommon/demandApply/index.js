import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {
    Layout,
    Button,
    Table,
    Breadcrumb, Tooltip,
    message, Input, Modal,
} from 'antd';
import {actionCreator} from "./store";
import {actionCreator as modalDemandActionCreator} from "../modalDemand/store";
import ModalDemand from '../modalDemand/index.js';
const {
    Content
} = Layout;
const {TextArea} = Input;
class DemandApply extends PureComponent{

    componentDidMount() {
        const {role,username,setCheckerId} = this.props;
        if(role === 2){
            setCheckerId(username);
        }
        else {
            message.error("您不是外协专员，此模块无权查看。");
        }
    }

    render() {
        const{
            demandApplyData,
            currentPageCode,
            total,
            checkerId,
            showDemandInfo,
            modalIsVisible,changeModalIsVisible,
            modalStatus,changeModalStatus,
            tips,changeTips,
            updateDemandStatusByChecker,
            focusedDemandId,changeFocusedDemandId,
            getDemandApply,
        } = this.props;

        const applyColumns = [{
            title:'序号',
            dataIndex:'id',
            key:'id',
        },{
            title:'外协申请号',
            dataIndex:'number',
            key:'number',
        },{
            title:'项目名称',
            dataIndex:'name',
            key:'name',
        },{
            title:'模块',
            dataIndex:'modular',
            key:'modular',
        },{
            title:'年限',
            dataIndex:'employTime',
            key:'employTime',
        },{
            title:'审核状态',
            dataIndex:'status',
            key:'status',
        },{
            title:'价格',
            dataIndex:'price',
            key:'price',
        },{
            title:'价格单位',
            dataIndex:'priceUnit',
            key:'priceUnit',
        },{
            title:'需求开始日期',
            dataIndex:'startDate',
            key:'startDate',
        },{
            title:'需求周期',
            dataIndex:'cycle',
            key:'cycle',
        },{
            title:'工作地点',
            dataIndex:'workAddress',
            key:'workAddress',
        },{
            title: '操作',
            key: 'action',
            render: (text,record) => (
                <span>
                    <Button onClick={()=>{
                        showDemandInfo(record.id);
                    }}>查看</Button>&nbsp;
                    <Tooltip title="通过审核并发布需求"><Button type="primary" onClick={()=>{
                        if(record.status !== "待审核"){
                            message.error("该需求已审核");
                            return;
                        }
                        changeModalStatus(0);
                        changeFocusedDemandId(record.id);
                        changeModalIsVisible(true);
                    }}>发布</Button></Tooltip>
                    <Tooltip title="审核驳回，拒绝通过"><Button type="danger" onClick={()=>{
                        if(record.status !== "待审核"){
                            message.error("该需求已审核");
                            return;
                        }
                        changeModalStatus(1);
                        changeFocusedDemandId(record.id);
                        changeModalIsVisible(true);
                    }}>拒绝</Button></Tooltip>
                </span>
            ),
        }];


        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>外协需求</Breadcrumb.Item>
                    <Breadcrumb.Item>外协需求申请</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

                    <Button className="admin-button">更多筛选</Button>
                    <Button className="admin-button">需求关闭</Button>
                    <Table columns={applyColumns}
                           dataSource={demandApplyData.toJS()}
                           pagination={{showQuickJumper:true,pageSize:6,defaultCurrent:1,total:total,current:currentPageCode,
                           onChange:(code) => {getDemandApply(checkerId,currentPageCode)}}} />
                </div>
                <ModalDemand/>
                <Modal
                    width={800}
                    title="审核建议"
                    visible={modalIsVisible}
                    onOk={()=>{
                        if(tips.length > 255){
                            message.error("字数长度超出限制");
                            return;
                        }
                        if(modalStatus===0){
                            updateDemandStatusByChecker(true,focusedDemandId,checkerId,tips,currentPageCode);
                        }
                        else if(modalStatus===1){
                            updateDemandStatusByChecker(false,focusedDemandId,checkerId,tips,currentPageCode);
                        }

                    }}
                    onCancel={()=>{changeModalIsVisible(false)}}
                    okText={modalStatus===0?"审核通过并发布":modalStatus===1?"反馈建议至项目经理处":""}
                    cancelText="取消"
                >
                    <TextArea rows={4} value={tips} onChange={changeTips} placeholder="给项目经理的建议(255字限制)..."/>

                </Modal>
            </Content>
        );
    }

}
const mapState = (state) => ({
    role:state.getIn(['adminLogin','role']),
    username:state.getIn(['adminLogin','username']),

    demandApplyData: state.getIn(['demandApply','demandApplyData']),
    currentPageCode:state.getIn(['demandApply','currentPageCode']),
    total:state.getIn(['demandApply','total']),
    checkerId:state.getIn(['demandApply','checkerId']),

    modalIsVisible:state.getIn(['demandApply','modalIsVisible']),
    modalStatus:state.getIn(['demandApply','modalStatus']),

    tips:state.getIn(['demandApply','tips']),
    focusedDemandId:state.getIn(['demandApply','focusedDemandId']),

});
const mapDispatch = (dispatch) => ({
    setCheckerId(username){dispatch(actionCreator.setCheckerId(username))},
    showDemandInfo(id){dispatch(modalDemandActionCreator.showDemandInfo(id))},
    changeModalIsVisible(val){dispatch(actionCreator.changeModalIsVisible(val))},
    changeModalStatus(status){dispatch(actionCreator.changeModalStatus(status))},
    changeTips(e){dispatch(actionCreator.changeTips(e.target.value))},
    changeFocusedDemandId(id){dispatch(actionCreator.changeFocusedDemandId(id))},
    updateDemandStatusByChecker(isPassed,demandId,checkerId,tips,pageCode){
        dispatch(actionCreator.updateDemandStatusByChecker(isPassed,demandId,checkerId,tips,pageCode))
    },
    getDemandApply(checkerId,pageCode){dispatch(actionCreator.getDemandApply(checkerId,pageCode))},
});
export default connect(mapState,mapDispatch)(DemandApply);


/*
const applyData = [{
    key:'1',
    number:1,
    id:'1000004',
    name:'东方汽轮机SAP项目',
    system:'SAP',
    module:'MM',
    years:'不限',
    applyStatus:'有效',
    price:'1200',
    unit:'元/天',
    startDate:'2018-03-01',
    cycle:'10个月',
    location:'江苏 常州',
    examineStatus:'创建',
},{
    key:'2',
    number:1,
    id:'1000004',
    name:'东方汽轮机SAP项目',
    system:'SAP',
    module:'MM',
    years:'不限',
    applyStatus:'有效',
    price:'1200',
    unit:'元/天',
    startDate:'2018-03-01',
    cycle:'10个月',
    location:'江苏 常州',
    examineStatus:'创建',
},{
    key:'3',
    number:1,
    id:'1000004',
    name:'东方汽轮机SAP项目',
    system:'SAP',
    module:'MM',
    years:'不限',
    applyStatus:'有效',
    price:'1200',
    unit:'元/天',
    startDate:'2018-03-01',
    cycle:'10个月',
    location:'江苏 常州',
    examineStatus:'创建',
},{
    key:'4',
    number:1,
    id:'1000004',
    name:'东方汽轮机SAP项目',
    system:'SAP',
    module:'MM',
    years:'不限',
    applyStatus:'有效',
    price:'1200',
    unit:'元/天',
    startDate:'2018-03-01',
    cycle:'10个月',
    location:'江苏 常州',
    examineStatus:'创建',
},{
    key:'5',
    number:1,
    id:'1000004',
    name:'东方汽轮机SAP项目',
    system:'SAP',
    module:'MM',
    years:'不限',
    applyStatus:'有效',
    price:'1200',
    unit:'元/天',
    startDate:'2018-03-01',
    cycle:'10个月',
    location:'江苏 常州',
    examineStatus:'创建',
},{
    key:'6',
    number:1,
    id:'1000004',
    name:'东方汽轮机SAP项目',
    system:'SAP',
    module:'MM',
    years:'不限',
    applyStatus:'有效',
    price:'1200',
    unit:'元/天',
    startDate:'2018-03-01',
    cycle:'10个月',
    location:'江苏 常州',
    examineStatus:'创建',
}];*/

import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {
    Layout,
    Button,
    Table,
    Breadcrumb,
    message,Modal,Switch,
} from 'antd';
import {actionCreator} from "./store";
import {actionCreator as modalDemandActionCreator} from "../modalDemand/store";
import ModalDemand from "../modalDemand";
const {
    Content
} = Layout;
const {confirm} = Modal;
class CloseDemand extends PureComponent{

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
            demandData,getDemandData,
            total,
            currentPageCode,
            checkerId,
            changeIsOpened,
            getDemandInfo,
            deleteDemand,
        } = this.props;
        const columns = [{
            title:'序号',
            dataIndex:'id',
            key:'id',
        },{
            title:'外协申请号',
            dataIndex:'number',
            key:'number',
        },{
            title:'需求名称',
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
            title: '开启/关闭',
            key: 'switch',
            render: (text,record) => (
                <span>
                    <Switch checkedChildren="开启" unCheckedChildren="关闭"
                            checked={record.opened===true}
                            disabled={!(record.status==="已发布")}
                            onChange={(checked)=>{changeIsOpened(checkerId,record.id,checked,currentPageCode)}}
                    />
                </span>
            ),
        },{
            title: '操作',
            key: 'action',
            render: (text,record) => (
                <span>
                    <Button type="primary" onClick={()=>{
                        getDemandInfo(record.id);
                    }}>查看</Button>&nbsp;&nbsp;&nbsp;
                    <Button type="danger" onClick={()=>{
                        confirm({
                            title: '是否删除该需求？',
                            content: '注意：此操作不可撤销',
                            okText:"确定",
                            okType:"danger",
                            cancelText:"取消",
                            onOk() {
                                deleteDemand(checkerId,record.id,currentPageCode);
                            },
                            onCancel() {
                            },
                        });
                    }}>删除</Button>
                </span>
            ),
        }];
        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>外协需求</Breadcrumb.Item>
                    <Breadcrumb.Item>开启 or 关闭</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Table columns={columns}
                           dataSource={demandData.toJS()}
                           pagination={{showQuickJumper:true,pageSize:6,defaultCurrent:1,total:total,current:currentPageCode,onChange:(code)=>{
                                   getDemandData(checkerId,code);
                               }}} />

                </div>
                <ModalDemand/>
            </Content>
        );
    }

}
const mapState = (state) => ({
    role:state.getIn(['adminLogin','role']),
    username:state.getIn(['adminLogin','username']),

    demandData:state.getIn(['closeDemand','demandData']),
    total:state.getIn(['closeDemand','total']),
    currentPageCode:state.getIn(['closeDemand','currentPageCode']),
    checkerId:state.getIn(['closeDemand','checkerId']),
});
const mapDispatch = (dispatch) => ({
    setCheckerId(username){dispatch(actionCreator.setCheckerId(username))},
    getDemandData(id,pageCode){dispatch(actionCreator.getDemandData(id,pageCode))},
    changeIsOpened(checkerId,demandId,status,pageCode){dispatch(actionCreator.changeIsOpened(checkerId,demandId,status,pageCode))},
    getDemandInfo(id){dispatch(modalDemandActionCreator.showDemandInfo(id))},
    deleteDemand(checkerId,demandId,pageCode){dispatch(actionCreator.deleteDemand(checkerId,demandId,pageCode))},
});
export default connect(mapState,mapDispatch)(CloseDemand);

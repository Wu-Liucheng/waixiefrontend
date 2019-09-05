import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {
    Layout,
    Button,
    Table,
    Breadcrumb,
    message,
} from 'antd';
import {actionCreator} from "./store";
const {
    Content
} = Layout;
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
            title: '操作',
            key: 'action',
            render: (text,record) => (
                <span>
                    <Button type="primary" onClick={()=>{
                    }}>查看</Button>&nbsp;&nbsp;&nbsp;
                    <Button type="danger" onClick={()=>{

                    }}>删除</Button>
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
});
const mapDispatch = (dispatch) => ({
    setCheckerId(username){dispatch(actionCreator.setCheckerId(username))},
    getConsultantData(checkerId,pageCode){dispatch(actionCreator.getConsultantData(checkerId,pageCode))},
});
export default connect(mapState,mapDispatch)(ChangeConsultantStatus);

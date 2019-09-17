import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {
    Layout,
    Button,
    Table,
    Breadcrumb,
    Tabs,Icon,Modal,message,
} from 'antd';
import {actionCreator} from "./store";
import AddRole from '../addRoleForm/index';
const {
    Content
} = Layout;
const {TabPane} = Tabs;
const {confirm} = Modal;
class AdminInfo extends PureComponent{

    componentDidMount() {
        const {getManagerData,getCheckerData,getCorporateAdminData} = this.props;
        getManagerData(1);
        getCheckerData(1);
        getCorporateAdminData(1);
    }

    render() {
        const {
            role
            ,changeTabStatus,

            managerData,getManagerData,deleteManager,
            managerTotal,getCheckerData,
            managerPageCode,getCorporateAdminData,

            checkerData,deleteChecker,
            checkerTotal,
            checkerPageCode,

            corporateAdminData,deleteCorporateAdmin,
            corporateAdminTotal,
            corporateAdminPageCode,
        } = this.props;
        const managerColumns = [{
            title:'序号',
            dataIndex:'number',
            key:'number',
        },{
            title:'登录名称',
            dataIndex:'loginName',
            key:'loginName',
        },{
            title:'经理姓名',
            dataIndex:'name',
            key:'name',
        },{
            title:'联系邮箱',
            dataIndex:'email',
            key:'email'
        },{
            title:'手机号',
            dataIndex:'mobile',
            key:'mobile',
        },{
            title:'所属公司',
            dataIndex:'clientName',
            key:'clientName',
        },{
            title: '操作',
            key: 'action',
            render: (text,record) => (
                <span>
                    <Button type="danger" onClick={()=>{
                        confirm({
                            title: '是否删除该用户？',
                            content: '注意：此操作不可撤销',
                            okText:"确定",
                            okType:"danger",
                            cancelText:"取消",
                            onOk() {
                                if(role !== 0){
                                    message.error("没有权限！");
                                }
                                else {
                                    deleteManager(record.id,managerPageCode);
                                }
                            },
                            onCancel() {
                            },
                        });
                    }}>删除</Button>
                </span>
            ),
        }];

        const checkerColumns = [{
            title:'序号',
            dataIndex:'number',
            key:'number',
        },{
            title:'登录名称',
            dataIndex:'loginName',
            key:'loginName',
        },{
            title:'专员姓名',
            dataIndex:'name',
            key:'name',
        },{
            title:'联系邮箱',
            dataIndex:'email',
            key:'email'
        },{
            title:'手机号',
            dataIndex:'mobile',
            key:'mobile',
        },{
            title: '操作',
            key: 'action',
            render: (text,record) => (
                <span>
                    <Button type="danger" onClick={()=>{
                        confirm({
                            title: '是否删除该用户？',
                            content: '注意：此操作不可撤销',
                            okText:"确定",
                            okType:"danger",
                            cancelText:"取消",
                            onOk() {
                                if(role !== 0){
                                    message.error("没有权限！");
                                }
                                else {
                                    deleteChecker(record.id,checkerPageCode)
                                }
                            },
                            onCancel() {
                            },
                        });
                    }}>删除</Button>
                </span>
            ),
        }];

        const corporateAdminColumns = [{
            title:'序号',
            dataIndex:'number',
            key:'number',
        },{
            title:'登录名称',
            dataIndex:'loginName',
            key:'loginName',
        },{
            title:'管理员姓名',
            dataIndex:'name',
            key:'name',
        },{
            title:'联系邮箱',
            dataIndex:'email',
            key:'email'
        },{
            title:'手机号',
            dataIndex:'mobile',
            key:'mobile',
        },{
            title:'所属公司',
            dataIndex:'clientName',
            key:'clientName',
        },{
            title: '操作',
            key: 'action',
            render: (text,record) => (
                <span>
                    <Button type="danger" onClick={()=>{
                        confirm({
                            title: '是否删除该用户？',
                            content: '注意：此操作不可撤销，一般在项目结束后解除',
                            okText:"确定",
                            okType:"danger",
                            cancelText:"取消",
                            onOk() {
                                if(role !== 0){
                                    message.error("没有权限！");
                                }
                                else {
                                    deleteCorporateAdmin(record.id,corporateAdminPageCode);
                                }
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
                    <Breadcrumb.Item>基础信息维护</Breadcrumb.Item>
                    <Breadcrumb.Item>管理员信息</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Tabs defaultActiveKey="1" onChange={(activeKey) => {
                        switch (activeKey) {
                            case "1":changeTabStatus(1);break;
                            case "2":changeTabStatus(2);break;
                            case "3":changeTabStatus(3);break;
                            case "4":changeTabStatus(4);break;
                            default:changeTabStatus(0);break;
                        }
                    }}>
                        <TabPane
                            tab={
                                <span>
                                <Icon type="info-circle" theme="twoTone" />
                                项目经理
                                </span>
                            }
                            key="1"
                        >
                            <Table
                                columns={managerColumns}
                                dataSource={managerData.toJS()}
                                pagination={{showQuickJumper:true,pageSize:6,defaultCurrent:1,
                                    total:managerTotal,current:managerPageCode,onChange:(code)=>{
                                    getManagerData(code);
                                    }}} />
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
                                <Icon type="info-circle" theme="twoTone" />
                                外协专员
                                </span>
                            }
                            key="2"
                        >
                            <Table
                                columns={checkerColumns}
                                dataSource={checkerData.toJS()}
                                pagination={{showQuickJumper:true,pageSize:6,defaultCurrent:1,
                                    total:checkerTotal,current:checkerPageCode,onChange:(code)=>{
                                    getCheckerData(code);
                                    }}} />
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
                                <Icon type="info-circle" theme="twoTone" />
                                公司管理员
                                </span>
                            }
                            key="3"
                        >
                            <Table
                                columns={corporateAdminColumns}
                                dataSource={corporateAdminData.toJS()}
                                pagination={{showQuickJumper:true,pageSize:6,defaultCurrent:1,
                                    total:corporateAdminTotal,current:corporateAdminPageCode,onChange:(code)=>{
                                    getCorporateAdminData(code);
                                    }}} />
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
                                <Icon type="plus"/>
                                添加管理员
                                </span>
                            }
                            key="4"
                            disabled={role!==0}
                        >
                            <div style={{width:"80%",display:"flex",justifyContent:"center"}}>
                                <AddRole/>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        );
    }

}
const mapState = (state) => ({
    role:state.getIn(['adminLogin','role']),
    username:state.getIn(['adminLogin','username']),

    tabStatus: state.getIn(['adminInfo','tabStatus']),
    managerData: state.getIn(['adminInfo','managerData']),
    managerTotal: state.getIn(['adminInfo','managerTotal']),
    managerPageCode: state.getIn(['adminInfo','managerPageCode']),
    checkerData: state.getIn(['adminInfo','checkerData']),
    checkerTotal: state.getIn(['adminInfo','checkerTotal']),
    checkerPageCode: state.getIn(['adminInfo','checkerPageCode']),
    corporateAdminData: state.getIn(['adminInfo','corporateAdminData']),
    corporateAdminTotal: state.getIn(['adminInfo','corporateAdminTotal']),
    corporateAdminPageCode: state.getIn(['adminInfo','corporateAdminPageCode']),

});
const mapDispatch = (dispatch) => ({
    changeTabStatus(status){dispatch(actionCreator.changeTabStatus(status))},
    getManagerData(pageCode){dispatch(actionCreator.getManagerData(pageCode))},
    getCheckerData(pageCode){dispatch(actionCreator.getCheckerData(pageCode))},
    getCorporateAdminData(pageCode){dispatch(actionCreator.getCorporateAdminData(pageCode))},
    deleteManager(id,pageCode){dispatch(actionCreator.deleteManager(id,pageCode))},
    deleteChecker(id,pageCode){dispatch(actionCreator.deleteChecker(id,pageCode))},
    deleteCorporateAdmin(id,pageCode){dispatch(actionCreator.deleteCorporateAdmin(id,pageCode))},
});
export default connect(mapState,mapDispatch)(AdminInfo);

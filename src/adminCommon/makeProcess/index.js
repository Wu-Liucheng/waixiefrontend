import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {
    Modal,
    Divider,
    Layout,
    Button,
    Table,
    Breadcrumb,
    Tooltip,
    Icon, Select,
    message,
} from 'antd';
import {actionCreator} from "./store";
const {
    Content
} = Layout;
const {Option} = Select;

class MakeProcess extends PureComponent{

    componentDidMount() {
        const{
            processNodeGetOnePageInfo,
        } = this.props;
        processNodeGetOnePageInfo(1);
    }

    render() {
        const{
            processData,
            currentPageCode,
            total,
            modalIsVisible,

            processNodeGetOnePageInfo,
            changeModalIsVisible,
            role,username,

            clientId,changeClientId,
            checkerId,changeCheckerId,
            clientInfo,makeProcessGetAllClientSimplyInfo,makeProcessGetClientInfoByAdminName,
            checkerInfo,makeProcessGetAllChecker,

            addNode,
            verifyClientAdmin,
            deleteNode,
        } = this.props;

        const makeProcessColumns = [{
            title: '序号',
            dataIndex: 'id',
            key: 'id',
        },{
            title: '客户公司名称',
            dataIndex: 'clientName',
            key: 'clientName',
        },{
            title: '结点人员（外协专员/审核）',
            dataIndex: 'checkerName',
            key: 'checkerName',
        },{
            title: '操作',
            key: 'action',
            render: (text,record) => (
                <span>
                    <Tooltip title="删除" style={{color:"red"}}>
                        <Button type="danger" shape="circle" onClick={()=>{
                            //console.log(record.clientId,record.checkerId);
                            if(role === 0 || role === 3){
                                if(role === 0){
                                    deleteNode(record.clientId,record.checkerId,currentPageCode);
                                }
                                else if(role === 3){
                                    verifyClientAdmin(username,record.clientId,record.checkerId,currentPageCode);
                                }
                            }
                            else {
                                message.error("权限不足！");
                            }
                        }}>
                            <Icon type="minus" style={{color:"red"}}/>
                        </Button>
                    </Tooltip>
                </span>
            ),
        }];

        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>系统设置</Breadcrumb.Item>
                    <Breadcrumb.Item>流程定制</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Tooltip title="添加结点">
                        <Button shape="circle"  onClick={()=>{
                            if(role === 0 || role === 3){
                                changeModalIsVisible(true);
                            }
                            else {
                                message.error("权限不足！");
                            }
                        }} ><Icon type = "plus" style={{color:"blue"}}/></Button>
                    </Tooltip>
                    <Table columns={makeProcessColumns}
                           dataSource={processData.toJS()}
                           pagination={{current:currentPageCode,
                               showQuickJumper:true,pageSize:6,defaultCurrent:1,
                               total:total,position:"top",
                               onChange:(code)=>{processNodeGetOnePageInfo(code)}}} />
                </div>
                <Modal
                    width={800}
                    title="ADD"
                    visible={modalIsVisible}
                    onOk={()=>{addNode(clientId,checkerId,currentPageCode)}}
                    onCancel={()=>{changeModalIsVisible(false)}}
                    okText="添加节点"
                    cancelText="取消"
                >
                    <label>客户名称：</label>
                    <Select style={{width:300}} value={clientId} onChange={(value)=>{

                        changeClientId(value);

                    }
                    }
                            onFocus={() => {
                                if(role === 0){
                                    makeProcessGetAllClientSimplyInfo();
                                }
                                else if(role === 3){
                                    makeProcessGetClientInfoByAdminName(username);
                                }
                            }}
                    >
                        {
                            clientInfo == null?null:
                                clientInfo.map((item,index)=>{
                                    return (
                                        <Option key = {index} value={item.split(":")[0]}>{item.split(":")[1]}</Option>
                                    )
                                })
                        }
                    </Select>
                    <label>&nbsp;&nbsp;&nbsp;外协专员：</label>
                    <Select style={{width:200}} value={checkerId} onChange={changeCheckerId}
                            onFocus={()=>{
                                makeProcessGetAllChecker();
                            }}
                    >
                        {
                            checkerInfo==null?null:
                                checkerInfo.map((item,index)=>{
                                    return (
                                        <Option key ={index}  value={item.split(":")[0]}>{item.split(":")[1]}</Option>
                                    )
                                })
                        }
                    </Select>
                    <Divider dashed />

                </Modal>
            </Content>
        );
    }

}
const mapState = (state) => ({
    processData: state.getIn(['makeProcess','processData']),
    currentPageCode:state.getIn(['makeProcess','currentPageCode']),
    total:state.getIn(['makeProcess','total']),
    modalIsVisible:state.getIn(['makeProcess','modalIsVisible']),

    role:state.getIn(['adminLogin','role']),
    username:state.getIn(['adminLogin','username']),

    clientId:state.getIn(['makeProcess','clientId']),
    checkerId:state.getIn(['makeProcess','checkerId']),
    clientInfo:state.getIn(['makeProcess','clientInfo']),
    checkerInfo:state.getIn(['makeProcess','checkerInfo']),
});
const mapDispatch = (dispatch) => ({
    processNodeGetOnePageInfo(code){dispatch(actionCreator.processNodeGetOnePageInfo(code))},
    changeModalIsVisible(val){dispatch(actionCreator.changeModalIsVisible(val))},
    changeClientId(id){dispatch(actionCreator.changeClientId(id))},
    changeCheckerId(id){dispatch(actionCreator.changeCheckerId(id))},
    makeProcessGetAllClientSimplyInfo(){dispatch(actionCreator.makeProcessGetAllClientSimplyInfo())},
    makeProcessGetClientInfoByAdminName(username){dispatch(actionCreator.makeProcessGetClientInfoByAdminName(username))},
    makeProcessGetAllChecker(){dispatch(actionCreator.makeProcessGetAllChecker())},
    addNode(clientId,checkId,pageCode){dispatch(actionCreator.addNode(clientId,checkId,pageCode))},
    verifyClientAdmin(username,clientId,checkerId,pageCode){dispatch(actionCreator.verifyClientAdmin(username,clientId,checkerId,pageCode))},
    deleteNode(clientId,checkerId,pageCode){dispatch(actionCreator.deleteNode(clientId,checkerId,pageCode))},
});
export default connect(mapState,mapDispatch)(MakeProcess);

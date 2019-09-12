import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {
    Layout,
    Button,
    Table,
    Breadcrumb,
    Tag,Drawer,Divider,
} from 'antd';
import {actionCreator} from "./store";
const {
    Content
} = Layout;
class MessageToManager extends PureComponent{

    componentDidMount() {
        const {username,getManagerId} = this.props;
        getManagerId(username);
    }

    render() {
        const {
            managerId,
            noticeData,
            total,
            pageCode,
            getNoticeData,
            drawerIsVisible,changeDrawerIsVisible,

            setIsRead,
            deleteNotice,
            detail,getDetail,
        } = this.props;
        const columns = [{
            title:'状态',
            dataIndex:'status',
            render:(text,record)=>{
                if(record.read === true){
                    return <Tag>已读</Tag>
                }
                else {
                    return <Tag color="#87d068">未读</Tag>
                }
            }
        },{
            title:'序号',
            dataIndex:'number',
            key:'number',
        },{
            title:'需求名称',
            dataIndex:'demandName',
            key:'demandName',
        },{
            title:'来自（外协专员）',
            dataIndex:'checkerName',
            key:'checkerName',
        },{
            title:'需求是否通过审核',
            dataIndex:'examineStatus',
            key:'examineStatus',
            render:(text,record)=>{
                if(record.examineStatus===true){
                    return <Tag color="#87d068">通过</Tag>
                }
                else {
                    return <Tag color="#f50">未通过</Tag>
                }
            }
        },{
            title: '操作',
            key: 'action',
            render: (text,record) => (
                <span>
                    <Button type="primary" onClick={()=>{
                        if(record.read === false){
                            setIsRead(record.id);
                        }
                        getDetail(record.id);
                        changeDrawerIsVisible(true);
                    }}>查看详情</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="danger" onClick={()=>{
                        deleteNotice(record.id,managerId,pageCode)
                    }}>
                        删除
                    </Button>

                </span>
            ),
        }];
        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>项目经理专属</Breadcrumb.Item>
                    <Breadcrumb.Item>消息（来自外协专员）</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Table
                        columns={columns}
                        dataSource={noticeData.toJS()}
                        pagination={{showQuickJumper:true,pageSize:6,defaultCurrent:1,total:total,current:pageCode,onChange:(code)=>{
                                getNoticeData(managerId,code) }}} />

                </div>
                <Drawer
                    title="通知信息"
                    width = {300}
                    placement="right"
                    closable={false}
                    onClose={()=>{
                        changeDrawerIsVisible(false);
                        getNoticeData(managerId,pageCode);
                    }}
                    visible={drawerIsVisible}
                >
                    {detail==null?null:
                        <div>
                            <Tag color="#108ee9">需求名称</Tag><p>{detail.demandName}</p>
                            <Divider/>
                            <Tag color="#108ee9">是否审核通过</Tag>{detail.examineStatus.toString()}
                            <Divider/>
                            <Tag color="#108ee9">审核建议</Tag>
                            <p>
                                {detail.content}
                            </p>
                            <Divider/>
                            <Tag color="#108ee9">日期</Tag>
                            <p>{detail.createDate}</p>
                        </div>
                    }
                </Drawer>
            </Content>
        );
    }

}
const mapState = (state) => ({
    role:state.getIn(['adminLogin','role']),
    username:state.getIn(['adminLogin','username']),

    managerId:state.getIn(['messageToManager','managerId']),
    noticeData: state.getIn(['messageToManager','noticeData']),
    total:state.getIn(['messageToManager','total']),
    pageCode:state.getIn(['messageToManager','pageCode']),

    drawerIsVisible:state.getIn(['messageToManager','drawerIsVisible']),
    focusKey:state.getIn(['messageToManager','focusKey']),
    detail:state.getIn(['messageToManager','detail']),
});
const mapDispatch = (dispatch) => ({
    getManagerId(username){dispatch(actionCreator.getManagerId(username))},
    getNoticeData(managerId,pageCode){dispatch(actionCreator.getNoticeData(managerId,pageCode))},
    changeDrawerIsVisible(val){dispatch(actionCreator.changeDrawerIsVisible(val))},
    changeFocusKey(key){dispatch(actionCreator.changeFocusKey(key))},
    setIsRead(id){dispatch(actionCreator.setIsRead(id))},
    deleteNotice(id,managerId,pageCode){dispatch(actionCreator.deleteNotice(id,managerId,pageCode))},
    getDetail(id){dispatch(actionCreator.getDetail(id))},
});
export default connect(mapState,mapDispatch)(MessageToManager);

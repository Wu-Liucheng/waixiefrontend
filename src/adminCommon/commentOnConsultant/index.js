import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {
    Layout,
    Button,
    Table,
    Breadcrumb,Modal,
    Input
} from 'antd';
import {actionCreator} from "./store";
const {
    Content
} = Layout;
const {TextArea} = Input;
class CommentOnConsultant extends PureComponent{

    componentDidMount() {
        const {username,getManagerId} = this.props;
        getManagerId(username);
    }

    render() {
        const {
            managerId,
            getBindUsersForManager,
            cstData,
            total,
            pageCode,
            nowFocusUserId,changeNowFocusUserId,
            comments,changeComments,changeCommentDefault,
            mdlIsVisible,changeMdlIsVisible,

            addComment,
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
            title: '操作',
            key: 'action',
            render: (text,record) => (
                <span>
                    <Button type="primary" onClick={()=>{
                        changeNowFocusUserId(record.userId);
                        changeMdlIsVisible(true);
                    }}>添加评价</Button>

                </span>
            ),
        }];

        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>项目经理专属</Breadcrumb.Item>
                    <Breadcrumb.Item>顾问评价</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Table
                        columns={columns}
                        dataSource={cstData.toJS()}
                           pagination={{showQuickJumper:true,pageSize:6,defaultCurrent:1,total:total,current:pageCode,onChange:(code)=>{
                                   getBindUsersForManager(managerId,code);
                               }}} />

                </div>
                <Modal title="评价一名顾问"
                       visible={mdlIsVisible}
                       okText="确定"
                       cancelText="取消"
                       onOk={()=>{
                           addComment(managerId,nowFocusUserId,comments);
                       }}
                       onCancel={()=>{
                           changeMdlIsVisible(false);
                           changeNowFocusUserId(null);
                           changeCommentDefault();
                       }}
                >
                    <TextArea rows={3} value={comments} onChange={changeComments}/>
                </Modal>
            </Content>
        );
    }

}
const mapState = (state) => ({
    role:state.getIn(['adminLogin','role']),
    username:state.getIn(['adminLogin','username']),

    managerId:state.getIn(['commentOnConsultant','managerId']),
    cstData:state.getIn(['commentOnConsultant','cstData']),
    total:state.getIn(['commentOnConsultant','total']),
    pageCode:state.getIn(['commentOnConsultant','pageCode']),
    nowFocusUserId: state.getIn(['commentOnConsultant','nowFocusUserId']),
    comments:state.getIn(['commentOnConsultant','comments']),
    mdlIsVisible:state.getIn(['commentOnConsultant','mdlIsVisible']),
});
const mapDispatch = (dispatch) => ({
    getManagerId(username){dispatch(actionCreator.getManagerId(username))},
    getBindUsersForManager(managerId,pageCode){dispatch(actionCreator.getBindUsersForManager(managerId,pageCode))},
    changeNowFocusUserId(id){dispatch(actionCreator.changeNowFocusUserId(id))},
    changeComments(e){dispatch(actionCreator.changeComments(e.target.value))},
    changeCommentDefault(){dispatch(actionCreator.changeCommentDefault)},
    changeMdlIsVisible(val){dispatch(actionCreator.changeMdlIsVisible(val))},
    addComment(managerId,userId,comment){dispatch(actionCreator.addComment(managerId,userId,comment))},

});
export default connect(mapState,mapDispatch)(CommentOnConsultant);

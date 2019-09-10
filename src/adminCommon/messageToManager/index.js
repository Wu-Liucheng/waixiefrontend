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
const {
    Content
} = Layout;
const {confirm} = Modal;
class MessageToManager extends PureComponent{

    componentDidMount() {
        /*const {role,username,setCheckerId} = this.props;
        if(role === 2){
            setCheckerId(username);
        }
        else{
            message.error("您不是外协专员，此模块无权查看。");
        }*/
    }

    render() {
        const {
        } = this.props;

        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>项目经理专属</Breadcrumb.Item>
                    <Breadcrumb.Item>消息（来自外协专员）</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Table
                        pagination={{showQuickJumper:true,pageSize:6,defaultCurrent:1,total:6,current:1,onChange:(code)=>{
                            }}} />

                </div>
            </Content>
        );
    }

}
const mapState = (state) => ({
    role:state.getIn(['adminLogin','role']),
    username:state.getIn(['adminLogin','username']),

});
const mapDispatch = (dispatch) => ({

});
export default connect(mapState,mapDispatch)(MessageToManager);

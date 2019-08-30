import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import './index.css';
import {Input,Button,Form,Icon,Radio} from 'antd';
import {Redirect} from "react-router-dom";
import {actionCreator} from "./store";

class administratorLogin extends PureComponent {

    handleSubmit = (e) => {
        const {adminLoginAction} = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                adminLoginAction(values.username,values.password,values.role);
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const {loginStatus} = this.props;
        return (
            <div className="admin-login-wrapper">
                <span className="admin-login-topic">外协管理系统后台</span>
                <br/>
                <span className="admin-login-topic">登录</span>
                <Form onSubmit={this.handleSubmit} className="login-form" id="components-form-demo-normal-login">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名！' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" title="用户名" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码！' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" title = "密码" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('role', {
                            rules: [{ required: true, message: '请选择角色！' }],
                        })(
                            <Radio.Group >
                                <Radio value={0}>管理员</Radio>
                                <Radio value={1}>项目经理</Radio>
                                <Radio value={2}>外协专员</Radio>
                                <Radio value={3}>公司管理员</Radio>
                            </Radio.Group>                        )}

                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>

                    </Form.Item>
                </Form>
                {loginStatus?<Redirect to='/admin/main'/>:null}
            </div>
        )
    }

}
const adminLogin = Form.create({ name: 'normal_login' })(administratorLogin);

const mapState = (state) => ({
    username:state.getIn(['adminLogin','username']),
    loginStatus:state.getIn(['adminLogin','loginStatus']),
    role:state.getIn(['adminLogin','role'])
});
const mapDispatch = (dispatch) => ({
    adminLoginChangeUsername(username){
        dispatch(actionCreator.adminLoginChangeUsername(username));
    },
    adminLoginChangePassword(password){
        dispatch(actionCreator.adminLoginChangePassword(password));
    },
    adminLoginAction(username,password,role){
        dispatch(actionCreator.adminLoginLoginAction(username,password,role))
    },
    adminLoginChangeRole(value){
        dispatch(actionCreator.adminLoginChangeRole(value))
    },
});
export default connect(mapState,mapDispatch)(adminLogin);
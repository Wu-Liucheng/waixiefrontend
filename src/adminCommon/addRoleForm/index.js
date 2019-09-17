import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Select,
    Button, Radio,
    message,
} from 'antd';
import {actionCreator} from "./store";
const { Option } = Select;

class AddRoleForm extends PureComponent {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    componentDidMount() {
        const {getAllClientInfo} = this.props;
        getAllClientInfo();
    }

    handleSubmit = e => {
        e.preventDefault();
        const {
            role,
            username,
            managerPageCode,
            checkerPageCode,
            corporateAdminPageCode,
            addRoleAction
        } = this.props;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
                if(role === 0){
                    let pageCode;
                    switch (values.role) {
                        case 1:pageCode = managerPageCode;break;
                        case 2:pageCode = checkerPageCode;break;
                        case 3:pageCode = corporateAdminPageCode;break;
                        default:break;
                    }
                    addRoleAction(values.loginName,values.password,values.email,values.phone,
                        values.name,values.role,values.client,username,pageCode);
                }
                else {
                    message.error("权限不足！");
                }
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('您输入的两次密码不一致！');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const {clientInfo} = this.props;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="添加的角色">
                    {getFieldDecorator('role', {
                        rules: [{ required: true, message: '请选择角色！' }],
                    })(
                        <Radio.Group >
                            <Radio value={1}>项目经理</Radio>
                            <Radio value={2}>外协专员</Radio>
                            <Radio value={3}>公司管理员</Radio>
                        </Radio.Group>                        )}

                </Form.Item>
                <Form.Item label="邮箱">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: '请填写正确的邮箱地址！',
                            },
                            {
                                required: true,
                                message: '请输入注册邮箱！',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item
                    label={
                        <span>
              登录名称&nbsp;
                            <Tooltip title="用于用户的登录。">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
                    }
                >
                    {getFieldDecorator('loginName', {
                        rules: [{ required: true, message: '请输入登录账号！', whitespace: true }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="密码" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '请输入用户密码！',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="确认密码" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: '请确认密码！',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item
                    label={
                        <span>
              用户姓名&nbsp;
            </span>
                    }
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入用户姓名！', whitespace: true }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="手机号">
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '请输入用户的手机号！' }],
                    })(<Input style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label="所属公司">
                    {
                        getFieldDecorator('client',{
                            rules:[{required:true,message:'请选择所属公司！'}],
                        })(<Select style={{width:200}}>
                            {
                                clientInfo==null?null:
                                    clientInfo.map((item,index)=>{
                                        return (
                                            <Option key = {index} value={item.split(":")[0]}>{item.split(":")[1]}</Option>
                                        )
                                    })
                            }
                        </Select>)
                    }
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        添加用户
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
const mapState = (state) => ({
    clientInfo:state.getIn(['addRoleForm','clientInfo']),

    role:state.getIn(['adminLogin','role']),
    username:state.getIn(['adminLogin','username']),

    managerPageCode: state.getIn(['adminInfo','managerPageCode']),
    checkerPageCode: state.getIn(['adminInfo','checkerPageCode']),
    corporateAdminPageCode: state.getIn(['adminInfo','corporateAdminPageCode']),
});
const mapDispatch = (dispatch) => ({
    getAllClientInfo(){dispatch(actionCreator.getAllClientInfo())},
    addRoleAction(loginName,password,email,phone,name,role,clientId,operateName,pageCode){
        dispatch(actionCreator.addRoleAction(loginName,password,email,phone,name,role,clientId,operateName,pageCode));
    }
});
const AddRole = Form.create({ name: 'register' })(AddRoleForm);

export default connect(mapState,mapDispatch)(AddRole);
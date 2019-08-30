/*
* @Author:Wuliucheng
* @Description:Realize login user interface
* @Date:2019-3-20
* */

import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import './index.css';
import {Input,Button} from 'antd';
import {actionCreator} from './store';
import {Redirect} from "react-router-dom";
import {Link} from "react-router-dom";

class Login extends PureComponent {
    render() {
        const {loginStatus,
            accountValue,
            passwordValue,
            handleAccountInputChange,
            handlePasswordInputChange,
            login} = this.props;
        return (
            <div className="stylelogin" id="loginBody">
                <div className = "loginWrapper">
                    <div className="ocms-img"></div>
                    <div className="dengLu">登录</div>

                    {/*<div className="showMsg">
                        {!loginStatus?<div>
                            {showMsg}
                        </div>: <Redirect to = '/'/>}
                    </div>*/}
                    {
                        loginStatus? <Redirect to = '/main'/>:null
                    }
                    <Input value={accountValue} className="in" placeholder="用户名" title="用户名"
                           onChange={handleAccountInputChange}/>
                    <Input value={passwordValue} className="in" type="password" placeholder="密码" title="密码"
                           onChange={handlePasswordInputChange}
                           onPressEnter={() => login(accountValue,passwordValue)}/>
                    <div className="tiShi1">没有账户? <Link to='/register'><span>创建一个!</span></Link></div>
                    <div className="tiShi2"><Link to='/forget'>忘记密码？</Link></div>
                    <Button onClick={() => login(accountValue,passwordValue)} className="queRen" type="default"><p>确认</p></Button>
                </div>
            </div>
        )
    }

}
/*拿到login以判断当login变化时实现页面的变化*/
const mapState = (state) => ({
    loginStatus:state.getIn(['login','login']),
    accountValue: state.getIn(['login','accountValue']),
    passwordValue: state.getIn(['login','passwordValue']),
    showMsg:state.getIn(['login','showMsg']),
});
const mapDispatch = (dispatch) => ({
    handleAccountInputChange(e){
        dispatch(actionCreator.changeAccountValue(e.target.value))
    },
    handlePasswordInputChange(e){
        dispatch(actionCreator.changePasswordValue(e.target.value))
    },
    login(account,password){
        dispatch(actionCreator.login(account,password))
    },

});
export default connect(mapState,mapDispatch)(Login);
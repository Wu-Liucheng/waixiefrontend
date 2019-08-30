import React ,{PureComponent} from "react";
import './index.css'
import {connect} from "react-redux";
import {Input, Button, Radio, message} from "antd";
import {actionCreator} from './store';
import {Redirect} from "react-router-dom";
class Register extends PureComponent{

    constructor(){
        super();
        this.sendIdentifyCodeInterval = 60;
    }

    componentDidMount() {
        this.intervalSetTime = setInterval(() => {
            const {identifyCodeInterval,changeInterval,changeIsSent,isSent} = this.props;
            if(isSent)
            {
                if(identifyCodeInterval === 0){
                    changeIsSent(false);
                }
                changeInterval(identifyCodeInterval-1);
            }
            else {

            }
        },1000);
    }
    componentWillUnmount() {
        clearInterval(this.intervalSetTime);
    }

    render() {
        const {
            isFirstPage,changePageCode,
            username,changeUsername,usernameIsExist,checkUsernameIsExist,
            pwd,changePwd,
            email,changeEmail,
            identifyCode,changeIdentifyCode,
            name,changeName,
            sex,changeSex,
            phone,changePhone,
            QQ,changeQQ,
            isSent,
            identifyCodeInterval,
            sendIdentifyCode,
            checkIdentifyCode,
            registerAction,
            returnFlag,
        } = this.props;
        const RadioGroup = Radio.Group;
        return(
            <div id = "styleregister">
                <div id = "registerWrapper">
                    <div className="dengLu">注册</div>
                    {isFirstPage?
                        <div>
                            <Input className={usernameIsExist?"in0":"in"} placeholder="用户名" title="用户名"
                                   value={username}
                                   onChange={changeUsername}
                                   onBlur={() => checkUsernameIsExist(username)}
                            />
                            <Input className="in" type="password" placeholder="密码" title="密码"
                                   value={pwd}
                                   onChange={changePwd}
                            />
                            <div className="clearfix">
                                <Input className="in youXiang" placeholder="邮箱" title="邮箱"
                                       value={email}
                                       onChange={changeEmail}
                                       onPressEnter={
                                           () => {
                                               if(isSent){

                                               }
                                               else {
                                                   sendIdentifyCode(email);
                                               }
                                           }
                                       }
                                />
                                <div className={isSent?"faSongYZM0":"faSongYZM"}
                                     onClick={() => {
                                         if(isSent){

                                         }
                                         else {
                                            sendIdentifyCode(email);
                                         }
                                     }
                                     }
                                >发送验证码 {!isSent?null:identifyCodeInterval+"秒"}</div>
                            </div>
                            <Input className="in" placeholder="验证码" title="验证码"
                                   value={identifyCode}
                                   onChange={changeIdentifyCode}
                            />
                            <Button className="queRen" onClick={
                                () => {
                                    var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
                                    var r = reg.test(email);
                                    if(username.length ===0 || pwd.length > 16 ||
                                    !r || pwd.length === 0 || pwd.length < 8 ||
                                        identifyCode.length===0 || usernameIsExist)
                                    {
                                        if(username.length === 0)
                                        {
                                            message.info("请输入用户名");
                                        }
                                        if(pwd.length === 0)
                                        {
                                            message.info("请输入密码");
                                        }
                                        else if(pwd.length < 8)
                                        {
                                            message.info("至少八位密码");
                                        }
                                        else if(pwd.length > 16)
                                        {
                                            message.info("至多16位密码")
                                        }
                                        if(!r)
                                        {
                                            message.info("邮箱格式有误");
                                        }
                                        if(identifyCode.length === 0)
                                        {
                                            message.info("请输入验证码");
                                        }
                                        if(usernameIsExist)
                                        {
                                            message.error("此用户名已存在");
                                        }
                                    }
                                    else
                                    {
                                        checkIdentifyCode(email,identifyCode);
                                    }

                            }
                            }>下一步</Button>
                        </div>
                        :
                        <div>
                            <Input className="in" placeholder="姓名" title="姓名"
                                   value={name}
                                   onChange={changeName}
                            />
                            <RadioGroup className="radioGroup"  value={sex} onChange={changeSex}>
                                <Radio value={true} >男</Radio>
                                <Radio value={false}>女</Radio>
                            </RadioGroup>
                            <Input className="in" placeholder="手机号" title="手机号"
                                   value={phone}
                                   onChange={changePhone}
                            />
                            <Input className="in" placeholder="QQ" title="QQ号"
                                   value={QQ}
                                   onChange={changeQQ}
                            />
                            <Button id="register"
                                    onClick={() => {
                                        var p = /^[1][3,4,5,7,8][0-9]{9}$/i;
                                        var b = p.test(phone);
                                        var q = /[1-9][0-9]{4,}/;
                                        var a = q.test(QQ);
                                        if(name.length === 0 || name.length > 4 || !b || !a)
                                        {
                                            if(name.length === 0)
                                            {
                                                message.info("请输入姓名")
                                            }
                                            if(name.length > 10)
                                            {
                                                message.info("姓名过长");
                                            }
                                            if(!b)
                                            {
                                                message.info("手机号格式有误");
                                            }
                                            if(!a)
                                            {
                                                message.info("QQ格式不正确");
                                            }
                                        }
                                        else
                                        {
                                            registerAction(username,pwd,email,name,sex,phone,QQ);
                                        }
                                    }
                                    }
                            >注册</Button>
                            <Button className="queRen" onClick={() =>changePageCode(true)}>返回</Button>
                        </div>
                    }
                </div>
                {returnFlag?<Redirect to='/'/>:null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isFirstPage: state.getIn(['register','isFirstPage']),
    username:state.getIn(['register','username']),
    pwd:state.getIn(['register','password']),
    email:state.getIn(['register','email']),
    identifyCode:state.getIn(['register','identifyCode']),
    name:state.getIn(['register','name']),
    sex:state.getIn(['register','isMale']),
    phone:state.getIn(['register','phone']),
    QQ:state.getIn(['register','QQnumber']),
    isSent:state.getIn(['register','isSent']),
    identifyCodeInterval:state.getIn(['register','sendIdentifyCodeInterval']),
    usernameIsExist:state.getIn(['register','usernameIsExist']),
    returnFlag:state.getIn(['register','returnFlag']),
});

const mapDispatchToProps = (dispatch) => ({
    changePageCode(isFirst){
        dispatch(actionCreator.changeIsFirstPage(isFirst));
    },
    changeUsername(e){
        dispatch(actionCreator.registerChangeUsername(e.target.value));
    },
    changePwd(e){
        dispatch(actionCreator.registerChangePwd(e.target.value));
    },
    changeEmail(e){
        dispatch(actionCreator.regsterChangeEmail(e.target.value));
    },
    changeIdentifyCode(e){
        dispatch(actionCreator.registerChangeIdentifyCode(e.target.value));
    },
    changeName(e){
        dispatch(actionCreator.registerChangeName(e.target.value));
    },
    changeSex(e){
        dispatch(actionCreator.registerChangeSex(e.target.value));
    },
    changePhone(e){
        dispatch(actionCreator.registerChangePhone(e.target.value));
    },
    changeQQ(e){
        dispatch(actionCreator.registerChangeQQNumber(e.target.value));
    },
    changeInterval(interval){
        dispatch(actionCreator.registerChangeSICI(interval));
    },
    changeIsSent(val){
        dispatch(actionCreator.registerChangeIsSent(val));
    },
    sendIdentifyCode(email){
        var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        var r = reg.test(email);
        if(r){
            dispatch(actionCreator.registerSendIdentifyCode(email))
        }
        else {
            message.error("邮箱格式有误");

        }
    },
    checkIdentifyCode(email,ic){
        dispatch(actionCreator.registerCheckIdentifyCode(email,ic));
    },
    checkUsernameIsExist(username){
        dispatch(actionCreator.registerCheckUsernameIsExist(username));
    },
    registerAction(username,pwd,email,name,sex,phone,qq){
        dispatch(actionCreator.registerAction(username,pwd,email,name,sex,phone,qq));
    },
});

export default connect(mapStateToProps,mapDispatchToProps)(Register);
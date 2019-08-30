import React ,{PureComponent} from "react";
import './index.css'
import {connect} from "react-redux";
import {Input,Button,message} from "antd";
import {actionCreator} from "./store";
import {Redirect} from "react-router-dom";
class Forget extends PureComponent{

    componentDidMount() {
        this.intervalSetTime = setInterval(() => {
            const {sendIdentifyCodeInterval,changeInterval,changeIsSent,isSent} = this.props;
            if(isSent)
            {
                if(sendIdentifyCodeInterval === 0){
                    changeIsSent(false);
                }
                changeInterval(sendIdentifyCodeInterval-1);
            }
            else {
                changeInterval(60);
            }
        },1000);
    }
    componentWillUnmount() {
        clearInterval(this.intervalSetTime);
    }

    render() {
        const {
            username,changeUsername,
            identifyCode,changeIdentifyCode,
            newPwd_0,changeNewPwd_0,
            newPwd_1,changeNewPwd_1,
            isSent,
            sendIdentifyCodeInterval,
            sendIdentifyCode,
            returnFlag,
            changePwdAction,
        } = this.props;
        return(
            <div id = "styleregister">
                <div id = "registerWrapper">
                    <div className="dengLu">更改密码</div>
                    <div className="clearfix">
                        <Input className="in youXiang" placeholder="用户名" title="用户名"
                               value={username}
                               onChange={changeUsername}
                        />
                        <div className={isSent?"faSongYZM0":"faSongYZM"}
                             onClick={() => {
                                 if(isSent){

                                 }
                                 else {
                                     if(username.length === 0)
                                     {
                                         message.info("请输入用户名");
                                     }
                                     else
                                     {
                                         sendIdentifyCode(username);
                                     }
                                 }
                             }
                             }
                        >发送验证码 {!isSent?null:sendIdentifyCodeInterval+"秒"}</div>
                    </div>
                    <Input className="in" placeholder="验证码" title="验证码"
                           value={identifyCode}
                           onChange={changeIdentifyCode}
                    />
                    <Input className="in" type="password" placeholder="新密码" title="新密码"
                           value={newPwd_0}
                           onChange={changeNewPwd_0}
                    />
                    <Input className="in" type="password" placeholder="确认密码" title="确认密码"
                           value={newPwd_1}
                           onChange={changeNewPwd_1}
                    />
                    <Button className="queRen"
                            onClick={
                                () => {
                                    if (username.length === 0 || identifyCode.length === 0 ||
                                        newPwd_1.length === 0 || newPwd_0.length === 0 ||
                                        newPwd_0.length < 8 || newPwd_0.length > 16 || newPwd_0 !== newPwd_1)
                                    {
                                        if(username.length === 0)
                                        {
                                            message.info("请输入用户名")
                                        }
                                        if(identifyCode.length === 0)
                                        {
                                            message.info("请输入验证码")
                                        }
                                        if(newPwd_1.length === 0 || newPwd_0.length === 0)
                                        {
                                            message.info("请输入新密码")
                                        }
                                        if(newPwd_0.length < 8 || newPwd_0.length > 16)
                                        {
                                            message.info("密码应为8~16位")
                                        }
                                        if(newPwd_0 !== newPwd_1)
                                        {
                                            message.info("前后密码不一致")
                                        }
                                    }
                                    else
                                    {
                                        changePwdAction(username,identifyCode,newPwd_1);
                                    }
                                }
                            }
                    >确认</Button>
                </div>
                {returnFlag?<Redirect to='/'/>:null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    username:state.getIn(["forget","username"]),
    identifyCode:state.getIn(["forget","identifyCode"]),
    newPwd_0:state.getIn(["forget","newPwd_0"]),
    newPwd_1:state.getIn(["forget","newPwd_1"]),
    usernameLegal:state.getIn(["forget","usernameLegal"]),
    identifyCodeLegal:state.getIn(["forget","identifyCodeLegal"]),
    newPwdLegal:state.getIn(["forget","newPwdLegal"]),
    isSent:state.getIn(["forget","isSent"]),
    sendIdentifyCodeInterval:state.getIn(["forget","sendIdentifyCodeInterval"]),
    returnFlag:state.getIn(["forget","returnFlag"]),
});

const mapDispatchToProps = (dispatch) => ({
    changeUsername(e) {
        dispatch(actionCreator.forgetChangeUsername(e.target.value));
    },
    changeIdentifyCode(e) {
        dispatch(actionCreator.forgetChangeIdentifyCode(e.target.value));
    },
    changeNewPwd_0(e) {
        dispatch(actionCreator.forgetChangeNewPwd_0(e.target.value));
    },
    changeNewPwd_1(e)  {
        dispatch(actionCreator.forgetChangeNewPwd_1(e.target.value));
    },
    changeIsSent(val) {
        dispatch(actionCreator.forgetChangeIsSent(val));
    },
    changeInterval(interval) {
        dispatch(actionCreator.forgetChangeInterval(interval))
    },
    sendIdentifyCode(username) {
        dispatch(actionCreator.sendIdentifyCodeByUsername(username))
    },
    changePwdAction(username,identify,pwd){
        dispatch(actionCreator.forgetChangePasswordAction(username,identify,pwd));
    },
});

export default connect(mapStateToProps,mapDispatchToProps)(Forget);
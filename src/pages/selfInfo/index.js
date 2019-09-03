import React ,{PureComponent} from "react";
import './index.css'
import {connect} from "react-redux";
import Footer from "../../common/footer";
import Header from "../../common/header";
import {Button, Input,message,Select,Radio,DatePicker} from "antd";
import {Link} from "react-router-dom";
import {actionCreator} from "./store";
import moment from 'moment';

class SelfInfo extends PureComponent{

    componentDidMount() {
        const {username,loginStatus,selfGetInfoFromServer} = this.props;
        if(loginStatus)
        {
            selfGetInfoFromServer(username);
        }
        else
        {
            message.info("请先登录");
        }
    }

    render() {
        const {
            isBaseInfoPage,changePage,
            name,selfChangeName,
            email,selfChangeEmail,
            username0,selfChangeUsername,
            qq,selfChangeQQ,
            employYears,selfChangeEmployYears,
            phone,selfChangePhone,
            goodAt,selfChangeGoodAt,
            estimateLevel,selfChangeEstimate,
            planDate,selfChangePlanDate,
            communicateDate,selfChangeCommunicateDate,
            isBeingUsed,
            communicatePerson,selfChangeCommunicatePerson,
            employNumber,selfChangeEmployNumber,
            idealSalary,selfChangeIdealSalary,
            idNumber,selfChangeIdNumber,
            birth,selfChangeBirth,
            degree,selfChangeDegree,
            priceUnit,selfChangePriceUnit,
            school,selfChangeSchool,
            sex,selfChangeSex,
            location,selfChangeLocation,
            otherInfo,selfChangeOtherInfo,
            selfSave,
        } = this.props;
        const Option = Select.Option;
        const RadioGroup = Radio.Group;
        return(
            <div>
                <div className="mainDIV1">
                    <Header/>
                    <div id="selfWrapper">
                        <div className="reminder0">
                            <Link to="/main">
                            <span>首页</span>
                            </Link>
                            <span className="iconfont">&#xe636;</span>
                            <span className="specialSpan">个人中心</span>
                        </div>
                        <div id = "infoWrapper">
                            <div id = "infoLeft">
                                <div id="touxiang">
                                    <div id = "tupian"></div>
                                    个人中心
                                </div>
                                <div className={isBaseInfoPage?"condition1":"condition0"}
                                     onClick={() => changePage(true)}>顾问基本信息</div>
                                <div className={isBaseInfoPage?"condition0":"condition1"}
                                     onClick={() => changePage(false)}>个人基础信息</div>
                                <Link to='/forget'>
                                    <div className="condition0">修改密码</div>
                                </Link>

                            </div>
                            {
                                isBaseInfoPage?
                                    <div className="infoRight">
                                        <div className="leftWrapper">
                                            <div className="clearfix">
                                                <div id="touxiang1">

                                                </div>
                                                <div className="item0" style={{width:230,float:"right",marginLeft:0}}>
                                                    姓名:<Input className="input0" style={{width:180}}
                                                              value={name}
                                                              onChange={selfChangeName}
                                                />
                                                </div>
                                                <div className="item0" style={{width:230,float:"right",marginLeft:0}}>
                                                    邮箱:<Input className="input0" style={{width:180}}
                                                              value={email}
                                                              onChange={selfChangeEmail}
                                                              disabled={true}
                                                />
                                                </div>
                                            </div>
                                            <div className="item0">
                                                从业年限:<Input className="input0"
                                                            value={employYears}
                                                            onChange={selfChangeEmployYears}
                                            />
                                            </div>
                                            <div className="item0">
                                                擅长模块:<Input className="input0"
                                                            value={goodAt}
                                                            onChange={selfChangeGoodAt}
                                            />
                                            </div>
                                            <div className="item0">
                                                计划出项目日期:{/*<Input style={{width: 180}}  className="input0"
                                                               value={planDate}
                                                               onChange={selfChangePlanDate}
                                            />*/}
                                                <DatePicker style={{marginLeft:10}}
                                                            format={'YYYY-MM-DD'}
                                                            value={planDate.toString()===""?moment():moment(planDate.toString(),"YYYY-MM-DD")}
                                                            onChange={selfChangePlanDate}/>
                                            </div>
                                            <div className="item0">
                                                使用状态:{/*<Input className="input0"
                                                            value={isBeingUsed}
                                                            onChange={selfChangeIsBeingUsed}
                                            />*/}
                                                <RadioGroup value={isBeingUsed} className="self-group">
                                                    <Radio value={true}>在职</Radio>
                                                    <Radio value={false}>空闲</Radio>
                                                </RadioGroup>
                                            </div>
                                        </div>
                                        <div className="rightWrapper">
                                            <div className="item0">
                                                用户名:<Input className="input0"
                                                           value={username0}
                                                           onChange={selfChangeUsername}
                                                           disabled={true}
                                            />
                                            </div>
                                            <div className="item0">
                                                QQ:<Input className="input0"
                                                          value={qq}
                                                          onChange={selfChangeQQ}
                                            />
                                            </div>
                                            <div className="item0">
                                                手机号:<Input className="input0"
                                                           value={phone}
                                                           onChange={selfChangePhone}
                                            />
                                            </div>
                                            <div className="item0">
                                                评估级别:<Input className="input0"
                                                            value={estimateLevel}
                                                            onChange={selfChangeEstimate}
                                            />
                                            </div>
                                            <div className="item0">
                                                最近一次沟通日期:{/*<Input style={{width: 160}} className="input0"
                                                                value={communicateDate}
                                                                onChange={selfChangeCommunicateDate}
                                            />*/}
                                                <DatePicker style={{marginLeft:10}}
                                                            format={'YYYY-MM-DD'}
                                                            value={communicateDate.toString()===""?moment():moment(communicateDate.toString(),"YYYY-MM-DD")}
                                                            onChange={selfChangeCommunicateDate}/>
                                            </div>
                                            <div className="item0">
                                                沟通人:<Input className="input0"
                                                           value={communicatePerson}
                                                           onChange={selfChangeCommunicatePerson}
                                            />
                                            </div>
                                        </div>
                                        <Button className="save0"
                                                onClick={() => {
                                                    var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
                                                    var r = reg.test(email);
                                                    var p = /^[1][3,4,5,7,8][0-9]{9}$/i;
                                                    var b = p.test(phone);
                                                    var q = /[1-9][0-9]{4,}/;
                                                    var a = q.test(qq);
                                                    var i = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                                                    var c = i.test(idNumber);
                                                    if(!r|| !b || !a|| !c) {
                                                        if (!r) {
                                                            message.info("邮箱格式有误");
                                                        }
                                                        if(!b)
                                                        {
                                                            message.info("手机号格式有误");
                                                        }
                                                        if(!a)
                                                        {
                                                            message.info("QQ格式不正确");
                                                        }
                                                        if(!c)
                                                        {
                                                            message.info("身份证格式错误");
                                                        }
                                                    }
                                                    else

                                                    selfSave(name,email,username0,qq,employYears,phone,goodAt,estimateLevel,
                                                        planDate,communicateDate,isBeingUsed,communicatePerson,employNumber,idealSalary,idNumber,
                                                        birth,degree,priceUnit,school,sex,location,otherInfo);
                                                }
                                                }
                                        >保存</Button>
                                    </div>
                                    :
                                    <div className="infoRight">
                                        <div className="leftWrapper">
                                            <div className="item0">
                                                外协工号:<Input className="input0"
                                                            value={employNumber}
                                                            onChange={selfChangeEmployNumber}
                                            />
                                            </div>
                                            <div className="item0">
                                                身份证号:<Input className="input0"
                                                            value={idNumber}
                                                            onChange={selfChangeIdNumber}
                                            />
                                            </div>
                                            <div className="item0">
                                                最高学历:{/*<Input className="input0"
                                                            value={degree}
                                                            onChange={selfChangeDegree}
                                            />*/}
                                                <Select value={degree.toString()===""?"初中":degree} onChange={selfChangeDegree} style={{marginLeft:10}}>
                                                    <Option value="初中">初中</Option>
                                                    <Option value="高中">高中</Option>
                                                    <Option value="专科">专科</Option>
                                                    <Option value="本科">本科</Option>
                                                    <Option value="硕士">硕士</Option>
                                                    <Option value="博士">博士</Option>
                                                </Select>
                                            </div>
                                            <div className="item0">
                                                毕业院校:<Input className="input0"
                                                            value={school}
                                                            onChange={selfChangeSchool}
                                            />
                                            </div>
                                        </div>
                                        <div className="rightWrapper">
                                            <div className="item0">
                                                期望薪资:<Input className="input0"
                                                            value={idealSalary}
                                                            onChange={selfChangeIdealSalary}
                                            />
                                            </div>
                                            <div className="item0">
                                                出生日期:{/*<Input className="input0"
                                                            value={birth}
                                                            onChange={selfChangeBirth}
                                            />*/}
                                                <DatePicker style={{marginLeft:10}}
                                                    format={'YYYY-MM-DD'}
                                                            value={birth.toString()===""?moment():moment(birth.toString(),"YYYY-MM-DD")} onChange={selfChangeBirth}/>
                                            </div>
                                            <div className="item0">
                                                价格单位:<Input className="input0"
                                                            value={priceUnit}
                                                            onChange={selfChangePriceUnit}
                                            />
                                            </div>
                                            <div className="item0">
                                                性别:{/*<Input className="input0"
                                                          value={sex}
                                                          onChange={selfChangeSex}
                                            />*/}
                                                <RadioGroup value={sex} onChange={selfChangeSex} className="self-group">
                                                    <Radio value= {true} >男</Radio>
                                                    <Radio value={false}>女</Radio>
                                                </RadioGroup>
                                            </div>
                                        </div>
                                        <div className="item0" style={{width:720,float:"left",marginTop:-30}}>
                                            常居地:<Input className="input0" style={{width:600}}
                                                       value={location}
                                                       onChange={selfChangeLocation}
                                        />
                                        </div>
                                        <div className="item0" style={{width:720,float:"left",marginBottom:30}}>
                                            其他备注:<Input className="input0" style={{width:600}}
                                                        value={otherInfo}
                                                        onChange={selfChangeOtherInfo}
                                        />
                                        </div>
                                        <Button className="save0"
                                                onClick={() => {
                                                    var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
                                                    var r = reg.test(email);
                                                    var p = /^[1][3,4,5,7,8][0-9]{9}$/i;
                                                    var b = p.test(phone);
                                                    var q = /[1-9][0-9]{4,}/;
                                                    var a = q.test(qq);
                                                    var i = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                                                    var c = i.test(idNumber);
                                                    if(!r|| !b || !a|| !c) {
                                                        if (!r) {
                                                            message.info("邮箱格式有误");
                                                        }
                                                        if(!b)
                                                        {
                                                            message.info("手机号格式有误");
                                                        }
                                                        if(!a)
                                                        {
                                                            message.info("QQ格式不正确");
                                                        }
                                                        if(!c)
                                                        {
                                                            message.info("身份证格式错误");
                                                        }
                                                    }
                                                    else

                                                        selfSave(name,email,username0,qq,employYears,phone,goodAt,estimateLevel,
                                                            planDate,communicateDate,isBeingUsed,communicatePerson,employNumber,idealSalary,idNumber,
                                                            birth,degree,priceUnit,school,sex,location,otherInfo);
                                                }
                                                }
                                        >保存</Button>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isBaseInfoPage: state.getIn(['selfInfo','isBaseInfoPage']),
    username: state.getIn(['login','accountValue']),
    loginStatus:state.getIn(['login','login']),
    name:state.getIn(['selfInfo','name']),
    email:state.getIn(['selfInfo','email']),
    username0:state.getIn(['selfInfo','username']),
    qq:state.getIn(['selfInfo','qq']),
    employYears: state.getIn(['selfInfo','employYears']),
    phone:state.getIn(['selfInfo','phone']),
    goodAt:state.getIn(['selfInfo','goodAt']),
    estimateLevel: state.getIn(['selfInfo','estimateLevel']),
    planDate: state.getIn(['selfInfo','planDate']),
    communicateDate: state.getIn(['selfInfo','communicateDate']),
    isBeingUsed: state.getIn(['selfInfo','isBeingUsed']),
    communicatePerson: state.getIn(['selfInfo','communicatePerson']),
    employNumber: state.getIn(['selfInfo','employNumber']),
    idealSalary: state.getIn(['selfInfo','idealSalary']),
    idNumber: state.getIn(['selfInfo','idNumber']),
    birth:state.getIn(['selfInfo','birth']),
    degree:state.getIn(['selfInfo','degree']),
    priceUnit: state.getIn(['selfInfo','priceUnit']),
    school:state.getIn(['selfInfo','school']),
    sex:state.getIn(['selfInfo','sex']),
    location:state.getIn(['selfInfo','location']),
    otherInfo: state.getIn(['selfInfo','otherInfo']),
});

const mapDispatchToProps = (dispatch) => ({
    changePage(oneValue){
        dispatch(actionCreator.changeInfoModule(oneValue));
    },
    selfGetInfoFromServer(username){
        dispatch(actionCreator.selfGetInfo(username));
    },
    selfChangeName(e){
        dispatch(actionCreator.selfChangeName(e.target.value));
    },
    selfChangeEmail(e){
        dispatch(actionCreator.selfChangeEmail(e.target.value));
    },
    selfChangeUsername(e){
        dispatch(actionCreator.selfChangeUsername(e.target.value));
    },
    selfChangeQQ(e){
        dispatch(actionCreator.selfChangeQQ(e.target.value));
    },
    selfChangeEmployYears(e){
        dispatch(actionCreator.selfChangeEmployYears(e.target.value));
    },
    selfChangePhone(e){
        dispatch(actionCreator.selfChangePhone(e.target.value));
    },
    selfChangeGoodAt(e){
        dispatch(actionCreator.selfChangeGoodAt(e.target.value));
    },
    selfChangeEstimate(e){
        dispatch(actionCreator.selfChangeEstimateLevel(e.target.value));
    },
    selfChangePlanDate(date,dateString){
        dispatch(actionCreator.selfChangePlanDate(dateString));
    },
    selfChangeCommunicateDate(date,dateString){
        dispatch(actionCreator.selfChangeCommunicateDate(dateString));
    },
    selfChangeIsBeingUsed(e){
        dispatch(actionCreator.selfChangeIsBeingUsed(e.target.value));
    },
    selfChangeCommunicatePerson(e){
        dispatch(actionCreator.selfChangeCommunicatePerson(e.target.value));
    },
    selfChangeEmployNumber(e){
        dispatch(actionCreator.selfChangeEmployNumber(e.target.value));
    },
    selfChangeIdealSalary(e){
        dispatch(actionCreator.selfChangeIdealSalary(e.target.value));
    },
    selfChangeIdNumber(e){
        dispatch(actionCreator.selfChangeIdNumber(e.target.value));
    },
    selfChangeBirth(date,dateString){
        dispatch(actionCreator.selfChangeBirth(dateString));
    },
    selfChangeDegree(e){
        dispatch(actionCreator.selfChangeDegree(e));
    },
    selfChangePriceUnit(e){
        dispatch(actionCreator.selfChangePriceUnit(e.target.value));
    },
    selfChangeSchool(e){
        dispatch(actionCreator.selfChangeSchool(e.target.value));
    },
    selfChangeSex(e){
        dispatch(actionCreator.selfChangeSex(e.target.value));
    },
    selfChangeLocation(e){
        dispatch(actionCreator.selfChangeLocation(e.target.value));
    },
    selfChangeOtherInfo(e){
        dispatch(actionCreator.selfChangeOtherInfo(e.target.value));
    },
    selfSave(name,email,username,qq,employYears,phone,goodAt,estimateLevel,
             planDate,communicateDate,isBeingUsed,communicatePerson,employNumber,idealSalary,idNumber,
             birth,degree,priceUnit,school,sex,location,otherInfo){
        dispatch(actionCreator.selfSave(name,email,username,qq,employYears,phone,goodAt,estimateLevel,
            planDate,communicateDate,isBeingUsed,communicatePerson,employNumber,idealSalary,idNumber,
            birth,degree,priceUnit,school,sex,location,otherInfo))
    }
});
export default connect(mapStateToProps,mapDispatchToProps)(SelfInfo);
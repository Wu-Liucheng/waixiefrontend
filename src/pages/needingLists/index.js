import React,{PureComponent} from "react";
import "./index.css";
import "../../statics/icon/iconfont.css";
import Footer from "../../common/footer";
import Header from "../../common/header"
import {connect} from "react-redux";
import {Button, Input,Radio, Pagination,Empty} from "antd";
import {Link} from "react-router-dom";
import {actionCreator} from "./store";

const RadioGroup = Radio.Group;

class NeedingLists extends PureComponent{
    componentDidMount() {
        const {listsInitialize} = this.props;
        listsInitialize();
        this.autoRefresh = setInterval(() => {
            const {
                pageCode,
                employType,
                jobExperience,
                demandDuration,
                salary,
                listsRefreshWithConditions,
            } = this.props;
            listsRefreshWithConditions(pageCode,employType,jobExperience,demandDuration,salary);
            /*console.log("this.autoRefresh");*/
        },120000);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        const {
            pageCode,
            employType,
            jobExperience,
            demandDuration,
            salary,
            listsRefreshWithConditions,
        } = this.props;
        /*listsRefreshWithConditions(pageCode,employType,jobExperience,demandDuration,salary);*/
        /*console.log(pageCode,employType,jobExperience,demandDuration,salary);
        console.log(nextProps.pageCode,nextProps.employType,nextProps.jobExperience,nextProps.demandDuration,nextProps.salary);*/
        if(
            pageCode !== nextProps.pageCode ||
            employType !== nextProps.employType ||
            jobExperience !== nextProps.jobExperience ||
            demandDuration !== nextProps.demandDuration ||
            salary !== nextProps.salary
        )
        {
            listsRefreshWithConditions(nextProps.pageCode,nextProps.employType,nextProps.jobExperience,nextProps.demandDuration,nextProps.salary);
        }
    }
    componentWillUnmount() {
        clearInterval(this.autoRefresh);
    }
    render() {
        /*console.log("***lists***");*/
        const {
            needingLists,
            totalPages,
            pageCode,listsChangePageCode,
            employType,listsChangeEmployType,
            jobExperience,listsChangeJobExperience,
            demandDuration,listsChangeDemandDuration,
            salary,listsChangeSalary,
            mainChangeFocusID,
            loginStatus,
        } = this.props;

        return (
            <div>
                <div className="mainDIV0">
                    <Header/>
                    <div className="sumWrapper clearfix">
                        <div className="contentWrapper3">
                        <div className="reminder">
                            <Link to="/main">
                            <span>首页</span>
                            </Link>
                            <span className="iconfont specialSpan">&#xe636;</span>
                            <span className="specialSpan">需求列表</span>
                            {loginStatus?
                                <span>
                                <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="iconfont">&#xe636;</span>
                                    <Link to="/personal">
                                        <span>我的需求 - 已报名</span>
                                    </Link>
                                </span>
                                :
                                null
                            }
                        </div>
                        <div className="searchWrapper2">
                            <Input className="searchInput2" placeholder="查找已报名需求请输入技能、项目名称或职位名称" />
                            <Button className="searchQueren2">搜索 <span className="iconfont">&#xe609;</span></Button>
                        </div>
                        <div className="needingLists">
                            {
                                needingLists == null || needingLists.length === 0? <Empty/>
                                    :
                                    needingLists.map((item,index) => {
                                        return (
                                            <div className="needingItem" key={index}>
                                                <div className="jiaobiao"></div>
                                                <div className="projectContent">
                                                    <div className="kuangkuang">
                                                        <Link to="/details">
                                                            <div className="topic"
                                                                 onClick={() => {
                                                                     mainChangeFocusID(item.get("id"));
                                                                 }}
                                                            >
                                                                {item.get("jobName")}
                                                            </div>
                                                        </Link>
                                                        <div className="details">
                                                            <div className="element0 haveBorder">
                                                                <div className="key0"><span className="iconfont">&#xe61f;</span> 地点</div>
                                                                <div className="value0">{item.get("location")}</div>
                                                            </div>
                                                            <div className="element0 haveBorder">
                                                                <div className="key0"><span className="iconfont">&#xe63d;</span> 薪资</div>
                                                                <div className="value0">{item.get("salary")}</div>
                                                            </div>
                                                            <div className="element0 haveBorder">
                                                                <div className="key0"><span className="iconfont">&#xe6d9;</span> 单位</div>
                                                                <div className="value0">{item.get("priceUnit")}</div>
                                                            </div>
                                                            <div className="element0 haveBorder">
                                                                <div className="key0"><span className="iconfont">&#xe60b;</span> 年限</div>
                                                                <div className="value0">{item.get("duration")}</div>
                                                            </div>
                                                            <div className="element0 haveBorder">
                                                                <div className="key0"><span className="iconfont">&#xe719;</span> 需求周期</div>
                                                                <div className="value0">{item.get("cycle")}</div>
                                                            </div>
                                                            <div className="element0">
                                                                <div className="key0"><span className="iconfont">&#xe614;</span> 是否包住宿</div>
                                                                <div className="value0">{item.get("baozhusu")?"是":"否"}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="otherInfo">
                                                    <div className="biaohao">{item.get("projectName")}</div>
                                                    <div className="baomingxinxi"><span className="iconfont">&#xe66a;</span>发布于：<span>{item.get("releaseTime")}</span> 已报名 <span>{item.get("numSignUp")}</span> 人</div>
                                                </div>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                        <div className="pageCode">
                            <Pagination showQuickJumper
                                        current={pageCode}
                                        pageSize={4}
                                        defaultCurrent={1}
                                        total={totalPages*4}
                            onChange={listsChangePageCode}/>
                        </div>
                    </div>
                        <div className="conditionWrapper">
                            <div className="unit0">
                                <div className="conditionTopic">招聘类型</div>
                                <RadioGroup value={employType} defaultValue={0} onChange={listsChangeEmployType} className="lists-condition">
                                    <Radio value={0}>全日制外包</Radio>
                                    <Radio value={1}>兼职外包</Radio>
                                    <Radio value={2}>任务外包</Radio>
                                    <Radio value={3}>全职</Radio>
                                </RadioGroup>
                            </div>
                            <div className="unit0">
                                <div className="conditionTopic">工作经验</div>
                                <RadioGroup value={jobExperience} defaultValue={0}
                                            onChange={listsChangeJobExperience} className="lists-condition">
                                    <Radio value={0}>不限</Radio>
                                    <Radio value={1}>应届生</Radio>
                                    <Radio value={2}>1-3年</Radio>
                                    <Radio value={3}>4-6年</Radio>
                                    <Radio value={4}>7-10年</Radio>
                                    <Radio value={5}>10年以上</Radio>
                                </RadioGroup>
                            </div>
                            <div className="unit0">
                                <div className="conditionTopic">需求周期</div>
                                <RadioGroup value={demandDuration} defaultValue={0}
                                            onChange={listsChangeDemandDuration} className="lists-condition">
                                    <Radio value={0}>不限</Radio>
                                    {/*<Radio value={2}>一周内</Radio>
                                    <Radio value={3}>两周内</Radio>
                                    <Radio value={4}>一月内</Radio>*/}
                                </RadioGroup>
                            </div>
                            <div className="unit0">
                                <div className="conditionTopic">每日薪资</div>
                                <RadioGroup value={salary} defaultValue={0}
                                            onChange={listsChangeSalary} className="lists-condition">
                                    <Radio value={0}>不限</Radio>
                                    <Radio value={1}>500以下</Radio>
                                    <Radio value={2}>500-1000</Radio>
                                    <Radio value={3}>1001-1500</Radio>
                                    <Radio value={4}>1501-2000</Radio>
                                    <Radio value={5}>2001-2500</Radio>
                                    <Radio value={6}>2500以上</Radio>
                                </RadioGroup>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Footer/>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    needingLists: state.getIn(['lists','needingLists']),
    totalPages:state.getIn(['lists','totalPages']),
    pageCode:state.getIn(['lists','pageCode']),
    employType: state.getIn(['lists','employType']),
    jobExperience:state.getIn(['lists','jobExperience']),
    demandDuration: state.getIn(['lists','demandDuration']),
    salary: state.getIn(['lists','salary']),
    loginStatus:state.getIn(['login','login']),
});
const mapDispatchToProps = (dispatch) => ({
    listsInitialize(){
        dispatch(actionCreator.listsInitialize());
    },
    listsChangeEmployType(e){
        dispatch(actionCreator.listsChangeEmployType(e.target.value));
    },
    listsChangeJobExperience(e){
        dispatch(actionCreator.listsChangeJobExperience(e.target.value));
    },
    listsChangeDemandDuration(e){
        dispatch(actionCreator.listsChangeDemandDuration(e.target.value));
    },
    listsChangeSalary(e){
        dispatch(actionCreator.listsChangeSalary(e.target.value));
    },
    listsChangePageCode(page){
        dispatch(actionCreator.listsChangePageCode(page))
    },
    listsRefreshWithConditions(pageCode,employType,jobExperience,demandDuration,salary){
        dispatch(actionCreator.listsRefreshWithConditions(pageCode,employType,jobExperience,demandDuration,salary));
    },
    mainChangeFocusID(id){
        dispatch(actionCreator.mainChangeFocusedID(id))
    },
});

export default connect(mapStateToProps,mapDispatchToProps)(NeedingLists);
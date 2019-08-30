import React,{PureComponent} from 'react';
import "./index.css";
import "../../statics/icon/iconfont.css"
import Footer from '../../common/footer';
import {connect} from "react-redux";
import {Button, Input,Pagination,message,Empty} from "antd";
import Header from "../../common/header"
import {Link} from "react-router-dom";
import {actionCreator} from "./store";

class PersonalNeedingLists extends PureComponent{
    componentDidMount() {
        const {username,loginStatus,personalInitialize} = this.props;
        if(!loginStatus)
        {
            message.info("你还没有登陆")
        }
        else
        {
            personalInitialize(username);
            this.autoRefresh = setInterval(() => {
                const {username,pageCode,personalRefresh} = this.props;
                personalRefresh(username,pageCode);
            },120000);
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {username,pageCode,personalRefresh} = this.props;
        if(pageCode !== nextProps.pageCode)
        {
            personalRefresh(username,nextProps.pageCode);
        }
    }
    componentWillUnmount() {
        clearInterval(this.autoRefresh);
    }

    render() {
        const {lists,totalPages,pageCode,personalChangePageCode,mainChangeFocusID} = this.props;
        return (
            <div>
                <div className="mainDIV">
                    <Header/>
                    <div className="contentWrapper2">
                        <div className="reminder">
                            <span>首页</span>
                            <span className="iconfont">&#xe636;</span>
                            <Link to="/lists">
                                <span>需求列表</span>
                            </Link>
                            <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="iconfont specialSpan">&#xe636;</span>
                            <span className="specialSpan">我的需求 - 已报名</span>
                        </div>
                        <div className="searchWrapper2">
                            <Input className="searchInput2" placeholder="查找已报名需求请输入技能、项目名称或职位名称" />
                            <Button className="searchQueren2">搜索 <span className="iconfont">&#xe609;</span></Button>
                        </div>
                        <div className="needingLists">
                            {
                                lists == null || lists.length === 0? <Empty/>
                                    :
                                    lists.map((item,index) => {
                                        return(
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
                                                                <div className="value0">{item.get('location')}</div>
                                                            </div>
                                                            <div className="element0 haveBorder">
                                                                <div className="key0"><span className="iconfont">&#xe63d;</span> 薪资</div>
                                                                <div className="value0">{item.get('salary')}</div>
                                                            </div>
                                                            <div className="element0 haveBorder">
                                                                <div className="key0"><span className="iconfont">&#xe6d9;</span> 单位</div>
                                                                <div className="value0">{item.get('priceUnit')}</div>
                                                            </div>
                                                            <div className="element0 haveBorder">
                                                                <div className="key0"><span className="iconfont">&#xe60b;</span> 年限</div>
                                                                <div className="value0">{item.get('duration')}</div>
                                                            </div>
                                                            <div className="element0 haveBorder">
                                                                <div className="key0"><span className="iconfont">&#xe719;</span> 需求周期</div>
                                                                <div className="value0">{item.get('cycle')}</div>
                                                            </div>
                                                            <div className="element0">
                                                                <div className="key0"><span className="iconfont">&#xe614;</span> 是否包住宿</div>
                                                                <div className="value0">{item.get("baozhusu")?"是":"否"}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="otherInfo">
                                                    <div className="biaohao">{item.get('projectName')}</div>
                                                    <div className="baomingxinxi"><span className="iconfont">&#xe66a;</span>发布于：<span>{item.get('releaseTime')}</span> 已报名 <span>{item.get('numSignUp')}</span> 人</div>
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
                                        onChange={personalChangePageCode}/>
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
    username: state.getIn(['login','accountValue']),
    loginStatus:state.getIn(['login','login']),
    lists:state.getIn(['personal','needingLists']),
    totalPages:state.getIn(['personal','totalPages']),
    pageCode:state.getIn(['personal','pageCode']),
});
const mapDispatchToProps = (dispatch) => ({
    personalInitialize(username){
        dispatch(actionCreator.personalInitialize(username));
    },
    personalChangePageCode(pageCode){
        dispatch(actionCreator.personalChangePageCode(pageCode));
    },
    personalRefresh(username,pageCode)
    {
        dispatch(actionCreator.personalRefresh(username,pageCode));
    },
    mainChangeFocusID(id){
        dispatch(actionCreator.mainChangeFocusedID(id))
    },
});

export default connect(mapStateToProps,mapDispatchToProps)(PersonalNeedingLists);

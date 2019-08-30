import React,{PureComponent} from 'react';
import "./index.css";
import "../../statics/icon/iconfont.css";
import Footer from '../../common/footer';
import Header from '../../common/header'
import {connect} from "react-redux";
import {Button,message,Empty} from "antd";
import {actionCreator} from "./store";
import {Link} from "react-router-dom";

class NeedingDetails extends PureComponent{
    componentDidMount() {
        const {projectID,username,loginStatus,detailGetInfo} = this.props;
        if(!loginStatus)
        {
            message.info("因为您未登录，所以看不到详情信息");
        }
        else
        {
            detailGetInfo(projectID,username)
        }
        this.autoRefresh = setInterval(()=>{
            const {projectID,username,loginStatus,detailGetInfo} = this.props;
            if(!loginStatus)
            {
                message.info("因为您未登录，所以看不到详情信息");
            }
            else
            {
                detailGetInfo(projectID,username)
            }
        },60000)
    }

    componentWillUnmount() {
        clearInterval(this.autoRefresh);
    }


    render() {
        const {detailInfo,detailSignUp,projectID,username} = this.props;
        return (
            <div>
                <div className="mainDIV">
                    <Header/>
                    <div className="contentWrapper2">
                        <div className="reminder">
                            <Link to="/main">
                                <span>首页</span>
                            </Link>
                            <span className="iconfont">&#xe636;</span>
                            <Link to="/lists">
                                <span>需求列表</span>
                            </Link>
                            <span className="iconfont">&#xe636;</span>
                            <span className="specialSpan">需求详情</span>
                        </div>
                        {
                            detailInfo == null ? <Empty/>:
                                <div>
                                    <div className="topic0">
                                        <div className="jianBianKuang"></div>
                                        <div className="main0">
                                            <div className="topic1">{detailInfo.get("jobName")}</div>
                                            <div className="xinShui">{detailInfo.get("salary")}{detailInfo.get("priceUnit")}</div>
                                            <div className="details0">
                                                <div className="element1 haveBorder">
                                                    <div className="key0"><span className="iconfont">&#xe61f;</span> 地点</div>
                                                    <div className="value0">{detailInfo.get("location")}</div>
                                                </div>
                                                <div className="element1 haveBorder">
                                                    <div className="key0"><span className="iconfont">&#xe60b;</span> 年限</div>
                                                    <div className="value0">{detailInfo.get("duration")}</div>
                                                </div>
                                                <div className="element1 haveBorder">
                                                    <div className="key0"><span className="iconfont">&#xe719;</span> 需求周期</div>
                                                    <div className="value0">{detailInfo.get("cycle")}</div>
                                                </div>
                                                <div className="element1">
                                                    <div className="key0"><span className="iconfont">&#xe614;</span> 是否包住宿</div>
                                                    <div className="value0">{detailInfo.get("isBaozhusu")?"是":"否"}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content0">
                                        <div className="right0">
                                            <div className="someWords">
                                                <span className="iconfont">&#xe66a;</span>
                                                发布于：<span>{detailInfo.get("releaseTime")}</span>
                                            </div>
                                            <Button className="baoMing"
                                                    onClick={() => {
                                                        if(detailInfo.get("signUp"))
                                                        {
                                                            message.info("您已报名，无需重复操作");
                                                        }
                                                        else
                                                        {
                                                            detailSignUp(projectID,username);
                                                        }
                                                    }
                                                    }
                                            >{detailInfo.get("signUp")?"已报名":"立即报名"}</Button>
                                            <div className="someWords"><span className="iconfont">&#xe685;</span> 已报名 <span>{detailInfo.get("numSignUp")}</span> 人</div>
                                        </div>
                                        <div className="fuzhu"></div>
                                        <div className="topic2">公司名称</div>
                                        <div className="content1">{detailInfo.get("company")}</div>
                                        <div className="topic2">项目名称</div>
                                        <div className="content1">{detailInfo.get("projectName")}</div>
                                        <div className="topic2">需求描述</div>
                                        <div className="content1">
                                            {detailInfo.get("description")}
                                        </div>
                                        <div className="topic2">公司介绍</div>
                                        <div className="content1">
                                            &nbsp;&nbsp;{detailInfo.get("companyIntro")}
                                        </div>
                                    </div>
                                </div>

                        }

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
    projectID:state.getIn(['main','focusedProjectID']),
    username: state.getIn(['login','accountValue']),
    loginStatus:state.getIn(['login','login']),
    detailInfo:state.getIn(['detail','detailInfo']),
});
const mapDispatchToProps = (dispatch) => ({
    detailGetInfo(projectID,username){
        dispatch(actionCreator.detailGetInfo(projectID,username));
    },
    detailSignUp(projectID,username){
        dispatch(actionCreator.detailSignUp(projectID,username))
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(NeedingDetails);
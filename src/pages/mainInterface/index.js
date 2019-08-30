import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import './index.css';
import Footer from '../../common/footer';
import Header from '../../common/header'
import {Input, Button, Carousel} from 'antd';
import {Link} from "react-router-dom";
import {actionCreator} from "./store";


class MainInterface extends PureComponent{
    componentDidMount() {
        const {mainInitialize} = this.props;
        mainInitialize();
    }

    render() {
        const {demands,mainChangeFocusID} = this.props;
        return (
            <div>
                <div className="searchWrapper">
                    <Header />
                    <div className="main-search">
                        <Input className="searchInput" placeholder="关键词搜索"  />
                        <Button className="searchQueren">搜索</Button>
                    </div>
                </div>
                    <Carousel autoplay={true} className="main-carousel" effect="fade">
                        <div className="aboveSection0">
                        </div>
                        <div className="aboveSection1">
                        </div>
                        <div className="aboveSection2">
                        </div>
                    </Carousel>
                <div className="belowSection">
                    <div className="latestNeeding">
                        <div className="chinesePart">最新项目需求</div>
                        <div className="underLine"></div>
                        <div className="englishPart">The latest demands of project</div>
                    </div>
                    <div className="contentWrapper">
                        <div className="needingsWrapper clearfix">
                            {
                                !(demands == null)?
                                demands.map((item,index) => {
                                    return (
                                        <div className="needingInfo" key={index}>
                                            <div className="projectName">{item.get("projectName")}</div>
                                            <div className="jobName">{item.get("jobName")}</div>
                                            <div className="salaryInfo"><span>{item.get("salary")}</span>{item.get("priceUnit")}</div>
                                            <div className="companyName">{item.get("company")}</div>
                                            <Link to="/details">
                                            <Button className="loadDetail"
                                                    onClick={() => {
                                                        mainChangeFocusID(item.get("id"));
                                                    }}
                                            >查看项目详情</Button></Link>
                                        </div>
                                    )
                                })
                                    :
                                    null
                            }
                        </div>
                    </div>
                    <Link to="/lists">
                    <div className="loadMore">
                        查看更多 >
                    </div>
                    </Link>
                </div>
                <Footer/>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    demands:state.getIn(['main','demands']),
    })
;

const mapDispatchToProps = (dispatch) => ({
    mainInitialize(){
        dispatch(actionCreator.mainIntializePage());
    },
    mainChangeFocusID(id){
        dispatch(actionCreator.mainChangeFocusedID(id))
    },
});

export default connect(mapStateToProps,mapDispatchToProps)(MainInterface);
import React , {PureComponent} from 'react';
import {connect} from "react-redux";
import './index.css'
import {Avatar,message} from "antd";
import {Link} from "react-router-dom";

class Header extends PureComponent{
    componentDidMount() {

    }

    render() {
        const {username,loginStatus} = this.props;
        return (
                <div className="headerSection">
                    <div id="wrapperInHeader" className="clearfix">
                        <div className="ocmsSection"></div>
                        {
                            loginStatus?
                                <Link to="/self">
                                    <div className="headIcon" title="个人信息">
                                        <Avatar size={64} alt="这是头像" style={{backgroundColor:'#50a3ea'}}>
                                            {
                                                username
                                            }
                                        </Avatar>
                                    </div>
                                </Link>
                                :
                                <Link to="/">
                                <div className="headIcon" title="个人信息"
                                     onClick={() => {
                                         message.info("请先登录")
                                     }
                                     }
                                >
                                    <Avatar size={64} alt="这是头像" style={{backgroundColor:'#50a3ea'}}>
                                        登录
                                    </Avatar>
                                </div>
                                </Link>
                        }
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => ({
    username: state.getIn(['login','accountValue']),
    loginStatus:state.getIn(['login','login']),
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps,mapDispatchToProps)(Header);
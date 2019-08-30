import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import './index.css';

class Footer extends PureComponent{
    render() {
        return (
            <div className="footer">
                <div className="footerWrapper">
                    <div className="navigatorWrapper clearfix">
                        <div className="navigator">关于汉得</div>
                        <div className="navigator">汉得一览</div>
                        <div className="navigator">定期报告</div>
                        <div className="navigator">汉得快讯</div>
                    </div>
                    <div className="fenGeXian"></div>
                    <div className="copyRightInfo">Copyright2019上海汉得信息技术股份有限公司版权所有</div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps,mapDispatchToProps)(Footer);
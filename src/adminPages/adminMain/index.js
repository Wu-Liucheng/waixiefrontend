/*
* @Author:Wuliucheng
* @Description:Realize login user interface
* @Date:2019-3-20
* */

import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import './index.css';
import {Layout, Menu, Breadcrumb, Icon, Skeleton, Carousel,} from 'antd';
import {actionCreator} from "./store";
import ConsultantsManager from '../../adminCommon/consultantsInfo/index';
import ClientInfo from '../../adminCommon/clientsInfo/index';
import ProjectInfo from '../../adminCommon/projectInfo/index';
import MakeProcess from '../../adminCommon/makeProcess/index';
import DemandApply from '../../adminCommon/demandApply/index';
import CheckConsultant from '../../adminCommon/checkConsultant/index';
import {actionCreator as consultantsInfoActionCreator} from '../../adminCommon/consultantsInfo/store';
const { SubMenu } = Menu;
const {
    Header, Content, Footer, Sider,
} = Layout;

class adminMain extends PureComponent {

    render() {
        const{
            role,
            collapsed,adminMainOnCollapse,
            loginStatus,
            menuSelectedKeys,adminMainChangeSelectedKeys,
            adminMainGetOnePageConsultantInfo,adminMainChangeConsultantsDataPageCode,

        } = this.props;
        return (
            !loginStatus?
                <div>
                    <Carousel autoplay={true}>
                        <div><h3>你还没有登录</h3></div>
                        <div><h3>请返回/admin登录</h3></div>
                    </Carousel>,
                </div>
                :
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={adminMainOnCollapse} theme="light"
                >
                    <div className="logo" />
                    <Menu  defaultSelectedKeys={["1"]}
                           selectedKeys={menuSelectedKeys.toArray()}
                           onClick={adminMainChangeSelectedKeys}
                           mode="inline"
                    >
                        <Menu.Item key="1">
                            <Icon type="home" />
                            <span>首页</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="info-circle" /><span>基础信息维护</span></span>}
                        >
                            <Menu.Item key="2" onClick={()=>{
                                adminMainGetOnePageConsultantInfo(1);
                                adminMainChangeConsultantsDataPageCode(1);
                            }}><Icon type="user" />外协顾问信息</Menu.Item>
                            <Menu.Item key="3"><Icon type="team" />客户基础信息</Menu.Item>
                            <Menu.Item key="4"><Icon type="folder" />项目基础信息</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="line-chart" /><span>外协需求</span></span>}
                        >
                            <Menu.Item key="5"><Icon type="profile" />外协需求申请</Menu.Item>
                            <Menu.Item key="6"><Icon type="file-search" />外协顾问资质审核</Menu.Item>
                            <Menu.Item key="7"><Icon type="poweroff" />外协需求关闭</Menu.Item>
                            <Menu.Item key="8"><Icon type="edit" />外协顾问状态修改</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub3"
                            title={<span><Icon type="setting" /><span>系统设置</span></span>}
                        >
                            <Menu.Item key="9"><Icon type="clock-circle" />数据字典设置</Menu.Item>
                            <Menu.Item key="10"><Icon type="link" />流程定制</Menu.Item>
                            <Menu.Item key="11"><Icon type="upload" />批量上传</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="12">
                            <Icon type="file" />
                            <span>File</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <div className="header-content"><Icon type="user" />  {
                            role===0?"管理员":role===1?"项目经理":role===2?"外协专员":"公司管理员"
                        }</div>
                    </Header>
                    {
                        (() => {
                            switch (menuSelectedKeys.toArray()[0]) {
                                case "1":
                                    return <Content style={{ margin: '0 16px' }}>
                                        <Breadcrumb style={{ margin: '16px 0' }}>
                                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                                        </Breadcrumb>
                                        <Skeleton active/>
                                        <Skeleton active/>
                                        <Skeleton active/>
                                        <Skeleton active/>
                                        <Skeleton active/>
{/*
                                        <iframe style={{width:1000,height:700}} src="https://www.html5tricks.com/demo/threejs-canvas-3d-crystals/index.html"></iframe>
*/}
                                    </Content>;
                                case "2":
                                    return <ConsultantsManager/>;
                                case "3":
                                    return <ClientInfo/>;
                                case "4":
                                    return <ProjectInfo/>;
                                case "5":
                                    return <DemandApply/>;
                                case "6":
                                    return <CheckConsultant/>;
                                case "7":
                                    return <Content style={{ margin: '0 16px' }}>
                                        <Breadcrumb style={{ margin: '16px 0' }}>
                                            <Breadcrumb.Item>外协需求</Breadcrumb.Item>
                                            <Breadcrumb.Item>外协需求关闭</Breadcrumb.Item>
                                        </Breadcrumb>
                                    </Content>;
                                case "8":
                                    return <Content style={{ margin: '0 16px' }}>
                                        <Breadcrumb style={{ margin: '16px 0' }}>
                                            <Breadcrumb.Item>外协需求</Breadcrumb.Item>
                                            <Breadcrumb.Item>外协顾问状态修改</Breadcrumb.Item>
                                        </Breadcrumb>
                                    </Content>;
                                case "9":
                                    return <Content style={{ margin: '0 16px' }}>
                                        <Breadcrumb style={{ margin: '16px 0' }}>
                                            <Breadcrumb.Item>系统设置</Breadcrumb.Item>
                                            <Breadcrumb.Item>数据字典设置</Breadcrumb.Item>
                                        </Breadcrumb>
                                    </Content>;
                                case "10":
                                    return <MakeProcess/>;
                                case "11":
                                    return <Content style={{ margin: '0 16px' }}>
                                        <Breadcrumb style={{ margin: '16px 0' }}>
                                            <Breadcrumb.Item>系统设置</Breadcrumb.Item>
                                            <Breadcrumb.Item>批量上传</Breadcrumb.Item>
                                        </Breadcrumb>
                                    </Content>;
                                case "12":
                                    return <Content style={{ margin: '0 16px' }}>
                                        <Breadcrumb style={{ margin: '16px 0' }}>
                                            <Breadcrumb.Item>文件</Breadcrumb.Item>
                                        </Breadcrumb>

                                    </Content>;
                                default:
                                    return <div></div>
                            }
                        })()
                    }

                    <Footer style={{ textAlign: 'center' }}>
                        外协管理平台---后台
                    </Footer>
                </Layout>
            </Layout>        )
    }

}

const mapState = (state) => ({
    loginStatus:state.getIn(['adminLogin','loginStatus']),
    role:state.getIn(['adminLogin','role']),
    collapsed:state.getIn(['adminMain','collapsed']),
    menuSelectedKeys:state.getIn(['adminMain','menuSelectedKeys']),
});
const mapDispatch = (dispatch) => ({
    adminMainOnCollapse(collapsed){
        dispatch(actionCreator.adminMainChangeCollapsed(collapsed));
    },
    adminMainChangeSelectedKeys({ item, key, keyPath }){
        dispatch(actionCreator.adminMainChangeMenuSelectedKeys([key]));
    },
    adminMainGetOnePageConsultantInfo(pageCode){
        dispatch(consultantsInfoActionCreator.adminMainGetConsultantInfo(pageCode));
    },
    adminMainChangeConsultantsDataPageCode(code){
        dispatch(consultantsInfoActionCreator.adminMainChangeConsultantDataPageCode(code));
    },
});
export default connect(mapState,mapDispatch)(adminMain);
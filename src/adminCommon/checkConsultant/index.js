import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {
    Layout,
    Button,
    Table,
    Breadcrumb, Tooltip,
    message, Input, Modal,Icon,Drawer,
} from 'antd';
import {actionCreator} from "./store";
import {actionCreator as modalDemandActionCreator} from "../modalDemand/store";
import ModalDemand from '../modalDemand/index.js';
const {
    Content
} = Layout;
const {TextArea} = Input;
const Search = Input.Search;
class CheckConsultant extends PureComponent{

    componentDidMount() {
        const {role,username,setCheckerId} = this.props;
        if(role === 2){
            setCheckerId(username);
        }
        else {
            message.error("您不是外协专员，此模块无权查看。");
        }
    }

    render() {

        const {
            checkerId,
            signUpData,
            currentPageCode,
            total,
            getPageData,
            consultantInfoIsVisible,changeConsultantInfoIsVisible,
            getConsultantInfo,
        } = this.props;

        const signUpInfoColumns = [{
            title:'序号',
            dataIndex:'key',
            key:'key',
        },{
            title:'申请人',
            dataIndex:'username',
            key:'username',
        },{
            title:'需求编号',
            dataIndex:'number',
            key:'number',
        },{
            title:'需求名称',
            dataIndex:'name',
            key:'name',
        },{
            title:'模块',
            dataIndex:'modular',
            key:'modular',
        },{
            title:'年限',
            dataIndex:'employTime',
            key:'employTime',
        },{
            title:'审核状态',
            dataIndex:'status',
            key:'status',
        },{
            title:'价格',
            dataIndex:'price',
            key:'price',
        },{
            title:'价格单位',
            dataIndex:'priceUnit',
            key:'priceUnit',
        },{
            title:'需求开始日期',
            dataIndex:'startDate',
            key:'startDate',
        },{
            title:'需求周期',
            dataIndex:'cycle',
            key:'cycle',
        },{
            title:'工作地点',
            dataIndex:'workAddress',
            key:'workAddress',
        },{
            title: '操作',
            key: 'action',
            render: (text,record) => (
                <span>
                    <Tooltip title="详细顾问信息(简历)...">
                        <Button onClick={()=>{
                            changeConsultantInfoIsVisible(true);
                            getConsultantInfo(record.userId);
                        }}>顾问信息</Button>
                    </Tooltip>
                    &nbsp;&nbsp;
                    <Tooltip title="详细需求信息...">
                        <Button type="primary" onClick={()=>{

                    }}>需求详情</Button>
                    </Tooltip>
                    &nbsp;&nbsp;
                    <Tooltip title="通过审核，使用该顾问"><Button shape="circle" onClick={()=>{

                    }}><Icon type="check" /></Button></Tooltip>
                    &nbsp;&nbsp;
                    <Tooltip title="审核不通过，不使用该顾问">
                        <Button type="danger" shape="circle" ><Icon type="close" /></Button>
                    </Tooltip>
                </span>
            ),
        }];

        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>外协需求</Breadcrumb.Item>
                    <Breadcrumb.Item>顾问资质审批</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Search
                        className="admin-search-input"
                        placeholder="输入搜索信息"
                        enterButton="Search"
                        size="default"
                        onSearch={value => console.log(value)}
                    />
                    <Button className="admin-button">更多筛选</Button>
                    <Table columns={signUpInfoColumns}
                           dataSource={signUpData.toJS()}
                           pagination={{showQuickJumper:true,pageSize:6,defaultCurrent:1,total:total,current:currentPageCode,onChange:(code)=>{
                               getPageData(checkerId,currentPageCode);
                               }}} />
                    <Drawer
                        title="外协顾问信息"
                        placement="right"
                        closable={false}
                        width = {500}
                        onClose={()=>changeConsultantInfoIsVisible(false)}
                        visible={consultantInfoIsVisible}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Drawer>
                    <Drawer
                        title="需求信息"
                        placement="right"
                        closable={false}
                        width={400}
                        onClose={()=>{}}
                        visible={false}
                    >
                        blablabla...
                    </Drawer>
                </div>
            </Content>
        );
    }

}
const mapState = (state) => ({
    role:state.getIn(['adminLogin','role']),
    username:state.getIn(['adminLogin','username']),

    signUpData: state.getIn(['checkConsultant','signUpData']),
    currentPageCode: state.getIn(['checkConsultant','currentPageCode']),
    total: state.getIn(['checkConsultant','total']),
    checkerId:state.getIn(['checkConsultant','checkerId']),
    consultantInfoIsVisible:state.getIn(['checkConsultant','consultantInfoIsVisible']),
});
const mapDispatch = (dispatch) => ({
    setCheckerId(useranme){dispatch(actionCreator.setCheckerId(useranme))},
    getPageData(checkerId,pageCode){dispatch(actionCreator.getPageData(checkerId,pageCode))},
    changeConsultantInfoIsVisible(val){dispatch(actionCreator.changeConsultantInfoIsVisible(val))},
    getConsultantInfo(id){dispatch(actionCreator.getConsultantInfo(id))},
});
export default connect(mapState,mapDispatch)(CheckConsultant);
/*
const examineColumns = [{
    title:'序号',
    dataIndex:'number',
    key:'number',
},{
    title:'外协申请号',
    dataIndex:'id',
    key:'id',
},{
    title:'项目名称',
    dataIndex:'name',
    key:'name',
},{
    title:'系统',
    dataIndex:'system',
    key:'system',
},{
    title:'模块',
    dataIndex:'module',
    key:'module',
},{
    title:'年限',
    dataIndex:'years',
    key:'years',
},{
    title:'申请状态',
    dataIndex:'applyStatus',
    key:'applyStatus',
},{
    title:'价格',
    dataIndex:'price',
    key:'price',
},{
    title:'价格单位',
    dataIndex:'unit',
    key:'unit',
},{
    title:'需求开始日期',
    dataIndex:'startDate',
    key:'startDate',
},{
    title:'需求周期',
    dataIndex:'cycle',
    key:'cycle',
},{
    title:'工作地点',
    dataIndex:'location',
    key:'location',
},{
    title:'审批状态',
    dataIndex:'examineStatus',
    key:'examineStatus',
},{
    title: '操作',
    key: 'action',
    render: () => (
        <Button >审核</Button>
    ),
}];
const examineData = [{
    key:'1',
    number:1,
    id:'1000004',
    name:'东方汽轮机SAP项目',
    system:'SAP',
    module:'MM',
    years:'不限',
    applyStatus:'有效',
    price:'1200',
    unit:'元/天',
    startDate:'2018-03-01',
    cycle:'10个月',
    location:'江苏 常州',
    examineStatus:'创建',
},{
    key:'2',
    number:1,
    id:'1000004',
    name:'东方汽轮机SAP项目',
    system:'SAP',
    module:'MM',
    years:'不限',
    applyStatus:'有效',
    price:'1200',
    unit:'元/天',
    startDate:'2018-03-01',
    cycle:'10个月',
    location:'江苏 常州',
    examineStatus:'创建',
},{
    key:'3',
    number:1,
    id:'1000004',
    name:'东方汽轮机SAP项目',
    system:'SAP',
    module:'MM',
    years:'不限',
    applyStatus:'有效',
    price:'1200',
    unit:'元/天',
    startDate:'2018-03-01',
    cycle:'10个月',
    location:'江苏 常州',
    examineStatus:'创建',
},{
    key:'4',
    number:1,
    id:'1000004',
    name:'东方汽轮机SAP项目',
    system:'SAP',
    module:'MM',
    years:'不限',
    applyStatus:'有效',
    price:'1200',
    unit:'元/天',
    startDate:'2018-03-01',
    cycle:'10个月',
    location:'江苏 常州',
    examineStatus:'创建',
},{
    key:'5',
    number:1,
    id:'1000004',
    name:'东方汽轮机SAP项目',
    system:'SAP',
    module:'MM',
    years:'不限',
    applyStatus:'有效',
    price:'1200',
    unit:'元/天',
    startDate:'2018-03-01',
    cycle:'10个月',
    location:'江苏 常州',
    examineStatus:'创建',
},{
    key:'6',
    number:1,
    id:'1000004',
    name:'东方汽轮机SAP项目',
    system:'SAP',
    module:'MM',
    years:'不限',
    applyStatus:'有效',
    price:'1200',
    unit:'元/天',
    startDate:'2018-03-01',
    cycle:'10个月',
    location:'江苏 常州',
    examineStatus:'创建',
}];
*/

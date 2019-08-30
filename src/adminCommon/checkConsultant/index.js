import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {
    Layout,
    Button,
    Table,
    Breadcrumb, Tooltip,
    message, Input, Modal,
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

    }

    render() {

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
                    <Table columns={examineColumns}
                           dataSource={examineData}
                           pagination={{showQuickJumper:true,pageSize:6,defaultCurrent:1,total:11*6}} />
                </div>
            </Content>
        );
    }

}
const mapState = (state) => ({

});
const mapDispatch = (dispatch) => ({

});
export default connect(mapState,mapDispatch)(CheckConsultant);
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

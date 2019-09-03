import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {
    Layout,
    Button,
    Table,
    Breadcrumb, Tooltip,
    message,Icon,Drawer,Divider,Tag,Card,Empty,
} from 'antd';
import {actionCreator} from "./store";
import {actionCreator as modalDemandActionCreator} from "../modalDemand/store";
import ModalDemand from "../modalDemand";
const {
    Content
} = Layout;
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
            consultantInfo,

            getDemandInfo,
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
                            getDemandInfo(record.demandId);
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

        const comments = consultantInfo.get("comments");
        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>外协需求</Breadcrumb.Item>
                    <Breadcrumb.Item>顾问资质审批</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
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
                        <Tag color="blue">姓名</Tag>{consultantInfo.get("name")}<Divider type="vertical"/><Divider type="vertical"/>
                        <Tag color="blue">性别</Tag>{consultantInfo.get("sex")===true?"男":"女"}<Divider type="vertical"/><Divider type="vertical"/>
                        <Tag color="blue">邮箱</Tag>{consultantInfo.get("email")}
                        <Divider/>
                        <Tag color="blue">是否在任用中</Tag>{consultantInfo.get("isBeingUsed")===true?"是":"否"}
                        <Divider/>
                        <Tag color="blue">外协工号</Tag>{consultantInfo.get("employNumber")}<Divider type="vertical"/><Divider type="vertical"/>
                        <Tag color="blue">从业年限</Tag>{consultantInfo.get("employYears")}
                        <Divider/>
                        <Tag color="blue">出生日期</Tag>{consultantInfo.get("birth")===undefined?null:consultantInfo.get("birth").slice(0,10)}
                        <Divider/>
                        <Tag color="blue">手机号</Tag>{consultantInfo.get("mobile")}<Divider type="vertical"/><Divider type="vertical"/>
                        <Tag color="blue">QQ号</Tag>{consultantInfo.get("qq")}
                        <Divider/>
                        <Tag color="blue">学历</Tag>{consultantInfo.get("degree")}<Divider type="vertical"/><Divider type="vertical"/>
                        <Tag color="blue">毕业院校</Tag>{consultantInfo.get("school")}<Divider type="vertical"/><Divider type="vertical"/>
                        <Tag color="blue">评估等级</Tag>{consultantInfo.get("estimateLevel")}
                        <Divider/>
                        <Tag color="blue">擅长模块</Tag>{consultantInfo.get("goodAt")}
                        <Divider/>
                        <Tag color="blue">期望薪资</Tag>{consultantInfo.get("idealSalary")}<Divider type="vertical"/><Divider type="vertical"/>
                        <Tag color="blue">价格单位</Tag>{consultantInfo.get("priceUnit")}
                        <Divider/>
                        <Tag color="blue">最后一次沟通日期</Tag>{consultantInfo.get("communicateDate")===undefined?null:consultantInfo.get("communicateDate").slice(0,10)}<Divider type="vertical"/><Divider type="vertical"/>
                        <Tag color="blue">沟通人</Tag>{consultantInfo.get("communicatePerson")}
                        <Divider/>
                        <Tag color="blue">计划出项目日期</Tag>{consultantInfo.get("planDate")===undefined?null:consultantInfo.get("planDate").slice(0,10)}
                        <Divider/>
                        <Tag color="blue">常居地</Tag>{consultantInfo.get("location")}
                        <Divider/>
                        <Tag color="blue">其他信息</Tag><p>{consultantInfo.get("otherInfo")}</p>
                        <Divider/>
                        <Card title="项目经理评价">
                            {comments===undefined?<Empty/>:comments.map((item,index)=>{
                                console.log(item);
                                return (
                                    <div key={index}>
                                        <Tag color="cyan">{item.get("client").get("corporateName")}</Tag>
                                        <Tag color="cyan">{item.get("manager").get("name")}</Tag>
                                        <Tag color="cyan">{item.get("createDate").slice(0,10)}</Tag>
                                        <p>
                                            {item.get("comment")}
                                        </p>
                                        <Divider/>
                                    </div>
                                )
                            })}
                        </Card>

                    </Drawer>
                    {/*<Drawer
                        title="需求信息"
                        placement="right"
                        closable={false}
                        width={400}
                        onClose={()=>{closeDemandInfo();}}
                        visible={demandInfoIsVisible}
                    >

                    </Drawer>*/}
                    <ModalDemand/>
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

    consultantInfo:state.getIn(['checkConsultant','consultantInfo']),
});
const mapDispatch = (dispatch) => ({
    setCheckerId(useranme){dispatch(actionCreator.setCheckerId(useranme))},
    getPageData(checkerId,pageCode){dispatch(actionCreator.getPageData(checkerId,pageCode))},
    changeConsultantInfoIsVisible(val){dispatch(actionCreator.changeConsultantInfoIsVisible(val))},
    getConsultantInfo(id){dispatch(actionCreator.getConsultantInfo(id))},
    getDemandInfo(id){dispatch(modalDemandActionCreator.showDemandInfo(id))},

/*
    closeDemandInfo(){dispatch(modalDemandActionCreator.modalDemandChangeIsVisible(false))},
*/
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

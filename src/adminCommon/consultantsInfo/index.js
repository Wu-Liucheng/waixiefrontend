import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import './index.css';
import {Input, Button, Layout,  Breadcrumb, Icon, Table,message,Modal,Divider,DatePicker,Popconfirm} from 'antd';
import {actionCreator} from "./store";
import moment from 'moment';
const {
    Content
} = Layout;

const Search = Input.Search;
const {TextArea} = Input;

class ConsultantsManager extends PureComponent{

    render() {
        const{
            role,
            consultantData,
            consultantDataTotal,
            adminMainGetOnePageConsultantInfo,
            consultantDataPageCode,
            adminMainChangeConsultantsDataPageCode,
            modalIsVisible,consultantsInfoChangeModalIsVisible,
            adminGetOneConsultantInfo,
            id,
            email,
            name,changeName,
            mobile,changeMobile,
            employYears,changeEmployYears,
            estimateLevel,changeEstimateLevel,
            employNumber,changeEmployNumber,
            planDate,changePlanDate,
            communicateDate,changeCommunicateDate,
            communicatePerson,changeCommunicatePerson,
            location,changeLocation,
            otherInfo,changeOtherInfo,
            saveConsultantInfo,
            deleteOneConsultant,
        } = this.props;
        const consultantColumns = [{
            title: '序号',
            dataIndex: 'id',
            key: 'id',
        },{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },{
            title: '擅长模块',
            dataIndex: 'goodAt',
            key: 'goodAt',
        },{
            title: '联系电话',
            dataIndex: 'mobile',
            key: 'mobile',
        },{
            title: '从业年限',
            dataIndex: 'employYears',
            key: 'employYears',
        },{
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },{
            title: '评估级别',
            dataIndex: 'estimateLevel',
            key: 'estimateLevel',
        },{
            title: '外协工号',
            dataIndex: 'employNumber',
            key: 'employNumber',
        },{
            title: '计划出项目日期',
            dataIndex: 'planDate',
            key: 'planDate',
        },{
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
        },{
            title: '最高学历',
            dataIndex: 'degree',
            key: 'degree',
        },{
            title: '操作',
            key: 'action',
            render: (text,record) => (
                <span>
                    <Button type={role===0?"":"danger"} onClick={()=>{
                        if(role !== 0)
                            message.error("对不起，权限不足");
                        else
                        {
                            adminGetOneConsultantInfo(record.id);
                            consultantsInfoChangeModalIsVisible(true);
                        }
                    }}>修改</Button>&nbsp;
                    <Popconfirm okType="danger" okText="删除" cancelText="取消"
                    title={"删除顾问 "+record.id+record.name+"?"} icon={<Icon type="warning" />}
                                onConfirm={()=>{
                                    if(role !== 0)
                                       message.error("权限不足！");
                                    else {
                                        deleteOneConsultant(consultantDataPageCode,record.id);
                                    }
                                }}
                    ><Button type="danger">删除</Button></Popconfirm>
                </span>
            ),
        }];
        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>基础信息维护</Breadcrumb.Item>
                    <Breadcrumb.Item>外协顾问信息</Breadcrumb.Item>
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
                    <Button className="admin-button" onClick={()=>{message.info("请前往注册页面~~~~");}}>添加</Button>
                    <Icon title="刷新" type="reload" style={{fontSize:30,color:"#1890ff"}}
                          onClick={()=>{adminMainGetOnePageConsultantInfo(1);
                              adminMainChangeConsultantsDataPageCode(1);
                              message.info("刷新中...",1);
                          }} />
                    <Table columns={consultantColumns}
                           dataSource={consultantData.toJS()}
                           pagination={{current:consultantDataPageCode,
                               showQuickJumper:true,pageSize:6,defaultCurrent:1,
                               total:consultantDataTotal,position:"top",
                               onChange:(code)=>{adminMainGetOnePageConsultantInfo(code);
                                   adminMainChangeConsultantsDataPageCode(code)}}} />
                </div>
                <Modal
                    width={800}
                    title="外协顾问信息"
                    visible={modalIsVisible}
                    onOk={()=>{saveConsultantInfo(consultantDataPageCode,id,email,name,mobile,employYears,estimateLevel,employNumber,planDate,communicateDate,communicatePerson,location,otherInfo);}}
                    onCancel={()=>{consultantsInfoChangeModalIsVisible(false)}}
                    okText="保存"
                    cancelText="取消"
                >
                    <label>序号：</label><Input value={id} style={{width:100}} disabled={true}/>
                    <label>&nbsp;&nbsp;&nbsp;邮箱：</label><Input value={email} style={{width:300}} disabled={true}/>
                    <Divider dashed />
                    <label>姓名：</label><Input value={name==="null"?"":name} onChange={changeName} style={{width:150}}/>
                    <label>&nbsp;&nbsp;&nbsp;联系电话：</label><Input onChange={changeMobile} value={mobile==="null"?"":mobile} style={{width:300}}/>
                    <Divider dashed />
                    <label>从业年限：</label><Input onChange={changeEmployYears} value={employYears==="null"?"":employYears} style={{width:100}}/>
                    <label>&nbsp;&nbsp;&nbsp;评估级别：</label><Input onChange={changeEstimateLevel} value={estimateLevel==="null"?"":estimateLevel} style={{width:200}}/>
                    <Divider dashed />
                    <label>外协工号：</label><Input onChange={changeEmployNumber} value={employNumber==="null"?'':employNumber} style={{width:300}}/>
                    <label>&nbsp;&nbsp;&nbsp;计划出项目日期：</label><DatePicker format={'YYYY-MM-DD'}
                                                                         onChange={changePlanDate}
                                                                               value={planDate==null||planDate.toString()===""?moment():moment(planDate.toString(),"YYYY-MM-DD")} />
                    <Divider dashed />
                    <label>最近一次沟通日期：</label><DatePicker format={'YYYY-MM-DD'}
                                                        onChange={changeCommunicateDate}
                                                        value={communicateDate==null||communicateDate.toString()===""?moment():moment(communicateDate.toString(),"YYYY-MM-DD")} />
                    <label>&nbsp;&nbsp;&nbsp;沟通人：</label><Input onChange={changeCommunicatePerson} value={communicatePerson==="null"?"":communicatePerson} style={{width:300}}/>
                    <Divider dashed />
                    <label>常居地：</label><Input onChange={changeLocation} value={location==="null"?"":location}/>
                    <Divider dashed />
                    <label>其他备注：</label><TextArea onChange={changeOtherInfo} value={otherInfo==="null"?"":otherInfo} rows={3}/>

                </Modal>
            </Content>
        );
    }

}
const mapState = (state) => ({
    role:state.getIn(['adminLogin','role']),
    consultantData:state.getIn(['consultantsInfo','consultantData']),
    consultantDataTotal:state.getIn(['consultantsInfo','consultantDataTotal']),
    consultantDataPageCode:state.getIn(['consultantsInfo','consultantDataPageCode']),
    modalIsVisible:state.getIn(['consultantsInfo','modalIsVisible']),

    id:state.getIn(['consultantsInfo','id']),
    email:state.getIn(['consultantsInfo','email']),
    name:state.getIn(['consultantsInfo','name']),
    mobile:state.getIn(['consultantsInfo','mobile']),
    employYears:state.getIn(['consultantsInfo','employYears']),
    estimateLevel:state.getIn(['consultantsInfo','estimateLevel']),
    employNumber:state.getIn(['consultantsInfo','employNumber']),
    planDate:state.getIn(['consultantsInfo','planDate']),
    communicateDate:state.getIn(['consultantsInfo','communicateDate']),
    communicatePerson:state.getIn(['consultantsInfo','communicatePerson']),
    location:state.getIn(['consultantsInfo','location']),
    otherInfo:state.getIn(['consultantsInfo','otherInfo']),
});
const mapDispatch = (dispatch) => ({
    adminMainGetOnePageConsultantInfo(pageCode){
        dispatch(actionCreator.adminMainGetConsultantInfo(pageCode));
    },
    adminMainChangeConsultantsDataPageCode(code){
        dispatch(actionCreator.adminMainChangeConsultantDataPageCode(code));
    },
    consultantsInfoChangeModalIsVisible(val){
        dispatch(actionCreator.consultantInfoChangeModalIsVisible(val));
    },
    adminGetOneConsultantInfo(id){
        dispatch(actionCreator.adminGetOneConsultantInfo(id));
    },
    changeName(e){
        dispatch(actionCreator.consultantInfoChangeName(e.target.value));
    },
    changeMobile(e){
        dispatch(actionCreator.consultantInfoChangeMobile(e.target.value));
    },
    changeEmployYears(e){
        dispatch(actionCreator.consultantInfoChangeEmployYears(e.target.value));
    },
    changeEstimateLevel(e){
        dispatch(actionCreator.consultantInfoChangeEstimateLevel(e.target.value));
    },
    changeEmployNumber(e) {
        dispatch(actionCreator.consultantInfoChangeEmployNumber(e.target.value));
    },
    changeCommunicatePerson(e){
        dispatch(actionCreator.consultantInfoChangeCommunicatePerson(e.target.value));
    },
    changeLocation(e){
        dispatch(actionCreator.consultantInfoChangeLocation(e.target.value));
    },
    changeOtherInfo(e){
        dispatch(actionCreator.consultantInfoChangeOtherInfo(e.target.value));
    },
    changePlanDate(date,dateString){
        dispatch(actionCreator.consultantInfoChangePlanDate(dateString));
    },
    changeCommunicateDate(date,dateString){
        dispatch(actionCreator.consultantInfoChangeCommunicateDate(dateString));
    },
    saveConsultantInfo(nowPage,id,email,name,mobile,employYears,estimateLevel,employNumber,planDate,communicateDate,communicatePerson,location,otherInfo){
        dispatch(actionCreator.saveConsultantInfo(nowPage,id,email,name,mobile,employYears,estimateLevel,employNumber,planDate,communicateDate,communicatePerson,location,otherInfo));
    },
    deleteOneConsultant(nowPage,id){
        dispatch(actionCreator.adminDeleteOneConsultant(nowPage,id));
    }


});
export default connect(mapState,mapDispatch)(ConsultantsManager);

/*
const consultantColumns = [{
    title: '序号',
    dataIndex: 'id',
    key: 'id',
}, {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '擅长模块',
    dataIndex: 'goodAt',
    key: 'goodAt',
}, {
    title: '联系电话',
    dataIndex: 'mobile',
    key: 'mobile',
}, {
    title: '从业年限',
    dataIndex: 'employYears',
    key: 'employYears',
},{
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
},{
    title: '评估级别',
    dataIndex: 'estimateLevel',
    key: 'estimateLevel',
},{
    title: '外协工号',
    dataIndex: 'employNumber',
    key: 'employNumber',
},{
    title: '计划出项目日期',
    dataIndex: 'planDate',
    key: 'planDate',
},{
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
},{
    title: '最高学历',
    dataIndex: 'degree',
    key: 'degree',
},{
    title: '操作',
    key: 'action',
    render: () => (
        <Button >修改</Button>
    ),
}];
*/

/*const consultantData = fromJS([{
    key: '1',
    number:1,
    name: '王二',
    goodAt:'MM',
    phone:'13032503165',
    employYears:'8年',
    email:"simahui123@gmail.com",
    evaluateLevel:'Hflyer',
    employNumber:'10000',
    planDate:'2019-03-01',
    sex:'男',
    degree:'本科',
},{
    key: '2',
    number:2,
    name: '王三',
    goodAt:'SS',
    phone:'13032503165',
    employYears:'8年',
    email:"252159904@qq.com",
    evaluateLevel:'Hflyer',
    employNumber:'10000',
    planDate:'2019-03-01',
    sex:'女',
    degree:'本科',
},{
    key: '3',
    number:3,
    name: '王二',
    goodAt:'MM',
    phone:'13032503165',
    employYears:'8年',
    email:"simahui123@gmail.com",
    evaluateLevel:'Hflyer',
    employNumber:'10000',
    planDate:'2019-03-01',
    sex:'男',
    degree:'本科',
},{
    key: '4',
    number:4,
    name: '王二',
    goodAt:'MM',
    phone:'13032503165',
    employYears:'8年',
    email:"simahui123@gmail.com",
    evaluateLevel:'Hflyer',
    employNumber:'10000',
    planDate:'2019-03-01',
    sex:'男',
    degree:'本科',
},{
    key: '5',
    number:5,
    name: '王二',
    goodAt:'MM',
    phone:'13032503165',
    employYears:'8年',
    email:"simahui123@gmail.com",
    evaluateLevel:'Hflyer',
    employNumber:'10000',
    planDate:'2019-03-01',
    sex:'男',
    degree:'本科',
},{
    key: '6',
    number:6,
    name: '王二',
    goodAt:'MM',
    phone:'13032503165',
    employYears:'8年',
    email:"simahui123@gmail.com",
    evaluateLevel:'Hflyer',
    employNumber:'10000',
    planDate:'2019-03-01',
    sex:'男',
    degree:'本科',
}]);*/
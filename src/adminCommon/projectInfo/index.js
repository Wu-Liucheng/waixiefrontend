import React,{PureComponent} from 'react';
import {connect} from "react-redux";
import './index.css';
import {Input, Button, Table, Layout, Breadcrumb, Divider, DatePicker, Modal,Select,Radio,message} from "antd";
import {actionCreator} from "./store";
import {actionCreator as modalDemandActionCreator} from "../modalDemand/store";
import moment from "moment";
import ModalDemand from '../modalDemand/index.js';
const {
    Content
} = Layout;

const Search = Input.Search;
const {Option} = Select;
class ProjectInfo extends PureComponent{
    componentDidMount() {
        const{projectMainGetOnePageData,isYourselfProject,
            projectMainGetOnePageClientInfoAboutYourself,username} = this.props;
        if(isYourselfProject)
        {
            projectMainGetOnePageClientInfoAboutYourself(1,username)
        }
        else
        {
            projectMainGetOnePageData(1);
        }
    }

    render(){
        const projectColumns = [{
            title:'序号',
            dataIndex:'id',
            key:'id',
        },{
            title:'项目编号',
            dataIndex:'number',
            key:'number',
        },{
            title:'项目名称',
            dataIndex:'name',
            key:'name',
        },{
            title:'项目经理',
            dataIndex:'managerName',
            key:'managerName',
        },{
            title:'项目状态',
            dataIndex:'status',
            key:'status',
        },{
            title:'项目开始日期',
            dataIndex:'startDate',
            key:'startDate',
        },{
            title:'项目结束日期',
            dataIndex:'endDate',
            key:'endDate',
        },{
            title:'项目所属公司',
            dataIndex:'clientName',
            key:'clientName',
        },{
            title: '操作',
            key: 'action',
            render: (text,record) => (
                <span>
            <Button onClick={()=>{
                if(role !== 1){
                    message.error("权限不足！");
                }
                else {
                    if(record.status === "Close"){
                        message.error("此项目已关闭！");
                    }
                    else {
                        verifyProjectManagerHasAuthority(username,record.id);
                        projectChangeDemandModalObjectId(record.id);
                    }
                }
            }}>添加需求</Button>
            <Button onClick={()=>{
                if(role === 0 || role === 1)
                {
                    projectChangeClientId(null);
                    projectChangeManagerId(null);
                    if(role === 0)
                    {
                        projectMainGetOneInfo(record.id);
                        projectMainChangeModalIsVisible(true);
                        projectMainChangeModalStatus(0);
                    }
                    else if (role === 1)
                    {
                        projectVerifyProjectManager(username,record.id)
                    }
                }
                else
                {
                    message.error("权限不足！")
                }
            }}>修改</Button>
        </span>
            ),
        }];
        const {
            role,
            username,

            modalIsVisible,projectMainChangeModalIsVisible,
            modalStatus,
            projectData,projectMainGetOnePageData,
            projectDataTotal,
            projectDataPageCode,

            id,
            name,
            number,
            status,
            startDate,
            endDate,

            projectMainGetOneInfo,
            projectMainChangeModalStatus,

            projectVerifyProjectManager,

            corporateInfo,
            managerInfo,

            projectChangeNumber,
            projectChangeName,
            projectChangeStatus,
            projectChangeStartDate,
            projectChangeEndDate,
            projectChangeClientId,
            projectChangeManagerId,

            projectUpdate,

            projectSetDataDefault,
            projectGetAllClientSimplyInfo,
            clientId,managerId,
            projectManagersBelongToAClient,
            projectSetCorporateInfoAndManagerInfoByUsername,
            projectAdd,

            isYourselfProject,projectChangeIsYourself,
            projectMainGetOnePageClientInfoAboutYourself,

            verifyProjectManagerHasAuthority,
            projectChangeDemandModalObjectId,
        } = this.props;
        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>基础信息维护</Breadcrumb.Item>
                    <Breadcrumb.Item>项目基础信息</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Search
                        className="admin-search-input"
                        placeholder="输入搜索信息"
                        enterButton="Search"
                        size="default"
                        onSearch={value => console.log(value)}
                    />
                    <Button className="admin-button" disabled={!(role === 1)}
                            onClick={()=>{
                                projectChangeIsYourself(!isYourselfProject);
                                if(isYourselfProject){
                                    projectMainGetOnePageData(projectDataPageCode);
                                }
                                else {
                                    projectMainGetOnePageClientInfoAboutYourself(projectDataPageCode,username);
                                }
                            }}
                    >{isYourselfProject?"显示自己项目":"只看自己项目"}</Button>
                    <Button className="admin-button" onClick={()=>{
                        projectSetDataDefault();
                        projectMainChangeModalIsVisible(true);
                        projectMainChangeModalStatus(1);
                    }}>添加</Button>
                    <Table columns={projectColumns}
                           dataSource={projectData.toJS()}
                           pagination={{showQuickJumper:true,pageSize:6,defaultCurrent:projectDataPageCode,total:projectDataTotal,
                           onChange:(code)=>{
                               if(isYourselfProject){projectMainGetOnePageClientInfoAboutYourself(code,username);}
                               else
                               {
                                   projectMainGetOnePageData(code);
                               }
                               }}} />
                </div>
                <Modal
                    width={800}
                    title="外协顾问信息"
                    visible={modalIsVisible}
                    onCancel={()=>{projectMainChangeModalIsVisible(false)}}
                    okText={modalStatus===0?"保存":"确定"}
                    cancelText="取消"
                    onOk={()=>{
                        if(modalStatus === 0)
                        {
                            projectUpdate(id,name,number,status,startDate,endDate,projectDataPageCode,isYourselfProject,username);
                        }
                        else if(modalStatus === 1)
                        {
                            projectAdd(name,number,managerId,startDate,endDate,status,clientId,projectDataPageCode,isYourselfProject,username);
                        }
                    }}
                >
                    <label>序号：</label><Input style={{width:100}} value={id} disabled={true}/>
                    <label>&nbsp;&nbsp;&nbsp;项目编号：</label><Input style={{width:200}} value={number} onChange={projectChangeNumber}/>
                   <Divider dashed/>
                    <label>项目名称：</label><Input style={{width:300}} value={name} onChange={projectChangeName} />
                    <label>&nbsp;&nbsp;&nbsp;项目状态：</label>
                    <Radio.Group value={status} onChange={projectChangeStatus}><Radio value={1}>Open</Radio><Radio value={0}>Close</Radio></Radio.Group>
                    <Divider dashed/>
                    <label>项目所属公司：</label>
                    <Select style={{width:300}} value={clientId} onChange={(value)=>{
                        projectChangeClientId(value);
                        if(modalStatus === 1 ){
                            if(role === 0){
                                projectManagersBelongToAClient(value);
                                projectChangeManagerId(null);
                            }
                            else if(role === 1){

                            }
                        }
                    }
                    } onFocus={() => {
                        if(modalStatus === 1){
                            if(role === 0 ){
                                projectGetAllClientSimplyInfo();
                            }// 管理员可以选择任意客户任意项目经理、列表框的联动
                            else if(role === 1)
                            {
                                projectSetCorporateInfoAndManagerInfoByUsername(username);
                            }//项目经理只能选择自己的公司与自己作为项目经理
                        }
                    }}>
                        {
                            corporateInfo == null?null:
                            corporateInfo.map((item,index)=>{
                                return (
                                    <Option key = {index} value={item.split(":")[0]}>{item.split(":")[1]}</Option>
                                )
                            })
                        }
                    </Select>
                    <label>&nbsp;&nbsp;&nbsp;项目经理：</label>
                    <Select style={{width:100}} value={managerId} onChange={projectChangeManagerId}>
                        {
                            managerInfo==null?null:
                            managerInfo.map((item,index)=>{
                                return (
                                    <Option key ={index}  value={item.split(":")[0]}>{item.split(":")[1]}</Option>
                                )
                            })
                        }
                    </Select>
                    <Divider dashed/>
                    <label>项目开始日期：</label><DatePicker format={'YYYY-MM-DD'} onChange={projectChangeStartDate}
                                                      value={startDate.toString()===""?moment():moment(startDate.toString(),"YYYY-MM-DD")}/>
                    <label>项目结束日期：</label><DatePicker format={'YYYY-MM-DD'} onChange={projectChangeEndDate}
                                                      value={endDate.toString()===""?moment():moment(endDate.toString(),"YYYY-MM-DD")}/>
                </Modal>
                <ModalDemand/>
            </Content>
        );
    }
}

const mapState = (state) => ({
    role:state.getIn(['adminLogin','role']),
    username:state.getIn(['adminLogin','username']),

    modalIsVisible:state.getIn(['projectInfo','modalIsVisible']),
    modalStatus:state.getIn(['projectInfo','modalStatus']),
    projectData:state.getIn(['projectInfo','projectData']),
    projectDataTotal:state.getIn(['projectInfo','projectDataTotal']),
    projectDataPageCode: state.getIn(['projectInfo','projectDataPageCode']),

    id:state.getIn(['projectInfo','id']),
    name:state.getIn(['projectInfo','name']),
    number:state.getIn(['projectInfo','number']),
    status:state.getIn(['projectInfo','status']),
    startDate:state.getIn(['projectInfo','startDate']),
    endDate:state.getIn(['projectInfo','endDate']),
    corporateInfo: state.getIn(["projectInfo",'corporateInfo']),
    managerInfo: state.getIn(['projectInfo','managerInfo']),

    clientId:state.getIn(['projectInfo','clientId']),
    managerId: state.getIn(['projectInfo','managerId']),

    isYourselfProject: state.getIn(['projectInfo','isYourselfProject']),
});
const mapDispatch = (dispatch) => ({
    projectMainGetOnePageData(pageCode){
        dispatch(actionCreator.projectMainGetOnePageClientInfo(pageCode));
    },
    projectMainChangePageCode(code){
        dispatch(actionCreator.projectMainChangeChangePageCode(code));
    },
    projectMainChangeModalIsVisible(val){
        dispatch(actionCreator.projectMainChangeModalIsVisible(val));
    },
    projectMainChangeModalStatus(val){
        dispatch(actionCreator.projectMainChangeModalStatus(val));
    },
    projectMainGetOneInfo(id){
        dispatch(actionCreator.projectMainGetOne(id));
    },
    projectVerifyProjectManager(username,projectId)
    {
        dispatch(actionCreator.verifyProjectManager(username,projectId));
    },


    projectChangeNumber(e){
        dispatch(actionCreator.projectMainChangeNumber(e.target.value));
    },
    projectChangeName(e){
        dispatch(actionCreator.projectMainChangeName(e.target.value));
    },
    projectChangeStatus(e){
        dispatch(actionCreator.projectMainChangeStatus(e.target.value));
    },
    projectChangeClientId(value){
        dispatch(actionCreator.projectMainChangeClientId(value));
    },
    projectChangeManagerId(value){
        dispatch(actionCreator.projectMainChangeManagerId(value));
    },
    projectChangeStartDate(date,dateString){
        dispatch(actionCreator.projectMainChangeStartDate(dateString));
    },
    projectChangeEndDate(date,dateString){
        dispatch(actionCreator.projectMainChangeEndDate(dateString));
    },
    projectUpdate(id,name,number,status,startDate,endDate,projectDataPageCode,isYourselfProject,username){
        dispatch(actionCreator.updateProjectInfo(id,name,number,status,startDate,endDate,projectDataPageCode,isYourselfProject,username));
    },

    projectSetDataDefault(){dispatch(actionCreator.projectMainSetDataDefault)},

    projectGetAllClientSimplyInfo(){dispatch(actionCreator.projectGetAllClientSimplyInfo())},
    projectManagersBelongToAClient(clientId){dispatch(actionCreator.projectManagersBelongToAClient(clientId))},

    projectSetCorporateInfoAndManagerInfoByUsername(username){dispatch(actionCreator.projectSetCorporateInfoAndManagerInfoByUsername(username))},

    projectAdd(name,number,managerId,startDate,endDate,status,clientId,pageCode,isYourselfProject,username){
        dispatch(actionCreator.projectAdd(name,number,managerId,startDate,endDate,status,clientId,pageCode,isYourselfProject,username));
    },
    projectChangeIsYourself(val){dispatch(actionCreator.projectChangeIsYourself(val))},
    projectMainGetOnePageClientInfoAboutYourself(pageCode,username){
        dispatch(actionCreator.projectMainGetOnePageClientInfoAboutYourself(pageCode,username));
    },
    projectChangeDemandModalIsVisible(val){dispatch(modalDemandActionCreator.modalDemandChangeIsVisible(val))},
    verifyProjectManagerHasAuthority(username,projectId){dispatch(actionCreator.verifyProjectManagerHasAuthority(username,projectId))},
    projectChangeDemandModalObjectId(objectId){dispatch(modalDemandActionCreator.modalDemandChangeObjectId(objectId))},
});
export default connect(mapState,mapDispatch)(ProjectInfo);
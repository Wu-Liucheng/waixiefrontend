import React,{PureComponent} from 'react';
import {connect} from "react-redux";
import './index.css';
import {Input, Button, Table, Layout, Breadcrumb, Divider, Modal,message} from "antd";
import {actionCreator} from "./store";
import {clientActionCreator} from "./oneClientStore"
const {
    Content
} = Layout;
const TextArea = Input.TextArea;
const Search = Input.Search;

class ClientInfo extends PureComponent{
    componentDidMount() {
        const {
            getOnePageClientInfo
        } = this.props;
        getOnePageClientInfo(1);
    }

    render(){
        const clientColumns = [{
            title:'序号',
            dataIndex:'id',
            key:'id',
        },{
            title:'客户编号',
            dataIndex:'customerNumber',
            key:'customerNumber',
        },{
            title:'公司名称',
            dataIndex:'corporateName',
            key:'corporateName',
        },{
            title:'联系人',
            dataIndex:'contacts',
            key:'contacts',
        },{
            title:'联系电话',
            dataIndex:'contactsTel',
            key:'contactsTel',
        },{
            title:'联系人邮箱',
            dataIndex:'contactsEmail',
            key:'contactsEmail',
        },{
            title: '操作',
            key: 'action',
            render: (text,record) => (
                <span>
                    <Button onClick={()=>{
                        if(role === 0 || role===3)
                        {
                            if(role === 0)
                            {
                                getOneClientInfo(record.id);
                                ChangeModalIsVisible(true);
                                changeModalStatus(0);
                            }
                            if(role === 3)
                            {
                                verifyCorporateAdmin(username,record.id);
                            }
                        }
                        else{
                            message.error("权限不足！")
                        }
                    }}>修改</Button>&nbsp;
                   {/* <Popconfirm>
                        <Button type="danger">删除</Button>
                    </Popconfirm>*/}
                </span>
            ),
        }];
        const {
            role,username,
            modalIsVisible,ChangeModalIsVisible,changeModalStatus,modalStatus,
            clientData,getOnePageClientInfo,
            clientDataTotal,
            clientDataPageCode,

            id,
            customerNumber,changeCustomerNumber,
            corporateName,changeCorporateName,
            corporateAddress,changeCorporateAddress,
            contacts,changeContacts,
            contactsTel,changeContactsTel,
            contactsEmail,changeContactsEmail,
            introduction,changeIntroduction,
            invoiceCustomerName,changeInvoice,
            taxPayerIdentificationNum,changeTax,
            telephone,changeTelephone,
            bank,changBank,
            bankAccount,changeBankAccount,
            getOneClientInfo,verifyCorporateAdmin,

            saveClientInfo,
            addClient,
            clearClientData,
        } = this.props;
        return (
        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>基础信息维护</Breadcrumb.Item>
                <Breadcrumb.Item>客户基础信息</Breadcrumb.Item>
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
                <Button className="admin-button" onClick={()=>{
                    if(role !== 0)
                    {
                        message.error("权限不足！");
                        return;
                    }
                    changeModalStatus(1);
                    clearClientData();
                    ChangeModalIsVisible(true);
                }
                }>添加</Button>
                <Table columns={clientColumns}
                       dataSource={clientData.toJS()}
                       pagination={{showQuickJumper:true,current:clientDataPageCode,pageSize:6,defaultCurrent:1,total:clientDataTotal,
                       onChange:(code) => getOnePageClientInfo(code)}} />
            </div>
            <Modal
                width={800}
                title="外协顾问信息"
                visible={modalIsVisible}
                onCancel={()=>{ChangeModalIsVisible(false)}}
                onOk={()=>{
                    if(!this.checkDataIsProperly(id,customerNumber,corporateName,corporateAddress,contacts,contactsTel,
                        contactsEmail,introduction,invoiceCustomerName,taxPayerIdentificationNum,
                        telephone,bank,bankAccount)){

                    }
                    else {
                        if(modalStatus===0){
                            saveClientInfo(clientDataPageCode,id,customerNumber,corporateName,corporateAddress,contacts,contactsTel,
                                contactsEmail,introduction,invoiceCustomerName,taxPayerIdentificationNum,
                                telephone,bank,bankAccount);
                        }
                        else if(modalStatus===1){
                            addClient(clientDataPageCode,id,customerNumber,corporateName,corporateAddress,contacts,contactsTel,
                                contactsEmail,introduction,invoiceCustomerName,taxPayerIdentificationNum,
                                telephone,bank,bankAccount);
                        }
                        getOnePageClientInfo(clientDataPageCode);
                    }

                }}
                okText={modalStatus===0?"保存":"添加"}
                cancelText="取消"
                closable={false}
                style={{marginTop:20}}
            >
                <label>序号：</label><Input value={id} style={{width:100}} disabled={true}/>
                <label>&nbsp;&nbsp;&nbsp;客户编号：</label><Input value={customerNumber} onChange={changeCustomerNumber}  style={{width:200}} />
                <Divider dashed />
                <label>公司名称：</label><Input value={corporateName} onChange={changeCorporateName} style={{width:300}}/>
                <label>&nbsp;&nbsp;&nbsp;联系人：</label><Input value={contacts} onChange={changeContacts} style={{width:300}}/>
                <Divider dashed />
                <label>联系人电话：</label><Input value={contactsTel} onChange={changeContactsTel} style={{width:140}}/>
                <label>&nbsp;&nbsp;&nbsp;联系人邮箱：</label><Input value={contactsEmail} onChange={changeContactsEmail} style={{width:200}}/>
                <Divider dashed />
                <label>公司法人：</label><Input value={invoiceCustomerName} onChange={changeInvoice} style={{width:100}}/>
                <label>&nbsp;&nbsp;&nbsp;税务登记号：</label><Input  value={taxPayerIdentificationNum} onChange={changeTax}  style={{width:210}}/>
                <Divider dashed />
                <label>开户银行：</label><Input value={bank} onChange={changBank} style={{width:200}}/>
                <label>&nbsp;&nbsp;&nbsp;对公账号：</label><Input onChange={changeBankAccount} value={bankAccount} style={{width:300}}/>
                <Divider dashed />
                <label>联系电话：</label><Input value={telephone} onChange={changeTelephone} style={{width:300}}/>
                <Divider dashed />
                <label>公司地址：</label><Input value={corporateAddress} onChange={changeCorporateAddress} />
                <Divider dashed />
                <label>公司介绍：</label><TextArea value={introduction} onChange={changeIntroduction} rows={3}/>

            </Modal>
        </Content>);
    }

    checkDataIsProperly(id,customerNumber,corporateName,corporateAddress,contacts,contactsTel,
                        contactsEmail,introduction,invoiceCustomerName,taxPayerIdentificationNum,
                        telephone,bank,bankAccount){
        let tel=/^[1][3,4,5,7,8,9][0-9]{9}$/;
        if(!tel.test(contactsTel)){message.error("联系人手机号格式有误！");return false;}
        let gu = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
        if(!tel.test(telephone)&&!gu.test(telephone)){message.error("公司联系方式错误！");return false;}
        let email = /^([a-zA-Z]|[0-9])(\w|)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if(!email.test(contactsEmail)){message.error("联系人邮箱错误！");return false;}
        let tax = /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/;
        if(taxPayerIdentificationNum!=null&&!tax.test(taxPayerIdentificationNum)&&taxPayerIdentificationNum.length!==0){message.error("税务登记号错误！");return false;}
        let b = /^\d{16}|\d{19}$/;
        if(bankAccount!=null&&!b.test(bankAccount)&&bankAccount.length!==0){message.error("对公账户有误！");return false;}
        return true;
    }
}

const mapState = (state) => ({
    role:state.getIn(['adminLogin','role']),
    username:state.getIn(['adminLogin','username']),
    clientData:state.getIn(['clientInfo','clientData']),
    clientDataTotal:state.getIn(['clientInfo','clientDataTotal']),
    clientDataPageCode:state.getIn(['clientInfo','clientDataPageCode']),
    modalIsVisible:state.getIn(['clientInfo','modalIsVisible']),
    modalStatus:state.getIn(['clientInfo','modalStatus']),

    id:state.getIn(['oneClient','id']),
    customerNumber: state.getIn(['oneClient','customerNumber']),
    corporateName: state.getIn(['oneClient','corporateName']),
    corporateAddress: state.getIn(['oneClient','corporateAddress']),
    contacts: state.getIn(['oneClient','contacts']),
    contactsTel: state.getIn(['oneClient','contactsTel']),
    contactsEmail: state.getIn(['oneClient','contactsEmail']),
    introduction: state.getIn(['oneClient','introduction']),
    invoiceCustomerName: state.getIn(['oneClient','invoiceCustomerName']),
    taxPayerIdentificationNum: state.getIn(['oneClient','taxPayerIdentificationNum']),
    telephone: state.getIn(['oneClient','telephone']),
    bank: state.getIn(['oneClient','bank']),
    bankAccount: state.getIn(['oneClient','bankAccount']),
});
const mapDispatch = (dispatch) => ({
    getOnePageClientInfo(code){
        dispatch(actionCreator.clientGetOnePageClientInfo(code));
    },
    ChangeModalIsVisible(val){
        dispatch(actionCreator.clientChangeModalIsVisible(val));
    },

    changeId(e){dispatch(clientActionCreator.clientChangeId(e.target.value));},
    changeCustomerNumber(e){dispatch(clientActionCreator.clientChangeCustomerNumber(e.target.value))},
    changeCorporateName(e){dispatch(clientActionCreator.clientChangeCorporateName(e.target.value))},
    changeCorporateAddress(e){dispatch(clientActionCreator.clientChangeCorporateAddress(e.target.value))},
    changeContacts(e){dispatch(clientActionCreator.clientChangeContacts(e.target.value))},
    changeContactsTel(e){dispatch(clientActionCreator.clientChangeContactsTel(e.target.value))},
    changeContactsEmail(e){dispatch(clientActionCreator.clientChangeContactsEmail(e.target.value))},
    changeIntroduction(e){dispatch(clientActionCreator.clientChangeIntroduction(e.target.value))},
    changeInvoice(e){dispatch(clientActionCreator.clientChangeInvoice(e.target.value))},
    changeTax(e){dispatch(clientActionCreator.clientChangeTax(e.target.value))},
    changeTelephone(e){dispatch(clientActionCreator.clientChangeTelephone(e.target.value))},
    changBank(e){dispatch(clientActionCreator.clientChangeBank(e.target.value))},
    changeBankAccount(e){dispatch(clientActionCreator.clientChangeBankAccount(e.target.value))},

    getOneClientInfo(id){dispatch(clientActionCreator.getOneClientInfo(id))},
    verifyCorporateAdmin(loginName,clientId){dispatch(clientActionCreator.verifyCorporateAdmin(loginName,clientId))},

    changeModalStatus(val){dispatch(actionCreator.clientChangeClientModalStatus(val))},

    saveClientInfo(clientDataPageCode,id,customerNumber,corporateName,corporateAddress,contacts,contactsTel,
                   contactsEmail,introduction,invoiceCustomerName,taxPayerIdentificationNum,
                   telephone,bank,bankAccount){
        dispatch(clientActionCreator.saveClientInfo(clientDataPageCode,id,customerNumber,corporateName,corporateAddress,contacts,contactsTel,
            contactsEmail,introduction,invoiceCustomerName,taxPayerIdentificationNum,
            telephone,bank,bankAccount));
    },
    addClient(clientDataPageCode,id,customerNumber,corporateName,corporateAddress,contacts,contactsTel,
              contactsEmail,introduction,invoiceCustomerName,taxPayerIdentificationNum,
              telephone,bank,bankAccount){
        dispatch(clientActionCreator.addClient(clientDataPageCode,id,customerNumber,corporateName,corporateAddress,contacts,contactsTel,
            contactsEmail,introduction,invoiceCustomerName,taxPayerIdentificationNum,
            telephone,bank,bankAccount));
    },
    clearClientData(){dispatch(clientActionCreator.clientSetDefault)},
});
export default connect(mapState,mapDispatch)(ClientInfo);
/*
const clientData = [{
    key:'1',
    number:1,
    id:'S10000',
    name:'上海汉得信息技术股份有限公司',
    linkman:'王二',
    phone:'13012345678',
    email:'123@163.com',
},{
    key:'2',
    number:1,
    id:'S10000',
    name:'阿里巴巴有限公司',
    linkman:'王二',
    phone:'13012345678',
    email:'123@163.com',
},{
    key:'3',
    number:1,
    id:'S10000',
    name:'腾讯科技有限公司',
    linkman:'王二',
    phone:'13012345678',
    email:'123@163.com',
},{
    key:'4',
    number:1,
    id:'S10000',
    name:'网易股份有限公司',
    linkman:'王二',
    phone:'13012345678',
    email:'123@163.com',
},{
    key:'5',
    number:1,
    id:'S10000',
    name:'上海汉得信息技术股份有限公司',
    linkman:'王二',
    phone:'13012345678',
    email:'123@163.com',
},{
    key:'6',
    number:1,
    id:'S10000',
    name:'上海汉得信息技术股份有限公司',
    linkman:'王二',
    phone:'13012345678',
    email:'123@163.com',
}];*/

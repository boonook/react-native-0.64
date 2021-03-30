import React from 'react';
import {Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import {Icon, Toast, Modal, ActionSheet} from '@ant-design/react-native';
import {defaultAddress} from '@/Api/meApi';
import {addPlaceAnOrder,getGroupInfo} from '@/Api/merchantApi';
import Headers from "@/Components/header/Headers";
import {CachedImage} from 'react-native-img-cache'
import ModalPicker from "@/Components/modalPicker/ModalPicker";
import constant from "@/utils/constant";
import moment from "moment";
import {inject, observer} from "mobx-react";

// @ts-ignore
@inject(["userState"]) // 注入对应的store
@observer // 监听当前组件
export default class DetermineOrderScreen extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            data:{},
            inputValue:0,
            sumMoney:'0.00',
            yunfei:'0.00',
            price:'0.00',
            priceOriginal:'0.00',
            name:'',
            mobile:'',
            address:'',
            visible:false,
            dealPassword:'',
            value: undefined,
            payTypeVisible:false,
            groupInfoData:[],
            thumbnail:null,
            payType:[
                [
                    {
                        label: '余额支付',
                        value: 'yuezhifu',
                    },
                    // {
                    //     label: '微信支付',
                    //     value: 'weixin',
                    // },
                    // {
                    //     label: '支付宝支付',
                    //     value: 'zhifubao',
                    // }
                ]
            ],
            payTypeIndex:['yuezhifu'],
            payTypeName:'',
            type:null,///1.立即购买2.拼团
            addressDetail:{},
            phone:null,
            userInfo:{},
        }
    };

    getDefaultAddress=()=>{
        defaultAddress({}).then(res=>{
            if(res && res.code+''===constant.SUCCESS+''){
                let data = res.data||{};
                this.setState({
                    addressDetail:data,
                    userAddressId:data.id||null
                })
            }
        })
    }

    getGroupInfoDetail=()=>{
        let info = this.props.route.params||{};
        let params={
            "commodityId":info.data.id
        }
        getGroupInfo(params).then(res=>{
            if(res && res.code+''===constant.SUCCESS+''){
                let data = res.data||{};
                data.forEach(item=>{
                    // @ts-ignore
                    item.shengyuTime = (moment(item.endTime).format('x'))-(moment(new Date()).format('x'));
                    let tempTime = moment.duration(item.shengyuTime);
                    item.days= tempTime.days()//是（实际天数%30），例如相差36天，计算成6。以下类推
                    item.hours = tempTime.hours()
                    item.minutes = tempTime.minutes();
                    item.seconds = tempTime.seconds();
                    item.newDays= tempTime.days()>9?tempTime.days():'0'+tempTime.days();//是（实际天数%30），例如相差36天，计算成6。以下类推
                    item.newHours = tempTime.hours()>9?tempTime.hours():'0'+tempTime.hours()
                    item.newMinutes = tempTime.minutes()>9?tempTime.minutes():'0'+tempTime.minutes();
                    item.newSeconds = tempTime.seconds()>9?tempTime.seconds():'0'+tempTime.seconds();
                    item.newShengyuTime = item.newDays+':'+item.newHours+':'+item.newMinutes+':'+item.newSeconds;
                })
                this.setState({
                    groupInfoData:data
                })
            }
        })
    }

    componentDidMount(){
        this.getDefaultAddress();
        this.getGroupInfoDetail();
        let info = this.props.route.params||{};
        let price;
        if(info.type+''==='1'){
            price = info.data.originalPrice;
        }else{
            price = info.data.price;
        }
        this.setState({
            price:price,
            data:info.data,
            type:info.type||null,
            inputValue:info.inputValue||0,
            thumbnail:info.data.thumbnail||'--',
            sumMoney:(parseFloat(price)*parseInt(info.inputValue||0)+parseFloat(this.state.yunfei)).toFixed(2)
        })
        let userInfo = JSON.parse(this.props.userState.getUserInfo);
        this.setState({
            userInfo,
            phone:userInfo.phone||null,
        })
    };

    onSelect=(data)=>{
        ////选择的地址
        let addressDetail={
            name:data.selected.name||'...',
            phone:data.selected.phone||'...',
            address:data.selected.address||'---',
            userAddressId:data.selected.id
        }
        this.setState({
            addressDetail,
            name:data.selected.name||'...',
            phone:data.selected.phone||'...',
            address:data.selected.address||'---',
            userAddressId:data.selected.id
        })
    }

    ////提交订单
    onSubmit=()=>{
        if(this.state.userAddressId+''===''||this.state.userAddressId===null||this.state.userAddressId===undefined){
            Toast.info(`请选择地址`);
            return false;
        }
        this.onSubmitOrder();
    }

    onClose=()=>{
        this.setState({
            visible:false
        })
    }

    onClosePayType=()=>{
        this.setState({
            payTypeVisible:false
        })
    }

    _onSure=(value)=>{
        let data = this.state.payType||[];
        let list = data[0]||[];
        let payTypeName='';
        let payTypeValue='';
        list.map(item=>{
            if(item.value===value[0]){
                payTypeName = item.label;
                payTypeValue = item.value;
            }
        });
        this.setState({
            payTypeName:payTypeName,
            payTypeValue:payTypeValue,
            payTypeVisible:false
        })
    }

    onSubmitOrder=()=>{
        Modal.alert('你确定要购买该商品吗？', this.state.data.name, [
            {
                text: '取消',
                onPress: () => console.log('cancel'),
                style: 'cancel',
            },
            { text: '确定', onPress: () =>{
                    let params={
                        userAddressId:this.state.userAddressId,
                        commodityId: this.state.data.id,
                        commodityNumber:this.state.inputValue,
                    }
                    addPlaceAnOrder(params).then(res=>{
                        if(res && res.code+''===constant.SUCCESS+''){
                            Toast.success('购买成功',0.8);
                            setTimeout(()=>{
                                this.props.navigation.navigate('pendingPaymentOrder',{type:"2"});
                                ///this.props.navigation.navigate('allOrder');
                            },800)
                        }
                    })
                }
            },
        ]);
    }

    onChange=(value)=>{
        this.setState({
            value,
        });
    }


    render(){
        return (
            <View style={{flex:1}}>
                <Headers
                    leftIcon={'left'}
                    leftColor={'#666'}
                    border={true}
                    backgroundColor={'#fff'}
                    title={'确认订单'}
                    centerColor={'#666'}
                    {...this.props}
                />
                <View style={{flex:1,backgroundColor:'#eee'}}>
                    <ScrollView>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.navigate("selectMyAddress",{onSelect:(vm)=>this.onSelect(vm)});
                        }}>
                           <View style={[styles.contentItem,styles.contentItemPadding]}>
                               <View>
                                   <Icon name={'environment'}/>
                               </View>
                               <View style={styles.contentItemCenter}>
                                   <View style={styles.contentItemCenterTop}>
                                       <View>
                                          <Text style={styles.contentItemCenterTopLeft}>收件人</Text>
                                       </View>
                                       <View style={styles.contentItemCenterTopRight}>
                                           <View style={{width:80}}>
                                               <Text numberOfLines={1}>{this.state.addressDetail.name||''}</Text>
                                           </View>
                                           <View style={{flex:1}}>
                                               <Text style={{textAlign:'right'}}>{this.state.addressDetail.phone||''}</Text>
                                           </View>
                                       </View>
                                   </View>
                                   <Text style={styles.contentItemCenterBottom}>{this.state.addressDetail.address||''}</Text>
                               </View>
                               <View>
                                   <Icon name="right" size="md" color="#ccc" />
                               </View>
                           </View>
                        </TouchableOpacity>
                        {this.state.type+''==='1'?null:<View style={styles.faqipintuan}>
                            <TouchableOpacity>
                                {(this.state.groupInfoData.notJoined===undefined||this.state.groupInfoData.notJoined===null)?<Text style={{textAlign:'center',color:'#F23A3A'}}>拼团暂未开启</Text>:<Text style={{textAlign:'center',color:'#F23A3A'}}>发起拼团，还差{this.state.groupInfoData.notJoined||'0'}人完成拼团</Text>}
                            </TouchableOpacity>
                        </View>}
                       <View style={styles.imgbox}>
                            <CachedImage style={{width:30,height:30}} source={require('@/assess/images/merchant/icon_shangp.png')}/>
                            <View>
                                <Text>商品</Text>
                            </View>
                       </View>
                       <View style={[styles.contentItem,styles.contentCenter]}>
                           <View style={styles.ptoductDetail}>
                               <View style={styles.ptoductDetailLeft}>
                                   <CachedImage style={{width:100,height:100}} source={{uri:this.state.thumbnail}}/>
                               </View>
                               <View style={styles.ptoductDetailRight}>
                                    <View style={styles.ptoductDetailRightTop}>
                                        <Text numberOfLines={2} style={styles.ptoductDetailRightTopText}>{this.state.data.name||''}</Text>
                                    </View>
                                   <View style={styles.ptoductDetailRightBottom}>
                                       <View>
                                           <Text style={styles.ptoductDetailRightBottomText}>金币 {Number(this.state.price).toFixed(2)||'0.00'}</Text>
                                       </View>
                                       <View style={styles.ptoductDetailRightBottomRight}>
                                           <Text style={styles.ptoductDetailRightBottomRightText}>数量：{this.state.inputValue||'0'}</Text>
                                       </View>
                                   </View>
                               </View>
                           </View>
                       </View>
                        <View style={styles.ptoductDetailBottom}>
                            <View style={styles.ptoductDetailBottomTop}>
                                <View>
                                    <Text style={styles.ptoductDetailBottomTopLeftText}>配送费</Text>
                                </View>
                                <View style={styles.ptoductDetailBottomTopRight}>
                                    <Text style={styles.ptoductDetailBottomTopRightText}>运费：{parseFloat(this.state.data.freight).toFixed(2)}元</Text>
                                </View>
                            </View>
                            <View style={styles.ptoductDetailBottomBottom}>
                                <Text style={styles.ptoductDetailBottomBottomText}>本店合计商品金额 <Text style={styles.ptoductDetailBottomBottomTextPrice}>{(Number(this.state.price)*parseInt(this.state.inputValue)+parseFloat(this.state.data.freight)).toFixed(2)}</Text>元</Text>
                            </View>
                        </View>
                       <View style={[styles.contentItem,styles.contentCenter,styles.contentBottom]}>
                            <View>
                                <Text>支付方式</Text>
                            </View>
                           <View style={styles.contentBottomRight}>
                                <TouchableOpacity onPress={()=>{
                                    this.setState({
                                        payTypeVisible:true
                                    })
                                }}>
                                    {this.state.payTypeName?<Text style={{textAlign:'right',color:'#444',lineHeight:40}}>{this.state.payTypeName}</Text>:<Text style={{textAlign:'right',color:'#999',lineHeight:40}}>请选择支付方式</Text>}
                                </TouchableOpacity>
                           </View>
                           <View>
                               <Icon name={'right'} size={16} color={'#999'} />
                           </View>
                       </View>
                        {this.state.phone+''===constant.userPHONE+''?null:<View>
                            {this.state.type+''==='1'?null:
                                <View>
                                    {this.state.groupInfoData.map((item,index)=>
                                        <View key={'groupInfoData'+index} style={[{marginTop:12,backgroundColor:'#fff',paddingLeft:12,paddingRight:12}]}>
                                            <View style={styles.contentItemTop}>
                                                <View style={{flex:1}}>
                                                    <Text style={{color:'#FBB724'}}>{item.joined}人正在拼团，可直接参与</Text>
                                                </View>
                                                <View>
                                                    <Text style={{color:'#FBB724'}}>还差{item.notJoined}人拼成</Text>
                                                </View>
                                            </View>
                                            <View style={styles.ptoductDetail}>
                                                <View style={styles.ptoductDetailLeft}>
                                                    <CachedImage style={{width:100,height:100}} source={{uri:this.state.thumbnail}}/>
                                                </View>
                                                <View style={styles.ptoductDetailRight}>
                                                    <View style={styles.ptoductDetailRightTop}>
                                                        <Text numberOfLines={2} style={styles.ptoductDetailRightTopText}>{this.state.data.name||''}</Text>
                                                    </View>
                                                    <View style={styles.ptoductDetailRightFooter}>
                                                        <View style={{flex:1}}>
                                                            <View style={{marginBottom:10}}>
                                                                <Text style={{color:'#999'}}>原价：<Text style={{textDecorationLine:'line-through'}}>金币 {parseFloat(this.state.data['originalPrice']).toFixed(2)||'0.00'}</Text></Text>
                                                            </View>
                                                            <View style={styles.ptoductDetailRightBottom}>
                                                                <Text style={styles.ptoductDetailRightBottomText}>金币 {parseFloat(this.state.data['price']).toFixed(2)||'0.00'}</Text>
                                                            </View>
                                                        </View>
                                                        <View>
                                                            <Text style={styles.pintuanbtn}>去拼团</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={[styles.contentItemTop,{paddingBottom:12}]}>
                                                <View style={{flex:1}}>
                                                    <Text style={{color:'#EB474F'}}>还差{item.notJoined}人完成拼团</Text>
                                                </View>
                                                <View>
                                                    <Text style={{color:'#EB474F'}}>剩余 {item.newShengyuTime}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            }
                        </View>}
                    </ScrollView>
                    <View style={styles.btnBox}>
                        <View style={styles.btnBoxLeft}>
                            <Text style={styles.btnBoxLeftText}>合计金额：￥{(Number(this.state.price)*parseInt(this.state.inputValue)+parseFloat(this.state.data.freight)).toFixed(2)}</Text>
                        </View>
                        <View style={styles.btnBoxRight}>
                            <TouchableOpacity onPress={()=>{
                                this.onSubmit()
                            }}>
                                <Text style={styles.btnBoxRightText}>立即支付</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Modal
                        popup
                        maskClosable={true}
                        visible={this.state.visible}
                        animationType="slide-up"
                        onClose={this.onClose}
                    >
                        <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
                            <View style={styles.modalHeaderBoxTitle}>
                                <Text style={styles.modalHeaderBoxTitleText}>支付密码</Text>
                            </View>
                            <View style={styles.modalHeaderBox}>
                                <View style={styles.contentBoxItemRight}>
                                    <TextInput style={styles.numInput}
                                               onChangeText={(text) => {
                                                   this.setState({dealPassword: text})
                                               }}
                                               secureTextEntry={true}
                                               value={this.state.dealPassword}
                                               placeholder="请输入支付密码"  placeholderTextColor={'#999'}/>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text onPress={()=>{this.onSubmitOrder()}} style={styles.submitBtn}>确定</Text>
                        </View>
                    </Modal>
                    <ModalPicker
                        dataSource={this.state.payType}
                        payTypeIndex={this.state.payTypeIndex}
                        onClose={this.onClosePayType}
                        onSure={this._onSure}
                        visible={this.state.payTypeVisible}
                    />
                </View>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    btnBox:{
        flexDirection:'row',
        alignItems:'center',
        height:50,
        backgroundColor:'#fff'
    },
    btnBoxLeft:{
        flex:1,
        paddingLeft:12
    },
    btnBoxRight:{
        width:144,
        backgroundColor:'#d71e31',
        height:50,
    },
    btnBoxRightText:{
        lineHeight:50,
        color:'#fff',
        textAlign:'center',
        fontSize:16,
        fontWeight:'600'
    },
    contentItem:{
        paddingLeft:12,
        paddingRight:12,
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:'center'
    },
    contentItemCenter:{
        flex:1,
        paddingLeft:12,
        paddingRight:12
    },
    contentItemCenterTop:{
        fontSize:15,
        flexDirection:'row'
    },
    contentItemCenterBottom:{
        fontSize:16,
        marginTop:15,
        color:'#999'
    },
    contentItemCenterTopLeft:{
        marginRight:60
    },
    contentCenter:{

    },
    ptoductDetail:{
        flexDirection:'row',
        alignItems:'stretch',
        paddingTop:12,
    },
    ptoductDetailLeft:{
        width:100,
        height:100,
        backgroundColor:'#eee',
        borderRadius:5
    },
    ptoductDetailRight:{
        flex:1,
        flexDirection:'column',
        paddingLeft:12
    },
    ptoductDetailRightTop:{
        flex:1,
    },
    ptoductDetailRightTopText:{
        lineHeight:24
    },
    ptoductDetailRightBottom:{
        flexDirection:'row',
    },
    ptoductDetailRightBottomRight:{
        flex:1,
    },
    ptoductDetailRightBottomRightText:{
        textAlign:'right'
    },
    ptoductDetailRightBottomText:{
        color:'#d71e31',
        fontSize:16,
        fontWeight:'600'
    },
    ptoductDetailBottom:{
        padding:12,
        backgroundColor:'#fff',
    },
    ptoductDetailBottomTop:{
        flexDirection:'row',
        alignItems:'center'
    },
    ptoductDetailBottomTopRight:{
        flex:1
    },
    ptoductDetailBottomTopRightText:{
        textAlign:'right'
    },
    ptoductDetailBottomBottom:{

    },
    ptoductDetailBottomBottomText:{
        textAlign:'right',
        marginTop:20
    },
    ptoductDetailBottomTopLeftText:{
        color:'#999'
    },
    ptoductDetailBottomBottomTextPrice:{
        color:'#d71e31',
    },
    contentBottom:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:12,
        paddingTop:15,
        paddingBottom:15
    },
    contentBottomRight:{
        flex:1,
    },
    contentBottomRightText:{
        textAlign:'right'
    },
    btnBoxLeftText:{
        fontSize:16,
        fontWeight:'600'
    },
    imgbox:{
        backgroundColor:'#fff',
        marginTop:12,
        paddingLeft:6,
        paddingRight:12,
        paddingTop:12,
        flexDirection:'row',
        alignItems:'center'
    },
    contentItemPadding:{
        paddingTop:12,
        paddingBottom:12
    },
    submitBtn:{
        backgroundColor:'#d71e31',
        color:'#fff',
        height:49,
        lineHeight:49,
        textAlign:'center',
        fontSize:16
    },
    numInput:{
        color:'#666',
        height:44,
        fontSize:14,
        textAlign:'right'
    },
    modalHeaderBox:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:30,
        marginTop:30,
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#eee',
        paddingLeft:12,
        paddingRight:12
    },
    modalHeaderBoxTitle:{
        paddingTop:12,
        paddingBottom:12
    },
    modalHeaderBoxTitleText:{
        textAlign:'center'
    },
    contentBoxItemRight:{
        flex:1,
    },
    faqipintuan:{
        backgroundColor:'#fff',
        marginTop:12,
        marginLeft:12,
        marginRight:12,
        padding:24
    },
    contentItemTop:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:15
    },
    ptoductDetailRightFooter:{
        flexDirection:'row',
        alignItems:'center',
    },
    pintuanbtn:{
        backgroundColor:'#d71e31',
        color:'#fff',
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:20,
        paddingRight:20,
        borderRadius:5,
        overflow:'hidden'
    },
    contentItemCenterTopRight:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
    }
})

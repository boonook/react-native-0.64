import React from "react";
import {View, Text, ScrollView, StyleSheet, StatusBar, TouchableOpacity, TextInput} from 'react-native';
import {Icon} from '@ant-design/react-native';
import {CachedImage,CachedImageBackground} from 'react-native-img-cache'
import Headers from "@/Components/header/Headers";
import {inject, observer} from "mobx-react";
import constant from "@/utils/constant";
import {myWallet} from '@/Api/meApi'

// @ts-ignore
@inject(["userState"]) // 注入对应的store
@observer // 监听当前组件
export default class MeScreen extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            name:null,
            phone:null,
            userInfo:{},
            balances:[]
        };
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor('#fff')
        });
        let userInfo = JSON.parse(this.props.userState.getUserInfo);
        this.setState({
            userInfo,
            name:userInfo.NAME||null,
            phone:userInfo.phone||null,
        })
        this.getMyWallet();
    }

    getMyWallet=()=>{
        myWallet({}).then(res=>{
            if(res && res.code+''===constant.SUCCESS+''){
                let data = res.data||[];
                data.map((item,index)=>{
                    if(index===0){
                        item.title = '总收益'
                    }
                    if(index===1){
                        item.title = '余额'
                    }
                    if(index===2){
                        item.title = '余额'
                    }
                })
                this.setState({
                    balances:data
                })
            }
        })
    }

    openDrawer=()=>{
        this.props.navigation.toggleDrawer()
    }
    onGoMySettingPage=()=>{
        this.props.navigation.navigate('mySetting');
    }

    _onClickRightBtn=()=>{
        this.props.navigation.navigate('mySetting');
    }

    render() {
        return(
            <View style={{ flex: 1,backgroundColor:"#f8f8f8"}}>
                <Headers
                    backgroundColor={'#fff'}
                    centerContent={<Text style={[styles.headerBoxCenterText,{color:'#666'}]} numberOfLines={1}>{'我的'}</Text>}
                    rightColor={'#fff'}
                    border={true}
                    rightIcon={'setting'}
                    onClickRightBtn={()=>this._onClickRightBtn()}
                    {...this.props}
                />
                <ScrollView>
                    <View style={styles.contentHeader}>
                        <CachedImageBackground  style={{width:'100%',height:260}}  source={require('@/assess/images/me/wode_bg.png')}>
                            <View style={styles.contentHeaderContent}>
                                <View style={styles.contentHeaderContentLeft}>
                                    <CachedImage style={{width:100,height:100}} source={require('@/assess/images/me/author.png')}/>
                                </View>
                                <View style={styles.contentHeaderContentCenter}>
                                   <View>
                                       <Text style={styles.contentHeaderContentCenterNameText}>{this.state.name||'---'}</Text>
                                   </View>
                                    <View>
                                        <Text  style={styles.contentHeaderContentCenterPhoneText}>{this.state.phone||null}</Text>
                                    </View>
                                </View>
                                {this.state.phone+''===constant.userPHONE+''?null:<View>
                                    <TouchableOpacity onPress={()=>{
                                        this.props.navigation.navigate('signCenter');
                                    }}>
                                        <Text style={styles.sign}>签到</Text>
                                    </TouchableOpacity>
                                </View>}
                            </View>
                        </CachedImageBackground>
                       <View style={styles.contentHeaderInputBg}>
                           <CachedImageBackground  style={{width:'100%',height:120}}  source={require('@/assess/images/me/juxing.png')}/>
                       </View>
                    </View>
                    <View style={[styles.cardBox,styles.cardBoxFirst,{marginTop:-45}]}>
                        {this.state.phone+''===constant.userPHONE+''?null:<View style={styles.cardBoxHeader}>
                            <View style={styles.cardBoxHeaderLeft}>
                                <Text>我的订单</Text>
                            </View>
                            <TouchableOpacity  onPress={()=>{
                                this.props.navigation.navigate('allOrder');
                            }}>
                                <View style={styles.cardBoxHeaderRight}>
                                    <View>
                                        <Text style={{color:'#999'}}>查看全部订单</Text>
                                    </View>
                                    <View>
                                        <Icon name={'right'} size={16} color={'#999'} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>}
                        <View style={styles.cardBoxBody}>
                            {/*<View style={styles.cardBoxBodyItem}>*/}
                            {/*   <TouchableOpacity  onPress={()=>{*/}
                            {/*       this.props.navigation.navigate('pendingPaymentOrder',{type:"1"});*/}
                            {/*   }}>*/}
                            {/*      <View style={styles.cardBoxBodyItemBox}>*/}
                            {/*          <View style={styles.cardBoxBodyItemImg}>*/}
                            {/*              <CachedImage style={styles.filePathImg} source={require('@/assess/images/me/wd_icon_dindan01.png')}/>*/}
                            {/*          </View>*/}
                            {/*          <View>*/}
                            {/*              <Text>待付款</Text>*/}
                            {/*          </View>*/}
                            {/*      </View>*/}
                            {/*   </TouchableOpacity>*/}
                            {/*</View>*/}
                            <View style={styles.cardBoxBodyItem}>
                                <TouchableOpacity  onPress={()=>{
                                    this.props.navigation.navigate('pendingPaymentOrder',{type:"2"});
                                }}>
                                    <View style={styles.cardBoxBodyItemBox}>
                                        <View style={styles.cardBoxBodyItemImg}>
                                            <CachedImage style={styles.filePathImg} source={require('@/assess/images/me/wd_icon_dindan02.png')}/>
                                        </View>
                                        <Text>待发货</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.cardBoxBodyItem}>
                                <TouchableOpacity  onPress={()=>{
                                    this.props.navigation.navigate('pendingPaymentOrder',{type:"3"});
                                }}>
                                    <View style={styles.cardBoxBodyItemBox}>
                                        <View style={styles.cardBoxBodyItemImg}>
                                            <CachedImage style={styles.filePathImg} source={require('@/assess/images/me/wd_icon_dindan03.png')}/>
                                        </View>
                                        <Text>已发货</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.cardBoxBodyItem}>
                                <TouchableOpacity  onPress={()=>{
                                    this.props.navigation.navigate('pendingPaymentOrder',{type:"4"});
                                }}>
                                    <View style={styles.cardBoxBodyItemBox}>
                                        <View style={styles.cardBoxBodyItemImg}>
                                            <CachedImage style={styles.filePathImg} source={require('@/assess/images/me/wd_icon_dindan04.png')}/>
                                        </View>
                                        <Text>已完成</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {this.state.phone+''===constant.userPHONE+''?null:<View style={styles.cardBox}>
                        <View style={styles.cardBoxHeader}>
                            <View style={styles.cardBoxHeaderLeft}>
                                <Text>我的收益</Text>
                            </View>
                        </View>
                        <View style={styles.cardBoxBodyTwo}>
                            {this.state.balances.map((item,index)=>{
                                return (
                                    <View key={index+'balances'} style={styles.cardBoxBodyTwoItem}>
                                        <View style={styles.cardBoxBodyItemImg}>
                                            <Text numberOfLines={1} style={styles.cardBoxBodyItemImgText}>{item.balance||'0.00'}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.cardBoxBodyItemSum}>{item.title||'--'}</Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </View>}
                    <View style={styles.cardBox}>
                        <View style={styles.cardBoxHeader}>
                            <View style={styles.cardBoxHeaderLeft}>
                                <Text>必备工具</Text>
                            </View>
                        </View>
                        <View style={styles.cardBoxBody}>
                            {this.state.phone+''===constant.userPHONE+''?null:<View style={styles.cardBoxBodyItem}>
                               <TouchableOpacity onPress={()=>{
                                   this.props.navigation.navigate('myTeam');
                               }}>
                                   <View style={styles.cardBoxBodyItemImgBox}>
                                      <View style={styles.cardBoxBodyItemImg}>
                                          <CachedImage style={styles.filePathImg} source={require('@/assess/images/me/wd_icon_gj01.png')}/>
                                      </View>
                                      <View>
                                          <Text>我的团队</Text>
                                      </View>
                                  </View>
                               </TouchableOpacity>
                            </View>}
                            {this.state.phone+''===constant.userPHONE+''?null:<View style={styles.cardBoxBodyItem}>
                                <TouchableOpacity onPress={()=>{
                                    this.props.navigation.navigate('sharePromotion');
                                }}>
                                    <View style={styles.cardBoxBodyItemImgBox}>
                                        <View style={styles.cardBoxBodyItemImg}>
                                            <CachedImage style={styles.filePathImg} source={require('@/assess/images/me/wd_icon_gj02.png')}/>
                                        </View>
                                        <Text>邀请好友</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>}
                            {this.state.phone+''===constant.userPHONE+''?null:<View style={styles.cardBoxBodyItem}>
                                <TouchableOpacity onPress={()=>{
                                    this.props.navigation.navigate('myCollectCenter');
                                }}>
                                    <View style={styles.cardBoxBodyItemImgBox}>
                                        <View style={styles.cardBoxBodyItemImg}>
                                            <CachedImage style={styles.filePathImg} source={require('@/assess/images/me/wd_icon_gj03.png')}/>
                                        </View>
                                        <Text>收藏中心</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>}
                            {this.state.phone+''===constant.userPHONE+''?null:<View style={styles.cardBoxBodyItem}>
                                <TouchableOpacity onPress={()=>{
                                    this.props.navigation.navigate('myJoinGroup');
                                }}>
                                    <View style={styles.cardBoxBodyItemImgBox}>
                                        <View style={styles.cardBoxBodyItemImg}>
                                            <CachedImage style={styles.filePathImg} source={require('@/assess/images/me/wd_icon_gj04.png')}/>
                                        </View>
                                        <Text>我的拼团</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>}
                            {this.state.phone+''===constant.userPHONE+''?null:<View style={styles.cardBoxBodyItem}>
                                <TouchableOpacity onPress={()=>{
                                    this.props.navigation.navigate('safetySetting');
                                }}>
                                    <View style={styles.cardBoxBodyItemImgBox}>
                                        <View style={styles.cardBoxBodyItemImg}>
                                            <CachedImage style={styles.filePathImg} source={require('@/assess/images/me/wd_icon_gj05.png')}/>
                                        </View>
                                        <Text>安全中心</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>}
                            {this.state.phone+''===constant.userPHONE+''?null:<View style={styles.cardBoxBodyItem}>
                                <TouchableOpacity onPress={()=>{
                                    this.props.navigation.navigate('bankCardList');
                                }}>
                                    <View style={styles.cardBoxBodyItemImgBox}>
                                        <View style={styles.cardBoxBodyItemImg}>
                                            <CachedImage style={styles.filePathImg} source={require('@/assess/images/me/wd_icon_gj06.png')}/>
                                        </View>
                                        <Text>银行卡</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>}
                            <View style={styles.cardBoxBodyItem}>
                                <TouchableOpacity onPress={()=>{
                                    this.props.navigation.navigate('myAddress');
                                }}>
                                    <View style={styles.cardBoxBodyItemImgBox}>
                                        <View style={styles.cardBoxBodyItemImg}>
                                            <CachedImage style={styles.filePathImg} source={require('@/assess/images/me/wd_icon_gj07.png')}/>
                                        </View>
                                        <Text>收货地址</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.cardBoxBodyItem}>
                                <TouchableOpacity onPress={()=>this.onGoMySettingPage()}>
                                    <View style={styles.cardBoxBodyItemImgBox}>
                                       <View style={styles.cardBoxBodyItemImg}>
                                           <CachedImage style={styles.filePathImg} source={require('@/assess/images/me/wd_icon_gj08.png')}/>
                                       </View>
                                       <Text>设置中心</Text>
                                   </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/*<Text>MeScreen Screen</Text>*/}
                    {/*<Button onPress={()=>this.openDrawer()}>打开抽屉</Button>*/}
                    {/*<Button onPress={()=>this.onGoMySettingPage()}>我的设置</Button>*/}
                    {/*<ImagePicker {...this.props}/>*/}
                    {/*<ChildrenSolt renderContent={<View><Text>123123123123123</Text></View>}/>*/}
                    {/*<Button onPress={()=>this.openDrawer()}>打开抽屉</Button>*/}
                    {/*<Button onPress={()=>this.onGoMySettingPage()}>我的设置</Button>*/}
                    {/*<Button onPress={()=>this.onGoVerificationCodeInputPage()}>验证码</Button>*/}
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    leftContent:{
        flexDirection:'row'
    },
    leftContentTitle:{
        color:'#fff',
        paddingLeft:5
    },
    headerBoxCenterText:{
        textAlign:'center',
        fontWeight:'600',
        fontSize:16
    },
    cardBox:{
        backgroundColor:'#fff',
        padding:10,
        marginTop:10,
        marginLeft:10,
        marginRight:10
    },
    cardBoxHeader:{
        flexDirection:'row',
        alignItems:"center"
    },
    cardBoxHeaderLeft:{
        flex:1
    },
    cardBoxBodyTwo:{
        flexDirection:'row',
        alignItems:"center",
        flexWrap:'wrap'
    },
    cardBoxBody:{
        flexDirection:'row',
        alignItems:"center",
        flexWrap:'wrap'
    },
    cardBoxBodyTwoItem:{
        marginTop:30,
        textAlign:'center',
        flexDirection:'column',
        alignItems:"center",
        flex:1
    },
    cardBoxBodyItem:{
        marginTop:30,
        width:'33.3%'
    },
    filePathImg:{
        width:30,
        height:30
    },
    cardBoxBodyItemImg:{
        marginBottom:10
    },
    cardBoxBodyItemImgText:{
        fontSize:20
    },
    cardBoxBodyItemSum:{
        color:"#999"
    },
    contentHeader:{
        position:'relative'
    },
    cardBoxFirst:{
        position:'relative',
        zIndex:2,
        elevation:2
    },
    contentHeaderInputBg:{
        position:'absolute',
        zIndex:1,
        width:'100%',
        bottom:-30,
        elevation:1
    },
    contentHeaderContent:{
        height:260,
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        marginTop:-30
    },
    contentHeaderContentLeft:{
        width:100,
        height:100,
        backgroundColor:'#eee',
        borderRadius:50
    },
    contentHeaderContentCenter:{
        flex:1,
        marginLeft:10,
        marginRight:10
    },
    contentHeaderContentCenterNameText:{
        color:'#fff',
        fontSize:18,
        marginBottom:10,
        fontWeight:'700'
    },
    contentHeaderContentCenterPhoneText:{
        color:'#fff',
        fontSize:12,
    },
    sign:{
        backgroundColor:'rgba(255,255,255,0.4)',
        color:'#fff',
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
        borderRadius:5,
        overflow:'hidden'
    },
    cardBoxBodyItemImgBox:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    cardBoxHeaderRight:{
        flexDirection:'row',
        alignItems:'center'
    },
    cardBoxBodyItemBox:{
        flexDirection:'column',
        alignItems:'center',
    }
})

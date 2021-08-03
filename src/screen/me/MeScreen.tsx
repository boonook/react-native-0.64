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
                    <View style={styles.cardBox}>
                        <View style={styles.cardBoxBody}>
                            <View style={styles.cardBoxBodyItem}>
                                <TouchableOpacity onPress={()=>this.onGoMySettingPage()}>
                                    <View style={styles.cardBoxBodyItemImgBox}>
                                        <View style={styles.cardBoxBodyItemImg}>
                                            <CachedImage style={styles.filePathImg} source={require('@/assess/images/me/wd_icon_gj08.png')}/>
                                        </View>
                                        <Text>短视频</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.cardBox}>
                        <View style={styles.cardBoxBody}>
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

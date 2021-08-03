import React, { useState,useEffect } from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image, StatusBar} from 'react-native';
import Headers from "@/Components/header/Headers";
import {Icon,ActionSheet} from '@ant-design/react-native';
import NavigationService from '@/utils/NavigationService'
import {inject, observer} from "mobx-react";
import constant from "@/utils/constant";

// @ts-ignore
@inject(["userState"]) // 注入对应的store
@observer // 监听当前组件
export default class MySettingScreen extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor('#fff')
        });
    }
    onLoginOut=()=>{
        const BUTTONS = [
            '确定',
            '取消',
        ];
        ActionSheet.showActionSheetWithOptions(
            {
                title: '你确定要退出登陆吗？',
                message: '退出后用户信息缓存将被清除',
                options: BUTTONS,
                cancelButtonIndex: 4,
                destructiveButtonIndex:0,
            },
            buttonIndex => {
                if(buttonIndex+''==='0'){
                    this.props.userState.loginOut();
                }
            }
        );
    }
    render() {
        return(
            <View style={styles.container}>
                <Headers
                    backgroundColor={'#fff'}
                    title={'设置'}
                    centerColor={'#666'}
                    leftColor={'#666'}
                    leftTitle={'返回'}
                    leftIcon={'left'}
                    {...this.props}
                />
                <View style={styles.contentBox}>
                    <View style={styles.contentBoxTop}>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.navigate("editLoginPwd");
                        }}>
                            <View style={styles.footer}>
                                <View style={styles.footerLeft}>
                                    <Text>修改登陆密码</Text>
                                </View>
                                <Icon name="right" size="md" color="#ccc" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.navigate("editPayPwd");
                        }}>
                            <View style={styles.footer}>
                                <View style={styles.footerLeft}>
                                    <Text>修改支付密码</Text>
                                </View>
                                <Icon name="right" size="md" color="#ccc" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.loginOutBtn}>
                        <TouchableOpacity onPress={()=>this.onLoginOut()}>
                            <Text style={styles.loginOutBtnText}>退出登录</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#eee',
        flexDirection:'column'
    },
    footer:{
        flexDirection:'row',
        paddingTop:15,
        paddingBottom:15,
        borderBottomColor:'#eee',
        borderStyle:'solid',
        borderBottomWidth:1,
        alignItems:'center',
        backgroundColor:'#fff',
        paddingLeft:12,
        paddingRight:12,
        borderRadius:5
    },
    footerLeft:{
        flex:1,
        marginLeft:10
    },
    footerImg:{
        width:24,
        height:24
    },
    contentBox:{
        flex:1,
        paddingLeft:12,
        paddingRight:12
    },
    loginOutBtn:{
        width:'100%',
        backgroundColor:"#fff",
        height:50,
        marginTop:20,
        borderRadius:5
    },
    loginOutBtnText:{
        lineHeight:50,
        textAlign:'center'
    },
    contentBoxTop:{
        marginTop:20
    }
})

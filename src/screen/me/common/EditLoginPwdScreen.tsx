import React, { useState,useEffect } from "react";
import { View,Text,StyleSheet,TextInput,StatusBar,Dimensions} from 'react-native';
import theme from '@/theme/theme.js'
import { colors } from '@/assess/styles';
import Headers from "@/Components/header/Headers";
import {Toast,Icon} from '@ant-design/react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TouchableOpacity} from "react-native-gesture-handler";
import {getForgetPwdCode,resetPassword} from "@/Api/login";
import constant from "@/utils/constant";

const {height,width} =  Dimensions.get('window');
const EditLoginPwdScreen = (props) => {
    /****密码是否可见start****/
    const [settingLoginPwdStatus,setSettingLoginPwdStatus] = useState(true);
    const [querenLoginPwdStatus,setQuerenLoginPwdStatus] = useState(true);
    const [settingPayPwdStatus,setSettingPayPwdStatus] = useState(true);
    const [querenPayPwdStatus,setQuerenPayPwdStatus] = useState(true);
    /****密码是否可见end****/
    const [code,setCode] = useState(null);
    const [timer,setTimer] = useState(59);
    const [phone,setPhone] = useState(null);
    const [codeTitle,setCodeTitle] = useState('获取验证码')
    const [loginPassword,setLoginPassword] = useState(null);
    const [againLoginPassword,setAgainLoginPassword] = useState(null);

    const [userName,setUserName] = useState('boonook22');
    const [userPwd,setUserPwd] = useState('boonook')

    useEffect(() => {
        props.navigation.addListener('focus', () => {
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor('#fff')
        });
    })

    function onSetSettingLoginPwdStatus() {
        setSettingLoginPwdStatus(!settingLoginPwdStatus)
    }

    function onSetQuerenLoginPwdStatus() {
        setQuerenLoginPwdStatus(!querenLoginPwdStatus)
    }

    function onSetSettingPayPwdStatus() {
        setSettingPayPwdStatus(!settingPayPwdStatus)
    }

    function onSetQuerenPayPwdStatus() {
        setQuerenPayPwdStatus(!querenPayPwdStatus)
    }

    function onSureAndLogin() {
        if(phone+''==='' || phone===null||phone===undefined){
            Toast.fail('用户名不能为空！',0.8);
            return false;
        }else{
            if (!(/^1[3456789]\d{9}$/.test(phone))) {
                Toast.info(`手机号码有误`);
                return false;
            }
        }

        if(code + '' === '' || code === null){
            Toast.info(`短信验证码不能为空`);
            return false;
        }else{
            if(code.length<4){
                Toast.info(`短信验证码为四位或六位`);
                return false;
            }
        }

        if(loginPassword+''==='' || loginPassword===null||loginPassword===undefined){
            Toast.fail('登陆密码不能为空！',0.8);
            return false;
        }else{
            let reg = /^(?![^a-zA-Z]+$)(?!\D+$).{6,12}/;
            if(!reg.test(userName)){
                Toast.fail('登陆密码必须有数字和字母构成，且最小6位最大12位！',0.8);
                return false;
            }
        }

        if(againLoginPassword+''==='' || againLoginPassword === null){
            Toast.info(`确认登陆密码不能为空`);
            return false;
        }else{
            if(loginPassword+''!==againLoginPassword+''){
                Toast.info(`两次登陆密码不一致`);
                return false;
            }
        }

        let params={
            "phone":phone,
            "code": code,
            "loginPassword":loginPassword
        }

        resetPassword(params).then(res=>{
            if(res && res.code+''===constant.SUCCESS+''){
                Toast.success('修改成功',0.8);
                setTimeout(()=>{
                    props.navigation.push('login')
                },800)
            }
        })
    }

    function _onGetCode(){
        let params={
            phone
        }
        // @ts-ignore
        getForgetPwdCode(params).then(res=>{
            if(res && res.code+''===constant.SUCCESS+''){
                Toast.success(`验证码发送成功`);
            }
        })
    }

    function _onGetCodeBtn() {
        let time = timer;
        if (phone + '' === '' || phone === null) {
            Toast.info(`手机号不能为空`);
            return false;
        } else {
            if(timer===59){
                if (!(/^1[3456789]\d{9}$/.test(phone))) {
                    Toast.info(`手机号码有误`);
                    return false;
                }else{
                    _onGetCode();
                    let timeOut = setInterval(()=>{
                        if(time===0){
                            setTimer(59);
                            clearInterval(timeOut)
                            setCodeTitle('获取验证码');
                        }else{
                            time = time-1
                            setTimer(time);
                            setCodeTitle(`${time}s后重新获取`);
                        }
                    },1000)
                }
            }else{
                return false;
            }
        }
    }

    return(
        <View>
            <KeyboardAwareScrollView>
                <View style={{ height:height,width:width,flexDirection:'column',backgroundColor:'#fff'}}>
                    <Headers
                        leftIcon={'left'}
                        border={true}
                        leftColor={'#444'}
                        backgroundColor={'#fff'}
                        centerContent={<Text style={[styles.headerBoxCenterText,{color:'#444'}]} numberOfLines={1}>{'修改登陆密码'}</Text>}
                        {...props}
                    />
                    <View style={styles.formContent}>
                        <View style={[styles.formItem,{marginTop:20}]}>
                            <View style={styles.formItemLeft}>
                                <Text style={styles.formItemLeftText}>手机号</Text>
                            </View>
                            <View style={styles.formItemRight}>
                                <TextInput value={phone} onChange={value =>{
                                    const newText = value.nativeEvent.text.replace(/[^\d]+/, '');
                                    setPhone(newText);
                                }} placeholder="请输入手机号" style={styles.formItemRightText}/>
                            </View>
                        </View>
                        <View style={[styles.formItem,{marginTop:20}]}>
                            <View style={styles.formItemLeft}>
                                <Text style={styles.formItemLeftText}>登陆密码</Text>
                            </View>
                            <View style={styles.formItemRight}>
                                <TextInput value={loginPassword} onChange={value =>{
                                    setLoginPassword(value.nativeEvent.text)
                                }} placeholder="请输入登陆密码" secureTextEntry={settingLoginPwdStatus} style={styles.formItemRightText}/>
                            </View>
                            <TouchableOpacity onPress={onSetSettingLoginPwdStatus}>
                                {settingLoginPwdStatus?<Icon name="eye" size="md" color="#666" />:<Icon name="eye-invisible" size="md" color="#666" />}
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.formItem,{marginTop:20}]}>
                            <View style={styles.formItemLeft}>
                                <Text style={styles.formItemLeftText}>确定登陆密码</Text>
                            </View>
                            <View style={styles.formItemRight}>
                                <TextInput value={againLoginPassword} onChange={value =>{
                                    setAgainLoginPassword(value.nativeEvent.text)
                                }} placeholder="请输入登陆密码" secureTextEntry={querenLoginPwdStatus} style={styles.formItemRightText}/>
                            </View>
                            <TouchableOpacity onPress={onSetQuerenLoginPwdStatus}>
                                {querenLoginPwdStatus?<Icon name="eye" size="md" color="#666" />:<Icon name="eye-invisible" size="md" color="#666" />}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.loginBtn}>
                        <TouchableOpacity onPress={onSureAndLogin}>
                            <View style={{backgroundColor:colors.primary,borderRadius:5}}>
                                <Text style={styles.loginBtnText}>确认修改登陆密码</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
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
    formContent:{
        flex:1,
        paddingLeft:24,
        paddingRight:24,
    },
    formContentTop:{
        backgroundColor:theme.backgroundColor,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:30,
        paddingBottom:30
    },
    formContentTopLogoBox:{
        width:80,
        height:80,
        backgroundColor:'#fff',
        borderRadius:40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    formContentTopTitle:{
        paddingTop:30,
        color:'#fff',
        fontSize:16
    },
    formContentCenter:{
        flex:1,
        paddingLeft:24,
        paddingRight:24,
    },
    formItem:{
        backgroundColor:'#eee',
        flexDirection:'row',
        alignItems:'center',
        height:50,
        lineHeight:50,
        paddingLeft:12,
        paddingRight:12,
        borderRadius:5
    },
    IconImage:{
        width:34,
        height:34
    },
    formItemRight:{
        flex:1
    },
    formItemRightText:{
        paddingLeft:12
    },
    loginBtn:{
        width:'100%',
        height:50,
        marginTop:20,
        borderRadius:5,
        marginBottom:30,
        paddingLeft:24,
        paddingRight:24,
    },
    forgetBox:{
        width:'100%',
        marginTop:20,
    },
    zhuCeBox:{
        width:'100%',
        marginTop:20,
    },
    zhuCeBoxText:{
        textAlign:'center',
        color:'#666'
    },
    loginBtnText:{
        color:'#fff',
        lineHeight:50,
        textAlign:'center',
        fontSize:16
    },
    forgetBoxText:{
        textAlign:'right',
        color:'#666'
    },
    zhuCeBoxBtnText:{
        color:theme.backgroundColor
    },
    textArexx:{
        backgroundColor:'#eee',
        paddingLeft:12,
        paddingRight:12,
        paddingTop:12,
        paddingBottom:12,
        marginTop:20,
        borderRadius:5
    },
    textArexxInput:{
        marginTop:12
    },
    formItemLeft:{
        width:100
    },
    formItemLeftText:{
        color:'#666'
    },
    getCodeBtn:{
        marginLeft:15
    }
})


export default EditLoginPwdScreen;

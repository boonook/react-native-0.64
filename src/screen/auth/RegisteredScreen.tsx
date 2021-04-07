import React, { useState,useEffect } from "react";
import { View,Text,StyleSheet,TextInput,StatusBar,Dimensions} from 'react-native';
import theme from '@/theme/theme.js'
import Headers from "@/Components/header/Headers";
import {Icon, Toast, Checkbox} from '@ant-design/react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TouchableOpacity} from "react-native-gesture-handler";
import {getCode,registered} from '@/Api/login'
import constant from "@/utils/constant";
const {height,width} =  Dimensions.get('window');
const RegisteredScreen = (props) => {
    /****密码是否可见start****/
    const [settingLoginPwdStatus,setSettingLoginPwdStatus] = useState(true);
    const [querenLoginPwdStatus,setQuerenLoginPwdStatus] = useState(true);
    const [settingPayPwdStatus,setSettingPayPwdStatus] = useState(true);
    const [querenPayPwdStatus,setQuerenPayPwdStatus] = useState(true);
    const [checkBox,setCheckBox] = useState(false);
    /****密码是否可见end****/
    const [timer,setTimer] = useState(59);
    const [phone,setPhone] = useState(null);
    const [code,setCode] = useState(null);
    const [loginPassword,setLoginPassword] = useState(null);
    const [againLoginPassword,setAgainLoginPassword] = useState(null);
    const [dealPassword,setDealPassword] = useState(null);
    const [againDealPassword,setAgainDealPassword] = useState(null);
    const [invitationCode,setInvitationCode] = useState(null);
    const [codeTitle,setCodeTitle] = useState('获取验证码')

    useEffect(() => {
        props.navigation.addListener('focus', () => {
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor('#fff')
        });
    })

    function onRegistered() {
        if (phone + '' === '' || phone === null) {
            Toast.info(`手机号不能为空`);
            return false;
        } else {
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
        if(loginPassword+''==='' || loginPassword === null){
            Toast.info(`登陆密码不能为空`);
            return false;
        }else{
            let reg = /^(?![^a-zA-Z]+$)(?!\D+$).{6,12}/;
            if(!reg.test(loginPassword)){
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
        if(dealPassword+''==='' || dealPassword === null){
            Toast.info(`支付密码不能为空`);
            return false;
        }else{
            if(dealPassword.length<6){
                Toast.info(`支付密码不能小于6位`);
                return false;
            }
        }
        if(againDealPassword+''==='' || againDealPassword === null){
            Toast.info(`确认支付密码不能为空`);
            return false;
        }else{
            if(dealPassword!==againDealPassword){
                Toast.info(`两次支付密码不一致`);
                return false;
            }
        }
        if(invitationCode+''==='' || invitationCode === null){
            Toast.info(`邀请码不能为空`);
            return false;
        }else{
            if(invitationCode.length<4){
                Toast.info(`邀请码长度不小于4`);
                return false;
            }
        }
        if(checkBox){
            let params={
                "phone": phone,
                "code": code,
                "dealPassword": dealPassword,
                "loginPassword": loginPassword,
                "invitationCode": invitationCode
            }
            registered(params).then(res=>{
                if(res && res.code+''===constant.SUCCESS+''){
                    Toast.success('注册成功',0.8);
                    setTimeout(()=>{
                        props.navigation.push('login')
                    },800)
                }
            })
        }else{
            Toast.info(`请先至系阅读用户协议`);
            return false;
        }
    }

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

    function _onGetCode(){
        let params={
            phone
        }
        // @ts-ignore
        getCode(params).then(res=>{
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

    function onViewRelut(){
        props.navigation.push('disclaimer')
    }

    // @ts-ignore
    return(
        <View>
            <View style={{ height:height,width:width,flexDirection:'column',backgroundColor:'#fff'}}>
                <Headers
                    leftIcon={'left'}
                    leftColor={'#444'}
                    backgroundColor={'#fff'}
                    border
                    centerContent={<Text style={[styles.headerBoxCenterText,{color:'#444'}]} numberOfLines={1}>{'新用户注册'}</Text>}
                    {...props}
                />
                <View style={styles.formContent}>
                    <KeyboardAwareScrollView style={{paddingLeft:12,paddingRight:12}}>
                        <View style={[styles.formItem,{marginTop:20}]}>
                            <View style={styles.formItemLeft}>
                                <Text style={styles.formItemLeftText}>手机号</Text>
                            </View>
                            <View style={styles.formItemRight}>
                                <TextInput
                                    value={phone}
                                    onChange={value =>{
                                        const newText = value.nativeEvent.text.replace(/[^\d]+/, '');
                                        setPhone(newText);
                                    }}
                                   placeholder="请输入手机号"
                                   keyboardType='numeric'
                                   style={styles.formItemRightText}
                                />
                            </View>
                        </View>
                        <View style={[styles.formItem,{marginTop:20}]}>
                            <View style={styles.formItemLeft}>
                                <Text style={styles.formItemLeftText}>验证码</Text>
                            </View>
                            <View style={styles.formItemRight}>
                                <TextInput value={code} onChange={value =>{
                                    const newText = value.nativeEvent.text.replace(/[^\d]+/, '');
                                    setCode(newText)
                                    }} placeholder="请输入验证码" keyboardType='numeric' style={styles.formItemRightText}
                                />
                            </View>
                            <View style={styles.getCodeBtn}>
                                <Text onPress={_onGetCodeBtn}>{codeTitle}</Text>
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
                        <View style={[styles.formItem,{marginTop:20}]}>
                            <View style={styles.formItemLeft}>
                                <Text style={styles.formItemLeftText}>设置交易密码</Text>
                            </View>
                            <View style={styles.formItemRight}>
                                <TextInput value={dealPassword} onChange={value =>{
                                    const newText = value.nativeEvent.text.replace(/[^\d]+/, '');
                                    setDealPassword(newText)
                                }} placeholder="请输入交易密码" keyboardType='numeric' secureTextEntry={settingPayPwdStatus} style={styles.formItemRightText}/>
                            </View>
                            <TouchableOpacity onPress={onSetSettingPayPwdStatus}>
                                {settingPayPwdStatus?<Icon name="eye" size="md" color="#666" />:<Icon name="eye-invisible" size="md" color="#666" />}
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.formItem,{marginTop:20}]}>
                            <View style={styles.formItemLeft}>
                                <Text style={styles.formItemLeftText}>确认交易密码</Text>
                            </View>
                            <View style={styles.formItemRight}>
                                <TextInput value={againDealPassword} onChange={value =>{
                                    const newText = value.nativeEvent.text.replace(/[^\d]+/, '');
                                    setAgainDealPassword(newText)
                                }} placeholder="请输入支付密码" keyboardType='numeric' secureTextEntry={querenPayPwdStatus} style={styles.formItemRightText}/>
                            </View>
                            <TouchableOpacity onPress={onSetQuerenPayPwdStatus}>
                                {querenPayPwdStatus?<Icon name="eye" size="md" color="#666" />:<Icon name="eye-invisible" size="md" color="#666" />}
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.formItem,{marginTop:20}]}>
                            <View style={styles.formItemLeft}>
                                <Text style={styles.formItemLeftText}>邀请码（必填）</Text>
                            </View>
                            <View style={styles.formItemRight}>
                                <TextInput value={invitationCode} onChange={value =>{
                                    const newText = value.nativeEvent.text.replace(/[\W]/g,'');
                                    setInvitationCode(value.nativeEvent.text)
                                }} placeholder="请输入邀请码" style={styles.formItemRightText}/>
                            </View>
                        </View>
                        <View style={styles.check_box}>
                            <Checkbox
                                checked={checkBox}
                                style={{ color: '#175DEF' }}
                                onChange={event => {
                                    setCheckBox( event.target.checked)
                                }}
                            />
                            <View style={styles.check_box_right}>
                                <Text>请阅读<Text onPress={onViewRelut} style={styles.check_box_right_title}>《用户使用协议》</Text>并同意使用</Text>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
                <View style={styles.loginBtn}>
                    <TouchableOpacity onPress={onRegistered}>
                        <View style={{backgroundColor:theme.backgroundColor,borderRadius:5}}>
                            <Text style={styles.loginBtnText}>完成注册</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
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
    formItemLeft:{
        width:100
    },
    formItemLeftText:{
        color:'#666'
    },
    getCodeBtn:{
        marginLeft:15
    },
    check_box:{
        paddingLeft:10,
        paddingRight:10,
        flexDirection:'row',
        alignItems:'center',
        paddingTop:20
    },
    check_box_right:{
        paddingLeft:10,
        color:'#333'
    },
    check_box_right_title:{
        color:'#175DEF',
    }
})


export default RegisteredScreen;

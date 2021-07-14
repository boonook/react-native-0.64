import React from "react";
import { View,StyleSheet,Platform,StatusBar} from 'react-native';
import {inject, observer} from "mobx-react";
import SplashScreen from 'react-native-splash-screen'
import {Provider} from '@ant-design/react-native'
import NavigationService from "@/utils/NavigationService";
import constant from '@/utils/constant'

let LoadingScreen = inject("userState")(observer(((props:any)=>{
    function onLayouts() {
        if(Platform.OS !== 'ios'){
            SplashScreen.hide();
        }
        let data = props.userState.getIsLogin;
        if(data+''==='true'){
            let userInfo = JSON.parse(props.userState.getUserInfo);
            if(userInfo.phone+''===constant.userPHONE+''){
                NavigationService.reset('newHome');
            }else{
                NavigationService.reset('home');
            }
        }else{
            NavigationService.reset('login');
        }
    }

    return(
        <Provider>
            <StatusBar 
                    animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden 
                    hidden={false}  //是否隐藏状态栏。 
                    backgroundColor={'transparent'} //状态栏的背景色 
                    translucent={true}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。 
                    barStyle={'dark-content'} // enum('default', 'light-content', 'dark-content') 
                >
            </StatusBar> 
            <View style={{ flex: 1}} onLayout={onLayouts}/>
        </Provider>
    )
})))

const styles = StyleSheet.create({
    fullScreen: {
        flex:1,
        flexDirection: 'row',
    },
    videoBox:{
        flex:1,
        position:'relative',
    },
    timeBox:{
        position:'absolute',
        zIndex:9999,
        elevation:9999,
        top:60,
        right:10,
    },
    timeBoxText:{
        color:'#fff'
    }
})

export default LoadingScreen;

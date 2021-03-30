import React, { useState,useEffect } from "react";
import { View,StyleSheet,TouchableOpacity,Text,Platform} from 'react-native';
import {JRNStatusBar} from '@/Components/jRNStatusBar/JRNStatusBar';
import {inject, observer} from "mobx-react";
import Video from 'react-native-video';
import SplashScreen from 'react-native-splash-screen'
import {Toast,Portal,Provider} from '@ant-design/react-native'
import NavigationService from "@/utils/NavigationService";
import constant from '@/utils/constant'

let LoadingScreen = inject("userState")(observer((props=>{
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

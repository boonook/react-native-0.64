import React from "react";
import { View,StyleSheet,Platform} from 'react-native';
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

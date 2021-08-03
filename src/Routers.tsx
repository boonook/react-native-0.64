// @ts-ignore
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View,StyleSheet,Image} from 'react-native';
import HomeScreen from '@/screen/home/HomeScreen'
import MeScreen from '@/screen/me/MeScreen'
import LoginScreen from '@/screen/auth/LoginScreen'
import DrawerScreen from '@/screen/drawer/DrawerScreen';
import LoadingScreen from '@/screen/loadinng/LoadingScreen';
import RegisteredScreen from '@/screen/auth/RegisteredScreen';
import ForgetPasswordSccreen from '@/screen/auth/ForgetPasswordSccreen';
import MerchantScreen from '@/screen/merchant/MerchantScreen';
import MySettingScreen from '@/screen/me/common/MySettingScreen';
import ImageTest from '@/screen/auth/ImageTest';
///修改登陆密码
import EditLoginPwdScreen from '@/screen/me/common/EditLoginPwdScreen';
///修改支付密码
import EditPayPwdScreen from '@/screen/me/common/EditPayPwdScreen';
///查看商品图片
import ImageZoomViewerScreen from '@/common/imageZoomViewer/ImageZoomViewerScreen';

import NavigationService from '@/utils/NavigationService';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const menu=[
    {name:'loading',component:LoadingScreen,params:{statusbar:'dark-content'}},
    {name:'login',component:LoginScreen,params:{statusbar:'dark-content'}},
    {name:'home',component:drawer},
    {name:'registered',component:RegisteredScreen,params:{statusbar:'dark-content'}},
    {name:'forgetPwd',component:ForgetPasswordSccreen,params:{statusbar:'dark-content'}},
    {name:'editLoginPwd',component:EditLoginPwdScreen,params:{statusbar:'dark-content'}},
    {name:'editPayPwd',component:EditPayPwdScreen,params:{statusbar:'dark-content'}},
    {name:'imageZoomViewer',component:ImageZoomViewerScreen,params:{statusbar:'dark-content'}},
    {name:'mySetting',component:MySettingScreen,params:{statusbar:'dark-content'}},
    {name:'imageTest',component:ImageTest,params:{statusbar:'dark-content'}},
]

function homeTab() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    if (route.name === '首页') {
                        return <View style={styles.tabCenter}>
                                <Image source={focused?require('@/assess/images/tabs/icon_tab_2.png'):require('@/assess/images/tabs/icon_tab_1.png')} style={[styles.IconImage]}/>
                               </View>;
                    }
                    else if (route.name === '短视频') {
                        return <View style={styles.tabCenter}>
                                <Image source={focused?require('@/assess/images/tabs/icon_tab_4.png'):require('@/assess/images/tabs/icon_tab_3.png')} style={[styles.IconImage]}/>
                               </View>;
                    }
                    else if (route.name === '我的') {
                        return <View style={styles.tabCenter}>
                            <Image source={focused?require('@/assess/images/tabs/icon_tab_6.png'):require('@/assess/images/tabs/icon_tab_5.png')} style={[styles.IconImage]}/>
                        </View>;
                    }
                },
            })}
            tabBarOptions={{
                activeTintColor: '#E73D46',
                inactiveTintColor: 'gray',
                tabStyle:{borderColor:'#000000'},
                style:{backgroundColor:'#000000',position:'absolute',borderTopColor:'#000000'},
            }}
        >
            <Tab.Screen name="首页" component={HomeScreen}/>
            <Tab.Screen name="短视频" component={MerchantScreen}/>
            <Tab.Screen name="我的" component={MeScreen} />
        </Tab.Navigator>
    )
}

function drawer() {
    return(
        <Drawer.Navigator initialRouteName="home" drawerContent={(props) => <DrawerScreen {...props} />}>
            <Drawer.Screen name="home" component={homeTab} />
        </Drawer.Navigator>
    )
}

function Routers() {
    return (
        <NavigationContainer  ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef)}}>
            <Stack.Navigator>
                {menu.map((item,index)=>{
                    return <Stack.Screen options={{ headerShown: false}} key={index.toString()} name={item.name} component={item.component} />
                })}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    tabCenter:{
        width:50,
        height:50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    IconImage:{
        width: 24,
        height: 24,
    }
})

export default Routers;

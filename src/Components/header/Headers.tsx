import React, {Component, ReactElement} from 'react';
import { View, Text,StyleSheet,SafeAreaView,Platform,NativeModules,StatusBar,TouchableOpacity} from 'react-native';
import {Icon} from "@ant-design/react-native";
import { OutlineGlyphMapType } from '@ant-design/icons-react-native';
const { StatusBarManager } = NativeModules;
let statusBarHeight;
if (Platform.OS === "ios") {
    StatusBarManager.getHeight(height => {
        statusBarHeight = 0;
    });
} else {
    statusBarHeight = 12;
}

type HeaderProps = {
    leftContent?:ReactElement
    backgroundColor?:string
    border?:boolean
    leftIcon?:OutlineGlyphMapType
    leftTitle?:string
    centerContent?:ReactElement
    title?:string
    leftColor?:string
    centerColor?:string
    rightContent?:ReactElement
    rightTitle?:string
    rightIcon?:OutlineGlyphMapType
    rightColor?:string
    navigation?:{
        goBack?:(...args)=>void
        navigate?:(...args)=>void
    }
    onClickRightBtn?:Function
} | any

export default class Headers extends Component<HeaderProps,any>{
    constructor(props) {
        super(props);
        this.state = {
            title:'首页',
            headerBoxStyle:styles.headerBox
        };
    }

    componentDidMount() {
        // Platform.OS === 'ios'
    }

    goBack=()=>{
        this.props && this.props.navigation && this.props.navigation.goBack && this.props.navigation.goBack();
    }

    onClickRightBtn=()=>{
        this.props.onClickRightBtn && this.props.onClickRightBtn();
    }

    render() {
        return(
            <SafeAreaView style={{backgroundColor:this.props.backgroundColor||'#2d1c4d',paddingTop: statusBarHeight}}>
                <View style={[styles.headerBox,this.props.border?styles.headerBoxBorder:null]}>
                    <TouchableOpacity style={styles.headerBoxLeft} onPress={()=>{
                        this.goBack();
                    }}>
                        {this.props.leftContent}
                        {this.props.leftIcon?<Icon name={this.props.leftIcon} size={20} color={this.props.leftColor||'#666'} />:null}
                        {this.props.leftTitle?<Text style={[styles.headerBoxLeftText,{color:this.props.leftColor||'#666'}]} numberOfLines={1}>{this.props.leftTitle}</Text>:null}
                    </TouchableOpacity>
                    <View style={styles.headerBoxCenter}>
                        {this.props.centerContent}
                        {this.props.title?<Text style={[styles.headerBoxCenterText,{color:this.props.centerColor||'#666'}]} numberOfLines={1}>{this.props.title||'首页'}</Text>:null}
                    </View>
                    <TouchableOpacity style={styles.headerBoxRight} onPress={()=>{
                        this.onClickRightBtn();
                    }}>
                        {this.props.rightContent}
                        {this.props.rightTitle?<Text style={[styles.headerBoxRightText,{color:this.props.rightColor||'#666'}]} numberOfLines={1}>{this.props.rightTitle}</Text>:null}
                        {this.props.rightIcon?<Icon name={this.props.rightIcon} size={20} color={this.props.leftColor||'#666'} />:null}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    headerBox:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:12,
        paddingRight:12,
        paddingBottom:15,
    },
    headerBoxBorder:{
        borderStyle:'solid',
        borderBottomWidth:1,
        borderBottomColor:'#eee'
    },
    headerBoxCenter:{
        flex:1,
    },
    headerBoxLeft:{
        width:120,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        height:30
    },
    headerBoxRight:{
        width:120,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    headerBoxLeftText:{
        textAlign:'left',
        color:'#666',
    },
    headerBoxRightText:{
        textAlign:'right',
        color:'#666'
    },
    headerBoxCenterText:{
        textAlign:'center',
        fontWeight:'600',
        fontSize:16
    }
})

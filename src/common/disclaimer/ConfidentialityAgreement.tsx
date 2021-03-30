//@ts-nocheck
import React, {Component} from 'react';
import {StyleSheet, View,Platform} from 'react-native';
import {WebView} from 'react-native-webview'
import {ActivityIndicator} from "@ant-design/react-native";
import Headers from "@/Components/header/Headers";
const source = (Platform.OS == 'ios') ? require('./html/privacy.html') : {'uri':'file:///android_asset/privacy.html'}

export default class ConfidentialityAgreement extends Component{
    constructor(props) {
        super(props);
        this.state = {
            contentLoading:true
        };
    }

    finished=(data)=>{
        this.setState({
            contentLoading:false
        });
    }

    render(){
        return(
            <View style={{flex:1}}>
                <Headers
                    leftIcon={'left'}
                    leftColor={'#666'}
                    border={true}
                    backgroundColor={'#fff'}
                    title={'保密协议'}
                    centerColor={'#666'}
                    {...this.props}
                />
                {this.state.contentLoading?<View style={{backgroundColor:'rgba(0,0,0,0.6)',width:120,height:120,textAlign:'center',justifyContent:'center',position:'absolute',top:'50%',left:'50%',marginTop:-60,marginLeft:-60,zIndex:999999999,elevation:9999999}}>
                    <ActivityIndicator animating={true} size="large" color={'#fff'}/>
                </View>:null}
                <View style={styles.detailContent}>
                    <WebView
                        originWhitelist={['*']}
                        source={source}
                        onLoad={this.finished}
                        domStorageEnabled={true}
                        startInLoadingState={true}
                        javaScriptEnabled={true}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    detailContent:{
        flex: 1
    }
})

/**
 *手势密码
 */

import React,{Component} from 'react';
import {View,StyleSheet} from 'react-native';
import PasswordGesture from 'react-native-gesture-password'

class GesturePasswordScreen extends Component<any, any>{
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null, // 隐藏头部
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            status:'normal',
            message:"请输入手势密码"
        };
    };
    onEnd=(password)=>{
        if(password==='123'){
            this.setState({
                status:'normal',
                message: '密码输入正确'
            },()=>{
                setTimeout(()=>{
                    this.props.navigation.push('home', {
                        itemId: Math.floor(Math.random() * 100),
                    })
                },1000)
            })
        }else{
            this.setState({
                status: 'wrong',
                message: '输入错误请重新输入'
            });
        }
    }

    onReset=()=>{
        this.setState({
            status: 'normal',
            message: 'Please input your password (again).'
        });
    }

    onStart=()=>{
        this.setState({
            status: 'normal'
        });
    }

    render(){
        return (
            <View style={styles.container}>
            <PasswordGesture
                style={{ backgroundColor:'#fff'}}
                ref='pg'
                interval={1000}
                status={this.state.status}
                message={this.state.message}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}
                onReset={()=>{}}
            />
        </View>
    );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'orange',
    }
})

export default GesturePasswordScreen;


import React, {Component} from 'react';
import {View,StyleSheet} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default class QRCodeScreen extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {

        };
    };
    componentWillMount(){

    };
    componentDidMount(){

    };

    render(){
        return (
            <View style={{backgroundColor:'#fff',padding:12}}>
                <QRCode
                    value={this.props.value}
                    logoBorderRadius={1}
                    logoSize={50}
                    logoBackgroundColor='transparent'
                />
            </View>
        )
    }
}

const styles=StyleSheet.create({

})

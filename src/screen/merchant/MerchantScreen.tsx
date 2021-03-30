//@ts-nocheck
import React from "react";
import {
    View,
    StatusBar,
    StyleSheet,
    Dimensions,
    Text,
} from 'react-native';
import Headers from "@/Components/header/Headers";
import {main} from "@/assess/styles";
const {width} =  Dimensions.get('window');
export default class MerchantScreen extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor('#fff')
        });
    }

    render() {
        return (
            <View style={{ flex: 1}}>
                <Headers
                    border={true}
                    backgroundColor={'#fff'}
                    title={'商城'}
                    centerColor={'#666'}
                    {...this.props}
                />
                <View style={{flex:1}}>
                    <View>
                        <Text>商城</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})


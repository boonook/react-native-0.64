import React from "react";
import {View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity} from "react-native";
import Headers from "@/Components/header/Headers";
import {CachedImageBackground,CachedImage} from 'react-native-img-cache';
import Swiper from "react-native-swiper";
import Video from 'react-native-video';
const {width} =  Dimensions.get('window');

export default class IntegralManageScreen extends React.Component<any,any>{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
            <View style={{ flex:1,backgroundColor:'#eee'}}>
                <Headers
                    backgroundColor={'#fff'}
                    border={true}
                    centerContent={<Text style={[styles.headerBoxCenterText,{color:'#666'}]} numberOfLines={1}>{'积分'}</Text>}
                    {...this.props}
                />
                <View style={{ flex: 1}}>
                    <ScrollView>
                        <View>
                            <Text>积分</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    headerBoxCenterText:{
        textAlign:'center',
        fontWeight:'600',
        fontSize:16
    }
})

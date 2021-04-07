import React from 'react';
import {inject, observer} from 'mobx-react';
import {View,Image,Dimensions} from "react-native";
import AutoHeightImage from 'react-native-auto-height-image'
const {width,height} = Dimensions.get('window');
@inject('userState') // 注入对应的store
@observer // 监听当前组件
export default class ImageTest extends React.Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }
    render() {
        return (
            <View>
                <View style={{backgroundColor:"orange"}}>
                    <View>
                        <AutoHeightImage width={width} source={require('@/assess/images/home/share.png')}/>
                    </View>
                    <View>
                        <AutoHeightImage width={100}  source={require('@/assess/images/home/share.png')}/>
                    </View>
                    <View>
                        <AutoHeightImage width={width}  source={require('@/assess/images/home/share.png')}/>
                    </View>
                </View>
            </View>
        )
    }
}

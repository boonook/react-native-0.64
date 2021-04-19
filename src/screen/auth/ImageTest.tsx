import React from 'react';
import {inject, observer} from 'mobx-react';
import {View, Dimensions, StatusBar} from "react-native";
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
        this.props.navigation.addListener('focus', () => {
            StatusBar.setBarStyle('light-content');
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor('rgba(0,0,0,0)')
        });
    }

    onImageErr=()=>{
        console.log(123123);
    }

    render() {
        return (
            <View>
                <View style={{backgroundColor:"orange"}}>
                    <View>
                        <AutoHeightImage onError={()=>{this.onImageErr()}} width={width} source={{uri:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F140703%2F330746-140f301555752.jpg&refer=http%3A%2F%2Fimg.juimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620357997&t=6a6be8f3c97be608b9f48dee728f6b03'}}/>
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

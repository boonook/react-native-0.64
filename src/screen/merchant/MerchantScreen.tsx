//@ts-nocheck
import React from "react";
import {
    View,
    StatusBar,
    StyleSheet,
    Dimensions,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';
import Headers from "@/Components/header/Headers";
import Video from 'react-native-video';
const {width} =  Dimensions.get('window');
export default class MerchantScreen extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            data:[
                {id:'1',name:'是爱情，让父子相认',path:'https://video.yinyuetai.com/6bd60be8b76e4430a2767f89d51dd52c.mp4'},
                {id:'2',name:'夏天来了，来切一组可爱的蜜桃切片饼干~ ',path:'https://vd4.bdstatic.com/mda-ki05qgk9e2qzbqcw/hd/mda-ki05qgk9e2qzbqcw.mp4?playlist=%5B%22hd%22%5D&v_from_s=hkapp-haokan-tucheng&auth_key=1627979249-0-0-5dc96bef651b60ebdf16b69bd8bd49d6&bcevod_channel=searchbox_feed&pd=1&pt=3&abtest='},
                {id:'3',name:'看婷婷妹一上场就火力全开#每天看婷婷麻将赢不停',path:'https://vd4.bdstatic.com/mda-meq8v5nkia5v7xke/hd/cae_h264_clips/1621933732541004986/mda-meq8v5nkia5v7xke.mp4?auth_key=1627979277-0-0-1a1dab669d17e7de44c7dd989a1abf2a&bcevod_channel=searchbox_feed&pd=1&pt=3&abtest=all'},
                {id:'4',name:'四个驴蹄穿着厚棉鞋太难受，大块切掉脚底嵌着石子，厚蹄子切掉了',path:'https://vd3.bdstatic.com/mda-kjk7a991ebh1izdf/sc/mda-kjk7a991ebh1izdf.mp4?v_from_s=hkapp-haokan-tucheng&auth_key=1627979376-0-0-daa125fecf1577a09c288f0246343184&bcevod_channel=searchbox_feed&pd=1&pt=3&abtest='},
                {id:'5',name:'大块切掉脚底嵌着石子',path:'https://vd3.bdstatic.com/mda-kjk7a991ebh1izdf/sc/mda-kjk7a991ebh1izdf.mp4?v_from_s=hkapp-haokan-tucheng&auth_key=1627979376-0-0-daa125fecf1577a09c288f0246343184&bcevod_channel=searchbox_feed&pd=1&pt=3&abtest='}
            ],
            isPause:true, //控制播放器是否播放，下面的代码有解释一个列表只需要一个state控制，而不用数组
            current:0,//表示当前item的索引，通过这个实现一个state控制全部的播放器
            height:0
        };
        this.renderItem = this.renderItem.bind(this)
        this._onViewableItemsChanged = this._onViewableItemsChanged.bind(this)
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            StatusBar.setBarStyle('light-content');
            StatusBar.setBackgroundColor('#000000')
        });
    }

    /**  item布局 播放器 等*/
    renderItem({item,index}){
        return(
            <View style={{width:width,height:this.state.height}}>
                <TouchableWithoutFeedback style={{flex:1}} onPress={()=>{
                    this.setState({
                        isPause:!this.state.isPause,
                    })
                }}>
                    <Video source={{uri:item.path}}
                           style={{flex: 1,backgroundColor:'#000'}}
                           repeat={true}
                           paused={index===this.state.current?this.state.isPause:false}
                           resizeMode='contain'
                    >
                    </Video>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    _onViewableItemsChanged=({viewableItems, changed})=>{
        //这个方法为了让state对应当前呈现在页面上的item的播放器的state
        //也就是只会有一个播放器播放，而不会每个item都播放
        //可以理解为，只要不是当前再页面上的item 它的状态就应该暂停
        //只有100%呈现再页面上的item（只会有一个）它的播放器是播放状态
        if(viewableItems.length === 1){
            this.setState({
                current:viewableItems[0].index,
            })
        }
    }

    onLayout=(event)=>{
        const ViewHeight = event.nativeEvent.layout.height;
        this.setState({
            height:ViewHeight
        })
    }

    render() {
        const VIEWABILITY_CONFIG = {
            viewAreaCoveragePercentThreshold: 80,//item滑动80%部分才会到下一个
        };
        return (
            <View style={{ flex: 1}}>
                <Headers
                    backgroundColor={'#000000'}
                    title={'推荐'}
                    centerColor={'#ffffff'}
                    {...this.props}
                />
                <View onLayout={(event)=>{this.onLayout(event)}} style={{flex:1,backgroundColor:'#000000'}} ref={'container'}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem}
                        horizontal={false}
                        pagingEnabled={true}
                        getItemLayout={(data, index) => {
                            return {length:this.state.height, offset:this.state.height * index, index}
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        viewabilityConfig={VIEWABILITY_CONFIG}
                        showsHorizontalScrollIndicator={false}
                        onViewableItemsChanged={this._onViewableItemsChanged}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomRightBn:{
        width:50,
        height:50,
        marginTop:20,
    },
    bottomRightImage:{
        width:30,
        height:30,
    },
    bottomRightText:{
        fontSize:14,
        color:'#fff',
        marginTop:5,
    }
});


import React from 'react';
import {View, Modal, Dimensions,Alert} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll'
import {ActivityIndicator} from '@ant-design/react-native';
import ImageViewer from 'react-native-image-zoom-viewer';


const screenHeight = Dimensions.get("window").height;

export default class ImageZoomViewerScreen extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible:true,
            curentImage:0,
            animating: true,
            imaeDataUrl:[]
        };
        this.renderLoad = this.renderLoad.bind(this);
        this.savePhoto = this.savePhoto.bind(this);
        this._Close= this._Close.bind(this);
    };

    _Close() {
        this.setState({
            modalVisible:false
        },()=>{
            this.props.navigation.goBack();
        })
    }
    renderLoad() { //这里是写的一个loading
        // @ts-ignore
        return (
            <View style={{ marginTop: (screenHeight / 2) - 20 }}>
                <ActivityIndicator animating={this.state.animating} size={"large"} />
            </View>
        )
    }
    savePhoto() {
        // @ts-ignore
        let index = this.state.curentImage;
        // @ts-ignore
        let url = this.state.imaeDataUrl[index].url;
        let promise = CameraRoll.saveToCameraRoll(url);
        promise.then(function (result) {
            Alert.alert(
                '温馨提示',
                '图片保存成功！',
                [
                    {text: '确定', onPress: () => console.log('OK Pressed')},
                ]
            )
        }).catch(function (error) {
            Alert.alert(
                '温馨提示',
                '图片保存失败！',
                [
                    {text: '确定', onPress: () => console.log('OK Pressed')},
                ]
            )
        });
    }

    componentWillMount() {
        let data = this.props.route.params.data||[];
        let imgIndex = this.props.route.params.index-1;
        let imgData=[];
        data.forEach(item=>{
            let imgDataItem={url:""};
            imgDataItem.url = item.image.uri;
            imgData.push(imgDataItem)
        });
        this.setState({
            imaeDataUrl:imgData,
            curentImage:imgIndex
        })
    };

    componentDidMount() {

    };

    onClose = () => {
        this.props.navigation.goBack();
    };

    goBack=()=>{
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View>
                <View style={{ flex:1,position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}>
                    <Modal
                        transparent={true}
                        visible={this.state.modalVisible}
                    >
                        <ImageViewer
                            onClick={()=>{this._Close()}}
                            index={this.state.curentImage}
                            menuContext={{ "saveToLocal": "保存图片", "cancel": "取消" }}
                            enableImageZoom={true}
                            saveToLocalByLongPress={true}
                            imageUrls={this.state.imaeDataUrl}
                            onSave={() => { this.savePhoto() }}
                        />
                    </Modal>

                </View>
            </View>
        )
    }
}

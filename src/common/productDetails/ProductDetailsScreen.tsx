import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView, TextInput, Dimensions,Image} from 'react-native';
import Headers from "@/Components/header/Headers";
import {CachedImage} from 'react-native-img-cache'
import {Carousel,Modal,Toast} from '@ant-design/react-native';
import {inject, observer} from 'mobx-react';
import {fileImgUrl} from "@/utils";
import {getProductDetailData,getStartAGroup} from '@/Api/merchantApi'
import {main} from "@/assess/styles";
import constant from "@/utils/constant";
import NavigationService from "@/utils/NavigationService";
const {width} =  Dimensions.get('window');

// @ts-ignore
@inject(["userState"]) // 注入对应的store
@observer // 监听当前组件
export default class ProductDetailsScreen extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            params:{},
            imgIndex:1,
            inputValue:'1',
            visible:false,
            imgList:[],
            pictureList:[],
            id:null,
            detail:{},
            phone:null,
            productType:'',
            type:null///1.立即购买2.拼团
        }
    };
    componentWillMount(){

    };
    componentDidMount(){
        let userInfo = JSON.parse(this.props.userState.getUserInfo);
        this.setState({
            phone:userInfo.phone
        })
        let id =this.props.route.params.id||'';
        let productType =this.props.route.params.productType||'';
        this.setState({
            id,
            productType
        },()=>{
            this.getProductDetail();
        })
    };

    getProductDetail(){
        let params={
            id:this.state.id
        }
        getProductDetailData(params).then(res=>{
            if(res && res.code+''===constant.SUCCESS+''){
                let data = res.data||{};
                let detail = data.detail||{};
                let pictureList = data.pictureList||[];
                let pictureListList = [];
                pictureList.forEach(it=>{
                    it.path = fileImgUrl(it.path);
                    Image.getSize(it.path,(widths, heights)=>{
                        let pictureListListitem = {url:null,width:null,height:null};
                        pictureListListitem.url = it.path;
                        pictureListListitem.width = width-24;
                        pictureListListitem.height = (width-24) * heights/widths;
                        // @ts-ignore
                        pictureListList.push(pictureListListitem);
                        this.setState({
                            pictureList:pictureListList
                        })
                    })
                })
                detail.thumbnail = fileImgUrl(detail.thumbnail);
                this.setState({
                    detail,
                    imgList:[{uri:detail.thumbnail}],
                })
            }
        })
    }

    onHorizontalSelectedIndexChange=(index)=>{
        this.setState({
            imgIndex:index+1
        })
    }

    onViewImage=()=>{
        let imgList = this.state.imgList||[];
        let imgListData=[];
        imgList.forEach(item=>{
            let it = {image:{uri:item.uri}}
            imgListData.push(it)
        });
        this.props.navigation.navigate("imageZoomViewer",{data:imgListData,index:this.state.imgIndex})
    }

    ////立即购买
    onBuy=(type)=>{
        this.setState({
            visible:true,
            type:type
        })
    }

    onClose=()=>{
        this.setState({
            visible:false
        })
    }

    onSubmitOrder=()=>{
        if(this.state.inputValue>0){
            this.setState({
                visible:false
            },()=>{
                if(this.state.type==='2'){
                    let params={
                        "commodityId":this.state.detail.id||null
                    }
                    getStartAGroup(params).then(res=>{
                        if(res && res.code+''===constant.SUCCESS+''){
                            Toast.info('拼团发起成功',0.3);
                            setTimeout(()=>{
                                this.props.navigation.navigate("determineOrder",{inputValue:this.state.inputValue,type:this.state.type,data:this.state.detail})
                            },300)
                        }
                    })
                }else{
                    this.props.navigation.navigate("determineOrder",{inputValue:this.state.inputValue,type:this.state.type,data:this.state.detail})
                }
            })
        }else{
            Toast.info('购买数量必须大于1')
        }
    }

    render(){
        return (
            <View style={{flex:1}}>
                <Headers
                    leftIcon={'left'}
                    leftColor={'#666'}
                    border={true}
                    backgroundColor={'#fff'}
                    title={'商品详情'}
                    centerColor={'#666'}
                    {...this.props}
                />
                <View style={{flex:1,backgroundColor:'#eee'}}>
                    <ScrollView>
                        <View style={styles.carouselBox}>
                            <Carousel
                                style={styles.wrapper}
                                selectedIndex={2}
                                autoplay
                                infinite
                                afterChange={this.onHorizontalSelectedIndexChange}
                            >
                                {this.state.imgList.map((i,idx)=>(
                                    <View style={styles.slide} key={'head_banner_'+idx}>
                                        <TouchableOpacity  onPress={()=>{
                                            this.onViewImage();
                                        }}>
                                            <CachedImage resizeMode={'stretch'} style={styles.bannber} source={i}/>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </Carousel>
                            <View style={styles.carouselBoxIndex}>
                                <Text style={styles.carouselBoxIndexText}>{this.state.imgIndex}/{this.state.imgList.length}</Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.productDetailBox}>
                               <View style={styles.productDetailBoxTitle}>
                                   <Text style={styles.productDetailBoxTitleDec}>{this.state.detail.name||''}</Text>
                               </View>
                                <View style={styles.productDetailType}>
                                    <View style={styles.productDetailTypeBox}>
                                        <View style={[styles.productDetailTypeKuCunPf,{paddingRight:5}]}>
                                            <Text style={styles.productDetailTypeKuCun}>库存：{this.state.detail.inventory||''}</Text>
                                        </View>
                                        <View style={[styles.productDetailTypeKuCunPf,styles.productDetailTypeKuCunPfRight]}>
                                            <Text style={styles.productDetailTypeKuCun}>销量：{this.state.detail.salesVolume||''}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.kucunSumBox}>
                                    <View style={styles.kucunSumBoxItem}>
                                        <Text style={styles.kucunSumBoxItemLeft}><Text style={{fontSize:20}}>金币 {this.state.detail.price||'0.00'}</Text> <Text style={{color:'#999'}}>原价：<Text style={{ textDecorationLine:'line-through'}}>金币 {this.state.detail.originalPrice||'0.00'}</Text></Text></Text>
                                    </View>
                                    <View style={styles.kucunSumBoxRight}>
                                        <View>
                                            <Text>数量</Text>
                                        </View>
                                        <View style={styles.modalBottomBoxRight}>
                                            <View style={styles.modalBottomBoxRightLeft}>
                                                <TouchableOpacity onPress={()=>{
                                                    if(parseInt(this.state.inputValue)<=1){
                                                        this.setState({
                                                            inputValue:1+'',
                                                        })
                                                    }else{
                                                        this.setState({
                                                            inputValue:(parseInt(this.state.inputValue)-1)+''
                                                        })
                                                    }
                                                }}>
                                                    <Text style={styles.modalBottomBoxRightLeftText}>-</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View>
                                                <TextInput
                                                    style={styles.numberBox}
                                                    onChangeText={(text) => {
                                                        const newText = text.replace(/[^\d]+/, '');
                                                        this.setState({inputValue: newText})
                                                    }}
                                                    value={this.state.inputValue}
                                                    keyboardType='numeric'
                                                />
                                            </View>
                                            <View style={styles.modalBottomBoxRightRight}>
                                                <TouchableOpacity onPress={()=>{
                                                    this.setState({
                                                        inputValue:(parseInt(this.state.inputValue)+1)+''
                                                    })
                                                }}>
                                                    <Text style={styles.modalBottomBoxRightLeftText}>+</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.productDetailContent}>
                                <View>
                                    <Text style={styles.productDetailContentTitle}>详情</Text>
                                </View>
                                <View style={styles.productDetailContentBody}>
                                    {this.state.pictureList.map((item,index)=>{
                                        return(
                                            <View key={index+'1'}>
                                                <CachedImage style={{width:'100%',height:item.height}} source={{uri:item.url}}/>
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.footerBox}>
                        {this.state.phone+''===constant.userPHONE+''?null:<View style={styles.footerBoxLeft}>
                            <View style={styles.footerBoxLeftTop}>
                                <CachedImage style={{width:20,height:20}}  source={require('@/assess/images/merchant/kefucenter.png')}/>
                            </View>
                            <Text>联系客服</Text>
                        </View>}
                        {this.state.phone+''===constant.userPHONE+''?null:<View style={styles.footerBoxLeft}>
                            <View style={styles.footerBoxLeftTop}>
                                <CachedImage style={{width:24,height:20}}  source={require('@/assess/images/merchant/xihuanicon.png')}/>
                            </View>
                            <Text>已收藏</Text>
                        </View>}
                        {this.state.productType+''==='join'?<TouchableOpacity onPress={()=>{this.onBuy('1')}} style={{flex:1}}>
                            <Text style={[styles.submitBtn,{backgroundColor:'#999'}]}>立即购买</Text>
                        </TouchableOpacity>:null}
                        {this.state.productType+''==='join'?<TouchableOpacity onPress={()=>{this.onBuy('2')}} style={{flex:1}}>
                            <Text style={styles.submitBtn}>发起拼团</Text>
                        </TouchableOpacity>:null}
                        {this.state.productType+''==='hot'?<View style={{flex:1}}></View>:null}
                        {this.state.productType+''==='hot'? <TouchableOpacity onPress={()=>{this.onBuy('1')}} style={{flex:1}}>
                            <Text style={styles.submitBtn}>立即购买</Text>
                        </TouchableOpacity>:null}
                    </View>
                    <Modal
                        popup
                        maskClosable={true}
                        visible={this.state.visible}
                        animationType="slide-up"
                        onClose={this.onClose}
                    >
                        <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
                           <View style={styles.modalHeaderBox}>
                               <View style={styles.modalHeaderBoxLeft}>
                                   <CachedImage style={{width:110,height:110}} source={{uri:this.state.detail.thumbnail}}/>
                               </View>
                               <View style={styles.modalHeaderBoxRight}>
                                    <View style={styles.modalHeaderBoxRightTop}>
                                        <Text style={styles.modalHeaderBoxRightTopText} numberOfLines={2}>
                                            {this.state.detail.name||''}
                                        </Text>
                                    </View>
                                   <View style={styles.modalHeaderBoxRightBottom}>
                                       <View>
                                           <Text style={styles.modalHeaderBoxRightBottomText}>金币{this.state.type+''==='1'?this.state.detail.originalPrice:(this.state.detail.price||'0.00')}</Text>
                                       </View>
                                       <View style={styles.modalHeaderBoxRightBottomRight}>
                                          <Text style={styles.modalHeaderBoxRightBottomRightText}>库存 {this.state.detail.inventory||0}</Text>
                                       </View>
                                   </View>
                               </View>
                           </View>
                            <View style={styles.modalBottomBox}>
                                <View style={styles.modalBottomBoxLeft}>
                                    <Text>购买数量</Text>
                                </View>
                                <View style={styles.modalBottomBoxRight}>
                                    <View style={styles.modalBottomBoxRightLeft}>
                                        <TouchableOpacity onPress={()=>{
                                            if(parseInt(this.state.inputValue)<=1){
                                                this.setState({
                                                    inputValue:1+'',
                                                })
                                            }else{
                                                this.setState({
                                                    inputValue:(parseInt(this.state.inputValue)-1)+''
                                                })
                                            }
                                        }}>
                                            <Text style={styles.modalBottomBoxRightLeftText}>-</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TextInput
                                            style={styles.numberBox}
                                            onChangeText={(text) => {
                                                const newText = text.replace(/[^\d]+/, '');
                                                this.setState({inputValue: newText})
                                            }}
                                            value={this.state.inputValue}
                                            keyboardType='numeric'
                                        />
                                    </View>
                                    <View style={styles.modalBottomBoxRightRight}>
                                        <TouchableOpacity onPress={()=>{
                                            this.setState({
                                                inputValue:(parseInt(this.state.inputValue)+1)+''
                                            })
                                        }}>
                                            <Text style={styles.modalBottomBoxRightLeftText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.sunMoney}>
                                <View style={{flex:1}}>
                                    <Text>
                                       共计
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.modalHeaderBoxRightBottomText}>
                                        金币 {parseFloat( this.state.type+''==='1'?this.state.detail.originalPrice:this.state.detail.price)*this.state.inputValue}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity  onPress={()=>{this.onSubmitOrder()}}>
                            <View>
                                <Text style={styles.submitBtn}>确定</Text>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    wrapper: {
        backgroundColor: '#eee',
        height:240
    },
    containerHorizontal: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee',
        minHeight:240
    },
    containerVertical: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 36,
    },
    carouselBox:{
        position:'relative',
        height:240
    },
    carouselBoxIndex:{
        position:'absolute',
        bottom:10,
        right:10,
        zIndex:99
    },
    carouselBoxIndexText:{
        color:'#fff',
        fontSize:13,
        backgroundColor:'rgba(255,255,255,0.4)',
        height:24,
        width:50,
        lineHeight:24,
        textAlign:'center',
        borderRadius:12,
        overflow:'hidden'
    },
    submitBtn:{
        backgroundColor:'#d71e31',
        color:'#fff',
        height:60,
        lineHeight:60,
        textAlign:'center',
        fontSize:16
    },
    productDetailBox:{
        backgroundColor:'#fff',
        padding:12
    },
    productDetailBoxTitle:{

    },
    productDetailBoxTitleDec:{
        fontSize:14,
        color:'#333',
        lineHeight:24
    },
    productDetailType:{
        paddingTop:15,
        paddingBottom:15,
        flexDirection:'row'
    },
    productDetailTypeItem:{
        color:'#999',
        paddingRight:5
    },
    productDetailTypeBox:{
        flexDirection:'row'
    },
    productDetailTypeItem2:{
        paddingLeft:5
    },
    kucunSumBox:{
        flexDirection:'row',
        alignItems:'center'
    },
    kucunSumBoxItem:{
        flex:1
    },
    kucunSumBoxItemRight:{
        textAlign:'right',
        color:'#999',
        fontSize:14,
    },
    kucunSumBoxItemLeft:{
        color:'#d71e31',
        fontSize:16,
        fontWeight:'600'
    },
    productDetailContent:{
        backgroundColor:'#fff',
        marginTop:12,
        padding:12
    },
    productDetailContentTitle:{
        color:'#333',
        fontSize:16,
        fontWeight:'600'
    },
    productDetailContentBody:{
        backgroundColor:'#eee',
        marginTop:12,
        minHeight:60
    },
    numberBox:{
        width:40,
        height:34,
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#eee',
        color:'#333',
        textAlign:'center'
    },
    modalHeaderBox:{
        flexDirection:'row',
        alignItems:'stretch'
    },
    modalBottomBox:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:40,
        marginBottom:28
    },
    modalHeaderBoxLeft:{
        width:110,
        height:110,
        backgroundColor:'#eee',
        borderRadius:5,
        overflow:'hidden'
    },
    modalHeaderBoxRight:{
        flex:1,
        flexDirection:'column',
        marginLeft:12
    },
    modalHeaderBoxRightTop:{
        flex:1,
    },
    modalHeaderBoxRightTopText:{
        lineHeight:30
    },
    modalHeaderBoxRightBottom:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    modalHeaderBoxRightBottomRight:{
        flex:1,
    },
    modalHeaderBoxRightBottomRightText:{
        textAlign:'right',
        color:'#999'
    },
    modalHeaderBoxRightBottomText:{
        color:'#d71e31',
        fontSize:16,
        fontWeight:'600'
    },
    modalBottomBoxLeft:{
        flex:1,
    },
    modalBottomBoxRight:{
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:10
    },
    modalBottomBoxRightLeft:{
        height:34,
        width:30,
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#eee',
        borderRightWidth:0,
    },
    modalBottomBoxRightRight:{
        height:34,
        width:34,
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#eee',
        borderLeftWidth:0,
    },
    modalBottomBoxRightLeftText:{
        textAlign:'center',
        lineHeight:34,
        color:'#999',
        fontSize:18
    },
    productDetailTypeKuCunPf:{
        paddingLeft:5
    },
    slide: {
        overflow:'hidden',
        height:240,
        ...main.rowVCenter
    },
    bannber:{
        width:width,
        height:240,
    },
    productDetailTypeKuCun:{
        color:'#999'
    },
    productDetailTypeKuCunPfRight:{
        borderLeftColor:'#999',
        borderLeftWidth:1,
        borderStyle:'solid',
    },
    kucunSumBoxRight:{
        flexDirection:'row',
        alignItems:'center'
    },
    footerBox:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    footerBoxLeft:{
        width:90,
        flexDirection:'column',
        alignItems:'center',
    },
    footerBoxLeftTop:{
        marginBottom:10
    },
    sunMoney:{
        flexDirection:'row',
        alignItems:'center',
    }
})

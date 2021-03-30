import React  from "react";
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {Icon} from '@ant-design/react-native';
import {getAddressList} from '@/Api/meApi'
import constant from '../../utils/constant';
import Headers from "@/Components/header/Headers";

export default class SelectMyAddressScreen extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            addressList:[],
            refreshing: false,
            loading: true,
        };
    };

    componentDidMount(){
        this.getList()
    }

    getList=()=>{
        getAddressList({}).then(res=>{
            if(res && res.code+''===constant.SUCCESS+''){
                let data = res.data||[];
                this.setState({
                    refreshing:false,
                    loading:false,
                    addressList:data
                })
            }
        })
    }

    onChecked=(data)=>{
        if(data.isDefault+''==='yes'){
            return false;
        }else{
            let selectItem = {};
            let list = [...this.state.addressList]
            list.forEach(item=>{
                item.isDefault = 'no';
                if(item.id===data.id){
                    item.isDefault = 'yes';
                    selectItem = item;
                }
            });
            this.setState({
                addressList:list,
                selectItem:selectItem||{}
            })
        }
    }

    onSureClick=()=>{
        let list = [...this.state.addressList]
        let selectItem = {};
        list.forEach(item=>{
            if(item.isDefault+''==='yes'){
                selectItem = item;
            }
        });
        const { navigation } = this.props;
        navigation.goBack();
        this.props.route.params.onSelect({ selected:selectItem });
    }

    renderFooter=()=>{
        return (
            <View style={{paddingTop:20,paddingBottom:15}}>
                <Text style={{color:'#ccc',fontSize:12,textAlign:'center',}}>数据加载完毕</Text>
            </View>
        )
    };

    handleRefresh=()=>{
        this.setState(
            {
                refreshing: true,
            },
            () => {
                this.getList();
            }
        );
    };

    render() {
        return (
            <View style={{flex:1}}>
                <Headers
                    leftIcon={'left'}
                    leftColor={'#666'}
                    rightColor={'#666'}
                    rightTitle={'确定'}
                    border={true}
                    backgroundColor={'#fff'}
                    title={'选择地址'}
                    onClickRightBtn={()=>{
                        this.onSureClick()
                    }}
                    centerColor={'#666'}
                    {...this.props}
                />
                <View style={{flex:1,backgroundColor:'#eee'}}>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.addressList}
                        renderItem={({ item }) => (
                            <View>
                                <View style={styles.listItem}>
                                    <View>
                                        <View style={styles.listItemTop}>
                                            <View>
                                                <Text>{item.name||''}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.listItemInfo}>
                                            <Text style={styles.listItemInfoText}>{item.phone||''}</Text>
                                            <Text style={styles.listItemInfoText}>{item.address||'---'}</Text>
                                        </View>
                                    </View>
                                    {item.isDefault+''==='yes'? <View style={styles.listItemTopRight}>
                                        <TouchableOpacity onPress={()=>{
                                            this.onChecked(item)
                                        }}>
                                            <View style={styles.iconBox}>
                                                <Icon name="check" size={14} color="#fff" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>:<View style={styles.listItemTopRightNoChecked}>
                                        <TouchableOpacity onPress={()=>{
                                            this.onChecked(item)
                                        }}>
                                            <View style={styles.listItemTopRightNoCheckedIconBox}>

                                            </View>
                                        </TouchableOpacity>
                                    </View>}
                                </View>
                            </View>
                        )}
                        ListFooterComponent={this.renderFooter}
                        onRefresh={this.handleRefresh}
                        refreshing={this.state.refreshing}
                        onEndReachedThreshold={0.5}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listItem:{
        flexDirection:'row',
        marginTop:12,
        padding:12,
        backgroundColor:'#fff',
    },
    listItemTop:{
        flexDirection:'row'
    },
    myAddress:{
        flex:1
    },
    iconBox:{
        width:20,
        height:20,
        borderRadius:10,
        backgroundColor:'#d71e31',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginRight:5,
    },
    iconBoxText:{
        color:'#999'
    },
    listItemTopRight:{
        flexDirection:'row',
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
    },
    listItemTopRightNoChecked:{
        flexDirection:'row',
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
    },
    listItemTopRightNoCheckedIconBox:{
        width:20,
        height:20,
        borderRadius:10,
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginRight:5,
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#999'
    },
    listItemFooter:{
        paddingTop:12,
        borderTopWidth:1,
        borderStyle:'solid',
        borderTopColor:'#eee',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
    },
    listItemInfo:{
        paddingBottom:12,
    },
    listItemFooterText:{
        textAlign:'right'
    },
    listItemFooterTextEdit:{
        color:'#333',
        paddingLeft:5
    },
    listItemFooterLeft:{
        alignItems:'center',
    },
    listItemFooterRight:{
        alignItems:'center',
        paddingLeft:10
    },
    listItemFooterLeftBox:{
        flexDirection:'row',
        alignItems:'center',
    },
    addressBtn:{
        backgroundColor:'#d71e31',
        height:50
    },
    addressBtnText:{
        color:'#fff',
        lineHeight:50,
        textAlign:'center',
        fontSize:18
    },
    listItemInfoText:{
        lineHeight:30
    }
})

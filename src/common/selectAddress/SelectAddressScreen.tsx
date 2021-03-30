import React, { Component } from "react";
import {View, Text,TouchableOpacity, ScrollView,StyleSheet} from "react-native";
import Headers from "@/Components/header/Headers";
let studentData=require('@/utils/city_code.json')||[];
export default class SelectAddressScreen extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            provinceList:[],
            provinceName:null,
            provinceCode:null,
            urbanAreaList:[],
            urbanAreaName:null,
            urbanAreaCode:null,
            countyList:[],
            countyName:null,
            countyCode:null,
        };
    };

    componentDidMount(){
        let provinceList=[];
        studentData.forEach(item=>{
            provinceList.push({code:item.code,name:item.name})
        });
        this.setState({
            provinceList
        })
    }
    ///选择省份
    onSelectProvinceList=(data,index)=>{
        if(this.state.provinceName+''==='' || this.state.provinceName===null){
            let urbanAreaList=[];
            studentData.forEach(item=>{
                if(item.code+''===data.code+''){
                    urbanAreaList= item.city||[];
                }
            });
            this.setState({
                provinceList:urbanAreaList,
                urbanAreaList:urbanAreaList,
                provinceName:data.name,
                provinceCode:data.code,
                urbanAreaName:null,
                urbanAreaCode:null,
                countyName:null,
                countyCode:null
            })
        }else if(this.state.urbanAreaName+''==='' || this.state.urbanAreaName===null){
            this.setState({
                provinceList:data.area||[],
                countyList:data.area||[],
                urbanAreaName:data.name,
                urbanAreaCode:data.code,
                countyName:null,
                countyCode:null
            },()=>{
                if(data.area.length===0){
                    this.setState({
                        countyName:data.name,
                        countyCode:data.code,
                    },()=>{
                        let params={
                            provinceName:this.state.provinceName,
                            provinceCode:this.state.provinceCode,
                            urbanAreaName:this.state.urbanAreaName,
                            urbanAreaCode:this.state.urbanAreaCode,
                            countyName:'',
                            countyCode:'',
                        }
                        this.props.navigation.goBack();
                        this.props.route.params.onSelect({params:params,type:'selectAddress'});
                    })
                }
            })
        }else{
            this.setState({
                countyName:data.name,
                countyCode:data.code,
            },()=>{
                let params={
                    provinceName:this.state.provinceName,
                    provinceCode:this.state.provinceCode,
                    urbanAreaName:this.state.urbanAreaName,
                    urbanAreaCode:this.state.urbanAreaCode,
                    countyName:this.state.countyName,
                    countyCode:this.state.countyCode,
                }
                this.props.navigation.goBack();
                this.props.route.params.onSelect({params:params,type:'selectAddress'});
            })
        }
    }

    selectCity=(type)=>{
        switch (type) {
            case '1':
                let provinceList=[];
                studentData.forEach(item=>{
                    provinceList.push({code:item.code,name:item.name})
                });
                this.setState({
                    provinceList,
                    provinceName:null,
                    provinceCode:null,
                    urbanAreaName:null,
                    urbanAreaCode:null,
                    countyName:null,
                    countyCode:null
                })
                break;
            case '2':
                let urbanAreaList = [...this.state.urbanAreaList];
                this.setState({
                    provinceList:urbanAreaList,
                    urbanAreaName:null,
                    urbanAreaCode:null,
                    countyName:null,
                    countyCode:null
                })
                break;
            case '3':
                let countyList = [...this.state.countyList];
                this.setState({
                    provinceList:countyList,
                    countyName:null,
                    countyCode:null
                })
                break;
        }
    }

    onSubmit=()=>{
        let params={
            provinceName:this.state.provinceName,
            provinceCode:this.state.provinceCode,
            urbanAreaName:this.state.urbanAreaName,
            urbanAreaCode:this.state.urbanAreaCode,
            countyName:this.state.countyName,
            countyCode:this.state.countyCode,
        }
        this.props.navigation.goBack();
        this.props.route.params.onSelect({params:params,type:'selectAddress'});
    }

    render() {
        return (
            <View style={styles.AddMyAddress}>
                <Headers
                    leftIcon={'left'}
                    leftColor={'#666'}
                    border={true}
                    backgroundColor={'#fff'}
                    title={'选择地址'}
                    centerColor={'#666'}
                    {...this.props}
                />
                <View style={{flex:1}}>
                    <View style={styles.tabsBox}>
                        <View style={[styles.tabsBoxItem,(this.state.provinceName+''==='' || this.state.provinceName===null)?styles.selectTabsBoxItem:null]}>
                            <TouchableOpacity onPress={()=>{
                                this.selectCity('1')
                            }}>
                                <Text numberOfLines={1} style={styles.tabsBoxText}>{this.state.provinceName||'请选择'}</Text>
                            </TouchableOpacity>
                        </View>
                        {(this.state.provinceName+''==='' || this.state.provinceName===null)?null: <View style={[styles.tabsBoxItem,(this.state.urbanAreaName+''==='' || this.state.urbanAreaName===null)?styles.selectTabsBoxItem:null]}>
                            <TouchableOpacity onPress={()=>{
                                this.selectCity('2')
                            }}>
                                <Text numberOfLines={1} style={styles.tabsBoxText}>{this.state.urbanAreaName||'请选择'}</Text>
                            </TouchableOpacity>
                        </View>}
                        {(this.state.provinceName+''==='' || this.state.provinceName===null ||this.state.urbanAreaName+''==='' || this.state.urbanAreaName===null)?null: <View style={[styles.tabsBoxItem,styles.selectTabsBoxItem]}>
                            <TouchableOpacity onPress={()=>{
                                this.selectCity('3')
                            }}>
                                <Text numberOfLines={1} style={styles.tabsBoxText}>{this.state.countyName||'请选择'}</Text>
                            </TouchableOpacity>
                        </View>}
                    </View>
                    <ScrollView style={styles.scrollViewBox}>
                        {this.state.provinceList.map((item,index)=>{
                            return (
                                <TouchableOpacity key={index+''} onPress={()=>{
                                    this.onSelectProvinceList(item,index)
                                }}>
                                    <View style={styles.listitem}>
                                        <Text style={styles.cityName}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    AddMyAddress:{
        backgroundColor:'#fff',
        flex:1
    },
    addressBtn:{
        height:50,
        backgroundColor:'#d71e31',
    },
    addressBtnText:{
        textAlign:'center',
        color:'#fff',
        lineHeight:50,
        fontSize:18
    },
    tabsBox:{
        height:50,
        backgroundColor:'#fff',
        paddingLeft:12,
        paddingRight:12,
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        borderStyle:'solid',
        flexDirection:'row'
    },
    tabsBoxText:{
        lineHeight:50,
        color:'#999',
        textAlign:'center',
    },
    cityName:{
        lineHeight:50,
        color:'#999'
    },
    scrollViewBox:{
        paddingLeft:12,
        paddingRight:12,
    },
    listitem:{
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        borderStyle:'solid'
    },
    tabsBoxItem:{
        width:100,
    },
    selectTabsBoxItem:{
        borderBottomWidth:2,
        borderBottomColor:'#d71e31',
        borderStyle:'solid'
    }
})

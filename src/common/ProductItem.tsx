//@ts-nocheck
import { colors, icons, main, texts } from '@/assess/styles'
import { size } from '@/utils'
import React from 'react'
import {Button, Icon} from '@ant-design/react-native'
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native'
import constant from "@/utils/constant";
export type ProductItem = {
    image?:any
    title?:string
    intro?:string
    price?:number
    originPrice?:number
    sales?:number
}

type ProductGroupItem = {
    title?:string
    intro?:string
    image?:any
    more?:boolean
    products?:ProductItem[]
}


export interface ProductListItem extends ProductItem{
    last?:boolean
}


export const Product = (item,idx,props)=>{
    return (
        <TouchableOpacity key={'product_item_'+idx} onPress={()=>{
            props.navigation.push('productDetails',{id:item.id,productType:item.productType})
        }}>
            <View style={[{width:view_size},styles.mt,idx===1?null:styles.border,styles.pd,main.row]}>
                {props.phone+''===constant.userPHONE+''?null:<View style={[styles.leftImgBox,{borderRadius:5,overflow:'hidden'}]}>
                    <Image style={{width:size(108),height:size(98),backgroundColor:'#eee'}} source={item.image}/>
                </View>}
            <View style={[main.full,main.sp,{marginLeft:8}]}>
               <View>
                    <Text>{item.title}</Text>
                    <Text>{item.intro}</Text>
               </View>
               <View style={[main.row,main.rowVCenter]}>
                   <View style={[main.full,main.column]}>
                        <Text style={styles.price}>
                            <Text style={styles.priceUnit}>金币</Text>
                            {item.price}
                            <Text style={styles.originOriginText}>{'   原价'}
                            <Text style={[styles.originOrigin,{textDecorationLine:'line-through'}]}>金币 {item.originPrice}</Text>
                            </Text>
                        </Text>
                        <Text style={styles.saled}>已售{item.salesVolume}件</Text>
                   </View>
                   <View>
                       <Image style={icons.round} source={require('@/assess/images/icons/icon_shopcard.png')}/>
                   </View>
               </View>
            </View>
        </View>
        </TouchableOpacity>
    )
}


export const TeamMarketProduct = (props:ProductListItem)=>{
    return (
        <View style={[{width:view_size},styles.mt,!props.last?styles.border:null,styles.pd,main.row]}>
            <View  style={{width:size(108),height:size(98),backgroundColor:'#eee'}}>
               <Image style={{width:size(108),height:size(98)}} source={props.image}/>
            </View>
            <View style={[main.full,main.sp,{marginLeft:8}]}>
               <View>
                    <Text style={TeamMarketProductStyles.title}>{props.title}</Text>
                    <Text>{props.intro}</Text>
               </View>
               <View style={[main.row,main.rowVCenter]}>
                   <View style={[main.full,main.column]}>
                       <View style={[main.rowVCenter]}>
                            <Text style={[styles.originOriginText,TeamMarketProductStyles.originOriginText]}>{'原价'}<Text style={styles.originOrigin}>￥{props.originPrice}</Text> </Text>
                            <Text style={TeamMarketProductStyles.extra}>爆款拼团中</Text>
                       </View>
                        <Text style={[styles.price,TeamMarketProductStyles.price]}>
                            <Text style={styles.priceUnit}>￥</Text>
                            {props.price}
                        </Text>
                        <Text style={styles.saled}>已售{props.sales}件</Text>
                   </View>
                   <View>
                       <Image style={icons.round} source={require('@/assess/images/icons/icon_shopcard.png')}/>
                   </View>
               </View>

            </View>
        </View>
    )
}

export const ProductGroup = (props:ProductGroupItem)=>{
    const products = props.products || []
    const total = products.length;
    return (
        <View style={[main.columnCenter,styles.container,styles.mt]}>
            <View style={[main.column,{width:view_size,backgroundColor:'#fff'}]}>
                <View style={styles.producGroupHead}>
                    <Text style={texts.boldTitle}>{props.title}</Text>
                </View>
                <View style={[main.rowVCenter,styles.mb]}>
                    <View style={[main.full]}>
                        <Text style={texts.intro}>{props.intro}</Text>
                    </View>
                    {props.more?<View style={[main.rowVCenter]}>
                       <TouchableOpacity onPress={()=>{
                           props.navigation.push(props.filePath)
                       }}>
                           <View style={[main.rowVCenter]}>
                               <Text style={texts.intro}>查看更多</Text>
                               <Icon name={'right'} size={16} color={'#999'} />
                           </View>
                       </TouchableOpacity>
                    </View>:null}
                </View>
                {props.phone+''===constant.userPHONE+''?null:<TouchableOpacity onPress={()=>{
                    props.navigation.push('productDetails',{id:props.id,productType:props.productType})
                }}>
                    <View style={{backgroundColor:'#eee',borderRadius:5,overflow:'hidden'}}>
                        <Image style={{width:view_size,height:size(143)}} source={props.image}/>
                    </View>
                </TouchableOpacity>}
            </View>
            {products.map((i,idx)=>{
                return Product(i,idx,props);
            })}
        </View>
    )
}

export const view_size = size(351)

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff'
    },
    mt:{
        marginTop:16
    },
    mb:{
        marginBottom:16
    },
    pd:{
        paddingBottom:16
    },
    bannber:{
        width:view_size,
        height:size(156),
    },
    announcement:{
        width:view_size,
        height:size(33),
        padding:size(4),
        borderRadius:4
    },
    wrapper: {

    },
    slide: {
      flex: 1,
      borderRadius:8,
      overflow:'hidden',
      backgroundColor:'#fff',
      ...main.rowVCenter
    },

    shadow:{
        backgroundColor:'#fff',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowColor: '#000000',
        elevation: 4,
    },
    announcementText:{
        color: colors.subtitle,
        fontSize:size(13)
    },
    menus:{
        width:view_size,
        height:size(83),
        borderRadius:4
    },
    menu:{
       width:size(45)
    },
    sign:{
        width:view_size,
    },
    signImage:{
        width:view_size,
        height:size(100)
    },

    border:{
        borderBottomWidth:1,
        borderBottomColor:'#ccc'
    },
    saled:{
        color:'#F927A1',
        backgroundColor:'#FF3D4F30',
        width:size(83),
        textAlign:'center',
        borderRadius:2,
        fontSize:size(12),
        paddingVertical:2,
        fontWeight:'100'
    },
    price:{
        color:'#F927A1',
        fontSize:size(16),
        fontWeight:'100'
    },
    priceUnit:{
        fontSize:size(10),
    },
    originOriginText:{
        color:colors.normal,
        fontSize:size(10),
        marginLeft:10
    },
    originOrigin:{
        textDecorationLine:'line-through'
    },
    producGroupHead:{
        borderLeftWidth:3,
        borderLeftColor: colors.primary,
        paddingLeft:4,
        marginTop:8,
        marginBottom:4
    }

  })


const TeamMarketProductStyles = StyleSheet.create({
    title:{
        color:'#4E4E4E',
        fontSize:size(16),
        fontWeight:'bold'
    },
    extra:{
        color:colors.primary,
        borderColor:colors.primary,
        borderWidth:size(1),
        padding:size(1),
        width:size(80),
        textAlign:'center'
    },
    price:{
        fontSize:size(18)
    },
    leftImgBox:{
        borderRadius:10,
        overflow:'hidden'
    }
})

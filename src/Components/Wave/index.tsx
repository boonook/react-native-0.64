import React from 'react';
import {View,Dimensions,StyleSheet} from 'react-native';
// @ts-ignore
import {Surface,Shape,Path} from '@react-native-community/art'


const screen = Dimensions.get('window')


export default class Wave extends React.Component<any,any> {
    static defaultProps = {
        surfaceWidth: Dimensions.get('window').width,
        surfaceHeigth: 189,
        speed:2,
        drawCount:1.5,
        waves:[
            {
                offset:0,
                fill:'#00000090',
                speed:2,
                position:0.3,
                height:0.5
            },
            {
                offset:Math.PI,
                fill:'#00ff0090',
                speed:2,
                position:0.3,
                height:0.5
            },
            {
                offset:Math.PI * 0.1,
                fill:'#fff',
                speed:2,
                position:0,
                height:0.25
            },
        ]
    }


    constructor(props) {
        super(props);
        this.surfaceWidth = this.props.surfaceWidth;
        this.surfaceHeigth = this.props.surfaceHeigth;
        this.speed = this.props.speed
        this.state = {
            a: 0
        };
    }
    componentDidMount() {
        this.intervalTimer && clearInterval(this.intervalTimer)
        this.intervalTimer = setInterval(() => {
            let a = this.state.a
            a += 0.01
            if (a >=1) {
                a = 0
            }
            this.setState({
                a: a
            })
        },140)
    }

    componentWillUnmount() {
        this.intervalTimer && clearInterval(this.intervalTimer)
    }

//绘制渐变的背景
    artBg() {
        const w = this.props.surfaceWidth
        const h = this.props.surfaceHeigth
        const pathBase = new Path()
            .moveTo(0,0) // 改变起点为 0,5 。默认为0,0
            .lineTo(w,0) // 目标点
            .lineTo(w,h) // 目标点
            .lineTo(0,h) // 目标点
            .close();

        const waves = this.props.waves || [];
        return <View style={{ backgroundColor: 'rgba(0,0,0,0.0)' }}>
            <Surface width={this.surfaceWidth} height={this.surfaceHeigth} >
                {waves.map(i=>this.wave(i.offset,i.fill,i.position,i.height,i.speed,i.drawCount))}
            </Surface>
        </View>
    }



    /**
     * 绘制波浪 采用正弦函数绘制
     * @param {number} offset x周偏移
     * @param {string} fl 填充颜色
     * @param {number} startY 位置 0-1
     * @param {number} waveHeight 波形高度 0-1
     * @param {number} speed 2的整数倍 否则动画不连续
     */
    wave(offset,fl,startY,waveHeight,speed,drawCount){
        const pathBase = new Path()
        const w = this.props.surfaceWidth
        const h = this.props.surfaceHeigth
        const a = this.state.a
        const dots = 100
        const dispdot = w/dots

        if(!speed){
            speed = this.props.speed
        }
        if(waveHeight<0 || waveHeight>1){
            waveHeight = 1
        }
        if(startY<0 || startY>1) {
            startY = 0
        }

        if(!drawCount){
            drawCount = this.props.drawCount
        }
        const rpdot = Math.PI * drawCount / w
        const r = h * 0.5 * waveHeight
        pathBase.moveTo(0,h) // 改变起点为 0,5 。默认为0,0
        for( let i = 0; i <=dots; i ++ ){
            let x = dispdot * i;
            let y =  r * Math.sin(rpdot * x  + Math.PI + offset + a * Math.PI * speed);
            y+=r
            pathBase.lineTo( x, (h - y ) - h * startY);
        }
        pathBase.lineTo(w,h) // 目标点
        pathBase.lineTo(0, h);
        pathBase.close();
        return  <Shape d={pathBase} fill={fl} key={'aa_'+Math.random()}/>
    }

    // 正弦曲线公式： y = A sin(Bx + C) + D

    // A 控制振幅，A 值越大，波峰和波谷越大，A 值越小，波峰和波谷越小；
    // B 值会影响周期，B 值越大，那么周期越短，B 值越小，周期越长。
    // C 值会影响图像左右移动，C 值为正数，图像右移，C 值为负数，图像左移。
    // D 值控制上下移动。

//绘制波浪


    render() {
        return (
            <View style={[this.props.style,{ width: this.props.surfaceWidth, height: this.props.surfaceHeigth,}]}>
                {this.artBg()}
                <View style={styles.children}>
                    {this.props.children}
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: 'rgba(0,0,0,0.0)',
         position:'relative',

    },
    children:{
        position:'absolute',
        left:0,
        right:0,
        bottom:0,
        top:0,
        backgroundColor:'transparent',

        overflow:'hidden'
    }
})

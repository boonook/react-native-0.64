import React from "react";
import {View, ScrollView, StatusBar, Text, StyleSheet,} from 'react-native';
import Headers from "@/Components/header/Headers";
import theme from '@/theme/theme.js'

export default class AcceptNewcreen extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor('#fff')
        });
    }

    _onClickRightBtn=()=>{
        this.props.navigation.push('inTheJoinTask')
    }

    render() {
        return(
            <View style={{ flex:1,backgroundColor:"#f8f8f8"}}>
                <Headers
                    border={true}
                    backgroundColor={'#fff'}
                    title={'任务中心'}
                    centerColor={'#666'}
                    rightColor={'#666'}
                    onClickRightBtn={()=>this._onClickRightBtn()}
                    rightTitle={'已参与任务'}
                    {...this.props}
                />
                <ScrollView style={{flex:1}}>
                    <View>
                        <Text>任务中心</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})


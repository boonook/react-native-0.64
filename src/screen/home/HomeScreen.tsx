import React from "react";
import {View, StyleSheet, Text, ScrollView, StatusBar} from 'react-native';
import Headers from '@/Components/header/Headers'
export default class HomeScreen extends React.Component<any,any> {

    constructor(props:any) {
        super(props);
        this.state = {

        };
    }


    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor('#fff')
        });
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#eee'}}>
                <Headers
                    title={'首页'}
                    border={true}
                    backgroundColor={'#fff'}
                    centerColor={'#666'}
                    {...this.props}
                />
                <ScrollView>
                    <View>
                        <Text>首页</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})


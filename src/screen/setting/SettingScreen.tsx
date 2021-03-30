import React, { useState,useEffect } from "react";
import { View, Text} from 'react-native';
import {Button,Provider,Modal} from '@ant-design/react-native'

const SettingScreen = (props) => {
    const [visible,setVisible] = useState(false);

    function onClose(){
        setVisible(false)
        this.setState({
            visible:false
        })
    }

    return(
        <Provider>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button onPress={() =>setVisible(true)}>
                    popup
                </Button>
                <Text>SettingScreen Screen</Text>
                <Modal
                    popup
                    visible={visible}
                    animationType="slide-up"
                    onClose={onClose}
                >
                    <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
                        <Text style={{ textAlign: 'center' }}>Content...</Text>
                        <Text style={{ textAlign: 'center' }}>Content...</Text>
                    </View>
                    <Button type="primary" onPress={this.onClose2}>
                        close modal
                    </Button>
                </Modal>
            </View>
        </Provider>
    )
}

export default SettingScreen;

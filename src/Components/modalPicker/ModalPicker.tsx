import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Modal,PickerView} from "@ant-design/react-native";
export default class NewDetailScreen extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            value:undefined
        };
    }

    componentDidMount() {

    }

    onClose=()=>{
        this.props.onClose()
    }

    _onSure=()=>{
        if(this.state.value===undefined||this.state.value===null){
            this.props.onSure(this.props.payTypeIndex)
        }else{
            this.props.onSure(this.state.value)
        }
    }

    onChange=(value)=>{
        this.setState({
            value:value,
        });
    }

    render() {
        return (
            <Modal
                popup
                visible={this.props.visible}
                animationType="slide-up"
                onClose={this.onClose}
            >
                <View style={{height:300}}>
                    <View style={styles.modalHeader}>
                        <View style={styles.modalHeaderLeft}>
                            <TouchableOpacity onPress={this.onClose}>
                                <Text style={{color:'#999'}}>取消</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalHeaderRight}>
                            <TouchableOpacity onPress={this._onSure}>
                                <Text style={styles.modalHeaderRightText}>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <PickerView
                        onChange={this.onChange}
                        value={this.state.value||this.props.payTypeIndex}
                        data={this.props.dataSource}
                        cascade={false}
                    />
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalHeader:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#eee',
        borderStyle:'solid',
        height:44,
        lineHeight:44,
        paddingLeft:15,
        paddingRight:15
    },
    modalHeaderLeft:{
        flex:1,
    },
    modalHeaderRight:{
        flex:1,
    },
    modalHeaderRightText:{
        textAlign:'right',
        color:'#E7232E'
    }
})


import * as React from "react";
import { View, Text ,Button} from 'react-native';

function DrawerScreen({navigation}) {
    return(
        <View style={{ flex: 1}}>
            <Text>DrawerScreen Screen</Text>
            <Button
                title="关闭抽屉"
                onPress={() => {
                    navigation.closeDrawer();
                }}
            />
        </View>
    )
}

export default DrawerScreen;

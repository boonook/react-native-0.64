import {StatusBar} from 'react-native';
import * as React from "react";
export function JRNStatusBar(props) {
        return (
            <StatusBar
                translucent={true}
                hidden={false}
                animated={false}
                backgroundColor="rgba(0,0,0,0.2)"
                barStyle={'light-content'}
                {...props}
            />
        )

}

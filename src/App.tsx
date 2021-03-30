import * as React from 'react';
import Routers from '@/Routers';
import { Provider as ANTDProvider} from '@ant-design/react-native'
import { Provider } from 'mobx-react'
import appState from '@/store/index';
function App() {
    return (
        <ANTDProvider>
            <Provider {...appState}>
                <Routers/>
            </Provider>
        </ANTDProvider>
    );
}

export default App;

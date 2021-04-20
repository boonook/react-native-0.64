/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
console.disableYellowBox = true;///关闭黄屏警告
if(process.env.NODE_ENV !=='development') {
    console.log = function(){}
}
AppRegistry.registerComponent(appName, () => App);

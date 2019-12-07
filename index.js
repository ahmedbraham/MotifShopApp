/**
 * @format
 */
//--------------------------------------------------
import 'react-native-gesture-handler'
//Make sure import 'react-native-gesture-handler'; is the very first line of the index.js
//___________________________________________________


import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

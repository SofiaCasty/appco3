/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { co3App } from './src/co3App';

AppRegistry.registerComponent(appName, () => co3App);

/**
 * @format
 */

 import { AppRegistry } from 'react-native';
 import React from 'react';
 import { Provider } from 'react-redux';
 import App from './App';
 import { name as appName } from './app.json';
 import store from './features/store';
import 'moment/locale/vi'
 const RNRedux = () => {
     return (
         <Provider store={store}>
             <App />
         </Provider>
     )
 }
 
 AppRegistry.registerComponent(appName, () => RNRedux);
 
import React from 'react';
import { Text, View } from 'react-native';
import TabHome from './screens/TabHome';
import { NavigationContainer } from '@react-navigation/native';
const App = () => {
  return (
    <View style={{ flex: 1 }}>
       <NavigationContainer>
        <TabHome />
      </NavigationContainer>
    </View>
  );
};

export default App;

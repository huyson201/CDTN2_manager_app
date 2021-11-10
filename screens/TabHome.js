import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { BLUE1 } from '../src/values/color'; 
// import "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5"
import HotelList from './HotelList';
import NotificationScreen from './NotificationScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

const TabHome = () => {

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size, padding }) => {
                    let iconName = ""
                    let iconColor = "rgba(0,0,0,.5)"
                    switch (route.name) {
                        case "Home":
                            iconColor = focused ?? BLUE1
                            iconName = "home"
                            break;
                        case "Notify":
                            iconColor = focused ?? BLUE1
                            iconName = "bell"
                            break;
                        case "Profile":
                            iconColor = focused ?? BLUE1
                            iconName = "user-alt"
                            break;
                    }

                    return (<Icon name={iconName} color={color} size={size} style={{ paddingBottom: padding }} />)
                }
            })}
        >
            <Tab.Screen name="Home" component={HotelList} options={{ headerShown: false, title: "Home" }} />
            <Tab.Screen name="Notify" component={NotificationScreen} options={{ title: "Notification" }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
        </Tab.Navigator>

    );
};

export default TabHome;
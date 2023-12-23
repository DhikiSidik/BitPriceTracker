import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
import WatchList from "../screens/WatchList";
import { Entypo, FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomNav = () => {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown : false, tabBarActiveTintColor: 'white', tabBarInactiveTintColor: 'grey', tabBarStyle: {backgroundColor: '#181818'}}}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({focused, color}) => (<Entypo name="home" size={focused ? 30 : 25} color={color} />),
            }}/>
            <Tab.Screen name="WatchList" component={WatchList} options={{
                tabBarIcon: ({focused, color}) => (<FontAwesome name="star" size={focused ? 30 : 25} color={color} />),
            }}/>
        </Tab.Navigator>
        )
};

export default BottomNav;
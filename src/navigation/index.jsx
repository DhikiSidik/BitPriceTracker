import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CoinDetailScreen from '../screens/CoinDetail';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
            <Stack.Screen name={"Home"} component={HomeScreen}/>
            <Stack.Screen name={"CoinDetail"} component={CoinDetailScreen}/>
        </Stack.Navigator>
    )
}

export default Navigation;
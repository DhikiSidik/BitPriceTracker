import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoinDetailScreen from '../screens/CoinDetail';
import BottomNav from './ButtonNav';
import AddAsset from "../screens/AddAsset";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator initialRouteName="Root">
            <Stack.Screen name="Root" component={BottomNav} options={{headerShown: false}}/>
            <Stack.Screen name="CoinDetail" component={CoinDetailScreen} options={{headerShown: false}}/>
            <Stack.Screen name="AddAsset" component={AddAsset} options={{title: "Add New Asset", headerStyle: {
                backgroundColor: '#121212',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            }}/>
        </Stack.Navigator>
    )
}

export default Navigation;
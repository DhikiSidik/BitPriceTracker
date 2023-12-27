import React, { Suspense }from "react";
import { View, Text, FlatList } from "react-native";
import PortofolioAsset from './components/portofolioasset';

const PortofolioScreen = () => {
    return (
        <View>
            <Suspense fallback={<Text style={{color: 'white'}}>Loading</Text>}>
                <PortofolioAsset />
            </Suspense>
        </View>
    )
};

export default PortofolioScreen;
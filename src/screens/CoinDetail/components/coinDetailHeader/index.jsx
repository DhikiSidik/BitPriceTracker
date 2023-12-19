import React from "react";
import { View, Text, Image } from 'react-native';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import styles from './style';
import { useNavigation } from "@react-navigation/native";

const CoinDetailedHeader = (props) => {
    const {image, symbol, marketCapRank} = props;
    const navigation = useNavigation();
    return (        
        <View style={styles.headerContainer}>
            <Ionicons name="chevron-back-sharp" size={30} color="white"  onPress={() => navigation.goBack()}/>
            <View style={styles.tickerContainer}>
                <Image source={{uri: image}} style={{width: 25, height:25 }}/>
                <Text style={styles.tickerTittle}>{symbol.toUpperCase()}</Text>
                <View style={styles.rankContainer}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15 }}>#{marketCapRank}</Text>
                </View>
            </View>
            <EvilIcons name="user" size={30} color="white" />
        </View>
    );
};

export default CoinDetailedHeader;
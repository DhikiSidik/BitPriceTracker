import React from "react";
import { View, Text, Image } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import styles from './style';
import { useNavigation } from "@react-navigation/native";
import { useWatchList } from '../../../../contexts/WatchlistContext';

const CoinDetailedHeader = (props) => {
    const { coinId, image, symbol, marketCapRank } = props;
    const navigation = useNavigation();
    const { WatchListCoinId, storeWatchListData, removeWatchlistData } = useWatchList();

    // Ensure WatchListCoinId is an array before calling some method
    const checkIfCoinIsWatchList = () => Array.isArray(WatchListCoinId) && WatchListCoinId.includes(coinId);


    const handWatchList = () => {
        console.log('Button Pressed');
        if (checkIfCoinIsWatchList()) {
          removeWatchlistData(coinId);
        } else {
          storeWatchListData(coinId);
        }
      };
      

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
            <FontAwesome name={checkIfCoinIsWatchList() ? "star" : "star-o"} size={25} color={checkIfCoinIsWatchList() ? "#FFBF00" : "white"} onPress={handWatchList} />
        </View>
    );
};

export default CoinDetailedHeader;

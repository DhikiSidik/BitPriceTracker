import React from "react";
import { Text, View, Image, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const CoinItem = ({ marketCoin }) => {
    const { id, name, current_price, market_cap_rank, price_change_percentage_24h, symbol, market_cap, image, } = marketCoin;

    const navigation = useNavigation();

    const percentageColor = price_change_percentage_24h < 0 ? '#ea3943' : '#16c784' || 'white';

    const normallizeMarketCap = (marketcap) => {
        if (marketcap > 1_000_000_000_000) {
            return `${Math.floor(marketcap / 1_000_000_000_000)} T`;
        } else if (marketcap > 1_000_000_000) {
            return `${Math.floor(marketcap / 1_000_000_000)} B`;
        } else if (marketcap > 1_000_000) {
            return `${Math.floor(marketcap / 1_000_000)} M`;
        } else if (marketcap > 1_000) {
            return `${Math.floor(marketcap / 1_000)} K`;
        }
        return marketcap;
    };
    

    return (
        <Pressable style={styles.coinContainer} onPress={() => navigation.navigate("CoinDetail", {coinId: id})}>
        <Image 
        source={{uri: image}} 
        style={{height: 30, width: 30, marginRight: 10, alignSelf: 'center'}}
        />
        <View>
            <Text style={styles.tittle}>{name}</Text>
            <View style={{flexDirection: 'row'}}>
            <View style={styles.rankContainer}>
                <Text style={styles.rank}>{market_cap_rank}</Text>
            </View>
            <Text style={styles.text}>{symbol.toUpperCase()}</Text>
            <AntDesign name={price_change_percentage_24h < 0 ? 'caretdown' : 'caretup'} size={15} color={percentageColor} style={{alignSelf: 'center', marginRight: 5}}/>
            <Text style={{color: percentageColor}}>{price_change_percentage_24h?.toFixed(2)}%</Text>
            </View>
        </View>
        <View style={{marginLeft: 'auto', alignItems: 'flex-end'}}>
            <Text style={styles.tittle}>{current_price}</Text>
            <Text style={{color: 'white'}}>MCap {normallizeMarketCap(market_cap)}</Text>
        </View>
        </Pressable>
    );
};

export default CoinItem;
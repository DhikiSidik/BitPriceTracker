import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, TextInput, ActivityIndicator } from 'react-native';
import CoinDetailedHeader from "./components/coinDetailHeader";
import styles from "./style";
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import { getDetailedCoinData, getCoinMarketChart } from '../../services/requests';

const CoinDetail = () => {
    const [coin, setCoin] = useState(null);
    const [coinMarketData, setCoinMarketData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [coinValue, setCoinValue] = useState("1");
    const [usdValue, setUsdValue] = useState("2");

    const route = useRoute();
    const { params: { coinId } } = route;

    const fetchCoinData = async () => {
        try {
            setLoading(true);
            const fetchedCoinData = await getDetailedCoinData(coinId);
            const fetchedCoinMarketData = await getCoinMarketChart(coinId);
            setCoin(fetchedCoinData);
            setCoinMarketData(fetchedCoinMarketData);
            setLoading(false);
            setUsdValue(fetchedCoinData.market_data.current_price.usd.toString());
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoinData();
    }, []);

    if (loading || !coin || !coinMarketData) {
        return <ActivityIndicator size="large" />;
    }

    const { image: { small }, symbol, name, market_data: { market_cap_rank, current_price, price_change_percentage_24h }, } = coin;

    const { prices } = coinMarketData;
    const percentageColor = price_change_percentage_24h < 0 ? '#ea3943' : '#16c784';
    const chartColor = current_price.usd > prices[0][1] ? "#16c784" : "#ea3943";
    const screenWidth = Dimensions.get("window").width;

    const formatCurrency = (value) => {
        if (value === "") {
            return `$${current_price.usd.toFixed(2)}`;
        }
        return `$${parseFloat(value).toFixed(2)}`;
    };

    const changeCoinValue = (value) => {
        setCoinValue(value);
        const floatValue = parseFloat(value.replace(',', '.')) || 0;
        setUsdValue((floatValue * current_price.usd).toString());
    };

    const changeUsdValue = (value) => {
        setUsdValue(value);
        const floatValue = parseFloat(value.replace(',', '.')) || 0;
        setCoinValue((floatValue / current_price.usd).toString());
    };

    return (
        <View style={{ paddingHorizontal: 10 }}>
            <CoinDetailedHeader image={small} name={name} symbol={symbol} marketCapRank={market_cap_rank} />
            <View style={styles.priceContainer}>
                <View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.currenPrice}>${current_price.usd}</Text>
                </View>
                <View style={{ paddingHorizontal: 3, paddingVertical: 8, borderRadius: 5, flexDirection: 'row' }}>
                    <AntDesign name={price_change_percentage_24h < 0 ? 'caretdown' : 'caretup'} size={20} color={percentageColor} style={{ alignSelf: 'center', marginRight: 5 }} />
                    <Text style={{ color: percentageColor, fontSize: 17, fontWeight: '500' }}>{price_change_percentage_24h.toFixed(2)}%</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={{ color: 'white', alignSelf: 'center' }}>{symbol.toUpperCase()}</Text>
                    <TextInput style={styles.input} value={coinValue} keyboardType="numeric" onChangeText={changeCoinValue} maxLength={coinValue.includes(',') ? 12 : 9} />
                </View>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={{ color: 'white', alignSelf: 'center' }}>USD</Text>
                    <TextInput style={styles.input} value={usdValue} keyboardType="numeric" onChangeText={changeUsdValue} maxLength={usdValue.includes(',') ? 12 : 9} />
                </View>
            </View>
        </View>
    );
};

export default CoinDetail;

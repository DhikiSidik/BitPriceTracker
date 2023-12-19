import React, {useState} from "react";
import { View, Text, Dimensions, TextInput } from 'react-native';
import Coin from '../../../assets/data/crypto.json';
import CoinDetailedHeader from "./components/coinDetailHeader";
import styles from "./style";
import { AntDesign } from '@expo/vector-icons';

const CoinDetail = () => {
    const { image: { small }, symbol, prices, name, market_data: { market_cap_rank, current_price, price_change_percentage_24h } } = Coin;

    const [coinValue, setCoinValue] = useState("1");
    const [usdValue, setUsdValue] = useState(current_price.usd.toString());
    
    const percentageColor = price_change_percentage_24h < 0 ? '#ea3943' : '#16c784';

    const formatCurrency = (value) => {
        "wordlet";
        if (value == "") {
            return `$${current_price.usd.toFixed(2)}`;
        }
        return `$${parseFloat(value).toFixed(2)}`;
    };

    const changeCoinValue = (value) => {
        setCoinValue(value);
        const floatValue = parseFloat(value.replace(',','.')) || 0
        setUsdValue((floatValue * current_price.usd).toString())
    };

    const changeUsdValue = (value) => {
        setUsdValue(value);
        const floatValue = parseFloat(value.replace(',','.')) || 0
        setCoinValue((floatValue / current_price.usd).toString())
    };
    
    return (
        <View style={{paddingHorizontal: 10}}>
                <CoinDetailedHeader image={small} name={name} symbol={symbol} marketCapRank={market_cap_rank}/>
                <View style={styles.priceContainer}>
                    <View>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.currenPrice}>${current_price.usd}</Text>
                    </View>
                    <View style={{paddingHorizontal: 3, paddingVertical: 8, borderRadius: 5, flexDirection: 'row'}}>
                    <AntDesign name={price_change_percentage_24h < 0 ? 'caretdown' : 'caretup'} size={20} color={percentageColor} style={{alignSelf: 'center', marginRight: 5}}/>
                        <Text style={{color: percentageColor, fontSize: 17, fontWeight: '500'}}>{price_change_percentage_24h.toFixed(2)}%</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <Text style={{color: 'white', alignSelf: 'center'}}>{symbol.toUpperCase()}</Text>
                        <TextInput style={styles.input} value={coinValue} keyboardType="numeric" onChangeText={changeCoinValue} maxLength={coinValue.includes(',') ? 12 : 9}/>
                    </View>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <Text style={{color: 'white', alignSelf: 'center'}}>USD</Text>
                        <TextInput style={styles.input} value={usdValue} keyboardType="numeric" onChangeText={changeUsdValue}  maxLength={usdValue.includes(',') ? 12 : 9}/>
                    </View>
                </View>
        </View>
    );
};

export default CoinDetail;

import React from "react";
import { View, Text, Image} from 'react-native';
import styles from "./style";
import { AntDesign } from '@expo/vector-icons';

const Portofolioitems = ({assetItem}) => {
    const {currentPrice, image, name, priceBought, priceChangePercentage, quantityBought, ticker} = assetItem;
    
    const isChangePositive = () => priceChangePercentage >= 0;

    const renderHoldings = () => (quantityBought * currentPrice).toFixed(2)

    return (
        <View style={styles.container}>
            <Image source={{uri: image}} style={{height: 30, width: 30, marginRight: 10, alignSelf: 'center'}} />
            <View>
                <Text style={styles.titte}>{name}</Text>
                <Text style={styles.ticker}>{ticker}</Text>
            </View>
            <View style={{marginLeft: 'auto'}}>
                <Text style={styles.titte}>${currentPrice}</Text>
                <View style={{flexDirection: 'row'}}>
                <AntDesign name={isChangePositive() ? "caretup" : "caretdown"} size={15} color={isChangePositive() ? "#16c784" : "#ea3943"} style={{ alignSelf: 'center', marginRight: 5 }} />
                    <Text style={{color: isChangePositive() ? "#16c784" : "#ea3943",fontWeight: '600'}}>{priceChangePercentage.toFixed(2)}%</Text>
                </View>
            </View>
            <View style={styles.quanti}>
                <Text style={styles.titte}>${renderHoldings()}</Text>
                <Text style={styles.ticker}>{quantityBought} {ticker}</Text>
            </View>
        </View>
    );
};

export default Portofolioitems;
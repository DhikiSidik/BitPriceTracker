import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import styles from "./style";
import Portofolioitems from '../portofolioitem';
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue, useRecoilState } from "recoil";
import { allPortofolioAssets } from '../../../../atom/potofolioAsset';

const PortofolioAsset = () => {
    const navigation = useNavigation();
    const assets = useRecoilValue(allPortofolioAssets);

    const getCurrentBalance = () => assets.reduce((total, currentAsset) => total + currentAsset.currentPrice * currentAsset.quantityBought, 0);

    const getCurrentValueChange = () => {
        const currenBalance = getCurrentBalance()
        const boughtBalance = assets.reduce((total, currentAsset) => total + currentAsset.priceBought * currentAsset.quantityBought, 0);
        return (currenBalance - boughtBalance).toFixed(2)
    };

    const getCurrentPercentageChange = () => {
        const currentBalance = getCurrentBalance();
        const boughtBalance = assets.reduce((total, currentAsset) => total + currentAsset.priceBought * currentAsset.quantityBought, 0);
    
        if (boughtBalance !== 0) {
            return ((((currentBalance - boughtBalance) / boughtBalance) * 100).toFixed(2) || 0);
        } else {
            return 0;
        }
    };
    

    const isChangePositive = () => getCurrentValueChange() >= 0;

    return (
        <View>
            <FlatList
            data={assets}
            renderItem={({item}) => <Portofolioitems assetItem={item}/>}
            ListHeaderComponent={
                <>
                <View style={styles.balance}>
                    <View>
                        <Text style={styles.currenBalance}>Current Balance</Text>
                        <Text style={styles.balanceValue}>${getCurrentBalance()}</Text>
                        <Text style={{...styles.valueChange, color: isChangePositive() ? 'green' : 'red'}}>${getCurrentValueChange()} (All Time)</Text>
                    </View>
                <View style={{...styles.percenChange, backgroundColor: isChangePositive() ? 'green' : 'red'}}>
                <AntDesign name={isChangePositive() ? "caretup":"caretdown"} size={20} color={"white"} style={{ alignSelf: 'center', marginRight: 5 }} />
                    <Text style={styles.percen}>{getCurrentPercentageChange()}%</Text>
                </View>
                </View>
                    <Text style={styles.asset}>Your Assets</Text>
                </>
            }
            ListFooterComponent={
                <Pressable style={styles.buttonContainer} onPress={() => navigation.navigate("AddAsset")}>
                    <Text style={styles.buttonText}>Add New Asset</Text>
                </Pressable>
            }
            />
        </View>
    )
};

export default PortofolioAsset;
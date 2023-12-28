import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import styles from "./style";
import Portofolioitems from '../portofolioitem';
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue, useRecoilState } from "recoil";
import { allPortofolioAssets,allPortofolioBoughtAssetsInStorage } from '../../../../atom/potofolioAsset';
import { SwipeListView } from 'react-native-swipe-list-view';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";

const PortofolioAsset = () => {
    const navigation = useNavigation();
    const assets = useRecoilValue(allPortofolioAssets);
    const [storageAssets, setStorageAssets] = useRecoilState(allPortofolioBoughtAssetsInStorage);

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

    const onDeleteAssets = async (asset) => {
        const newAssets = storageAssets.filter((coin) => coin.unique_id !== asset.item.unique_id)
        const jasonValue = JSON.stringify(newAssets);
        await AsyncStorage.setItem("@portofolio_coin", jasonValue)
        setStorageAssets(newAssets);
    };

    const renderDeleteButton = (data) => {
        return (
            <Pressable style={{ flex: 1, backgroundColor: '#EA3943', alignItems: 'flex-end', justifyContent: 'center', paddingRight: 27, marginLeft: 20 }} onPress={() => onDeleteAssets(data)}>
                <FontAwesome name="trash-o" size={30} color="white" />
            </Pressable>
        );
    };    

    const isChangePositive = () => getCurrentValueChange() >= 0;

    return (
            <SwipeListView
            data={assets}
            renderItem={({item}) => <Portofolioitems assetItem={item}/>}
            rightOpenValue={-75}
            disableRightSwipe
            keyExtractor={({id}, index) => `${id}${index}`}
            renderHiddenItem={(data) => renderDeleteButton(data)}
            ListHeaderComponent={
                <>
                <View style={styles.balance}>
                    <View>
                        <Text style={styles.currenBalance}>Current Balance</Text>
                        <Text style={styles.balanceValue}>${getCurrentBalance().toFixed(2)}</Text>
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
    )
};

export default PortofolioAsset;
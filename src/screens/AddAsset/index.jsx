import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable } from 'react-native';
import SearchableDropDown from "react-native-searchable-dropdown";
import styles from "./style";
import { useRecoilState } from "recoil";
import { allPortofolioBoughtAssetsInStorage } from '../../atom/potofolioAsset';
import { getAllCoins, getDetailedCoinData } from '../../services/requests';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AddAsset = () => {
    const [allCoins, setAllCoins] = useState([])
    const [boughtAsset, setBoughtAsset] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedCoinId, setSelectedCoinId] =useState(null);
    const [selectedCoin, setSelectedCoin] =useState(null);

    const [assetsInStorage, setAssetsInStorage] = useRecoilState(allPortofolioBoughtAssetsInStorage);

    const navigation = useNavigation();

    const isQuantityEntered = () => boughtAsset === "";

    const fetchAllCoins = async () => {
        if (loading){
            return;
        }
        setLoading(true);
        const allCoins = await getAllCoins();
        setAllCoins(allCoins);
        setLoading(false);
    };

    const fetchCoinInfo = async () => {
        if (loading){
            return;
        }
        setLoading(true);
        const coinInfo = await getDetailedCoinData(selectedCoinId);
        setSelectedCoin(coinInfo);
        setLoading(false);
    };

    useEffect(() => {
        fetchAllCoins();
    }, []);

    useEffect(() => {
        if (selectedCoinId) {
            fetchCoinInfo();
        }
    }, [selectedCoinId]);

    //const { symbol, market_data: { current_price } } = selectedCoin || { market_data: {} };

    const onAddNewAsset = async () => {
        const newAsset = {
            id: selectedCoin.id,
            unique_id: selectedCoin.id+Math.random(0, 1e6),
            name: selectedCoin.name,
            image: selectedCoin.image.small,
            ticker: selectedCoin.symbol.toUpperCase(),
            quantityBought: parseFloat(boughtAsset),
            priceBought: selectedCoin.market_data.current_price.usd,
        }
        const newAssets = [...assetsInStorage, newAsset]
        const jsonValue = JSON.stringify(newAssets);
        await AsyncStorage.setItem('@portofolio_coins', jsonValue)
        setAssetsInStorage(newAssets);
        navigation.goBack();
    };

    return (
        <View style={{flex: 1}}>
            <SearchableDropDown
            items={allCoins}
            onItemSelect={(item) => setSelectedCoinId(item.id)}
            containerStyle={styles.container}
            itemStyle={styles.item}
            itemTextStyle={{color: 'white'}}
            resetValue={false}
            placeholder={selectedCoinId || "Select a coin..."}
            placeholderTextColor= "white"
            textInputProps={{
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1.5,
                    borderColor: "#444444",
                    borderRadius: 5,
                    backgroundColor: '#1e1e1e',
                    color: 'white'
                }
            }}
            />
            {selectedCoin &&(
                <>
                <View style={styles.boughtQuanti}>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                        style={{color: 'white', fontSize: 90}}
                        value={boughtAsset} placeholder="0" keyboardType="numeric" onChangeText={setBoughtAsset}/>
                        <Text style={styles.ticker}>{selectedCoin.symbol.toUpperCase()}</Text>
                    </View>
                    <Text style={styles.price}>${selectedCoin.market_data.current_price.usd} per coin</Text>
                </View>
                <Pressable style={{...styles.buttonContainer, backgroundColor: isQuantityEntered() ? "#303030" : "#4169E1"}} onPress={onAddNewAsset} disabled={isQuantityEntered()}>
                        <Text style={{...styles.buttonText, color: isQuantityEntered() ? "grey" :"white",}}>Add New Asset</Text>
                    </Pressable>
                </>
            )}
        </View>
    );
};

export default AddAsset;
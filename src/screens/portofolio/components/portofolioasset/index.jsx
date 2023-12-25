import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import styles from "./style";
import Portofolioitems from '../portofolioitem';
import { useNavigation } from "@react-navigation/native";

const PortofolioAsset = () => {
    const navigation = useNavigation();
    return (
        <View>
            <FlatList
            data={[{id: 'bitcoin'}]}
            renderItem={({item}) => <Portofolioitems assetItem={item}/>}
            ListHeaderComponent={
                <>
                <View style={styles.balance}>
                    <View>
                        <Text style={styles.currenBalance}>Current Balance</Text>
                        <Text style={styles.balanceValue}>$20000</Text>
                        <Text style={styles.valueChange}>$1000 (All Time)</Text>
                    </View>
                <View style={styles.percenChange}>
                <AntDesign name={"caretdown"} size={20} color={"white"} style={{ alignSelf: 'center', marginRight: 5 }} />
                    <Text style={styles.percen}>1.2%</Text>
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
import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from 'react-native';
import SearchableDropDown from "react-native-searchable-dropdown";
import styles from "./style";

const AddAsset = () => {
    const [ boughtAsset, setBoughtAsset] = useState("")
    return (
        <View style={{flex: 1}}>
            <SearchableDropDown
            items={[]}
            onItemSelect={(item) => console.log(item)}
            containerStyle={styles.container}
            itemStyle={styles.item}
            itemTextStyle={{color: 'white'}}
            resetValue={false}
            placeholder={"Select a coin..."}
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
            <View style={styles.boughtQuanti}>
                <View style={{flexDirection: 'row'}}>
                    <TextInput
                    style={{color: 'white', fontSize: 90}}
                    value={boughtAsset} placeholder="0" keyboardType="numeric" onChangeText={setBoughtAsset}/>
                    <Text style={styles.ticker}>BTC</Text>
                </View>
                <Text style={styles.price}>$4000 per coin</Text>
            </View>
            <Pressable style={styles.buttonContainer} onPress={() => navigation.navigate("AddAsset")}>
                    <Text style={styles.buttonText}>Add New Asset</Text>
                </Pressable>
        </View>
    );
};

export default AddAsset;
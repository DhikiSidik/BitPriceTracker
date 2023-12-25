import React from "react";
import { View, Text, Image} from 'react-native';
import styles from "./style";
import { AntDesign } from '@expo/vector-icons';

const Portofolioitems = () => {
    return (
        <View style={styles.container}>
            <Image source={{uri: ""}} style={{height: 30, width: 30}} />
            <View>
                <Text style={styles.titte}>Bitcoin</Text>
                <Text style={styles.ticker}>BTC</Text>
            </View>
            <View style={{marginLeft: 'auto'}}>
                <Text style={styles.titte}>$4000</Text>
                <View style={{flexDirection: 'row'}}>
                <AntDesign name={"caretdown"} size={20} color={"#16c784"} style={{ alignSelf: 'center', marginRight: 5 }} />
                    <Text style={{color: '#16c784',fontWeight: '600'}}>1.2%</Text>
                </View>
            </View>
            <View style={styles.quanti}>
                <Text style={styles.titte}>$5000</Text>
                <Text style={styles.ticker}>btc</Text>
            </View>
        </View>
    );
};

export default Portofolioitems;
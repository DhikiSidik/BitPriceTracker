import React, { useEffect, useState } from "react";
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useWatchList } from '../../contexts/WatchlistContext';
import CoinItem from '../../components/CoinItem';
import { getWatchListCoins} from '../../services/requests';

const WatchList = () => {
    const {WatchListCoinId} = useWatchList()

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const transformCoinIds = () => WatchListCoinId.join('%2C');
    
    const fetchWatchListed = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            const watchListCoinsData = await getWatchListCoins(transformCoinIds()) || [];
            console.log('Watchlist Coins Data:', watchListCoinsData);
            // Filter the coins based on watchlist
            const filteredCoins = watchListCoinsData.filter((coin) =>
                WatchListCoinId.includes(coin.id)
            );
            setCoins(filteredCoins);
        } catch (error) {
            console.error('Error fetching watchlist data:', error);
        } finally {
            setLoading(false);
        }
    };    

    useEffect(() => {
        fetchWatchListed();
    }, []);

    useEffect(() => {
        fetchWatchListed();
    }, [WatchListCoinId])
    return (
        <FlatList 
        data = {coins}
        renderItem={({item}) => <CoinItem marketCoin={item}/>}
        refreshControl={
            <RefreshControl refreshing={loading} tintColor="white"/>
        }
        />
    )
};

export default WatchList;
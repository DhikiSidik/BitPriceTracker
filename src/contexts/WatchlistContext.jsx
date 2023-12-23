import React, { useContext, createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const WatchListContext = createContext();

export const useWatchList = () => useContext(WatchListContext);

const WatchListProvider = ({ children }) => {
    const [WatchListCoinId, setWatchListCoinId] = useState([]);

    const getWatchListData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@watchlist_coin");
            setWatchListCoinId(jsonValue != null ? JSON.parse(jsonValue) : []);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getWatchListData();
    }, []);

    const storeWatchListData = async (id) => {
        try {
            const newWatchlist = [...WatchListCoinId, id];
            const jsonValue = JSON.stringify(newWatchlist);
            await AsyncStorage.setItem('@watchlist_coin', jsonValue);
            setWatchListCoinId(newWatchlist);
            console.log('Watchlist added:', newWatchlist);
        } catch (e) {
            console.log(e);
        }
    }
    
    const removeWatchlistData = async (id) => {
        const newWatchlist = WatchListCoinId.filter((coinId) => coinId !== id);
        const jsonValue = JSON.stringify(newWatchlist);
        await AsyncStorage.setItem('@watchlist_coin', jsonValue);
        setWatchListCoinId(newWatchlist);
        console.log('Watchlist removed:', newWatchlist);
    }
    
    return(
        <WatchListContext.Provider value={{WatchListCoinId, storeWatchListData, removeWatchlistData}}>
            {children}
        </WatchListContext.Provider>
    )
};

export default WatchListProvider;
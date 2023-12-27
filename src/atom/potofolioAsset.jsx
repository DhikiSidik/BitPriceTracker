import { atom, selector } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getWatchListCoins } from '../services/requests';

export const allPortofolioBoughtAssets = selector({
    key: 'allPortofolioBoughtAssets',
    get: async () => {
        const jsonValue = await AsyncStorage.getItem('@portofolio_coins')
        return jsonValue != null ? JSON.parse(jsonValue) : []
    }
})

export const allPortofolioBoughtAssetsFromAPI = selector({
    key: 'allPortofolioBoughtAssetsFromAPI',
    get: async ({get}) => {
        const boughtPortofolioAssets = get(allPortofolioBoughtAssetsInStorage)
        const portofolioAssetMarketData = await getWatchListCoins(boughtPortofolioAssets.map((portofolioAsset) => portofolioAsset.id).join(','))
    
        const boughtAssets = boughtPortofolioAssets.map((boughtAssets) => {
            const portofolioAsset = portofolioAssetMarketData.filter((item) => boughtAssets.id === item.id)[0]
            return {
                ...boughtAssets,
                currentPrice: portofolioAsset.current_price,
                priceChangePercentage: portofolioAsset.price_change_percentage_24h
            }
        })

        return boughtAssets.sort((item1, item2) => (item1.quantityBought * item1.currentPrice) < (item2.quantityBought * item2.currentPrice))
    }
})

export const allPortofolioAssets = atom({
    key: 'allPortofolioAssets',
    default: allPortofolioBoughtAssetsFromAPI
})

export const allPortofolioBoughtAssetsInStorage = atom({
    key: 'allPortofolioBoughtAssetsInStorage',
    default: allPortofolioBoughtAssets,
}
)

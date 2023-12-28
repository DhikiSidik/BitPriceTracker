import axios from "axios";

const axiosRetry = axios.create({
    retry: 3,
    retryDelay: (retryCount) => {
        return retryCount * 1000;
    },
});

export const getDetailedCoinData = async (coinId) => {
    try {
        const response = await axiosRetry.get(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false&x_cg_demo_api_key=CG-kqzJEH7GPxTDjGfrPV1YKhzT`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getCoinMarketChart = async (coinId) => {
    try {
        const response = await axiosRetry.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1&interval=daily&x_cg_demo_api_key=CG-kqzJEH7GPxTDjGfrPV1YKhzT`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getMarketData = async () => {
    try {
        const response = await axiosRetry.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h&locale=en&x_cg_demo_api_key=CG-kqzJEH7GPxTDjGfrPV1YKhzT`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getWatchListCoins = async (coinIds) => {
    try {
        const response = await axiosRetry.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h&locale=en&x_cg_demo_api_key=CG-kqzJEH7GPxTDjGfrPV1YKhzT`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getAllCoins = async () => {
    try {
        const response = await axiosRetry.get(`https://api.coingecko.com/api/v3/coins/list?include_platform=false&x_cg_demo_api_key=CG-kqzJEH7GPxTDjGfrPV1YKhzT`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
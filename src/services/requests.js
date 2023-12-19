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

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
    'X-RapidAPI-Key': '237e37bfe4mshddc3af16b5f4cf0p15a554jsn0b92190f8361',
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
}

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoExchangeApi = createApi({
    reducerPath: 'cryptoExchangeApi',
    baseQuery: fetchBaseQuery(),
    endpoints: (builder) => ({
        getExchanges: builder.query({
            query: (coinId) => createRequest(`https://coingecko.p.rapidapi.com/exchanges`),
        })
    })
})

export const {useGetExchangesQuery} = cryptoExchangeApi;

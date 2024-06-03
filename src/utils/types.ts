export const TON_CENTER_URL = 'https://toncenter.com/api/v2';
export const TON_CENTER_URL_TESTNET = 'https://testnet.toncenter.com/api/v2';
export const COINGENCKO_URL = 'https://api.coingecko.com/api/v3';

export enum ApiEndpoints {
    GetAddressBalance = 'getAddressBalance',
    GetDollarExchangeRate = 'simple/price?ids=the-open-network&vs_currencies=usd',
}

export interface IAddressBalance {
    ok: boolean 
    result: string
} 

export interface IDollarExchangeRateData {
    'the-open-network':{
        usd: number
    }
}

export interface IDollarExchangeRate {
    ok: boolean 
    result: number | string
}
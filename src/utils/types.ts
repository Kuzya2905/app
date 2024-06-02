export const BASE_URL = 'https://testnet.toncenter.com/api/v2';

export enum ApiEndpoints {
    GetAddressBalance = 'getAddressBalance'
}

export interface IAddressBalance {
    ok: boolean | string
    result: string
} 
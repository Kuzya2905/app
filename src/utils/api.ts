import { ApiEndpoints, TON_CENTER_URL, IAddressBalance, COINGENCKO_URL, IDollarExchangeRateData, IDollarExchangeRate} from './types';

export const getAddressBalance = async (userAddress: string) : Promise<IAddressBalance> => {     
    try {
        const response = await fetch(`${TON_CENTER_URL}/${ApiEndpoints.GetAddressBalance}?address=${userAddress}`);
        if (!response.ok) {
            return { ok: false, result: 'Network response was not ok' };
        }

        const data: IAddressBalance = await response.json(); 
        return data;

    } catch (err) {
        console.error('Failed to fetch rate:', err);
        return { ok: false, result: 'Failed to fetch rate' };
    }
    
}

export const getDollarExchangeRate = async (): Promise<IDollarExchangeRate> => {
    try {
        const response = await fetch(`${COINGENCKO_URL}/${ApiEndpoints.GetDollarExchangeRate}`);

        if (!response.ok) {
            return { ok: false, result: 'Network response was not ok' };
        }

        const data:IDollarExchangeRateData = await response.json(); 
        return { ok: true, result: data['the-open-network'].usd };

    } catch (err) {
        console.error('Failed to fetch rate:', err);
        return { ok: false, result: 'Failed to fetch rate' };
    }
}
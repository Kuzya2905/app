import { ApiEndpoints, BASE_URL, IAddressBalance } from './types';

export const getAddressBalance = async (userAddress: string) : Promise<IAddressBalance> => {     
    try {
        const response = await fetch(`${BASE_URL}/${ApiEndpoints.GetAddressBalance}?address=${userAddress}`);
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
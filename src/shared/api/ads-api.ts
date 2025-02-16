import axios from 'axios'
import { IAd } from '@shared/types/ad-types'
import { ENV } from '@app/config/env'

const apiClient = axios.create({
    baseURL: ENV.API_URL,
    headers: { 'Content-Type': 'application/json' },
})

// Передаём опциональный AbortSignal для отмены запроса
export const getAds = async (params?: any, signal?: AbortSignal): Promise<IAd[]> => {
    const response = await apiClient.get<IAd[]>('/items', { params, signal });

    return response.data.map((ad, index) => ({
        ...ad,
        id: ad.id,
    }));
};



export const getAdById = async (id: number, signal?: AbortSignal): Promise<IAd> => {
    const response = await apiClient.get<IAd>(`/items/${id}`, { signal });

    return response.data;
};


export const updateAd = async (id: number, adData: Partial<IAd>): Promise<IAd> => {
    const response = await apiClient.put<IAd>(`/items/${id}`, adData);
    return response.data;
};

export const createAd = async (adData: Partial<IAd>): Promise<IAd> => {
    const response = await apiClient.post<IAd>('/items', adData);
    return response.data;
};



export const deleteAd = async (id: number): Promise<void> => {
    await apiClient.delete(`/items/${id}`);
};


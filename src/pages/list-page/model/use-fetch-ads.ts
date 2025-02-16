import { useState, useEffect } from 'react';
import { IAd } from '@shared/types/ad-types';
import { getAds } from '@shared/api/ads-api';

export interface UseFetchAdsParams {
    search?: string;
    category?: string;
    [key: string]: any;
}

export const useFetchAds = () => {
    const [ads, setAds] = useState<IAd[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            try {
                const data = await getAds();
                setAds(data);
            } catch (err: any) {
                setError(err.message || 'Ошибка при получении объявлений');
            } finally {
                setLoading(false);
            }
        };
        fetchAds();
    }, []);

    return { ads, loading, error};
};


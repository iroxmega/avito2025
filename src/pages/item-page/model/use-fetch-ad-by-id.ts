import { useState, useEffect } from 'react';
import { IAd } from '@shared/types/ad-types';
import { useParams } from 'react-router-dom';
import { getAdById } from '@shared/api/ads-api';

export const useFetchAdById = () => {
    const { id } = useParams<{ id: string }>();
    const parsedId = id !== undefined ? Number(id) : NaN;
    const [ad, setAd] = useState<IAd | null>(null);
    const [loading, setLoading] = useState<boolean>(!isNaN(parsedId));
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isNaN(parsedId)) return;

        let isMounted = true;
        const controller = new AbortController();

        const fetchAd = async () => {
            try {
                setLoading(true);
                const data = await getAdById(parsedId, controller.signal);
                if (isMounted) {
                    setAd(data);
                    setError(null);
                }
            } catch (err: any) {
                if (err.name !== 'AbortError' && isMounted) {
                    setError(err.message || 'Ошибка при получении объявления');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchAd();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [parsedId]);

    return { ad, loading, error };
};

import { useState, useEffect } from 'react';
import { IAd } from '@shared/types/ad-types';
import { useParams } from 'react-router-dom';
import { getAdById } from '@shared/api/ads-api';

interface UseFormAdReturn {
    formState: Partial<IAd>;
    setFormState: (form: Partial<IAd>) => void;
    updateField: (field: string, value: any) => void;
    loading: boolean;
    error: string | null;
    isEditing: boolean;
}

const defaultFormState: Partial<IAd> = {
    name: '',
    description: '',
    location: '',
    type: '',
    image: '',
};

export const useFormAd = (): UseFormAdReturn => {
    const { id } = useParams<{ id: number }>();
    const [formState, setFormState] = useState<Partial<IAd>>(() => {
        if (!id) {

            const draft = localStorage.getItem('adDraft');
            return draft ? JSON.parse(draft) : defaultFormState;
        }
        return defaultFormState;
    });
    const [loading, setLoading] = useState<boolean>(!!id);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const controller = new AbortController();
            const fetchAd = async () => {
                try {
                    const data = await getAdById(id, controller.signal);
                    if (data.id === undefined || data.id === null) {
                        throw new Error('Ошибка: не удалось загрузить объявление');
                    }


                    console.log('🔍 Полученное объявление:', data);
                    setFormState(prev => ({ ...prev, ...data }));
                    localStorage.removeItem('adDraft');
                } catch (err: any) {
                    if (err.code === 'ERR_CANCELED') {
                        return;
                    }
                    console.log(err);
                    setError(err.message || 'Ошибка при получении объявления');
                } finally {
                    setLoading(false);
                }
            };

            fetchAd();
            return () => controller.abort();
        }
    }, [id]);

    const updateField = (field: string, value: any) => {
        setFormState(prev => {
            const updated = { ...prev, [field]: value };
            localStorage.setItem('adDraft', JSON.stringify(updated));
            return updated;
        });
    };

    return {
        formState,
        setFormState,
        updateField,
        loading,
        error,
        isEditing: id !== undefined && id !== null

    };

};

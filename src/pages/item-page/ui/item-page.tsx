import React, { useEffect } from 'react';
import { useFetchAdById } from '../model/use-fetch-ad-by-id';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
    CircularProgress,
    Grid,
} from '@mui/material';
import { useNotification } from '@app/providers/notification-provider';

export const ItemPage: React.FC = () => {
    const { ad, loading, error } = useFetchAdById();
    const navigate = useNavigate();
    const { notify } = useNotification();

    useEffect(() => {
        if (error) {
            notify(error, 'error');
        }
    }, [error, notify]);

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (loading) {
        return (
            <Container sx={{ mt: 4, textAlign: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!ad) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography color="error">Объявление не найдено</Typography>
            </Container>
        );
    }

    const handleEdit = () => {
        navigate(`/form/${ad.id}`);
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Card>
                <CardMedia
                    component="img"
                    height="300"
                    image={ad.image || 'https://dummyimage.com/300x160/cccccc/ffffff&text=No+Image'}
                    alt={ad.name}
                />
                <CardContent>
                    <Typography variant="h5">{ad.name}</Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        {ad.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Локация: {ad.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Категория: {ad.type}
                    </Typography>
                    {ad.type === 'Недвижимость' && (
                        <>
                            <Typography>Тип недвижимости: {ad.propertyType}</Typography>
                            <Typography>Площадь: {ad.area} кв.м</Typography>
                            <Typography>Комнат: {ad.rooms}</Typography>
                            <Typography>Цена: {ad.price} руб.</Typography>
                        </>
                    )}
                    {ad.type === 'Авто' && (
                        <>
                            <Typography>Марка: {ad.brand}</Typography>
                            <Typography>Модель: {ad.model}</Typography>
                            <Typography>Год: {ad.year}</Typography>
                            <Typography>Пробег: {ad.mileage} км</Typography>
                        </>
                    )}
                    {ad.type === 'Услуги' && (
                        <>
                            <Typography>Тип услуги: {ad.serviceType}</Typography>
                            <Typography>Опыт: {ad.experience} лет</Typography>
                            <Typography>Стоимость: {ad.cost} руб.</Typography>
                            {ad.workSchedule && <Typography>График: {ad.workSchedule}</Typography>}
                        </>
                    )}
                    <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
                        <Button variant="outlined" onClick={handleBack}>
                            Назад
                        </Button>
                        <Button variant="contained" onClick={handleEdit}>
                            Редактировать
                        </Button>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};

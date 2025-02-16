import React, { useState, useMemo } from 'react';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CircularProgress,
    MenuItem,
    Pagination,
    TextField,
    Collapse,
    CardActions,
    Button
} from '@mui/material';
import { useFetchAds } from '../model/use-fetch-ads';
import { useNotification } from '@app/providers/notification-provider';
import { useDebounce } from '@shared/lib/hooks/use-debounce';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '@shared/ui/search-input';

const CATEGORY_OPTIONS = ['Недвижимость', 'Авто', 'Услуги'];

export const ListPage: React.FC = () => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);
    const [category, setCategory] = useState('');
    const [page, setPage] = useState(1);
    const adsPerPage = 5;
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const { ads, loading, error } = useFetchAds();
    const { notify } = useNotification();
    const navigate = useNavigate();

    const filteredAds = useMemo(() => {
        let filtered = ads || [];

        if (debouncedSearch) {
            filtered = filtered.filter(ad =>
                ad.name.toLowerCase().includes(debouncedSearch.toLowerCase())
            );
        }

        if (category) {
            filtered = filtered.filter(ad => ad.type === category);
        }

        return filtered;
    }, [ads, debouncedSearch, category]);

    const paginatedAds = useMemo(() => {
        const start = (page - 1) * adsPerPage;
        return filteredAds.slice(start, start + adsPerPage);
    }, [filteredAds, page, adsPerPage]);

    if (loading) return <CircularProgress />;
    if (error) {
        notify(error, 'error');
        return <Typography color="error">{error}</Typography>;
    }

    const handleCreateAd = () => {
        navigate('/form');
    };

    const toggleExpand = (id: number) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    //Сбрасываем страницу при изменении поиска или категории
    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCategory(event.target.value as string);
        setPage(1);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={4}>
                    <SearchInput
                        value={search}
                        onChange={handleSearchChange}
                        onClear={() => handleSearchChange('')}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        select
                        label="Категория"
                        value={category}
                        onChange={handleCategoryChange}
                        fullWidth
                    >
                        <MenuItem value="">Все</MenuItem>
                        {CATEGORY_OPTIONS.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>

            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Grid item>
                    <Typography variant="h4">Объявления</Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={handleCreateAd}>
                        Разместить объявление
                    </Button>
                </Grid>
            </Grid>

            {paginatedAds.length === 0 ? (
                <Typography variant="h6" align="center" sx={{ mt: 4, color: 'gray' }}>
                    Нет объявлений на данный момент.
                </Typography>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {paginatedAds.map(ad => (
                            <Grid item xs={12} sm={6} md={4} key={ad.id}>
                                <Card
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': { boxShadow: 3 },
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="160"
                                        image={ad.image || 'https://dummyimage.com/300x160/cccccc/ffffff&text=No+Image'}
                                        alt={ad.name}
                                        onClick={() => toggleExpand(ad.id)}
                                    />
                                    <CardContent onClick={() => toggleExpand(ad.id)}>
                                        <Typography variant="h6">{ad.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {ad.location}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {ad.type}
                                        </Typography>
                                    </CardContent>

                                    <Collapse in={expandedId === ad.id}>
                                        <CardContent>
                                            <Typography variant="body2" color="text.secondary">
                                                {ad.description}
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
                                        </CardContent>
                                    </Collapse>

                                    <CardActions>
                                        <Button
                                            size="small"
                                            onClick={() => navigate(`/item/${ad.id}`)}
                                            sx={{ marginLeft: 'auto' }}
                                        >
                                            Открыть
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Grid container justifyContent="center" sx={{ mt: 4 }}>
                        <Pagination
                            count={Math.ceil(filteredAds.length / adsPerPage)}
                            page={page}
                            onChange={(_e, value) => setPage(value)}
                            color="primary"
                        />
                    </Grid>
                </>
            )}
        </Container>
    );
};

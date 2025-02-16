import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    MenuItem,
    Grid,
    Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormAd } from '../model/use-form-ad';
import { generalFields, categoryFields } from '../model/form-config';
import { createAd, updateAd, deleteAd } from '@shared/api/ads-api';
import { useNotification } from '@app/providers/notification-provider';

export const FormPage: React.FC = () => {
    const { formState, setFormState, updateField, isEditing, loading, error } = useFormAd();
    const navigate = useNavigate();
    const { notify } = useNotification();
    const [step, setStep] = useState<number>(1);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (error) {
            notify(error, 'error');
        }
    }, [error, notify]);

    if (loading)
        return (
            <Container sx={{ mt: 4 }}>
                <Typography>Загрузка формы...</Typography>
            </Container>
        );

    const validateField = (field: string, value: any) => {
        let error = '';

        switch (field) {
            case 'name':
                if (value.trim() === '') error = 'Название обязательно.';
                else if (value.length > 100) error = 'Название не может быть длиннее 100 символов.';
                break;

            case 'description':
                if (value.length > 1000) error = 'Описание не может быть длиннее 1000 символов.';
                break;

            case 'location':
                if (value.trim() === '') error = 'Локация обязательна.';
                else if (value.length > 255) error = 'Локация не может быть длиннее 255 символов.';
                else if (/^\d/.test(value)) error = 'Локация не должна начинаться с цифры.';
                else if (!/^[\p{L}\d\s.,-]+$/u.test(value)) error = 'Локация содержит недопустимые символы.';
                break;

            case 'price':
                if (isNaN(value) || value < 0 || value > 1_000_000_000) error = 'Некорректная цена.';
                break;

            case 'area':
                if (isNaN(value) || value < 1 || value > 10_000) error = 'Площадь должна быть от 1 до 10 000 кв.м.';
                break;

            case 'rooms':
                if (isNaN(value) || value < 1 || value > 100) error = 'Количество комнат должно быть от 1 до 100.';
                break;

            case 'experience':
                if (isNaN(value) || value < 0 || value > 50) error = 'Опыт работы должен быть от 0 до 50 лет.';
                break;

            case 'mileage':
                if (isNaN(value) || value < 0 || value > 2_000_000) error = 'Пробег должен быть от 0 до 2 000 000 км.';
                break;

            case 'year':
                const currentYear = new Date().getFullYear();
                if (isNaN(value) || value < 1900 || value > currentYear) {
                    error = `Год выпуска должен быть от 1900 до ${currentYear}.`;
                }
                break;

            case 'image':
                if (value.trim() !== '') {
                    const imageRegex = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?(&.*)?$/i;
                    if (!imageRegex.test(value)) error = 'Некорректный URL изображения.';
                }
                break;



            default:
                break;
        }

        setErrors(prev => ({ ...prev, [field]: error }));
        return error === '';
    };



    const handleNext = (e: FormEvent) => {
        e.preventDefault();
        let valid = true;

        for (const field of generalFields) {
            if (field.required) {
                const isValid = validateField(field.name, formState[field.name]);
                if (!isValid) valid = false;
            }
        }

        if (valid) setStep(2);
    };

    const handlePrev = () => setStep(1);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        let valid = true;

        if (formState.type && categoryFields[formState.type]) {
            for (const field of categoryFields[formState.type]) {
                const isValid = validateField(field.name, formState[field.name]);
                if (!isValid) valid = false;
            }
        }

        if (!valid) {
            notify('Исправьте ошибки в форме.', 'warning');
            return;
        }

        try {
            if (isEditing) {
                await updateAd(formState.id, formState);
                notify('Объявление успешно обновлено!', 'success');
            } else {
                const newAd = await createAd({ ...formState, id: undefined });
                notify('Объявление успешно создано!', 'success');
            }

            localStorage.removeItem('adDraft');
            navigate('/list');
        } catch (err: any) {
            notify(err.message || 'Ошибка при сохранении объявления', 'error');
        }
    };

    const handleDelete = async () => {
        if (formState.id === null || formState.id === undefined) return;

        try {
            await deleteAd(formState.id);
            notify('Объявление удалено', 'success');
            navigate('/list');
        } catch (err: any) {
            notify(err.message || 'Ошибка при удалении объявления', 'error');
        }
    };

    const renderField = (field: any) => {
        const commonProps = {
            fullWidth: true,
            margin: 'normal' as const,
            id: field.name,
            label: field.label,
            required: field.required,
            value: formState[field.name] || '',
            onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                updateField(field.name, e.target.value);
                validateField(field.name, e.target.value);
            },
            error: !!errors[field.name],
            helperText: errors[field.name] || '',
        };

        if (field.type === 'select') {
            return (
                <TextField select {...commonProps}>
                    <MenuItem value="">Выберите</MenuItem>
                    {field.options.map((option: string) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            );
        } else if (field.type === 'textarea') {
            return <TextField multiline rows={4} {...commonProps} />;
        }
        return <TextField type={field.type} {...commonProps} />;
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                {isEditing ? 'Редактировать объявление' : 'Разместить объявление'}
            </Typography>
            <Box component="form" noValidate>
                {step === 1 && (
                    <Box>
                        <Typography variant="h6">Общие данные</Typography>
                        {generalFields.map(field => (
                            <div key={field.name}>{renderField(field)}</div>
                        ))}
                        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                            <Button variant="contained" onClick={handleNext}>
                                Далее
                            </Button>
                        </Grid>
                    </Box>
                )}
                {step === 2 && (
                    <Box>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Детали для категории: {formState.type}
                        </Typography>
                        {formState.type && categoryFields[formState.type] ? (
                            categoryFields[formState.type].map(field => (
                                <div key={field.name}>{renderField(field)}</div>
                            ))
                        ) : (
                            <Typography>Выберите категорию на предыдущем шаге.</Typography>
                        )}
                        <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
                            <Button variant="outlined" onClick={handlePrev}>
                                Назад
                            </Button>
                            <Button variant="contained" onClick={handleSubmit}>
                                Сохранить
                            </Button>
                        </Grid>
                    </Box>
                )}
                {isEditing && (
                    <Grid container justifyContent="center" sx={{ mt: 3 }}>
                        <Button variant="outlined" color="error" onClick={handleDelete}>
                            Удалить объявление
                        </Button>
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

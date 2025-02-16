export const generalFields = [
    { name: 'name', label: 'Название', type: 'text', required: true },
    { name: 'description', label: 'Описание', type: 'textarea', required: true },
    { name: 'location', label: 'Локация', type: 'text', required: true },
    { name: 'image', label: 'Фото (ссылка)', type: 'text', required: false },
    {
        name: 'type',
        label: 'Категория объявления',
        type: 'select',
        options: ['Недвижимость', 'Авто', 'Услуги'],
        required: true,
    },
]

export const categoryFields: Record<string, any[]> = {
    'Недвижимость': [
        {
            name: 'propertyType',
            label: 'Тип недвижимости',
            type: 'select',
            options: ['Квартира', 'Дом', 'Коттедж'],
            required: true,
        },
        { name: 'area', label: 'Площадь (кв.м)', type: 'number', required: true },
        { name: 'rooms', label: 'Количество комнат', type: 'number', required: true },
        { name: 'price', label: 'Цена (руб.)', type: 'number', required: true },
    ],
    'Авто': [
        {
            name: 'brand',
            label: 'Марка',
            type: 'select',
            options: ['Toyota', 'Honda', 'BMW'],
            required: true,
        },
        { name: 'model', label: 'Модель', type: 'text', required: true },
        { name: 'year', label: 'Год выпуска', type: 'number', required: true },
        { name: 'mileage', label: 'Пробег (км)', type: 'number', required: false },
    ],
    'Услуги': [
        {
            name: 'serviceType',
            label: 'Тип услуги',
            type: 'select',
            options: ['Ремонт', 'Уборка', 'Доставка'],
            required: true,
        },
        { name: 'experience', label: 'Опыт работы (лет)', type: 'number', required: true },
        { name: 'cost', label: 'Стоимость (руб.)', type: 'number', required: true },
        { name: 'workSchedule', label: 'График работы', type: 'text', required: false },
    ],
}

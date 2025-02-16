export interface IAd {
    id: number;
    name: string;
    description: string;
    location: string;
    type: 'Недвижимость' | 'Авто' | 'Услуги';
    image?: string;
    // Дополнительные поля для недвижимости:
    propertyType?: string;
    area?: number;
    rooms?: number;
    price?: number;
    // Для авто:
    brand?: string;
    model?: string;
    year?: number;
    mileage?: number;
    // Для услуг:
    serviceType?: string;
    experience?: number;
    cost?: number;
    workSchedule?: string;
}

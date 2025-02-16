// src/app/config/env.ts
export const ENV = {
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    NODE_ENV: import.meta.env.MODE || 'development',
    APP_NAME: 'Avito Clone'
}

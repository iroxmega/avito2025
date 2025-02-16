import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { RouterProvider } from './providers/router-provider'
import { StoreProvider } from './providers/store-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationProvider } from './providers/notification-provider'

const queryClient = new QueryClient()

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

root.render(
    <React.StrictMode>
        <StoreProvider>
            <QueryClientProvider client={queryClient}>
                <NotificationProvider>
                    <RouterProvider />
                </NotificationProvider>
            </QueryClientProvider>
        </StoreProvider>
    </React.StrictMode>
)

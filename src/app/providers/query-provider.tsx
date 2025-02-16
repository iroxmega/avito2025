// src/app/providers/query-provider.tsx
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

interface Props {
    children: React.ReactNode
}

export const QueryProvider: React.FC<Props> = ({ children }) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

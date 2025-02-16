import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { App } from '../App'
import { ListPage } from '@pages/list-page'
import { FormPage } from '@pages/form-page'
import { ItemPage } from '@pages/item-page'
import { LoginPage } from '@pages/auth-page'
import { AuthProvider } from './auth-provider'
import { ProtectedRoute } from './protected-route'

export const RouterProvider: React.FC = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<Navigate to="list" />} />
                        <Route path="list" element={<ListPage />} />
                        <Route
                            path="form"
                            element={
                                <ProtectedRoute>
                                    <FormPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="form/:id"
                            element={
                                <ProtectedRoute>
                                    <FormPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="item/:id" element={<ItemPage />} />
                    </Route>
                    <Route path="/auth" element={<LoginPage />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

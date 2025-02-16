import React from 'react'
import { Outlet } from 'react-router-dom'

import { Container } from '@mui/material'

export const App: React.FC = () => {
    return (
        <div className="app-wrapper">
            <Container maxWidth="lg" sx={{ my: 4 }}>
                <Outlet />
            </Container>
        </div>
    )
}

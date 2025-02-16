import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Snackbar, Alert } from '@mui/material'

interface NotificationContextProps {
    notify: (message: string, severity?: 'success' | 'error' | 'warning' | 'info') => void
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined)

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotification must be used within NotificationProvider')
    }
    return context
}

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info')

    const notify = (msg: string, sev: 'success' | 'error' | 'warning' | 'info' = 'info') => {
        setMessage(msg)
        setSeverity(sev)
        setOpen(true)
    }

    const handleClose = () => setOpen(false)

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    )
}

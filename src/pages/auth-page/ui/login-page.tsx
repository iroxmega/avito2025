import React, { useState, FormEvent } from 'react'
import { Container, Typography, TextField, Button, Box } from '@mui/material'
import { useAuth } from '@app/providers/auth-provider'
import { useNotification } from '@app/providers/notification-provider'

export const LoginPage: React.FC = () => {
    const { login } = useAuth()
    const { notify } = useNotification()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            await login(username, password)
        } catch (err: any) {
            notify(err.message || 'Ошибка при входе', 'error')
        }
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Вход в систему
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    label="Имя пользователя"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <TextField
                    label="Пароль"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                    Войти
                </Button>
            </Box>
        </Container>
    )
}

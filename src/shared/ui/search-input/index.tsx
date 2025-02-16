import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onClear?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = React.memo(
    ({ value, onChange, onClear }) => {
        return (
            <TextField
                label="Поиск"
                variant="outlined"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                fullWidth
                slotProps={{
                    input: {
                        endAdornment: value ? (
                            <InputAdornment position="end">
                                <IconButton onClick={onClear} edge="end">
                                    <ClearIcon />
                                </IconButton>
                            </InputAdornment>
                        ) : null,
                    },
                }}
            />
        );
    }
);

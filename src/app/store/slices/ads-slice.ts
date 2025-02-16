import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAd } from '@shared/types/ad-types'

interface AdsState {
    ads: IAd[]
}

const initialState: AdsState = {
    ads: [],
}

const adsSlice = createSlice({
    name: 'ads',
    initialState,
    reducers: {
        setAds(state, action: PayloadAction<IAd[]>) {
            state.ads = action.payload
        },
        addAd(state, action: PayloadAction<IAd>) {
            state.ads.push(action.payload)
        },
        updateAd(state, action: PayloadAction<IAd>) {
            const index = state.ads.findIndex(ad => ad.id === action.payload.id)
            if (index !== -1) {
                state.ads[index] = action.payload
            }
        },
        deleteAd(state, action: PayloadAction<number>) {
            state.ads = state.ads.filter(ad => ad.id !== action.payload)
        },
    },
})

export const { setAds, addAd, updateAd, deleteAd } = adsSlice.actions
export default adsSlice.reducer

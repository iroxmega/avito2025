import { combineReducers } from '@reduxjs/toolkit'
import adsReducer from './slices/ads-slice'

export const rootReducer = combineReducers({
    ads: adsReducer,
})

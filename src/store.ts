import { configureStore } from '@reduxjs/toolkit'
import ImagesReducer from './reducers/ImagesSlice.ts'

export const store = configureStore({
    reducer: {
        images: ImagesReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
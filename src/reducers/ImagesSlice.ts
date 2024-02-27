import { createSlice } from '@reduxjs/toolkit'
import { ImageData } from '../types'

const initialState = {
  images: [] as ImageData[],
}

export const ImagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setImages: (state, action) => {
      state.images = state.images.concat(action.payload)
    },
  }
})

export const { setImages } = ImagesSlice.actions

export default ImagesSlice.reducer
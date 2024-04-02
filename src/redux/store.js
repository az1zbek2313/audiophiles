import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './conterSlice'
import TernarySlice from './TernarySlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    add:TernarySlice, 
  },
})
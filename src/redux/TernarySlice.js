import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    add: (state, action) => {
      if (action.payload) {
        state.value = true;
      } else {
        state.value = false;
      }
    },
  },
})

export const { add } = counterSlice.actions

export default counterSlice.reducer
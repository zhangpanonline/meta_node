import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface ThemeState {
  theme: string
}

const initialState: ThemeState = {
  theme: 'light',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeState['theme']>) => {
      state.theme = action.payload
    },
  },
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer


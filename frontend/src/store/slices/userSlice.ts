// src/features/user/userSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// 1. Hàm gọi API
export const fetchUser = createAsyncThunk('user/fetch', async (id: string) => {
  const res = await fetch(`/api/users/${id}`)
  return res.json()
})

// 2. Tạo slice
const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
  },
})

export default userSlice.reducer

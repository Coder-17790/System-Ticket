import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAPI } from '@/api/fetchAPI';
import { ResponseAPI, UserLogin } from '@/types';
import { RootState } from '@/store/index';
import { AuthenticatedRequest } from '@/features/auth/api/login';

interface UserSliceState {
  user: UserLogin | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserSliceState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

export const fetchUser = createAsyncThunk<
  UserLogin,
  void,
  { rejectValue: string; state: RootState }
>('user/fetchProfile', async (_, { getState, rejectWithValue }) => {
  const token = getState().user.token;

  if (!token) {
    return rejectWithValue('No auth token found');
  }

  try {
    const res = await fetchAPI<ResponseAPI<UserLogin>>(`/api/auth/refetchToken`, {
      authToken: token,
      method: 'GET',
    });

    if (!res.success || !res.data) {
      return rejectWithValue(res.message || 'Fetch user profile failed');
    }

    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Server Error');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthenticatedRequest>) => {
      state.status = 'succeeded';
      state.token = action.payload.auth ?? null;
      state.user = action.payload.user ?? null;
    },
    logout: (state) => {

      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || action.error.message || 'Something went wrong';
        // Nếu lỗi do token hết hạn (rejected), thường ta sẽ logout luôn
        // state.auth = null;
      });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

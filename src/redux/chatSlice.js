import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchChatMessages = createAsyncThunk(
  'chat/fetchChatMessages',
  async () => {
    const response = await fetch('');
    return response.json();
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    status: 'idle', 
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload;
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const RequestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequests: () => {
      return null;
    },
      removeUser: (state, action) => {
       return state.filter(request => request._id !== action.payload);
}

  }
});

export const { addRequests, removeRequests, removeUser } = RequestsSlice.actions;
export default RequestsSlice.reducer;

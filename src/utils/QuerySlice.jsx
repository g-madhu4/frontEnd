import { createSlice } from "@reduxjs/toolkit";

const QuerySlice = createSlice({
    name: "Query",
    initialState: {
        from: [],
        to: []
    },
    reducers: {
        addQueryFrom: (state, action) => {
            state.from.push(action.payload);
        },
        addQueryOther: (state, action) => {
            state.to.push(action.payload);
        },
       removeQueryFrom: (state) => {
       state.from = [];
    },
      removeQueryTo: (state) => {
      state.to = [];
   }

    }
});

export const { addQueryFrom, addQueryOther, removeQueryFrom, removeQueryTo } = QuerySlice.actions;
export default QuerySlice.reducer;

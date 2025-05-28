import { createSlice } from "@reduxjs/toolkit";



const FeedSlice=createSlice({
    name:"Feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload;
        },
        removeFeed:(state,action)=>{
            return null;
        },
        removeUserFromFeed:(state,action)=>{
            return state.filter(request=>request._id!=action.payload);
        }
    }
});

export const {addFeed,removeFeed,removeUserFromFeed}=FeedSlice.actions;
export default FeedSlice.reducer;
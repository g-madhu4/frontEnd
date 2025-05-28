import { createSlice } from "@reduxjs/toolkit";



const connectionSlice=createSlice({
    name:"connection",
    initialState:null,
    reducers:{
        addConnectedUsers:(state,action)=>{
            return action.payload;
        },
        removeConnectedUsers:(state,action)=>{
            return null;
        }
    }
});

export const{addConnectedUsers,removeConnectedUsers}=connectionSlice.actions;
export default connectionSlice.reducer;
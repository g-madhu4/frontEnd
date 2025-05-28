import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./FeedSLice";
import requestReducer from "./RequestsSlice";
import connectedReducer from "./ConnectionsSlice";
import queryReducer  from "./QuerySlice";


const appStore=configureStore({
    reducer:{
       user:userReducer,
       feed:feedReducer,
       requests:requestReducer,
       connections:connectedReducer,
       query:queryReducer
    }
})

export default appStore;
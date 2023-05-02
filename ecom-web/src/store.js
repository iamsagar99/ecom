import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./reducers/user.reducer";
import cartReducer from "./reducers/cart.reducer"
const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer
    }
})

export default store;
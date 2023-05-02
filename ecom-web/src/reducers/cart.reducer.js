import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartDetail: []
}

export const CartSlicer = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addAnItemToCart: (state, action) => {
            let pre_cart = state.cartDetail;
            console.log("action:", pre_cart);
            if (!pre_cart || pre_cart.length <= 0) {
                if (action.payload.qty > 0) {

                    state.cartDetail.push(action.payload)
                }
                // pre_cart.push(action.payload)
            }
            else {
                let index = null;
                state.cartDetail.map((item, ind) => {
                    if (item.product_id === action.payload.product_id) {
                        index = ind;
                    }
                })
                if (index !== null) {
                    let item = pre_cart[index];
                    if (action.payload.qty <= 0) {
                        pre_cart.splice(index,1)
                    } else {
                        
                        item = {
                            ...item,
                            qty: Number(item.qty) + Number(action.payload.qty)

                        }
                        pre_cart[index] = item;
                    }

                    state.cartDetail = pre_cart;
                } else {
                    if (action.payload.qty > 0) {

                        pre_cart = [
                            ...pre_cart,
                            action.payload
    
                        ]
                    }
                    
                    state.cartDetail = pre_cart;
                }
            }
            localStorage.setItem('cart', JSON.stringify(state.cartDetail))
        },
        syncLocalCart: (state) => {
            let all_items = JSON.parse(localStorage.getItem("cart")) || [];
            state.cartDetail = all_items;
        }
    }
})

export const { syncLocalCart, addAnItemToCart } = CartSlicer.actions;
export default CartSlicer.reducer;
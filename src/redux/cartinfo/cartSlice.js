// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  noOfCartItems: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state) => {
        console.log("add to cart ")
      return {
        ...state,
        noOfCartItems: state.noOfCartItems + 1,
      };
    },
    removeFromCart:(state,action)=>{//!There are two types of remove complete remove and one by one remove 
        //!both to be handled via api so action.payload can be used directly to have one or total item 
        console.log("ACTION TO BE DISPATCHED")
        console.log(action.payload,"this is action payload ")

        const {noOfItems}=action.payload
        console.log(noOfItems,"this is no of items ")
        return{
            ...state,
            noOfCartItems:state.noOfCartItems-noOfItems,
        }



    },
    previousCart:(state,action)=>{
        const {noOfItems}=action.payload
        console.log(noOfItems," this is previous cart")
        return{
            ...state,
            noOfCartItems:noOfItems
        }
    },
    emptyCart:(state)=>{
        return{
            ...state,
            noOfCartItems: 0
        }
    }
  },
});

export const { addToCart ,previousCart,removeFromCart,emptyCart} = cartSlice.actions;

export default cartSlice.reducer;

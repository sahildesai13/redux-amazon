import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
  cateArr: [],
  cart: [],
  temp:[],
};

export const ProductSlice = createSlice({
  name: 'ProductData',
  initialState,
  reducers: {
    SetData: (state, action) => {
      state.value = action.payload;
      state.temp = action.payload;
    },
    SetCate: (state, action) => {
      state.cateArr = action.payload;
    },
    AddCart: (state, action) => {
      let existingItem = state.cart.find(c => c.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    deleteCart: (state, action) => {
      state.cart = state.cart.filter(c => c.id !== action.payload);
    },
    deleteQty: (state, action) => {
      let existingItem = state.cart.find(c => c.id === action.payload.id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
    },
    filterData: (state, action) => {
      console.log(state.value);
      const filteredArray = state.temp.filter((ele) => {
        return ele.title.toLowerCase().includes(action.payload.toLowerCase());
      });
      state.value = filteredArray;
    },
    showAll: (state, action) => {
      state.value = state.temp;
    }
    
  },
});

export const { AddCart, SetData, SetCate, deleteCart, deleteQty,filterData,showAll} = ProductSlice.actions;

export const GetData = () => (dispatch) => {
  fetch('https://dummyjson.com/products')
    .then((res) => res.json())
    .then((data) => {
      dispatch(SetData(data.products));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const GetCate = () => (dispatch) => {
  fetch('https://dummyjson.com/products/categories')
    .then((res) => res.json())
    .then((data) => {
      dispatch(SetCate(data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export default ProductSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Interface defining the shape of a product object
interface Product {
  id: number;          // Unique identifier for the product
  title: string;       // Product name/title
  price: number;       // Product price
  image: string;       // URL to product image
  rating: {            // Product rating information
    rate: number;      // Average rating score
    count: number;     // Number of ratings
  };
}

// Interface for the products slice of the Redux store
interface ProductsState {
  products: Product[]; // Array of products
  loading: boolean;    // Loading state for async operations
  error: string | null; // Error message if request fails
}

// Initial state for the products slice
const initialState: ProductsState = {
  products: [],        // Empty products array
  loading: false,      // Not loading initially
  error: null,         // No errors initially
};

// Async thunk action to fetch products from the API
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
});

// Create the products slice with reducers and async action handlers
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {}, // No synchronous reducers needed
  extraReducers: (builder) => {
    builder
      // Handle the pending state of fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      // Handle successful product fetch
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      // Handle failed product fetch
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export default productsSlice.reducer;
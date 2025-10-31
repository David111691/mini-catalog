import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/product";
import {
  loadFavoriteItems,
  loadProductsFromLocalStorage,
  saveFavoriteItems,
  saveProductsToLocalStorage,
} from "./localStorage";

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products?limit=19");
    const data: Product[] = await res.json();
    return data;
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as { products: ProductsState };
      // если в state уже есть продукты — не фетчим
      if (state.products.items.length > 0) {
        return false;
      }
      return true;
    },
  }
);

export const fetchProductById = createAsyncThunk<Product, number>(
  "products/fetchProductById",
  async (id, { getState, rejectWithValue }) => {
    const state = getState() as { products: ProductsState };

    const product = state.products.items.find((p) => p.id === id);

    if (product) {
      return new Promise<Product>((resolve) => {
        setTimeout(() => resolve(product), 100);
      });
    }

    return rejectWithValue(`Product with id ${id} not found`);
  }
);

interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
  favorites: number[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: loadProductsFromLocalStorage() || [],
  selectedProduct: null,
  favorites: loadFavoriteItems() || [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((favId) => favId !== id);
      } else {
        state.favorites.push(id);
      }
      saveFavoriteItems(state.favorites);
    },
    addProduct(state, action: PayloadAction<Omit<Product, "id">>) {
      const newId = state.items.length + 1;
      const newProduct: Product = { id: newId, ...action.payload };

      state.items.push(newProduct);
      saveProductsToLocalStorage(state.items);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        saveProductsToLocalStorage(state.items);
        // обновим selectedProduct если открыт
        if (state.selectedProduct?.id === action.payload.id) {
          state.selectedProduct = action.payload;
        }
      }
    },
    removeProduct(state, action: PayloadAction<number>) {
      const id = action.payload;

      // удаляем продукт
      state.items = state.items.filter((p) => p.id !== id);

      // удаляем из favorites, если есть
      state.favorites = state.favorites.filter((favId) => favId !== id);

      // сохраняем изменения в localStorage
      saveProductsToLocalStorage(state.items);
      saveFavoriteItems(state.favorites);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
      saveProductsToLocalStorage(action.payload);
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch products";
    });
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.selectedProduct = null;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.selectedProduct = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch product";
    });
  },
});

export const { toggleFavorite, addProduct, updateProduct, removeProduct } =
  productsSlice.actions;
export default productsSlice.reducer;

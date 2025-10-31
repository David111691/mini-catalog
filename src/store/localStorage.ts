import type { Product } from "@/types/product";

// Favorites (избранные товары)
const FAVORITES_KEY = "favorites";

export const loadFavoriteItems = (): number[] => {
  try {
    const serializedState = localStorage.getItem(FAVORITES_KEY);
    if (!serializedState) return [];
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn("Failed to load favorites from localStorage:", err);
    return [];
  }
};

export const saveFavoriteItems = (favorites: number[]) => {
  try {
    const serializedState = JSON.stringify(favorites);
    localStorage.setItem("favorites", serializedState);
  } catch (err) {
    console.warn("Failed to save favorites:", err);
  }
};

// Продукты
const PRODUCTS_KEY = "customProducts";

export const loadProductsFromLocalStorage = (): Product[] => {
  try {
    const serialized = localStorage.getItem("customProducts");
    if (!serialized) return [];
    return JSON.parse(serialized);
  } catch {
    return [];
  }
};

export const saveProductsToLocalStorage = (products: Product[]) => {
  try {
    const serializedState = JSON.stringify(products);
    localStorage.setItem(PRODUCTS_KEY, serializedState);
  } catch (err) {
    console.warn("Failed to save favorites:", err);
  }
};

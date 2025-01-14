// client/src/services/api.ts
import axios from "axios";
import {
  CategoriesResponse,
  Category_Response,
  Product_Response,
  ProductsResponse,
  Store_Response,
  StoresResponse,
  TokenResponse,
  User_Response,
  UsersResponse,
} from "../types/types";
import {
  Category,
  LoginData,
  Product,
  Store,
  User,
} from "../Interfaces/interfaces";

const API_BASE_URL = "http://localhost:5000/api";

// Register a new user
export const register = async (data: User): Promise<User_Response> => {
  const response = await axios.post<User_Response>(
    `${API_BASE_URL}/auth/register`,
    data
  );
  return response.data;
};

// Log in a user
export const login = async (data: LoginData): Promise<TokenResponse> => {
  const response = await axios.post<TokenResponse>(
    `${API_BASE_URL}/auth/login`,
    data
  );
  return response.data;
};

// Users API
export const getAllUsers = async (): Promise<UsersResponse> => {
  const response = await axios.get<UsersResponse>(
    `${API_BASE_URL}/admin/users`
  );
  return response.data;
};

export const getUserById = async (id: string): Promise<User_Response> => {
  const response = await axios.get<User_Response>(
    `${API_BASE_URL}/admin/users/${id}`
  );
  console.log(response.data);
  return response.data;
};

export const updateUser = async (id: string): Promise<User_Response> => {
  const response = await axios.put<User_Response>(
    `${API_BASE_URL}/admin/users/${id}`
  );
  return response.data;
};

// Stores API
export const createStore = async (data: Store): Promise<Store_Response> => {
  const response = await axios.post<Store_Response>(
    `${API_BASE_URL}/admin/stores`,
    data
  );
  return response.data;
};

export const getAllStores = async (): Promise<StoresResponse> => {
  const response = await axios.get<StoresResponse>(
    `${API_BASE_URL}/admin/stores`
  );
  return response.data;
};

export const getStoreById = async (id: string): Promise<Store_Response> => {
  const response = await axios.get<Store_Response>(
    `${API_BASE_URL}/admin/stores/${id}`
  );
  return response.data;
};

export const updateStore = async (id: string): Promise<Store_Response> => {
  const response = await axios.put<Store_Response>(
    `${API_BASE_URL}/admin/stores/${id}`
  );
  return response.data;
};

// Categories API
export const createCategory = async (
  data: Category
): Promise<Category_Response> => {
  const response = await axios.post<Category_Response>(
    `${API_BASE_URL}/admin/categories`,
    data
  );
  return response.data;
};

export const getAllCategories = async (): Promise<CategoriesResponse> => {
  const response = await axios.get<CategoriesResponse>(
    `${API_BASE_URL}/admin/categories`
  );
  return response.data;
};

export const getCategoryById = async (
  id: string
): Promise<Category_Response> => {
  const response = await axios.get<Category_Response>(
    `${API_BASE_URL}/admin/categories/${id}`
  );
  return response.data;
};

export const updateCategory = async (
  id: string
): Promise<Category_Response> => {
  const response = await axios.put<Category_Response>(
    `${API_BASE_URL}/admin/categories/${id}`
  );
  return response.data;
};

// Products API
export const createProduct = async (
  data: Product
): Promise<Product_Response> => {
  const response = await axios.post<Product_Response>(
    `${API_BASE_URL}/admin/products`,
    data
  );
  return response.data;
};

export const getAllProducts = async (): Promise<ProductsResponse> => {
  const response = await axios.get<ProductsResponse>(
    `${API_BASE_URL}/admin/products`
  );
  return response.data;
};

export const getProductById = async (id: string): Promise<Product_Response> => {
  const response = await axios.get<Product_Response>(
    `${API_BASE_URL}/admin/products/${id}`
  );
  return response.data;
};

export const updateProduct = async (id: string): Promise<Product_Response> => {
  const response = await axios.put<Product_Response>(
    `${API_BASE_URL}/admin/products/${id}`
  );
  return response.data;
};

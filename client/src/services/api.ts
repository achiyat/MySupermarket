// client/src/services/api.ts
import axios from "axios";
import { TokenResponse } from "../types/types";
import {
  Category,
  Check,
  LoginData,
  Product,
  Request,
  Store,
  User,
} from "../Interfaces/interfaces";

const API_BASE_URL = "http://localhost:5000/api";

export const createRequest = async (data: Request): Promise<Request> => {
  try {
    const response = await axios.post<Request>(
      `${API_BASE_URL}/admin/requests`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create request");
  }
};

export const getAllRequests = async (): Promise<Request[]> => {
  try {
    const response = await axios.get<Request[]>(
      `${API_BASE_URL}/admin/requests`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch requests");
  }
};

export const getRequestById = async (id: string): Promise<Request> => {
  try {
    const response = await axios.get<Request>(
      `${API_BASE_URL}/admin/requests/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch request by ID");
  }
};

export const updateRequest = async (id: string): Promise<Request> => {
  try {
    const response = await axios.put<Request>(
      `${API_BASE_URL}/admin/requests/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update request");
  }
};

export const checkRequest = async (data: Request): Promise<Check> => {
  try {
    const response = await axios.post<Check>(
      `${API_BASE_URL}/admin/requests/check`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get check request");
  }
};

// Register a new user
export const register = async (data: User): Promise<User> => {
  try {
    const response = await axios.post<User>(
      `${API_BASE_URL}/auth/register`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to register user");
  }
};

// Log in a user and retrieve a token
export const login = async (data: LoginData): Promise<TokenResponse> => {
  try {
    const response = await axios.post<TokenResponse>(
      `${API_BASE_URL}/auth/login`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to log in user");
  }
};

// `${API_BASE_URL}/admin/users`
// Retrieve all users
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(
      `${API_BASE_URL}/admin/fields/users`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users");
  }
};

// Retrieve a user by ID
export const getUserById = async (id: string): Promise<User> => {
  try {
    const response = await axios.get<User>(
      `${API_BASE_URL}/admin/fields/users/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user by ID");
  }
};

// Update a user by ID
export const updateUser = async (id: string, data: User): Promise<User> => {
  try {
    const response = await axios.put<User>(
      `${API_BASE_URL}/admin/users/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update user");
  }
};

// Create a new store
export const createStore = async (data: Store): Promise<Store> => {
  try {
    const response = await axios.post<Store>(
      `${API_BASE_URL}/admin/stores`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create store");
  }
};

// Retrieve all stores
export const getAllStores = async (): Promise<Store[]> => {
  try {
    const response = await axios.get<Store[]>(`${API_BASE_URL}/admin/stores`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch stores");
  }
};

// Retrieve a store by ID
export const getStoreById = async (id: string): Promise<Store> => {
  try {
    const response = await axios.get<Store>(
      `${API_BASE_URL}/admin/stores/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch store by ID");
  }
};

// Update a store by ID
export const updateStore = async (id: string, data: Store): Promise<Store> => {
  try {
    const response = await axios.put<Store>(
      `${API_BASE_URL}/admin/stores/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update store");
  }
};

// Create a new category
export const createCategory = async (data: Category): Promise<Category> => {
  try {
    const response = await axios.post<Category>(
      `${API_BASE_URL}/admin/categories`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create category");
  }
};

// `${API_BASE_URL}/admin/categories`
// Retrieve all categories
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<Category[]>(
      `${API_BASE_URL}/admin/fields/categories`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categories");
  }
};

// Retrieve a category by ID
export const getCategoryById = async (id: string): Promise<Category> => {
  try {
    const response = await axios.get<Category>(
      `${API_BASE_URL}/admin/categories/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch category by ID");
  }
};

// Update a category by ID
export const updateCategory = async (
  id: string,
  data: Category
): Promise<Category> => {
  try {
    const response = await axios.put<Category>(
      `${API_BASE_URL}/admin/categories/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update category");
  }
};

// Create a new product
export const createProduct = async (data: Product): Promise<Product> => {
  try {
    const response = await axios.post<Product>(
      `${API_BASE_URL}/admin/products`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create product");
  }
};

// Retrieve all products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(
      `${API_BASE_URL}/admin/products`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch products");
  }
};

// Retrieve a product by ID
export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get<Product>(
      `${API_BASE_URL}/admin/products/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch product by ID");
  }
};

// Update a product by ID
export const updateProduct = async (
  id: string,
  data: Product
): Promise<Product> => {
  try {
    const response = await axios.put<Product>(
      `${API_BASE_URL}/admin/products/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update product");
  }
};

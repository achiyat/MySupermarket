// client/src/services/api.ts
import axios from "axios";
import { TokenResponse } from "../types/types";
import {
  Category,
  Check,
  LoginData,
  MsgRes,
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
    throw new Error("Failed to fetch request by ID");
  }
};

export const getRequestsByUserId = async (
  userId: string
): Promise<Request[]> => {
  try {
    const response = await axios.get<Request[]>(
      `${API_BASE_URL}/admin/requests/${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch requests by user ID");
  }
};

export const updateRequest = async (
  id: string,
  data: Request
): Promise<Request> => {
  try {
    const response = await axios.put<Request>(
      `${API_BASE_URL}/admin/requests/${id}`,
      data
    );
    return response.data;
  } catch (error) {
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
    throw new Error("Failed to get check request");
  }
};

export const register = async (data: User): Promise<User | MsgRes> => {
  try {
    const response = await axios.post<User | MsgRes>(
      `${API_BASE_URL}/auth/register`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    throw new Error("Failed to register user");
  }
};

export const login = async (data: LoginData): Promise<TokenResponse> => {
  try {
    const response = await axios.post<TokenResponse>(
      `${API_BASE_URL}/auth/login`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to log in user");
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(
      `${API_BASE_URL}/admin/fields/users`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

export const getUserById = async (id: string): Promise<User> => {
  try {
    const response = await axios.get<User>(
      `${API_BASE_URL}/admin/fields/users/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user by ID");
  }
};

export const updateUser = async (id: string, data: User): Promise<User> => {
  try {
    const response = await axios.put<User>(
      `${API_BASE_URL}/admin/users/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user");
  }
};

export const createStore = async (data: Store): Promise<Store> => {
  try {
    const response = await axios.post<Store>(
      `${API_BASE_URL}/admin/stores`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create store");
  }
};

export const getAllStores = async (): Promise<Store[]> => {
  try {
    const response = await axios.get<Store[]>(`${API_BASE_URL}/admin/stores`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch stores");
  }
};

export const getStoreById = async (id: string): Promise<Store> => {
  try {
    const response = await axios.get<Store>(
      `${API_BASE_URL}/admin/stores/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch store by ID");
  }
};

export const updateStore = async (id: string, data: Store): Promise<Store> => {
  try {
    console.log(data);
    const response = await axios.put<Store>(
      `${API_BASE_URL}/admin/stores/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      return error.response?.data;
    }
    throw new Error("Failed to update store");
  }
};

export const createCategory = async (data: Category): Promise<Category> => {
  try {
    const response = await axios.post<Category>(
      `${API_BASE_URL}/admin/categories`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create category");
  }
};

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<Category[]>(
      `${API_BASE_URL}/admin/fields/categories`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};

export const getCategoryById = async (id: string): Promise<Category> => {
  try {
    const response = await axios.get<Category>(
      `${API_BASE_URL}/admin/categories/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch category by ID");
  }
};

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
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      return error.response?.data;
    }
    throw new Error("Failed to update category");
  }
};

export const createProduct = async (data: Product): Promise<Product> => {
  try {
    const response = await axios.post<Product>(
      `${API_BASE_URL}/admin/products`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create product");
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(
      `${API_BASE_URL}/admin/fields/products`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get<Product>(
      `${API_BASE_URL}/admin/products/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch product by ID");
  }
};

export const getProductByStores = async (
  storeIds: string[]
): Promise<Product[]> => {
  try {
    const response = await axios.post<Product[]>(
      `${API_BASE_URL}/admin/products/stores`,
      { storeIds }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products by stores");
  }
};

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
    throw new Error("Failed to update product");
  }
};

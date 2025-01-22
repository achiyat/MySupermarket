// client/src/services/api.ts
import axios from "axios";
import { TokenResponse } from "../types/types";
import {
  Category,
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

// return requests;
export const getAllRequests = async (): Promise<Request[]> => {
  return [
    {
      _id: "1",
      type: "Change status",
      status: "pending",
      fromUser: "user1",
      username: "user1",
      data: {
        _id: "6785b5037638a936cab7e710",
        username: "user1",
        email: "user1@gmail.com",
        role: "employee",
        phone: "0541234567",
        address: "user1 address",
        active: false,
        __v: 0,
      },
      created_at: "2025-01-20T01:14:12.274Z",
    },
    {
      _id: "2",
      type: "Create a store",
      status: "pending",
      fromUser: "user2",
      username: "user2",
      data: {
        name: "Store A",
        branchName: "Main Branch",
        address: "123 Main St",
        employeeId: "67858a9292b0ed20c81e6425",
      },
      created_at: "2025-01-20T01:15:00.000Z",
    },
    {
      _id: "3",
      type: "Change status",
      status: "pending",
      fromUser: "user3",
      username: "user3",
      data: {
        _id: "6785b5037638a936cab7e710",
        username: "user3",
        email: "user3@gmail.com",
        role: "employee",
        phone: "0549876543",
        address: "user3 address",
        active: true,
        __v: 0,
      },
      created_at: "2025-01-20T01:16:12.274Z",
    },
    {
      _id: "4",
      type: "Create a store",
      status: "pending",
      fromUser: "user4",
      username: "user4",
      data: {
        name: "Store B",
        branchName: "Secondary Branch",
        address: "456 Secondary St",
        employeeId: "67858a9292b0ed20c81e6426",
      },
      created_at: "2025-01-20T01:17:00.000Z",
    },
    {
      _id: "5",
      type: "Change status",
      status: "pending",
      fromUser: "user5",
      username: "user5",
      data: {
        _id: "6785b5037638a936cab7e710",
        username: "user5",
        email: "user5@gmail.com",
        role: "administrator",
        phone: "0545678901",
        address: "user5 address",
        active: true,
        __v: 0,
      },
      created_at: "2025-01-20T01:18:12.274Z",
    },
  ];
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

import axios from "axios";

const BASE_URL = "http://localhost:8081/sweetshop/api/sweet";

const AUTH_BASE = "http://localhost:8081/api/auth";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

// initialize token from storage
if (localStorage.getItem("token")) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
}

// GET all sweets
export const getSweetList = () => axios.get(`${BASE_URL}/getAllSweets`);

// POST add sweet
export const addSweet = (sweet) => axios.post(`${BASE_URL}/add`, sweet);

// Auth endpoints
export const register = (credentials) => axios.post(`${AUTH_BASE}/register`, credentials);
export const login = (credentials) => axios.post(`${AUTH_BASE}/login`, credentials);

// DELETE sweet by id
export const deleteSweetById = (id) => axios.delete(`${BASE_URL}/delete/${id}`);

// SEARCH by name
export const searchSweetByName = (name) =>
  axios.get(`${BASE_URL}/search/byName/${name}`);

// SEARCH by category
export const searchSweetByCategory = (category) =>
  axios.get(`${BASE_URL}/search/byCategory/${category}`);

// SEARCH by price range
export const searchSweetsByPriceRange = (min, max) =>
  axios.get(`${BASE_URL}/search/by-price?minPrice=${min}&maxPrice=${max}`);

// SORT by price ascending
export const sortSweetsByPriceAsc = () =>
  axios.get(`${BASE_URL}/sort/price-asc`);

// SORT by price descending
export const sortSweetsByPriceDesc = () =>
  axios.get(`${BASE_URL}/sort/price-desc`);

// SORT by quantity ascending
export const sortSweetsByQuantityAsc = () =>
  axios.get(`${BASE_URL}/sort/quantity-asc`);

// SORT by quantity descending
export const sortSweetsByQuantityDesc = () =>
  axios.get(`${BASE_URL}/sort/quantity-desc`);

// POST purchase sweet with quantity param
export const purchaseSweet = (id, quantity) =>
  axios.post(`${BASE_URL}/purchase/${id}?quantity=${quantity}`);

// POST restock sweet with quantity param
export const restockSweet = (id, quantity) =>
  axios.post(`${BASE_URL}/restock/${id}?quantity=${quantity}`);

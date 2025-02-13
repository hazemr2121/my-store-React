const FAKE_STORE_API = "https://fakestoreapi.com";
const LOCAL_API = "http://localhost:3000";

export const getProducts = async () => {
  const response = await fetch(`${FAKE_STORE_API}/products`);
  return response.json();
};

export const getCategories = async () => {
  const response = await fetch(`${FAKE_STORE_API}/products/categories`);
  return response.json();
};

export const login = async (email, password) => {
  const response = await fetch(`${LOCAL_API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const registerForm = async (userData) => {
  const response = await fetch(`${LOCAL_API}/auth/signUp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};
export const getProductsByCategory = async (category) => {
  const response = await fetch(
    `${FAKE_STORE_API}/products/category/${category}`
  );
  return response.json();
};
export const getProductById = async (id) => {
  const response = await fetch(`${FAKE_STORE_API}/products/${id}`);
  return response.json();
};

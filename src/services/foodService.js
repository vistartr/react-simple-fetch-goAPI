const API_URL = "http://localhost:8080";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Something went wrong");
  }
  // Beberapa response (seperti DELETE) mungkin tidak punya body JSON
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  }
  return response.json();
};

export const getAllFoods = () => {
  return fetch(`${API_URL}/food`).then(handleResponse);
};

// Layanan untuk mengambil satu makanan berdasarkan ID
export const getFoodById = (id) => {
  return fetch(`${API_URL}/food/${id}`).then(handleResponse);
};

// Layanan untuk membuat makanan baru
export const createFood = (foodData) => {
  return fetch(`${API_URL}/food`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(foodData),
  }).then(handleResponse);
};

// Layanan untuk mengupdate makanan
export const updateFood = (id, foodData) => {
  return fetch(`${API_URL}/food/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(foodData),
  }).then(handleResponse);
};

// Layanan untuk menghapus makanan
export const deleteFood = (id) => {
  return fetch(`${API_URL}/food/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(handleResponse);
};

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Token no interceptor:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na resposta da API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Exporta os métodos da API
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const getBooks = () => api.get('/books');
export const addBook = (bookData) => api.post('/books', bookData);
export const updateBook = (code, bookData) => api.put(`/books/${code}`, bookData);
export const deleteBook = (code) => api.delete(`/books/${code}`);
export const getAvailableBooks = async () => {
  try {
    const response = await api.get('/books/available'); 
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar livros disponíveis:', error.response?.data || error.message);
    throw error;
  }
};
export const getLoans = () => api.get('/loans');
export const addLoan = (loanData) => api.post('/loans', loanData);
export const authorizeLoan = (loanId) => api.put(`/loans/authorize/${loanId}`);
export const returnLoan = (loanId) => api.put(`/loans/return/${loanId}`);
export const getRatings = () => api.get('/ratings');
export const addRating = (ratingData) => api.post('/ratings', ratingData);
export const updateRating = (ratingId, ratingData) => api.put(`/ratings/${ratingId}`, ratingData);
export const deleteRating = (ratingId) => api.delete(`/ratings/${ratingId}`);
export const getUsers = () => api.get('/users');
export const updateUser = (cpf, userData) => api.put(`/users/${cpf}`, userData);
export const deleteUser = (cpf) => api.delete(`/users/${cpf}`);

export default api;

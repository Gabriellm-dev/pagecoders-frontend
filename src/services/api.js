import axios from 'axios';

// Cria uma instância do axios com configurações padrão
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
});

// Adiciona um interceptor para adicionar o token de autorização aos cabeçalhos
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Adiciona um interceptor para tratar erros de resposta
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // Aqui você pode adicionar lógica para lidar com erros globais
  console.error('Erro na resposta da API:', error.response || error.message);
  return Promise.reject(error);
});

// Autenticação
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (credentials) => api.post('/auth/login', credentials);

// Livros
export const getBooks = () => api.get('/books');
export const addBook = (bookData) => api.post('/books', bookData);
export const updateBook = (code, bookData) => api.put(`/books/${code}`, bookData);
export const deleteBook = (code) => api.delete(`/books/${code}`);

// Empréstimos
export const getLoans = () => api.get('/loans');
export const addLoan = (loanData) => api.post('/loans', loanData);
export const authorizeLoan = (loanId) => api.put(`/loans/authorize/${loanId}`);
export const returnLoan = (loanId) => api.put(`/loans/return/${loanId}`);

// Classificações
export const getRatings = () => api.get('/ratings');
export const addRating = (ratingData) => api.post('/ratings', ratingData);
export const updateRating = (ratingId, ratingData) => api.put(`/ratings/${ratingId}`, ratingData);
export const deleteRating = (ratingId) => api.delete(`/ratings/${ratingId}`);

// Usuários
export const getUsers = () => api.get('/users');
export const updateUser = (cpf, userData) => api.put(`/users/${cpf}`, userData);
export const deleteUser = (cpf) => api.delete(`/users/${cpf}`);

export default api;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import Dashboard from './components/Dashboard';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import LoanPage from './components/LoanPage';
import RatingList from './components/RatingList';
import BooksPage from './components/BooksPage';
import './App.css';

const App = () => {
  const [token, setToken] = React.useState(localStorage.getItem('token'));

  React.useEffect(() => {
    console.log('Token atual:', token);
  }, [token]);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <LoginRegister onLogin={handleLogin} />} />
        <Route path="/dashboard" element={token ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/books" element={token ? <BooksPage /> : <Navigate to="/" />} />
        <Route path="/users" element={token ? <UserList /> : <Navigate to="/" />} />
        <Route path="/add-user" element={token ? <UserForm /> : <Navigate to="/" />} />
        <Route path="/loans" element={token ? <LoanPage /> : <Navigate to="/" />} />
        <Route path="/ratings" element={token ? <RatingList /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
};


export default App;

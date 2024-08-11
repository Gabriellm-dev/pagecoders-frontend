import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <ul className="dashboard-links">
        <li><Link to="/books" className="dashboard-link">Gerenciar Livros</Link></li>
        <li><Link to="/loans" className="dashboard-link">Gerenciar Empréstimos</Link></li>
        <li><Link to="/ratings" className="dashboard-link">Gerenciar Classificações</Link></li>
        <li><Link to="/users" className="dashboard-link">Gerenciar Usuários</Link></li>
      </ul>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;

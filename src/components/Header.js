import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <header className="header">
    <nav>
      <ul className="nav-list">
        <li><Link to="/books" className="nav-link">Lista de Livros</Link></li>
        <li><Link to="/add-book" className="nav-link">Adicionar Livro</Link></li>
        <li><Link to="/loans" className="nav-link">Empréstimos</Link></li>
        <li><Link to="/add-loan" className="nav-link">Adicionar Empréstimo</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;

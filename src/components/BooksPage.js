import React from 'react';
import BookList from './BookList';
import BookForm from './BookForm';
import './BooksPage.css';

const BooksPage = () => {
  return (
    <div className="books-page">
      <h1>Gerenciar Livros</h1>
      <div className="content-container">
        <div className="book-list-container">
          <BookList />
        </div>
        <div className="book-form-container">
          <BookForm />
        </div>
      </div>
    </div>
  );
};

export default BooksPage;

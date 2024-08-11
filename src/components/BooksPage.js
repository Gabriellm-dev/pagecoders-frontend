import React from 'react';
import BookList from './BookList';
import OtherUserBooksList from './OtherUsersBooksList'; // Verifique se o nome e o caminho estão corretos
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
        <div className="other-user-books-container">
          <OtherUserBooksList />
        </div>
      </div>
    </div>
  );
};

export default BooksPage;

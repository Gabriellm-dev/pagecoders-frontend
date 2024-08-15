import React, { useState } from 'react';
import BookList from './BookList';
import OtherUserBooksList from './OtherUsersBooksList';
import BookForm from './BookForm';
import './BooksPage.css';

const BooksPage = () => {
  const [newBook, setNewBook] = useState(null);

  const handleBookAdded = (book) => {
    setNewBook(book);
  };

  return (
    <div className="books-page">
      <h1>Gerenciar Livros</h1>
      <div className="content-container">
        <div className="book-list-container">
          <BookList newBook={newBook} />
        </div>
        <div className="book-form-container">
          <BookForm onBookAdded={handleBookAdded} />
        </div>
        <div className="other-user-books-container">
          <OtherUserBooksList />
        </div>
      </div>
    </div>
  );
};

export default BooksPage;

import React, { useEffect, useState } from 'react';
import { getBooks } from '../services/api';

const OtherUserBooksList = () => {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        setBooks(response.data);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
        setMessage('Erro ao buscar livros. Tente novamente.');
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Livros de Outros Usuários</h2>
      {message && <p>{message}</p>}
      <ul>
        {books.map((book) => (
          <li key={book.code}>
            {book.title} - {book.genre} - {book.fkUserCpf}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OtherUserBooksList;

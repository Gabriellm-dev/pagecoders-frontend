import React, { useEffect, useState } from 'react';
import { getBooks, updateBook, deleteBook } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    publisher: '',
    publicationDate: '',
    editionNumber: '',
    authors: '',
    genre: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          const userCpf = decodedToken.cpf;

          const response = await getBooks();
          const userBooks = response.data.filter(book => book.fkUserCpf === userCpf);
          setBooks(userBooks);
        }
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
        setMessage('Erro ao buscar livros. Tente novamente.');
      }
    };

    fetchBooks();
  }, []);

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setEditFormData({
      title: book.title,
      publisher: book.publisher,
      publicationDate: book.publicationDate ? book.publicationDate.split('T')[0] : '',
      editionNumber: book.editionNumber,
      authors: book.authors,
      genre: book.genre,
    });
  };

  const handleSave = async () => {
    try {
      await updateBook(editingBook.code, editFormData);
      setBooks(books.map((book) =>
        book.code === editingBook.code ? { ...book, ...editFormData } : book
      ));
      setMessage('Livro atualizado com sucesso');
      setEditingBook(null);
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
      setMessage('Erro ao atualizar livro. Tente novamente.');
    }
  };

  const handleDelete = async (code) => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      try {
        await deleteBook(code);
        setBooks(books.filter((book) => book.code !== code));
        setMessage('Livro excluído com sucesso');
      } catch (error) {
        console.error('Erro ao excluir livro:', error);
        setMessage('Erro ao excluir livro. Tente novamente.');
      }
    }
  };

  return (
    <div>
      <h2>Meus Livros</h2>
      {message && <p>{message}</p>}
      <ul>
        {books.map((book) => (
          <li key={book.code}>
            {editingBook && editingBook.code === book.code ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                  placeholder="Título"
                />
                <input
                  type="text"
                  name="publisher"
                  value={editFormData.publisher}
                  onChange={handleEditChange}
                  placeholder="Editora"
                />
                <input
                  type="date"
                  name="publicationDate"
                  value={editFormData.publicationDate}
                  onChange={handleEditChange}
                />
                <input
                  type="number"
                  name="editionNumber"
                  value={editFormData.editionNumber}
                  onChange={handleEditChange}
                  placeholder="Número da Edição"
                />
                <input
                  type="text"
                  name="authors"
                  value={editFormData.authors}
                  onChange={handleEditChange}
                  placeholder="Autores"
                />
                <input
                  type="text"
                  name="genre"
                  value={editFormData.genre}
                  onChange={handleEditChange}
                  placeholder="Gênero"
                />
                <button onClick={handleSave}>Salvar</button>
                <button onClick={() => setEditingBook(null)}>Cancelar</button>
              </>
            ) : (
              <>
                {book.title} - {book.authors}
                <button onClick={() => handleEdit(book)}>Editar</button>
                <button onClick={() => handleDelete(book.code)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;

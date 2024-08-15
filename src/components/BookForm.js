import React, { useState, useEffect } from 'react';
import { addBook } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const BookForm = ({ onBookAdded }) => {
  const [formData, setFormData] = useState({
    fkUserCpf: '',
    name: '',
    publisher: '',
    publicationDate: '',
    editionNumber: '',
    authors: '',
    genre: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userCpf = decodedToken.cpf;
      setFormData(prevFormData => ({
        ...prevFormData,
        fkUserCpf: userCpf
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'editionNumber' ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBook = await addBook(formData);
      setMessage('Livro adicionado com sucesso');
      onBookAdded(newBook.data);
      setFormData({
        fkUserCpf: formData.fkUserCpf,
        name: '',
        publisher: '',
        publicationDate: '',
        editionNumber: '',
        authors: '',
        genre: ''
      });
    } catch (error) {
      setMessage('Erro ao adicionar livro. Tente novamente.');
      console.error('Erro ao adicionar livro:', error);
    }
  };

  return (
    <div>
      <h2>Adicionar Livro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Título"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="publisher"
          placeholder="Editora"
          value={formData.publisher}
          onChange={handleChange}
        />
        <input
          type="date"
          name="publicationDate"
          value={formData.publicationDate}
          onChange={handleChange}
        />
        <input
          type="number"
          name="editionNumber"
          placeholder="Número da Edição"
          value={formData.editionNumber}
          onChange={handleChange}
        />
        <input
          type="text"
          name="authors"
          placeholder="Autores"
          value={formData.authors}
          onChange={handleChange}
        />
        <input
          type="text"
          name="genre"
          placeholder="Gênero"
          value={formData.genre}
          onChange={handleChange}
        />
        <button type="submit">Adicionar Livro</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookForm;

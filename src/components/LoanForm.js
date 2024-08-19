import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { addLoan, getAvailableBooks } from '../services/api';
import './LoanForm.css';

const LoanForm = () => {
  const [formData, setFormData] = useState({
    fkBookCode: '',
    expectedReturnDate: ''
  });
  const [availableBooks, setAvailableBooks] = useState([]);
  const [message, setMessage] = useState('');
  const [userCpf, setUserCpf] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserCpf(decodedToken.cpf);
    } else {
      console.error('Token não encontrado no localStorage.');
    }
  }, []);

  useEffect(() => {
    const fetchAvailableBooks = async () => {
      try {
        const books = await getAvailableBooks();      
        const filteredBooks = books.filter(book => book.userCpf !== userCpf);
        setAvailableBooks(filteredBooks);
      } catch (error) {
        console.error('Erro ao buscar livros disponíveis:', error);
      }
    };

    if (userCpf) {
      fetchAvailableBooks();
    }
  }, [userCpf]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const loanData = {
      bookCode: Number(formData.fkBookCode),
      expectedReturnDate: formData.expectedReturnDate,
      userCpf: userCpf,
    };
  
    try {
      await addLoan(loanData);
      setMessage('Solicitação de empréstimo enviada. O empréstimo será registrado com a data atual ao ser autorizado.');
      setFormData({
        fkBookCode: '',
        expectedReturnDate: ''
      });
    } catch (error) {
      setMessage('Erro ao solicitar empréstimo. Por favor, tente novamente.');
      console.error('Erro ao adicionar empréstimo:', error);
    }
  };

  return (
    <div className="loan-form">
      <h2>Solicitar Empréstimo de Livro</h2>
      <p>Preencha as informações abaixo para solicitar um empréstimo de livro:</p>
      <form onSubmit={handleSubmit}>
        <label>
          Selecione o Livro:
          <select
            name="fkBookCode"
            value={formData.fkBookCode}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um livro</option>
            {availableBooks.map((book) => (
              <option key={book.code} value={book.code}>
                {book.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Data de Devolução Prevista:
          <input
            type="date"
            name="expectedReturnDate"
            value={formData.expectedReturnDate}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Solicitar Empréstimo</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default LoanForm;

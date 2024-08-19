import React, { useState, useEffect } from 'react';
import { addLoan, getAvailableBooks } from '../services/api'; // Certifique-se de que getAvailableBooks traz todos os livros
import './LoanForm.css';

const LoanForm = () => {
  const [formData, setFormData] = useState({
    fkBookCode: '',
    expectedReturnDate: ''
  });
  const [availableBooks, setAvailableBooks] = useState([]);
  const [message, setMessage] = useState('');

  // Obtenha o CPF do usuário logado do localStorage
  const userCpf = localStorage.getItem('cpf');

  // Adicione uma verificação para garantir que o CPF está sendo encontrado
  useEffect(() => {
    if (!userCpf) {
      console.error('CPF do usuário não encontrado no localStorage.');
    }
  }, [userCpf]);

  // Filtra os livros disponíveis, excluindo aqueles do usuário logado
  useEffect(() => {
    const fetchAvailableBooks = async () => {
      try {
        const books = await getAvailableBooks();
        console.log('Livros disponíveis:', books);
        
        // Filtra os livros para excluir os do próprio usuário logado
        const filteredBooks = books.filter(book => book.userCpf !== userCpf);
        setAvailableBooks(filteredBooks);
      } catch (error) {
        console.error('Erro ao buscar livros disponíveis:', error);
      }
    };

    fetchAvailableBooks();
  }, [userCpf]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loanData = {
        ...formData,
        userCpf: userCpf, // Inclui o CPF do usuário logado
      };

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
                {book.title} {/* Atualize para exibir o título do livro */}
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

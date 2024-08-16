import React, { useState } from 'react';
import { addLoan } from '../services/api';
import './LoanForm.css';

const LoanForm = () => {
  const [formData, setFormData] = useState({
    bookCode: '',
    expectedReturnDate: ''
  });
  const [message, setMessage] = useState('');

  const userCpf = localStorage.getItem('cpf');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loanData = {
        ...formData,
        userCpf: userCpf,
      };

      await addLoan(loanData);
      setMessage('Solicitação de empréstimo enviada. O empréstimo será registrado com a data atual ao ser autorizado.');
      setFormData({
        bookCode: '',
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
          Código do Livro:
          <input
            type="number"
            name="bookCode"
            placeholder="Insira o código do livro"
            value={formData.bookCode}
            onChange={handleChange}
            required
          />
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

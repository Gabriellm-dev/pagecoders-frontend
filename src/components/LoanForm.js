import React, { useState } from 'react';
import { addLoan } from '../services/api';
import './LoanForm.css'; // Supondo que você tenha um arquivo CSS para estilização

const LoanForm = () => {
  const [formData, setFormData] = useState({
    userCpf: '',
    bookCode: '',
    loanDate: '',
    expectedReturnDate: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addLoan(formData);
      setMessage('Empréstimo adicionado com sucesso');
      setFormData({
        userCpf: '',
        bookCode: '',
        loanDate: '',
        expectedReturnDate: ''
      });
    } catch (error) {
      setMessage('Erro ao adicionar empréstimo. Tente novamente.');
      console.error('Erro ao adicionar empréstimo:', error);
    }
  };

  return (
    <div className="loan-form">
      <h2>Adicionar Empréstimo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userCpf"
          placeholder="CPF do Usuário"
          value={formData.userCpf}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="bookCode"
          placeholder="Código do Livro"
          value={formData.bookCode}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="loanDate"
          value={formData.loanDate}
          onChange={handleChange}
        />
        <input
          type="date"
          name="expectedReturnDate"
          value={formData.expectedReturnDate}
          onChange={handleChange}
        />
        <button type="submit">Adicionar Empréstimo</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default LoanForm;

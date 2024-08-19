import React, { useState, useEffect } from 'react';
import { getLoans, authorizeLoan, returnLoan } from '../services/api';
import './LoanList.css';

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await getLoans();
        const userCpf = localStorage.getItem('cpf');
        const filteredLoans = response.data.filter(loan =>
          loan.userCpf === userCpf || loan.bookOwnerCpf === userCpf
        );
        setLoans(filteredLoans);
      } catch (err) {
        setError('Erro ao carregar empréstimos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const handleAuthorize = async (loanId) => {
    try {
      await authorizeLoan(loanId);
      setLoans(loans.map(loan => 
        loan.loanId === loanId ? { ...loan, loanAuthorized: true } : loan
      ));
    } catch (err) {
      setError('Erro ao autorizar empréstimo.');
      console.error(err);
    }
  };

  const handleReturn = async (loanId) => {
    try {
      await returnLoan(loanId);
      setLoans(loans.map(loan => 
        loan.loanId === loanId ? { ...loan, returnDate: new Date().toISOString() } : loan
      ));
    } catch (err) {
      setError('Erro ao devolver empréstimo.');
      console.error(err);
    }
  };

  if (loading) return <p>Carregando empréstimos...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="loan-list">
      <h2>Lista de Empréstimos</h2>
      <ul>
        {loans.map(loan => (
          <li key={loan.loanId}>
            {loan.book.title} - {loan.user.name}
            {loan.loanAuthorized ? (
              <button className="return-button" onClick={() => handleReturn(loan.loanId)}>Devolver</button>
            ) : (
              <button className="authorize-button" onClick={() => handleAuthorize(loan.loanId)}>Autorizar</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanList;

import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getLoans, authorizeLoan, returnLoan } from '../services/api';
import './LoanList.css';

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userCpf, setUserCpf] = useState('');

  useEffect(() => {
    const fetchUserCpf = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUserCpf(decodedToken.cpf);
        } catch (error) {
          console.error('Erro ao decodificar o token:', error);
          setError('Erro ao obter o CPF do usuário.');
        }
      } else {
        setError('Token não encontrado. Faça o login novamente.');
      }
    };

    const fetchLoans = async () => {
      if (userCpf) {
        try {
          const response = await getLoans();
          const filteredLoans = response.data.filter(loan =>
            loan.userCpf === userCpf || loan.bookOwnerCpf === userCpf
          );
          setLoans(filteredLoans);
        } catch (err) {
          setError('Erro ao carregar empréstimos.');
          console.error('Erro ao carregar empréstimos:', err.response ? err.response.data : err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserCpf();
    fetchLoans();
  }, [userCpf]);

  const handleAuthorize = async (loanId) => {
    try {
      await authorizeLoan(loanId);
      setLoans(loans.map(loan => 
        loan.loanId === loanId ? { ...loan, loanAuthorized: true } : loan
      ));
    } catch (err) {
      setError('Erro ao autorizar empréstimo.');
      console.error('Erro ao autorizar empréstimo:', err.response ? err.response.data : err.message);
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
      console.error('Erro ao devolver empréstimo:', err.response ? err.response.data : err.message);
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

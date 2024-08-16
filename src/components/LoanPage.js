import React from 'react';
import LoanForm from './LoanForm';
import LoanList from './LoanList';
import './LoanPage.css';

const LoanPage = () => {
  return (
    <div className="loan-page">
      <h1>Gerenciamento de Empréstimos</h1>
      <div className="loan-sections">
        <div className="loan-section">
          <LoanForm />
        </div>
        <div className="loan-section">
          <LoanList />
        </div>
      </div>
    </div>
  );
};

export default LoanPage;

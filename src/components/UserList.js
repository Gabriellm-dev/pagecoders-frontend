import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../services/api';
import './UserList.css'; // Supondo que você tenha um arquivo CSS para estilização

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        setError('Erro ao carregar usuários.');
        console.error('Erro ao buscar usuários:', error.response?.data || error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (cpf) => {
    const confirm = window.confirm('Você tem certeza que deseja excluir este usuário?');
    if (confirm) {
      try {
        await deleteUser(cpf);
        setUsers(users.filter(user => user.cpf !== cpf));
        setSuccess('Usuário excluído com sucesso.');
      } catch (error) {
        setError('Erro ao excluir usuário.');
        console.error('Erro ao excluir usuário:', error.response?.data || error.message);
      }
    }
  };

  return (
    <div className="user-list-container">
      <h2>Lista de Usuários</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <ul className="user-list">
        {users.map(user => (
          <li key={user.cpf} className="user-list-item">
            {user.name} ({user.email})
            <button className="delete-button" onClick={() => handleDelete(user.cpf)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

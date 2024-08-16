import React, { useState, useEffect } from 'react';
import { registerUser, updateUser } from '../services/api';
import './UserForm.css';

const UserForm = ({ isEdit, existingUser }) => {
  const [formData, setFormData] = useState({
    cpf: '',
    email: '',
    name: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    zip: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEdit && existingUser) {
      setFormData({
        cpf: existingUser.cpf,
        email: existingUser.email,
        name: existingUser.name,
        street: existingUser.street || '',
        number: existingUser.number || '',
        neighborhood: existingUser.neighborhood || '',
        city: existingUser.city || '',
        state: existingUser.state || '',
        zip: existingUser.zip || '',
      });
    }
  }, [isEdit, existingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (isEdit) {
        await updateUser(formData.cpf, formData);
        setSuccess('Usuário atualizado com sucesso!');
      } else {
        await registerUser(formData);
        setSuccess('Usuário registrado com sucesso!');
        setFormData({
          cpf: '',
          email: '',
          name: '',
          street: '',
          number: '',
          neighborhood: '',
          city: '',
          state: '',
          zip: '',
        });
      }
    } catch (error) {
      setError('Erro ao processar a solicitação. Tente novamente.');
      console.error('Erro ao processar o formulário:', error.response?.data || error.message);
    }
  };

  return (
    <div className="user-form-container">
      <h2>{isEdit ? 'Atualizar Usuário' : 'Registrar Usuário'}</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className="user-form">
        <input type="text" name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} required={!isEdit} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="name" placeholder="Nome" value={formData.name} onChange={handleChange} required />
        <input type="text" name="street" placeholder="Rua" value={formData.street} onChange={handleChange} />
        <input type="number" name="number" placeholder="Número" value={formData.number} onChange={handleChange} />
        <input type="text" name="neighborhood" placeholder="Bairro" value={formData.neighborhood} onChange={handleChange} />
        <input type="text" name="city" placeholder="Cidade" value={formData.city} onChange={handleChange} />
        <input type="text" name="state" placeholder="Estado" value={formData.state} onChange={handleChange} />
        <input type="text" name="zip" placeholder="CEP" value={formData.zip} onChange={handleChange} />
        <button type="submit" className="submit-button">{isEdit ? 'Atualizar' : 'Registrar'}</button>
      </form>
    </div>
  );
};

export default UserForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';
import './LoginRegister.css';

const estadosValidos = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
  "SP", "SE", "TO"
];

const LoginRegister = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    cpf: '',
    name: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    zip: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validação e sanitização para CPF
    if (name === 'cpf') {
      const sanitizedValue = value.replace(/\D/g, '');
      setFormData(prevFormData => ({ ...prevFormData, [name]: sanitizedValue }));
    }
    // Validação e sanitização para Estado
    else if (name === 'state') {
      const upperCaseValue = value.toUpperCase();
      if (upperCaseValue.length <= 2) {
        setFormData(prevFormData => ({ ...prevFormData, [name]: upperCaseValue }));
      }
    }
    // Validação e sanitização para CEP
    else if (name === 'zip') {
      const sanitizedValue = value.replace(/\D/g, '');
      if (sanitizedValue.length <= 8) {
        setFormData(prevFormData => ({ ...prevFormData, [name]: sanitizedValue }));
      }
    }
    // Validação e sanitização para outros campos
    else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    // Se for login, não valida estado e CEP
    if (!isLogin) {
      // Verificação do estado
      if (!estadosValidos.includes(formData.state)) {
        setError('Por favor, insira um estado válido.');
        return;
      }
  
      // Verificação do CEP
      if (formData.zip.length !== 8) {
        setError('O CEP deve conter exatamente 8 dígitos.');
        return;
      }
    }
  
    // Converte o valor de 'number' para inteiro, ou null se estiver vazio
    const formDataToSend = {
      ...formData,
      number: formData.number ? parseInt(formData.number, 10) : null,
    };
  
    try {
      if (isLogin) {
        const response = await loginUser({ email: formData.email, password: formData.password });
        const token = response.data.token;
        localStorage.setItem('token', token);
        onLogin(token);
        navigate('/dashboard');
      } else {
        await registerUser(formDataToSend);
        setIsLogin(true);
        setFormData({
          email: '',
          password: '',
          cpf: '',
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
      setError('Erro ao autenticar. Verifique suas informações e tente novamente.');
      console.error('Erro ao autenticar:', error.response?.data || error.message);
    }
  };
  

  return (
    <div className="auth-container">
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <>
            <input
              type="text"
              name="cpf"
              placeholder="CPF"
              value={formData.cpf}
              onChange={handleChange}
              maxLength={11} // Limite de 11 dígitos
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              maxLength={100} // Limite de caracteres
              required
            />
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
              maxLength={150} // Limite de caracteres
            />
            <input
              type="text" // Alterado para 'text' para compatibilidade
              name="number"
              placeholder="Number"
              value={formData.number}
              onChange={handleChange}
              maxLength={10} // Limite de caracteres
            />
            <input
              type="text"
              name="neighborhood"
              placeholder="Neighborhood"
              value={formData.neighborhood}
              onChange={handleChange}
              maxLength={100} // Limite de caracteres
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              maxLength={100} // Limite de caracteres
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              maxLength={2} // Limite de 2 caracteres
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={formData.zip}
              onChange={handleChange}
              maxLength={8} // Limite de 8 caracteres
              required
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-button">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} className="toggle-button">
        {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
      </button>
    </div>
  );
};

export default LoginRegister;

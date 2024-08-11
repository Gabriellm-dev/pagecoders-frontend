import React, { useState, useEffect } from 'react';
import { getRatings, deleteRating } from '../services/api';
import './RatingList.css';

const RatingList = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await getRatings();
        setRatings(response.data);
      } catch (err) {
        setError('Erro ao carregar classificações.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  const handleDelete = async (ratingId) => {
    if (window.confirm('Tem certeza de que deseja excluir esta classificação?')) {
      try {
        await deleteRating(ratingId);
        setRatings(ratings.filter(rating => rating.ratingId !== ratingId));
      } catch (err) {
        setError('Erro ao excluir a classificação.');
        console.error(err);
      }
    }
  };

  if (loading) return <p>Carregando classificações...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="rating-list">
      <h2>Lista de Classificações</h2>
      <ul>
        {ratings.map(rating => (
          <li key={rating.ratingId} className="rating-item">
            <p><strong>Livro:</strong> {rating.bookRating}</p>
            <p><strong>Usuário:</strong> {rating.userRating}</p>
            <p><strong>Comentário:</strong> {rating.comment}</p>
            <button className="delete-button" onClick={() => handleDelete(rating.ratingId)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RatingList;

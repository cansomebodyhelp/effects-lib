import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function Home() {
  const vantaRef = useRef(null); // Ссылка на DOM-элемент
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Загружаем категории из API
  useEffect(() => {
    fetch('https://lib-back-ab58.onrender.com/api/categories')
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div ref={vantaRef} className="App">
      <header className="App-header">
        <h1>Video Library of Effects</h1>
      </header>
      <div className="categories">
        {categories.map((category) => (
          <div
            key={category.id}
            className="category-container fade-in"
            style={{ backgroundImage: `url(${category.preview_link})` }}
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="category-text">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем, есть ли данные в localStorage
    const cachedCategories = localStorage.getItem('categories');

    if (cachedCategories) {
      // Если данные есть в localStorage, используем их
      console.log('Using cached data from localStorage');
      setCategories(JSON.parse(cachedCategories));
      setLoading(false);
    } else {
      // Если данных нет, загружаем их с API
      console.log('Fetching data from API');
      fetch('https://lib-back-ab58.onrender.com/api/categories')
        .then((response) => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then((data) => {
          setCategories(data);
          setLoading(false);
          // Сохраняем данные в localStorage для последующих запросов
          console.log('Saving data to localStorage');
          localStorage.setItem('categories', JSON.stringify(data));
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="App">
      <header
        className="App-header"
        style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}
      >
        <h1>Video Library of Effects</h1>
      </header>

      {loading ? (
        <div className="loading-screen">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
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
      )}
    </div>
  );
}

export default Home;

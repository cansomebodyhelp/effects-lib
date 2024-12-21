import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/categories')
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
        <div className="spinner"></div> {}
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`); //
  };

  return (
    <div className="App">
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

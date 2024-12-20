import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from 'react-router-dom'; // Import useParams for getting parameters from the URL
import './App.css'; // Importing styles

// Home page where all categories are displayed
function Home() {
  const [categories, setCategories] = useState([]); // State for categories
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for handling errors
  const navigate = useNavigate(); // Hook for navigation between pages

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/categories') // Request to the server to get categories
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok'); // Error handling for request failures
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data); // Update categories list
        setLoading(false); // Set loading state to false
      })
      .catch((error) => {
        setError(error.message); // Error handling
        setLoading(false);
      });
  }, []); // Empty dependency array means this effect runs only once on component mount

  if (loading) {
    return <div>Loading...</div>; // Loading message while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Error message if something went wrong
  }

  // Click handler for category
  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`); // Navigate to the category page
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Library of Effects</h1>
      </header>
      <div className="categories">
        {categories.length === 0 ? (
          <p>No categories available</p> // If no categories, show this message
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="category-container"
              style={{
                backgroundImage: `url(${category.preview_link})`,
              }}
              onClick={() => handleCategoryClick(category.id)} // Navigation on click
            >
              <div className="category-text">{category.name}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Category page with videos for selected category
function CategoryPage() {
  const { categoryId } = useParams(); // Use useParams to get the category ID from the URL
  const [videos, setVideos] = useState([]); // State for videos
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/videos/${categoryId}`) // Request to get videos for the specific category
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setVideos(data); // Update videos list
        setLoading(false); // Set loading state to false
      })
      .catch((error) => {
        setError(error.message); // Handle any errors during fetch
        setLoading(false);
      });
  }, [categoryId]); // Re-run the effect whenever the categoryId changes

  if (loading) {
    return <div>Loading...</div>; // Show loading message while videos are being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if something went wrong
  }

  return (
    <div className="category-page">
      <header className="category-header">
        <h2>Category ID: {categoryId}</h2>
      </header>
      <div className="videos">
        {videos.length === 0 ? (
          <p>No videos available in this category</p> // Show this message if no videos
        ) : (
          videos.map((video) => (
            <div key={video.id} className="video">
              <h3>{video.name}</h3>
              <img src={video.preview_link} alt={video.name} />
              <a
                href={video.video_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Video
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;

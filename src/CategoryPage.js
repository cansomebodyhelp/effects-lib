import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';

function CategoryPage() {
  const { categoryId } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null); // Стан для обраного відео
  const [isVideoMode, setIsVideoMode] = useState(false); // Режим перегляду відео

  // Завантажуємо дані відео з API
  useEffect(() => {
    fetch(`https://lib-back-ab58.onrender.com/api/videos/${categoryId}`)
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        setVideos(data);
        if (data.length > 0) {
          setCategoryName(data[0].category_name || `Category ${categoryId}`);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [categoryId]);

  // Обробник для кліку на відео
  const handleVideoClick = (video) => {
    setSelectedVideo(video); // Встановлюємо обране відео
    setIsVideoMode(true); // Вмикаємо режим перегляду відео
  };

  // Закрити поп-ап з відео
  const handleClosePopup = () => {
    setSelectedVideo(null); // Закриваємо поп-ап
    setIsVideoMode(false); // Повертаємося до режиму категорій
  };

  // Обробка помилки
  if (error) return <div className="error">Error: {error}</div>;

  // Виводимо посилання у консоль для налагодження
  useEffect(() => {
    if (selectedVideo) {
      const videoUrl = `https://www.youtube.com/embed/${selectedVideo.video_id}`;
      console.log('Video URL:', videoUrl); // Логуємо URL відео
    }
  }, [selectedVideo]);

  return (
    <div className="category-page">
      {loading ? (
        <div className="skeleton">
          {/* Скелетон замість тексту */}
          <div className="skeleton-header"></div>
          <div className="skeleton-cards">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="skeleton-card"></div>
              ))}
          </div>
        </div>
      ) : (
        <>
          {/* Заголовок категорії */}
          <header
            className={`category-header ${isVideoMode ? 'header-hidden' : ''}`}
          >
            <h1>{categoryName}</h1>
          </header>

          {/* Список відео */}
          <div
            className={`categories ${isVideoMode ? 'categories-hidden' : ''}`}
          >
            {videos.map((video) => (
              <div
                key={video.id}
                className="category-container"
                style={{
                  backgroundImage: `url(${video.preview_link})`,
                }}
                onClick={() => handleVideoClick(video)} // Відкриваємо поп-ап при кліку на картку
              >
                <div className="category-text">{video.name}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Показуємо поп-ап, якщо відео обрано */}
      {selectedVideo && (
        <div className="video-view">
          <button className="close-video" onClick={handleClosePopup}>
            &times;
          </button>
          <div className="video-player">
            {/* Вбудовуємо YouTube плеєр з використанням video_id */}
            <iframe
              width="1008"
              height="567"
              src={`https://www.youtube.com/embed/${selectedVideo.video_id}`} // Формуємо посилання з video_id
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="video-info">
            <h2>{selectedVideo.name}</h2>
            <h3>Category: {selectedVideo.category_name}</h3>{' '}
            {/* Заголовок для категорії */}
            <p>{selectedVideo.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;

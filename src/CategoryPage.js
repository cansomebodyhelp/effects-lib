import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';

function CategoryPage() {
  const { categoryId } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null); // Состояние для выбранного видео
  const [isVideoMode, setIsVideoMode] = useState(false); // Режим просмотра видео

  // Загружаем данные видео из API
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/videos/${categoryId}`)
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

  // Обработчик для клика по видео
  const handleVideoClick = (video) => {
    setSelectedVideo(video); // Устанавливаем выбранное видео
    setIsVideoMode(true); // Включаем режим просмотра видео
  };

  // Закрыть поп-ап с видео
  const handleClosePopup = () => {
    setSelectedVideo(null); // Закрываем поп-ап
    setIsVideoMode(false); // Возвращаемся в режим категорий
  };

  // Обработчик ошибки
  if (error) return <div className="error">Error: {error}</div>;

  // Выводим ссылку в консоль для отладки
  useEffect(() => {
    if (selectedVideo) {
      const videoUrl = `https://www.youtube.com/embed/${selectedVideo.video_id}`;
      console.log('Video URL:', videoUrl); // Логируем URL видео
    }
  }, [selectedVideo]);

  return (
    <div className="category-page">
      {loading ? (
        <div className="skeleton">
          {/* Скелетон вместо текста */}
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
          {/* Заголовок категории */}
          <header
            className={`category-header ${isVideoMode ? 'header-hidden' : ''}`}
          >
            <h1>{categoryName}</h1>
          </header>

          {/* Список видео */}
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
                onClick={() => handleVideoClick(video)} // Открываем поп-ап при клике на карточку
              >
                <div className="category-text">{video.name}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Показываем поп-ап, если видео выбрано */}
      {selectedVideo && (
        <div className="video-view">
          <button className="close-video" onClick={handleClosePopup}>
            &times;
          </button>
          <div className="video-player">
            {/* Встраиваем YouTube плеер с использованием video_id */}
            <iframe
              width="1008"
              height="567"
              src={`https://www.youtube.com/embed/${selectedVideo.video_id}`} // Формируем ссылку с video_id
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="video-info">
            <h2>{selectedVideo.name}</h2>
            <h3>Category: {selectedVideo.category_name}</h3>{' '}
            {/* Заголовок для категории */}
            <p>{selectedVideo.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;

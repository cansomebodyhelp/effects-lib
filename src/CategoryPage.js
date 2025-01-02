import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';

function CategoryPage() {
  const { categoryId } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoMode, setIsVideoMode] = useState(false);

  useEffect(() => {
    const cachedVideos = localStorage.getItem(`videos_${categoryId}`);
    const cachedCategoryName = localStorage.getItem(
      `categoryName_${categoryId}`
    );

    if (cachedVideos && cachedCategoryName) {
      setVideos(JSON.parse(cachedVideos));
      setCategoryName(cachedCategoryName);
      setLoading(false);
    } else {
      setCategoryName('Loading...');
      fetch(`https://lib-back-ab58.onrender.com/api/videos/${categoryId}`)
        .then((response) => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then((data) => {
          setVideos(data);
          if (data.length > 0) {
            const category = data[0].category_name || `Category ${categoryId}`;
            setCategoryName(category);
            localStorage.setItem(`categoryName_${categoryId}`, category);
          }
          localStorage.setItem(`videos_${categoryId}`, JSON.stringify(data));
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [categoryId]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsVideoMode(true);
  };

  const handleClosePopup = () => {
    setSelectedVideo(null);
    setIsVideoMode(false);
  };

  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="category-page">
      {loading ? (
        <div className="skeleton">
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
          <header
            className={`category-header ${isVideoMode ? 'header-hidden' : ''}`}
          >
            <h1>{categoryName}</h1>
          </header>

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
                onClick={() => handleVideoClick(video)}
              >
                <div className="category-text">{video.name}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedVideo && (
        <div className="video-view">
          <button className="close-video" onClick={handleClosePopup}>
            &times;
          </button>
          <div className="video-player">
            <iframe
              width="1008"
              height="567"
              src={`https://www.youtube.com/embed/${selectedVideo.video_id}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="video-info">
            <h2>{selectedVideo.name}</h2>
            <h3>Category: {selectedVideo.category_name}</h3>
            <p>{selectedVideo.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;

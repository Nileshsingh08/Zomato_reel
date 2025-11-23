import {useState, useEffect} from 'react';
import './Home.css'; // Import the new CSS file
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useRef } from 'react';

// Placeholder data for the video reels
// const reelsData = [
//   {
//     id: 1,
//     videoUrl: "https://ik.imagekit.io/hhoyye7b5/2fc611ed-06b4-4054-a126-05939568a2a8_kDj3ZwOmf",
//     description: 'Delicious burgers and fries, cooked to perfection in our bustling kitchen. Come taste the quality!',
//     storeLink: '/store/1'
//   },
//   {
//     id: 2,
//     videoUrl: "https://ik.imagekit.io/hhoyye7b5/2fc611ed-06b4-4054-a126-05939568a2a8_kDj3ZwOmf",
//     description: 'Our chef preparing a gourmet meal with fresh, locally-sourced ingredients. Experience fine dining with us.',
//     storeLink: '/store/2'
//   },
//   {
//     id: 3,
//     videoUrl: "https://ik.imagekit.io/hhoyye7b5/2fc611ed-06b4-4054-a126-05939568a2a8_kDj3ZwOmf",
//     description: 'Freshly sliced avocado, ready for our signature salads and toasts. Healthy, fresh, and delicious every day.',
//     storeLink: '/store/3'
//   }
// ];

function Home() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRefs = useRef(new Map());
  const containerRef = useRef(null);

  // Handle mobile viewport height
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);

  // Debug: Log videos state whenever it changes
  useEffect(() => {
    console.log('Videos state updated:', videos);
  }, [videos]);

  const navigate = useNavigate();
  
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    axios.get('http://localhost:3000/api/food/', {withCredentials: true})
      .then(response => {
        console.log('API Response:', response.data); // Log the entire response
        if (response.data && response.data.food) {
          console.log('Food Items:', response.data.food); // Log the food items
          setVideos(response.data.food);
        } else {
          console.log('No food items in response:', response.data); // Log when no food items found
          setError('No videos found');
        }
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
        setError('Failed to load videos');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="home-container">
        <div className="loading-message">Loading videos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="home-container">
        <div className="empty-message">No videos available</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {videos.map(reel => (
        <div key={reel._id} className="video-reel">
          <video 
            className="video-player" 
            src={reel.video} 
            autoPlay 
            loop 
            muted 
            playsInline
          />
          <div className="video-overlay">
            <p className="video-description">{reel.description}</p>
            <Link to={`/food-partner/${reel._id}`} className="visit-store-btn">
              Visit Store
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;

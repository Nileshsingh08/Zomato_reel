import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/profile.css';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({
    name: 'Loading...',
    address: 'Loading...',
    totalMeals: 0,
    customersServed: 0,
  });
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
      .then(response => {
        if (response.data && response.data.foodPartner) {
          setProfile(response.data.foodPartner);
          // backend returns food items in `foodItems` property
          setVideos(response.data.foodItems || []);
        } else {
          setError('Could not load profile data');
        }
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleAddVideo = () => {
    console.log('Add video clicked');
  };

  const profileInitial = profile.name ? profile.name.charAt(0).toUpperCase() : '?';

  if (isLoading) {
    return (
      <div className="profile-container">
        <div className="loading-message">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-image">
            {profileInitial}
          </div>
          <div className="business-details">
            <h1 className="business-name">{profile.businessName}</h1>
            <p className="business-address">{profile.address}</p>
          </div>
        </div>
        
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-value">{profile.totalMeals || 0}</div>
            <div className="stat-label">Total Meals</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{profile.customersServed || 0}</div>
            <div className="stat-label">Customers Served</div>
          </div>
        </div>
      </div>

      <div className="videos-grid">
        {videos.map((video, index) => (
          <div key={video._id || index} className="video-item">
            {/* video model might use `video`, `videoUrl`, or `url` depending on backend; pick whichever exists */}
            <video src={video.video || video.videoUrl || video.url} controls />
          </div>
        ))}
        <div className="video-item add-video" onClick={handleAddVideo}>
          +
        </div>
      </div>
    </div>
  );
};

export default Profile;

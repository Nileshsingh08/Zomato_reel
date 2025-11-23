import React, { useState } from 'react';
import './CreateFood.css';
import axios from 'axios';


const CreateFood = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    video: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        video: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      if (formData.video) {
        formDataToSend.append('video', formData.video);
      }

      const response = await axios.post('http://localhost:3000/api/food', formDataToSend, { withCredentials: true });

      // log status for debugging when frontend shows failure but DB has record
      console.log('Create food response status:', response.status);
      const data = response.data;
      console.log('Create food response body:', data);

      // treat any 2xx status as success (201 is expected)
      if (response.status >= 200 && response.status < 300) {
        setMessage(data?.message || '✅ Food item created successfully!');
        setFormData({ name: '', description: '', video: null });
        setPreview(null);
      } else {
        // show backend-provided message if available to aid debugging
        setMessage('❌ Failed to create food item. ' + (data?.message || 'Please try again.'));
        console.error('Create food failed:', response.status, data);
      }
    } catch (error) {
      setMessage('❌ Error uploading food item: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearVideo = () => {
    setFormData((prev) => ({
      ...prev,
      video: null,
    }));
    setPreview(null);
  };

  return (
    <div className="create-food-container">
      <div className="create-food-card">
        <h1 className="create-food-title">Add New Dish</h1>

        <form onSubmit={handleSubmit} className="create-food-form">
          {/* Video Upload Section */}
          <div className="form-group">
            <label className="form-label">Upload Video</label>
            <div className="video-upload-wrapper">
              {preview ? (
                <div className="video-preview-container">
                  <video
                    src={preview}
                    controls
                    className="video-preview"
                  />
                  <button
                    type="button"
                    className="clear-video-btn"
                    onClick={clearVideo}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="video-upload-label">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="video-input"
                  />
                  <div className="upload-placeholder">
                    <span className="upload-icon">📹</span>
                    <p className="upload-text">Tap to upload video</p>
                    <p className="upload-subtext">MP4, WebM, OGG</p>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Name Input */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Dish Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Margherita Pizza"
              className="form-input"
              required
            />
          </div>

          {/* Description Textarea */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your dish, ingredients, special notes..."
              className="form-textarea"
              rows="4"
              required
            />
          </div>

          {/* Message Display */}
          {message && (
            <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Dish'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;

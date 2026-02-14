import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { toast } from 'react-toastify';
import { issuesAPI } from '../services/api';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './ReportIssue.css';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ position, setPosition, checkNearby }) => {
  useMapEvents({
    click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      setPosition([lat, lng]);
      if (checkNearby) {
        checkNearby(lat, lng);
      }
    },
  });

  return position ? <Marker position={position} /> : null;
};

const ReportIssue = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Pothole',
    address: '',
    priority: 'Medium',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [position, setPosition] = useState(null);
  const [nearbyIssues, setNearbyIssues] = useState([]);

  // Check for nearby issues
  const checkNearbyIssues = async (lat, lng) => {
    try {
      const response = await issuesAPI.getNearby(lng, lat, 1); // 1km radius
      if (response.data.data.length > 0) {
        setNearbyIssues(response.data.data);
      }
    } catch (error) {
      console.error('Failed to check nearby issues');
    }
  };

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setPosition([lat, lng]);
          checkNearbyIssues(lat, lng);
          toast.success('Location detected!');
        },
        (error) => {
          toast.error('Unable to get your location');
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!position) {
      toast.error('Please select a location on the map');
      return;
    }

    if (!image) {
      toast.error('Please upload an image');
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('address', formData.address);
      data.append('priority', formData.priority);
      data.append('coordinates', JSON.stringify([position[1], position[0]])); // [lng, lat]
      data.append('image', image);

      await issuesAPI.create(data);
      toast.success('Issue reported successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to report issue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-issue-page">
      <div className="container">
        <div className="page-header">
          <h1>Report an Issue</h1>
          <p>Help improve your community by reporting civic issues</p>
        </div>

        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-grid">
            <div className="form-section">
              <h2>Issue Details</h2>

              <div className="form-group">
                <label htmlFor="title">Issue Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Large pothole on Main Street"
                  maxLength="100"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="Pothole">Pothole</option>
                  <option value="Broken Streetlight">Broken Streetlight</option>
                  <option value="Garbage Overflow">Garbage Overflow</option>
                  <option value="Water Leakage">Water Leakage</option>
                  <option value="Road Damage">Road Damage</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  className="form-control"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Describe the issue in detail..."
                  maxLength="500"
                  rows="4"
                />
                <small className="text-muted">
                  {formData.description.length}/500 characters
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address/Location *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Main Street, near City Mall"
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Upload Image *</label>
                <input
                  type="file"
                  id="image"
                  className="form-control"
                  onChange={handleImageChange}
                  accept="image/*"
                  required
                />
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                  </div>
                )}
              </div>
            </div>

            <div className="form-section">
              <h2>Location on Map</h2>
              <p className="text-muted mb-2">
                Click on the map to select the exact location or use your current location
              </p>

              <button
                type="button"
                className="btn btn-outline mb-2"
                onClick={getCurrentLocation}
              >
                📍 Use Current Location
              </button>

              {nearbyIssues.length > 0 && (
                <div className="nearby-alert">
                  <div className="alert-header">
                    ⚠️ <strong>{nearbyIssues.length} issue(s) already reported within 1km</strong>
                  </div>
                  <div className="nearby-list">
                    {nearbyIssues.slice(0, 3).map((issue) => (
                      <div key={issue._id} className="nearby-item">
                        <span>{issue.title}</span>
                        <span className="badge">{issue.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="map-container">
                <MapContainer
                  center={position || [12.9716, 77.5946]}
                  zoom={13}
                  style={{ height: '400px', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  <LocationMarker 
                    position={position} 
                    setPosition={setPosition} 
                    checkNearby={checkNearbyIssues}
                  />
                </MapContainer>
              </div>

              {position && (
                <div className="location-info">
                  <p>
                    <strong>Selected Location:</strong>
                    <br />
                    Latitude: {position[0].toFixed(6)}
                    <br />
                    Longitude: {position[1].toFixed(6)}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Report Issue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CodingProfiles.css";

const CodingProfiles = () => {
  const [profileUrl, setProfileUrl] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_BASE = "http://localhost:5000/api/coding-profile";

  // Fetch profiles from backend
  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const token = localStorage.getItem("token");
      // You may need to create an endpoint to fetch user's saved profiles
      // const response = await axios.get(`${API_BASE}/user-profiles`, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // setProfiles(response.data.data || []);
    } catch (err) {
      console.error("Error fetching profiles:", err);
    }
  };

  const extractProfileFromUrl = async (e) => {
    e.preventDefault();
    
    if (!profileUrl.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${API_BASE}/profile-from-url`, {
        url: profileUrl
      });

      if (response.data.success) {
        const newProfile = response.data.data;
        setProfiles([...profiles, newProfile]);
        setSuccess(`Successfully extracted ${newProfile.platform} profile!`);
        setProfileUrl("");
      } else {
        setError(response.data.message || "Failed to extract profile");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        "Error extracting profile. Please check the URL and try again."
      );
      console.error("Profile extraction error:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeProfile = (index) => {
    setProfiles(profiles.filter((_, i) => i !== index));
  };

  const openProfileLink = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="coding-profiles-container">
      <h2>Coding Profiles</h2>
      
      {/* Profile URL Input Form */}
      <div className="profile-input-section">
        <h3>Add Your Coding Profile</h3>
        <p className="info-text">
          Paste your profile link from CodeForces, CodeChef, LeetCode, LinkedIn, or Codio
        </p>
        
        <form onSubmit={extractProfileFromUrl} className="profile-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Paste your profile URL (e.g., https://codeforces.com/profile/username)"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              className="profile-input"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="extract-btn"
            >
              {loading ? "Extracting..." : "Extract Profile"}
            </button>
          </div>
        </form>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </div>

      {/* Profiles Display */}
      <div className="profiles-section">
        <h3>Your Profiles ({profiles.length})</h3>
        
        {profiles.length === 0 ? (
          <div className="empty-state">
            <p>No coding profiles added yet. Add your first profile above!</p>
          </div>
        ) : (
          <div className="profiles-grid">
            {profiles.map((profile, index) => (
              <div key={index} className="profile-card">
                <div className="profile-header">
                  {profile.avatar && (
                    <img 
                      src={profile.avatar} 
                      alt={profile.handle} 
                      className="profile-avatar"
                    />
                  )}
                  <div className="profile-title">
                    <h4>{profile.platform}</h4>
                    <p className="handle">@{profile.handle}</p>
                  </div>
                </div>

                <div className="profile-body">
                  {profile.name && profile.name !== profile.handle && (
                    <div className="profile-info">
                      <span className="label">Name:</span>
                      <span className="value">{profile.name}</span>
                    </div>
                  )}

                  {profile.rating !== undefined && (
                    <div className="profile-info">
                      <span className="label">Rating:</span>
                      <span className="value rating">{profile.rating}</span>
                    </div>
                  )}

                  {profile.maxRating && (
                    <div className="profile-info">
                      <span className="label">Max Rating:</span>
                      <span className="value">{profile.maxRating}</span>
                    </div>
                  )}

                  {profile.rank && (
                    <div className="profile-info">
                      <span className="label">Rank:</span>
                      <span className="value rank">{profile.rank}</span>
                    </div>
                  )}

                  {profile.country && (
                    <div className="profile-info">
                      <span className="label">Country:</span>
                      <span className="value">{profile.country}</span>
                    </div>
                  )}

                  {profile.bio && (
                    <div className="profile-info full-width">
                      <span className="label">Bio:</span>
                      <p className="value bio">{profile.bio}</p>
                    </div>
                  )}

                  {profile.contributions !== undefined && (
                    <div className="profile-info">
                      <span className="label">Contributions:</span>
                      <span className="value">{profile.contributions}</span>
                    </div>
                  )}

                  {profile.message && (
                    <div className="profile-info full-width">
                      <p className="message">{profile.message}</p>
                    </div>
                  )}
                </div>

                <div className="profile-footer">
                  {profile.profile_url && (
                    <button
                      onClick={() => openProfileLink(profile.profile_url)}
                      className="view-profile-btn"
                    >
                      View Profile ↗
                    </button>
                  )}
                  <button
                    onClick={() => removeProfile(index)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Supported Platforms Info */}
      <div className="platforms-info">
        <h3>Supported Platforms</h3>
        <div className="platforms-list">
          <div className="platform-item">
            <span className="platform-name">CodeForces</span>
            <span className="platform-example">codeforces.com/profile/username</span>
          </div>
          <div className="platform-item">
            <span className="platform-name">CodeChef</span>
            <span className="platform-example">codechef.com/users/username</span>
          </div>
          <div className="platform-item">
            <span className="platform-name">LeetCode</span>
            <span className="platform-example">leetcode.com/u/username</span>
          </div>
          <div className="platform-item">
            <span className="platform-name">LinkedIn</span>
            <span className="platform-example">linkedin.com/in/username</span>
          </div>
          <div className="platform-item">
            <span className="platform-name">Codio</span>
            <span className="platform-example">codio.com/users/username</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingProfiles;

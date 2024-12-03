import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import '../styles/Profile.css';
import { useAuth } from '../AuthContext';

function Profile() {
  
  const { user } = useAuth();
  const [profileInfo, setProfileInfo] = useState({
    email: 'jane.doe@gmail.com',
    phone: '+1 (555) 123-4567',
    password: ''
  });
  const [userItems, setUserItems] = useState([]);
  
  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/items/user-items');
          setUserItems(response.data.items);
      } catch (err) {
        console.error('Failed to fetch user items');
      }
    };

    if (user) {
      fetchUserItems();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/user/update";
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(profileInfo)
      });
      
      const result = await response.json();
      if (result.success) {
        handleSuccess('Profile updated successfully');
      } else {
        handleError(result.message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>My Profile</h1>
      </header>

      <main>
        <div className="profile-container">
          <img
            src="https://via.placeholder.com/200"
            alt="Profile"
            className="profile-image"
          />
          <div className="profile-info">
            <h2>{user?.name || 'User'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileInfo.email}
                  onChange={handleChange}
                />
              </div>
              <div className="field-group">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileInfo.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="field-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={profileInfo.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
              </div>
              <button type="submit" className="save-button">Save Changes</button>
            </form>
          </div>
        </div>

        <section className="items-section">
          <h3>My Items for Sale</h3>
          <div className="items-grid">
            {userItems.length === 0 ? (
              <p>No items posted yet</p>
            ) : (
              userItems.map((item) => (
                <div className="item-card" key={item._id}>
                  <img
                    src={item.images[0] || "https://via.placeholder.com/300x200"}
                    alt={item.title}
                    className="item-image"
                  />
                  <h4 className="item-name">{item.title}</h4>
                  <p className="item-description">{item.description}</p>
                  <p className="item-category">{item.category}</p>
                  <p className="item-price">${item.price}</p>
                  <p className="item-date">
                    Posted: {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
      <ToastContainer />
    </div>
  );
}

export default Profile;
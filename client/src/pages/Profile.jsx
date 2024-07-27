import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5050/api/users/profile', {
          headers: {
            'x-auth-token': token,
          },
        });
        setUser(res.data);
        setBio(res.data.bio);
        setUsername(res.data.username);
        setEmail(res.data.email);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        alert('Failed to fetch user profile');
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const saveProfile = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('profilePic', profilePic);
    formData.append('bio', bio);
    formData.append('username', username);
    formData.append('email', email);

    try {
      const response = await axios.put('http://localhost:5050/api/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      });
      alert('Profile updated successfully');
      setEditProfile(false);
    } catch (err) {
      console.error('Save Profile Error:', err);
      alert('Failed to update profile');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="page-title">Profile</h2>
      <Navbar/>
      <table>
        <tbody>
          <tr>
            <td>Email</td>
            <td>
              {editProfile ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                user.email
              )}
            </td>
          </tr>
          <tr>
            <td>Username</td>
            <td>
              {editProfile ? (
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              ) : (
                user.username
              )}
            </td>
          </tr>
          <tr>
            <td>Bio</td>
            <td>
              {editProfile ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              ) : (
                user.bio
              )}
            </td>
          </tr>
          <tr>
            <td>Profile Picture</td>
            <td>
              {editProfile ? (
                <input type="file" onChange={handleFileChange} />
              ) : (
                user.profilePic && (
                  <img
                    src={`http://localhost:5050/uploads/${user.profilePic}`}
                    alt="Profile Pic"
                  />
                )
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <br />

      <div>
        {!editProfile ? (
          <button onClick={() => setEditProfile(true)}>Edit Profile</button>
        ) : (
          <button onClick={saveProfile}>Save Changes</button>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [pwd, setPwd] = useState({ password: "", cpassword: "" });
  const [editProfile, setEditProfile] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [bio, setBio] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (token && userId) {
        try {
          const res = await axios.get(`http://localhost:5050/api/users/${userId}`, {
            headers: {
              'x-auth-token': token,
            },
          });
          setUser(res.data);
          setBio(res.data.bio);
        } catch (err) {
          console.error('Error fetching user:', err);
        }
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const saveProfile = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const formData = new FormData();
    formData.append('profilePic', profilePic);
    formData.append('bio', bio);
    formData.append('username', user.username);

    try {
      const response = await axios.put(`http://localhost:5050/api/users/profile/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      });

      alert('Profile updated successfully');
      setEditProfile(false); // Exit edit mode
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

      <table>
        <tbody>
          <tr>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>

          <tr>
            <td>Username</td>
            <td>
              {editProfile && <input type="text" value={user.username} onChange={e => setUser({ ...user, username: e.target.value })} />}
              {!editProfile && <>{user.username}</>}
            </td>
          </tr>

          <tr>
            <td>Bio</td>
            <td>
              {editProfile && <textarea value={bio} onChange={e => setBio(e.target.value)}></textarea>}
              {!editProfile && <>{user.bio}</>}
            </td>
          </tr>

          <tr>
            <td>Profile Picture</td>
            <td>
              {editProfile && <input type="file" onChange={handleFileChange} />}
              {!editProfile && user.profilePic && <img src={`http://localhost:5050/uploads/${user.profilePic}`} alt="Profile Pic" />}
            </td>
          </tr>
        </tbody>
      </table>

      <br />

      {editProfile &&
        <>
          <h3>Change password</h3>
          <p>New password</p>
          <input type="password" value={pwd.password} onChange={e => setPwd({ ...pwd, password: e.target.value })} />
          <p>Confirm password</p>
          <input type="password" value={pwd.cpassword} onChange={e => setPwd({ ...pwd, cpassword: e.target.value })} />
        </>
      }

      <div>
        {!editProfile && <button onClick={e => setEditProfile(true)}>Edit Profile</button>}
        {editProfile && <button onClick={saveProfile}>Save Changes</button>}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
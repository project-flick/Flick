import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [pwd, setPwd] = useState({password: "", cpassword: ""});
  const [editProfile, setEditProfile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await axios.get('http://localhost:5050/api/auth/user', {
          headers: {
            'x-auth-token': token,
          },
        });
        setUser(res.data);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const saveProfile = () => {
    // Make request to save profile here.
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <hr/>
      <h2>Profile</h2>
      <hr/>
      
      <p>Email: {user.email}</p>
      <p>Username: 
        {editProfile && <input type="text" value={user.username} onChange={e => setUser({...user, username: e.target.value})}/>}
        {!editProfile && <>{user.username}</>}
      </p>

      {editProfile && 
      <>
        <h3>Change password</h3>
        <p>New password</p>
        <input type="password" value={pwd.password} onChange={e => setPwd({...pwd, password: e.target.value})}/>
        <p>Confirm password</p>
        <input type="password" value={pwd.cpassword} onChange={e => setPwd({...pwd, cpassword: e.target.value})}/>
        <br/><br/>
      </>
      }

      <div>
        {!editProfile && <button onClick={e => setEditProfile(true)}>Edit Profile</button>}
        {editProfile && <button onClick={e => saveProfile()}>Save Changes</button>}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
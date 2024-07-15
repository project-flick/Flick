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
              {editProfile && <input type="text" value={user.username} onChange={e => setUser({...user, username: e.target.value})}/>}
              {!editProfile && <>{user.username}</>}
            </td>
          </tr>
        </tbody>
      </table>

      <br/>

      {editProfile && 
      <>
        <h3>Change password</h3>
        <p>New password</p>
        <input type="password" value={pwd.password} onChange={e => setPwd({...pwd, password: e.target.value})}/>
        <p>Confirm password</p>
        <input type="password" value={pwd.cpassword} onChange={e => setPwd({...pwd, cpassword: e.target.value})}/>
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
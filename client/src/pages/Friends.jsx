import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultPP from '../images/pp.png';
import './Friends.scss';
import Navbar from '../components/Navbar';

const FriendsPage = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/friends/all', {
        headers: { 'x-auth-token': token },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleFollow = async (userId) => {
    try {
      await axios.post(
        'http://localhost:5050/api/friends/follow',
        { userId }, // Make sure to send the userId in the request body
        {
          headers: { 'x-auth-token': token },
        }
      );
      alert('Followed user');
      fetchAllUsers(); // Refresh the list after following
    } catch (err) {
      console.error('Error following user:', err);
      alert('Failed to follow user');
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await axios.post(
        'http://localhost:5050/api/friends/unfollow',
        { userId }, // Make sure to send the userId in the request body
        {
          headers: { 'x-auth-token': token },
        }
      );
      alert('Unfollowed user');
      fetchAllUsers(); // Refresh the list after unfollowing
    } catch (err) {
      console.error('Error unfollowing user:', err);
      alert('Failed to unfollow user');
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="friends-page">
      <h2>All Users</h2>
      <div className="users-list">
        {users.map((user) => (
          <div key={user._id} className="user-item">
            <img
              src={user.profilePic ? `http://localhost:5050/uploads/${user.profilePic}` : defaultPP}
              alt="Profile Pic"
              className="user-profile-pic"
            />
            <p>{user.username}</p>
            <button onClick={() => handleFollow(user._id)}>Follow</button>
            <button onClick={() => handleUnfollow(user._id)}>Unfollow</button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default FriendsPage;
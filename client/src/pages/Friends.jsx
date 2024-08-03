import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import defaultPP from '../images/pp.png';
import './Friends.scss';
import Navbar from '../components/Navbar';

const FriendsPage = () => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const token = localStorage.getItem('token');

  const fetchAllUsers = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/friends/all', {
        headers: { 'x-auth-token': token },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  }, [token]);

  const fetchFriends = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/friends', {
        headers: { 'x-auth-token': token },
      });
      setFriends(res.data);
    } catch (err) {
      console.error('Error fetching friends:', err);
    }
  }, [token]);

  const handleFollow = async (userId) => {
    try {
      await axios.post(
        'http://localhost:5050/api/friends/follow',
        { userId },
        {
          headers: { 'x-auth-token': token },
        }
      );
      fetchAllUsers();
      fetchFriends();
    } catch (err) {
      console.error('Error following user:', err);
      alert('Failed to follow user');
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await axios.post(
        'http://localhost:5050/api/friends/unfollow',
        { userId },
        {
          headers: { 'x-auth-token': token },
        }
      );
      fetchAllUsers();
      fetchFriends();
    } catch (err) {
      console.error('Error unfollowing user:', err);
      alert('Failed to unfollow user');
    }
  };

  useEffect(() => {
    fetchAllUsers();
    fetchFriends();
  }, [fetchAllUsers, fetchFriends]);

  const isFriend = (userId) => friends.some((friend) => friend._id === userId);

  return (
    <>
      <Navbar />
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
              <button
                onClick={() => isFriend(user._id) ? handleUnfollow(user._id) : handleFollow(user._id)}
                className={isFriend(user._id) ? 'unfollow-button' : ''}
              >
                {isFriend(user._id) ? 'Unfollow' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FriendsPage;
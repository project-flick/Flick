import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Friends from './pages/Friends';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import EditPost from './components/Posts/EditPost';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer/Footer';  // Import Footer component
import './style.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import NotificationsPage from './components/Notifications/NotificationsPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="content-wrap">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute element={Home} />} />
            <Route path="/profile" element={<PrivateRoute element={Profile} />} />
            <Route path="/friends" element={<PrivateRoute element={Friends} />} />
            <Route path="/edit/:id" element={<PrivateRoute element={EditPost} />} />
            <Route path="/notifications" element={<PrivateRoute element={NotificationsPage} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
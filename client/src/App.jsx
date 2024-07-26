import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import EditPost from './components/Posts/EditPost';
import PrivateRoute from './components/PrivateRoute';
import './style.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute element={Home} />} />
          <Route path="/profile" element={<PrivateRoute element={Profile} />} />
          <Route path="/edit/:id" element={<PrivateRoute element={EditPost} />} />
        </Routes>
        <footer>
          &copy; Flick 2024
        </footer>
      </div>
    </Router>
  );
}

export default App;
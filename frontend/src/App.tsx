import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

// Pages
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          
          <Route path="/profile/:userId" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          <Route path="/friends" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-light flex items-center justify-center">
                <h1 className="text-2xl">Friends Page - Coming Soon</h1>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/messages" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-light flex items-center justify-center">
                <h1 className="text-2xl">Messages Page - Coming Soon</h1>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/groups" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-light flex items-center justify-center">
                <h1 className="text-2xl">Groups Page - Coming Soon</h1>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/marketplace" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-light flex items-center justify-center">
                <h1 className="text-2xl">Marketplace Page - Coming Soon</h1>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/watch" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-light flex items-center justify-center">
                <h1 className="text-2xl">Watch Page - Coming Soon</h1>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/notifications" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-light flex items-center justify-center">
                <h1 className="text-2xl">Notifications Page - Coming Soon</h1>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-light flex items-center justify-center">
                <h1 className="text-2xl">Settings Page - Coming Soon</h1>
              </div>
            </ProtectedRoute>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={
            <div className="min-h-screen bg-gray-light flex items-center justify-center">
              <h1 className="text-2xl">404 - Page Not Found</h1>
            </div>
          } />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
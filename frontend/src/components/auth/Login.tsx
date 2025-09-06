import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { login, setMockAuth } from '../../redux/slices/authSlice';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(login(formData));
    if (login.fulfilled.match(result)) {
      navigate('/');
    }
  };

  const handleSkipLogin = () => {
    dispatch(setMockAuth());
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-light flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-facebook">facebook</h1>
          <p className="text-gray-medium mt-2">
            Connect with friends and the world around you on Facebook.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-facebook focus:border-transparent"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-facebook focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-facebook text-white py-3 rounded-md font-semibold hover:bg-facebook-dark transition duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>

          <div className="text-center">
            <Link
              to="/forgot-password"
              className="text-facebook hover:underline text-sm"
            >
              Forgotten password?
            </Link>
          </div>

          <hr className="my-6" />

          <div className="text-center">
            <Link
              to="/register"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition duration-200"
            >
              Create New Account
            </Link>
          </div>
        </form>

        {/* Development only - Skip Login */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800 mb-2">Development Mode</p>
            <button
              onClick={handleSkipLogin}
              className="w-full bg-yellow-500 text-white py-2 rounded-md font-semibold hover:bg-yellow-600 transition duration-200"
            >
              Skip Login (Demo Mode)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { register } from '../../redux/slices/authSlice';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    gender: '',
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.birthDate) newErrors.birthDate = 'Birth date is required';
    if (!formData.gender) newErrors.gender = 'Please select your gender';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { confirmPassword, ...registerData } = formData;
    const result = await dispatch(register({
      ...registerData,
      gender: registerData.gender as 'male' | 'female' | 'other'
    }));
    if (register.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-light flex items-center justify-center py-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Sign Up</h1>
            <p className="text-gray-medium mt-2">It's quick and easy.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-facebook focus:border-transparent ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>

              <div className="flex-1">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-facebook focus:border-transparent ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-facebook focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="New password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-facebook focus:border-transparent ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-facebook focus:border-transparent ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Birthday</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-facebook focus:border-transparent ${
                  errors.birthDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.birthDate && (
                <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Gender</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>Female</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>Other</span>
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
              )}
            </div>

            <p className="text-xs text-gray-medium">
              By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy.
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 transition duration-200 disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>

            <div className="text-center">
              <Link to="/login" className="text-facebook hover:underline">
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
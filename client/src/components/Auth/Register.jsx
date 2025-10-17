import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Create Account</h1>
          <p className="text-gray-700">Join us and start managing your tasks</p>
        </div>

 
        <div className="bg-white border-gray-100 rounded-lg shadow-2xl p-8 border">
          <h2 className="text-2xl font-semibold text-black mb-6">Register</h2>
          
 
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-500 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
   
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition duration-200"
              />
            </div>

    
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition duration-200"
              />
            </div>

         
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition duration-200"
              />
            </div>

          
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

    
          <div className="mt-6 text-center">
            <p className="text-gray-700 text-sm">
              Already have an account?{' '}
              <a
                href="/login"
                className="text-black font-medium hover:underline transition duration-200"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default Register;

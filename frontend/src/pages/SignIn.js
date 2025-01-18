import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm">
        <h1 className="font-sans text-2xl font-medium text-gray-800 mb-8 tracking-tight">Sign In to MealMetrics</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-4 rounded font-medium hover:bg-blue-600 transition-colors"
          >
            Sign In
          </button>
        </form>
        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-600 rounded font-medium">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default SignIn;
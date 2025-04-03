import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import supabase from '../misc/supabaseClient';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Sign in with Supabase Auth
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (data?.user) {
        // Update last login timestamp
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ last_login: new Date().toISOString() })
          .eq('id', data.user.id);

        if (updateError) {
          console.error("Error updating last login:", updateError);
        }

        // Navigate to home page after successful sign-in
        navigate('/home');
      }
    } catch (error) {
      let errorMessage = 'Invalid email or password. Please try again.';
      if (error.message) {
        errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm">
        <h1 className="font-sans text-2xl font-medium text-gray-800 mb-8 tracking-tight">Sign In to MealMetrics</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded font-medium">
            {error}
          </div>
        )}
        
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
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        {/* Sign Up button and account creation section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-600 mb-4">Don't have an account?</p>
          <button 
            onClick={() => navigate('/signup')}
            className="w-full bg-white text-blue-500 py-3 px-4 rounded font-medium border border-blue-500 hover:bg-blue-50 transition-colors"
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
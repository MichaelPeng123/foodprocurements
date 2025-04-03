import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "https://bbbhdeehblyakaojszzy.supabase.co";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiYmhkZWVoYmx5YWthb2pzenp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2Mjk5MzMsImV4cCI6MjA1OTIwNTkzM30.3NTqO6GVztVJ3cxlbiXDTp2eDqaVpoPwi2Bey5yt074";
const supabase = createClient(supabaseUrl, supabaseKey);

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Sign up with Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            created_at: new Date().toISOString(),
          }
        }
      });

      if (signUpError) throw signUpError;

      if (data?.user) {
        // Store additional user data in Supabase profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            full_name: fullName,
            email: email,
            created_at: new Date().toISOString(),
            last_login: new Date().toISOString()
          });

        if (profileError) {
          console.error("Error saving profile:", profileError);
        }

        // Navigate to home page after successful signup
        navigate('/home');
      } else {
        // Email confirmation might be required
        setError('Please check your email to confirm your account');
      }
    } catch (error) {
      let errorMessage = 'An error occurred during signup.';
      
      if (error.message) {
        switch (true) {
          case error.message.includes('already registered'):
            errorMessage = 'This email is already registered.';
            break;
          case error.message.includes('valid email'):
            errorMessage = 'Please enter a valid email address.';
            break;
          case error.message.includes('password'):
            errorMessage = 'Password should be at least 6 characters long.';
            break;
          default:
            errorMessage = error.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm">
        <h1 className="font-sans text-2xl font-medium text-gray-800 mb-8 tracking-tight">Sign Up for MealMetrics</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded font-medium">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Full Name:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          
          <div>
            <label className="block font-sans text-sm font-medium text-gray-700 mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-3 px-4 rounded font-medium hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for user session on component mount
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
      
      // Set up listener for auth state changes
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setUser(session?.user || null);
        }
      );
      
      // Clean up subscription
      return () => {
        if (authListener?.subscription) {
          authListener.subscription.unsubscribe();
        }
      };
    };
    
    checkUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Custom style to remove underlines
  const linkStyle = {
    textDecoration: 'none'
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-sans text-xl font-medium tracking-tight text-gray-800 hover:text-blue-600 transition-colors" style={linkStyle}>
            MealMetrics
          </Link>
          
          <div className="flex space-x-6 items-center">
            <Link to="/home" className="font-sans text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" style={linkStyle}>
              Home
            </Link>
            <Link to="/pdfupload" className="font-sans text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" style={linkStyle}>
              Upload
            </Link>
            <Link to="/food-database" className="font-sans text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" style={linkStyle}>
              Food Database
            </Link>
            <Link to="/purchase-categories" className="font-sans text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" style={linkStyle}>
              Purchase Analytics
            </Link>
            {loading ? (
              // Show a loading placeholder while checking auth state
              <div className="w-20 h-10 bg-gray-200 animate-pulse rounded"></div>
            ) : user ? (
              <button 
                onClick={handleSignOut} 
                className="font-sans text-sm font-medium bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <Link 
                to="/signin" 
                className="font-sans text-sm font-medium bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                style={linkStyle}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-sans text-xl font-medium tracking-tight text-gray-800 hover:text-blue-600 transition-colors">
            MealMetrics
          </Link>
          
          <div className="flex space-x-6 items-center">
            <Link to="/home" className="font-sans text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/pdfupload" className="font-sans text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Upload
            </Link>
            <Link to="/database" className="font-sans text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Database
            </Link>
            {auth.currentUser ? (
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

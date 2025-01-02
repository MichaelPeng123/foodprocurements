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
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/home" className="nav-link">Home</Link>
        {auth.currentUser ? (
          <button onClick={handleSignOut} className="nav-link">Sign Out</button>
        ) : (
          <Link to="/signin" className="nav-link">Sign In</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
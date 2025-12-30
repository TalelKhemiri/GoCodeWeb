import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // AJOUT: useLocation
import { LogOut, User, Car, Home, LayoutDashboard } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  user: string | null;
  setUser: (user: string | null) => void;
  role: string | null;
  setRole: (role: string | null) => void;
}

const Header: React.FC<HeaderProps> = ({ user, setUser, role, setRole }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Pour savoir sur quelle page on est

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("accessToken");
    setUser(null);
    setRole(null);
    navigate("/");
  };

  // Fonction utilitaire pour vérifier si le lien est actif
  // Elle retourne la classe "active" si le chemin correspond
  const getLinkClass = (path: string) => {
    return location.pathname === path ? "gc-link-item active" : "gc-link-item";
  };

  return (
    <header className="gc-header-section">
      <div className="gc-header-container">
        
        {/* === PARTIE GAUCHE : LOGO + MENU === */}
        <div className="gc-header-left">
          
          <Link to="/" className="gc-header-logo">
            <Car size={26} strokeWidth={2.5} />
            <span>GoCode<span className="gc-dot">.</span></span>
          </Link>

          <div className="gc-divider"></div>

          <nav className="gc-nav-links">
            {/* J'applique la fonction getLinkClass sur chaque lien */}
            
            <Link to="/" className={getLinkClass('/')}>
              <Home size={18} /> Accueil
            </Link>
            
            <Link to="/contact" className={getLinkClass('/contact')}>
              Contact
            </Link>
            
            <Link to="/apropos" className={getLinkClass('/apropos')}>
              À propos
            </Link>
            
            <Link to="/quiz" className={getLinkClass('/quiz')}>
              Tests Code
            </Link>

            {/* Liens conditionnels (Restent normaux ou actifs si besoin) */}
            {user && role === 'student' && (
              <Link to="/my-courses" className={getLinkClass('/my-courses')}>
                Mes Cours
              </Link>
            )}

            {user && (role === 'monitor' || role === 'admin') && (
              <Link to="/dashboard" className="gc-link-item gc-admin">
                <LayoutDashboard size={16} /> Gestion
              </Link>
            )}
          </nav>
        </div>

        {/* === PARTIE DROITE : AUTHENTIFICATION === */}
        <div className="gc-header-right">
          {user ? (
            <div className="gc-user-menu">
              <div className="gc-user-info">
                <div className="gc-avatar">
                  <User size={18} />
                </div>
                <span className="gc-username">{user}</span>
              </div>
              <button onClick={handleLogout} className="gc-btn-logout" title="Déconnexion">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="gc-guest-menu">
              <Link to="/login" className="gc-btn-login">Se connecter</Link>
              <Link to="/register" className="gc-btn-register">S'inscrire</Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;
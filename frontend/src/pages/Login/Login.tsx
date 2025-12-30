// src/pages/Login/Login.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, ArrowRight } from 'lucide-react';
import { api } from '../../api';
import './Login.css';
import PageTransition from '../../components/PageTransition';

interface LoginProps {
  setUser: (user: string | null) => void;
  setRole: (role: string | null) => void;
}

const Login: React.FC<LoginProps> = ({ setUser, setRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await api.login({ username, password });
      
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("user", data.username);
      localStorage.setItem("role", data.role);

      setUser(data.username);
      setRole(data.role);

      navigate("/");
    } catch (err) {
      setError("Identifiants incorrects.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="login-container">
        {/* Overlay sombre sur l'image de fond (géré en CSS) */}
        <div className="login-overlay"></div>

        <div className="login-card-wrapper">
          <div className="login-card">
            
            <div className="card-header">
              <h2>Bienvenue</h2>
              <p>Reprenez la route vers le succès</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              
              <div className="input-group">
                <div className="icon-wrapper">
                  <User size={20} />
                </div>
                <input 
                  type="text" 
                  placeholder="Nom d'utilisateur" 
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                  required 
                  className="custom-input"
                />
              </div>

              <div className="input-group">
                <div className="icon-wrapper">
                  <Lock size={20} />
                </div>
                <input 
                  type="password" 
                  placeholder="Mot de passe" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                  className="custom-input"
                />
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" /> Se souvenir de moi
                </label>
                <a href="#" className="forgot-password">Mot de passe oublié ?</a>
              </div>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? (
                  <span className="loader"></span>
                ) : (
                  <>Se connecter <ArrowRight size={18} /></>
                )}
              </button>
            </form>

            <div className="card-footer">
              <p>Pas encore inscrit ? <Link to="/register" className="register-link">Créer un compte</Link></p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
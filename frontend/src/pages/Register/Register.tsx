import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Briefcase, BookOpen, User, Eye, EyeOff } from 'lucide-react';
import { api } from '../../api';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    prenom: "", nom: "", email: "", password: "", role: "student"
  });
  
  // NOUVEAU : État pour gérer la visibilité du mot de passe
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.register({
        username: formData.email,
        email: formData.email,
        password: formData.password,
        first_name: formData.prenom,
        last_name: formData.nom,
        role: formData.role
      });
      alert("Compte créé avec succès !");
      navigate("/login");
    } catch (err: any) {
      alert("Erreur: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-overlay"></div>

      <div className="register-card-wrapper">
        <div className="register-card">
          
          <div className="card-header">
            <h2>Commencez votre route</h2>
            <p>Rejoignez la communauté GoCode dès aujourd'hui</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            
            <div className="role-selector-container">
              <label 
                className={`role-card ${formData.role === 'student' ? 'active' : ''}`}
                onClick={() => setFormData({...formData, role: 'student'})}
              >
                <div className="role-icon">
                  <BookOpen size={22} />
                </div>
                <span>Étudiant</span>
                <div className="check-circle"></div>
              </label>

              <label 
                className={`role-card ${formData.role === 'monitor' ? 'active' : ''}`}
                onClick={() => setFormData({...formData, role: 'monitor'})}
              >
                <div className="role-icon">
                  <Briefcase size={22} />
                </div>
                <span>Moniteur</span>
                <div className="check-circle"></div>
              </label>
            </div>

            <div className="form-row">
              <div className="input-group">
                <div className="icon-wrapper"><User size={18} /></div>
                <input 
                  type="text" placeholder="Prénom" value={formData.prenom} 
                  onChange={e => setFormData({...formData, prenom: e.target.value})} required className="custom-input"
                />
              </div>
              <div className="input-group">
                <div className="icon-wrapper"><User size={18} /></div>
                <input 
                  type="text" placeholder="Nom" value={formData.nom} 
                  onChange={e => setFormData({...formData, nom: e.target.value})} required className="custom-input"
                />
              </div>
            </div>

            <div className="input-group">
              <div className="icon-wrapper"><Mail size={18} /></div>
              <input 
                type="email" placeholder="Email" value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})} required className="custom-input"
              />
            </div>

            {/* MODIFICATION ICI : Section Mot de passe */}
            <div className="input-group">
              <div className="icon-wrapper"><Lock size={18} /></div>
              <input 
                // Bascule entre "text" et "password"
                type={showPassword ? "text" : "password"} 
                placeholder="Mot de passe" 
                value={formData.password} 
                onChange={e => setFormData({...formData, password: e.target.value})} 
                required 
                className="custom-input password-input" // Ajout classe pour padding
              />
              {/* L'icône clickable à droite */}
              <div 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>

            <button className="btn-primary" disabled={loading}>
              {loading ? <span className="loader"></span> : <>Créer mon compte <ArrowRight size={18} /></>}
            </button>
          </form>
          
          <div className="card-footer">
            <p>Vous avez déjà un compte ? <Link to="/login" className="login-link">Connexion</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
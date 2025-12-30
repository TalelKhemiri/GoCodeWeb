import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Send, 
  Facebook, Instagram, Car 
} from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // CORRECTION ICI : On ajoute HTMLSelectElement pour que le menu déroulant fonctionne
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    alert("Merci ! Votre message a été transmis à l'équipe GoCode.");
  };

  return (
    <div className="gc-contact-wrapper">
      {/* Overlay sombre pour la lisibilité */}
      <div className="gc-contact-overlay"></div>

      <div className="gc-contact-container">
        
        {/* === CARTE DE CONTACT === */}
        <div className="gc-contact-card">
          
          {/* --- COLONNE GAUCHE --- */}
          <div className="gc-contact-info">
            <h2 className="gc-contact-title">Restons en contact</h2>
            <p className="gc-contact-desc">
              Une question sur nos forfaits ? Besoin d'aide pour votre dossier ? 
              L'équipe <strong>GoCode</strong> est là pour vous accompagner jusqu'au permis.
            </p>

            <div className="gc-info-list">
              <div className="gc-info-item">
                <div className="gc-icon-circle"><Phone size={20} /></div>
                <span>+216 71 000 000</span>
              </div>
              <div className="gc-info-item">
                <div className="gc-icon-circle"><Mail size={20} /></div>
                <span>contact@gocode.tn</span>
              </div>
              <div className="gc-info-item">
                <div className="gc-icon-circle"><MapPin size={20} /></div>
                <span>12 Av. de la Liberté, Tunis</span>
              </div>
            </div>

            {/* Réseaux Sociaux */}
            <div className="gc-social-section">
              <h4>Suivez notre actualité :</h4>

                <div className="gc-social-row">
                
                {/* Bouton Facebook Premium */}
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="gc-social-card fb-card">
                    <div className="gc-icon-box">
                    <Facebook size={28} strokeWidth={1.5} />
                    </div>
                    <div className="gc-social-info">
                    <span className="gc-social-name">Facebook</span>
                    <span className="gc-social-handle">@GoCode.TN</span>
                    </div>
                </a>

                {/* Bouton Instagram Premium */}
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="gc-social-card insta-card">
                    <div className="gc-icon-box">
                    <Instagram size={28} strokeWidth={1.5} />
                    </div>
                    <div className="gc-social-info">
                    <span className="gc-social-name">Instagram</span>
                    <span className="gc-social-handle">@GoCode_Off</span>
                    </div>
                </a>

                </div>
            </div>
            
            <div className="gc-info-footer">
              <Car size={100} className="gc-bg-icon" />
            </div>
          </div>

          {/* --- COLONNE DROITE : FORMULAIRE --- */}
          <div className="gc-contact-form-section">
            <form onSubmit={handleSubmit} className="gc-form">
              <h3>Envoyez-nous un message</h3>
              
              <div className="gc-input-group">
                <label>Nom complet</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Votre nom" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="gc-input-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="votre@email.com" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              {/* C'est ici que l'erreur se produisait avant la correction */}
              <div className="gc-input-group">
                <label>Sujet</label>
                <select 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  className="gc-select"
                >
                   <option value="">-- Choisir un sujet --</option>
                   <option value="inscription">Inscription / Tarifs</option>
                   <option value="code">Code de la Route</option>
                   <option value="conduite">Heures de Conduite</option>
                   <option value="autre">Autre demande</option>
                </select>
              </div>

              <div className="gc-input-group">
                <label>Message</label>
                <textarea 
                  name="message" 
                  rows={4} 
                  placeholder="Comment pouvons-nous vous aider ?"
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                ></textarea>
              </div>

              <button type="submit" className="gc-submit-btn">
                Envoyer le message <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
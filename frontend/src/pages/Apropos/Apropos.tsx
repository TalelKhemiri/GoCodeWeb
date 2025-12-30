import React from 'react';
import './Apropos.css';

const Apropos: React.FC = () => {
  return (
    <div className="apropos-container">
      
      {/* 1. HERO SECTION WITH ANIMATED CAR */}
      <header className="hero-section">
        <h1 className="hero-title">Votre Permis, Notre Mission</h1>
        <p className="hero-subtitle">
          La plateforme nouvelle génération pour maîtriser le Code de la Route.
          Apprenez à votre rythme, réussissez du premier coup.
        </p>

        {/* Animated Road Decoration */}
        <div className="road-stage">
          <div className="road-lines"></div>
          <div className="car-icon">
            {/* Simple SVG Car */}
            <svg width="60" height="40" viewBox="0 0 60 40" fill="currentColor">
              <path d="M10 20 L15 10 L45 10 L50 20 L58 22 V30 H54 V34 H46 V30 H14 V34 H6 V30 H2 V22 Z" />
              <circle cx="12" cy="30" r="4" fill="#A4D7E1" />
              <circle cx="48" cy="30" r="4" fill="#A4D7E1" />
            </svg>
          </div>
        </div>
      </header>

      {/* 2. MISSION SECTION */}
      <section className="content-section">
        <div className="section-grid">
          <div className="text-block">
            <h2>Qui sommes-nous ?</h2>
            <p>
              Nous sommes une équipe passionnée par la sécurité routière et l'éducation numérique. 
              Conscients que l'obtention du permis est une étape cruciale vers la liberté, 
              nous avons créé cet outil pour simplifier l'apprentissage du Code de la Route.
            </p>
            <p>
              Notre objectif est simple : rendre le code accessible, compréhensible et 
              même agréable pour tous les candidats, quel que soit leur niveau de départ.
            </p>
          </div>
          <div className="image-block">
             {/* Abstract visual representation using CSS shapes or placeholders */}
             <div style={{
               background: 'var(--color-sky)',
               height: '300px',
               borderRadius: '20px',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               fontSize: '5rem',
               color: 'var(--color-paper)'
             }}>
               🎓
             </div>
          </div>
        </div>
      </section>

      {/* 3. VALUES / FEATURES SECTION */}
      <section className="values-section">
        <div style={{textAlign: 'center', marginBottom: '50px'}}>
           <h2 style={{color: 'var(--color-ink)', fontSize: '2.5rem'}}>Pourquoi nous choisir ?</h2>
        </div>
        
        <div className="cards-container">
          {/* Card 1 */}
          <div className="value-card">
            <div className="icon-wrapper">🚀</div>
            <h3>Apprentissage Rapide</h3>
            <p>Des leçons optimisées et interactives pour mémoriser les règles plus vite et sans stress.</p>
          </div>

          {/* Card 2 */}
          <div className="value-card">
            <div className="icon-wrapper">🛡️</div>
            <h3>Contenu à Jour</h3>
            <p>Nos cours respectent les dernières réformes officielles de la sécurité routière.</p>
          </div>

          {/* Card 3 */}
          <div className="value-card">
            <div className="icon-wrapper">📱</div>
            <h3>Accessible Partout</h3>
            <p>Révisez sur votre téléphone, votre tablette ou votre ordinateur, où que vous soyez.</p>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <footer className="cta-section">
        <h2>Prêt à prendre la route ?</h2>
        <p style={{marginBottom: '30px', color: '#A4D7E1'}}>Rejoignez des milliers d'élèves qui ont réussi leur examen.</p>
        <button className="cta-button" onClick={() => alert("Redirection vers la page d'inscription...")}>
          Commencer Maintenant
        </button>
      </footer>

    </div>
  );
};

export default Apropos;
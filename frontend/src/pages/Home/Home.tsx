import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, AlertTriangle, UserCheck, PlayCircle, ShieldCheck, 
  MapPin, CheckCircle, ArrowRight, Gauge, TrafficCone, Layout, Car
} from 'lucide-react';
import { api } from '../../api';
import './Home.css';
import PageTransition from '../../components/PageTransition';

const Home = ({ user }: { user: string | null }) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- LOGIQUE BACKEND (INCHANGÉE) ---
  useEffect(() => {
    if (user) {
      setLoading(true);
      setError(null);
      api.getCourses()
        .then((data) => {
          if (Array.isArray(data)) setCourses(data);
          else if (data && Array.isArray(data.results)) setCourses(data.results);
          else setCourses([]);
        })
        .catch(err => {
          console.error(err);
          setError("Impossible de charger les modules de formation.");
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleEnroll = async (courseId: number) => {
    if (!user) {
      alert("Veuillez vous connecter pour accéder à ce contenu.");
      return;
    }
    try {
      await api.enrollCourse(courseId);
      alert("Inscription validée ! Bonne route.");
      window.location.reload(); 
    } catch (err) {
      alert("Une erreur est survenue lors de l'inscription.");
    }
  };

  return (
    <PageTransition>
      <div className="app-wrapper">
        
        {/* === 1. HERO SECTION : PHOTO RÉALISTE + COULEURS PALETTE === */}
        <section className="hero-calm-real">
          <div className="hero-overlay-gradient"></div>
          
          <div className="hero-content-centered container-max">
              <div className="badge-pill-glass">
                <ShieldCheck size={16} /> <span style={{marginLeft:'8px'}}>Formation Certifiée 2025</span>
              </div>
              
              <h1 className="hero-title-large">
                La route n'aura plus<br/>
                <span className="text-highlight-blue">de secrets pour vous.</span>
              </h1>
              
              <p className="hero-subtitle-glass">
                Danger, Interdiction, Obligation... Apprenez à lire la signalisation comme un livre ouvert. 
                Une méthode immersive basée sur des situations réelles de conduite.
              </p>
              
              <div className="hero-actions-row">
                {!user ? (
                  <>
                    <Link to="/register" className="btn-hero-solid">
                      Débuter l'aventure <ArrowRight size={20} />
                    </Link>
                    <a href="#methodology" className="btn-hero-glass">
                      <PlayCircle size={20} /> Découvrir la méthode
                    </a>
                  </>
                ) : (
                  <a href="#courses-catalog" className="btn-hero-solid">
                     Reprendre ma formation <Car size={20} />
                  </a>
                )}
              </div>
          </div>

          {/* Forme de bas de page (Curve) */}
          <div className="curve-bottom">
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
              <path d="M0,30 C320,120 1120,-60 1440,30 L1440,100 L0,100 Z" fill="#F0F4F8"></path>
            </svg>
          </div>
        </section>

        {/* === 2. FEATURES : PALETTE CALM COOL TONES === */}
        <section id="methodology" className="features-strip">
          <div className="container-max">
            <div className="section-header center">
              <h2>Une conduite <span className="highlight-teal">Sereine & Maîtrisée</span></h2>
              <p>Notre palette d'outils pédagogiques est conçue pour réduire le stress et maximiser la réussite.</p>
            </div>

            <div className="features-grid-cards">
              <div className="feature-card-item">
                <div className="icon-wrapper teal-bg"><TrafficCone size={32} /></div>
                <h3>Maîtrise Technique</h3>
                <p>Des modules vidéo HD filmés sur route réelle pour comprendre la mécanique et les distances de sécurité.</p>
              </div>
              <div className="feature-card-item">
                <div className="icon-wrapper blue-bg"><MapPin size={32} /></div>
                <h3>Situations Complexes</h3>
                <p>Analysez des intersections, ronds-points et insertions sur autoroute avec nos vues par drone.</p>
              </div>
              <div className="feature-card-item">
                <div className="icon-wrapper dark-bg"><Gauge size={32} /></div>
                <h3>Rythme Adapté</h3>
                <p>Une interface "Calm & Cool" étudiée pour éliminer la fatigue visuelle lors de vos révisions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* === 3. CATALOGUE COURS (CARTE ÉPURÉE) === */}
        {user && (
          <section id="courses-catalog" className="courses-catalog-section">
            <div className="container-max">
              <div className="catalog-header">
                <div className="header-left">
                    <h2><BookOpen className="inline-icon" /> Vos Modules de Conduite</h2>
                    <p>Sélectionnez un chapitre ci-dessous pour démarrer le moteur.</p>
                </div>
                <div className="road-line-dashed"></div>
              </div>

              {loading ? (
                <div className="loader-area">
                    <div className="spinner-calm"></div>
                    <p>Chargement du tableau de bord...</p>
                </div>
              ) : error ? (
                <div className="error-banner">
                    <AlertTriangle size={24} />
                    <p>{error}</p>
                </div>
              ) : (
                <div className="courses-cards-grid">
                  {courses.map((course, index) => (
                    <div key={course.id} className="course-card-calm" style={{animationDelay: `${index * 100}ms`}}>
                      <div className="card-image-wrapper">
                         <div className="overlay-calm"></div>
                         {/* Image de cours réaliste */}
                         <img 
                            src={course.thumbnail || "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop"} 
                            alt={course.title} 
                         />
                         <span className="category-tag">Permis B</span>
                      </div>
                      
                      <div className="card-body-calm">
                        <div className="meta-row">
                            <span className="instructor"><UserCheck size={14}/> {course.instructor_name || "Expert Certifié"}</span>
                            <span className={`price-pill ${course.price === 0 ? 'free' : ''}`}>
                                {course.price > 0 ? `${course.price} TND` : "Inclus"}
                            </span>
                        </div>
                        
                        <h3>{course.title}</h3>
                        <p className="description-truncate">{course.description}</p>
                        
                        <div className="card-footer-action">
                             <button className="btn-access-full" onClick={() => handleEnroll(course.id)}>
                                {course.enrollment_status === 'active' ? 'Reprendre la route' : 'Démarrer ce module'}
                                <ArrowRight size={16} />
                             </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* === 4. FOOTER AVEC RAPPEL COULEUR FONCÉE === */}
        <footer className="footer-calm">
            <div className="container-max footer-content">
                <div className="footer-logo">
                    <h2>GoCode<span className="dot-teal">.</span></h2>
                    <p>La route se partage, la sécurité s'apprend.</p>
                </div>
                <div className="footer-links">
                    <span>Mentions Légales</span>
                    <span>Code de la Route</span>
                    <span>Support Élève</span>
                </div>
            </div>
            <div className="copyright-bar">
                © 2025 Auto-École Digitale. Tous droits réservés.
            </div>
        </footer>

      </div>
    </PageTransition>
  );
};

export default Home;
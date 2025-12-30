import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, ArrowRight, XCircle, RotateCcw, LayoutDashboard, Flag } from 'lucide-react';
import { QUIZ_DATA, type QuizModule } from '../../data/QuizData';
import PageTransition from '../../components/PageTransition';
import './Quiz.css';

const QuizPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // États (Inchangés)
  const [module, setModule] = useState<QuizModule | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Chargement du module
  useEffect(() => {
    const found = QUIZ_DATA.find(m => m.id === id);
    if (found) {
      setModule(found);
      setCurrentStep(0); setScore(0); setShowResult(false); setIsChecked(false); setSelectedOption(null);
    }
  }, [id]);

  // Logique de validation
  const handleValidate = () => {
    if (selectedOption === null || !module) return;
    setIsChecked(true);
    if (selectedOption === module.questions[currentStep].correctAnswer) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (!module) return;
    if (currentStep < module.questions.length - 1) {
      setCurrentStep(c => c + 1); setSelectedOption(null); setIsChecked(false);
    } else {
      setShowResult(true);
    }
  };

  // Gestion des erreurs (Module non trouvé)
  if (!module && !showResult) {
    return (
      <div className="quiz-page-container">
         <div className="module-card" style={{textAlign:'center', maxWidth:'500px'}}>
            <h2>Oups ! Module introuvable.</h2>
            <button onClick={() => navigate('/quiz')} className="btn-primary" style={{margin:'20px auto'}}>Retour</button>
         </div>
      </div>
    );
  }

  // --- VUE RÉSULTATS ---
  if (showResult && module) {
    const isSuccess = score >= Math.ceil(module.questions.length / 2);
    return (
      <PageTransition>
        <div className="quiz-page-container">
          <div className="player-wrapper">
            <div className="question-card result-box">
              <div style={{ margin: '0 auto 20px' }}>
                {isSuccess ? <CheckCircle size={80} color="#10b981" /> : <XCircle size={80} color="#ef4444" />}
              </div>
              <h1 style={{fontSize:'2rem', color:'#2C3E50'}}>{isSuccess ? "Félicitations !" : "Dommage..."}</h1>
              <p style={{color:'#7f8c8d', fontSize:'1.1rem'}}>Vous avez terminé le module {module.title}.</p>
              
              <div className={`score-display ${isSuccess ? 'score-success' : 'score-fail'}`}>
                {score} / {module.questions.length}
              </div>

              <div className="action-row">
                <button onClick={() => window.location.reload()} className="btn-primary" style={{background:'#fff', color:'#2C3E50', border:'2px solid #ecf0f1'}}>
                  <RotateCcw size={20} /> Réessayer
                </button>
                <button onClick={() => navigate('/quiz')} className="btn-primary">
                  <LayoutDashboard size={20} /> Menu Principal
                </button>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  // --- VUE QUESTION (PLAYER) ---
  const question = module!.questions[currentStep];

  return (
    <PageTransition>
      <div className="quiz-page-container">
        <div className="player-wrapper">
          
          {/* HEADER : Titre et Barre de progression */}
          <div className="quiz-header">
            <div className="quiz-meta">
              <span className="module-tag">{module!.title}</span>
              <span className="progress-text">Question {currentStep + 1} / {module!.questions.length}</span>
            </div>
            <div className="progress-container">
              <div 
                className="progress-bar"
                style={{ width: `${((currentStep + 1) / module!.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* CARTE PRINCIPALE */}
          <div className="question-card">
            
            {/* Image (si présente) */}
            {question.image && (
              <div className="question-image-container">
                <img src={question.image} alt="Illustration question" />
              </div>
            )}

            {/* Texte de la question */}
            <h2 className="question-text">{question.question}</h2>

            {/* Liste des options */}
            <div className="options-list">
              {question.options.map((opt, idx) => {
                // Calcul des classes CSS dynamiques
                let statusClass = "";
                if (isChecked) {
                  if (idx === question.correctAnswer) statusClass = "correct";
                  else if (idx === selectedOption) statusClass = "wrong";
                } else if (selectedOption === idx) {
                  statusClass = "selected";
                }

                return (
                  <button 
                    key={idx}
                    className={`option-btn ${statusClass}`}
                    onClick={() => !isChecked && setSelectedOption(idx)}
                    disabled={isChecked}
                  >
                    <span>{opt}</span>
                    {/* Icônes de validation */}
                    {statusClass === 'correct' && <CheckCircle size={22} />}
                    {statusClass === 'wrong' && <XCircle size={22} />}
                  </button>
                );
              })}
            </div>

            {/* Feedback (Explication) après validation */}
            {isChecked && (
              <div className={`feedback-container ${selectedOption === question.correctAnswer ? 'success' : 'error'}`}>
                <div style={{display:'flex', gap:'8px', fontWeight:'bold', marginBottom:'5px'}}>
                   {selectedOption === question.correctAnswer ? <CheckCircle size={18}/> : <AlertCircle size={18}/>}
                   {selectedOption === question.correctAnswer ? "Bonne réponse !" : "Mauvaise réponse"}
                </div>
                <p style={{margin:0, fontSize:'0.95rem'}}>{question.explanation}</p>
              </div>
            )}

            {/* Footer avec Bouton d'action */}
            <div className="quiz-footer">
              {!isChecked ? (
                <button 
                  className="btn-primary" 
                  onClick={handleValidate} 
                  disabled={selectedOption === null}
                >
                  Valider ma réponse
                </button>
              ) : (
                <button className="btn-primary" onClick={handleNext}>
                  {currentStep < module!.questions.length - 1 ? (
                    <>Question Suivante <ArrowRight size={20} /></>
                  ) : (
                    <>Voir les résultats <Flag size={20} /></>
                  )}
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default QuizPlayer;
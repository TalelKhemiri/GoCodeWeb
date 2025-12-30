import { Link } from 'react-router-dom';
import { TriangleAlert, ArrowLeftRight, HeartPulse, BookOpen, ArrowRightCircle } from 'lucide-react';
import { QUIZ_DATA } from '../../data/QuizData';
import PageTransition from '../../components/PageTransition'; 
import './Quiz.css';

const IconMap: any = { TriangleAlert, ArrowLeftRight, HeartPulse, BookOpen };

const QuizList = () => {
  return (
    <PageTransition>
      {/* Container principal avec le nouveau fond dégradé */}
      <div className="quiz-page-container">
        
        <div className="dashboard-header">
          <h1>Tests de <span className="highlight">Code de la Route</span></h1>
          <p>Choisissez un module et maîtrisez la route dès aujourd'hui.</p>
        </div>

        <div className="modules-grid">
          {QUIZ_DATA.map((module) => {
            const IconComponent = IconMap[module.icon] || BookOpen;
            
            return (
              <div key={module.id} className="module-card">
                <div className="card-icon-wrapper">
                  <IconComponent size={32} strokeWidth={2.5} />
                </div>
                
                <h2>{module.title}</h2>
                <p>{module.description}</p>
                
                <div className="module-footer">
                  <div className="question-count">
                    <BookOpen size={18} /> 
                    <span>{module.questions.length} Questions</span>
                  </div>
                  
                  <Link to={`/quiz/${module.id}`} className="btn-start-module">
                    Commencer <ArrowRightCircle size={20} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
};

export default QuizList;
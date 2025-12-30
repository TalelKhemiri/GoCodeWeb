import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';
import { api } from '../../api';
import './CoursePlayer.css';

const CoursePlayer = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(id) loadCourseData();
  }, [id]);

  // FIX 1: Allow passing a 'specificLessonId' to force the player to go there
  const loadCourseData = (specificLessonId?: number) => {
    api.getCourseDetails(id!)
      .then(data => {
        setCourse(data);
        
        // Decide which lesson to show:
        // 1. If we requested a specific one (Next Button), use that.
        // 2. If we already have one open, keep it open (refresh content).
        // 3. Otherwise, open the first lesson.
        
        let lessonToActive = null;

        if (specificLessonId) {
           lessonToActive = data.lessons.find((l:any) => l.id === specificLessonId);
        } else if (activeLesson) {
           lessonToActive = data.lessons.find((l:any) => l.id === activeLesson.id);
        } else if (data.lessons && data.lessons.length > 0) {
           lessonToActive = data.lessons[0];
        }

        if (lessonToActive) {
          setActiveLesson(lessonToActive);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleCompleteAndNext = async () => {
    if (!activeLesson) return;

    try {
      // 1. Save Progress
      await api.markLessonComplete(activeLesson.id);

      // 2. Find Next Lesson
      const currentIndex = course.lessons.findIndex((l:any) => l.id === activeLesson.id);
      const nextLesson = course.lessons[currentIndex + 1];

      // 3. Refresh Data AND Force Jump to Next Lesson
      if (nextLesson) {
        loadCourseData(nextLesson.id); // <--- FIX 2: Pass the ID here
      } else {
        loadCourseData(); // Just refresh if finished
        alert("Félicitations ! Vous avez terminé ce cours.");
      }

    } catch (err) {
      console.error("Error saving progress:", err);
    }
  };

  if (loading) return <div className="player-loading">Chargement du cours...</div>;
  if (!course) return <div>Cours introuvable</div>;

  return (
    <div className="player-container">
      {/* Sidebar */}
      <aside className="player-sidebar">
        <div className="sidebar-header">
           <Link to="/my-courses" className="back-link">
             <ChevronLeft size={16}/> Retour
           </Link>
           <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{course.title}</h3>
        </div>
        <div className="lessons-list">
          {course.lessons.map((lesson: any, index: number) => (
            <div 
              key={lesson.id} 
              className={`lesson-item ${activeLesson?.id === lesson.id ? 'active' : ''}`}
              onClick={() => setActiveLesson(lesson)}
            >
              <span className="lesson-num">
                {lesson.is_completed ? <CheckCircle size={14} color="white"/> : index + 1}
              </span>
              <span className="lesson-title">{lesson.title}</span>
              {lesson.is_completed && <CheckCircle size={16} color="#27ae60" style={{marginLeft:'auto'}} />}
            </div>
          ))}
        </div>
      </aside>

      {/* Content */}
      <main className="player-content">
        {activeLesson ? (
          <div className="lesson-viewer">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <PlayCircle size={28} color="#3498db" />
              {activeLesson.title}
            </h2>
            
            {activeLesson.video_url && (
              <div className="video-wrapper">
                 <iframe 
                   src={activeLesson.video_url.replace("watch?v=", "embed/")} 
                   title={activeLesson.title} 
                   frameBorder="0" 
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowFullScreen 
                 />
              </div>
            )}

            <div className="lesson-text">
              <p>{activeLesson.content}</p>
            </div>

            <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={handleCompleteAndNext}
                className="btn-next-lesson"
                style={{
                  background: '#3498db', color: 'white', border: 'none', padding: '12px 24px',
                  borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                  fontWeight: 'bold', transition: 'background 0.2s'
                }}
              >
                Valider et Continuer <ChevronRight size={20} />
              </button>
            </div>

          </div>
        ) : (
          <div className="no-lesson">Sélectionnez une leçon</div>
        )}
      </main>
    </div>
  );
};

export default CoursePlayer;
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, AlertTriangle } from 'lucide-react';
import { api } from '../../api';
import './MyLearning.css';

const MyLearning = () => {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    api.getMyCourses().then(setCourses).catch(console.error);
  }, []);

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '50px', maxWidth: '1200px', margin: '0 auto', paddingLeft:'20px', paddingRight:'20px' }}>
      <h1>Mon Apprentissage</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px', marginTop: '30px' }}>
        
        {courses.map(course => (
          <div key={course.id} style={{ background: 'white', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ height: '160px', background: '#ccc', position: 'relative' }}>
               {course.thumbnail && <img src={course.thumbnail} alt="" style={{width:'100%', height:'100%', objectFit:'cover'}} />}
            </div>
            
            <div style={{ padding: '20px' }}>
              <h3>{course.title}</h3>
              
              {course.enrollment_status === 'pending' ? (
                <div style={{ background: '#fff3cd', color: '#856404', padding: '15px', borderRadius: '8px', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={20} />
                  <div>
                    <strong>En cours de révision</strong>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>Le moniteur doit valider votre demande.</p>
                  </div>
                </div>
              ) : course.enrollment_status === 'rejected' ? (
                 <div style={{ background: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '8px', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <AlertTriangle size={16} /> Demande refusée.
                 </div>
              ) : (
                <Link to={`/learn/${course.id}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#3498db', color: 'white', padding: '10px', borderRadius: '6px', textDecoration: 'none', marginTop: '15px', fontWeight: 'bold' }}>
                  <Play size={18} /> Commencer
                </Link>
              )}
            </div>
          </div>
        ))}
        
        {courses.length === 0 && <p>Vous n'êtes inscrit à aucun cours.</p>}

      </div>
    </div>
  );
};

export default MyLearning;
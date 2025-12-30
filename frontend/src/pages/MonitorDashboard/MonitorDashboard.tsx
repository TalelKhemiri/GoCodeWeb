import { useEffect, useState } from 'react';
import { Users, CheckCircle, XCircle } from 'lucide-react';
import { api } from '../../api';
import PageTransition from '../../components/PageTransition';

const MonitorDashboard = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    api.getMonitorDashboard()
      .then((res) => {
        const list = Array.isArray(res) ? res : res.results || [];
        setData(list);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleAction = async (id: number, action: 'approve' | 'reject') => {
    if(!confirm(`Êtes-vous sûr de vouloir ${action === 'approve' ? 'accepter' : 'rejeter'} ?`)) return;
    try {
      await api.manageEnrollment(id, action);
      loadData();
    } catch (e) {
      alert("Erreur serveur");
    }
  };

  return (
    <PageTransition>
      <div style={{ paddingTop: '100px', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1>Gestion des Étudiants</h1>
        
        {loading ? <p>Chargement...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <thead style={{ background: '#f8f9fa' }}>
              <tr>
                <th style={{ padding: '15px', textAlign: 'left' }}>Étudiant</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Cours</th>
                {/* NEW COLUMN header */}
                <th style={{ padding: '15px', textAlign: 'left' }}>Progression</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Statut</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px' }}>{row.student_name} <br/><small>{row.student_email}</small></td>
                  <td style={{ padding: '15px' }}>{row.course_title}</td>
                  
                  {/* NEW COLUMN body: Progress Bar */}
                  <td style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '120px' }}>
                       <div style={{ flex: 1, height: '8px', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ 
                             width: `${row.progress}%`, 
                             height: '100%', 
                             background: row.progress === 100 ? '#2ecc71' : '#3498db',
                             transition: 'width 0.3s ease'
                          }} />
                       </div>
                       <span style={{ fontSize: '0.8rem', color: '#555', minWidth: '35px' }}>{row.progress}%</span>
                    </div>
                  </td>

                  <td style={{ padding: '15px' }}>
                    {row.status === 'pending' && <span style={{background:'#f1c40f', padding:'5px 10px', borderRadius:'15px', fontSize:'0.8rem'}}>En Attente</span>}
                    {row.status === 'active' && <span style={{background:'#2ecc71', color:'white', padding:'5px 10px', borderRadius:'15px', fontSize:'0.8rem'}}>Actif</span>}
                    {row.status === 'rejected' && <span style={{background:'#e74c3c', color:'white', padding:'5px 10px', borderRadius:'15px', fontSize:'0.8rem'}}>Rejeté</span>}
                  </td>
                  <td style={{ padding: '15px' }}>
                    {row.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => handleAction(row.id, 'approve')} style={{ border:'none', background:'none', cursor:'pointer', color:'#27ae60' }} title="Accepter">
                          <CheckCircle size={24} />
                        </button>
                        <button onClick={() => handleAction(row.id, 'reject')} style={{ border:'none', background:'none', cursor:'pointer', color:'#e74c3c' }} title="Rejeter">
                           <XCircle size={24} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {data.length === 0 && !loading && <div className="state-box empty" style={{marginTop:'20px'}}><Users size={48} /><p>Aucune inscription pour le moment.</p></div>}
      </div>
    </PageTransition>
  );
};

export default MonitorDashboard;
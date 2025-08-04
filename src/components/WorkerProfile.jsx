import React from 'react';
import { Link } from 'react-router-dom';

// Example worker profile data (replace with real data or props/context as needed)
const workerProfile = {
  name: 'John Doe',
  assignedCourses: [
    { id: 1, title: 'Fire Safety', status: 'pending', link: '/compliance?course=fire-safety' },
    { id: 2, title: 'PPE Usage', status: 'completed', link: '/compliance?course=ppe-usage' },
    { id: 3, title: 'Hazard Communication', status: 'pending', link: '/compliance?course=hazard-communication' },
  ]
};

function WorkerProfile({ user }) {
  const training = user?.training || [];
  const pendingCourses = workerProfile.assignedCourses.filter(c => c.status === 'pending');

  return (
    <div style={{ padding: '2rem', maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Profile: {user?.name || user?.username || 'User'}</h1>
      <h2 className="subtitle">Pending Training Courses</h2>
      {pendingCourses.length === 0 ? (
        <p>All assigned training courses are completed! 🎉</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {pendingCourses.map(course => (
            <li key={course.id} style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>{course.title}</span>
              <Link to={course.link} className="cta-btn" style={{ fontSize: '1rem', padding: '0.5rem 1.2rem' }}>
                Go to Course
              </Link>
            </li>
          ))}
        </ul>
      )}
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>Training Records</h2>
        {training.length === 0 ? (
          <div style={{ color: 'var(--color-text)', opacity: 0.7 }}>No training records found.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.1rem', background: 'var(--color-bg-card)' }}>
            <thead>
              <tr style={{ background: 'var(--color-nav-link-active)', color: 'var(--color-primary)' }}>
                <th style={{ padding: 8, border: '1px solid var(--color-border)' }}>Training Name</th>
                <th style={{ padding: 8, border: '1px solid var(--color-border)' }}>Status</th>
                <th style={{ padding: 8, border: '1px solid var(--color-border)' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {training.map((t, i) => (
                <tr key={i}>
                  <td style={{ padding: 8, border: '1px solid var(--color-border)' }}>{t.name}</td>
                  <td style={{ padding: 8, border: '1px solid var(--color-border)' }}>{t.status}</td>
                  <td style={{ padding: 8, border: '1px solid var(--color-border)' }}>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default WorkerProfile; 
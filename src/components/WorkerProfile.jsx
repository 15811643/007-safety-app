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

function WorkerProfile() {
  const pendingCourses = workerProfile.assignedCourses.filter(c => c.status === 'pending');

  return (
    <div className="card" style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h1 className="heading">👷 {workerProfile.name}'s Profile</h1>
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
    </div>
  );
}

export default WorkerProfile; 
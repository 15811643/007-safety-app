import React from 'react';
import '../styles/form.css';

const TrafficProtectionPlan = () => {
  return (
    <div style={{ padding: '2rem', fontSize: '1.35rem', maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.4rem', marginBottom: '1.5rem' }}>Traffic Protection Plan</h1>
      <section style={{ marginBottom: '2rem' }}>
        <h2>Interactive Map/Diagram</h2>
        <div style={{ border: '2px dashed #065f46', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7fafc', color: '#065f46' }}>
          [Interactive diagram with drag-and-drop shapes coming soon]
        </div>
      </section>
      <section style={{ marginBottom: '2rem' }}>
        <h2>Traffic Risks & Controls</h2>
        <div>[Form for risks, controls, responsible persons]</div>
      </section>
      <section style={{ marginBottom: '2rem' }}>
        <h2>Compliance Checklist</h2>
        <div>[Checklist for traffic safety standards]</div>
      </section>
      <section style={{ marginBottom: '2rem' }}>
        <h2>Upload Site Maps/Photos</h2>
        <div>[Upload/attach files feature]</div>
      </section>
      <section style={{ marginBottom: '2rem' }}>
        <h2>Export/Print</h2>
        <div>[Export or print as PDF feature]</div>
      </section>
    </div>
  );
};

export default TrafficProtectionPlan; 
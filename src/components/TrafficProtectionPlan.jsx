import React, { useState } from 'react';
import '../styles/form.css';

const initialForm = {
  planDate: '',
  siteName: '',
  siteLocation: '',
  planNumber: '',
  planOf: '',
  supervisor: '',
  company: '',
  trafficSupervisor: '',
  trafficPersons: '',
  workDescription: '',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  siteFactors: {
    roadType: '', speedLimit: '', lanes: '', shoulders: '', sightDistance: '', schoolLocations: '', publicNotification: '', parkingMeters: '', busRoutes: ''
  },
  proceduralFactors: {
    workOnRoadway: false, workOffRoadway: false, shoulderWork: false, stationary: false, moving: false, siteActivity: '', changeOfActivity: '', amountOfActivity: '', hoursOfWork: '', offHoursControl: '', emergencyAccess: '', equipmentAccess: '', numSetups: '', trenches: ''
  },
  trafficDevices: '',
  siteDiagram: null,
  developedBy: '',
  signature: '',
  developedDate: '',
};

const layoutDeviceMap = {
  'single-lane-closure': ['cones', 'barrels', 'signs', 'arrowBoards', 'barriers'],
  'two-way-flagging': ['cones', 'signs', 'flaggers'],
  'detour': ['signs', 'barriers', 'cones'],
  'shoulder-work': ['cones', 'signs'],
  'mobile-operation': ['cones', 'signs', 'arrowBoards'],
  'other': [],
};

const layoutDiagramMap = {
  'single-lane-closure': 'Single Lane Closure Diagram',
  'two-way-flagging': 'Two-Way Flagging Diagram',
  'detour': 'Detour Diagram',
  'shoulder-work': 'Shoulder Work Diagram',
  'mobile-operation': 'Mobile Operation Diagram',
  'other': 'Custom/Other Layout',
};

const closureTypes = [
  { type: 'single-lane-closure', label: 'Single Lane Closure', taper: '30m', buffer: '60m', spacing: '10m' },
  { type: 'double-lane-closure', label: 'Double Lane Closure', taper: '60m', buffer: '90m', spacing: '10m' },
  { type: 'shoulder-closure', label: 'Shoulder Closure', taper: '15m', buffer: '30m', spacing: '10m' },
  { type: 'full-road-closure', label: 'Full Road Closure', taper: '60m', buffer: '90m', spacing: '10m' },
  { type: 'ramp-closure', label: 'Ramp Closure', taper: '30m', buffer: '60m', spacing: '10m' },
  { type: 'detour', label: 'Detour', taper: '-', buffer: '-', spacing: '10m' },
  { type: 'mobile-operation', label: 'Mobile Operation', taper: '-', buffer: '-', spacing: '20m' },
  { type: 'two-way-flagging', label: 'Two-Way Flagging', taper: '30m', buffer: '60m', spacing: '10m' },
  { type: 'intermittent-closure', label: 'Intermittent/Short Duration Closure', taper: '15m', buffer: '30m', spacing: '10m' },
];

const closureTypesDetailed = [
  {
    group: 'Multi-Lane Undivided',
    options: [
      { type: 'ug-1', label: 'Designated Construction Zone Signing (UG-1)', layout: 'UG-1', duration: 'VSD/SD/LD' },
      { type: 'ug-2', label: 'Reduced Speed Zone Signing (UG-2)', layout: 'UG-2', duration: 'VSD/SD/LD' },
    ]
  },
  {
    group: 'Segment',
    options: [
      { type: 'us-1', label: 'Intermittent Work (US-1)', layout: 'US-1', duration: 'Mobile' },
      { type: 'us-2', label: 'Intermittent Work (US-2)', layout: 'US-2', duration: 'Mobile' },
      { type: 'us-3', label: 'Intermittent Work (US-3)', layout: 'US-3', duration: 'Mobile' },
      { type: 'us-4', label: 'Shoulder Work (US-4)', layout: 'US-4', duration: 'SD/LD' },
      { type: 'us-5', label: 'Shoulder Work (US-5)', layout: 'US-5', duration: 'SD/LD' },
      { type: 'us-6', label: 'Lane Encroachment (US-6)', layout: 'US-6', duration: 'SD/LD' },
      { type: 'us-7', label: 'Lane Encroachment (US-7)', layout: 'US-7', duration: 'SD/LD' },
      { type: 'us-8', label: 'Parking Lane Closed (US-8)', layout: 'US-8', duration: 'SD/LD' },
      { type: 'us-9', label: 'Parking Lane Closed (US-9)', layout: 'US-9', duration: 'SD/LD' },
      { type: 'us-10', label: 'Partial Lane Shift: Narrow Lanes (US-10)', layout: 'US-10', duration: 'SD/LD' },
      { type: 'us-11', label: 'Lane Realignment (US-11)', layout: 'US-11', duration: 'SD/LD' },
      { type: 'us-12', label: 'Zone Painting: Right or Left Lane Closed (US-12)', layout: 'US-12', duration: 'Mobile' },
      { type: 'us-13', label: 'Lane Closed or Occupied (US-13)', layout: 'US-13', duration: 'SD/LD' },
      { type: 'us-14', label: 'Left Lane Closed or Occupied (US-14)', layout: 'US-14', duration: 'SD/LD' },
      { type: 'us-15', label: 'Two-Way Left Turn Lane Closed (US-15)', layout: 'US-15', duration: 'SD/LD' },
      { type: 'us-16', label: 'Two-Way Left Turn Lane Closed (US-16)', layout: 'US-16', duration: 'SD/LD' },
      { type: 'us-17', label: 'Lane Closed (US-17)', layout: 'US-17', duration: 'SD/LD' },
      { type: 'us-18', label: 'Left Lane Closed (US-18)', layout: 'US-18', duration: 'SD/LD' },
    ]
  },
  // Add more groups as needed
];

// Add a helper for section headings with orange accent in dark mode
const SectionHeading = ({ children }) => (
  <legend style={{
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: 'var(--color-accent)',
    marginBottom: '1rem',
    letterSpacing: '0.01em',
  }}>{children}</legend>
);

const TrafficProtectionPlan = () => {
  const [form, setForm] = useState(initialForm);
  const [devices, setDevices] = useState({
    cones: false, barrels: false, signs: false, arrowBoards: false, barriers: false, flaggers: false, portableLights: false, otherDevice: false
  });
  const [closureType, setClosureType] = useState('');
  const [closureTypeDetailed, setClosureTypeDetailed] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'standardLayout') {
      setForm({ ...form, standardLayout: value });
      // Auto-select devices for layout
      const autoDevices = layoutDeviceMap[value] || [];
      setDevices((prev) => {
        const newDevices = { ...prev };
        Object.keys(newDevices).forEach((key) => {
          newDevices[key] = autoDevices.includes(key);
        });
        return newDevices;
      });
      return;
    }
    if (name.startsWith('siteFactors.')) {
      setForm({ ...form, siteFactors: { ...form.siteFactors, [name.split('.')[1]]: value } });
    } else if (name.startsWith('proceduralFactors.')) {
      setForm({ ...form, proceduralFactors: { ...form.proceduralFactors, [name.split('.')[1]]: type === 'checkbox' ? checked : value } });
    } else if (devices.hasOwnProperty(name)) {
      setDevices({ ...devices, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setForm({ ...form, siteDiagram: e.target.files[0] });
  };

  return (
    <div style={{ padding: '2rem', fontSize: '1.35rem', maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.4rem', marginBottom: '2.5rem', color: 'var(--color-accent)' }}>Traffic Control Plan</h1>
      {/* OTM Book 7 Reference Section */}
      <fieldset style={{ border: '2px solid var(--color-accent)', borderRadius: 8, padding: '1.5rem', background: 'var(--color-bg-card)', marginBottom: '2.5rem' }}>
        <SectionHeading>Ontario Traffic Manual: Book 7 Reference</SectionHeading>
        <p>
          For detailed requirements, consult the <a href="https://www.publications.gov.on.ca/store/20170501121/Free_Download_Files/300958.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>Ontario Traffic Manual: Book 7</a>.
        </p>
        <ul style={{ fontSize: '1.1rem', marginLeft: '1.5rem', color: 'var(--color-accent)' }}>
          <li>Use standard layouts for lane closures, detours, and flagging.</li>
          <li>Follow minimum device spacing and placement tables.</li>
          <li>Ensure all signs and devices are visible and reflective at night.</li>
          <li>Maintain emergency access at all times.</li>
        </ul>
      </fieldset>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {/* Section F: Closure Type (Detailed) */}
        <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '1.5rem', marginBottom: '2.5rem' }}>
          <SectionHeading>Section F: Closure Type (Book 7)</SectionHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: 500 }}>
            <label style={{ color: 'var(--color-accent)' }}>
              Select Closure Type:<br/>
              <select name="closureTypeDetailed" value={closureTypeDetailed} onChange={e => setClosureTypeDetailed(e.target.value)} style={{ fontSize: '1.1rem', padding: '0.5rem', marginTop: 4, width: '100%' }}>
                <option value="">-- Select --</option>
                {closureTypesDetailed.map(group => (
                  <optgroup key={group.group} label={group.group}>
                    {group.options.map(opt => (
                      <option key={opt.type} value={opt.type}>{opt.label}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
            {closureTypeDetailed && (() => {
              const found = closureTypesDetailed.flatMap(g => g.options).find(opt => opt.type === closureTypeDetailed);
              return found ? (
                <div style={{ marginTop: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.1rem', background: 'var(--color-bg-card)' }}>
                    <thead>
                      <tr style={{ background: 'var(--color-nav-link-active)', color: 'var(--color-primary)' }}>
                        <th style={{ padding: 8, border: '1px solid var(--color-border)' }}>Layout Title</th>
                        <th style={{ padding: 8, border: '1px solid var(--color-border)' }}>Typical Layout</th>
                        <th style={{ padding: 8, border: '1px solid var(--color-border)' }}>Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ padding: 8, border: '1px solid var(--color-border)' }}>{found.label}</td>
                        <td style={{ padding: 8, border: '1px solid var(--color-border)' }}>{found.layout}</td>
                        <td style={{ padding: 8, border: '1px solid var(--color-border)' }}>{found.duration}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : null;
            })()}
          </div>
        </fieldset>
        {/* Standard Layout Selection */}
        <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '1.5rem', marginBottom: '2.5rem' }}>
          <SectionHeading>Standard Work Zone Layout</SectionHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: 500 }}>
            <label style={{ color: 'var(--color-accent)' }}>
              Select Layout:<br/>
              <select name="standardLayout" value={form.standardLayout || ''} onChange={handleChange} style={{ fontSize: '1.1rem', padding: '0.5rem', marginTop: 4, width: '100%' }}>
                <option value="">-- Select --</option>
                <option value="single-lane-closure">Single Lane Closure</option>
                <option value="two-way-flagging">Two-Way Flagging</option>
                <option value="detour">Detour</option>
                <option value="shoulder-work">Shoulder Work</option>
                <option value="mobile-operation">Mobile Operation</option>
                <option value="other">Other</option>
              </select>
            </label>
            {/* Visual Diagram Placeholder */}
            {form.standardLayout && (
              <div style={{ marginTop: 16, border: '2px dashed var(--color-accent)', borderRadius: 8, padding: 24, textAlign: 'center', background: 'var(--color-bg-card)', color: 'var(--color-accent)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                {layoutDiagramMap[form.standardLayout]}
                <div style={{ fontSize: '0.95rem', color: 'var(--color-text)', marginTop: 8 }}>[Diagram placeholder]</div>
              </div>
            )}
          </div>
        </fieldset>
        {/* Device Selection */}
        <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '1.5rem', marginBottom: '2.5rem' }}>
          <SectionHeading>Traffic Control Devices</SectionHeading>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem 2.5rem', alignItems: 'center' }}>
            <label style={{ color: 'var(--color-accent)', minWidth: 180 }}><input type="checkbox" name="cones" checked={devices.cones} onChange={handleChange} /> Cones</label>
            <label style={{ color: 'var(--color-accent)', minWidth: 180 }}><input type="checkbox" name="barrels" checked={devices.barrels} onChange={handleChange} /> Barrels</label>
            <label style={{ color: 'var(--color-accent)', minWidth: 180 }}><input type="checkbox" name="signs" checked={devices.signs} onChange={handleChange} /> Signs</label>
            <label style={{ color: 'var(--color-accent)', minWidth: 180 }}><input type="checkbox" name="arrowBoards" checked={devices.arrowBoards} onChange={handleChange} /> Arrow Boards</label>
            <label style={{ color: 'var(--color-accent)', minWidth: 180 }}><input type="checkbox" name="barriers" checked={devices.barriers} onChange={handleChange} /> Barriers</label>
            <label style={{ color: 'var(--color-accent)', minWidth: 180 }}><input type="checkbox" name="flaggers" checked={devices.flaggers} onChange={handleChange} /> Flaggers</label>
            <label style={{ color: 'var(--color-accent)', minWidth: 180 }}><input type="checkbox" name="portableLights" checked={devices.portableLights} onChange={handleChange} /> Portable Lights</label>
            <label style={{ color: 'var(--color-accent)', minWidth: 180 }}><input type="checkbox" name="otherDevice" checked={devices.otherDevice} onChange={handleChange} /> Other</label>
          </div>
        </fieldset>
        {/* Compliance Checklist */}
        <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '1.5rem', marginBottom: '2.5rem' }}>
          <SectionHeading>OTM Book 7 Compliance Checklist</SectionHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: 500 }}>
            <label style={{ color: 'var(--color-accent)' }}><input type="checkbox" name="check-spacing" /> Device spacing meets OTM Book 7 tables</label>
            <label style={{ color: 'var(--color-accent)' }}><input type="checkbox" name="check-signs" /> All signs are reflective and visible at night</label>
            <label style={{ color: 'var(--color-accent)' }}><input type="checkbox" name="check-access" /> Emergency access is maintained</label>
            <label style={{ color: 'var(--color-accent)' }}><input type="checkbox" name="check-buffer" /> Buffer and transition areas are adequate</label>
            <label style={{ color: 'var(--color-accent)' }}><input type="checkbox" name="check-training" /> All workers trained in OTM Book 7 requirements</label>
          </div>
        </fieldset>
        {/* Project/Site Details */}
        <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '1.5rem', marginBottom: '2.5rem' }}>
          <SectionHeading>Project / Site Details</SectionHeading>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem 2.5rem' }}>
            <div style={{ minWidth: 220 }}><label>Plan Date<br/><input name="planDate" type="date" value={form.planDate} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 220 }}><label>Site Name<br/><input name="siteName" value={form.siteName} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 220 }}><label>Exact Site Location<br/><input name="siteLocation" value={form.siteLocation} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 120 }}><label>Plan #<br/><input name="planNumber" value={form.planNumber} onChange={handleChange} style={{ width: 60 }} /></label></div>
            <div style={{ minWidth: 120 }}><label>Of #<br/><input name="planOf" value={form.planOf} onChange={handleChange} style={{ width: 60 }} /></label></div>
            <div style={{ minWidth: 220 }}><label>Project Supervisor<br/><input name="supervisor" value={form.supervisor} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 220 }}><label>Company Name<br/><input name="company" value={form.company} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 220 }}><label>Traffic Control Supervisor<br/><input name="trafficSupervisor" value={form.trafficSupervisor} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 220 }}><label>Traffic Control Persons<br/><input name="trafficPersons" value={form.trafficPersons} onChange={handleChange} /></label></div>
          </div>
        </fieldset>
        {/* Work Activity & Timing */}
        <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '1.5rem', marginBottom: '2.5rem' }}>
          <SectionHeading>Work Activity & Timing</SectionHeading>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem 2.5rem' }}>
            <div style={{ flex: 1, minWidth: 320 }}><label>Description of Work Activity<br/><textarea name="workDescription" value={form.workDescription} onChange={handleChange} rows={2} style={{ width: '100%' }} /></label></div>
            <div style={{ minWidth: 180 }}><label>Start Date<br/><input name="startDate" type="date" value={form.startDate} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 180 }}><label>Completion Date<br/><input name="endDate" type="date" value={form.endDate} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 180 }}><label>Start Time<br/><input name="startTime" type="time" value={form.startTime} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 180 }}><label>Completion Time<br/><input name="endTime" type="time" value={form.endTime} onChange={handleChange} /></label></div>
          </div>
        </fieldset>
        {/* Site Factors */}
        <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '1.5rem', marginBottom: '2.5rem' }}>
          <SectionHeading>Site Factors</SectionHeading>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem 2.5rem' }}>
            <div style={{ minWidth: 220 }}><label>Road Type<br/><input name="siteFactors.roadType" value={form.siteFactors.roadType} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 220 }}><label>Speed Limit<br/><input name="siteFactors.speedLimit" value={form.siteFactors.speedLimit} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 120 }}><label># of Lanes<br/><input name="siteFactors.lanes" value={form.siteFactors.lanes} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 120 }}><label>Shoulders<br/><input name="siteFactors.shoulders" value={form.siteFactors.shoulders} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 220 }}><label>Sight Distance<br/><input name="siteFactors.sightDistance" value={form.siteFactors.sightDistance} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 220 }}><label>School Locations<br/><input name="siteFactors.schoolLocations" value={form.siteFactors.schoolLocations} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 220 }}><label>Public Notification Needed?<br/><input name="siteFactors.publicNotification" value={form.siteFactors.publicNotification} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 220 }}><label>Parking Meters<br/><input name="siteFactors.parkingMeters" value={form.siteFactors.parkingMeters} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 220 }}><label>Bus Routes<br/><input name="siteFactors.busRoutes" value={form.siteFactors.busRoutes} onChange={handleChange} /></label></div>
          </div>
        </fieldset>
        {/* Procedural Factors */}
        <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '1.5rem', marginBottom: '2.5rem' }}>
          <SectionHeading>Procedural Factors</SectionHeading>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem 2.5rem' }}>
            <div style={{ minWidth: 220 }}><label><input type="checkbox" name="proceduralFactors.workOnRoadway" checked={form.proceduralFactors.workOnRoadway} onChange={handleChange} /> Work on roadway</label></div>
            <div style={{ minWidth: 220 }}><label><input type="checkbox" name="proceduralFactors.workOffRoadway" checked={form.proceduralFactors.workOffRoadway} onChange={handleChange} /> Work off roadway</label></div>
            <div style={{ minWidth: 220 }}><label><input type="checkbox" name="proceduralFactors.shoulderWork" checked={form.proceduralFactors.shoulderWork} onChange={handleChange} /> Shoulder Work</label></div>
            <div style={{ minWidth: 220 }}><label><input type="checkbox" name="proceduralFactors.stationary" checked={form.proceduralFactors.stationary} onChange={handleChange} /> Stationary</label></div>
            <div style={{ minWidth: 220 }}><label><input type="checkbox" name="proceduralFactors.moving" checked={form.proceduralFactors.moving} onChange={handleChange} /> Moving</label></div>
            <div style={{ minWidth: 220 }}><label>Site Activity<br/><input name="proceduralFactors.siteActivity" value={form.proceduralFactors.siteActivity} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 220 }}><label>Change of Activity<br/><input name="proceduralFactors.changeOfActivity" value={form.proceduralFactors.changeOfActivity} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 220 }}><label>Amount of Site Activity<br/><input name="proceduralFactors.amountOfActivity" value={form.proceduralFactors.amountOfActivity} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 220 }}><label>Hours of Work (day/night)<br/><input name="proceduralFactors.hoursOfWork" value={form.proceduralFactors.hoursOfWork} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 220 }}><label>Traffic Control During Off Hours<br/><input name="proceduralFactors.offHoursControl" value={form.proceduralFactors.offHoursControl} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 220 }}><label>Emergency Vehicle Access<br/><input name="proceduralFactors.emergencyAccess" value={form.proceduralFactors.emergencyAccess} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 220 }}><label>Equipment Access<br/><input name="proceduralFactors.equipmentAccess" value={form.proceduralFactors.equipmentAccess} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 220 }}><label>Number of Setups<br/><input name="proceduralFactors.numSetups" value={form.proceduralFactors.numSetups} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 220 }}><label>Trenches<br/><input name="proceduralFactors.trenches" value={form.proceduralFactors.trenches} onChange={handleChange} /></label></div>
          </div>
        </fieldset>
        {/* Traffic Control Devices & Areas */}
        <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '1.5rem', marginBottom: '2.5rem' }}>
          <SectionHeading>Traffic Control Devices & Areas</SectionHeading>
          <div><label>Types, Spacing, Areas, Instructions<br/><textarea name="trafficDevices" value={form.trafficDevices} onChange={handleChange} rows={3} style={{ width: '100%' }} /></label></div>
        </fieldset>
        {/* Site Diagram Upload */}
        <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '1.5rem', marginBottom: '2.5rem' }}>
          <SectionHeading>Site Diagram</SectionHeading>
          <div><input type="file" accept="image/*,application/pdf" onChange={handleFileChange} /></div>
          {form.siteDiagram && <div style={{ marginTop: 8 }}>Selected: {form.siteDiagram.name}</div>}
        </fieldset>
        {/* Plan Developed By */}
        <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '1.5rem', marginBottom: '2.5rem' }}>
          <SectionHeading>Plan Developed By</SectionHeading>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem 2.5rem' }}>
            <div style={{ minWidth: 220 }}><label>Name (Printed)<br/><input name="developedBy" value={form.developedBy} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 220 }}><label>Signature<br/><input name="signature" value={form.signature} onChange={handleChange} /></label></div>
            <div style={{ minWidth: 180 }}><label>Date<br/><input name="developedDate" type="date" value={form.developedDate} onChange={handleChange} /></label></div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default TrafficProtectionPlan; 
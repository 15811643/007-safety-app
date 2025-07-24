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

const TrafficProtectionPlan = () => {
  const [form, setForm] = useState(initialForm);
  const [devices, setDevices] = useState({
    cones: false, barrels: false, signs: false, arrowBoards: false, barriers: false, flaggers: false, portableLights: false, otherDevice: false
  });

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
      <h1 style={{ fontSize: '2.4rem', marginBottom: '1.5rem' }}>Traffic Control Plan</h1>
      {/* OTM Book 7 Reference Section */}
      <fieldset style={{ border: '2px solid var(--color-accent)', borderRadius: 8, padding: '1.5rem', background: 'var(--color-bg-card)' }}>
        <legend style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-accent)' }}>Ontario Traffic Manual: Book 7 Reference</legend>
        <p>
          For detailed requirements, consult the <a href="https://www.publications.gov.on.ca/store/20170501121/Free_Download_Files/300958.pdf" target="_blank" rel="noopener noreferrer">Ontario Traffic Manual: Book 7</a>.
        </p>
        <ul style={{ fontSize: '1.1rem', marginLeft: '1.5rem' }}>
          <li>Use standard layouts for lane closures, detours, and flagging.</li>
          <li>Follow minimum device spacing and placement tables.</li>
          <li>Ensure all signs and devices are visible and reflective at night.</li>
          <li>Maintain emergency access at all times.</li>
        </ul>
      </fieldset>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Standard Layout Selection */}
        <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '1.5rem' }}>
          <legend style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Standard Work Zone Layout</legend>
          <label>
            Select Layout:<br/>
            <select name="standardLayout" value={form.standardLayout || ''} onChange={handleChange} style={{ fontSize: '1.1rem', padding: '0.5rem', marginTop: 4 }}>
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
        </fieldset>
        {/* Device Selection */}
        <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '1.5rem' }}>
          <legend style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Traffic Control Devices</legend>
          <label><input type="checkbox" name="cones" checked={devices.cones} onChange={handleChange} /> Cones</label><br/>
          <label><input type="checkbox" name="barrels" checked={devices.barrels} onChange={handleChange} /> Barrels</label><br/>
          <label><input type="checkbox" name="signs" checked={devices.signs} onChange={handleChange} /> Signs</label><br/>
          <label><input type="checkbox" name="arrowBoards" checked={devices.arrowBoards} onChange={handleChange} /> Arrow Boards</label><br/>
          <label><input type="checkbox" name="barriers" checked={devices.barriers} onChange={handleChange} /> Barriers</label><br/>
          <label><input type="checkbox" name="flaggers" checked={devices.flaggers} onChange={handleChange} /> Flaggers</label><br/>
          <label><input type="checkbox" name="portableLights" checked={devices.portableLights} onChange={handleChange} /> Portable Lights</label><br/>
          <label><input type="checkbox" name="otherDevice" checked={devices.otherDevice} onChange={handleChange} /> Other</label>
        </fieldset>
        {/* Compliance Checklist */}
        <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '1.5rem' }}>
          <legend style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>OTM Book 7 Compliance Checklist</legend>
          <label><input type="checkbox" name="check-spacing" /> Device spacing meets OTM Book 7 tables</label><br/>
          <label><input type="checkbox" name="check-signs" /> All signs are reflective and visible at night</label><br/>
          <label><input type="checkbox" name="check-access" /> Emergency access is maintained</label><br/>
          <label><input type="checkbox" name="check-buffer" /> Buffer and transition areas are adequate</label><br/>
          <label><input type="checkbox" name="check-training" /> All workers trained in OTM Book 7 requirements</label>
        </fieldset>
        {/* Project/Site Details */}
        <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '1.5rem' }}>
          <legend style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Project / Site Details</legend>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div><label>Plan Date<br/><input name="planDate" type="date" value={form.planDate} onChange={handleChange} /></label></div>
            <div><label>Site Name<br/><input name="siteName" value={form.siteName} onChange={handleChange} /></label></div>
            <div><label>Exact Site Location<br/><input name="siteLocation" value={form.siteLocation} onChange={handleChange} /></label></div>
            <div><label>Plan #<br/><input name="planNumber" value={form.planNumber} onChange={handleChange} style={{ width: 60 }} /></label></div>
            <div><label>Of #<br/><input name="planOf" value={form.planOf} onChange={handleChange} style={{ width: 60 }} /></label></div>
            <div><label>Project Supervisor<br/><input name="supervisor" value={form.supervisor} onChange={handleChange} /></label></div>
            <div><label>Company Name<br/><input name="company" value={form.company} onChange={handleChange} /></label></div>
            <div><label>Traffic Control Supervisor<br/><input name="trafficSupervisor" value={form.trafficSupervisor} onChange={handleChange} /></label></div>
            <div><label>Traffic Control Persons<br/><input name="trafficPersons" value={form.trafficPersons} onChange={handleChange} /></label></div>
          </div>
        </fieldset>
        {/* Work Activity & Timing */}
        <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '1.5rem' }}>
          <legend style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Work Activity & Timing</legend>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ flex: 1 }}><label>Description of Work Activity<br/><textarea name="workDescription" value={form.workDescription} onChange={handleChange} rows={2} style={{ width: '100%' }} /></label></div>
            <div><label>Start Date<br/><input name="startDate" type="date" value={form.startDate} onChange={handleChange} /></label></div>
            <div><label>Completion Date<br/><input name="endDate" type="date" value={form.endDate} onChange={handleChange} /></label></div>
            <div><label>Start Time<br/><input name="startTime" type="time" value={form.startTime} onChange={handleChange} /></label></div>
            <div><label>Completion Time<br/><input name="endTime" type="time" value={form.endTime} onChange={handleChange} /></label></div>
          </div>
        </fieldset>
        {/* Site Factors */}
        <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '1.5rem' }}>
          <legend style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Site Factors</legend>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div><label>Road Type<br/><input name="siteFactors.roadType" value={form.siteFactors.roadType} onChange={handleChange} /></label></div>
            <div><label>Speed Limit<br/><input name="siteFactors.speedLimit" value={form.siteFactors.speedLimit} onChange={handleChange} /></label></div>
            <div><label># of Lanes<br/><input name="siteFactors.lanes" value={form.siteFactors.lanes} onChange={handleChange} /></label></div>
            <div><label>Shoulders<br/><input name="siteFactors.shoulders" value={form.siteFactors.shoulders} onChange={handleChange} /></label></div>
            <div><label>Sight Distance<br/><input name="siteFactors.sightDistance" value={form.siteFactors.sightDistance} onChange={handleChange} /></label></div>
            <div><label>School Locations<br/><input name="siteFactors.schoolLocations" value={form.siteFactors.schoolLocations} onChange={handleChange} /></label></div>
            <div><label>Public Notification Needed?<br/><input name="siteFactors.publicNotification" value={form.siteFactors.publicNotification} onChange={handleChange} /></label></div>
            <div><label>Parking Meters<br/><input name="siteFactors.parkingMeters" value={form.siteFactors.parkingMeters} onChange={handleChange} /></label></div>
            <div><label>Bus Routes<br/><input name="siteFactors.busRoutes" value={form.siteFactors.busRoutes} onChange={handleChange} /></label></div>
          </div>
        </fieldset>
        {/* Procedural Factors */}
        <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '1.5rem' }}>
          <legend style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Procedural Factors</legend>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div><label><input type="checkbox" name="proceduralFactors.workOnRoadway" checked={form.proceduralFactors.workOnRoadway} onChange={handleChange} /> Work on roadway</label></div>
            <div><label><input type="checkbox" name="proceduralFactors.workOffRoadway" checked={form.proceduralFactors.workOffRoadway} onChange={handleChange} /> Work off roadway</label></div>
            <div><label><input type="checkbox" name="proceduralFactors.shoulderWork" checked={form.proceduralFactors.shoulderWork} onChange={handleChange} /> Shoulder Work</label></div>
            <div><label><input type="checkbox" name="proceduralFactors.stationary" checked={form.proceduralFactors.stationary} onChange={handleChange} /> Stationary</label></div>
            <div><label><input type="checkbox" name="proceduralFactors.moving" checked={form.proceduralFactors.moving} onChange={handleChange} /> Moving</label></div>
            <div style={{ flex: 1 }}><label>Site Activity<br/><input name="proceduralFactors.siteActivity" value={form.proceduralFactors.siteActivity} onChange={handleChange} /></label></div>
            <div style={{ flex: 1 }}><label>Change of Activity<br/><input name="proceduralFactors.changeOfActivity" value={form.proceduralFactors.changeOfActivity} onChange={handleChange} /></label></div>
            <div style={{ flex: 1 }}><label>Amount of Site Activity<br/><input name="proceduralFactors.amountOfActivity" value={form.proceduralFactors.amountOfActivity} onChange={handleChange} /></label></div>
            <div style={{ flex: 1 }}><label>Hours of Work (day/night)<br/><input name="proceduralFactors.hoursOfWork" value={form.proceduralFactors.hoursOfWork} onChange={handleChange} /></label></div>
            <div style={{ flex: 1 }}><label>Traffic Control During Off Hours<br/><input name="proceduralFactors.offHoursControl" value={form.proceduralFactors.offHoursControl} onChange={handleChange} /></label></div>
            <div style={{ flex: 1 }}><label>Emergency Vehicle Access<br/><input name="proceduralFactors.emergencyAccess" value={form.proceduralFactors.emergencyAccess} onChange={handleChange} /></label></div>
            <div style={{ flex: 1 }}><label>Equipment Access<br/><input name="proceduralFactors.equipmentAccess" value={form.proceduralFactors.equipmentAccess} onChange={handleChange} /></label></div>
            <div style={{ flex: 1 }}><label>Number of Setups<br/><input name="proceduralFactors.numSetups" value={form.proceduralFactors.numSetups} onChange={handleChange} /></label></div>
            <div style={{ flex: 1 }}><label>Trenches<br/><input name="proceduralFactors.trenches" value={form.proceduralFactors.trenches} onChange={handleChange} /></label></div>
          </div>
        </fieldset>
        {/* Traffic Control Devices & Areas */}
        <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '1.5rem' }}>
          <legend style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Traffic Control Devices & Areas</legend>
          <div><label>Types, Spacing, Areas, Instructions<br/><textarea name="trafficDevices" value={form.trafficDevices} onChange={handleChange} rows={3} style={{ width: '100%' }} /></label></div>
        </fieldset>
        {/* Site Diagram Upload */}
        <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '1.5rem' }}>
          <legend style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Site Diagram</legend>
          <div><input type="file" accept="image/*,application/pdf" onChange={handleFileChange} /></div>
          {form.siteDiagram && <div style={{ marginTop: 8 }}>Selected: {form.siteDiagram.name}</div>}
        </fieldset>
        {/* Plan Developed By */}
        <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '1.5rem' }}>
          <legend style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Plan Developed By</legend>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div><label>Name (Printed)<br/><input name="developedBy" value={form.developedBy} onChange={handleChange} /></label></div>
            <div><label>Signature<br/><input name="signature" value={form.signature} onChange={handleChange} /></label></div>
            <div><label>Date<br/><input name="developedDate" type="date" value={form.developedDate} onChange={handleChange} /></label></div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default TrafficProtectionPlan; 
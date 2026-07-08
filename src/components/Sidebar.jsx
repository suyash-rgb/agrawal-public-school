import React, { useState } from 'react';

const DEFAULT_AVATAR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" fill="none"><rect width="100" height="120" fill="#f8fafc"/><circle cx="50" cy="45" r="20" fill="#cbd5e1"/><path d="M 15 110 C 15 82, 85 82, 85 110 Z" fill="#cbd5e1"/><path d="M 50 16 L 80 26 L 50 36 L 20 26 Z" fill="#475569"/><rect x="48" y="26" width="4" height="12" fill="#475569"/><path d="M 77 28 L 77 44 C 77 46, 80 46, 80 44 L 80 28 Z" fill="#f59e0b"/></svg>`;
const DEFAULT_AVATAR_URL = `data:image/svg+xml;utf8,${encodeURIComponent(DEFAULT_AVATAR_SVG)}`;

export default function Sidebar({ students, activeStudentId, setActiveStudentId, onAdd, onDuplicate, onDelete, updateStudent, loadDemoData }) {
  const [activeTab, setActiveTab] = useState('list');
  const [search, setSearch] = useState('');

  const activeStudent = students.find(s => s.id === activeStudentId);

  const filtered = students.filter(student => 
    student.name.toLowerCase().includes(search.toLowerCase()) || 
    student.scholarNo.toLowerCase().includes(search.toLowerCase()) ||
    student.class.toLowerCase().includes(search.toLowerCase())
  );

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.match('image.*')) {
      alert("Invalid format. Please select an image file.");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.src = ev.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        const max = 400;
        if (width > height && width > max) { height = Math.round(height * max / width); width = max; }
        else if (height > max) { width = Math.round(width * max / height); height = max; }
        
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        updateStudent(activeStudentId, {
          photo: canvas.toDataURL('image/jpeg', 0.85),
          photoZoom: 100, photoX: 0, photoY: 0
        });
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <aside className="sidebar-panel">
      <div className="sidebar-tabs">
        <button className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab('list')}>
          <i className="fa-solid fa-users"></i> Records ({students.length})
        </button>
        <button className={`tab-btn ${activeTab === 'edit' ? 'active' : ''}`} onClick={() => setActiveTab('edit')}>
          <i className="fa-solid fa-pen-to-square"></i> Card Editor
        </button>
      </div>

      <div className={`tab-content ${activeTab === 'list' ? 'active' : ''}`}>
        <div className="search-bar-container">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search by name or scholar no..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        
        <div className="students-list">
          {students.length === 0 ? (
            <div className="empty-list-state">
              <i className="fa-solid fa-users-viewfinder"></i>
              <p>No student records added yet.</p>
              <button className="btn btn-secondary btn-sm" onClick={loadDemoData}>Load Sample Records</button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-list-state">
              <i className="fa-solid fa-magnifying-glass"></i>
              <p>No records match your search.</p>
            </div>
          ) : (
            filtered.map(student => (
              <div key={student.id} className={`student-list-item ${student.id === activeStudentId ? 'selected' : ''}`} onClick={() => setActiveStudentId(student.id)}>
                <div className="item-thumb-wrapper">
                  <img src={student.photo || DEFAULT_AVATAR_URL} alt="thumb" style={{ objectFit: 'cover' }} />
                </div>
                <div className="item-meta">
                  <h4>{student.name || 'UNNAMED'}</h4>
                  <p>Scholar: {student.scholarNo || 'N/A'} • Class: {student.class || 'N/A'}</p>
                </div>
                <div className="item-actions">
                  <button type="button" className="btn-action-small" title="Duplicate" onClick={(e) => { e.stopPropagation(); onDuplicate(student.id); }}>
                    <i className="fa-solid fa-copy"></i>
                  </button>
                  <button type="button" className="btn-action-small btn-delete-item" title="Delete" onClick={(e) => { e.stopPropagation(); onDelete(student.id); }}>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={`tab-content ${activeTab === 'edit' ? 'active' : ''}`}>
        {!activeStudent ? (
          <div className="editor-no-selected">
            <i className="fa-solid fa-arrow-left"></i>
            <p>Select a student card from Records to begin editing details.</p>
          </div>
        ) : (
          <div className="editor-container">
            <h3 className="editor-section-title">Edit Student Details</h3>
            <form onSubmit={e => e.preventDefault()}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={activeStudent.name || ''} onChange={e => updateStudent(activeStudent.id, { name: e.target.value })} placeholder="e.g. SOURABH KUSHWAHA" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Class</label>
                  <input type="text" value={activeStudent.class || ''} onChange={e => updateStudent(activeStudent.id, { class: e.target.value })} placeholder="e.g. NURSERY" />
                </div>
                <div className="form-group">
                  <label>Scholar No</label>
                  <input type="text" value={activeStudent.scholarNo || ''} onChange={e => updateStudent(activeStudent.id, { scholarNo: e.target.value })} placeholder="e.g. Simption101" />
                </div>
              </div>
              <div className="form-group">
                <label>Father's Name</label>
                <input type="text" value={activeStudent.fatherName || ''} onChange={e => updateStudent(activeStudent.id, { fatherName: e.target.value })} placeholder="e.g. RAJESH KUSHWAHA" />
              </div>
              <div className="form-group">
                <label>Contact Numbers</label>
                <input type="text" value={activeStudent.contactNo || ''} onChange={e => updateStudent(activeStudent.id, { contactNo: e.target.value })} placeholder="e.g. 9074822542" />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea rows="2" value={activeStudent.address || ''} onChange={e => updateStudent(activeStudent.id, { address: e.target.value })} placeholder="e.g. B-32- IT PARK, BHOPAL"></textarea>
              </div>
              
              <div className="form-group">
                <label>Student Photo</label>
                {!activeStudent.photo ? (
                  <div className="photo-upload-zone" onClick={() => document.getElementById('photo-input').click()}>
                    <input type="file" id="photo-input" accept="image/*" className="file-hidden" onChange={handlePhotoUpload} />
                    <div className="upload-icon-container"><i className="fa-solid fa-camera"></i></div>
                    <div className="upload-text">
                      <span className="upload-primary">Click to upload photo</span>
                    </div>
                  </div>
                ) : (
                  <div className="photo-adjustments-panel">
                    <div className="photo-preview-thumbnail">
                      <img src={activeStudent.photo} alt="Thumbnail" />
                      <button type="button" className="btn-clear-photo" onClick={() => updateStudent(activeStudent.id, { photo: '' })}><i className="fa-solid fa-xmark"></i></button>
                    </div>
                    <div className="slider-controls">
                      <div className="slider-control-row">
                        <span className="slider-label">Zoom</span>
                        <input type="range" min="10" max="300" value={activeStudent.photoZoom || 100} onChange={e => updateStudent(activeStudent.id, { photoZoom: parseInt(e.target.value) })} />
                      </div>
                      <div className="slider-control-row">
                        <span className="slider-label">Shift X</span>
                        <input type="range" min="-100" max="100" value={activeStudent.photoX || 0} onChange={e => updateStudent(activeStudent.id, { photoX: parseInt(e.target.value) })} />
                      </div>
                      <div className="slider-control-row">
                        <span className="slider-label">Shift Y</span>
                        <input type="range" min="-100" max="100" value={activeStudent.photoY || 0} onChange={e => updateStudent(activeStudent.id, { photoY: parseInt(e.target.value) })} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </aside>
  );
}

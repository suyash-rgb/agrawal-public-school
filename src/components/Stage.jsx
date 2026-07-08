import React from 'react';
import IDCard from './IDCard';
import PrintSheet from './PrintSheet';

export default function Stage({ students, activeStudentId, viewMode, setViewMode, sheetZoom, setSheetZoom, printSheetRef, setActiveStudentId }) {
  const activeStudent = students.find(s => s.id === activeStudentId);
  const activeIndex = students.findIndex(s => s.id === activeStudentId);

  const navigateCard = (dir) => {
    if (students.length === 0) return;
    let newIdx = activeIndex + dir;
    if (newIdx >= students.length) newIdx = 0;
    if (newIdx < 0) newIdx = students.length - 1;
    setActiveStudentId(students[newIdx].id);
  };

  return (
    <section className="stage-panel">
      <div className="stage-tabs">
        <div className="view-toggle-btns">
          <button className={`view-btn ${viewMode === 'single' ? 'active' : ''}`} onClick={() => setViewMode('single')}>
            <i className="fa-solid fa-id-card"></i> <span>Card Preview</span>
          </button>
          <button className={`view-btn ${viewMode === 'print' ? 'active' : ''}`} onClick={() => setViewMode('print')}>
            <i className="fa-solid fa-file-invoice"></i> <span>Print Sheet Layout</span>
          </button>
        </div>
        
        {viewMode === 'print' && (
          <div className="sheet-zoom-control">
            <span><i className="fa-solid fa-magnifying-glass-chart"></i> Zoom:</span>
            <input type="range" min="30" max="100" value={sheetZoom} onChange={e => setSheetZoom(parseInt(e.target.value))} />
            <span>{sheetZoom}%</span>
          </div>
        )}
      </div>
      
      <div className="stage-body">
        {viewMode === 'single' ? (
          <div className="single-card-view-mode active">
            <div className="single-card-wrapper">
              {activeStudent ? (
                <div style={{transform: 'scale(1.15)', transformOrigin: 'center'}}>
                  <IDCard student={activeStudent} />
                </div>
              ) : (
                <div className="empty-list-state" style={{backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', width: '300px', height: '200px'}}>
                  <i className="fa-solid fa-graduation-cap"></i>
                  <p>No cards available.</p>
                </div>
              )}
            </div>
            
            <div className="helper-navigation">
              <button className="btn btn-secondary btn-icon-round" onClick={() => navigateCard(-1)}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <span className="page-indicator-text">
                Card <strong>{students.length > 0 ? activeIndex + 1 : 0}</strong> of <strong>{students.length}</strong>
              </span>
              <button className="btn btn-secondary btn-icon-round" onClick={() => navigateCard(1)}>
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        ) : (
          <div className="print-sheet-view-mode active">
            <div className="print-sheet-scale-wrapper" style={{transform: `scale(${sheetZoom / 100})`, transformOrigin: 'center top'}}>
              <PrintSheet students={students} ref={printSheetRef} onSelectStudent={setActiveStudentId} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

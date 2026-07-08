import React, { forwardRef } from 'react';
import IDCard from './IDCard';

const PrintSheet = forwardRef(({ students, onSelectStudent }, ref) => {
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(students.length / pageSize));
  
  const pages = [];
  for (let p = 0; p < totalPages; p++) {
    const pageStudents = [];
    for (let i = 0; i < pageSize; i++) {
      const idx = p * pageSize + i;
      if (idx < students.length) {
        pageStudents.push(students[idx]);
      } else {
        pageStudents.push(null);
      }
    }
    pages.push(pageStudents);
  }

  return (
    <div className="print-sheet-pages-container" ref={ref}>
      {pages.map((page, pIdx) => (
        <div key={pIdx} className="a4-page-shadow-wrapper">
          <div className="page-number-banner">
            A4 Sheet Page {pIdx + 1} of {totalPages}
          </div>
          <div className="a4-landscape-page" id={`a4-page-index-${pIdx}`}>
            <div className="id-cards-grid">
              {page.map((student, sIdx) => (
                student ? (
                  <div key={student.id} onClick={() => onSelectStudent && onSelectStudent(student.id)} style={{cursor: 'pointer'}}>
                    <IDCard student={student} />
                  </div>
                ) : (
                  <div key={`empty-${sIdx}`} className="id-card empty-card-slot">
                    <div className="empty-slot-label">
                      <i className="fa-solid fa-border-none"></i>
                      <span>Empty Slot</span>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default PrintSheet;

import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import Sidebar from './components/Sidebar';
import Stage from './components/Stage';
import ExportSpinner from './components/ExportSpinner';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';

const DEMO_STUDENTS = [
  {
    id: "demo-1",
    name: "SOURABH KUSHWAHA",
    class: "NURSERY",
    scholarNo: "Simption101",
    fatherName: "RAJESH KUSHWAHA",
    contactNo: "9074822542, 9340188163",
    address: "B-32- IT PARK, BHOPAL",
    photo: "",
    photoZoom: 100, photoX: 0, photoY: 0
  },
  {
    id: "demo-2",
    name: "AMAN AGRAWAL",
    class: "XII-A",
    scholarNo: "APS-2024-405",
    fatherName: "S. K. AGRAWAL",
    contactNo: "9826032643, 9425334818",
    address: "12, SAKET NAGAR, DHAR (M.P.)",
    photo: "",
    photoZoom: 100, photoX: 0, photoY: 0
  },
  {
    id: "demo-3",
    name: "RIYA SHARMA",
    class: "X-B",
    scholarNo: "APS-2025-112",
    fatherName: "ANIL SHARMA",
    contactNo: "9988776655",
    address: "45, MAHATMA GANDHI ROAD, DHAR",
    photo: "",
    photoZoom: 100, photoX: 0, photoY: 0
  },
  {
    id: "demo-4",
    name: "PRIYANSHU PATEL",
    class: "V",
    scholarNo: "APS-2022-908",
    fatherName: "RAMESH PATEL",
    contactNo: "9111223344",
    address: "HARSH NAGAR, DHAR (M.P.)",
    photo: "",
    photoZoom: 100, photoX: 0, photoY: 0
  },
  {
    id: "demo-5",
    name: "ANANYA JOSHI",
    class: "VIII-C",
    scholarNo: "APS-2023-745",
    fatherName: "VIJAY JOSHI",
    contactNo: "9407112233",
    address: "89, VYAS COMPLEX, DHAR",
    photo: "",
    photoZoom: 100, photoX: 0, photoY: 0
  },
  {
    id: "demo-6",
    name: "ADITYA VERMA",
    class: "IX-A",
    scholarNo: "APS-2023-301",
    fatherName: "SUNIL VERMA",
    contactNo: "8877665544",
    address: "SECTOR-C, SCHEME 74, INDORE",
    photo: "",
    photoZoom: 100, photoX: 0, photoY: 0
  },
  {
    id: "demo-7",
    name: "SHREYA GUPTA",
    class: "IV-B",
    scholarNo: "APS-2025-067",
    fatherName: "SANJAY GUPTA",
    contactNo: "9755443322",
    address: "145, KESAR BAGH, DHAR",
    photo: "",
    photoZoom: 100, photoX: 0, photoY: 0
  },
  {
    id: "demo-8",
    name: "HARSH VARDHAN",
    class: "XII-B",
    scholarNo: "APS-2024-812",
    fatherName: "O. P. VARDHAN",
    contactNo: "7000123456",
    address: "VIDHYA NAGAR, DHAR (M.P.)",
    photo: "",
    photoZoom: 100, photoX: 0, photoY: 0
  },
  {
    id: "demo-9",
    name: "TANISHKA JAIN",
    class: "VI",
    scholarNo: "APS-2026-004",
    fatherName: "R. K. JAIN",
    contactNo: "9893098930",
    address: "JAIN TEMPLE ROAD, DHAR",
    photo: "",
    photoZoom: 100, photoX: 0, photoY: 0
  },
  {
    id: "demo-10",
    name: "ROHIT KUMAR",
    class: "XI-C",
    scholarNo: "APS-2024-210",
    fatherName: "DILIP KUMAR",
    contactNo: "9301234567",
    address: "21, NEHRU NAGAR, DHAR",
    photo: "",
    photoZoom: 100, photoX: 0, photoY: 0
  }
];

function App() {
  const [students, setStudents] = useState([]);
  const [activeStudentId, setActiveStudentId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [viewMode, setViewMode] = useState('single');
  const [theme, setTheme] = useState('light');
  const [sheetZoom, setSheetZoom] = useState(70);
  
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportText, setExportText] = useState('');
  
  const printSheetRef = useRef(null);

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [theme]);

  // Load state on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('aps_id_generator_students');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.length > 0) {
          setStudents(parsed);
          
          const storedSelected = localStorage.getItem('aps_id_generator_selected_ids');
          if (storedSelected) {
            setSelectedIds(JSON.parse(storedSelected));
          } else {
            setSelectedIds(parsed.map(s => s.id));
          }

          const storedActive = localStorage.getItem('aps_id_generator_active_id');
          if (storedActive && parsed.some(s => s.id === storedActive)) {
            setActiveStudentId(storedActive);
          } else {
            setActiveStudentId(parsed[0].id);
          }
          return;
        }
      }
      loadDemoData();
    } catch (e) {
      loadDemoData();
    }
  }, []);

  // Save state on changes
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('aps_id_generator_students', JSON.stringify(students));
      localStorage.setItem('aps_id_generator_selected_ids', JSON.stringify(selectedIds));
      if (activeStudentId) {
        localStorage.setItem('aps_id_generator_active_id', activeStudentId);
      }
    }
  }, [students, activeStudentId, selectedIds]);

  const loadDemoData = () => {
    const freshDemo = JSON.parse(JSON.stringify(DEMO_STUDENTS));
    setStudents(freshDemo);
    setSelectedIds(freshDemo.map(s => s.id));
    setActiveStudentId(freshDemo[0].id);
  };

  const updateStudent = (id, updates) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const addStudent = () => {
    const newId = 'student-' + Date.now();
    const newStudent = {
      id: newId,
      name: "NEW STUDENT",
      class: "CLASS",
      scholarNo: "SCHOLAR-" + Math.floor(1000 + Math.random() * 9000),
      fatherName: "FATHER'S NAME",
      contactNo: "CONTACT NUMBER",
      address: "ADDRESS DETAILS",
      photo: "",
      photoZoom: 100, photoX: 0, photoY: 0
    };
    setStudents([...students, newStudent]);
    setSelectedIds([...selectedIds, newId]);
    setActiveStudentId(newId);
  };

  const duplicateStudent = (id) => {
    const targetId = id || activeStudentId;
    if (!targetId) return;
    const active = students.find(s => s.id === targetId);
    if (!active) return;
    
    const duplicate = JSON.parse(JSON.stringify(active));
    duplicate.id = 'student-' + Date.now();
    duplicate.name += " (COPY)";
    duplicate.scholarNo += "-C";
    
    const idx = students.findIndex(s => s.id === targetId);
    const newStudents = [...students];
    newStudents.splice(idx + 1, 0, duplicate);
    
    setStudents(newStudents);
    setSelectedIds([...selectedIds, duplicate.id]);
    setActiveStudentId(duplicate.id);
  };

  const deleteStudent = (id) => {
    const targetId = id || activeStudentId;
    if (!targetId) return;
    
    const active = students.find(s => s.id === targetId);
    if (!active) return;
    
    if (confirm(`Are you sure you want to delete the record of "${active.name}"?`)) {
      const idx = students.findIndex(s => s.id === targetId);
      const newStudents = students.filter(s => s.id !== targetId);
      setStudents(newStudents);
      setSelectedIds(prev => prev.filter(x => x !== targetId));
      
      if (activeStudentId === targetId) {
        if (newStudents.length > 0) {
          const newIdx = Math.max(0, idx - 1);
          setActiveStudentId(newStudents[newIdx].id);
        } else {
          setActiveStudentId(null);
        }
      }
    }
  };

  const clearAllStudents = () => {
    if (confirm("Are you sure you want to clear all student records? This action cannot be undone.")) {
      setStudents([]);
      setSelectedIds([]);
      setActiveStudentId(null);
      localStorage.removeItem('aps_id_generator_students');
      localStorage.removeItem('aps_id_generator_selected_ids');
    }
  };

  const toggleSelectStudent = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === students.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(students.map(s => s.id));
    }
  };

  const exportPDF = async () => {
    const selectedStudents = students.filter(s => selectedIds.includes(s.id));
    if (selectedStudents.length === 0) {
      alert("No student cards are selected for export.");
      return;
    }
    
    setViewMode('print');
    setIsExporting(true);
    setExportProgress(0);
    setExportText('Preparing render engine...');
    
    // Temporarily force scale wrapper to 100% scale (none) so html2canvas renders exact dimensions
    const scaleWrapper = document.querySelector('.print-sheet-scale-wrapper');
    if (scaleWrapper) {
      scaleWrapper.style.transform = 'none';
    }
    
    try {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true
      });
      
      // Allow React DOM to reconcile and layout to settle
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const container = printSheetRef.current;
      if (!container) throw new Error("Could not find print sheet container");
      
      const pageElements = container.querySelectorAll('.a4-landscape-page');
      const totalPages = pageElements.length;
      
      for (let i = 0; i < totalPages; i++) {
        const pageEl = pageElements[i];
        
        const progressPercentage = Math.round((i / totalPages) * 100);
        setExportProgress(progressPercentage);
        setExportText(`Rendering page ${i + 1} of ${totalPages} (${progressPercentage}%)`);
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const canvas = await html2canvas(pageEl, {
          scale: 3,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          width: 1122.5,
          height: 793.7
        });
        
        const imgData = canvas.toDataURL('image/png');
        
        if (i > 0) doc.addPage();
        
        doc.addImage(imgData, 'PNG', 0, 0, 297, 210, undefined, 'FAST');
      }
      
      setExportProgress(100);
      setExportText('Finalizing document...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      doc.save('agrawal_public_school_id_cards.pdf');
    } catch (error) {
      console.error("PDF Export failed:", error);
      alert("An error occurred during PDF generation.");
    } finally {
      // Restore scale transform
      const scaleWrapper = document.querySelector('.print-sheet-scale-wrapper');
      if (scaleWrapper) {
        scaleWrapper.style.transform = `scale(${sheetZoom / 100})`;
      }
      setIsExporting(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-logo">
          <div className="logo-circle">
            <i className="fa-solid fa-address-card"></i>
          </div>
          <div className="header-title-group">
            <h1>Agrawal Public School</h1>
            <span>ID Card Generator Suite</span>
          </div>
        </div>
        
        <div className="toolbar-controls">
          <div className="control-group">
            <button className="btn btn-primary" onClick={addStudent}>
              <i className="fa-solid fa-plus"></i> <span>Add Card</span>
            </button>
            <button className="btn btn-secondary" onClick={() => duplicateStudent(activeStudentId)}>
              <i className="fa-solid fa-copy"></i> <span>Duplicate</span>
            </button>
            <button className="btn btn-danger" onClick={() => deleteStudent(activeStudentId)}>
              <i className="fa-solid fa-trash-can"></i> <span>Delete</span>
            </button>
          </div>
          <div className="control-divider"></div>
          <div className="control-group">
            <button className="btn btn-accent" onClick={loadDemoData}>
              <i className="fa-solid fa-database"></i> <span>Load Demo</span>
            </button>
            <button className="btn btn-warning" onClick={clearAllStudents}>
              <i className="fa-solid fa-eraser"></i> <span>Clear All</span>
            </button>
          </div>
          <div className="control-divider"></div>
          <div className="control-group">
            <button className="btn btn-success btn-large" onClick={exportPDF}>
              <i className="fa-solid fa-file-pdf"></i> <strong>Export PDF</strong>
            </button>
          </div>
          <div className="control-divider"></div>
          <div className="theme-toggle-container">
            <button className="btn btn-icon" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
              <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </div>
        </div>
      </header>
      
      <main className="workspace-main">
        <Sidebar 
          students={students} 
          activeStudentId={activeStudentId} 
          setActiveStudentId={setActiveStudentId}
          selectedIds={selectedIds}
          toggleSelectStudent={toggleSelectStudent}
          toggleSelectAll={toggleSelectAll}
          onAdd={addStudent}
          onDuplicate={duplicateStudent}
          onDelete={deleteStudent}
          updateStudent={updateStudent}
          loadDemoData={loadDemoData}
        />
        
        <Stage 
          students={students}
          activeStudentId={activeStudentId}
          setActiveStudentId={setActiveStudentId}
          selectedIds={selectedIds}
          viewMode={viewMode}
          setViewMode={setViewMode}
          sheetZoom={sheetZoom}
          setSheetZoom={setSheetZoom}
          printSheetRef={printSheetRef}
          updateStudent={updateStudent}
        />
      </main>
      
      <ExportSpinner isVisible={isExporting} progress={exportProgress} text={exportText} />
    </div>
  );
}

export default App;

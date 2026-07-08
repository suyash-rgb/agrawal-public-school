/* ==========================================================================
   AGRAWAL PUBLIC SCHOOL - ID CARD GENERATOR
   Core JS Application & State Controller
   ========================================================================== */

// --- Default SVG Graduation Avatar for Student Placeholders ---
const DEFAULT_AVATAR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" fill="none">
  <rect width="100" height="120" fill="#f8fafc"/>
  <circle cx="50" cy="45" r="20" fill="#cbd5e1"/>
  <path d="M 15 110 C 15 82, 85 82, 85 110 Z" fill="#cbd5e1"/>
  <path d="M 50 16 L 80 26 L 50 36 L 20 26 Z" fill="#475569"/>
  <rect x="48" y="26" width="4" height="12" fill="#475569"/>
  <path d="M 77 28 L 77 44 C 77 46, 80 46, 80 44 L 80 28 Z" fill="#f59e0b"/>
</svg>`;

const DEFAULT_AVATAR_URL = `data:image/svg+xml;utf8,${encodeURIComponent(DEFAULT_AVATAR_SVG)}`;

// --- Demo Student Records ---
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
    photoZoom: 100,
    photoX: 0,
    photoY: 0
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
    photoZoom: 100,
    photoX: 0,
    photoY: 0
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
    photoZoom: 100,
    photoX: 0,
    photoY: 0
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
    photoZoom: 100,
    photoX: 0,
    photoY: 0
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
    photoZoom: 100,
    photoX: 0,
    photoY: 0
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
    photoZoom: 100,
    photoX: 0,
    photoY: 0
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
    photoZoom: 100,
    photoX: 0,
    photoY: 0
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
    photoZoom: 100,
    photoX: 0,
    photoY: 0
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
    photoZoom: 100,
    photoX: 0,
    photoY: 0
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
    photoZoom: 100,
    photoX: 0,
    photoY: 0
  }
];

// --- Application Class ---
class IDGeneratorApp {
  constructor() {
    this.students = [];
    this.activeStudentId = null;
    this.currentViewMode = 'single'; // 'single' or 'print'
    this.searchQuery = '';
    
    this.initElements();
    this.initEventListeners();
    this.loadState();
    
    // If empty on start, load default sample data to display app aesthetics immediately
    if (this.students.length === 0) {
      this.loadDemoData();
    } else {
      this.render();
    }
  }

  // Bind DOM elements
  initElements() {
    // Toolbar buttons
    this.btnAddStudent = document.getElementById('btn-add-student');
    this.btnDuplicateStudent = document.getElementById('btn-duplicate-student');
    this.btnDeleteStudent = document.getElementById('btn-delete-student');
    this.btnLoadDemo = document.getElementById('btn-load-demo');
    this.btnClearAll = document.getElementById('btn-clear-all');
    this.btnExportPDF = document.getElementById('btn-export-pdf');
    this.btnThemeToggle = document.getElementById('btn-theme-toggle');
    
    // Sidebar Tabs
    this.tabBtns = document.querySelectorAll('.tab-btn');
    this.tabContents = document.querySelectorAll('.tab-content');
    this.tabEditTrigger = document.getElementById('tab-edit-trigger');
    
    // Search
    this.studentSearch = document.getElementById('student-search');
    this.studentsList = document.getElementById('students-list');
    this.recordCount = document.getElementById('record-count');
    
    // Form Inputs
    this.editorEmptyState = document.getElementById('editor-empty-state');
    this.editorActiveForm = document.getElementById('editor-active-form');
    this.form = document.getElementById('student-form');
    this.inputName = document.getElementById('student-name');
    this.inputClass = document.getElementById('student-class');
    this.inputScholarNo = document.getElementById('scholar-no');
    this.inputFatherName = document.getElementById('father-name');
    this.inputContactNo = document.getElementById('contact-no');
    this.inputAddress = document.getElementById('address');
    
    // Photo upload elements
    this.photoInput = document.getElementById('photo-input');
    this.photoUploadZone = document.getElementById('photo-upload-zone');
    this.photoAdjustments = document.getElementById('photo-adjustments');
    this.cropThumbnailImg = document.getElementById('crop-thumbnail-img');
    this.btnRemovePhoto = document.getElementById('btn-remove-photo');
    this.sliderZoom = document.getElementById('slider-zoom');
    this.sliderX = document.getElementById('slider-x');
    this.sliderY = document.getElementById('slider-y');
    this.valZoom = document.getElementById('val-zoom');
    this.valX = document.getElementById('val-x');
    this.valY = document.getElementById('val-y');
    
    // Stage view toggle
    this.viewSingleCard = document.getElementById('view-single-card');
    this.viewPrintSheet = document.getElementById('view-print-sheet');
    this.sheetZoomControlBar = document.getElementById('sheet-zoom-control-bar');
    this.sheetZoomSlider = document.getElementById('sheet-zoom-slider');
    this.sheetZoomVal = document.getElementById('sheet-zoom-val');
    
    // Stage Viewports
    this.singleCardViewport = document.getElementById('single-card-viewport');
    this.printSheetViewport = document.getElementById('print-sheet-viewport');
    this.singleCardContainer = document.getElementById('single-card-container');
    this.printSheetScaleWrapper = document.getElementById('print-sheet-scale-wrapper');
    this.printSheetPagesContainer = document.getElementById('print-sheet-pages-container');
    
    // Single Card Navigation helpers
    this.btnPrevCard = document.getElementById('btn-prev-card');
    this.btnNextCard = document.getElementById('btn-next-card');
    this.currentCardNum = document.getElementById('current-card-num');
    this.totalCardNum = document.getElementById('total-card-num');
    this.btnQuickDemo = document.getElementById('btn-quick-demo');
    
    // Template source
    this.cardTemplateSource = document.getElementById('card-template-html');
    
    // Export Spinner Busy Overlay
    this.exportSpinner = document.getElementById('export-spinner');
    this.exportProgress = document.getElementById('export-progress');
    this.exportProgressText = document.getElementById('export-progress-text');
  }

  // Setup event listeners
  initEventListeners() {
    // Toolbar commands
    this.btnAddStudent.addEventListener('click', () => this.addNewStudent());
    this.btnDuplicateStudent.addEventListener('click', () => this.duplicateStudent());
    this.btnDeleteStudent.addEventListener('click', () => this.deleteStudent());
    this.btnLoadDemo.addEventListener('click', () => this.loadDemoData());
    this.btnClearAll.addEventListener('click', () => this.clearAllStudents());
    this.btnExportPDF.addEventListener('click', () => this.exportPDF());
    this.btnThemeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Sidebar Tabs switching
    this.tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetTab = btn.getAttribute('data-tab');
        this.switchTab(targetTab);
      });
    });
    
    // Search filter
    this.studentSearch.addEventListener('input', (e) => {
      this.searchQuery = e.target.value;
      this.renderList();
    });
    
    // Quick demo button
    if (this.btnQuickDemo) {
      this.btnQuickDemo.addEventListener('click', () => this.loadDemoData());
    }
    
    // Live editing form synchronization
    const inputs = [this.inputName, this.inputClass, this.inputScholarNo, this.inputFatherName, this.inputContactNo, this.inputAddress];
    inputs.forEach(input => {
      input.addEventListener('input', () => this.syncFormToActiveStudent());
    });
    
    // Photo Upload Click and drag & drop
    this.photoUploadZone.addEventListener('click', () => this.photoInput.click());
    this.photoInput.addEventListener('change', (e) => this.handlePhotoUpload(e));
    
    this.photoUploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.photoUploadZone.style.borderColor = 'var(--accent-color)';
    });
    
    this.photoUploadZone.addEventListener('dragleave', () => {
      this.photoUploadZone.style.borderColor = 'var(--border-color)';
    });
    
    this.photoUploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      this.photoUploadZone.style.borderColor = 'var(--border-color)';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        this.processUploadedFile(e.dataTransfer.files[0]);
      }
    });
    
    // Photo Adjustment Sliders
    this.sliderZoom.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      this.valZoom.textContent = val + '%';
      this.updateActiveStudentPhotoAdjustment();
    });
    
    this.sliderX.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      this.valX.textContent = val + 'px';
      this.updateActiveStudentPhotoAdjustment();
    });
    
    this.sliderY.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      this.valY.textContent = val + 'px';
      this.updateActiveStudentPhotoAdjustment();
    });
    
    this.btnRemovePhoto.addEventListener('click', () => this.removePhotoFromActiveStudent());
    
    // View mode switching
    this.viewSingleCard.addEventListener('click', () => this.setViewMode('single'));
    this.viewPrintSheet.addEventListener('click', () => this.setViewMode('print'));
    
    // Sheet zoom control
    this.sheetZoomSlider.addEventListener('input', () => this.updateSheetZoom());
    
    // Helper Navigation
    this.btnPrevCard.addEventListener('click', () => this.navigateActiveCard(-1));
    this.btnNextCard.addEventListener('click', () => this.navigateActiveCard(1));
  }

  // Switch between tabs: Records and Card Editor
  switchTab(tabId) {
    this.tabBtns.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    this.tabContents.forEach(content => {
      if (content.id === tabId) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });
  }

  // Toggle editor light/dark theme
  toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme', !isDark);
    
    // Change theme icon
    const icon = this.btnThemeToggle.querySelector('i');
    if (isDark) {
      icon.className = 'fa-solid fa-sun';
      this.btnThemeToggle.title = 'Switch to Light Mode';
    } else {
      icon.className = 'fa-solid fa-moon';
      this.btnThemeToggle.title = 'Switch to Dark Mode';
    }
  }

  // Change view mode between single card editor and A4 sheets grid
  setViewMode(mode) {
    this.currentViewMode = mode;
    
    if (mode === 'single') {
      this.viewSingleCard.classList.add('active');
      this.viewPrintSheet.classList.remove('active');
      this.singleCardViewport.classList.add('active');
      this.printSheetViewport.classList.remove('active');
      this.sheetZoomControlBar.classList.add('hidden');
    } else {
      this.viewSingleCard.classList.remove('active');
      this.viewPrintSheet.classList.add('active');
      this.singleCardViewport.classList.remove('active');
      this.printSheetViewport.classList.add('active');
      this.sheetZoomControlBar.classList.remove('hidden');
      
      // Delay slightly to ensure element rendering is ready before zoom calculations
      setTimeout(() => this.updateSheetZoom(), 50);
    }
  }

  // Update zoom scale on A4 sheets preview
  updateSheetZoom() {
    const zoomVal = this.sheetZoomSlider.value;
    this.sheetZoomVal.textContent = zoomVal + '%';
    const scale = zoomVal / 100;
    
    // Scale A4 sheet wrapper
    this.printSheetScaleWrapper.style.transform = `scale(${scale})`;
    this.printSheetScaleWrapper.style.transformOrigin = 'center top';
    
    // Adjust container height to scroll smoothly
    const pagesContainerHeight = this.printSheetPagesContainer.offsetHeight;
    this.printSheetScaleWrapper.style.height = `${pagesContainerHeight * scale}px`;
  }

  // Load state from localStorage if available
  loadState() {
    try {
      const stored = localStorage.getItem('aps_id_generator_students');
      if (stored) {
        this.students = JSON.parse(stored);
        
        const storedActive = localStorage.getItem('aps_id_generator_active_id');
        if (storedActive && this.students.some(s => s.id === storedActive)) {
          this.activeStudentId = storedActive;
        } else if (this.students.length > 0) {
          this.activeStudentId = this.students[0].id;
        }
      }
    } catch (e) {
      console.warn("Failed to load local state:", e);
    }
  }

  // Save state to localStorage (Frontend-only local cache)
  saveState() {
    try {
      localStorage.setItem('aps_id_generator_students', JSON.stringify(this.students));
      if (this.activeStudentId) {
        localStorage.setItem('aps_id_generator_active_id', this.activeStudentId);
      } else {
        localStorage.removeItem('aps_id_generator_active_id');
      }
    } catch (e) {
      console.warn("Failed to save local state:", e);
    }
  }

  // Reset database of student records
  clearAllStudents() {
    if (confirm("Are you sure you want to clear all student records? This action cannot be undone.")) {
      this.students = [];
      this.activeStudentId = null;
      this.saveState();
      this.render();
      this.switchTab('students-list-tab');
    }
  }

  // Generate and load mock school data
  loadDemoData() {
    // Deep clone demo records to avoid references
    this.students = JSON.parse(JSON.stringify(DEMO_STUDENTS));
    this.activeStudentId = this.students[0].id;
    this.saveState();
    this.render();
  }

  // Select a student record
  selectStudent(id) {
    this.activeStudentId = id;
    this.saveState();
    this.renderForm();
    this.renderActiveSingleCard();
    this.renderList();
    this.updateCardNavText();
  }

  // Create new student
  addNewStudent() {
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
      photoZoom: 100,
      photoX: 0,
      photoY: 0
    };
    
    this.students.push(newStudent);
    this.activeStudentId = newId;
    
    this.saveState();
    this.render();
    
    // Switch directly to Editor tab for immediate entry
    this.switchTab('edit-card-tab');
    
    // Scroll active item into view
    setTimeout(() => {
      const activeEl = this.studentsList.querySelector('.student-list-item.selected');
      if (activeEl) activeEl.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  // Duplicate current selected student
  duplicateStudent() {
    if (!this.activeStudentId) return;
    
    const active = this.students.find(s => s.id === this.activeStudentId);
    if (!active) return;
    
    const duplicate = JSON.parse(JSON.stringify(active));
    duplicate.id = 'student-' + Date.now();
    duplicate.name += " (COPY)";
    duplicate.scholarNo += "-C";
    
    const idx = this.students.findIndex(s => s.id === this.activeStudentId);
    this.students.splice(idx + 1, 0, duplicate);
    this.activeStudentId = duplicate.id;
    
    this.saveState();
    this.render();
  }

  // Delete current selected student
  deleteStudent(id = null) {
    const targetId = id || this.activeStudentId;
    if (!targetId) return;
    
    const active = this.students.find(s => s.id === targetId);
    if (!active) return;
    
    if (confirm(`Are you sure you want to delete the record of "${active.name}"?`)) {
      const idx = this.students.findIndex(s => s.id === targetId);
      this.students.splice(idx, 1);
      
      // If we deleted the active student, select another
      if (this.activeStudentId === targetId) {
        if (this.students.length > 0) {
          // Select neighbor student
          const newIdx = Math.max(0, idx - 1);
          this.activeStudentId = this.students[newIdx].id;
        } else {
          this.activeStudentId = null;
        }
      }
      
      this.saveState();
      this.render();
      
      if (!this.activeStudentId) {
        this.switchTab('students-list-tab');
      }
    }
  }

  // Navigate between cards using chevron buttons in Single Card mode
  navigateActiveCard(dir) {
    if (this.students.length === 0) return;
    
    const currentIdx = this.students.findIndex(s => s.id === this.activeStudentId);
    if (currentIdx === -1) return;
    
    let newIdx = currentIdx + dir;
    if (newIdx >= this.students.length) newIdx = 0;
    if (newIdx < 0) newIdx = this.students.length - 1;
    
    this.selectStudent(this.students[newIdx].id);
  }

  // Render both List sidebar, Editor Form, Single Preview and Grid Preview Sheets
  render() {
    this.renderList();
    this.renderForm();
    this.renderActiveSingleCard();
    this.renderPrintSheets();
    this.updateCardNavText();
  }

  // Render sidebar list
  renderList() {
    this.studentsList.innerHTML = '';
    this.recordCount.textContent = this.students.length;
    
    if (this.students.length === 0) {
      this.studentsList.innerHTML = `
        <div class="empty-list-state">
          <i class="fa-solid fa-users-viewfinder"></i>
          <p>No student records added yet.</p>
          <button id="btn-quick-demo-inner" class="btn btn-secondary btn-sm">Load Sample Records</button>
        </div>
      `;
      document.getElementById('btn-quick-demo-inner').addEventListener('click', () => this.loadDemoData());
      return;
    }
    
    // Filter by search query
    const search = this.searchQuery.toLowerCase().trim();
    const filtered = this.students.filter(student => {
      return student.name.toLowerCase().includes(search) || 
             student.scholarNo.toLowerCase().includes(search) ||
             student.class.toLowerCase().includes(search);
    });
    
    if (filtered.length === 0) {
      this.studentsList.innerHTML = `
        <div class="empty-list-state">
          <i class="fa-solid fa-magnifying-glass"></i>
          <p>No records match your search query.</p>
        </div>
      `;
      return;
    }
    
    filtered.forEach(student => {
      const isSelected = student.id === this.activeStudentId;
      const item = document.createElement('div');
      item.className = `student-list-item ${isSelected ? 'selected' : ''}`;
      
      const photoSrc = student.photo || DEFAULT_AVATAR_URL;
      
      item.innerHTML = `
        <div class="item-thumb-wrapper">
          <img src="${photoSrc}" alt="thumb" style="${this.getPhotoTransformStyle(student, true)}">
        </div>
        <div class="item-meta">
          <h4>${student.name || 'UNNAMED STUDENT'}</h4>
          <p>Scholar: ${student.scholarNo || 'N/A'} • Class: ${student.class || 'N/A'}</p>
        </div>
        <div class="item-actions">
          <button type="button" class="btn-action-small btn-duplicate-item" title="Duplicate Student">
            <i class="fa-solid fa-copy"></i>
          </button>
          <button type="button" class="btn-action-small btn-delete-item" title="Delete Student">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `;
      
      // Select item on clicking content
      item.addEventListener('click', (e) => {
        // Prevent trigger if action buttons are clicked
        if (e.target.closest('.btn-action-small')) return;
        this.selectStudent(student.id);
      });
      
      // Duplication action listener
      item.querySelector('.btn-duplicate-item').addEventListener('click', (e) => {
        e.stopPropagation();
        this.activeStudentId = student.id;
        this.duplicateStudent();
      });
      
      // Deletion action listener
      item.querySelector('.btn-delete-item').addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteStudent(student.id);
      });
      
      this.studentsList.appendChild(item);
    });
  }

  // Populate editor fields
  renderForm() {
    if (!this.activeStudentId || this.students.length === 0) {
      this.editorEmptyState.classList.remove('hidden');
      this.editorActiveForm.classList.add('hidden');
      return;
    }
    
    const active = this.students.find(s => s.id === this.activeStudentId);
    if (!active) return;
    
    this.editorEmptyState.classList.add('hidden');
    this.editorActiveForm.classList.remove('hidden');
    
    // Fill fields
    this.inputName.value = active.name || '';
    this.inputClass.value = active.class || '';
    this.inputScholarNo.value = active.scholarNo || '';
    this.inputFatherName = active.fatherName || '';
    this.inputContactNo.value = active.contactNo || '';
    this.inputAddress.value = active.address || '';
    
    // Photo adjustment panel toggling
    if (active.photo) {
      this.photoUploadZone.classList.add('hidden');
      this.photoAdjustments.classList.remove('hidden');
      this.cropThumbnailImg.src = active.photo;
      
      // Set adjustment sliders
      this.sliderZoom.value = active.photoZoom || 100;
      this.sliderX.value = active.photoX || 0;
      this.sliderY.value = active.photoY || 0;
      
      this.valZoom.textContent = (active.photoZoom || 100) + '%';
      this.valX.textContent = (active.photoX || 0) + 'px';
      this.valY.textContent = (active.photoY || 0) + 'px';
    } else {
      this.photoUploadZone.classList.remove('hidden');
      this.photoAdjustments.classList.add('hidden');
      this.photoInput.value = ''; // Reset file input value
    }
  }

  // Update Single Card View
  renderActiveSingleCard() {
    this.singleCardContainer.innerHTML = '';
    
    if (this.students.length === 0 || !this.activeStudentId) {
      this.singleCardContainer.innerHTML = `
        <div class="empty-list-state" style="background-color: var(--bg-secondary); border-radius:12px; width:300px; height:200px;">
          <i class="fa-solid fa-graduation-cap"></i>
          <p>No cards available.</p>
        </div>
      `;
      return;
    }
    
    const active = this.students.find(s => s.id === this.activeStudentId);
    if (!active) return;
    
    const cardEl = this.createCardDOMElement(active);
    this.singleCardContainer.appendChild(cardEl);
  }

  // Render Print grid sheet layout
  renderPrintSheets() {
    this.printSheetPagesContainer.innerHTML = '';
    
    if (this.students.length === 0) {
      this.printSheetPagesContainer.innerHTML = `
        <div class="empty-list-state" style="background-color: var(--bg-secondary); border-radius:12px; padding: 60px;">
          <i class="fa-solid fa-file-invoice"></i>
          <p>No records to build print sheets.</p>
        </div>
      `;
      return;
    }
    
    // Group students in blocks of 10
    const pageSize = 10;
    const totalPages = Math.max(1, Math.ceil(this.students.length / pageSize));
    
    for (let p = 0; p < totalPages; p++) {
      const pageWrapper = document.createElement('div');
      pageWrapper.className = 'a4-page-shadow-wrapper';
      
      // Page number label (visible only on screen)
      const pageBanner = document.createElement('div');
      pageBanner.className = 'page-number-banner';
      pageBanner.textContent = `A4 Sheet Page ${p + 1} of ${totalPages}`;
      pageWrapper.appendChild(pageBanner);
      
      // Core Landscape A4 Page Element
      const pageA4 = document.createElement('div');
      pageA4.className = 'a4-landscape-page';
      pageA4.id = `a4-page-index-${p}`;
      
      // Grid container (2x5)
      const cardsGrid = document.createElement('div');
      cardsGrid.className = 'id-cards-grid';
      
      const startIndex = p * pageSize;
      for (let i = 0; i < pageSize; i++) {
        const studentIndex = startIndex + i;
        
        if (studentIndex < this.students.length) {
          const student = this.students[studentIndex];
          const cardEl = this.createCardDOMElement(student);
          
          // Selection logic inside grid sheet click
          cardEl.addEventListener('click', () => {
            this.selectStudent(student.id);
            // Flash color accent or highlight
            cardEl.style.outline = '1.5mm solid var(--accent-color)';
            setTimeout(() => cardEl.style.outline = 'none', 300);
          });
          
          cardsGrid.appendChild(cardEl);
        } else {
          // Render dashed empty slot helper cards to fill page boundary structure
          const emptySlot = document.createElement('div');
          emptySlot.className = 'id-card empty-card-slot';
          emptySlot.innerHTML = `
            <div class="empty-slot-label">
              <i class="fa-solid fa-border-none"></i>
              <span>Empty Slot</span>
            </div>
          `;
          cardsGrid.appendChild(emptySlot);
        }
      }
      
      pageA4.appendChild(cardsGrid);
      pageWrapper.appendChild(pageA4);
      this.printSheetPagesContainer.appendChild(pageWrapper);
    }
  }

  // Create Card Element dynamically based on card template
  createCardDOMElement(student) {
    const templateContent = this.cardTemplateSource.innerHTML;
    const cardOuter = document.createElement('div');
    cardOuter.className = 'id-card';
    cardOuter.dataset.id = student.id;
    cardOuter.innerHTML = templateContent;
    
    // Bind field values
    cardOuter.querySelector('.student-name-display').textContent = student.name ? student.name.toUpperCase() : 'STUDENT NAME';
    cardOuter.querySelector('.field-class-val').textContent = student.class ? student.class.toUpperCase() : 'CLASS';
    cardOuter.querySelector('.field-scholar-val').textContent = student.scholarNo || 'SCHOLAR NO';
    cardOuter.querySelector('.field-father-val').textContent = student.fatherName ? student.fatherName.toUpperCase() : "FATHER'S NAME";
    cardOuter.querySelector('.field-contact-val').textContent = student.contactNo || 'CONTACT NO';
    cardOuter.querySelector('.field-address-val').textContent = student.address ? student.address.toUpperCase() : 'ADDRESS';
    
    // Photo processing
    const imgEl = cardOuter.querySelector('.img-render-photo');
    const placeholderEl = cardOuter.querySelector('.photo-placeholder-graphic');
    
    if (student.photo) {
      imgEl.src = student.photo;
      imgEl.className = 'img-render-photo'; // Remove hidden
      placeholderEl.className = 'photo-placeholder-graphic hidden';
      
      // Apply offset/scale adjustments
      imgEl.style.transform = this.getPhotoTransformStyle(student);
    } else {
      imgEl.className = 'img-render-photo hidden';
      placeholderEl.className = 'photo-placeholder-graphic';
    }
    
    return cardOuter;
  }

  // Helper method to compute image CSS transforms
  getPhotoTransformStyle(student, isThumbnail = false) {
    if (isThumbnail) {
      // Small sidebar item preview scaling
      return `transform: none; object-fit: cover;`;
    }
    
    const scale = (student.photoZoom || 100) / 100;
    const tx = student.photoX || 0;
    const ty = student.photoY || 0;
    
    // Apply responsive transformations (scaled to fit millimeter photo frame wrapper)
    return `transform: translate(${tx / 5}mm, ${ty / 5}mm) scale(${scale});`;
  }

  // Live synchronizing editing text fields
  syncFormToActiveStudent() {
    if (!this.activeStudentId) return;
    
    const active = this.students.find(s => s.id === this.activeStudentId);
    if (!active) return;
    
    // Read from inputs
    active.name = this.inputName.value;
    active.class = this.inputClass.value;
    active.scholarNo = this.inputScholarNo.value;
    active.fatherName = this.inputFatherName.value;
    active.contactNo = this.inputContactNo.value;
    active.address = this.inputAddress.value;
    
    this.saveState();
    
    // Live-update specific text cells inside DOM previews without fully rebuilding layout
    const activeCardPreviews = document.querySelectorAll(`.id-card[data-id="${active.id}"]`);
    activeCardPreviews.forEach(card => {
      card.querySelector('.student-name-display').textContent = active.name ? active.name.toUpperCase() : 'STUDENT NAME';
      card.querySelector('.field-class-val').textContent = active.class ? active.class.toUpperCase() : 'CLASS';
      card.querySelector('.field-scholar-val').textContent = active.scholarNo || 'SCHOLAR NO';
      card.querySelector('.field-father-val').textContent = active.fatherName ? active.fatherName.toUpperCase() : "FATHER'S NAME";
      card.querySelector('.field-contact-val').textContent = active.contactNo || 'CONTACT NO';
      card.querySelector('.field-address-val').textContent = active.address ? active.address.toUpperCase() : 'ADDRESS';
    });
    
    // Live update items in sidebar list
    const listItemMeta = document.querySelector(`.student-list-item.selected .item-meta`);
    if (listItemMeta) {
      listItemMeta.querySelector('h4').textContent = active.name || 'UNNAMED STUDENT';
      listItemMeta.querySelector('p').textContent = `Scholar: ${active.scholarNo || 'N/A'} • Class: ${active.class || 'N/A'}`;
    }
  }

  // Update Photo scale and shift in state
  updateActiveStudentPhotoAdjustment() {
    if (!this.activeStudentId) return;
    
    const active = this.students.find(s => s.id === this.activeStudentId);
    if (!active) return;
    
    active.photoZoom = parseInt(this.sliderZoom.value);
    active.photoX = parseInt(this.sliderX.value);
    active.photoY = parseInt(this.sliderY.value);
    
    this.saveState();
    
    // Apply inline transformations to the DOM preview cards instantly
    const activeCardPreviews = document.querySelectorAll(`.id-card[data-id="${active.id}"]`);
    activeCardPreviews.forEach(card => {
      const img = card.querySelector('.img-render-photo');
      if (img) {
        img.style.transform = this.getPhotoTransformStyle(active);
      }
    });
  }

  // File handling routines
  handlePhotoUpload(event) {
    if (event.target.files && event.target.files[0]) {
      this.processUploadedFile(event.target.files[0]);
    }
  }

  processUploadedFile(file) {
    if (!this.activeStudentId) return;
    
    const active = this.students.find(s => s.id === this.activeStudentId);
    if (!active) return;
    
    // Ensure image file validation
    if (!file.type.match('image.*')) {
      alert("Invalid format. Please select an image file.");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      // Compress and resize the uploaded photo before saving to keep state light in localStorage
      this.resizeAndCompressImage(e.target.result, 400, 500, (resizedBase64) => {
        active.photo = resizedBase64;
        active.photoZoom = 100;
        active.photoX = 0;
        active.photoY = 0;
        
        this.saveState();
        this.render();
      });
    };
    reader.readAsDataURL(file);
  }

  // Compress images inside client browser dynamically to optimize payload
  resizeAndCompressImage(base64Str, maxWidth, maxHeight, callback) {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      
      // Calculate scaling bounds
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      // Export as compressed JPEG
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
      callback(compressedDataUrl);
    };
  }

  // Remove photo base64
  removePhotoFromActiveStudent() {
    if (!this.activeStudentId) return;
    
    const active = this.students.find(s => s.id === this.activeStudentId);
    if (!active) return;
    
    if (confirm("Are you sure you want to remove the photo?")) {
      active.photo = "";
      active.photoZoom = 100;
      active.photoX = 0;
      active.photoY = 0;
      
      this.saveState();
      this.render();
    }
  }

  // Update card chevron navigation texts
  updateCardNavText() {
    if (this.students.length === 0) {
      this.currentCardNum.textContent = '0';
      this.totalCardNum.textContent = '0';
      return;
    }
    
    const currentIdx = this.students.findIndex(s => s.id === this.activeStudentId);
    this.currentCardNum.textContent = (currentIdx + 1).toString();
    this.totalCardNum.textContent = this.students.length.toString();
  }

  // ==========================================================================
  // HIGH-RESOLUTION PDF GENERATION ENGINE
  // Uses html2canvas + jsPDF with multi-page segmentation & layout preservation
  // ==========================================================================
  async exportPDF() {
    if (this.students.length === 0) {
      alert("No student records available to export. Please load demo data or add cards first.");
      return;
    }
    
    // Switch to Print View Mode to guarantee DOM items are visible for DOM parsing
    this.setViewMode('print');
    
    // Show spinner overlay
    this.exportSpinner.classList.remove('hidden');
    this.exportProgress.style.width = '0%';
    this.exportProgressText.textContent = 'Preparing render engine...';
    
    try {
      const { jsPDF } = window.jspdf;
      
      // Target landscape PDF coordinates: A4 Landscape Page (297mm x 210mm)
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true
      });
      
      // Select all renderable page nodes
      const pageElements = this.printSheetPagesContainer.querySelectorAll('.a4-landscape-page');
      const totalPages = pageElements.length;
      
      for (let i = 0; i < totalPages; i++) {
        const pageEl = pageElements[i];
        
        // Update progress overlay
        const progressPercentage = Math.round(((i) / totalPages) * 100);
        this.exportProgress.style.width = `${progressPercentage}%`;
        this.exportProgressText.textContent = `Rendering page ${i + 1} of ${totalPages} (${progressPercentage}%)`;
        
        // Brief timeout to yield execution thread for UI browser updates
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Render target page node to high-res canvas (scale: 3 for high DPI print quality)
        const canvas = await html2canvas(pageEl, {
          scale: 3,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          width: 1122.5, // 297mm in pixels at 96 DPI
          height: 793.7  // 210mm in pixels at 96 DPI
        });
        
        const imgData = canvas.toDataURL('image/png');
        
        // If subsequent page, append new page sheet to PDF document first
        if (i > 0) {
          doc.addPage();
        }
        
        // Draw the image exactly matching the A4 millimeter page boundaries
        doc.addImage(imgData, 'PNG', 0, 0, 297, 210, undefined, 'FAST');
      }
      
      // Success completion updates
      this.exportProgress.style.width = '100%';
      this.exportProgressText.textContent = 'Finalizing document...';
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Save output
      doc.save('agrawal_public_school_id_cards.pdf');
      
    } catch (error) {
      console.error("PDF Export encountered a problem:", error);
      alert("An error occurred during PDF generation. Please try again. Detailed details in browser log.");
    } finally {
      // Hide spinner overlay
      this.exportSpinner.classList.add('hidden');
    }
  }
}

// --- Initialize App ---
document.addEventListener('DOMContentLoaded', () => {
  window.appInstance = new IDGeneratorApp();
});

import React, { useState, useEffect } from 'react';

export default function PhotoModal({ isOpen, onClose, student, onSave }) {
  if (!isOpen || !student) return null;

  const [zoom, setZoom] = useState(100);
  const [shiftX, setShiftX] = useState(0);
  const [shiftY, setShiftY] = useState(0);

  // Sync state with student data when modal opens
  useEffect(() => {
    if (student) {
      setZoom(student.photoZoom || 100);
      setShiftX(student.photoX || 0);
      setShiftY(student.photoY || 0);
    }
  }, [student, isOpen]);

  const handleSave = () => {
    onSave(student.id, {
      photoZoom: zoom,
      photoX: shiftX,
      photoY: shiftY
    });
    onClose();
  };

  const handleReset = () => {
    setZoom(100);
    setShiftX(0);
    setShiftY(0);
  };

  // Convert pixels to match visual scale
  const previewStyle = {
    transform: `translate(${shiftX / 5}mm, ${shiftY / 5}mm) scale(${zoom / 100})`,
    objectFit: 'cover'
  };

  return (
    <div className="photo-modal-overlay" onClick={onClose}>
      <div className="photo-modal-card" onClick={e => e.stopPropagation()}>
        <div className="photo-modal-header">
          <h3><i className="fa-solid fa-crop-simple"></i> Adjust Photo Alignment</h3>
          <button className="btn-close-modal" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className="photo-modal-body">
          <div className="photo-modal-preview-section">
            <span className="section-label">Live Frame Preview</span>
            <div className="modal-photo-frame-outer">
              <div className="modal-photo-frame-inner">
                {student.photo ? (
                  <img src={student.photo} alt="Preview" style={previewStyle} />
                ) : (
                  <div className="photo-placeholder-graphic">
                    <i className="fa-solid fa-user-graduate"></i>
                    <span>NO PHOTO</span>
                  </div>
                )}
              </div>
            </div>
            <p className="preview-tip">Adjust the photo using the controls below to fit perfectly inside the card frame.</p>
          </div>
          
          <div className="photo-modal-controls-section">
            <div className="modal-slider-group">
              <div className="slider-header">
                <label><i className="fa-solid fa-magnifying-glass-plus"></i> Photo Zoom</label>
                <span className="slider-value">{zoom}%</span>
              </div>
              <input type="range" min="10" max="350" value={zoom} onChange={e => setZoom(parseInt(e.target.value))} />
            </div>

            <div className="modal-slider-group">
              <div className="slider-header">
                <label><i className="fa-solid fa-arrows-left-right"></i> Horizontal Pan (X)</label>
                <span className="slider-value">{shiftX}px</span>
              </div>
              <input type="range" min="-150" max="150" value={shiftX} onChange={e => setShiftX(parseInt(e.target.value))} />
            </div>

            <div className="modal-slider-group">
              <div className="slider-header">
                <label><i className="fa-solid fa-arrows-up-down"></i> Vertical Pan (Y)</label>
                <span className="slider-value">{shiftY}px</span>
              </div>
              <input type="range" min="-150" max="150" value={shiftY} onChange={e => setShiftY(parseInt(e.target.value))} />
            </div>
          </div>
        </div>
        
        <div className="photo-modal-footer">
          <button className="btn btn-secondary" onClick={handleReset}>
            <i className="fa-solid fa-rotate-left"></i> Reset
          </button>
          <div className="footer-right-btns">
            <button className="btn btn-warning" onClick={onClose}>Cancel</button>
            <button className="btn btn-success" onClick={handleSave} disabled={!student.photo}>
              <i className="fa-solid fa-check"></i> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

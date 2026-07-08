import React from 'react';

export default function IDCard({ student, isThumbnail = false }) {
  if (!student) return null;

  const photoTransform = isThumbnail
    ? { transform: 'none', objectFit: 'cover' }
    : {
        transform: `translate(${(student.photoX || 0) / 5}mm, ${(student.photoY || 0) / 5}mm) scale(${(student.photoZoom || 100) / 100})`,
        objectFit: 'cover'
      };

  return (
    <div className="id-card" data-id={student.id}>
      <div className="id-card-inner">
        <div className="card-decor-top-left-red"></div>
        <div className="card-decor-top-left-blue"></div>
        
        <div className="card-header-sec">
          <div className="logo-box">
            <img src="/assets/school_logo.svg" alt="Logo" className="logo-img" />
          </div>
          <div className="header-text-box">
            <h2 className="school-name">AGRAWAL</h2>
            <h3 className="school-subtitle-dhar">PUBLIC SCHOOL, DHAR</h3>
            <div className="title-underline"></div>
            <p className="school-address-text">145 PRAKASH NAGAR DHAR MP</p>
          </div>
        </div>
        
        <div className="card-background-watermark"></div>
        
        <div className="student-photo-block">
          <div className="photo-frame-inner">
            {student.photo ? (
              <img src={student.photo} alt="Student" className="img-render-photo" style={photoTransform} />
            ) : (
              <div className="photo-placeholder-graphic">
                <i className="fa-solid fa-user-graduate"></i>
                <span>NO PHOTO</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="student-name-ribbon">
          <div className="diagonal-accent left-accent"></div>
          <div className="diagonal-accent right-accent"></div>
          <div className="student-name-display">{student.name ? student.name.toUpperCase() : 'STUDENT NAME'}</div>
        </div>
        
        <div className="student-details-grid">
          <div className="decor-red-pill-right"></div>
          
          <div className="detail-item">
            <div className="item-label">Class</div>
            <div className="item-colon">:</div>
            <div className="item-val">{student.class ? student.class.toUpperCase() : 'CLASS'}</div>
          </div>
          
          <div className="detail-item">
            <div className="item-label">Scholar No</div>
            <div className="item-colon">:</div>
            <div className="item-val">{student.scholarNo || 'SCHOLAR NO'}</div>
          </div>
          
          <div className="detail-item">
            <div className="item-label">Father's Name</div>
            <div className="item-colon">:</div>
            <div className="item-val">{student.fatherName ? student.fatherName.toUpperCase() : "FATHER'S NAME"}</div>
          </div>
          
          <div className="detail-item">
            <div className="item-label">Contact No</div>
            <div className="item-colon">:</div>
            <div className="item-val field-contact-val">{student.contactNo || 'CONTACT NO'}</div>
          </div>
          
          <div className="detail-item">
            <div className="item-label">Address</div>
            <div className="item-colon">:</div>
            <div className="item-val field-address-val">{student.address ? student.address.toUpperCase() : 'ADDRESS'}</div>
          </div>
        </div>
        
        <div className="card-footer-sec">
          <div className="footer-bottom-accent-red"></div>
          <div className="footer-bottom-accent-blue"></div>
          <div className="footer-contact-details">
            <i className="fa-solid fa-phone-flip"></i>
            <span>CONTACT: 9425334818, 9826032643</span>
          </div>
        </div>
      </div>
    </div>
  );
}

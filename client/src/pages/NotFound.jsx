import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/NotFound.css' 

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">ไม่พบหน้าที่คุณต้องการ</h2>
        <p className="not-found-description">ขออภัย เราไม่พบหน้าที่คุณกำลังมองหา</p>
        <Link to="/" className="not-found-button">กลับไปยังหน้าหลัก</Link>
      </div>
    </div>
  )
}

export default NotFound
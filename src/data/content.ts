export type Lang = 'en' | 'th'

const en = {
  nav: { work: 'Work', experience: 'Experience', notes: 'Notes', about: 'About', cv: 'Download CV', menu: 'Menu', switchTo: 'ภาษาไทย' },
  hero: {
    greeting: "สวัสดีครับ, I'm Jeerapat 👋",
    role: 'Full-stack & DevOps',
    titleA: 'Full-stack dev who likes the ',
    titleMark: 'boring details',
    titleB: ' done right.',
    lede: 'I build web apps end to end with React, Node.js and TypeScript, from the database schema to the last button state. Currently looking for my next team.',
    cta: 'See my work',
    location: 'Phrae, TH',
    remote: 'open to remote',
    degree: 'B.Eng. Computer Eng.',
    roles: '3 roles since 2024',
    caption: 'off-duty mode 🎸',
    sticker: 'open to work!',
    photoAlt: 'Jeerapat playing guitar',
  },
  work: {},
  experience: {},
  notes: {},
  about: {},
  contact: {},
  footer: { madeIn: 'made in Phrae' },
  errors: {},
}

export type Copy = typeof en

const th: Copy = {
  nav: { work: 'ผลงาน', experience: 'ประสบการณ์', notes: 'บันทึก', about: 'เกี่ยวกับ', cv: 'ดาวน์โหลด CV', menu: 'เมนู', switchTo: 'English' },
  hero: {
    greeting: "Hi, I'm Jeerapat 👋",
    role: 'Full-stack และ DevOps',
    titleA: 'Full-stack dev ที่ใส่ใจ ',
    titleMark: 'รายละเอียดเล็ก ๆ',
    titleB: ' ให้ถูกต้องครบถ้วน',
    lede: 'ผมสร้างเว็บแอปครบวงจรด้วย React, Node.js และ TypeScript ตั้งแต่โครงสร้างฐานข้อมูลไปจนถึงสถานะของปุ่มสุดท้าย ตอนนี้กำลังมองหาทีมถัดไป',
    cta: 'ดูผลงาน',
    location: 'แพร่, ไทย',
    remote: 'ทำงานทางไกลได้',
    degree: 'ปริญญาตรี วิศวกรรมคอมพิวเตอร์',
    roles: '3 ตำแหน่งตั้งแต่ปี 2024',
    caption: 'โหมดนอกเวลางาน 🎸',
    sticker: 'เปิดรับงาน!',
    photoAlt: 'Jeerapat กำลังเล่นกีตาร์',
  },
  work: {},
  experience: {},
  notes: {},
  about: {},
  contact: {},
  footer: { madeIn: 'ทำที่แพร่' },
  errors: {},
}

export const content: Record<Lang, Copy> = { en, th }

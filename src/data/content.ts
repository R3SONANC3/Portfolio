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
  work: {
    kicker: 'ของที่ทำมา',
    title: 'Selected work',
    code: 'Code',
    visit: 'Visit',
    privateNote: 'Private client project · details shared in interview',
    archAlt:
      'Architecture: the POS desktop app (Electron) and the Admin web app (Next.js) talk to the API (Node/Express), which stores data in SQL Server and integrates with SAP Business One and the bank API.',
  },
  experience: { kicker: 'ที่ที่เคยทำงาน', title: 'Experience' },
  notes: {},
  about: {
    kicker: 'ตัวตนนิดนึง',
    title: 'About me',
    // TODO(Jeerapat): replace with your own words
    body: [
      'I studied Computer Engineering and I like ideas that are ambitious but practical. My favorite part of the job is turning a messy requirement into a screen someone can use on day one.',
      "Off the keyboard I play guitar, which is mostly practice in patience and doing small things over and over until they sound right. Turns out that's also how I debug.",
    ],
    groups: [
      { name: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Redux', 'Ant Design', 'Flutter', 'Electron'] },
      { name: 'Backend & data', items: ['Node.js', 'NestJS', 'Express', 'Prisma', 'Sequelize', 'MySQL', 'SQL Server'] },
      { name: 'Integrations', items: ['SAP Business One', 'Bank payment API', 'Cron jobs'] },
      {
        name: 'DevOps & infra',
        items: ['Docker', 'Docker Compose', 'Harbor', 'Traefik v3', 'HTTPS / certificates', 'Linux troubleshooting', 'Jenkins', 'AWS EC2', 'Vercel', 'Git'],
      },
    ],
    degree: 'B.Eng. Computer Engineering',
    languages: 'Thai (native) · English',
  },
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
  work: {
    kicker: "things I've built",
    title: 'ผลงานที่เลือกมา',
    code: 'โค้ด',
    visit: 'เปิดดู',
    privateNote: 'โปรเจกต์ลูกค้า (ไม่เปิดเผยต่อสาธารณะ) · คุยรายละเอียดได้ตอนสัมภาษณ์',
    archAlt:
      'โครงสร้างระบบ: แอป POS บนเดสก์ท็อป (Electron) และเว็บ Admin (Next.js) เชื่อมกับ API (Node/Express) ซึ่งเก็บข้อมูลใน SQL Server และเชื่อมต่อกับ SAP Business One และ API ของธนาคาร',
  },
  experience: { kicker: "where I've worked", title: 'ประสบการณ์ทำงาน' },
  notes: {},
  about: {
    kicker: 'a bit about me',
    title: 'เกี่ยวกับผม',
    // TODO(Jeerapat): replace with your own words
    body: [
      'ผมเรียนวิศวกรรมคอมพิวเตอร์ และชอบไอเดียที่ทะเยอทะยานแต่ทำได้จริง ส่วนที่ชอบที่สุดของงานคือการเปลี่ยนความต้องการที่ยังสะเปะสะปะให้เป็นหน้าจอที่คนใช้งานได้ตั้งแต่วันแรก',
      'นอกเวลางานผมเล่นกีตาร์ ซึ่งส่วนใหญ่คือการฝึกความอดทน ทำเรื่องเล็ก ๆ ซ้ำแล้วซ้ำอีกจนเสียงออกมาถูกต้อง ซึ่งก็เป็นวิธีเดียวกับที่ผมดีบักโค้ดเหมือนกัน',
    ],
    groups: [
      { name: 'ฟรอนต์เอนด์', items: en.about.groups[0].items },
      { name: 'แบ็กเอนด์และข้อมูล', items: en.about.groups[1].items },
      { name: 'การเชื่อมต่อระบบ', items: en.about.groups[2].items },
      { name: 'DevOps และโครงสร้างพื้นฐาน', items: en.about.groups[3].items },
    ],
    degree: 'ปริญญาตรี วิศวกรรมคอมพิวเตอร์',
    languages: 'ไทย (ภาษาแม่) · English',
  },
  contact: {},
  footer: { madeIn: 'ทำที่แพร่' },
  errors: {},
}

export const content: Record<Lang, Copy> = { en, th }

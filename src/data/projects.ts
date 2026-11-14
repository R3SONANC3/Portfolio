import { GITHUB_URL } from './site'

export interface ProjectStat {
  label: string
  value: string
}

export interface ProjectPart {
  name: string
  nameTh: string
  text: string
  textTh: string
}

export interface Project {
  id: string
  title: string
  description: string
  descriptionTh?: string
  badge?: string
  badgeTh?: string
  screenshot?: string
  lead?: boolean
  parts?: ProjectPart[]
  category: string
  tags: string[]
  github?: string
  live?: string
  featured?: boolean
  stats?: ProjectStat[]
}

const repo = (name: string) => (GITHUB_URL ? `${GITHUB_URL}/${name}` : undefined)

export const projects: Project[] = [
  {
    id: 'tmk-erp',
    title: 'TMK ERP',
    lead: true,
    badge: 'ERP · SAP B1 & bank integration',
    badgeTh: 'ERP · เชื่อม SAP B1 และธนาคาร',
    description:
      'An end-to-end palm purchasing and weighing system: a desktop POS wired to the scale, a web back office for approvals, and an API that pushes documents to SAP Business One and pays suppliers via the bank, automatically.',
    descriptionTh:
      'ระบบรับซื้อและชั่งน้ำหนักปาล์มครบวงจร แอป POS เดสก์ท็อปที่ต่อเครื่องชั่ง, เว็บหลังบ้านอนุมัติเอกสาร และ API ที่ส่งข้อมูลเข้า SAP Business One และจ่ายเงินผ่านธนาคารอัตโนมัติ',
    category: 'Full Stack',
    tags: ['Node.js', 'Express', 'SQL Server', 'Sequelize', 'Next.js', 'React', 'Ant Design', 'Electron', 'SQLite', 'SAP Business One', 'Docker', 'Jenkins'],
    parts: [
      {
        name: 'POS (desktop app)',
        nameTh: 'POS (แอปเดสก์ท็อป)',
        text: 'Weighing, purchase receipts, payments, shift open/close; keeps working on unstable internet.',
        textTh: 'ชั่งน้ำหนัก ออกใบรับซื้อ รับ-จ่ายเงิน เปิด/ปิดกะ ทำงานได้แม้เน็ตมีปัญหา',
      },
      {
        name: 'Admin (web back office)',
        nameTh: 'Admin (เว็บหลังบ้าน)',
        text: 'Approvals, master data, user permissions, reports, SAP sync monitoring.',
        textTh: 'อนุมัติเอกสาร ข้อมูลหลัก สิทธิ์ผู้ใช้ รายงาน และติดตามสถานะการส่งข้อมูลเข้า SAP',
      },
      {
        name: 'API (central server)',
        nameTh: 'API (เซิร์ฟเวอร์กลาง)',
        text: 'Data and processing, SAP Business One and bank payment integration, nightly jobs.',
        textTh: 'เก็บข้อมูล คำนวณ เชื่อม SAP Business One และธนาคาร และรันงานอัตโนมัติรายคืน',
      },
    ],
  },
  {
    id: 'competency-v2',
    title: 'Competency V2',
    badge: 'Full stack · 327+ commits',
    badgeTh: 'Full stack · 327+ commits',
    description:
      'One place to manage and explore Competency, SFIA v9 and TPQI frameworks. Two subsystems on a REST API over three MySQL databases.',
    descriptionTh:
      'ที่เดียวสำหรับจัดการและสำรวจกรอบ Competency, SFIA v9 และ TPQI แบ่งเป็นสองระบบย่อยบน REST API ที่เชื่อมฐานข้อมูล MySQL สามชุด',
    category: 'Full Stack',
    tags: ['React', 'Express', 'Prisma', 'MySQL', 'Docker', 'Vite', 'Node.js', 'TypeScript'],
    github: 'https://github.com/CosecDY/CompetencyV2.1',
    featured: true,
    stats: [
      { label: 'Databases', value: '3' },
      { label: 'Frameworks', value: '3' },
      { label: 'Commits', value: '327+' },
    ],
  },
  {
    id: 'perfnet',
    title: 'PerfNet',
    badge: 'Hackathon · 🥈 2nd place',
    badgeTh: 'Hackathon · 🥈 รองชนะเลิศอันดับ 1',
    description:
      'Load-testing platform that shows how a server holds up under concurrent users: response time, stability, success rate.',
    descriptionTh:
      'แพลตฟอร์มทดสอบโหลดที่แสดงว่าเซิร์ฟเวอร์รับผู้ใช้พร้อมกันได้ดีแค่ไหน ดูทั้งเวลาตอบสนอง ความเสถียร และอัตราคำขอที่สำเร็จ',
    category: 'Full Stack',
    tags: ['Python', 'JavaScript', 'Docker', 'CSS'],
    github: repo('PerfNet'),
    featured: true,
    stats: [
      { label: 'Hackathon', value: '🥈 2nd' },
      { label: 'Stack', value: 'Full Stack' },
      { label: 'Focus', value: 'Load Testing' },
    ],
  },
  {
    id: 'institution-evaluation',
    title: 'Institution Evaluation',
    badge: 'Live',
    badgeTh: 'ใช้งานจริง',
    description: 'A web app for evaluating institutions, with a React client and a separate backend server. Deployed live.',
    descriptionTh: 'เว็บแอปสำหรับประเมินสถาบัน มี React client และเซิร์ฟเวอร์ backend แยกกัน เปิดใช้งานจริงแล้ว',
    category: 'Full Stack',
    tags: ['React', 'JavaScript', 'CSS'],
    github: repo('InstitutionEvaluation'),
    live: 'https://field-ex.vercel.app',
  },
  {
    id: 'database-project',
    title: 'Database Project',
    badge: 'Live',
    badgeTh: 'ใช้งานจริง',
    description:
      'A university database course project (305311) that turns email enrollment data into an interactive dashboard, covering schema design, data processing and visualization.',
    descriptionTh:
      'โปรเจกต์วิชาฐานข้อมูล (305311) ที่แปลงข้อมูลการลงทะเบียนทางอีเมลเป็นแดชบอร์ดแบบโต้ตอบ ครอบคลุมการออกแบบสคีมา การประมวลผลข้อมูล และการแสดงผล',
    category: 'Full Stack',
    tags: ['JavaScript', 'TypeScript', 'Python', 'SQL'],
    github: repo('DatabaseProject'),
    live: 'https://database-project-bice.vercel.app',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    badge: 'This site',
    badgeTh: 'เว็บนี้เอง',
    description: 'This site: a bilingual one-page portfolio built with Next.js, TypeScript and Tailwind CSS.',
    descriptionTh: 'เว็บนี้เอง: พอร์ตโฟลิโอหน้าเดียวสองภาษา สร้างด้วย Next.js, TypeScript และ Tailwind CSS',
    category: 'Frontend',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    github: repo('Portfolio'),
  },
]

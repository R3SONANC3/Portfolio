export type Lang = 'en' | 'th'

const en = {
  nav: { work: 'Work', experience: 'Experience', notes: 'Notes', about: 'About', cv: 'Download CV', menu: 'Menu', switchTo: 'ภาษาไทย' },
  hero: {},
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
  hero: {},
  work: {},
  experience: {},
  notes: {},
  about: {},
  contact: {},
  footer: { madeIn: 'ทำที่แพร่' },
  errors: {},
}

export const content: Record<Lang, Copy> = { en, th }

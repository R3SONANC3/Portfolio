// Text between backticks renders as inline <code>.
export type FieldNote = {
  id: string
  title: string
  titleTh: string
  symptom: string
  symptomTh: string
  cause: string
  causeTh: string
  found: string
  foundTh: string
  fix: string
  fixTh: string
  lesson?: string
  lessonTh?: string
}

export const fieldNotes: FieldNote[] = [
  {
    id: 'next-env-baked',
    title: 'Images gone, page stuck loading',
    titleTh: 'รูปไม่ขึ้น และหน้าเว็บค้างที่ loading',
    symptom: 'Images would not load and the page hung on loading.',
    symptomTh: 'รูปไม่โหลด หน้าเว็บค้างที่ loading',
    cause: 'The image was built with an empty `.env.production`, so `NEXT_PUBLIC_*` was never replaced.',
    causeTh: 'image ถูก build ด้วยไฟล์ `.env.production` ว่าง ค่า `NEXT_PUBLIC_*` จึงไม่ถูกแทนที่',
    found: 'Searched `.next/static` and found unreplaced references, then saw the env file in the image was 0 bytes.',
    foundTh: 'ค้นใน `.next/static` เจอ reference ที่ยังไม่ถูกแทนค่า และเช็กว่าไฟล์ env ในอิมเมจมีขนาด 0 byte',
    fix: 'Temporary: a startup script that substitutes the values from `.env` when the container starts (reversible). Permanent: build the image with the real env in the pipeline.',
    fixTh:
      'ชั่วคราว: ทำ startup script แทนค่าจาก `.env` ตอน container เริ่ม (ย้อนกลับได้) ถาวร: build image พร้อมค่า env จริงใน pipeline',
    lesson: '`NEXT_PUBLIC_*` is baked in at build time. Changing env at runtime does not change the client bundle.',
    lessonTh: '`NEXT_PUBLIC_*` ถูกฝังตอน build แก้ env ตอนรันไม่เปลี่ยน client bundle',
  },
  {
    id: 'offline-https',
    title: 'HTTPS in a network with no internet',
    titleTh: 'HTTPS ใช้ไม่ได้เพราะไม่มีอินเทอร์เน็ตขาออก',
    symptom: 'The browser showed "Not secure".',
    symptomTh: 'เบราว์เซอร์ขึ้น Not secure',
    cause: "Let's Encrypt cannot issue certificates in a closed network.",
    causeTh: 'Let\'s Encrypt ออก cert ไม่ได้ในเครือข่ายปิด',
    found: "Traefik's startup log could not find the `.key` that matches the `.crt` (the file names must match).",
    foundTh: 'อ่าน startup log ของ Traefik พบว่าหาไฟล์ `.key` ที่จับคู่กับ `.crt` ไม่เจอ (ต้องชื่อไฟล์ตรงกัน)',
    fix: 'Placed the wildcard certificate as `cert.crt` + `cert.key` and restarted. Confirmed when the log showed "loaded cert.crt".',
    fixTh: 'วาง `cert.crt` + `cert.key` ของ wildcard certificate แล้ว restart ยืนยันจาก log ที่ขึ้น loaded cert.crt',
  },
  {
    id: 'login-400',
    title: 'Login returns 400 "Something went wrong."',
    titleTh: 'Login ตอบ 400 "Something went wrong."',
    symptom: '`POST /auth/sign_in` failed, with the real error swallowed in a `catch`.',
    symptomTh: '`POST /auth/sign_in` ล้มเหลว โดย error จริงถูกซ่อนใน `catch`',
    cause: 'The table had no `AUTO_INCREMENT` / `PRIMARY KEY` on the `id` column.',
    causeTh: 'ตารางในฐานข้อมูลไม่มี `AUTO_INCREMENT` / `PRIMARY KEY` บนคอลัมน์ `id`',
    found: 'Traced the code path with temporary logging and found `id` was undefined after create.',
    foundTh: 'ไล่ code path และเพิ่ม log ชั่วคราว พบ `id` เป็น undefined หลัง create',
    fix: 'Proposed a schema fix, going through the DBA with a backup first.',
    fixTh: 'เสนอให้แก้ schema โดยผ่าน DBA และ backup ก่อน',
  },
]

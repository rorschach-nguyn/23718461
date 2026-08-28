export const STUDENT = {
  mssv: '23718461',
  hoTen: 'PHAN NHAT NGUYEN',
} as const;

const soCuoi = Number(STUDENT.mssv.slice(-1));
export const LAST_DIGIT = soCuoi;
export const STUDENT_SEED = parseInt(STUDENT.mssv.slice(-3), 10) || 1;

export const FLASH_SECONDS = 60 + (STUDENT_SEED % 180);
export const BANNER_IMAGE_ID = 100 + (STUDENT_SEED % 200);
export const PRICE_MULTIPLIER = 20000 + (STUDENT_SEED % 50) * 100;

export const VARIANT = {
  watermarkAtTop: LAST_DIGIT % 2 === 0,
  themeControl: LAST_DIGIT % 3 === 0 ? 'switch' : 'pressable',
  modalAnimation: LAST_DIGIT >= 5 ? 'slide' : 'fade',
  chipsReversed: LAST_DIGIT % 2 === 1,
} as const;

export function examStamp(): string {
  const raw = `${STUDENT.mssv}|${STUDENT.hoTen}`;
  let h = 5381;
  for (let i = 0; i < raw.length; i++) {
    h = Math.imul(h, 33) ^ raw.charCodeAt(i);
  }
  return String(Math.abs(h) % 1000000).padStart(6, '0');
}

export default STUDENT;

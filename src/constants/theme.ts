// src/constants/theme.ts
export const COLORS = {
  primary: '#0F766E', // Xanh Teal CampusMart: nút chính, chữ CAMPUSMART, chip đang chọn, giá
  secondary: '#F59E0B', // Vàng cam: chữ Flash
  background: '#F0FDFA', // Nền màn sáng (Mint)
  surface: '#FFFFFF', // Card, ô tìm, Modal
  text: '#134E4A', // Chữ thường
  textLight: '#5F7A77', // Chữ phụ, placeholder
  border: '#CCFBF1', // Viền
  error: '#DC2626', // Lỗi
  success: '#16A34A', // Thành công
};

export const DARK_COLORS = {
  primary: '#0F766E', // Giữ nguyên primary theo đề bài
  secondary: '#F59E0B',
  background: '#042F2E', // Nền Dark Mode
  surface: '#0B4F4A', // Card, ô tìm, Modal Dark Mode
  text: '#F0FDFA', // Chữ sáng Dark Mode
  textLight: '#99F6E4',
  border: '#115E59',
  error: '#DC2626',
  success: '#16A34A',
};

export const SIZES = {
  base: 8,
  font: 14,
  radius: 12,
  padding: 16,
  h1: 24,
  h2: 20,
  h3: 18,
  body1: 16,
  body2: 14,
  small: 12,
};

export const FONTS = {
  h1: { fontSize: SIZES.h1, fontWeight: '700' as const },
  h2: { fontSize: SIZES.h2, fontWeight: '700' as const },
  h3: { fontSize: SIZES.h3, fontWeight: '600' as const },
  body1: { fontSize: SIZES.body1, fontWeight: '400' as const },
  body2: { fontSize: SIZES.body2, fontWeight: '400' as const },
  small: { fontSize: SIZES.small, fontWeight: '400' as const },
};
# TH1 - PHAN NHAT NGUYEN - 23718461 - #884511
URL: https://github.com/rorschach-nguyn/23718461.git

## Thông tin sinh viên & Bài thi
- **Họ và tên:** PHAN NHAT NGUYEN
- **MSSV:** 23718461
- **Mã Stamp:** #884511
- **Môn thi:** LẬP TRÌNH CHO THIẾT BỊ DI ĐỘNG (TH) - ĐỀ KIỂM TRA THỰC HÀNH 1
- **Giảng viên chấm:** Ths. NGUYỄN VĂN DUY

---

## Biến thể đề bài theo MSSV (Số cuối: 1)
- **Vị trí Watermark:** Ở **Dưới chân màn hình** (`TH1 · 23718461 · PHAN NHAT NGUYEN · #884511`).
- **Nút chuyển Sáng/Tối:** Dạng **`Pressable`**.
- **Hiệu ứng mở Modal:** **`fade`**.
- **Thứ tự 4 Chip danh mục:** **`Học tập` $\rightarrow$ `Nước` $\rightarrow$ `Đồ ăn` $\rightarrow$ `Tất cả`**.
- **Các thông số tự động sinh:**
  - `STUDENT_SEED`: 461
  - `FLASH_SECONDS`: 161 giây (02:41)
  - `BANNER_IMAGE_ID`: 161 (`https://picsum.photos/id/161/800/320`)
  - `PRICE_MULTIPLIER`: 21100

---

## Cấu trúc mã nguồn (Clean Architecture)
```text
CampusMart_23718461/
├── README.md
├── App.tsx
├── package.json
├── babel.config.js
├── tsconfig.json
├── docs/
│   └── screenshot-th1.png
└── src/
    ├── constants/
    │   ├── student.ts
    │   └── theme.ts
    ├── contexts/
    │   └── ThemeContext.tsx
    ├── hooks/
    │   └── useCountdown.ts
    ├── services/
    │   └── productApi.ts
    ├── components/
    │   └── ui/
    │       ├── Typography.tsx
    │       ├── ShopInput.tsx
    │       └── ShopButton.tsx
    └── screens/
        └── HomeScreen.tsx
```

---

## Hướng dẫn cài đặt & Khởi chạy ứng dụng

```bash
# 1. Cài đặt các thư viện phụ thuộc
npm install

# 2. Khởi động Metro Bundler
npm start

# 3. Khởi chạy ứng dụng lên máy ảo Android
npm run android
```

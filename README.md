# Trạm Đổi Đồ (ReLoop)

Ứng dụng marketplace trao đổi quần áo cũ, xây dựng bằng React, TypeScript, Vite và React Router.

## Chạy trên máy

```bash
npm install
npm run dev
```

Mở URL được Vite hiển thị trong terminal.

## Build

```bash
npm run build
npm run preview
```

## Điều hướng

- `/` — trang chủ và các món đồ mới đăng.
- `/search?q=ao%20khoac` — tìm kiếm theo tên, danh mục, size, thương hiệu, khu vực và mô tả.
- `/category/ao-khoac` — toàn bộ món đồ thuộc danh mục áo khoác.

Danh sách hiện dùng dữ liệu mẫu trong `src/data/items.ts`; tin mới được thêm trong phiên làm việc hiện tại.

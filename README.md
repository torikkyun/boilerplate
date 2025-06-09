# nest-boilerplate

## Cài đặt dự án

```bash
pnpm add -g degit
degit torikkyun/nest-boilerplate skibidi
cd skibidi
pnpm i
docker-compose -f docker-compose.dev.yml up -d --build
```

## Chạy dự án

```bash
pnpm start:dev
```

## Quy tắc coding

- **Ngôn ngữ:** TypeScript
- **Quy tắc đặt tên:**
  - Biến, hàm: camelCase (`userName`)
  - Class, Interface, Enum: PascalCase (`UserService`)
  - Hằng số: UPPER_CASE (`MAX_RETRIES`)
- **Dấu nháy:** Sử dụng dấu nháy đơn `'`
- **Khoảng trắng:** 2 spaces cho mỗi level thụt lề
- **Dấu chấm phẩy:** Luôn kết thúc câu lệnh bằng dấu `;`
- **Kiểm tra code:** Sử dụng ESLint và Prettier (`pnpm lint` và `pnpm format`)
- **Comment:** Chỉ comment khi thực sự cần thiết, ưu tiên code rõ ràng

## Cấu trúc thư mục

```
Sẽ cập nhập sau
```

> **Lưu ý:** Luôn tuân thủ cấu trúc và quy ước để đảm bảo code dễ đọc, dễ bảo trì.

# Website Blog cá nhân

## Website sử dụng TypeScript + ExpressJs + ReactJS + JWT (Đang phát triển)
 
Dự án xây dựng website cá nhân với mục đích lưu trữ các bài viết liên quan đến lập trình
Đây là sản phẩm đầu tiên của mình sử dụng TypeScript với mục đích học và sử dụng TypeScript ở backend và frontend

> - Đăng ký, đăng nhập
> - Quản lý danh mục
> - Quản lý bài viết
> - Sử dụng React Markdown-it
> - Đang phát triển....


## Tác giả: Vũ Duy Khánh

## Cách cài đặt dự án ở local

```
// Cài đặt server
yarn

// Cài đặt client
cd frontend
yarn
```

## Kết nối với mongodb và tạo file config.env

### config.env

> - PORT: Lựa chọn PORT của server
> - DATABASE: Link kết nối mongodb online
> - DATABASE_LOCAL=mongodb://localhost:27017/:database : Kết nối database ở local
> - JWT_SECRET: Dãy mã hoá JWT (Dãy ký tự ngẫu nhiên)
> - JWT_EXPIRES_IN : Thời gian tồn tại của JWT
> - JWT_COOKIE_EXPIRES_IN: Thời gian tồn tại của cookie
> - JWT_ACCESS_TOKEN_SECRET: 1 chuỗi mã hoá bất kỳ
> - JWT_REFRESH_TOKEN_SECRET: 1 chuỗi mã hoá bất kỳ
> - JWT_ACCESS_TOKEN_EXPIRES_IN: Thời gian tồn tại của access token
> - JWT_REFRESH_TOKEN_EXPIRES_IN: Thời gian tồn tại của refresh token

## Chạy sever Express

### `yarn start`

## Một số hình ảnh của website

Giao diện người dùng
![](https://res.cloudinary.com/duykhanh2401/image/upload/v1651568336/Blog/Screenshot_2022-05-03_155831_ahh1e2.png)

Giao diện quản trị viên
![](https://res.cloudinary.com/duykhanh2401/image/upload/v1651568391/Blog/Screenshot_2022-05-03_155944_n5y5l5.png)

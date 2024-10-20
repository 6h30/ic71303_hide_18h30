"use strict";

require('dotenv').config(); // Nếu bạn đang sử dụng .env
const db = require('./models'); // Đảm bảo đường dẫn đúng tới models của bạn

async function resetTables() {
  try {
    // Lấy danh sách các model từ db
    const models = Object.keys(db);

    // Xóa tất cả các bảng theo thứ tự phụ thuộc
    for (let i = models.length - 1; i >= 0; i--) {
      const modelName = models[i];
      if (db[modelName].drop) {
        await db[modelName].drop({ cascade: true }); // cascade để xóa dữ liệu trong các bảng liên quan
        console.log(`Đã xóa bảng: ${modelName}`);
      }
    }

    console.log('Tất cả các bảng đã được xóa thành công!');
  } catch (error) {
    console.error('Lỗi khi xóa bảng:', error);
  }
}

resetTables();

"use strict";

require('dotenv').config(); 
const db = require('./models'); 

async function truncateAllTables() {
  try {
    // Lấy danh sách các bảng từ các model
    const models = Object.keys(db);

    // Sử dụng Promise.all để chạy tất cả các lệnh truncate song song
    await Promise.all(models.map(async (modelName) => {
      if (db[modelName].truncate) {
        await db[modelName].truncate({ cascade: true }); // cascade để xóa dữ liệu trong các bảng liên quan
      }
    }));

    console.log('Tất cả dữ liệu đã được xóa thành công!');
  } catch (error) {
    console.error('Lỗi khi xóa dữ liệu:', error);
  }
}

truncateAllTables();

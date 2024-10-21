'use strict';

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'dgfhgd';

function sign(email, expiresIn = "30m") {
    return jwt.sign(
        { email },
        process.env.JWT_SECRET || JWT_SECRET,
        { expiresIn }
    );
}

function verify(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || JWT_SECRET);
        return { valid: true, decoded }; // Trả về thông tin giải mã -tra để biết thêm lợi ích
    } catch (error) {
        return { valid: false, error: error.message }; // Trả về thông tin lỗi
    }
}

module.exports = { sign, verify };

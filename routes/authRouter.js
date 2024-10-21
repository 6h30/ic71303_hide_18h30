'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = errors.array().map(err => err.msg).join(', ');
        return res.render(req.path === '/register' ? 'login' : req.path === '/forgot' ? 'forgot-password' : 'reset-password', { message });
    }
    next();
};

// Đăng nhập
router.get('/login', controller.show);
router.post('/login',
    body('email').trim().notEmpty().withMessage('Email is required!').isEmail().withMessage('Invalid email address!'),
    body('password').trim().notEmpty().withMessage('Password is required!'),
    handleValidationErrors,
    controller.login
);

// Đăng xuất
router.get('/logout', controller.logout);

// Đăng ký
router.post('/register',
    body('firstName').trim().notEmpty().withMessage('First name is required!'),
    body('lastName').trim().notEmpty().withMessage('Last name is required!'),
    body('email').trim().notEmpty().withMessage('Email is required!').isEmail().withMessage('Invalid Email address!'),
    body('password').trim().notEmpty().withMessage('Password is required!')
        .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage('Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'),
    body('confirmPassword').custom((confirmPassword, { req }) => {
        if (confirmPassword !== req.body.password) {
            throw new Error('Passwords do not match!');
        }
        return true;
    }),
    handleValidationErrors,
    controller.register
);

// Quên mật khẩu
router.get('/forgot', controller.showForgotPassword);
router.post('/forgot',
    body('email').trim().notEmpty().withMessage('Email is required!').isEmail().withMessage('Invalid email address'),
    handleValidationErrors,
    controller.forgotPassword
);

// Đặt lại mật khẩu
router.post('/reset',
    body('email').trim().notEmpty().withMessage('Email is required!').isEmail().withMessage('Invalid email address!'),
    body('password').trim().notEmpty().withMessage('Password is required!')
        .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage('Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'),
    body('confirmPassword').custom((confirmPassword, { req }) => {
        if (confirmPassword !== req.body.password) {
            throw new Error('Passwords do not match!');
        }
        return true;
    }),
    handleValidationErrors,
    controller.resetPassword
);

module.exports = router;

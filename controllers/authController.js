'use strict';

const controller = {};
const passport = require('./passport');
const models = require('../models');
const { where } = require('sequelize');

// const emailValidation = body('email')
//     .trim().notEmpty().withMessage('Email is required!')
//     .isEmail().withMessage('Invalid email address!');

// const passwordValidation = body('password')
//     .trim().notEmpty().withMessage('Password is required!')
//     .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
//     .withMessage('Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters');


// controller.show = (req, res) => {

//     if (req.isAuthenticated()) {
//         return res.redirect('/');
//     }
//     res.render('login', { loginMessage: req.flash('loginMessage'), reqUrl: req.query.reqUrl, registerMessage:  req.flash('registerMessage') });
// }


// controller.login = (req, res, next) => {
//     let keepSignedIn = req.body.keepSignedIn;
//     let reqUrl = req.body.reqUrl ? req.body.reqUrl : '/users/my-account';
//     let cart = req.session.cart;

//     passport.authenticate('local-login', (error, user) => {
//         if (error) {
//             return next(error);
//         }
//         if (!user) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         req.logIn(user, (error) => {
//             if (error) { return next(error); }
//             req.session.cookie.maxAge = keepSignedIn ? (24 * 60 * 60 * 1000) : null;
//             req.session.cart = cart;
//             console.log('Request body:', req.body);

//             // Gửi phản hồi JSON với thông tin người dùng và URL chuyển hướng
//             return res.json({ message: 'Login successful', redirectUrl: reqUrl });
            
//         });
//     })(req, res, next);
// }

controller.login = (req, res, next) => {
    const keepSignedIn = req.body.keepSignedIn;
    const reqUrl = req.body.reqUrl || '/users/my-account';
    const cart = req.session.cart;

    passport.authenticate('local-login', (error, user) => {
        if (error) {
            console.error('Authentication error:', error); // Ghi log lỗi
            return next(error);
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        req.logIn(user, (error) => {
            if (error) {
                console.error('Login error:', error); // Ghi log lỗi
                return next(error);
            }
            req.session.cookie.maxAge = keepSignedIn ? (24 * 60 * 60 * 1000) : null;
            req.session.cart = cart;

            console.log('Request body:', req.body);
            return res.json({ message: 'Login successful', redirectUrl: reqUrl });
        });
    })(req, res, next);
};


controller.logout = (req, res, next) => {
    req.logout((error) => {
        if (error) { 
            console.error('Logout error:', error); 
            return res.status(500).json({ success: false, message: 'Logout failed' });
        }

        // Đảm bảo trả về Content-Type là application/json
        res.setHeader('Content-Type', 'application/json');
        return res.json({ success: true, message: 'Logout successful' });
    });
};


controller.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    // Gửi phản hồi JSON nếu người dùng chưa đăng nhập
    return res.status(401).json({ message: 'User not authenticated', redirectUrl: `/users/login?reqUrl=${req.originalUrl}` });
}


controller.register = (req, res, next) => {
    let reqUrl = req.body.reqUrl ? req.body.reqUrl : '/users/my-account';
    let cart = req.session.cart;

    passport.authenticate('local-register', (error, user) => {
        if (error) { return next(error); }
        if (!user) { 
            return res.status(400).json({ message: 'Registration failed', redirectUrl: `/users/login?reqUrl=${reqUrl}` });
        }
        req.logIn(user, (error) => {
            if (error) { return next(error); }
            req.session.cart = cart;

            // Gửi phản hồi JSON với thông tin người dùng và URL chuyển hướng
            return res.json({ message: 'Registration successful', redirectUrl: reqUrl });
        });
    })(req, res, next);
}


controller.showForgotPassword = (req, res) => {
    // Gửi phản hồi JSON thay vì render view
    return res.json({ message: 'Forgot password page', status: 'ready' });
}

controller.forgotPassword = async (req, res) => {
    let email = req.body.email;

    try {
        // Kiểm tra email tồn tại
        let user = await models.User.findOne({ where: { email } });
        if (user) {
            const { sign } = require('.jwt');
            const host = req.header('host');
            const resetLink = `${req.protocol}://${host}/users/reset?token=${sign(email)}&email=${email}`;
            const { sendForgotPasswordMail } = require('./mail');

            await sendForgotPasswordMail(user, host, resetLink);
            console.log('Email has been sent');

            return res.json({ message: 'Email sent successfully, please check your inbox.' });
        } else {
            return res.status(404).json({ message: 'Email does not exist!' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while sending the email. Please try again later.' });
    }
}


controller.showResetPassword = (req, res) => {
    let email = req.query.email;
    let token = req.query.token;
    let { verify } = require('./jwt'); // xác thực token bằng jwt

    if (!token || !verify(token)) {
        return res.status(400).json({ message: 'Invalid or expired token.' });
    } else {
        return res.json({ message: 'Reset password page ready', email });
    }
}

controller.resetPassword = async (req, res) => {
    let email = req.body.email;
    let token = req.body.token;
    let bcrypt = require('bcrypt');
    let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8)); // thêm muối và băm mật khẩu

    try {
        // Cập nhật mật khẩu
        await models.User.update({ password }, { where: { email } });
        return res.json({ message: 'Password reset successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while resetting the password.' });
    }
}

module.exports = controller;

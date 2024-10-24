// 'use strict';

// const passport = require("passport");
// const LocalStrategy = require('passport-local');
// const bcrypt = require('bcrypt');
// const models = require('../models');
// const { where } = require("sequelize");

// //ham nay duoc goi khi xac thuc thanh cong va luu thong tin user vao session
// // passport.serializeUser((user, done) => {
// //     done(null, user.id);
// // });

// // ham nay duoc goi boi passport.session de lay thong tin cua user tu csdl va dua vao req.user
// // passport.deserializeUser(async (id, done) => {
// //     try {
// //         let user = await models.User.findOne({
// //             attributes: ['id', 'email', 'firstName', 'lastName', 'mobile', 'isAdmin'],
// //             where: { id }
// //         });
// //         done(null, user);
// //     } catch (error) {
// //         done(error, null);
// //     }
// // });

// //ham xac thuc nguoi dung khi dang nhap
// // passport.use('local-login', new LocalStrategy({
// //     usernameField: 'email', // ten dang nhap la email
// //     passwordField: 'password',
// //     passReqToCallback: true //cho phep truyen req vao callback de kiem tra user da dang nhap chua
// // }, async (req, email, password, done) => {
// //     if (email) {
// //         email = email.toLowerCase(); // chuyen dia chi email sang ky tu thuong
// //     }
// //     try {
// //         if (!req.user) { //neu user chua dang nhap 
// //             let user = await models.User.findOne({ where: { email } });
// //             if (!user) {// neu email chua ton tai
// //                 return done(null, false, req.flash('loginMessage', 'Email does not exist!'));
// //             }
// //             if (!bcrypt.compareSync(password, user.password)) { //neu mat khau khong dung
// //             return done(null, false, req.flash('loginMessage', 'Invalid Password!'));
// //             }
// //             // cho phep dang nhap
// //             return done(null, user);
// //         }
// //         // bo qua dang nhap
// //         done(null, req.user);
// //     }
// //     catch (error) {
// //         done(error);
// //     }
// // }));

// // ham dang ky tai khoan
// passport.use('local-register', new LocalStrategy ({
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true
// },
// async (req, email, password, done) => {
//     if(email) {
//         email = email.toLowerCase();
//     }
//     if (req.user) { // neu nguoi dung da dang nhap, bo qua

//         return done(null, req.user);
//     }
//     try {
//         let user = await models.User.findOne({where: { email }});
//         if (user) {//neu email da ton tai
//         return done( null, false, req.flash('registerMessage', 'Email is already taken!'));
//     }
//     user = await models.User.create({
//         email: email,
//         password: bcrypt.hashSync(password, bcrypt.genSaltSync(8)),

//         mobile: req.body.mobile
//     });

//     // thong bao dang ki tai khoan thanh cong
//     done(null, false, req.flash('registerMessage', 'You have registered successfully. Please login!'));
//     } catch (error) {
//         done(error);
//     }
// }))

// module.exports = passport;


'use strict';

const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy; 
const bcrypt = require('bcrypt');
const models = require('../models');

passport.serializeUser((user, done) => {
    console.log('Serializing user:', user);
    done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
    console.log('Deserializing user with id:', id);
    try {
        const user = await models.User.findByPk(id);
        console.log('User found:', user);
        done(null, user);
    } catch (error) {
        console.error('Deserialization error:', error);
        done(error);
    }
});



// Local strategy for user login
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    email = email ? email.toLowerCase() : '';

    console.log('Attempting login for email:', email); // Ghi log email đang được thử đăng nhập

    try {
        if (!req.user) { // User not logged in
            const user = await models.User.findOne({ where: { email } });
            console.log('User found:', user); // Ghi log người dùng tìm thấy

            if (!user) {
                console.log('No user found with this email.'); // Ghi log nếu không tìm thấy người dùng
                return done(null, false, req.flash('loginMessage', 'Email does not exist!'));
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);
            console.log('Is password valid:', isPasswordValid); // Ghi log kết quả so sánh mật khẩu

            if (!isPasswordValid) {
                console.log('Invalid password for email:', email); // Ghi log nếu mật khẩu không hợp lệ
                return done(null, false, req.flash('loginMessage', 'Invalid Password!'));
            }
            console.log('Login successful for email:', email); // Ghi log khi đăng nhập thành công
            return done(null, user); // Successful login
        }
        done(null, req.user); // Skip login if user is already logged in
    } catch (error) {
        console.error('Error during login:', error); // Ghi log nếu có lỗi xảy ra
        done(error);
    }
}));

// Local strategy for user registration
passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    email = email ? email.toLowerCase() : '';

    if (req.user) { // Skip if user is already logged in
        return done(null, req.user);
    }

    try {
        let user = await models.User.findOne({ where: { email } });
        if (user) { // If email already exists
            return done(null, false, req.flash('registerMessage', 'Email is already taken!'));
        }

        // Create new user
        user = await models.User.create({
            email: email,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(8)), // Mã hóa mật khẩu
            mobile: req.body.mobile // Kiểm tra trước khi sử dụng
        });

        // Notify successful registration
        done(null, user); // Trả về người dùng mới
    } catch (error) {
        done(error);
    }
}));

module.exports = passport;

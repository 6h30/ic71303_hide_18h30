"use strict";
require('dotenv').config();

const express = require("express");
const session = require('express-session');
const RedisStore = require('connect-redis').default; 
const { createClient } = require('redis');
const passport = require('./controllers/passport'); 
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 8000;

// Khởi tạo Redis client
const redisClient = createClient({
    password: process.env.REDIS_PASSWORD, 
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    }
});

// Kết nối đến Redis
redisClient.connect()
    .then(() => console.log('Connected to Redis'))
    .catch(err => console.error('Redis connection error:', err));

// Cấu hình session
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET || 's3cr3t',
  resave: false,
  saveUninitialized: false,
  cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 20 * 60 * 1000,
  },
}));

// Sử dụng Passport và Connect Flash
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Middleware để truyền flash messages vào res.locals
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Cấu hình body parser cho API
app.use(express.json()); // Để xử lý các yêu cầu JSON
app.use(express.urlencoded({ extended: true })); // Để xử lý dữ liệu từ form URL-encoded

// Routes
app.use("/api", require("./routes/blogRouter"));
app.use("/api", require("./routes/projectRouter"));
app.use('/api/user', require('./routes/authRouter'));

// Ví dụ route
app.get('/session', (req, res) => {
  if (!req.session.views) {
      req.session.views = 1;
  } else {
      req.session.views++;
  }
  res.send(`Số lần xem: ${req.session.views}`);
});

// Middleware để xử lý lỗi 404
app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});

// Lắng nghe port
app.listen(port, () => console.log(`Opened port ${port}!`));

// Xử lý lỗi Redis
redisClient.on('error', (err) => {
  console.error('Redis error: ', err);
});

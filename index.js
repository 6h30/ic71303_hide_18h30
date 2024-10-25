"use strict";
require('dotenv').config();

const express = require("express");
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');
const passport = require('./controllers/passport');
const flash = require('connect-flash');
const cors = require('cors');

const app = express();
// const port = process.env.PORT || 8000;

let server;

// Khởi động server
startServer(process.env.PORT || 8000)
  .then(() => console.log('Server started successfully'))
  .catch(err => console.error('Error starting server:', err));

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

app.use(cors({
    origin: 'https://scaling-happiness-gj65w4447r7fpg6q-3000.app.github.dev', // Thay đổi theo nguồn gốc của bạn
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Các phương thức cho phép
    allowedHeaders: ['Content-Type', 'Authorization'] // Các header cho phép
}));

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

function startServer(port) {
  return new Promise((reject) => {
    server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Visit http://localhost:${port}/session to test session route`);
      console.log(`API routes available:`);
      console.log(`- /api/user (Authentication)`);
    });
    server.on('error', (err) => {
      reject(err);
    });
  });
}

// Xử lý lỗi Redis
redisClient.on('error', (err) => {
  console.error('Redis error: ', err);
});

module.exports = { app, startServer };

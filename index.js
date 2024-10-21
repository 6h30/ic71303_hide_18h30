"use strict";

const express = require("express");
// const session = require('express-session');
// const RedisStore = require('connect-redis').default; 
// const redis = require('redis');

const app = express();
const port = process.env.PORT || 8000;

// const redisClient = redis.createClient({
//   host: 'localhost',
//   port: 6379,
// });

// cau hinh su dung session
// app.use(session({
//   store: new RedisStore({ client: redisClient }),
//   secret: process.env.SESSION_SECRET || 'your-secret',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: 20 * 60 * 1000,
//   },
// }));

//cau hinh doc du lieu post tu body
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api", require("./routes/blogRouter"));
app.use("/api", require("./routes/projectRouter"));
app.use('/api/user', require('./routes/authRouter'));

// Ví dụ route
// app.get('/session', (req, res) => {
//   // Kiểm tra hoặc khởi tạo session
//   if (!req.session.views) {
//       req.session.views = 1;
//   } else {
//       req.session.views++;
//   }
//   res.send(`Số lần xem: ${req.session.views}`);
// });

// Middleware để xử lý lỗi 404
app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => console.log(`đang mở port ${port}!`));

// Xử lý lỗi Redis
// redisClient.on('error', (err) => {
//   console.error('Redis error: ', err);
// });
"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const expressHandlebars = require("express-handlebars");

//cau hinh public static folder
app.use(express.static(__dirname + "/public"));

//cau hinh su dung express-handlebars
// app.engine(
//   "hbs",
//   expressHandlebars.engine({
//     layoutsDir: __dirname + "/views/layouts",
//     partialsDir: __dirname + "/views/partials",
//     extname: "hbs",
//     defaultLayout: "layout",
//     allowProtoPropertiesByDefault: true,
//     allowProtoMethodsByDefault: true
//   })
// );

// app.set("view engine", "hbs");

//cau hinh doc du lieu post tu body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
// app.use("/api", require("./routes/homeRouter"));
// app.use("/api/blog", require("./routes/blogRouter"));


// Middleware để xử lý lỗi 404
app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => console.log(`đang mở port ${port}!`));
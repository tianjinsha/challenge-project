const express = require("express");
const Mock = require("mockjs");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const users = require("./data/users");

//body-parser 解析json格式
app.use(bodyParser.json());
//此项必须在bodyParser.json后面，为参数解码
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/api",router);
router.use("/users", users);

//为app添加中间件处理跨域请求
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const server = app.listen(3002, function () {

    let host = server.address().address
    let port = server.address().port

    console.log("正在开启服务，访问地址为 http://%s:%s", host, port)

})


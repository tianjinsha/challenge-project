const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const users=require("./user");

//body-parser 解析json格式
app.use(bodyParser.json());
//此项必须在bodyParser.json后面，为参数解码
app.use(bodyParser.urlencoded({
    extended: true
}));

const router=express.Router();

app.get('/',function(req,res){
    res.send('ping success');
})
app.use("/static",express.static(__dirname+'/public'))
app.use("/api",router);
router.use("/users",users);


const server = app.listen(3001, function () {
 
    let host = server.address().address
    let port = server.address().port
   
    console.log("正在开启服务，访问地址为 http://%s:%s", host, port)
   
  })
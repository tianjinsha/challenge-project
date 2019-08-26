const Mock = require("mockjs");
const expresss = require("express");
const router = expresss.Router();

router.use("/", function (req, res) {
    var data = Mock.mock({
        'status':0,
        'msg':"success",
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'data|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,
            // 属性 userId 是一个5位的随机码
            'userId|5': '',
        }]
    }
    );
    return res.json(data);
})

module.exports = router;


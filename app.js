// 1 下载第三方模块 multer

// 2 引入2个模块 express/multer/fs
const express = require("express");
const fs = require("fs");
const multer= require("multer");
// 创建express对象
var app = express();

// 指定静态目录 public
app.use(express.static(__dirname+"/public"));

// 指定监听端口
app.listen(3000);

//指定上传目录
var upload = multer({dest:"upload/"})
// 创建upload对象
// 接收客户post请求
//upload.single() 一次上传一张图片
//mypic           指定上传文件表单 name="mypic"
app.post("/upload",upload.single("mypic"),(req,res)=>{
    //判断文件大小，拒绝大于2MB文件
    var size = req.file.size/1000/1000;
    if(size > 2 ){
        res.send({code:-1,msg:"文件过大 超过2Mb"});
        return;
    }
    //获取文件类型 图片
    var type = req.file.mimetype;
    var i2 = type .indexOf("image");
    if(i2==-1){
        res.send({code:-2,msg:"上传只能为图片"});
        return;
    }
    // 创建新的文件名 1.jpg->13461346125.jpg
    // 时间戳+随机数
    var src = req.file.originalname;
    var fTime = new Date().getTime();//获得现在相对于1970的毫秒数
    var fRand = Math.floor(Math.random()*9999);
    var i3 = src.lastIndexOf(".");//获得4位随机数
    var suff = src.substring(i3);//获得文件的后缀 .jpg
    var des = "./upload/"+fTime+fRand+suff;
    console.log(des);//新的路径
    fs.renameSync(req.file.path,des);
    res.send({code:1,msg:"上传成功"});

})

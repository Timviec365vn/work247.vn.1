const express = require('express')
const formData = require('express-form-data')
const bodyParser = require('body-parser')
const cors = require("cors")
const nodemailer = require('nodemailer')
const app = express();
app.use(cors());
app.use(formData.parse())
app.use(express.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());
app.use(bodyParser.raw());
app.use(bodyParser.json());
const createError = (code, message) => {
    const err = new Error();
    err.code = code;
    err.message = message;
    return { data: null, error: err };
};
function FSendMailOTPTimviec365(title,content,receiver){
    return new Promise((resolve,reject)=>{
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
            user:'work247.vn.1@gmail.com',
            pass:'padmtlhqvcwbgyic'
            }
        });
        const mail_config = {
            from:'work247.vn.1@gmail.com',
            to:receiver,
            subject:title,
            html: `${content}`
        };
        transporter.sendMail(mail_config, function(error,info){
            if(error){
                console.log(error);
                return reject({message:"Đã có lỗi xảy ra khi gửi mail"});
            };
            return resolve({message:"Gửi mail thành công"})
        });
    })
}

const SendMailOTPTimviec365 = async (req,res)=>{
    try{
        console.log(req.body)
        if(req.body && req.body.title && req.body.content && req.body.receiver){
            await FSendMailOTPTimviec365(req.body.title,req.body.content,req.body.receiver)
            res.json({
                data:{
                    result:true
                },
                error:null
            })
        }
        else{
            res.status(200).json(createError(200, "Infor is not valid"));
        }
    } catch(e){
        console.log(e);
        res.status(200).json(createError(200, "Đã có lỗi xảy ra"));
    }
}

app.post('/api/mail/HunghacompanyTimviec365', SendMailOTPTimviec365);
app.listen(8800,()=>{
    console.log("Backend is running on http://localhost:8800")
})

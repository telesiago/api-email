const express = require("express");
const nodemailer = require("nodemailer")

const app = express();

app.use(express.json());


app.post('/sendEmail', (request, response) =>{
    const body = request.body;

    console.log(body);
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        service: 'gmail',
        secure: true,
        auth: {
            user: body.user,
            pass: body.pass
        }
    })

    const modeloEmail = {
        from: body.from,
        to: body.to,
        subject: body.subject,
        text: body.text
    }

    transporter.sendMail(modeloEmail, (err) => {
        if(err){
            console.log(err)
            return response.json([err])
        }
        console.log('Enviado')
        return response.json(['Sucesso'])
    })

})

app.listen(3333);
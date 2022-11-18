const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
      user: 'squadhelp123456@outlook.com',
      pass: '123A456b'
  }
  },
    {
        from: 'Squadhelp no-reply <squadhelp123456@outlook.com>',
    }
)

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err)
        console.log('Email sent: ', info)
    })
}

module.exports = mailer
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.yahoo.com',
  port: 587,
  secure: false,
  auth: {
      user: 'squadhelpn@yahoo.com',
      pass: '123A456b'
  }
  },
    {
        from: 'Squadhelp no-reply <squadhelpn@yahoo.com>',
    }
)

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err)
        console.log('Email sent: ', info)
    })
}

module.exports = mailer
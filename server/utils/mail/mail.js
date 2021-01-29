import mailer from 'nodemailer'
import welcome from './welcome_template.js'

const getEmailData = ({ to, name, token, type }) => {
  let template = null

  switch (type) {
    case 'welcome':
      template = {
        from: `Waves <${process.env.ADMIN_EMAIL}>`,
        to,
        subject: `Welcome to waves, ${name}`,
        html: welcome(),
      }
      break
    default:
      template
  }

  return template
}

export const sendEmail = async ({ to, name, token, type }) => {
  try {
    const smtpTransport = mailer.createTransport({
      host: `${process.env.POST_SERVICE_HOST}`,
      port: `${process.env.POST_SERVICE_PORT}`,
      secure: `${process.env.POST_SERVICE_IS_SECURE}`,
      auth: {
        user: `${process.env.ADMIN_EMAIL}`,
        pass: `${process.env.ADMIN_EMAIL_PASSWORD}`,
      },
    })

    const mail = getEmailData({ to, name, token, type })

    const info = await smtpTransport.sendMail(mail)
    smtpTransport.close()
  } catch (error) {
    console.error(`Email Sending Error: ${error.message}`.red.underline.bold)
  }
}

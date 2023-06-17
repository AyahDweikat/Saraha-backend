import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to, subject, html) {
  let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `ayah dweikat saraha app" <${process.env.EMAIL}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    text: "confirm email", // plain text body
    html, // html body
  });
}
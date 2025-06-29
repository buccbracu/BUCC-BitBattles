import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export async function send(to: string) {
  const result = await transporter.sendMail({
    from: "bitbattles@gmail.com",
    to,
    subject: "Hello World",
    text: "Hello World",
  });

  console.log(JSON.stringify(result, null, 4));
}

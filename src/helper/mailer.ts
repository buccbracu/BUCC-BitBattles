import { EmailType, GetTeamDTO } from "@/types";
import * as nodemailer from "nodemailer";
import { registeredMail, verifiedMail } from "./mailTemplate";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export async function send(team: Partial<GetTeamDTO>, type: EmailType) {
  if (team.members === undefined || team.members?.length == 0) {
    return console.log("Couldn't send email.");
  }

  const emailConfig = {
    from: "bitbattles@gmail.com",
    to: team.members[0].gsuiteEmail,
    subject: "",
    html: "",
  };

  switch (type) {
    case EmailType.REGISTERED:
      emailConfig.subject = "Registration Successful - Bit Battles";
      emailConfig.html = registeredMail(team);
      break;
    case EmailType.VERIFIED:
      emailConfig.subject = "Verified - Bit Battles";
      emailConfig.html = verifiedMail(team);
      break;

    default:
      break;
  }

  const result = await transporter.sendMail(emailConfig);

  console.log(result);
}

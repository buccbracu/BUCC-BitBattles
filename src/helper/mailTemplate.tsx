import { GetTeamDTO } from "@/types";

export const registeredMail = (team: Partial<GetTeamDTO>) => {
  return `<div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>Bit Battles Registration Confirmation</h2>
    <p>Dear ${team.team_name},</p>
    <p>Thank you for registering for the <strong>Bit Battles</strong>. Our team will soon verify the registration and let you know.</p>
    <p>Here are your registration details:</p>
    <ul>
      <li><strong>Team Name:</strong> ${team.team_name}</li>
      <li><strong>Leader Name:</strong> ${
        team.members && team.members[0].name
      }</li>
      <li><strong>Leader's Email (GSuite):</strong> ${
        team.members && team.members[0].gsuiteEmail
      }</li>
      ${
        team.members && team.members.length > 1
          ? team.members
              .slice(1)
              .map(
                (member, i) =>
                  `<li><strong>Team Member ${i + 1}:</strong> ${member.name} (${
                    member.gsuiteEmail
                  })</li>`
              )
              .join("\n")
          : ""
      }
    </ul>
    <p>We are excited to have you with us and wish you the best of luck for the competition!</p>
    <p><strong>NOTE:</strong> If you don't get a verified mail within 24 hours, feel free to <a href="mailto:${
      process.env.MAIL_USER
    }">contact us</a>.</p>
    <p>Best Regards,<br />BUCC R&D Team</p>
  </div>`;
};

export const verifiedMail = (team: Partial<GetTeamDTO>) => {
  return `<div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>Bit Battles Registration Verification</h2>
    <p>Dear ${team.team_name},</p>
    <p>Your registration has been successfully verified for <strong>Bit Battles</strong></p>
   
    <p>If you have any questions, feel free to <a href="mailto:${process.env.MAIL_USER}">contact us</a>.</p>
    <p>Best Regards,<br />BUCC R&D Team</p>
  </div>`;
};

import { GetTeamDTO } from "@/types";

export const registeredMail = (team: Partial<GetTeamDTO>) => {
  return `<div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>Bit Battles Registration Confirmation</h2>
    <p>Dear ${team.team_name},</p>
    <p>Your team has been successfully registered for BitBattles. We’re excited to have you participate in this thrilling competition of logic, speed, and code!</p>
    <p>Here are your team details for confirmation:</p>
    
      <p><strong>Team Name:</strong> ${team.team_name} <br/>
      <strong>Team Leader Name:</strong> ${
        team.members &&
        `${team.members[0].name} - ${team.members[0].studentId} - ${team.members[0].gsuiteEmail}`
      }
      <br/>
      <strong>Team Members:</strong><br/>
      
      ${
        team.members && team.members.length > 1
          ? team.members
              .slice(1)
              .map(
                (member, i) =>
                  `• ${member.name} - ${member.studentId} - ${member.gsuiteEmail}</br>`
              )
              .join("\n")
          : ""
      }
      
      </p>
    <p>Please keep an eye on your inbox and on our official Facebook Page as we’ll be sharing important updates soon. Please make sure all team members are available on the event date and are familiar with the rules.</p>

    <p>If any of the above details are incorrect, kindly "Reply All" to this email with the corrected information by [deadline date].</p>

    <p>Get ready to battle it out with the best. We look forward to your participation. Best of luck!</p>
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

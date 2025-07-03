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
                (member) =>
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

    <p>We are pleased to inform you that your team’s registration for BitBattles has been successfully verified. You are now officially confirmed as participants in this exciting competition of logic, speed, and code!</p>

    <p>Here are your verified team details for your records:</p>

    <p>
    <strong>Team Name:</strong><br/>
    ${team.team_name}
    </p>

    ${
      team.members &&
      team.members?.length > 0 &&
      `<p>
    <strong>Team Leader:</strong><br/>
${team.members[0].name} – ${team.members[0].studentId} – ${team.members[0].gsuiteEmail}
    </p>`
    }
   
    ${
      team.members && team.members?.length > 1
        ? `<p>
    <strong>Team Members:</strong>
    ${
      team.members && team.members.length > 1
        ? team.members
            .slice(1)
            .map(
              (member) =>
                `• ${member.name} - ${member.studentId} - ${member.gsuiteEmail}</br>`
            )
            .join("\n")
        : ""
    }
    </p>`
        : ""
    }
   
    <p>✅ What’s Next?</p>

    <p>You will soon receive further instructions regarding the competition schedule, rules, and any other materials you might need.</p>

    <p>Keep an eye on your email and our official Facebook Page for all updates.</p>

    <p>Make sure all team members are ready on the event day.</p>

    <p>If you notice any errors in the details above, please "Reply All" to this email immediately so we can update our records.</p>

    <p>We’re thrilled to have you competing in BitBattles and can’t wait to see your team in action.</p>

    <p>Get ready. Get set. Code!</p>

  </div>`;
};

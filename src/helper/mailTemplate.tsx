import { GetTeamDTO } from "@/types";

export const registeredMail = (team: Partial<GetTeamDTO>) => {
  return `<div dir="ltr">
    <font size="4">
      Dear&nbsp;<b>${team.team_name}</b>,<br><br>
      Your team has been&nbsp;<b>successfully registered</b>&nbsp;for&nbsp;<b>BUCC</b>&nbsp;<b>Bit Battles</b>. We're excited to have you participate in this thrilling competition of logic, speed, and code!<br><br>
      Here are your team details for confirmation:<br><br>
      <b>Team Name:</b>&nbsp;${team.team_name}<br>
      <b>Team Leader:</b>&nbsp;${
        team.members && team.members.length > 0
          ? `${team.members[0].name} – ${team.members[0].studentId} – ${team.members[0].gsuiteEmail}`
          : ""
      }<br>
      <b>Team Members:</b><br>
      ${
        team.members && team.members.length > 1
          ? team.members
              .slice(1)
              .map(
                (member) =>
                  `• ${member.name} – ${member.studentId} – ${member.gsuiteEmail}<br>`
              )
              .join("")
          : ""
      }<br>
      Please keep an eye on your&nbsp;<b>inbox</b>&nbsp;and on our&nbsp;<b><a href="https://www.facebook.com/BRACUCC/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/BRACUCC/&amp;source=gmail&amp;ust=1751655787242000&amp;usg=AOvVaw3qyoYX3gZhjZGrqReEgRqq">official Facebook Page</a></b>&nbsp;as we'll be sharing important updates soon. Please make sure all team members are available on the event date and are familiar with the rules.
    </font>
    <div><font size="4"><br></font></div>
    <div>
      <font size="4">
        You can also join our Discord server for frequent communication:&nbsp;<b><a href="https://discord.com/invite/Jxc7p8esCK" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://discord.com/invite/Jxc7p8esCK&amp;source=gmail&amp;ust=1751655787242000&amp;usg=AOvVaw3o0asozSVV5-UmwKbvz_Xg">https://discord.com/invite/Jxc7p8esCK</a></b><br><br>
        If any of the above details are incorrect, kindly<b>&nbsp;"Reply All"&nbsp;</b>to this email with the corrected information by&nbsp;<font color="#ff0000"><b>9th July, 2025</b></font>.<br><br>
        Get ready to battle it out with the best. We look forward to your participation. Best of luck!
      </font>
    </div>
    <font color="#888888">
      <div><br></div>
      <div><br></div>
      <span class="gmail_signature_prefix">--</span><br>
      <div dir="ltr" class="gmail_signature">
        <div dir="ltr">
          <div><b><font color="#999999">Best Regards,</font></b><b><font color="#666666"></font></b></div>
          <div><b><font size="4" color="#666666">BRAC University Computer Club</font></b></div>
          <div><font color="#999999"><b>BRAC University</b></font></div>
        </div>
      </div>
    </font>
    <img width="0" height="0" alt="" style="display:flex" src="https://ci3.googleusercontent.com/meips/ADKq_Nbu6vBpzWT5LbcpgcGP9sEvNXtQoFCN5z2pYvZ4b6QvAvTHpCvCeEdPm6TZtj3mnC88GauDPJjrgta8XpwjxfEHt4CjxMTTgt_qsPl_USwd23wu1iKUBWJK2i5T8_1TUJFWhNlNBIWA4aGEQEI=s0-d-e1-ft#https://mailtrack.io/trace/mail/867f5b6d1848bc9e870715de1c20fb45474a6033.png?u=12457730" class="CToWUd" data-bit="iit" jslog="138226; u014N:xr6bB; 53:WzAsMl0.">
  </div>`;
};

export const verifiedMail = (team: Partial<GetTeamDTO>) => {
  return `<div dir="ltr">
    <p>Dear&nbsp;<strong>${team.team_name}</strong>,</p>
    <p>We are pleased to inform you that your team's registration for&nbsp;<b>BUCC</b>&nbsp;<strong>Bit Battles</strong>&nbsp;has been&nbsp;<strong>successfully verified your&nbsp;payment</strong>. You are now officially confirmed as participants in this exciting competition of logic, speed, and code!</p>
    <p>Here are your verified team details for your records:</p>
    <p><strong>Team Name:</strong><br>${team.team_name}</p>
    
    ${
      team.members && team.members?.length > 0
        ? `<p><strong>Team Leader:</strong><br>
${team.members[0].name} – ${team.members[0].studentId} – ${team.members[0].gsuiteEmail}</p>`
        : ""
    }
    
    ${
      team.members && team.members?.length > 1
        ? `<p><strong>Team Members:</strong><br>
${team.members
  .slice(1)
  .map(
    (member) =>
      `• ${member.name} – ${member.studentId} – ${member.gsuiteEmail}<br>`
  )
  .join("")}
</p>`
        : ""
    }
    
    <p>✅&nbsp;<strong>What's Next?</strong></p>
    <ul>
      <li style="margin-left:15px"><p>You will soon receive further instructions regarding the competition schedule, rules, and any preparatory materials.</p></li>
      <li style="margin-left:15px"><p>Keep an eye on your email and our&nbsp;<b><a href="https://www.facebook.com/BRACUCC/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/BRACUCC/&amp;source=gmail&amp;ust=1751654874644000&amp;usg=AOvVaw3RspXKsi1WUQE4u_Ybf__o">official Facebook Page</a></b>&nbsp;for all updates.</p></li>
      <li style="margin-left:15px"><p>Make sure all team members are ready on the event day.</p></li>
    </ul>
    <div>You can also join our discord server for frequent communication:&nbsp;<a href="https://discord.com/invite/Jxc7p8esCK" target="_blank" data-saferedirecturl="https://discord.com/invite/Jxc7p8esCK">https://discord.com/invite/Jxc7p8esCK</a></div>
    <p>If you notice any errors in the details above, please&nbsp;<strong>reply to this email immediately</strong>&nbsp;with the correct information by&nbsp;<b style="color:rgb(255,0,0)">9th July, 2025</b>&nbsp;so we can update our records.</p>
    <p>We're thrilled to have you competing in BitBattles and can't wait to see your team in action.</p>
    <p><strong>Get ready. Get set. Code!</strong></p>
    <font color="#888888"><div><br></div><span class="gmail_signature_prefix">--</span><br><div dir="ltr" class="gmail_signature"><div dir="ltr"><div><b><font color="#999999">Best Regards,</font></b><b><font color="#666666"></font></b></div><div><b><font size="4" color="#666666">BRAC University Computer Club</font></b></div><div><font color="#999999"><b>BRAC University</b></font></div></div></div></font>
  </div>`;
};

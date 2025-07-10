import { FlattenedTeam, TeamCSV } from "@/types";

export function flattenTeamData(teams: TeamCSV[]): FlattenedTeam[] {
  return teams.map((team) => {
    const paymentInfo = team.payment_info || {};

    const flattened: FlattenedTeam = {
      // Initialize with all possible fields
      created_at: team.created_at,
      team_name: team.team_name,
      payment_verified: team.payment_verified,
      // Payment info
      payment_method: paymentInfo.method || "",
      payment_transactionId: paymentInfo.transactionId || "",
      payment_bankName: paymentInfo.bankName || "",
      payment_accountNumber: paymentInfo.accountNumber || "",
      payment_bkashNumber: paymentInfo.bkashNumber || "",
      payment_notes: paymentInfo.notes || "",
      // Initialize all member fields with empty strings
      member_1_id: "",
      member_1_name: "",
      member_1_semester: "",
      member_1_department: "",
      member_1_studentId: "",
      member_1_gsuiteEmail: "",
      member_1_personalEmail: "",
      member_1_phoneNumber: "",
      member_2_id: "",
      member_2_name: "",
      member_2_semester: "",
      member_2_department: "",
      member_2_studentId: "",
      member_2_gsuiteEmail: "",
      member_2_personalEmail: "",
      member_2_phoneNumber: "",
      member_3_id: "",
      member_3_name: "",
      member_3_semester: "",
      member_3_department: "",
      member_3_studentId: "",
      member_3_gsuiteEmail: "",
      member_3_personalEmail: "",
      member_3_phoneNumber: "",
    };

    // Fill in available member data
    if (team.members && team.members.length > 0) {
      // Member 1
      if (team.members[0]) {
        const m1 = team.members[0];
        flattened.member_1_id = m1.id || "";
        flattened.member_1_name = m1.name || "";
        flattened.member_1_semester = m1.semester || "";
        flattened.member_1_department = m1.department || "";
        flattened.member_1_studentId = m1.studentId || "";
        flattened.member_1_gsuiteEmail = m1.gsuiteEmail || "";
        flattened.member_1_personalEmail = m1.personalEmail || "";
        flattened.member_1_phoneNumber = m1.phoneNumber || "";
      }

      // Member 2
      if (team.members[1]) {
        const m2 = team.members[1];
        flattened.member_2_id = m2.id || "";
        flattened.member_2_name = m2.name || "";
        flattened.member_2_semester = m2.semester || "";
        flattened.member_2_department = m2.department || "";
        flattened.member_2_studentId = m2.studentId || "";
        flattened.member_2_gsuiteEmail = m2.gsuiteEmail || "";
        flattened.member_2_personalEmail = m2.personalEmail || "";
        flattened.member_2_phoneNumber = m2.phoneNumber || "";
      }

      // Member 3
      if (team.members[2]) {
        const m3 = team.members[2];
        flattened.member_3_id = m3.id || "";
        flattened.member_3_name = m3.name || "";
        flattened.member_3_semester = m3.semester || "";
        flattened.member_3_department = m3.department || "";
        flattened.member_3_studentId = m3.studentId || "";
        flattened.member_3_gsuiteEmail = m3.gsuiteEmail || "";
        flattened.member_3_personalEmail = m3.personalEmail || "";
        flattened.member_3_phoneNumber = m3.phoneNumber || "";
      }
    }

    return flattened;
  });
}

export function convertToCSV(data: FlattenedTeam[]): string {
  if (data.length === 0) return "";

  // Define fixed headers in specific order
  const headers = [
    "created_at",
    "team_name",
    "payment_verified",
    "payment_method",
    "payment_transactionId",
    "payment_notes",
    "payment_bankName",
    "payment_accountNumber",
    "payment_bkashNumber",
    // Member 1
    "member_1_id",
    "member_1_name",
    "member_1_semester",
    "member_1_department",
    "member_1_studentId",
    "member_1_gsuiteEmail",
    "member_1_personalEmail",
    "member_1_phoneNumber",
    // Member 2
    "member_2_id",
    "member_2_name",
    "member_2_semester",
    "member_2_department",
    "member_2_studentId",
    "member_2_gsuiteEmail",
    "member_2_personalEmail",
    "member_2_phoneNumber",
    // Member 3
    "member_3_id",
    "member_3_name",
    "member_3_semester",
    "member_3_department",
    "member_3_studentId",
    "member_3_gsuiteEmail",
    "member_3_personalEmail",
    "member_3_phoneNumber",
  ];

  const rows = data.map((obj) =>
    headers
      .map((header) => sanitizeValue(obj[header as keyof FlattenedTeam]))
      .join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}

const sanitizeValue = (value: string | boolean | undefined): string => {
  if (value === undefined || value === null) return "";

  // Convert boolean to string
  if (typeof value === "boolean") return value ? "TRUE" : "FALSE";

  // Convert to string and handle line breaks
  let stringValue = String(value);

  // Replace line breaks with spaces or special marker
  stringValue = stringValue.replace(/\r?\n|\r/g, " ");

  // Escape quotes and wrap in quotes if contains comma or quote
  if (stringValue.includes(",") || stringValue.includes('"')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
};

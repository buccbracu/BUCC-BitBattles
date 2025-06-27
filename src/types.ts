export interface Team {
  teamName: string;
  teamLeaderName: string;
  members: TeamMember[];
  bkash: string;
  transactionId: string;
}

export interface TeamMember {
  id: string;
  name: string;
  studentId: string;
  semester: string;
  department: string;
  gsuiteEmail: string;
  personalEmail: string;
  phoneNumber: string;
}

export interface SupabaseResponse {
  error?: string;
  success: boolean;
}

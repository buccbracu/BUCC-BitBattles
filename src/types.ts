export interface Team {
  id: string;
  teamName: string;
  members: TeamMember[];
  bkash: string;
  transactionId: string;
  createdAt: string;
  paymentVerified: boolean;
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

export type GetTeamDTO = {
  created_at: string;
  team_name: string;
  members: TeamMember[];
  bkash: string;
  transaction_id: string;
  payment_verified: boolean;
};
export type AddTeamDTO = Omit<Team, "id" | "createdAt" | "paymentVerified">;
export type UpdateTeamDTO = { id: string; paymentVerified: boolean };

export interface SupabaseResponse<T = unknown> {
  error?: string;
  success: boolean;
  payload?: T;
}

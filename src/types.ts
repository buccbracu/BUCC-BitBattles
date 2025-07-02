export enum PaymentMethod {
  Bkash = "bkash",
  Bank = "bank",
  BkashToBank = "bkash-to-bank",
}

export interface PaymentData {
  method: string;
  bkashNumber?: string;
  bankName?: string;
  accountNumber?: string;
  phoneNumber?: string;
  transactionId: string;
  notes?: string;
}

export interface Team {
  id: string;
  teamName: string;
  members: TeamMember[];
  paymentInfo: PaymentData;
  paymentVerified: boolean;
  createdAt: string;
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
  id: string;
  team_name: string;
  created_at: string;
  members: TeamMember[];
  payment_info: PaymentData;
  payment_verified: boolean;
};
export type AddTeamDTO = Omit<Team, "id" | "createdAt" | "paymentVerified">;
export type UpdateTeamDTO = { id: string; paymentVerified: boolean };

export interface SupabaseResponse<T = unknown> {
  error?: string;
  success: boolean;
  payload?: T;
}

export enum EmailType {
  REGISTERED,
  VERIFIED,
}

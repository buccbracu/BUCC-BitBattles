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

// types/team.ts
export interface TeamMember {
  id: string;
  name: string;
  semester: string;
  department: string;
  studentId: string;
  gsuiteEmail: string;
  personalEmail: string;
  phoneNumber: string;
}

interface BasePaymentInfo {
  notes?: string;
  method: PaymentMethod;
  transactionId: string;
}

interface BkashPaymentInfo extends BasePaymentInfo {
  method: PaymentMethod.Bkash | PaymentMethod.BkashToBank;
  bkashNumber: string;
  bankName?: never;
  accountNumber?: never;
}

interface BankPaymentInfo extends BasePaymentInfo {
  method: PaymentMethod.Bank;
  bankName: string;
  accountNumber: string;
  bkashNumber?: never;
}

export type PaymentInfo = BkashPaymentInfo | BankPaymentInfo;

export interface TeamCSV {
  created_at: string;
  team_name: string;
  members: [TeamMember, TeamMember?, TeamMember?]; // 1-3 members
  payment_info: PaymentInfo;
  payment_verified: boolean;
}

export interface FlattenedTeam {
  created_at: string;
  team_name: string;
  payment_verified: boolean;
  payment_method: PaymentMethod;
  payment_transactionId: string;
  payment_notes?: string;
  payment_bankName?: string;
  payment_accountNumber?: string;
  payment_bkashNumber?: string;
  // Member fields (1-3 members)
  member_1_id: string;
  member_1_name: string;
  member_1_semester: string;
  member_1_department: string;
  member_1_studentId: string;
  member_1_gsuiteEmail: string;
  member_1_personalEmail: string;
  member_1_phoneNumber: string;
  member_2_id?: string;
  member_2_name?: string;
  member_2_semester?: string;
  member_2_department?: string;
  member_2_studentId?: string;
  member_2_gsuiteEmail?: string;
  member_2_personalEmail?: string;
  member_2_phoneNumber?: string;
  member_3_id?: string;
  member_3_name?: string;
  member_3_semester?: string;
  member_3_department?: string;
  member_3_studentId?: string;
  member_3_gsuiteEmail?: string;
  member_3_personalEmail?: string;
  member_3_phoneNumber?: string;
}

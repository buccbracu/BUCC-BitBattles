"use server";

import {
  AddTeamDTO,
  EmailType,
  GetTeamDTO,
  SupabaseResponse,
  Team,
} from "@/types";
import { supabase } from "./supabase/client";
// import { revalidatePath } from "next/cache";
import { send } from "./mailer";

export const login = async (pin: string) => pin === process.env.ADMIN_PIN;

export const getTeams = async (): Promise<SupabaseResponse<Team[]>> => {
  const { data, error } = await supabase
    .from("preliminary-round")
    .select()
    .order("created_at", { ascending: false });

  if (error) return { success: false, error: error.message };

  const formattedData: Team[] = data.map((team) => ({
    id: team.id,
    createdAt: team.created_at,
    teamName: team.team_name,
    members: team.members,
    paymentInfo: team.payment_info,
    paymentVerified: team.payment_verified,
    paymentMethod: team.payment_method,
  }));
  return { success: true, payload: formattedData };
};

export const addTeam = async (team: AddTeamDTO): Promise<SupabaseResponse> => {
  // Team with the same name exists
  const { data, error: _error } = await supabase
    .from("preliminary-round")
    .select()
    .eq("team_name", team.teamName);

  if (_error) return { error: _error.message, success: false };

  if (data?.length && data.length > 0)
    return {
      error:
        "Team with this name already exists. Please choose a different name.",
      success: false,
    };

  // Email check
  const newMemberEmails = team.members.map((member) => member.gsuiteEmail);

  const { data: allTeams, error: membersError } = await supabase
    .from("preliminary-round")
    .select("members");

  if (membersError) return { error: membersError.message, success: false };

  if (allTeams) {
    const isDuplicateMember = (allTeams as GetTeamDTO[]).some((team) =>
      team.members.some((member) =>
        newMemberEmails.includes(member.gsuiteEmail)
      )
    );

    if (isDuplicateMember) {
      return {
        success: false,
        error: "A member cannot register for multiple teams.",
      };
    }
  }

  const dataToInsert: Partial<GetTeamDTO> = {
    team_name: team.teamName,
    members: team.members,
    payment_info: team.paymentInfo,
  };

  const { error } = await supabase
    .from("preliminary-round")
    .insert(dataToInsert);

  if (error) return { error: error.message, success: false };

  await send(dataToInsert, EmailType.REGISTERED);

  // revalidatePath("/bitbattles-dashboard");

  return {
    error: "",
    success: true,
  };
};

export const updateTeam = async (teamId: string): Promise<SupabaseResponse> => {
  const { data, error: _error } = await supabase
    .from("preliminary-round")
    .select()
    .eq("id", teamId);

  if (_error) return { error: _error.message, success: false };

  if (data?.length && data.length == 0)
    return {
      error: "Invalid Team ID",
      success: false,
    };

  const { error } = await supabase
    .from("preliminary-round")
    .update({ payment_verified: true })
    .eq("id", teamId);

  if (error) return { error: error.message, success: false };
  await send(data[0], EmailType.VERIFIED);

  // revalidatePath("/bitbattles-dashboard");

  return {
    error: "",
    success: true,
  };
};

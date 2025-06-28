"use server";

import { AddTeamDTO, SupabaseResponse, Team } from "@/types";
import { supabase } from "./supabase/client";
import { revalidatePath } from "next/cache";

export const getTeams = async (): Promise<SupabaseResponse<Team[]>> => {
  const { data, error } = await supabase
    .from("preliminary-round")
    .select()
    .order("created_at", { ascending: false });
  if (error) return { success: false, error: error.message };

  const formattedData: Team[] = data.map((member) => ({
    id: member.id,
    createdAt: member.created_at,
    teamName: member.team_name,
    members: member.members,
    bkash: member.bkash,
    transactionId: member.transaction_id,
    paymentVerified: member.payment_verified,
  }));
  return { success: true, payload: formattedData };
};

export const addTeam = async (team: AddTeamDTO): Promise<SupabaseResponse> => {
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

  const { error } = await supabase.from("preliminary-round").insert({
    team_name: team.teamName,
    members: team.members,
    bkash: team.bkash,
    transaction_id: team.transactionId,
  });

  if (error) return { error: error.message, success: false };

  revalidatePath("/dashboard");

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

  console.log("loadded", data, teamId);

  const { error } = await supabase
    .from("preliminary-round")
    .update({ payment_verified: true })
    .eq("id", teamId);

  if (error) return { error: error.message, success: false };

  revalidatePath("/dashboard");
  return {
    error: "",
    success: true,
  };
};

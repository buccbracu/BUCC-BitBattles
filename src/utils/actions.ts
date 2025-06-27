import { SupabaseResponse, Team } from "@/types";
import { supabase } from "./supabase";

export const addTeam = async (team: Team): Promise<SupabaseResponse> => {
  const teamExists = await supabase
    .from("preliminary-round")
    .select("team_name")
    .eq("team_name", team.teamName);

  if (teamExists)
    return {
      error:
        "Team with this name already exists. Please choose a different name.",
      success: false,
    };

  const { error } = await supabase.from("preliminary-round").insert({
    team_name: team.teamName,
    team_leader_name: team.teamLeaderName,
    members: team.members,
    bkash: team.bkash,
    transaction_id: team.transactionId,
  });

  if (error) return { error: error.message, success: false };

  return {
    error: "",
    success: true,
  };
};

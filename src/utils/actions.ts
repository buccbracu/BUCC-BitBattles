import { SupabaseResponse, Team } from "@/types";
import { supabase } from "./supabase";

export const addTeam = async (team: Team): Promise<SupabaseResponse> => {
  const { data, error: _error } = await supabase
    .from("preliminary-round")
    .select()
    .eq("team_name", team.teamName);

  if (_error) return { error: _error.message, success: false };
  console.log(data, _error);

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

  return {
    error: "",
    success: true,
  };
};

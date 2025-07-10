import { convertToCSV, flattenTeamData } from "@/helper/dataFormatter";
import { supabase } from "@/helper/supabase/client";
import { TeamCSV } from "@/types";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("preliminary-round")
      .select("*");

    if (error) throw error;

    const flattenedData = flattenTeamData((data as TeamCSV[]) || []);
    const csvContent = convertToCSV(flattenedData);

    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=teams_export.csv",
      },
    });
  } catch (error) {
    console.error("Error exporting teams:", error);
    return new Response("Error", { status: 500 });
  }
}

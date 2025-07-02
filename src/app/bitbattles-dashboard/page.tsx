import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CheckCircle, Users } from "lucide-react";
import { getTeams } from "@/helper/actions";
import TeamCard from "@/components/common/TeamCard";

export default async function ContestDashboard() {
  const { payload: teams = [] } = await getTeams();

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 max-sm:px-2">
      <div className="flex items-center justify-between max-md:flex-col">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Contest Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage team registrations and payment verifications
          </p>
        </div>
        <div className="flex gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Total Teams</p>
                <p className="text-2xl font-bold">{teams.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Verified Teams</p>
                <p className="text-2xl font-bold">
                  {teams.filter((team) => team.paymentVerified).length}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Registrations</CardTitle>
          <CardDescription>
            All registered teams. Review payment details and verify payments
            manually.
          </CardDescription>
        </CardHeader>
        <CardContent className="max-sm:px-2">
          <div className="space-y-4">
            {teams.map((team, i) => (
              <TeamCard team={team} key={i} />
            ))}
          </div>
          {teams.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No teams registered yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CheckCircle, Lock, Shield, Users } from "lucide-react";
import { getTeams, login } from "@/helper/actions";
import TeamCard from "@/components/common/TeamCard";
import { useEffect, useState } from "react";
import { Team } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ContestDashboard() {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loggedIn, setloggedIn] = useState(false);
  const [pin, setPin] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { payload } = await getTeams();
      console.log(payload);

      setTeams(payload as Team[]);
      setLoading(false);
    };
    loggedIn && fetchData();
  }, [loggedIn]);

  const handleLogin = async () => {
    const success = await login(pin);
    if (success) {
      setloggedIn(success);
      return;
    }

    setloggedIn(false);
    toast.error("Login failed!!");
  };

  if (!loggedIn) {
    return (
      <div
        className="min-h-screen py-8 px-4 flex items-center justify-center"
        style={{ backgroundColor: "#311c11" }}
      >
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="h-12 w-12 text-amber-500" />
                <Lock className="h-8 w-8 text-amber-400" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                Admin Access Required
              </h1>
              <p className="text-amber-200/70 mt-2">
                Please enter admin credentials to access the registration system
              </p>
            </div>
          </div>

          {/* Login Form */}
          <Card className="bg-amber-950/20 border-amber-800/30 backdrop-blur-sm shadow-2xl">
            <CardHeader className="text-center border-b border-amber-800/30">
              <CardTitle className="text-amber-100">Login</CardTitle>
              <CardDescription className="text-amber-200/70">
                Enter your admin credentials to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-amber-100">
                    Pin
                  </Label>
                  <Input
                    placeholder="Enter pin"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="bg-amber-950/30 border-amber-800/50 text-amber-100 placeholder:text-amber-400/60 focus:border-amber-600 focus:ring-amber-600/20"
                    required
                  />
                </div>

                <Button
                  onClick={handleLogin}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white"
                  disabled={loggedIn}
                >
                  {loggedIn ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Logging in...
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (loading)
    return (
      <div className="w-[100vw] h-[100vh] flex items-center justify-center">
        <h2>Loading...</h2>
      </div>
    );

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

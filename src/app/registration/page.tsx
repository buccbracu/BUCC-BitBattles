"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Users, CreditCard, Trophy } from "lucide-react";
import { toast } from "sonner";
import { addTeam } from "@/helper/actions";
import { TeamMember } from "@/types";
import { InputMask } from "@react-input/mask";

export default function ContestRegistration() {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "",
      studentId: "",
      semester: "",
      department: "",
      gsuiteEmail: "",
      personalEmail: "",
      phoneNumber: "",
    },
  ]);
  const [bkashNumber, setBkashNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addMember = () => {
    if (members.length >= 3) {
      return toast.error("Can't add more member!", {
        description:
          "Each team can have maximum 3 members and minimum 1 member",
      });
    }

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: "",
      studentId: "",
      semester: "",
      department: "",
      gsuiteEmail: "",
      personalEmail: "",
      phoneNumber: "",
    };
    setMembers([...members, newMember]);
  };

  const removeMember = (id: string) => {
    if (members.length > 1) {
      setMembers(members.filter((member) => member.id !== id));
    }
  };

  const updateMember = (id: string, field: keyof TeamMember, value: string) => {
    setMembers(
      members.map((member) =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  const validateForm = () => {
    if (!teamName.trim()) {
      toast.error("Validation Error", {
        description: "Team name is required",
      });
      return false;
    }

    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      if (
        !member.name.trim() ||
        !member.studentId.trim() ||
        !member.semester ||
        !member.department ||
        !member.gsuiteEmail.trim() ||
        !member.personalEmail.trim() ||
        !member.phoneNumber.trim()
      ) {
        toast.error("Validation Error", {
          description: `Please fill all fields for member ${i + 1}`,
        });
        return false;
      }
    }

    if (!bkashNumber.trim()) {
      toast.error("Validation Error", {
        description: "Bkash number is required",
      });
      return false;
    }

    if (!transactionId.trim()) {
      toast.error("Validation Error", {
        description: "Transaction ID is required",
      });
      return false;
    }

    return true;
  };

  const checkEmailMask = (email: string) => {
    console.log(email);
    if (/.+@.+\.[A-Za-z]+$/.test(email)) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log({
      teamName,
      members,
      bkashNumber,
      transactionId,
    });

    members.forEach((member) => {
      if (member.gsuiteEmail.split("@")[1] !== "g.bracu.ac.bd") {
        toast.error("Invalid GSuite Email");
      }
    });

    members.forEach((member) => {
      if (checkEmailMask(member.personalEmail)) {
        toast.error("Invalid Personal Email");
      }
    });

    return;
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const { error } = await addTeam({
      teamName,
      members,
      bkash: bkashNumber,
      transactionId,
    });

    if (error) {
      toast.error(error, {
        description:
          "Something went wrong while registtering, try again after some time.",
      });
      setIsSubmitting(false);
      return;
    }

    toast.success("Registration Successful!", {
      description:
        "Your team has been registered. You will receive a confirmation email shortly.",
    });

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="h-8 w-8 text-yellow-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Programming Contest 2024
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Register your team for the ultimate coding challenge
          </p>
        </div>

        <main className="space-y-8">
          {/* Team Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Information
              </CardTitle>
              <CardDescription>
                Basic information about your team and team leader
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="space-y-2">
                  <Label htmlFor="teamName">Team Name *</Label>
                  <Input
                    id="teamName"
                    placeholder="Enter your team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    Add all team members including the team leader. Each
                    member&apos;s information is required.
                  </CardDescription>
                </div>
                <Badge variant="secondary">
                  {members.length} member{members.length !== 1 ? "s" : ""}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {members.map((member, index) => (
                <div
                  key={member.id}
                  className="border rounded-lg p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">
                      Member{" "}
                      {index + 1 == 1
                        ? `${index + 1} (Team Leader)`
                        : index + 1}
                    </h4>
                    {members.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeMember(member.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name *</Label>
                      <Input
                        placeholder="Enter full name"
                        value={member.name}
                        onChange={(e) =>
                          updateMember(member.id, "name", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Student ID *</Label>

                      <InputMask
                        mask="________"
                        replacement={{ _: /\d/ }}
                        component={Input}
                        value={member.studentId}
                        onChange={(e) =>
                          updateMember(member.id, "studentId", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Semester *</Label>
                      <Input
                        placeholder="Enter semester (e.g., 5th)"
                        value={member.semester}
                        onChange={(e) =>
                          updateMember(member.id, "semester", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Department *</Label>
                      <Input
                        placeholder="Enter department name"
                        value={member.department}
                        onChange={(e) =>
                          updateMember(member.id, "department", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>GSuite Email *</Label>
                      <Input
                        type="email"
                        placeholder="student@g.bracu.ac.bd"
                        value={member.gsuiteEmail}
                        onChange={(e) =>
                          updateMember(member.id, "gsuiteEmail", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Personal Email *</Label>
                      <Input
                        type="email"
                        placeholder="personal@email.com"
                        value={member.personalEmail}
                        onChange={(e) =>
                          updateMember(
                            member.id,
                            "personalEmail",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2 lg:col-span-1">
                      <Label>Phone Number *</Label>

                      <InputMask
                        mask="___________"
                        replacement={{ _: /\d/ }}
                        placeholder="01XXXXXXXXX"
                        component={Input}
                        value={member.phoneNumber}
                        onChange={(e) =>
                          updateMember(member.id, "phoneNumber", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addMember}
                className="w-full bg-transparent"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
              <CardDescription>
                Provide your Bkash payment details for manual verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bkashNumber">Bkash Phone Number *</Label>

                  <InputMask
                    mask="___________"
                    replacement={{ _: /\d/ }}
                    placeholder="01XXXXXXXXX"
                    component={Input}
                    value={bkashNumber}
                    onChange={(e) => setBkashNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transactionId">Transaction ID *</Label>
                  <Input
                    id="transactionId"
                    placeholder="Enter transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Payment Instructions:</strong> Send the registration
                  fee to our official Bkash number and enter the transaction ID
                  above. Your registration will be confirmed after manual
                  verification of the payment.
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="px-8 py-3 text-lg"
            >
              {isSubmitting ? "Registering..." : "Register Team"}
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}

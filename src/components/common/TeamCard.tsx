"use client";

import {
  Eye,
  Phone,
  User,
  GraduationCap,
  Building,
  Mail,
  CheckCircle,
  Loader,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { PaymentData, Team } from "@/types";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { updateTeam } from "@/helper/actions";

interface Props {
  team: Team;
}

export default function TeamCard({ team }: Props) {
  const handleVerifyTeam = async () => {
    toast.info("Verifying...", { icon: <Loader /> });
    const { error } = await updateTeam(team.id);
    if (error)
      return toast.error(error, {
        description: "Something went wrong while verifying the payment!",
      });
    toast.success("Team Verified", {
      description: "Payment has been verified and team is now approved.",
    });
  };
  return (
    <Card key={team.id} className="border">
      <CardContent className="">
        {/* Mobile Layout */}
        <div className="flex flex-col space-y-4 sm:hidden">
          <div>
            <h3 className="font-semibold text-lg">{team.teamName}</h3>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Payment Information
            </p>
            <div className="space-y-1">
              <div className="font-mono text-sm font-semibold text-blue-600">
                {team.paymentInfo.bkashNumber ||
                  team.paymentInfo.phoneNumber ||
                  team.paymentInfo.accountNumber}
              </div>
              <div className="font-mono text-sm font-medium text-green-600">
                {team.paymentInfo.transactionId}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{team.teamName} - Team Details</DialogTitle>
                  <DialogDescription>
                    Complete team information and payment details
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">
                        Payment Information
                      </h4>
                      <div className="space-y-2">
                        {Object.keys(team.paymentInfo).map((key) => (
                          <div className="flex items-center gap-2" key={key}>
                            <Phone className="h-4 w-4" />
                            <span className="text-sm">
                              Info: {team.paymentInfo[key as keyof PaymentData]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Registration Info</h4>
                      <div className="space-y-2">
                        <div className="text-sm">Date: {team.createdAt}</div>
                        <div className="text-sm">
                          Members: {team.members.length}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-4">Team Members</h4>
                    <div className="space-y-4">
                      {team.members.map((member, index) => (
                        <Card
                          key={index}
                          className={
                            index == 0 ? "border-blue-200 bg-blue-50" : ""
                          }
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="font-medium flex items-center gap-2">
                                {member.name}
                                {index === 0 && (
                                  <Badge variant="default">Team Leader</Badge>
                                )}
                              </h5>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <User className="h-3 w-3" />
                                  <span>ID: {member.id}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <GraduationCap className="h-3 w-3" />
                                  <span>Semester: {member.semester}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Building className="h-3 w-3" />
                                  <span>Department: {member.department}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Mail className="h-3 w-3" />
                                  <span>GSuite: {member.gsuiteEmail}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="h-3 w-3" />
                                  <span>Personal: {member.personalEmail}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-3 w-3" />
                                  <span>Phone: {member.phoneNumber}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              onClick={() => handleVerifyTeam()}
              size="sm"
              disabled={team.paymentVerified}
              className={`flex-1 ${
                team.paymentVerified
                  ? "bg-green-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {team.paymentVerified ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Verified
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Verify
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:grid sm:grid-cols-4 sm:gap-6 sm:items-center">
          <div>
            <h3 className="font-semibold text-lg">{team.teamName}</h3>
          </div>
          <div>
            <div className="space-y-1">
              <div className="font-mono font-semibold text-blue-600">
                {team.paymentInfo.bkashNumber ||
                  team.paymentInfo.phoneNumber ||
                  team.paymentInfo.accountNumber}
              </div>
              <div className="font-mono font-medium text-green-600">
                {team.paymentInfo.transactionId}
              </div>
            </div>
          </div>
          <div className="text-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{team.teamName} - Team Details</DialogTitle>
                  <DialogDescription>
                    Complete team information and payment details
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">
                        Payment Information
                      </h4>
                      <div className="space-y-2">
                        {Object.keys(team.paymentInfo).map((key) => (
                          <div className="flex items-center gap-2" key={key}>
                            <span className="text-sm">
                              {key[0].toUpperCase() + key.slice(1, key.length)}:{" "}
                              {team.paymentInfo[key as keyof PaymentData]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Registration Info</h4>
                      <div className="space-y-2">
                        <div className="text-sm">Date: {team.createdAt}</div>
                        <div className="text-sm">
                          Members: {team.members.length}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-4">Team Members</h4>
                    <div className="space-y-4">
                      {team.members.map((member, index) => (
                        <Card
                          key={index}
                          className={
                            index === 0 ? "border-blue-200 bg-blue-50" : ""
                          }
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="font-medium flex items-center gap-2">
                                {member.name}
                                {index === 0 && (
                                  <Badge variant="default">Team Leader</Badge>
                                )}
                              </h5>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <User className="h-3 w-3" />
                                  <span>ID: {member.id}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <GraduationCap className="h-3 w-3" />
                                  <span>Semester: {member.semester}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Building className="h-3 w-3" />
                                  <span>Department: {member.department}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Mail className="h-3 w-3" />
                                  <span>GSuite: {member.gsuiteEmail}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="h-3 w-3" />
                                  <span>Personal: {member.personalEmail}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-3 w-3" />
                                  <span>Phone: {member.phoneNumber}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="text-center">
            <Button
              onClick={() => handleVerifyTeam()}
              size="sm"
              disabled={team.paymentVerified}
              className={
                team.paymentVerified
                  ? "bg-green-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }
            >
              {team.paymentVerified ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Verified
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Verify
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

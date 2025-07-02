"use client";

import type React from "react";
import { AnimatedBackground } from "animated-backgrounds";
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
import {
  Plus,
  Trash2,
  Users,
  CreditCard,
  Trophy,
  Zap,
  Code2,
} from "lucide-react";
import { toast } from "sonner";
import { addTeam } from "@/helper/actions";
import { PaymentData, TeamMember } from "@/types";
import { InputMask } from "@react-input/mask";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const departments = [
  { name: "Anthropology", initial: "ANT" },
  { name: "Applied Physics & Electronics", initial: "APE" },
  { name: "Architecture", initial: "ARC" },
  { name: "Biotechnology", initial: "BIO" },
  { name: "Business Administration", initial: "BBA" },
  { name: "Economics", initial: "ECO" },
  { name: "English", initial: "ENH" },
  { name: "Computer Science (CS)", initial: "CS" },
  { name: "Computer Science & Engineering (CSE)", initial: "CSE" },
  { name: "Electronic And Communication Engineering", initial: "ECE" },
  { name: "Electrical And Electronic Engineering", initial: "EEE" },
  { name: "Laws", initial: "LLB" },
  { name: "Mathematics", initial: "MAT" },
  { name: "Microbiology", initial: "MIC" },
  { name: "Pharmacy", initial: "PRH" },
  { name: "Physics", initial: "PHY" },
].map((el) => el.name);

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
  const [paymentData, setPaymentData] = useState<PaymentData>({
    method: "",
    transactionId: "",
  });
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

  const updatePaymentData = (field: keyof PaymentData, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentData((prev) => ({
      method,
      transactionId: prev.transactionId,
      notes: prev.notes,
    }));
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

      const isAllNumbers = /^\d+$/.test(member.studentId);

      const isValidLength =
        member.studentId.length === 8 || member.studentId.length === 10;

      if (!(isAllNumbers && isValidLength)) {
        toast.error("Validation Error", {
          description: "Student ID has to be a number with a length of 8 or 10",
        });
        return false;
      }
    }

    if (!paymentData.method) {
      toast.error("Validation Error", {
        description: "Please select a payment method",
      });
      return false;
    }

    if (!paymentData.transactionId.trim()) {
      toast.error("Validation Error", {
        description: "Transaction ID is required",
      });
      return false;
    }

    // Validate payment method specific fields
    if (paymentData.method === "bkash" && !paymentData.bkashNumber?.trim()) {
      toast.error("Validation Error", {
        description: "Bkash number is required",
      });
      return false;
    }

    if (paymentData.method === "bank") {
      if (!paymentData.bankName?.trim() || !paymentData.accountNumber?.trim()) {
        toast.error("Validation Error", {
          description: "Bank name and account name are required",
        });
        return false;
      }
    }

    if (
      paymentData.method === "bkash-to-bank" &&
      !paymentData.phoneNumber?.trim()
    ) {
      toast.error("Validation Error", {
        description: "Phone number is required",
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

  const renderPaymentFields = () => {
    switch (paymentData.method) {
      case "bkash":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bkashNumber">Bkash Phone Number *</Label>

              <InputMask
                mask="___________"
                replacement={{ _: /\d/ }}
                placeholder="01XXXXXXXXX"
                component={Input}
                value={paymentData.bkashNumber || ""}
                onChange={(e) =>
                  updatePaymentData("bkashNumber", e.target.value)
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transactionId">Transaction ID *</Label>
              <Input
                id="transactionId"
                placeholder="Enter transaction ID"
                value={paymentData.transactionId}
                onChange={(e) =>
                  updatePaymentData("transactionId", e.target.value)
                }
                required
              />
            </div>
          </div>
        );

      case "bank":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name *</Label>
              <Input
                id="bankName"
                placeholder="Enter bank name"
                value={paymentData.bankName || ""}
                onChange={(e) => updatePaymentData("bankName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountName">Account Number *</Label>
              <Input
                id="accountName"
                placeholder="Enter account holder name"
                value={paymentData.accountNumber || ""}
                onChange={(e) =>
                  updatePaymentData("accountNumber", e.target.value)
                }
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="transactionId">Transaction ID *</Label>
              <Input
                id="transactionId"
                placeholder="Enter transaction ID"
                value={paymentData.transactionId}
                onChange={(e) =>
                  updatePaymentData("transactionId", e.target.value)
                }
                required
              />
            </div>
          </div>
        );

      case "bkash-to-bank":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number *</Label>

              <InputMask
                mask="___________"
                replacement={{ _: /\d/ }}
                placeholder="01XXXXXXXXX"
                component={Input}
                value={paymentData.phoneNumber || ""}
                onChange={(e) =>
                  updatePaymentData("phoneNumber", e.target.value)
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transactionId">Transaction ID *</Label>
              <Input
                id="transactionId"
                placeholder="Enter transaction ID"
                value={paymentData.transactionId}
                onChange={(e) =>
                  updatePaymentData("transactionId", e.target.value)
                }
                required
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const { error } = await addTeam({
      teamName,
      members,
      paymentInfo: paymentData,
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
    <main>
      <AnimatedBackground animationName="matrixRain" />
      <div
        className="min-h-screen py-8 px-4"
        style={{ backgroundColor: "#311c11CC" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="relative mb-8">
              {/* Decorative elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
              </div>

              {/* Main trophy and icons */}
              <div className="relative flex items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Code2 className="h-8 w-8 text-amber-400 animate-pulse" />
                  <Zap className="h-6 w-6 text-orange-400" />
                </div>

                <div className="relative">
                  <Trophy className="h-16 w-16 text-amber-500 drop-shadow-2xl" />
                  <div className="absolute inset-0 h-16 w-16 bg-amber-500/30 rounded-full blur-xl animate-pulse"></div>
                </div>

                <div className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-orange-400" />
                  <Code2 className="h-8 w-8 text-amber-400 animate-pulse" />
                </div>
              </div>

              {/* Main heading */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent leading-tight tracking-tight">
                  BUCC Bit Battles: Intra BRAC University
                </h1>
                <h2 className="text-3xl md:text-5xl pb-2 font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  Programming Contest
                </h2>
              </div>

              {/* Decorative line */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="w-16 h-1 bg-gradient-to-r from-transparent to-amber-500 rounded-full"></div>
                <div className="w-8 h-8 border-2 border-amber-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                </div>
                <div className="w-16 h-1 bg-gradient-to-l from-transparent to-amber-500 rounded-full"></div>
              </div>

              {/* Subtitle */}
              <p className="text-xl text-amber-200/80 font-light mt-6 tracking-wide">
                Register your team for the ultimate coding challenge
              </p>
            </div>
          </div>

          <main className="space-y-8">
            {/* Team Information */}
            <Card className="bg-amber-950/20 border-amber-800/30 backdrop-blur-sm shadow-2xl">
              <CardHeader className="border-b border-amber-800/30">
                <CardTitle className="flex items-center gap-2 text-amber-100">
                  <Users className="h-5 w-5 text-amber-400" />
                  Team Information
                </CardTitle>
                <CardDescription className="text-amber-200/70">
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
            <Card className="bg-amber-950/20 border-amber-800/30 backdrop-blur-sm shadow-2xl">
              <CardHeader className="border-b border-amber-800/30">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-amber-100">
                      Team Members
                    </CardTitle>
                    <CardDescription className="text-amber-200/70">
                      Add all team members including the team leader. Each
                      member&apos;s information is required.
                    </CardDescription>
                  </div>
                  <Badge className="bg-amber-600/20 text-amber-300 border-amber-600/30">
                    {members.length} member{members.length !== 1 ? "s" : ""}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {members.map((member, index) => (
                  <div
                    key={member.id}
                    className="border border-amber-800/30 rounded-lg p-4 space-y-4 bg-amber-950/10"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-amber-100">
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
                          className="border-red-600/50 text-red-400 hover:bg-red-600/10 hover:border-red-500 bg-transparent"
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
                          className="bg-amber-950/30 border-amber-800/50 text-amber-100 placeholder:text-amber-400/60 focus:border-amber-600 focus:ring-amber-600/20"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Student ID *</Label>

                        <Input
                          value={member.studentId}
                          onChange={(e) => {
                            updateMember(
                              member.id,
                              "studentId",
                              e.target.value
                            );
                          }}
                          placeholder="XXXXXXXX"
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
                        <Select
                          value={member.department}
                          onValueChange={(value) =>
                            updateMember(member.id, "department", value)
                          }
                        >
                          <SelectTrigger className="bg-amber-950/30 border-amber-800/50 text-amber-100 focus:border-amber-600 focus:ring-amber-600/20 w-full">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent className="bg-amber-950 border-amber-800/50">
                            {departments.map((dept) => (
                              <SelectItem
                                key={dept}
                                value={dept}
                                className="text-amber-100 focus:bg-amber-900/50 focus:text-amber-100"
                              >
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>GSuite Email *</Label>
                        <Input
                          type="email"
                          placeholder="student@g.bracu.ac.bd"
                          value={member.gsuiteEmail}
                          onChange={(e) =>
                            updateMember(
                              member.id,
                              "gsuiteEmail",
                              e.target.value
                            )
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
                            updateMember(
                              member.id,
                              "phoneNumber",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {!(members.length >= 3) && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addMember}
                    className="w-full bg-amber-950/20 border-amber-800/50 text-amber-200 hover:bg-amber-900/30 hover:border-amber-700 hover:text-amber-100"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Team Member
                  </Button>
                )}

                <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                  <p className="text-sm text-red-200">
                    <strong className="text-red-400">Warning:</strong> Please
                    make sure that the provided informations are correct before
                    submitting.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="bg-amber-950/20 border-amber-800/30 backdrop-blur-sm shadow-2xl">
              <CardHeader className="border-b border-amber-800/30">
                <CardTitle className="flex items-center gap-2 text-amber-100">
                  <CreditCard className="h-5 w-5 text-amber-400" />
                  Payment Information
                </CardTitle>
                <CardDescription className="text-amber-200/70">
                  Provide your Bkash payment details for manual verification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Payment Method *</Label>
                    <Select
                      value={paymentData.method}
                      onValueChange={handlePaymentMethodChange}
                    >
                      <SelectTrigger className="bg-amber-950/30 border-amber-800/50 text-amber-100 focus:border-amber-600 focus:ring-amber-600/20 w-full">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent className="bg-amber-950 border-amber-800/50">
                        <SelectItem
                          value="bkash"
                          className="text-amber-100 focus:bg-amber-900/50 focus:text-amber-100"
                        >
                          Bkash
                        </SelectItem>
                        <SelectItem
                          value="bank"
                          className="text-amber-100 focus:bg-amber-900/50 focus:text-amber-100"
                        >
                          Bank Transfer
                        </SelectItem>
                        <SelectItem
                          value="bkash-to-bank"
                          className="text-amber-100 focus:bg-amber-900/50 focus:text-amber-100"
                        >
                          Bkash to Bank
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {paymentData.method && (
                    <div className="bg-amber-900/30 border border-amber-700/40 rounded-lg p-6 space-y-4">
                      <h3 className="text-lg font-semibold text-amber-200 flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Payment Instructions
                      </h3>

                      {paymentData.method === "bkash" && (
                        <div className="space-y-3">
                          <h4 className="font-medium text-amber-300">
                            Bkash Details:
                          </h4>
                          <div className="bg-amber-950/40 rounded-lg p-4 space-y-2">
                            <p className="text-amber-100">
                              <strong className="text-amber-300">
                                Number:
                              </strong>{" "}
                              +8801795204677
                            </p>
                            <p className="text-amber-100">
                              <strong className="text-amber-300">
                                Account Type:
                              </strong>{" "}
                              Personal Account
                            </p>
                            <Image
                              src={"/bkash2.jpg"}
                              alt={"bkash"}
                              width={1344}
                              height={2565}
                              className="w-64 my-4"
                            />
                            <p className="text-sm text-amber-200 bg-amber-800/20 p-2 rounded border-l-4 border-amber-500">
                              <strong>Important:</strong> Use &quot;Send
                              Money&quot; option while sending the money
                            </p>
                          </div>
                        </div>
                      )}

                      {paymentData.method === "bank" && (
                        <div className="space-y-3">
                          <h4 className="font-medium text-amber-300">
                            Bank Details:
                          </h4>
                          <div className="bg-amber-950/40 rounded-lg p-4 space-y-2">
                            <p className="text-amber-100">
                              <strong className="text-amber-300">
                                Account Number:
                              </strong>{" "}
                              1066668710001
                            </p>
                            <p className="text-amber-100">
                              <strong className="text-amber-300">
                                Account Name:
                              </strong>{" "}
                              MD. AFFAN HOSSAIN RAKIB
                            </p>
                            <p className="text-amber-100">
                              <strong className="text-amber-300">
                                Bank Name:
                              </strong>{" "}
                              BRAC Bank PLC
                            </p>
                            <p className="text-amber-100">
                              <strong className="text-amber-300">
                                Branch Name:
                              </strong>{" "}
                              GULSHAN BRANCH
                            </p>
                            <p className="text-amber-100">
                              <strong className="text-amber-300">
                                Routing Number:
                              </strong>{" "}
                              060261726
                            </p>
                            <p className="text-amber-100">
                              <strong className="text-amber-300">
                                SWIFT Code:
                              </strong>{" "}
                              BRAKBDDH
                            </p>
                          </div>
                        </div>
                      )}

                      {paymentData.method === "bkash-to-bank" && (
                        <div className="space-y-4">
                          {/* <div className="space-y-3">
                          <h4 className="font-medium text-amber-300">
                            Step 1: Send to Bkash
                          </h4>
                          <div className="bg-amber-950/40 rounded-lg p-4 space-y-2">
                            <p className="text-amber-100">
                              <strong className="text-amber-300">
                                Bkash Number:
                              </strong>{" "}
                              +8801795204677
                            </p>
                            <p className="text-amber-100">
                              <strong className="text-amber-300">
                                Account Type:
                              </strong>{" "}
                              Personal Account
                            </p>
                            <p className="text-sm text-amber-200 bg-amber-800/20 p-2 rounded border-l-4 border-amber-500">
                              <strong>Important:</strong> Use "Send Money"
                              option while sending the money
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium text-amber-300">
                            Step 2: Bank Account Details
                          </h4>
                          <div className="bg-amber-950/40 rounded-lg p-4 space-y-2">
                            <p className="text-amber-100">
                              <strong className="text-amber-300">
                                Account Number:
                              </strong>{" "}
                              1066668710001
                            </p>
                            <p className="text-amber-100">
                              <strong className="text-amber-300">
                                Account Name:
                              </strong>{" "}
                              MD. AFFAN HOSSAIN RAKIB
                            </p>
                            <p className="text-amber-100">
                              <strong className="text-amber-300">
                                Bank Name:
                              </strong>{" "}
                              BRAC Bank PLC
                            </p>
                            <p className="text-amber-100">
                              <strong className="text-amber-300">
                                Branch Name:
                              </strong>{" "}
                              GULSHAN BRANCH
                            </p>
                          </div>
                        </div> */}
                        </div>
                      )}

                      <div className="bg-amber-800/20 border border-amber-600/30 rounded-lg p-3">
                        <p className="text-sm text-amber-200">
                          <strong className="text-amber-300">Note:</strong>{" "}
                          After completing the payment, fill in the transaction
                          details below and submit your registration. If you
                          want to include any other information, write it in the
                          notes section.
                        </p>
                      </div>
                    </div>
                  )}

                  {renderPaymentFields()}

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any additional notes about your payment..."
                      value={paymentData.notes || ""}
                      onChange={(e) =>
                        updatePaymentData("notes", e.target.value)
                      }
                      rows={3}
                      className="bg-amber-950/30 border-amber-800/50 text-amber-100 placeholder:text-amber-400/60 focus:border-amber-600 focus:ring-amber-600/20"
                    />
                  </div>
                </div>

                {paymentData.method && (
                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <p className="text-sm text-amber-200">
                      <strong className="text-amber-300">
                        Payment Instructions:
                      </strong>{" "}
                      Complete your payment using the selected method and enter
                      the transaction details above. Your registration will be
                      confirmed after manual verification.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Separator className="bg-gradient-to-r from-transparent via-amber-700/50 to-transparent" />

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleSubmit}
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="px-8 py-3 text-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white border-0 shadow-2xl shadow-amber-600/25 hover:shadow-amber-600/40 transition-all duration-300"
              >
                {isSubmitting ? "Registering..." : "Register Team"}
              </Button>
            </div>
          </main>
        </div>
      </div>
    </main>
  );
}

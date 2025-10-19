import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  Clock,
  ThumbsUp,
  ThumbsDown,
  DollarSign,
  Users,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

const DAOVerifier = () => {
  const [selectedClaim, setSelectedClaim] = useState<number | null>(null);

  const activeClaims = [
    {
      id: 1,
      title: "Digital Masterpiece #3451",
      submitter: "0x9C4b...5E3f",
      category: "Photo",
      hash: "0xa7b9...d3e2",
      pHash: "p:3f8a...7c91",
      timeRemaining: "42h 15m",
      stake: 10,
      agreeVotes: 12,
      disagreeVotes: 3,
      totalVotes: 15,
    },
    {
      id: 2,
      title: "Sonic Waves Vol. 3",
      submitter: "0x2E7f...8D1c",
      category: "Music",
      hash: "0x3d8f...b2c7",
      pHash: "p:8c3e...4a91",
      timeRemaining: "28h 42m",
      stake: 10,
      agreeVotes: 8,
      disagreeVotes: 5,
      totalVotes: 13,
    },
    {
      id: 3,
      title: "Future Chronicles #12",
      submitter: "0x5A3c...9F2e",
      category: "Comic",
      hash: "0x9b2e...f7a3",
      pHash: "p:7e9a...2b4c",
      timeRemaining: "15h 23m",
      stake: 10,
      agreeVotes: 18,
      disagreeVotes: 2,
      totalVotes: 20,
    },
  ];

  const handleVote = (claimId: number, voteType: "agree" | "disagree") => {
    toast.success(
      `Vote submitted: ${voteType === "agree" ? "UNIQUE" : "SIMILAR"}. 1 USDC deposited`
    );
  };

  const selectedClaimData = activeClaims.find((c) => c.id === selectedClaim);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">DAO Verifier</h1>
          <p className="text-muted-foreground">
            Community governance and verification of creative works
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Claims</p>
                  <p className="text-3xl font-bold text-primary">{activeClaims.length}</p>
                </div>
                <AlertCircle className="h-10 w-10 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Your Votes</p>
                  <p className="text-3xl font-bold text-success">7</p>
                </div>
                <ThumbsUp className="h-10 w-10 text-success/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Staked</p>
                  <p className="text-3xl font-bold text-primary">$7</p>
                </div>
                <DollarSign className="h-10 w-10 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Accuracy Rate</p>
                  <p className="text-3xl font-bold text-success">94%</p>
                </div>
                <Users className="h-10 w-10 text-success/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Active Claims List */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Active Verification Claims
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Vote on originality to earn rewards
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeClaims.map((claim) => {
                  const agreePercent = (claim.agreeVotes / claim.totalVotes) * 100;
                  const disagreePercent = (claim.disagreeVotes / claim.totalVotes) * 100;

                  return (
                    <Card
                      key={claim.id}
                      className={`border-2 cursor-pointer transition-all ${
                        selectedClaim === claim.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedClaim(claim.id)}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          {/* Asset Preview */}
                          <div className="w-24 h-24 bg-secondary rounded-lg border border-border flex items-center justify-center shrink-0">
                            <Shield className="h-10 w-10 text-primary/30" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg mb-1">{claim.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  Submitted by <span className="font-mono">{claim.submitter}</span>
                                </p>
                              </div>
                              <Badge variant="secondary">{claim.category}</Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-3">
                              <div className="p-2 bg-secondary rounded border border-border">
                                <p className="text-xs text-muted-foreground mb-1">Hash</p>
                                <p className="text-xs font-mono truncate">{claim.hash}</p>
                              </div>
                              <div className="p-2 bg-secondary rounded border border-border">
                                <p className="text-xs text-muted-foreground mb-1">pHash</p>
                                <p className="text-xs font-mono truncate">{claim.pHash}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center gap-1 text-sm">
                                <Clock className="h-4 w-4 text-accent" />
                                <span className="font-semibold text-accent">{claim.timeRemaining}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <DollarSign className="h-4 w-4 text-primary" />
                                <span className="font-semibold">{claim.stake} USDC</span>
                              </div>
                            </div>

                            {/* Vote Progress */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Community Votes</span>
                                <span className="font-semibold">{claim.totalVotes} votes</span>
                              </div>
                              <div className="flex gap-2">
                                <div className="flex-1">
                                  <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-success">Unique</span>
                                    <span className="font-semibold">{claim.agreeVotes}</span>
                                  </div>
                                  <Progress value={agreePercent} className="h-2 bg-secondary" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-accent">Similar</span>
                                    <span className="font-semibold">{claim.disagreeVotes}</span>
                                  </div>
                                  <Progress value={disagreePercent} className="h-2 bg-secondary" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Voting Panel */}
          <div className="space-y-6">
            {selectedClaimData ? (
              <Card className="border-border border-2 border-primary/30 sticky top-6">
                <CardHeader>
                  <CardTitle>Vote on Claim #{selectedClaimData.id}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {selectedClaimData.title}
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <div className="flex items-start gap-2 mb-3">
                      <AlertCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm mb-1">Voting Requirements</p>
                        <p className="text-xs text-muted-foreground">
                          You must deposit 1 USDC to cast your vote. Correct votes earn rewards.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-accent/20">
                      <span className="text-sm font-medium">Deposit Required</span>
                      <span className="text-xl font-bold text-primary">1 USDC</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-semibold">Cast Your Vote</p>
                    
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => handleVote(selectedClaimData.id, "disagree")}
                    >
                      <ThumbsUp className="h-5 w-5" />
                      Vote UNIQUE (Original Work)
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                      size="lg"
                      onClick={() => handleVote(selectedClaimData.id, "agree")}
                    >
                      <ThumbsDown className="h-5 w-5" />
                      Vote SIMILAR (Not Original)
                    </Button>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-3">Current Vote Tally</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-success/5 rounded-lg border border-success/20">
                        <p className="text-xs text-muted-foreground mb-1">Unique</p>
                        <p className="text-2xl font-bold text-success">{selectedClaimData.agreeVotes}</p>
                      </div>
                      <div className="p-3 bg-accent/5 rounded-lg border border-accent/20">
                        <p className="text-xs text-muted-foreground mb-1">Similar</p>
                        <p className="text-2xl font-bold text-accent">{selectedClaimData.disagreeVotes}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Voting closes in {selectedClaimData.timeRemaining}</span>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-border sticky top-6">
                <CardContent className="pt-12 pb-12 text-center">
                  <Shield className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">
                    Select a claim from the list to vote
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DAOVerifier;

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Shield, ExternalLink, Lock, Users, DollarSign, FileText } from "lucide-react";
import { toast } from "sonner";

const Marketplace = () => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handlePurchase = () => {
    if (!agreedToTerms) {
      toast.error("Please agree to the Consumption License Terms to proceed");
      return;
    }
    toast.success("CLT purchase successful! License proof sent to your wallet");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Asset Display */}
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video bg-secondary rounded-lg border border-border flex items-center justify-center overflow-hidden">
              <div className="text-center p-12">
                <Shield className="h-32 w-32 mx-auto text-primary/20 mb-4" />
                <p className="text-muted-foreground">Asset Preview</p>
              </div>
            </div>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">
                      Digital Masterpiece #2847
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Created by <span className="text-primary font-semibold">0x3B9a...4C7e</span>
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                    Verified
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">
                  An original digital artwork representing the convergence of technology and human
                  expression. This piece has been verified by the Genesis Vault DAO and carries
                  immutable provenance on the Base L2 Network.
                </p>
              </CardContent>
            </Card>

            {/* Provenance Panel */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Genesis Origin Token (GOT) - Immutable Provenance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground mb-1">GOT ID</p>
                    <p className="font-mono font-bold text-primary text-lg">#0</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Blockchain Hash</p>
                    <p className="font-mono text-sm truncate">
                      0x7a3f8b...c92b
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-secondary rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground mb-2">Original Creator Wallet</p>
                  <div className="flex items-center justify-between">
                    <p className="font-mono font-semibold">0x3B9a7F...4C7e</p>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                      View on Explorer
                    </Button>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  <Users className="h-4 w-4" />
                  View Full DAO Verification History
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Purchase Panel */}
          <div className="space-y-6">
            <Card className="border-border sticky top-6">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">License Price</span>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-primary">50</p>
                    <p className="text-sm text-muted-foreground">USDC</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-secondary/50 rounded-lg border border-border space-y-3">
                  <div className="flex items-start gap-2">
                    <FileText className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">License Type</p>
                      <p className="text-sm text-muted-foreground">
                        Creative Commons BY-NC-ND
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Attribution - NonCommercial - NoDerivatives
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      className="mt-1"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      I agree to the{" "}
                      <span className="text-primary font-semibold underline">
                        Consumption License Terms (CLT)
                      </span>{" "}
                      and understand that this purchase provides legal proof of licensed use
                    </label>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePurchase}
                    disabled={!agreedToTerms}
                  >
                    <Shield className="h-5 w-5" />
                    Buy License & Receive CLT
                  </Button>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Distribution Tracker</span>
                    <Badge variant="secondary">
                      <DollarSign className="h-3 w-3" />
                      CLTs Sold: 45 / 1,000
                    </Badge>
                  </div>
                  <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: "4.5%" }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Shield, ExternalLink, Lock, Users, DollarSign, FileText, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Mock data - in real app, fetch based on ID
  const product = {
    id: id || "1",
    title: "Digital Masterpiece #2847",
    creator: "0x3B9a...4C7e",
    price: 50,
    category: "Photo",
    description: "An original digital artwork representing the convergence of technology and human expression. This piece has been verified by the Genesis Vault DAO and carries immutable provenance on the Base L2 Network.",
    gotId: "0",
    hash: "0x7a3f8b...c92b",
    license: "CC BY-NC-ND",
    cltsSold: 45,
    maxClts: 1000,
  };

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
        <Link to="/marketplace">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Marketplace
          </Button>
        </Link>

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
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{product.category}</Badge>
                      <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                        Verified
                      </Badge>
                    </div>
                    <CardTitle className="text-3xl mb-2">
                      {product.title}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Created by <span className="text-primary font-semibold">{product.creator}</span>
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">
                  {product.description}
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
                    <p className="font-mono font-bold text-primary text-lg">#{product.gotId}</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Blockchain Hash</p>
                    <p className="font-mono text-sm truncate">
                      {product.hash}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-secondary rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground mb-2">Original Creator Wallet</p>
                  <div className="flex items-center justify-between">
                    <p className="font-mono font-semibold">{product.creator}</p>
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
                    <p className="text-4xl font-bold text-primary">{product.price}</p>
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
                        Creative Commons {product.license}
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
                      CLTs Sold: {product.cltsSold} / {product.maxClts}
                    </Badge>
                  </div>
                  <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${(product.cltsSold / product.maxClts) * 100}%` }}
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

export default ProductDetail;

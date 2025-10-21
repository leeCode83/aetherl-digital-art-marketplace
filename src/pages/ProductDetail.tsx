import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Shield, ExternalLink, Lock, Users, DollarSign, FileText, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState("personal");

  // Mock data - in real app, fetch based on ID
  const product = {
    id: id || "1",
    title: "Digital Masterpiece #2847",
    creator: "0x3B9a...4C7e",
    category: "Photo",
    description: "An original digital artwork representing the convergence of technology and human expression. This piece has been verified by the External Curator and carries immutable provenance on the Base L2 Network.",
    gotId: "GOT-2847",
    hash: "0x7a3f8b...c92b",
    cltsSold: 45,
    maxClts: 1000,
    licenses: [
      { id: "personal", name: "Personal Use", price: 5, description: "For personal, non-commercial use only" },
      { id: "commercial", name: "Commercial Use", price: 50, description: "Full commercial rights with attribution" },
      { id: "exclusive", name: "Exclusive License", price: 150, description: "Exclusive commercial rights, limited availability" },
    ],
  };

  const currentLicense = product.licenses.find((l) => l.id === selectedLicense);

  const handlePurchase = () => {
    if (!agreedToTerms) {
      toast.error("Please agree to the Consumption License Terms to proceed");
      return;
    }
    toast.success(`CLT purchase successful! ${currentLicense?.name} license proof sent to your wallet`);
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
                <img src="/assets/TestDigital.jpg" alt="" />
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
                    <p className="font-mono font-bold text-primary text-lg">{product.gotId}</p>
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
                  View Full Verification Report
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Purchase Panel */}
          <div className="space-y-6">
            <Card className="border-border sticky top-6">
              <CardHeader>
                <CardTitle>Select License & Purchase</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* License Selection Widget */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Choose License Type</Label>
                  <RadioGroup value={selectedLicense} onValueChange={setSelectedLicense}>
                    {product.licenses.map((license) => (
                      <div
                        key={license.id}
                        className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                          selectedLicense === license.id
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedLicense(license.id)}
                      >
                        <RadioGroupItem value={license.id} id={license.id} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={license.id} className="cursor-pointer">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold">{license.name}</span>
                              <span className="text-primary font-bold text-lg">${license.price}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{license.description}</p>
                          </Label>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Selected License</span>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary">${currentLicense?.price}</p>
                      <p className="text-xs text-muted-foreground">USDC</p>
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
                    Pay Stablecoin & Receive CLT
                  </Button>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-muted-foreground">Distribution Tracker</span>
                    <Badge variant="secondary">
                      <DollarSign className="h-3 w-3" />
                      CLTs Sold: {product.cltsSold} / {product.maxClts}
                    </Badge>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
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

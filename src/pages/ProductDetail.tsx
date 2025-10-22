import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Shield, ExternalLink, Lock, Users, DollarSign, ArrowLeft, Gem } from "lucide-react";
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
    hash: "0x7a3f8b89c92b740a6e3d2f10b5c1a4e8d0e7f6c3a1b9e0d4c8f5a6b0c3d2e1f9", // Diberi hash lebih panjang untuk simulasi
    cltsSold: 45,
    maxClts: 1000,
    licenses: [
      { id: "personal", name: "Personal Use License (CLT-1)", price: 5, description: "Personal use only" },
      { id: "commercial", name: "Commercial Use License (CLT-2)", price: 50, description: "Full commercial rights with required creator attribution" },
      { id: "exclusive", name: "Exclusive License (CLT-3)", price: 150, description: "Exclusive commercial rights for a limited time" },
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

      <div className="container mx-auto px-20 py-3">
        {/* Back Button */}
        <Link to="/marketplace" className="inline-block mb-6">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>

        {/* Main Grid: 3/5 for Content, 2/5 for Purchase Panel */}
        <div className="grid lg:grid-cols-5 gap-10">

          {/* LEFT COLUMN: Asset, Title, Description, Provenance */}
          <div className="lg:col-span-3 space-y-6">

            {/* Asset Preview */}
            <div className="aspect-video bg-secondary rounded-xl border border-border flex items-center justify-center overflow-hidden shadow-lg">
              <img src="/assets/TestDigital.jpg" alt={product.title} className="w-full h-full object-cover" />
            </div>

            {/* Title, Creator, Badges - Dipisahkan dari Card besar */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-start justify-between">
                <div>
                  {/* Title and Category Badges */}
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className="text-sm px-3 py-1" variant="secondary">{product.category}</Badge>
                    <Badge className="bg-success/20 text-success border-success/30 px-3 py-1">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight mb-1">
                    {product.title}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Created by <span className="text-foreground font-mono">{product.creator}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Description Card */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>

            {/* Provenance Panel (Immutable Provenance & Hash - GOT ID Dihilangkan) */}
            <Card className="border-border bg-secondary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Lock className="h-5 w-5 text-primary" />
                  Immutable Provenance Record
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">

                {/* Blockchain Hash */}
                <div className="p-4 bg-card rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Genesis Block Hash</p>
                  <p className="font-mono text-sm break-all text-primary">
                    {product.hash}
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2 text-xs h-6 px-3 -ml-3">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View on Base Explorer
                  </Button>
                </div>

                {/* Creator Wallet */}
                <div className="p-4 bg-card rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Original Creator Wallet</p>
                  <p className="font-mono font-semibold text-sm">{product.creator}</p>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  <Users className="h-4 w-4" />
                  View Full Verification Report
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN: Purchase Panel (Sticky Sidebar) - DIBUAT LEBIH RINGKAS LAGI */}
          <div className="lg:col-span-2 space-y-4"> {/* Spacing kolom dikurangi dari space-y-6 ke space-y-4 */}
            <Card className="border-primary/50 border-2 sticky top-6 shadow-lg"> {/* Shadow tetap ada */}
              <CardHeader className="border-b border-border/50 p-3"> {/* Padding dikurangi ke p-3 */}
                <CardTitle className="text-lg flex items-center gap-2"> {/* Ukuran font dikurangi ke text-lg */}
                  <Gem className="h-4 w-4 text-primary" /> {/* Ukuran ikon dikurangi */}
                  Acquire Usage License (CLT)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4"> {/* Spacing content dipertahankan 4 untuk jarak yang cukup */}

                {/* License Selection Widget */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-foreground">Choose License Type</Label>
                  <RadioGroup value={selectedLicense} onValueChange={setSelectedLicense}>
                    {product.licenses.map((license) => (
                      <div
                        key={license.id}
                        className={`flex items-start gap-2 p-2 rounded-lg border-2 transition-all cursor-pointer ${selectedLicense === license.id
                            ? "border-primary bg-primary/5 shadow-none"
                            : "border-border bg-card hover:border-primary/50"
                          }`}
                        onClick={() => setSelectedLicense(license.id)}
                      >
                        <RadioGroupItem value={license.id} id={license.id} className="mt-1 shrink-0" />
                        <div className="flex-1">
                          <Label htmlFor={license.id} className="cursor-pointer">
                            <div className="flex items-center justify-between mb-0">
                              <span className="font-semibold text-xs">{license.name}</span>
                            </div>
                            <p className="text-xs text-muted-foreground/80 leading-snug">{license.description}</p>
                          </Label>
                        </div>
                        <span className="text-primary font-bold text-base shrink-0">${license.price}</span>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Current License Price Display (Subtotal) */}
                <div className="p-2 bg-secondary rounded-md border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground font-medium">License Price (Subtotal)</span>
                    <p className="text-xl font-bold text-primary">${currentLicense?.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* --- RINCIAN PEMBAYARAN BARU (ENGLISH) --- */}
                <div className="space-y-2 pt-2 border-t border-border">
                  <Label className="text-sm font-semibold text-foreground block">Payment Breakdown</Label>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Transaction Tax (11%)</span>
                    <span className="font-medium">${(currentLicense?.price * 0.11).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Platform Fee (5%)</span>
                    <span className="font-medium">${(currentLicense?.price * 0.05).toFixed(2)}</span>
                  </div>

                  {/* Total Line */}
                  <div className="flex justify-between pt-2 border-t border-dashed border-border/50">
                    <span className="text-base font-semibold">TOTAL DUE</span>
                    <span className="text-xl font-bold text-primary">${(currentLicense?.price * 1.16).toFixed(2)}</span>
                  </div>
                </div>
                {/* --- AKHIR RINCIAN PEMBAYARAN --- */}


                {/* Action Section */}
                <div className="pt-3 border-t border-border space-y-3">
                  <div className="flex items-start gap-2 p-2 bg-card border border-border rounded-md">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      className="mt-0.5 shrink-0 h-3 w-3"
                    />
                    <label
                      htmlFor="terms"
                      className="text-xs leading-snug cursor-pointer"
                    >
                      I agree to the{" "}
                      <span className="text-primary font-semibold underline">
                        Consumption License Terms (CLT)
                      </span>{" "}
                      and understand that this provides legal proof of licensed use.
                    </label>
                  </div>

                  <Button
                    className="w-full text-sm"
                    size="sm"
                    onClick={handlePurchase}
                    disabled={!agreedToTerms}
                  >
                    <DollarSign className="h-4 w-4" />
                    Pay Stablecoin & Mint CLT
                  </Button>
                </div>

                {/* Distribution Tracker */}
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground font-medium">CLT Distribution Tracker</span>
                    <Badge variant="secondary" className="text-xs h-4 px-2 py-0">
                      CLTs Sold: {product.cltsSold} / {product.maxClts}
                    </Badge>
                  </div>
                  <div className="h-1 bg-primary/20 rounded-full overflow-hidden">
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
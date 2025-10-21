import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  Edit3,
  Send,
  DollarSign,
  FileText,
  Upload,
  Settings,
} from "lucide-react";
import { toast } from "sonner";

const Vault = () => {
  const mockOwnedAssets = [
    {
      id: 1,
      title: "Sonic Waves Collection",
      creator: "0x7F2c...8A1d",
      licenseType: "Commercial Use",
      purchaseDate: "2024-03-15",
      cltId: "CLT-1523-89",
    },
    {
      id: 2,
      title: "Urban Symphony",
      creator: "0x5E1d...3B7a",
      licenseType: "Personal Use",
      purchaseDate: "2024-03-12",
      cltId: "CLT-6182-42",
    },
  ];

  const mockCreatorAssets = [
    {
      id: 1,
      gotId: "GOT-2847",
      title: "Digital Masterpiece #2847",
      cltSold: 45,
      status: "active",
      licenses: [
        { type: "Personal Use", price: 5, enabled: true },
        { type: "Commercial Use", price: 50, enabled: true },
        { type: "Exclusive License", price: 150, enabled: false },
      ],
    },
    {
      id: 2,
      gotId: "GOT-9234",
      title: "Ethereal Melodies Vol. 2",
      cltSold: 203,
      status: "active",
      licenses: [
        { type: "Personal Use", price: 5, enabled: true },
        { type: "Commercial Use", price: 30, enabled: true },
      ],
    },
  ];

  const handleEditLicenses = (id: number) => {
    toast.success(`Opening license editor for GOT #${id}`);
  };

  const handleTransfer = (gotId: string) => {
    toast.success(`Transfer initiated for ${gotId}`);
  };

  const handleGenesisStamp = () => {
    toast.success("Genesis Stamp initiated! Your work will be submitted for DAO verification");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your owned licenses and creator listings
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Owned Licenses (CLTs)</p>
                  <p className="text-3xl font-bold text-primary">{mockOwnedAssets.length}</p>
                </div>
                <FileText className="h-10 w-10 text-[#FFC300]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Creator GOTs</p>
                  <p className="text-3xl font-bold text-success">{mockCreatorAssets.length}</p>
                </div>
                <Shield className="h-10 w-10 text-[#008CFF]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total CLTs Sold</p>
                  <p className="text-3xl font-bold text-primary">248</p>
                </div>
                <DollarSign className="h-10 w-10 text-[#1EFF00]" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="owned" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="owned">My Owned Assets</TabsTrigger>
            <TabsTrigger value="creator">Creator's GOTs & Listings</TabsTrigger>
          </TabsList>

          {/* My Owned Assets Tab */}
          <TabsContent value="owned" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Licensed Assets (CLTs)</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Your purchased licenses with proof of legal usage rights
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOwnedAssets.map((asset) => (
                    <Card key={asset.id} className="border-border">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-6">
                          <div className="w-20 h-20 bg-secondary rounded-lg border border-border flex items-center justify-center shrink-0">
                            <Shield className="h-8 w-8 text-primary/30" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-lg font-semibold mb-1">{asset.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  Created by <span className="font-mono">{asset.creator}</span>
                                </p>
                              </div>
                              <Badge variant="secondary" className="bg-[#1EFF00] text-success border-success/30">
                                Active
                              </Badge>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-4 mb-4">
                              <div className="p-3 bg-secondary rounded-lg border border-border">
                                <p className="text-xs text-muted-foreground mb-1">License Type</p>
                                <p className="text-sm font-semibold">{asset.licenseType}</p>
                              </div>
                              <div className="p-3 bg-secondary rounded-lg border border-border">
                                <p className="text-xs text-muted-foreground mb-1">CLT ID</p>
                                <p className="text-sm font-mono font-semibold text-primary">{asset.cltId}</p>
                              </div>
                              <div className="p-3 bg-secondary rounded-lg border border-border">
                                <p className="text-xs text-muted-foreground mb-1">Purchase Date</p>
                                <p className="text-sm font-semibold">{asset.purchaseDate}</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <FileText className="h-4 w-4" />
                                View License Terms
                              </Button>
                              <Button variant="outline" size="sm">
                                Download Proof
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Creator's GOTs & Listings Tab */}
          <TabsContent value="creator" className="space-y-6">
            {/* Genesis Stamp Form */}
            <Card className="border-border border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Genesis Stamp - Register New Artwork
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Submit your creative work for DAO verification
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Work Title</Label>
                    <Input id="title" placeholder="Enter artwork title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="photo">Photo</SelectItem>
                        <SelectItem value="music">Music</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="comic">Comic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe your creative work" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Upload File</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Drag & drop your file here or click to browse
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <p className="text-sm font-semibold mb-2">DAO Verification Process</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Stake: $10 USDC (refunded upon approval)</li>
                    <li>• Verification Period: 48 hours</li>
                    <li>• Community votes on originality and quality</li>
                  </ul>
                </div>

                <Button className="w-full" size="lg" onClick={handleGenesisStamp}>
                  <Shield className="h-5 w-5" />
                  Initiate Genesis Stamp ($10 USDC)
                </Button>
              </CardContent>
            </Card>

            {/* Existing GOTs List */}
            <div className="space-y-4">
              {mockCreatorAssets.map((asset) => (
                <Card key={asset.id} className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-6">
                      <div className="w-24 h-24 bg-secondary rounded-lg border border-border flex items-center justify-center shrink-0">
                        <Shield className="h-10 w-10 text-primary/30" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{asset.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              GOT ID: <span className="font-mono text-primary">{asset.gotId}</span>
                            </p>
                          </div>
                          <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                            Listed
                          </Badge>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            Marketplace Licenses
                          </p>
                          <div className="grid sm:grid-cols-3 gap-2">
                            {asset.licenses.map((license, idx) => (
                              <div
                                key={idx}
                                className={`p-3 rounded-lg border ${
                                  license.enabled
                                    ? "bg-primary/5 border-primary/30"
                                    : "bg-secondary border-border opacity-50"
                                }`}
                              >
                                <p className="text-xs text-muted-foreground mb-1">{license.type}</p>
                                <p className="text-lg font-bold text-primary">${license.price}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {license.enabled ? "Active" : "Disabled"}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 mb-4">
                          <div className="p-3 bg-secondary rounded-lg border border-border">
                            <p className="text-xs text-muted-foreground mb-1">CLTs Sold</p>
                            <p className="text-2xl font-bold">{asset.cltSold}</p>
                          </div>
                          <div className="p-3 bg-secondary rounded-lg border border-border">
                            <p className="text-xs text-muted-foreground mb-1">Total Revenue</p>
                            <p className="text-2xl font-bold text-success">
                              ${(asset.cltSold * 25).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditLicenses(asset.id)}
                          >
                            <Edit3 className="h-4 w-4" />
                            Set Marketplace Licenses
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleTransfer(asset.gotId)}
                          >
                            <Send className="h-4 w-4" />
                            Transfer GOT
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Vault;

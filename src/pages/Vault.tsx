import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Edit3,
  Send,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

const Vault = () => {
  const mockAssets = [
    {
      id: 1,
      gotId: "0",
      title: "Digital Masterpiece #2847",
      price: 50,
      cltSold: 45,
      status: "active",
    },
    {
      id: 2,
      gotId: "23",
      title: "Sonic Waves Collection",
      price: 30,
      cltSold: 128,
      status: "active",
    },
    {
      id: 3,
      gotId: "101",
      title: "Abstract Thoughts",
      price: 75,
      cltSold: 12,
      status: "dispute",
    },
  ];

  const handleEditAsset = (id: number) => {
    toast.success(`Opening editor for asset #${id}`);
  };

  const handleTransfer = (id: number) => {
    toast.success(`Transfer initiated for GOT #${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Vault & Rights Manager</h1>
          <p className="text-muted-foreground">
            Manage your stamped assets, licensing, and DAO activities
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Assets</p>
                  <p className="text-3xl font-bold text-primary">3</p>
                </div>
                <Shield className="h-10 w-10 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">CLTs Sold</p>
                  <p className="text-3xl font-bold text-success">185</p>
                </div>
                <FileText className="h-10 w-10 text-success/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-primary">$8,740</p>
                </div>
                <DollarSign className="h-10 w-10 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Disputes</p>
                  <p className="text-3xl font-bold text-accent">1</p>
                </div>
                <AlertTriangle className="h-10 w-10 text-accent/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="assets" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="assets">My Stamped Assets</TabsTrigger>
            <TabsTrigger value="disputes">DAO Disputes</TabsTrigger>
            <TabsTrigger value="analytics">Sales Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="space-y-4">
            {mockAssets.map((asset) => (
              <Card key={asset.id} className="border-border">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-6">
                    {/* Thumbnail */}
                    <div className="w-24 h-24 bg-secondary rounded-lg border border-border flex items-center justify-center shrink-0">
                      <Shield className="h-10 w-10 text-primary/30" />
                    </div>

                    {/* Asset Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{asset.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            GOT ID: <span className="font-mono text-primary">#{asset.gotId}</span>
                          </p>
                        </div>
                        {asset.status === "dispute" && (
                          <Badge variant="destructive">
                            <AlertTriangle className="h-3 w-3" />
                            Dispute Active
                          </Badge>
                        )}
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4 mb-4">
                        <div className="p-3 bg-secondary rounded-lg border border-border">
                          <p className="text-xs text-muted-foreground mb-1">Current Price</p>
                          <p className="text-lg font-bold text-primary">${asset.price} USDC</p>
                        </div>
                        <div className="p-3 bg-secondary rounded-lg border border-border">
                          <p className="text-xs text-muted-foreground mb-1">CLTs Sold</p>
                          <p className="text-lg font-bold">{asset.cltSold}</p>
                        </div>
                        <div className="p-3 bg-secondary rounded-lg border border-border">
                          <p className="text-xs text-muted-foreground mb-1">Total Revenue</p>
                          <p className="text-lg font-bold text-success">
                            ${(asset.price * asset.cltSold).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditAsset(asset.id)}
                        >
                          <Edit3 className="h-4 w-4" />
                          Edit License/Price
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTransfer(asset.id)}
                        >
                          <Send className="h-4 w-4" />
                          Transfer GOT
                        </Button>
                        <Button variant="ghost" size="sm">
                          <TrendingUp className="h-4 w-4" />
                          View Analytics
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="disputes">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-accent" />
                  Active Disputes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 bg-accent/5 rounded-lg border-2 border-accent/20">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-semibold text-lg mb-1">
                        Dispute on GOT #101: Abstract Thoughts
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Challenge Type: Originality Verification
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-accent/20 text-accent">
                      Pending Vote
                    </Badge>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-card rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground mb-1">Your Stake</p>
                      <p className="text-2xl font-bold text-primary">$10 USDC</p>
                    </div>
                    <div className="p-4 bg-card rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground mb-1">Resolution Timeline</p>
                      <p className="text-2xl font-bold">24h</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Dispute Details & Community Votes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Sales Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-secondary/30 rounded-lg border border-border flex items-center justify-center">
                  <p className="text-muted-foreground">Analytics chart placeholder</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Vault;

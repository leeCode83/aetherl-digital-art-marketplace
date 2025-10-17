import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Users, Zap, FileText, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Built on Base L2 Network</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Immutable Provenance
            <br />
            <span className="text-primary">for Creative Works</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The Genesis Vault establishes permanent, verifiable ownership records for digital and
            physical creative assets through DAO-verified blockchain stamps.
          </p>
          
          <div className="flex gap-4 justify-center pt-6">
            <Link to="/registry">
              <Button size="lg" className="text-base">
                <Shield className="h-5 w-5" />
                Stamp Your Work
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button variant="outline" size="lg" className="text-base">
                Explore Marketplace
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Genesis Origin Token</h3>
              <p className="text-sm text-muted-foreground">
                Immutable proof of original creation stored permanently on the blockchain
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-success" />
              </div>
              <h3 className="text-lg font-semibold mb-2">DAO Verification</h3>
              <p className="text-sm text-muted-foreground">
                Community-driven 48-hour verification ensures authenticity and originality
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Consumption Licenses</h3>
              <p className="text-sm text-muted-foreground">
                Blockchain-verified CLTs provide legal proof of licensed usage rights
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Base L2 Speed</h3>
              <p className="text-sm text-muted-foreground">
                Fast, low-cost transactions on Ethereum's most efficient Layer 2 network
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How The Genesis Vault Works</h2>
          
          <div className="space-y-6">
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0 font-bold text-primary-foreground">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Stamp & Stake</h3>
                    <p className="text-muted-foreground">
                      Upload your creative work, stake $10 USDC, and submit it for DAO verification.
                      Your work receives a unique Genesis Origin Token (GOT) ID.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shrink-0 font-bold text-accent-foreground">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Community Verification</h3>
                    <p className="text-muted-foreground">
                      The DAO reviews your submission for originality over a 48-hour period. Your
                      stake is returned upon approval, or forfeited if the work fails verification.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center shrink-0 font-bold text-success-foreground">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">List & License</h3>
                    <p className="text-muted-foreground">
                      Once verified, your work is listed on the marketplace. Buyers purchase
                      Consumption License Terms (CLTs) as legal proof of their licensed usage rights.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16">
        <Card className="border-border bg-secondary">
          <CardContent className="pt-12 pb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Establish Your Provenance?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join creators worldwide who trust The Genesis Vault for immutable ownership records
              and transparent licensing on the Base L2 Network.
            </p>
            <Link to="/registry">
              <Button size="lg" className="text-base">
                <Shield className="h-5 w-5" />
                Get Started Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;

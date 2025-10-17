import { Link, useLocation } from "react-router-dom";
import { Wallet, Shield, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">The Genesis Vault</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-1">
              <Link to="/">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={isActive("/") ? "bg-secondary" : ""}
                >
                  <Home className="h-4 w-4" />
                  Home
                </Button>
              </Link>
              <Link to="/registry">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={isActive("/registry") ? "bg-secondary" : ""}
                >
                  Stamp Asset
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={isActive("/marketplace") ? "bg-secondary" : ""}
                >
                  Marketplace
                </Button>
              </Link>
              <Link to="/vault">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={isActive("/vault") ? "bg-secondary" : ""}
                >
                  My Vault
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg border border-border">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm font-medium">Base Network</span>
            </div>
            <Button variant="outline" size="sm">
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">0x7a3F...9B2c</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

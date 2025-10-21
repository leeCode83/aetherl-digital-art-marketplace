import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Shield, Search, Music, Image as ImageIcon, Video, BookOpen } from "lucide-react";

type Category = "All" | "Music" | "Photo" | "Comic" | "Video";

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: { name: Category; icon: any }[] = [
    { name: "All", icon: Shield },
    { name: "Music", icon: Music },
    { name: "Photo", icon: ImageIcon },
    { name: "Comic", icon: BookOpen },
    { name: "Video", icon: Video },
  ];

  const products = [
    {
      id: "1",
      title: "Digital Masterpiece #2847",
      creator: "0x3B9a...4C7e",
      priceMin: 5,
      priceMax: 50,
      gotId: "GOT-2847",
      category: "Photo",
      cltsSold: 45,
      verified: true,
    },
    {
      id: "2",
      title: "Sonic Waves Collection",
      creator: "0x7F2c...8A1d",
      priceMin: 10,
      priceMax: 30,
      gotId: "GOT-1523",
      category: "Music",
      cltsSold: 128,
      verified: true,
    },
    {
      id: "3",
      title: "Abstract Thoughts Series",
      creator: "0x9C4b...5E3f",
      priceMin: 15,
      priceMax: 75,
      gotId: "GOT-8942",
      category: "Photo",
      cltsSold: 12,
      verified: true,
    },
    {
      id: "4",
      title: "Origin Story: Chapter 1",
      creator: "0x2A8f...9D6c",
      priceMin: 8,
      priceMax: 45,
      gotId: "GOT-3756",
      category: "Comic",
      cltsSold: 89,
      verified: true,
    },
    {
      id: "5",
      title: "Urban Symphony",
      creator: "0x5E1d...3B7a",
      priceMin: 20,
      priceMax: 60,
      gotId: "GOT-6182",
      category: "Video",
      cltsSold: 34,
      verified: true,
    },
    {
      id: "6",
      title: "Ethereal Melodies Vol. 2",
      creator: "0x8D3a...4F9e",
      priceMin: 5,
      priceMax: 25,
      gotId: "GOT-9234",
      category: "Music",
      cltsSold: 203,
      verified: true,
    },
    {
      id: "7",
      title: "Neon Dreams",
      creator: "0x6B9c...2C8d",
      priceMin: 12,
      priceMax: 55,
      gotId: "GOT-4521",
      category: "Photo",
      cltsSold: 67,
      verified: true,
    },
    {
      id: "8",
      title: "Tales of Tomorrow",
      creator: "0x4C7e...1A5b",
      priceMin: 10,
      priceMax: 40,
      gotId: "GOT-7893",
      category: "Comic",
      cltsSold: 156,
      verified: true,
    },
    {
      id: "9",
      title: "Motion Chronicles",
      creator: "0x1F5a...8D3c",
      priceMin: 25,
      priceMax: 85,
      gotId: "GOT-2047",
      category: "Video",
      cltsSold: 28,
      verified: true,
    },
    {
      id: "10",
      title: "Quantum Beats",
      creator: "0x3D8f...6E2a",
      priceMin: 8,
      priceMax: 35,
      gotId: "GOT-5638",
      category: "Music",
      cltsSold: 142,
      verified: true,
    },
    {
      id: "11",
      title: "Cosmic Perspectives",
      creator: "0x7A2c...9F4b",
      priceMin: 15,
      priceMax: 70,
      gotId: "GOT-8127",
      category: "Photo",
      cltsSold: 53,
      verified: true,
    },
    {
      id: "12",
      title: "Heroes United Issue #5",
      creator: "0x9E4d...5C1f",
      priceMin: 7,
      priceMax: 38,
      gotId: "GOT-3491",
      category: "Comic",
      cltsSold: 198,
      verified: true,
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.creator.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Marketplace</h1>
          <p className="text-muted-foreground">
            Discover and license verified creative works with immutable provenance
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by title or creator..."
              className="pl-12 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.name;
            return (
              <Button
                key={category.name}
                variant={isActive ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.name)}
                className="gap-2"
              >
                <Icon className="h-4 w-4" />
                {category.name}
              </Button>
            );
          })}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> results
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} to={`/marketplace/${product.id}`}>
              <Card className="border-border hover:border-primary/50 transition-all duration-300 h-full group cursor-pointer">
                <CardContent className="pt-6">
                  {/* Asset Preview */}
                  <div className="aspect-square bg-secondary rounded-lg border border-border flex items-center justify-center mb-4 overflow-hidden group-hover:border-primary/30 transition-colors">
                    <img src="/assets/TestDigital.jpg" alt="" />
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {product.title}
                      </h3>
                      {product.verified && (
                        <Badge variant="secondary" className="bg-success/20 text-success border-success/30 shrink-0">
                          <Shield className="h-3 w-3" />
                        </Badge>
                      )}
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1">GOT ID</p>
                      <p className="text-sm font-mono text-primary">{product.gotId}</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Creator</p>
                      <p className="text-sm font-mono">{product.creator}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Price Range</p>
                        <p className="text-lg font-bold text-primary">${product.priceMin} - ${product.priceMax}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-1">CLTs Sold</p>
                        <p className="text-sm font-semibold">{product.cltsSold}</p>
                      </div>
                    </div>

                    <Badge variant="secondary" className="w-full justify-center">
                      {product.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Shield className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;

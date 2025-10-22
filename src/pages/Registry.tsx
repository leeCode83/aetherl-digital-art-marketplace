import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Shield, Clock, DollarSign } from "lucide-react";
import { toast } from "sonner";

const Registry = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      toast.success(`File "${droppedFile.name}" uploaded successfully`);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      toast.success(`File "${selectedFile.name}" uploaded successfully`);
    }
  };

  const handleStamp = () => {
    if (!file) {
      toast.error("Please upload a file first");
      return;
    }
    toast.success("Genesis stamp initiated! DAO verification period: 48 hours");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-20 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Genesis Registry</h1>
          <p className="text-muted-foreground">
            Stamp your creative work and establish immutable provenance on the Base L2 Network
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Upload Creative Asset
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border bg-secondary/30"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-success/20 rounded-full flex items-center justify-center">
                      <Shield className="h-8 w-8 text-success" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFile(null)}
                    >
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-16 w-16 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-lg font-medium mb-2">
                        Drag & drop your file here
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Supports: Images, Audio, Documents, Text
                      </p>
                      <label htmlFor="file-upload">
                        <Button variant="outline" size="lg" asChild>
                          <span>Browse Files</span>
                        </Button>
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect}
                        accept="image/*,audio/*,.pdf,.txt,.doc,.docx"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Metadata & Action Section */}
          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Asset Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Work Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter your work's title"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="price">Price (USDC)</Label>
                  <div className="relative mt-2">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="price"
                      type="number"
                      placeholder="50.00"
                      className="pl-9"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="license">Creative Commons License</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a license template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cc-by">CC BY - Attribution</SelectItem>
                      <SelectItem value="cc-by-sa">
                        CC BY-SA - Attribution-ShareAlike
                      </SelectItem>
                      <SelectItem value="cc-by-nd">
                        CC BY-ND - Attribution-NoDerivs
                      </SelectItem>
                      <SelectItem value="cc-by-nc">
                        CC BY-NC - Attribution-NonCommercial
                      </SelectItem>
                      <SelectItem value="cc-by-nc-sa">
                        CC BY-NC-SA - NonCommercial-ShareAlike
                      </SelectItem>
                      <SelectItem value="cc-by-nc-nd">
                        CC BY-NC-ND - NonCommercial-NoDerivs
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-secondary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <Clock className="h-5 w-5" />
                  DAO Verification Process
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-card rounded-lg border border-border">
                  <p className="text-sm font-medium mb-2">
                    48-Hour Community Verification Period
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Your asset will be reviewed by the community to ensure
                    originality and compliance with platform standards.
                  </p>
                </div>

                <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                  <div>
                    <p className="text-sm font-medium">Creator Stake</p>
                    <p className="text-xs text-muted-foreground">
                      Refundable upon approval
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">$10</p>
                    <p className="text-xs text-muted-foreground">USDC</p>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={handleStamp}>
                  <Shield className="h-5 w-5" />
                  Initiate Genesis Stamp & List Asset
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registry;

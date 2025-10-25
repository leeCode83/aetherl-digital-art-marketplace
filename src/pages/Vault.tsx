import { useState } from "react";
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
// Add Dialog for Modal
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Shield,
  Send,
  DollarSign,
  FileText,
  Upload,
  Gem,
  Link as LinkIcon,
  CheckCircle,
  Hash,
} from "lucide-react";
import { toast } from "sonner";

// Definisikan tipe untuk state formulir
type GenesisForm = {
  title: string;
  category: string;
  description: string;
  assetLink: string; // Mandatory link to the original work
  metadataLink: string; // Optional link
  fileHash: string; // Calculated hash of the uploaded file
};

// --- SIMULASI FUNGSI HASHING (Karena lingkungan terbatas) ---
// Dalam aplikasi nyata, ini akan menggunakan crypto library (e.g., SubtleCrypto, js-sha256)
const calculateFileHash = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    // Simulasi SHA-256 hash dari file
    const mockHash = `0x${Math.random().toString(16).substring(2, 12)}${file.name.length}${Date.now()}`.padEnd(66, '0');
    // Simulasi delay penghitungan
    setTimeout(() => {
      resolve(mockHash.slice(0, 66));
    }, 500);
  });
};
// -----------------------------------------------------------------


const Vault = () => {
  // State untuk form Genesis
  const [formData, setFormData] = useState<GenesisForm>({
    title: "",
    category: "",
    description: "",
    assetLink: "",
    metadataLink: "",
    fileHash: "", // New state for file hash
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // State for listing management dialog
  const [isListingDialogOpen, setIsListingDialogOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [licenseSettings, setLicenseSettings] = useState({
    personalUse: { enabled: true, price: "" },
    commercialUse: { enabled: true, price: "" },
    educationalUse: { enabled: false, price: "" },
    merchandiseRights: { enabled: false, price: "" },
  });

  // Data pengguna saat ini (mocked)
  const currentCreatorWallet = "0x3B9a...4C7e";

  // --- MOCK DATA ---
  const mockOwnedAssets = [
    // CLT Assets
    { id: 1, type: "CLT", title: "Sonic Waves Collection", creator: "0x7F2c...8A1d", licenseType: "Commercial Use", purchaseDate: "2024-03-15", assetId: "CLT-1523-89" },
    { id: 2, type: "CLT", title: "Urban Symphony", creator: "0x5E1d...3B7a", licenseType: "Personal Use", purchaseDate: "2024-03-12", assetId: "CLT-6182-42" },
    // GOT Assets
    { id: 3, type: "GOT", title: "Digital Masterpiece #2847", creator: `You (${currentCreatorWallet})`, creationDate: "2024-02-01", assetId: "GOT-2847" },
    { id: 4, type: "GOT", title: "Ethereal Melodies Vol. 2", creator: `You (${currentCreatorWallet})`, creationDate: "2023-11-20", assetId: "GOT-9234" },
  ];

  const mockCreatorAssets = [ /* ... data for Stats Overview ... */];
  const mockTotalClts = mockCreatorAssets.reduce((sum, asset) => sum + asset.cltSold, 0);
  const mockOwnedCltsCount = mockOwnedAssets.filter(a => a.type === 'CLT').length;
  const mockOwnedGotsCount = mockOwnedAssets.filter(a => a.type === 'GOT').length;

  // --- FUNGSI ---
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFormData(prev => ({ ...prev, fileHash: "" }));
      return;
    }

    setIsUploading(true);
    toast.info(`Calculating hash for ${file.name}...`);

    try {
      const hash = await calculateFileHash(file);
      setFormData(prev => ({ ...prev, fileHash: hash }));
      toast.success(`File hash calculated successfully!`);
    } catch (error) {
      toast.error("Failed to calculate file hash.");
      setFormData(prev => ({ ...prev, fileHash: "" }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleInitiateStamp = () => {
    // Logic to send data to the smart contract
    toast.success(`Genesis Stamp initiated for "${formData.title}"! Your work is submitted for verification.`);
    setIsDialogOpen(false); // Close modal on successful submit
    // Reset form
    setFormData({
      title: "",
      category: "",
      description: "",
      assetLink: "",
      metadataLink: "",
      fileHash: "",
    });
  };

  const validateForm = () => {
    const { title, category, description, assetLink, fileHash } = formData;
    // fileHash is now mandatory
    return title && category && description && assetLink && fileHash;
  };

  const openPreviewModal = () => {
    if (validateForm()) {
      setIsDialogOpen(true);
    } else {
      toast.error("Please fill in all required fields (Title, Category, Description, Asset Link, and upload the file).");
    }
  };

  const openListingDialog = (asset: any) => {
    setSelectedAsset(asset);
    setIsListingDialogOpen(true);
  };

  const handleLicenseToggle = (licenseType: string, enabled: boolean) => {
    setLicenseSettings(prev => ({
      ...prev,
      [licenseType]: { ...prev[licenseType as keyof typeof prev], enabled }
    }));
  };

  const handleLicensePrice = (licenseType: string, price: string) => {
    setLicenseSettings(prev => ({
      ...prev,
      [licenseType]: { ...prev[licenseType as keyof typeof prev], price }
    }));
  };

  const handleSaveListing = () => {
    const enabledLicenses = Object.entries(licenseSettings)
      .filter(([_, settings]) => settings.enabled && settings.price)
      .map(([type, settings]) => `${type}: $${settings.price}`);
    
    if (enabledLicenses.length === 0) {
      toast.error("Please enable at least one license and set its price.");
      return;
    }

    toast.success(`Listing updated for "${selectedAsset?.title}"! Enabled licenses: ${enabledLicenses.join(", ")}`);
    setIsListingDialogOpen(false);
  };


  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-20 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Creator Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your owned licenses (CLT) and intellectual property (GOT).
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Owned Licenses (CLTs)</p>
                  <p className="text-3xl font-bold text-primary">{mockOwnedCltsCount}</p>
                </div>
                <FileText className="h-10 w-10 text-[#FFC300]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Owned IP (GOTs)</p>
                  <p className="text-3xl font-bold text-success">{mockOwnedGotsCount}</p>
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
                  <p className="text-3xl font-bold text-primary">{mockTotalClts}</p>
                </div>
                <DollarSign className="h-10 w-10 text-[#1EFF00]" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="owned" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="owned">My Owned Assets</TabsTrigger>
            <TabsTrigger value="creator">Genesis Stamp</TabsTrigger>
          </TabsList>

          {/* Tab 1: My Owned Assets (CLT & GOT) - SEPARATED BY TYPE */}
          <TabsContent value="owned" className="space-y-6">

            {/* --- CATEGORY 1: MY OWNERSHIP TOKENS (GOT) --- */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Shield className="h-5 w-5 text-primary" />
                  My Ownership Tokens (GOT)
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Immutable proof of your original intellectual property (IP).
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOwnedAssets.filter(a => a.type === 'GOT').map((asset) => (
                    <Card key={asset.id} className="border-border bg-secondary/50">
                      <CardContent className="pt-4 pb-4">
                        <div className="flex items-center justify-between gap-4">

                          {/* Icon & Title */}
                          <div className="flex items-center gap-4 flex-1">
                            <Shield className="h-6 w-6 text-primary shrink-0" />
                            <div>
                              <h3 className="font-semibold text-base mb-0.5">{asset.title}</h3>
                              <p className="text-xs text-muted-foreground">
                                Creation Date <span className="font-mono text-primary font-medium">{asset.creationDate}</span>
                              </p>
                            </div>
                          </div>

                          {/* Action */}
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="shrink-0"
                            onClick={() => openListingDialog(asset)}
                          >
                            <Send className="h-4 w-4" />
                            Manage & List
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {mockOwnedAssets.filter(a => a.type === 'GOT').length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">No Genesis Ownership Tokens (GOT) found.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* --- CATEGORY 2: MY LICENSES (CLT) --- */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Gem className="h-5 w-5 text-accent" />
                  My Licenses (CLT)
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Proof of legal usage licenses (Consumption License Tokens) you have acquired.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOwnedAssets.filter(a => a.type === 'CLT').map((asset) => (
                    <Card key={asset.id} className="border-border">
                      <CardContent className="pt-4 pb-4">
                        <div className="flex items-start gap-4">

                          {/* Asset Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-base font-semibold">{asset.title}</h3>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                              {/* License Type - rounded-lg */}
                              <div className="p-3 bg-secondary rounded-lg border border-border">
                                <p className="text-xs text-muted-foreground mb-0.5">License Type</p>
                                <p className="text-sm font-semibold">{asset.licenseType}</p>
                              </div>
                              {/* CLT ID - rounded-lg */}
                              <div className="p-3 bg-secondary rounded-lg border border-border">
                                <p className="text-xs text-muted-foreground mb-0.5">CLT ID</p>
                                <p className="text-sm font-mono font-semibold text-primary">{asset.assetId}</p>
                              </div>
                              {/* Purchased - rounded-lg */}
                              <div className="p-3 bg-secondary rounded-lg border border-border">
                                <p className="text-xs text-muted-foreground mb-0.5">Purchased</p>
                                <p className="text-sm font-semibold">{asset.purchaseDate}</p>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-2 shrink-0 self-center">
                            <Button variant="outline" size="sm" className="h-8">
                              <FileText className="h-4 w-4" />
                              View Terms
                            </Button>
                            <Button variant="outline" size="sm" className="h-8">
                              Download Proof
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {mockOwnedAssets.filter(a => a.type === 'CLT').length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">No Consumption License Tokens (CLT) found.</p>
                  )}
                </div>
              </CardContent>
            </Card>

          </TabsContent>

          {/* Tab 2: Creator's Genesis & Listing (Form Pendaftaran) */}
          <TabsContent value="creator" className="space-y-6">

            {/* Listing Management Dialog */}
            <Dialog open={isListingDialogOpen} onOpenChange={setIsListingDialogOpen}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-xl flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Manage Marketplace Listing
                  </DialogTitle>
                  <DialogDescription>
                    Set permitted licenses and their prices for "{selectedAsset?.title}"
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-4">
                    {/* Personal Use License */}
                    <Card className="border-border">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={licenseSettings.personalUse.enabled}
                              onChange={(e) => handleLicenseToggle('personalUse', e.target.checked)}
                              className="w-4 h-4"
                            />
                            <div>
                              <Label className="font-semibold">Personal Use</Label>
                              <p className="text-xs text-muted-foreground">Non-commercial personal projects</p>
                            </div>
                          </div>
                        </div>
                        {licenseSettings.personalUse.enabled && (
                          <div className="flex items-center gap-2">
                            <Label className="text-sm">Price (USDC):</Label>
                            <Input
                              type="number"
                              placeholder="0.00"
                              value={licenseSettings.personalUse.price}
                              onChange={(e) => handleLicensePrice('personalUse', e.target.value)}
                              className="w-32"
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Commercial Use License */}
                    <Card className="border-border">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={licenseSettings.commercialUse.enabled}
                              onChange={(e) => handleLicenseToggle('commercialUse', e.target.checked)}
                              className="w-4 h-4"
                            />
                            <div>
                              <Label className="font-semibold">Commercial Use</Label>
                              <p className="text-xs text-muted-foreground">Business and revenue-generating projects</p>
                            </div>
                          </div>
                        </div>
                        {licenseSettings.commercialUse.enabled && (
                          <div className="flex items-center gap-2">
                            <Label className="text-sm">Price (USDC):</Label>
                            <Input
                              type="number"
                              placeholder="0.00"
                              value={licenseSettings.commercialUse.price}
                              onChange={(e) => handleLicensePrice('commercialUse', e.target.value)}
                              className="w-32"
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Educational Use License */}
                    <Card className="border-border">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={licenseSettings.educationalUse.enabled}
                              onChange={(e) => handleLicenseToggle('educationalUse', e.target.checked)}
                              className="w-4 h-4"
                            />
                            <div>
                              <Label className="font-semibold">Educational Use</Label>
                              <p className="text-xs text-muted-foreground">Academic and teaching purposes</p>
                            </div>
                          </div>
                        </div>
                        {licenseSettings.educationalUse.enabled && (
                          <div className="flex items-center gap-2">
                            <Label className="text-sm">Price (USDC):</Label>
                            <Input
                              type="number"
                              placeholder="0.00"
                              value={licenseSettings.educationalUse.price}
                              onChange={(e) => handleLicensePrice('educationalUse', e.target.value)}
                              className="w-32"
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Merchandise Rights License */}
                    <Card className="border-border">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={licenseSettings.merchandiseRights.enabled}
                              onChange={(e) => handleLicenseToggle('merchandiseRights', e.target.checked)}
                              className="w-4 h-4"
                            />
                            <div>
                              <Label className="font-semibold">Merchandise Rights</Label>
                              <p className="text-xs text-muted-foreground">Physical products and merchandise</p>
                            </div>
                          </div>
                        </div>
                        {licenseSettings.merchandiseRights.enabled && (
                          <div className="flex items-center gap-2">
                            <Label className="text-sm">Price (USDC):</Label>
                            <Input
                              type="number"
                              placeholder="0.00"
                              value={licenseSettings.merchandiseRights.price}
                              onChange={(e) => handleLicensePrice('merchandiseRights', e.target.value)}
                              className="w-32"
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsListingDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" onClick={handleSaveListing}>
                    Save & Update Listing
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Modal Preview Metadata */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-xl flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Confirm Genesis Metadata
                  </DialogTitle>
                  <DialogDescription>
                    Review your work details before submitting them to the DAO for verification.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-1">
                    <Label className="font-semibold">Title</Label>
                    <p className="text-sm">{formData.title}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="font-semibold">Creator (Wallet)</Label>
                    <p className="text-sm font-mono text-muted-foreground">{currentCreatorWallet}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="font-semibold">Work Type</Label>
                    <Badge variant="secondary">{formData.category}</Badge>
                  </div>
                  <div className="space-y-1">
                    <Label className="font-semibold">Description</Label>
                    <p className="text-sm text-muted-foreground italic">{formData.description}</p>
                  </div>

                  <div className="space-y-1 pt-2 border-t">
                    <Label className="font-semibold flex items-center gap-1">
                      <Hash className="h-4 w-4" />
                      File Integrity Hash (SHA-256)
                    </Label>
                    <p className="text-sm break-all font-mono text-success">{formData.fileHash}</p>
                  </div>

                  <div className="space-y-1">
                    <Label className="font-semibold">Original Asset Link (Mandatory)</Label>
                    <p className="text-sm break-all text-primary underline">{formData.assetLink}</p>
                  </div>
                  {formData.metadataLink && (
                    <div className="space-y-1">
                      <Label className="font-semibold">Additional Metadata Link (Optional)</Label>
                      <p className="text-sm break-all text-muted-foreground underline">{formData.metadataLink}</p>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Edit Data
                  </Button>
                  <Button type="submit" onClick={handleInitiateStamp}>
                    Confirm & Initiate Stamp ($10 USDC)
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Genesis Stamp Form */}
            <Card className="border-border border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Genesis Stamp - Register New Artwork
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Submit your creative work for verification and minting your work's GOT.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Work Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter artwork title"
                      value={formData.title}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={handleSelectChange}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Photo">Photo</SelectItem>
                        <SelectItem value="Music">Music</SelectItem>
                        <SelectItem value="Video">Video</SelectItem>
                        <SelectItem value="Comic">Comic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your creative work"
                    rows={3}
                    value={formData.description}
                    onChange={handleFormChange}
                  />
                </div>

                {/* --- FILE UPLOAD AND HASHING --- */}
                <div className="space-y-2 pt-2 border-t">
                  <Label htmlFor="assetFile" className="flex items-center gap-2">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    Upload File to Calculate Hash (Mandatory)
                  </Label>
                  <Input
                    id="assetFile"
                    type="file"
                    onChange={handleFileChange}
                    disabled={isUploading}
                    className="cursor-pointer file:cursor-pointer"
                  />
                  {formData.fileHash ? (
                    <div className="flex items-center gap-2 text-sm text-success pt-1">
                      <Hash className="h-4 w-4" />
                      Hash Calculated: {formData.fileHash.slice(0, 10)}...
                    </div>
                  ) : isUploading ? (
                    <div className="text-sm text-muted-foreground pt-1">Calculating hash, please wait...</div>
                  ) : null}
                </div>
                {/* --- END FILE UPLOAD --- */}

                <div className="space-y-2">
                  <Label htmlFor="assetLink" className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    Original Asset Link (IPFS/Arweave URL - Mandatory)
                  </Label>
                  <Input
                    id="assetLink"
                    placeholder="https://ipfs.io/ipfs/..."
                    value={formData.assetLink}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metadataLink" className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    Additional Metadata Link (Optional - e.g. Legal Contract)
                  </Label>
                  <Input
                    id="metadataLink"
                    placeholder="https://mylink.com/data"
                    value={formData.metadataLink}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <p className="text-sm font-semibold mb-2">DAO Verification Process</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Stake: $10 USDC (refunded upon approval)</li>
                    <li>• Verification Period: 48 hours</li>
                    <li>• Community votes on originality and quality</li>
                  </ul>
                </div>

                <Button className="w-full" size="lg" onClick={openPreviewModal} disabled={isUploading}>
                  <Shield className="h-5 w-5" />
                  Preview Metadata & Initiate Stamp
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Vault;
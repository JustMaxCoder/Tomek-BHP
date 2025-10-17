import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "../lib/queryClient";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useToast } from "../hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Pencil, Trash2, Plus, Upload, LogOut, Settings as SettingsIcon, Image as ImageIcon } from "lucide-react";
import type { Product, Gallery, Settings } from "../../../shared/schema";

export default function AdminPanel() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      if (!parsedUser.isAdmin) {
        toast({
          title: "Brak dostępu",
          description: "Tylko administratorzy mogą uzyskać dostęp do tego panelu",
          variant: "destructive",
        });
        setLocation("/");
      }
    } else {
      setLocation("/admin/login");
    }
  }, []);

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: gallery = [], isLoading: galleryLoading } = useQuery<Gallery[]>({
    queryKey: ["/api/gallery"],
  });

  const { data: settings = [], isLoading: settingsLoading } = useQuery<Settings[]>({
    queryKey: ["/api/settings"],
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to delete product");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Produkt usunięty" });
    },
  });

  const deleteGalleryMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to delete gallery image");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({ title: "Zdjęcie usunięte" });
    },
  });

  const uploadGalleryMutation = useMutation({
    mutationFn: async (file: File) => {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", file);
      
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      
      if (!response.ok) throw new Error("Upload failed");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({ title: "Zdjęcie przesłane" });
    },
  });

  const updateSettingMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/settings/${key}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ value }),
      });
      if (!response.ok) throw new Error("Failed to update setting");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      toast({ title: "Ustawienie zaktualizowane" });
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLocation("/admin/login");
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadGalleryMutation.mutate(file);
    }
  };

  const getSetting = (key: string) => {
    return settings.find(s => s.key === key)?.value || "";
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Ładowanie...</div>;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold" data-testid="text-admin-title">Panel Administracyjny</h1>
            <p className="text-muted-foreground">Witaj, {user?.username}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
            <LogOut className="mr-2 h-4 w-4" />
            Wyloguj
          </Button>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products" data-testid="tab-products">
              <Package className="mr-2 h-4 w-4" />
              Produkty
            </TabsTrigger>
            <TabsTrigger value="gallery" data-testid="tab-gallery">
              <ImageIcon className="mr-2 h-4 w-4" />
              Galeria
            </TabsTrigger>
            <TabsTrigger value="settings" data-testid="tab-settings">
              <SettingsIcon className="mr-2 h-4 w-4" />
              Ustawienia
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Zarządzanie Produktami</h2>
                <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingProduct(null)} data-testid="button-add-product">
                      <Plus className="mr-2 h-4 w-4" />
                      Dodaj Produkt
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {editingProduct ? "Edytuj Produkt" : "Dodaj Nowy Produkt"}
                      </DialogTitle>
                    </DialogHeader>
                    <ProductForm
                      product={editingProduct}
                      onClose={() => {
                        setIsProductDialogOpen(false);
                        setEditingProduct(null);
                      }}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              {productsLoading ? (
                <p>Ładowanie...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Zdjęcie</TableHead>
                      <TableHead>Nazwa</TableHead>
                      <TableHead>Cena</TableHead>
                      <TableHead>Kategoria</TableHead>
                      <TableHead>Stan</TableHead>
                      <TableHead className="text-right">Akcje</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id} data-testid={`row-product-${product.id}`}>
                        <TableCell>
                          <img src={product.image} alt={product.name} className="h-12 w-12 object-cover rounded" />
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.price} zł</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.stock} szt.</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingProduct(product);
                              setIsProductDialogOpen(true);
                            }}
                            data-testid={`button-edit-${product.id}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteProductMutation.mutate(product.id)}
                            data-testid={`button-delete-${product.id}`}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Galeria</h2>
                <Button asChild data-testid="button-upload-gallery">
                  <label className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4 inline" />
                    Prześlij Zdjęcie
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleGalleryUpload}
                    />
                  </label>
                </Button>
              </div>

              {galleryLoading ? (
                <p>Ładowanie...</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {gallery.map((img) => (
                    <div key={img.id} className="relative group" data-testid={`img-gallery-${img.id}`}>
                      <img src={img.path} alt={img.filename} className="w-full h-48 object-cover rounded" />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => deleteGalleryMutation.mutate(img.id)}
                        data-testid={`button-delete-gallery-${img.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Ustawienia Strony</h2>
              
              {settingsLoading ? (
                <p>Ładowanie...</p>
              ) : (
                <div className="space-y-6">
                  <div>
                    <Label>Nazwa Sklepu</Label>
                    <Input
                      defaultValue={getSetting("siteName")}
                      onBlur={(e) => updateSettingMutation.mutate({ key: "siteName", value: e.target.value })}
                      data-testid="input-site-name"
                    />
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Banner Promocyjny</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={getSetting("bannerShow") === "true"}
                          onCheckedChange={(checked) =>
                            updateSettingMutation.mutate({ key: "bannerShow", value: checked.toString() })
                          }
                          data-testid="switch-banner-show"
                        />
                        <Label>Pokaż banner</Label>
                      </div>
                      
                      <div>
                        <Label>Tekst banneru</Label>
                        <Input
                          defaultValue={getSetting("bannerText")}
                          onBlur={(e) => updateSettingMutation.mutate({ key: "bannerText", value: e.target.value })}
                          data-testid="input-banner-text"
                        />
                      </div>

                      <div>
                        <Label>Link banneru</Label>
                        <Input
                          defaultValue={getSetting("bannerLink")}
                          onBlur={(e) => updateSettingMutation.mutate({ key: "bannerLink", value: e.target.value })}
                          data-testid="input-banner-link"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ProductForm({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    category: product?.category || "",
    stock: product?.stock || 0,
    image: product?.image || "",
    available: product?.available ?? true,
    shipping: product?.shipping || "standard",
  });
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);

  const createProductMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");
      const fd = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        fd.append(key, value.toString());
      });
      
      if (imageFiles) {
        Array.from(imageFiles).forEach(file => {
          fd.append("images", file);
        });
      }

      const response = await fetch("/api/products", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (!response.ok) throw new Error("Failed to create product");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Produkt utworzony" });
      onClose();
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");
      const fd = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        fd.append(key, value.toString());
      });
      
      if (imageFiles) {
        Array.from(imageFiles).forEach(file => {
          fd.append("images", file);
        });
      }

      const response = await fetch(`/api/products/${product?.id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (!response.ok) throw new Error("Failed to update product");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Produkt zaktualizowany" });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      updateProductMutation.mutate();
    } else {
      createProductMutation.mutate();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Nazwa</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          data-testid="input-product-name"
        />
      </div>

      <div>
        <Label>Opis</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          data-testid="input-product-description"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Cena</Label>
          <Input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
            data-testid="input-product-price"
          />
        </div>

        <div>
          <Label>Stan magazynowy</Label>
          <Input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
            required
            data-testid="input-product-stock"
          />
        </div>
      </div>

      <div>
        <Label>Kategoria</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger data-testid="select-product-category">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="odziez-robocza">Odzież robocza</SelectItem>
            <SelectItem value="obuwie">Obuwie</SelectItem>
            <SelectItem value="rekawice">Rękawice</SelectItem>
            <SelectItem value="ochrona-glowy">Ochrona głowy</SelectItem>
            <SelectItem value="ochrona-sluchu">Ochrona słuchu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>URL głównego zdjęcia</Label>
        <Input
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
          data-testid="input-product-image"
        />
      </div>

      <div>
        <Label>Dodatkowe zdjęcia</Label>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImageFiles(e.target.files)}
          data-testid="input-product-images"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={formData.available}
          onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
          data-testid="switch-product-available"
        />
        <Label>Dostępny</Label>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={createProductMutation.isPending || updateProductMutation.isPending} data-testid="button-submit-product">
          {product ? "Zaktualizuj" : "Utwórz"}
        </Button>
        <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel-product">
          Anuluj
        </Button>
      </div>
    </form>
  );
}

// Missing icon
function Package(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16.5 9.4 7.55 4.24" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" x2="12" y1="22" y2="12" />
    </svg>
  );
}

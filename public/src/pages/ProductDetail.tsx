import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ArrowLeft, ShoppingCart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import type { Product } from "../../../shared/schema";

export default function ProductDetail({
  onAddToCart,
}: {
  onAddToCart: (product: Product, quantity: number) => void;
}) {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Produkt nie znaleziony</h1>
        <Link href="/sklep" data-testid="link-back-to-shop">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Wróć do sklepu
          </Button>
        </Link>
      </div>
    );
  }

  const inStock = parseInt(product.stock.toString()) > 0;
  const price = parseFloat(product.price.toString());

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(parseInt(product.stock.toString()), quantity + delta));
    setQuantity(newQuantity);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Link href="/sklep" className="text-primary hover:underline flex items-center gap-2" data-testid="link-breadcrumb-shop">
            <ArrowLeft className="h-4 w-4" /> Wróć do sklepu
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Placeholder */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="relative aspect-square bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
              <div className="text-gray-300 text-9xl">📦</div>
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <Badge className="mb-4" data-testid="badge-category">
              {product.category}
            </Badge>
            
            <h1 className="text-4xl font-bold mb-4" data-testid="text-product-name">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div
                className={`h-3 w-3 rounded-full ${
                  inStock ? "bg-green-600" : "bg-red-600"
                }`}
              />
              <span className="text-lg font-medium" data-testid="text-stock-status">
                {inStock ? `W magazynie (${product.stock} szt.)` : "Brak w magazynie"}
              </span>
            </div>

            <div className="mb-8">
              <span className="text-5xl font-bold" data-testid="text-product-price">
                {price.toFixed(2)} zł
              </span>
            </div>

            {/* Quantity Selector */}
            {inStock && (
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Ilość</label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    data-testid="button-decrease-quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    max={product.stock.toString()}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(parseInt(product.stock.toString()), parseInt(e.target.value) || 1)))}
                    className="w-20 text-center"
                    data-testid="input-quantity"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= parseInt(product.stock.toString())}
                    data-testid="button-increase-quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <Button
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6 text-lg mb-4"
              disabled={!inStock}
              onClick={() => onAddToCart(product, quantity)}
              data-testid="button-add-to-cart"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Dodaj do koszyka
            </Button>

            <Link href="/koszyk" className="block">
              <Button
                variant="outline"
                size="lg"
                className="w-full py-6 text-lg font-semibold"
                data-testid="button-go-to-cart"
              >
                Przejdź do koszyka
              </Button>
            </Link>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b">
              <TabsTrigger value="description" data-testid="tab-description">
                Opis
              </TabsTrigger>
              <TabsTrigger value="specifications" data-testid="tab-specifications">
                Specyfikacja
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="pt-6">
              <p className="text-base leading-relaxed" data-testid="text-description">
                {product.description}
              </p>
            </TabsContent>
            
            <TabsContent value="specifications" className="pt-6">
              <div className="space-y-3">
                <div className="flex border-b pb-2">
                  <span className="font-medium w-40">Kategoria:</span>
                  <span>{product.category}</span>
                </div>
                <div className="flex border-b pb-2">
                  <span className="font-medium w-40">Dostępność:</span>
                  <span>{inStock ? "W magazynie" : "Brak"}</span>
                </div>
                <div className="flex border-b pb-2">
                  <span className="font-medium w-40">Stan magazynowy:</span>
                  <span>{product.stock} szt.</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

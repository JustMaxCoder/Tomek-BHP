import { Link } from "wouter";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ShoppingCart } from "lucide-react";
import type { Product } from "../../../shared/schema";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const inStock = parseInt(product.stock.toString()) > 0;
  const price = parseFloat(product.price.toString());

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg group"
      data-testid={`card-product-${product.id}`}
    >
      <Link href={`/produkt/${product.id}`} className="block">
        <div className="relative bg-gray-100 aspect-square flex items-center justify-center border-b border-gray-200">
          <div className="text-gray-300 text-6xl">📦</div>
          <Badge
            className="absolute top-2 right-2 bg-black/80 text-white text-xs"
            data-testid={`badge-category-${product.id}`}
          >
            {product.category}
          </Badge>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/produkt/${product.id}`}>
          <h3
            className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors"
            data-testid={`text-product-name-${product.id}`}
          >
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3" data-testid={`text-product-description-${product.id}`}>
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${
                inStock ? "bg-green-600" : "bg-red-600"
              }`}
            />
            <span className="text-sm" data-testid={`text-stock-${product.id}`}>
              {inStock ? "W magazynie" : "Brak"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-2xl font-bold" data-testid={`text-price-${product.id}`}>
            {price.toFixed(2)} zł
          </span>
          <Button
            variant="default"
            size="default"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => onAddToCart?.(product)}
            disabled={!inStock}
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Dodaj
          </Button>
        </div>
      </div>
    </div>
  );
}

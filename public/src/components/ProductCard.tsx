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
      className="group bg-card rounded-lg overflow-hidden transition-all duration-300 border-2 border-border hover:border-primary hover:shadow-xl hover:-translate-y-1"
      data-testid={`card-product-${product.id}`}
    >
      <Link href={`/produkt/${product.id}`} className="block">
        <div className="relative bg-gray-100 dark:bg-gray-800 aspect-square flex items-center justify-center">
          <div className="text-gray-300 text-4xl sm:text-6xl">📦</div>
          <Badge
            className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-black/80 text-white text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1"
            data-testid={`badge-category-${product.id}`}
          >
            {product.category}
          </Badge>
        </div>
      </Link>

      <div className="p-3 sm:p-4">
        <Link href={`/produkt/${product.id}`}>
          <h3
            className="font-semibold text-sm sm:text-lg mb-1.5 sm:mb-2 line-clamp-2 hover:text-primary transition-colors"
            data-testid={`text-product-name-${product.id}`}
          >
            {product.name}
          </h3>
        </Link>

        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2 sm:mb-3" data-testid={`text-product-description-${product.id}`}>
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div
              className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${
                inStock ? "bg-green-600" : "bg-red-600"
              }`}
            />
            <span className="text-xs sm:text-sm" data-testid={`text-stock-${product.id}`}>
              {inStock ? "W magazynie" : "Brak"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-lg sm:text-2xl font-bold" data-testid={`text-price-${product.id}`}>
            {price.toFixed(2)} zł
          </span>
          <Button
            variant="default"
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-10"
            onClick={() => onAddToCart?.(product)}
            disabled={!inStock}
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
            <span className="hidden sm:inline">Dodaj</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
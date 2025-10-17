import { Link } from "wouter";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ShoppingCart, Package } from "lucide-react";
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
      className="group bg-card rounded-lg overflow-hidden transition-all duration-300 border-2 border-border hover:border-primary hover:shadow-2xl hover:-translate-y-1"
      data-testid={`card-product-${product.id}`}
    >
      <Link href={`/produkt/${product.id}`} className="block">
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 aspect-square flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
          <Package className="text-gray-300 dark:text-gray-600 w-20 h-20 group-hover:scale-110 transition-transform duration-300" />
          <Badge
            className="absolute top-3 right-3 bg-black/90 dark:bg-white/90 text-white dark:text-black text-xs font-semibold px-3 py-1 shadow-lg"
            data-testid={`badge-category-${product.id}`}
          >
            {product.category}
          </Badge>
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/produkt/${product.id}`}>
          <h3
            className="font-bold text-lg mb-2 line-clamp-2 text-foreground group-hover:text-primary transition-colors min-h-[3.5rem]"
            data-testid={`text-product-name-${product.id}`}
          >
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-[2.5rem]" data-testid={`text-product-description-${product.id}`}>
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-muted/50 rounded-md">
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              inStock ? "bg-green-500 animate-pulse" : "bg-red-500"
            }`}
          />
          <span className="text-sm font-medium text-foreground" data-testid={`text-stock-${product.id}`}>
            {inStock ? "Dostępny w magazynie" : "Brak w magazynie"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 pt-3 border-t border-border">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground mb-1">Cena</span>
            <span className="text-2xl font-bold text-primary" data-testid={`text-price-${product.id}`}>
              {price.toFixed(2)} <span className="text-lg">zł</span>
            </span>
          </div>
          <Button
            variant="default"
            size="default"
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
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
